const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// --- AYARLAR ---
// Resimlerin kaydedileceği klasör (Senin yapına göre: Fotoğraflar)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Fotoğraflar/') 
    },
    filename: function (req, file, cb) {
        // Dosya ismini bozmamak için orijinal ismini kullanıyoruz ama çakışmayı önlemek için tarih ekliyoruz
        // Türkçe karakter sorununu önlemek için basit bir düzeltme
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, Date.now() + '-' + originalName.replace(/\s+/g, '-'));
    }
});

const upload = multer({ storage: storage });

// Statik dosyaları sun (CSS, JS, Resimler düzgün görünsün diye)
app.use(express.static('.'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ADMIN PANELİNİ GÖSTER ---
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// --- YENİ ÜRÜN EKLEME İŞLEMİ ---
// 'photos' ismi HTML formundaki input name ile aynı olmalı
app.post('/add-product', upload.array('photos', 5), (req, res) => {
    try {
        const body = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.send('<h1>Hata: En az bir fotoğraf yüklemelisiniz!</h1><a href="/admin">Geri Dön</a>');
        }

        // 1. Yeni Ürün ID'sini Oluştur (Kategori + Rastgele Sayı)
        // Link yapısı: https://site.com/#shirt123 gibi olacak
        const productId = body.category + Date.now();

        // 2. Resim Yollarını Hazırla
        // script.js içinde "Fotoğraflar/resim.png" şeklinde kullanılacak
        const imagePaths = files.map(file => `Fotoğraflar/${file.filename}`);

        // 3. Yeni Ürün Objesini Oluştur
        const newProduct = {
            id: productId,
            category: body.category,
            title: body.titleEn,          
            titleSq: body.titleSq,        
            price: "€" + body.price,
            
            // Açıklamaları burada saklıyoruz
            descEn: body.descEn,
            descSq: body.descSq,

            image: imagePaths[0],         
            images: imagePaths,           
            
            // BURASI ÖNEMLİ: Specs içine artık açıklamaları KOYMUYORUZ.
            // Sadece ID'yi koyuyoruz. Böylece maddeler arasında açıklama çıkmayacak.
            specs: [                      
                "Product ID: " + productId.toUpperCase()
            ],
            comingSoon: false
        };

        // 4. script.js Dosyasını Oku ve Güncelle
        const scriptPath = path.join(__dirname, 'script.js');
        let scriptContent = fs.readFileSync(scriptPath, 'utf8');

        // İşaretlediğimiz yeri bul: // --- YENİ ÜRÜNLER BURAYA EKLENECEK ---
        const marker = '// --- YENİ ÜRÜNLER BURAYA EKLENECEK ---';
        
        if (!scriptContent.includes(marker)) {
            return res.send('<h1>Hata: script.js dosyasında hedef işaret bulunamadı! Lütfen "Aşama 1"deki işareti eklediğinden emin ol.</h1>');
        }

        // Yeni kodu oluştur
        // JSON.stringify kullanıyoruz ama key'lerdeki tırnakları temizlemek istersek regex gerekir.
        // Şimdilik temiz ve hatasız olması için JSON formatında ekliyoruz, JS bunu anlar.
        const newProductCode = `
    ${JSON.stringify(newProduct, null, 4)},

    ${marker}`; // İşareti tekrar sona ekliyoruz ki sonraki ürünler de eklenebilsin.

        // İçeriği değiştir
        scriptContent = scriptContent.replace(marker, newProductCode);

        // Dosyayı kaydet
        fs.writeFileSync(scriptPath, scriptContent, 'utf8');

        // Başarılı sayfasına yönlendir
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h1 style="color: green;">Başarılı!</h1>
                <p>Ürün eklendi: <strong>${body.titleEn}</strong></p>
                <p>Yeni Link: <a href="/#${productId}" target="_blank">/#${productId}</a></p>
                <br>
                <a href="/admin" style="padding: 10px 20px; background: black; color: white; text-decoration: none; border-radius: 5px;">Yeni Ürün Ekle</a>
                <br><br>
                <a href="/" target="_blank" style="color: grey;">Siteyi Görüntüle</a>
            </div>
        `);

    } catch (error) {
        console.error(error);
        res.send('<h1>Bir hata oluştu: ' + error.message + '</h1>');
    }
});

app.listen(port, () => {
    console.log(`--------------------------------------------------`);
    console.log(`VALENZO ADMIN PANELİ ÇALIŞIYOR`);
    console.log(`Panele gitmek için tarayıcına şunu yaz: http://localhost:${port}/admin`);
    console.log(`--------------------------------------------------`);
});