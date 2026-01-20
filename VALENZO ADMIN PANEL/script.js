// --- 1. BÖLÜM: ÜRÜN VERİLERİ (SANAL DEPO) ---
// Burada sitendeki ürünlerin tüm bilgilerini saklıyoruz.
// Yeni ürün eklemek istersen bu listeye { ... } şeklinde ekleme yapmalısın.
const products = [
    // --- Şapkalar ---
    {
        id: "hat1",
        category: "hat",
        title: "BLACK LOGO CAP",
        titleSq: "KAPELE E ZEZË ME LOGO",
        price: "€35.00",
        image: "Fotoğraflar/sapka.png",
        images: ["Fotoğraflar/sapka.png", "Fotoğraflar/sapkayan.png"],
        specs: ["Product ID: H2026", "Cotton Twill", "Adjustable Strap"],
        comingSoon: false
    },

    // --- Pantalonlar ---
    {
        id: "pants1",
        category: "pants",
        title: "SLIM FIT CHINO PANTS",
        titleSq: "PANTALLONA CHINO SLIM FIT",
        price: "€60.00",
        image: "Fotoğraflar/panturün.png",
        images: ["Fotoğraflar/panturün.png", "Fotoğraflar/pantur.png", "Fotoğraflar/panturkomplet.png"],
        specs: ["Product ID: PNT2026", "Slim Fit", "Stretch Fabric", "Zip Fly"],
        comingSoon: false
    },

    // --- GELECEK OLANLAR (Coming Soon) ---
    // Bunlara da ID ekledik ki linkleri olsun
    { id: "shirt", category: "shirt", comingSoon: true },
    { id: "sweatshirt", category: "sweatshirt", comingSoon: true },
    { id: "pants-upcoming", category: "pants", comingSoon: true },
    { id: "underwear", category: "underwear", comingSoon: true },
    { id: "hat-upcoming", category: "hat", comingSoon: true },

    
    {
    "id": "hat1768944607773",
    "category": "hat",
    "title": "Su Aygıri",
    "titleSq": "Hipopotam",
    "price": "€0.25",
    "descEn": "Açık Agızlen uyur\r\nLigalari akar\r\nAşk Acısi Çeker (Dilara)",
    "descSq": "Fle me gojë hapur\r\njargëzim\r\nDashuria vuan (Dilara)",
    "image": "Fotoğraflar/1768944607761-Ekran-görüntüsü-2026-01-21-002644.png",
    "images": [
        "Fotoğraflar/1768944607761-Ekran-görüntüsü-2026-01-21-002644.png",
        "Fotoğraflar/1768944607768-Ekran-görüntüsü-2026-01-21-002716.png"
    ],
    "specs": [
        "Product ID: HAT1768944607773"
    ],
    "comingSoon": false
},

    // --- YENİ ÜRÜNLER BURAYA EKLENECEK ---
];

// Şu an hangi ürün seçili ve hangi dil aktif?
let currentProduct = null;
let currentLang = 'en'; // Varsayılan dil İngilizce

// --- 2. BÖLÜM: ÇEVİRİ SÖZLÜĞÜ ---
// Sitedeki sabit yazıların İngilizce ve Arnavutça karşılıkları
const translations = {
    en: {
        mottoTitle: "Men's Luxury Clothing",
        mottoDesc: "Timeless elegance. Pure exclusivity.",
        heroNote: "Purchase available only via Instagram.",
        catAll: "All",
        catShirt: "T-Shirts",
        catSweatshirt: "Sweatshirts",
        catUnderwear: "Underwear",
        catHat: "Hats",
        catPants: "Pants",
        labelSize: "SIZE: PLEASE SELECT",
        labelDetails: "PRODUCT DETAILS",
        noteTitle: "HOW TO BUY?",
        noteText: 'Please contact us via <a href="https://www.instagram.com/valenzo.premium/" target="_blank">Instagram DM</a> to purchase this item.',
        comingSoon: "COMING SOON",
        csModalTitle: "COMING SOON",
        csModalText: "This exclusive collection is on its way.<br><br>Do you have a special request? We value your thoughts. Contact us directly via Instagram.",
        csBtnText: "CONTACT VIA INSTAGRAM",
        promoFree: "FREE SHIPPING ON ALL ORDERS",
        promoSale: "SALE:",
        promoMen: "MEN",
        promoWomen: "WOMEN",
        footFollowTitle: "FOLLOW VALENZO PREMIUM",
        footFollowDesc: "There is always something more for you to discover.",
        footBrandTitle: "BE PART OF THE LEGACY",
        footBrandText: "Join the <strong>#VALENZOPREMIUM</strong>. Be the first to witness our new drops, behind-the-scenes content, and exclusive style edits directly on our feed.",
        linkAbout: "ABOUT US",
        linkContact: "CONTACT US",
        linkDelivery: "DELIVERY & RETURNS",
        footFollowTitle: "FOLLOW VALENZO PREMIUM", 
        footFollowDesc: "There is always something more for you to discover.",
        footBrandTitle: "BE PART OF THE LEGACY", 
        footBrandText: "Join the <strong>#VALENZOPREMIUM</strong>. Be the first to witness our new drops, behind-the-scenes content, and exclusive style edits directly on our feed.",
        linkAbout: "ABOUT US", 
        linkContact: "CONTACT US", 
        linkDelivery: "DELIVERY & RETURNS",
        menuHome: "HOME", 
        menuAbout: "ABOUT US", 
        menuContact: "CONTACT US", 
        menuDelivery: "DELIVERY & RETURNS",
        aboutTitle: "THE LEGACY BEGINS",
        aboutText1: "Established in 2026, VALENZO PREMIUM was born from a desire to redefine modern masculinity through textiles. We are not just selling clothes; we are curating an attitude.",
        aboutSubTitle: "WHY ONLY INSTAGRAM?",
        aboutText2: "In a world of automated checkouts and cold transactions, we choose connection. Customer satisfaction is our obsession. By communicating directly with you, we ensure that every detail meets your expectations.",
        contactTitle: "GET IN TOUCH", 
        contactDesc: "We are available for your inquiries, styling advice, and orders.",
        contactInstaText: "The fastest way to reach us.",
        delTitle: "DELIVERY & RETURNS", 
        delSub1: "PREMIUM PACKAGING", 
        delText1: "Every item is prepared with meticulous care. Your order arrives in original VALENZO packaging.",
        delSub2: "SHIPPING", 
        delText2: "We partner with elite courier services to ensure your package arrives safely and promptly.",
        delSub3: "RETURN POLICY", 
        delText3: "<strong>Hygiene & Exclusivity:</strong> We do not accept returns on items that have been unsealed or worn.",
        delText4: "<strong>Size Exchange:</strong> If the fit isn't perfect, we are happy to assist with a size exchange.",
    },
    sq: {
        mottoTitle: "Veshje Luksoze për Meshkuj",
        mottoDesc: "Elegancë e përjetshme. Ekskluzivitet i pastër.",
        heroNote: "Blerja e disponueshme vetëm përmes Instagramit.",
        catAll: "Të Gjitha",
        catShirt: "Bluza",
        catSweatshirt: "Sweatshirts", // Genelde aynı kullanılır veya "Duksa"
        catUnderwear: "Të Brendshme",
        catHat: "Kapele",
        catPants: "Pantallona",
        labelSize: "MASA: JU LUTEM ZGJIDHNI",
        labelDetails: "DETAJET E PRODUKTIT",
        noteTitle: "SI TË BLINI?",
        noteText: 'Ju lutemi na kontaktoni përmes <a href="https://www.instagram.com/valenzo.premium/" target="_blank">Instagram DM</a> për të blerë këtë artikull.',
        comingSoon: "SË SHPEJTI",
        csModalTitle: "SË SHPEJTI",
        csModalText: "Ky koleksion ekskluziv është rrugës.<br><br>Keni ndonjë kërkesë specifike? Mendimi juaj është i rëndësishëm për ne. Na kontaktoni direkt në Instagram.",
        csBtnText: "KONTAKTONI NË INSTAGRAM",
        promoFree: "TRANSPORT FALAS NË TË GJITHA POROSITË",
        promoSale: "ULJE:",
        promoMen: "MESHKUJ",
        promoWomen: "FEMRA",
        footFollowTitle: "NDIQNI VALENZO PREMIUM",
        footFollowDesc: "Gjithmonë ka diçka më shumë për të zbuluar.",
        footBrandText: "Bashkohu me <strong>#VALENZOPREMIUM</strong>. Bëhu i pari që sheh koleksionet e reja, prapaskenat dhe këshillat ekskluzive të stilit direkt në profilin tonë.",
        linkAbout: "RRETH NESH",
        linkContact: "NA KONTAKTONI",
        linkDelivery: "DËRGIMI & KTHIMET",
        footFollowTitle: "NDIQNI VALENZO PREMIUM",
        footFollowDesc: "Gjithmonë ka diçka më shumë për të zbuluar.",
        footBrandTitle: "BËHU PJESË E TRASHËGIMISË", // Burası eksikti, o yüzden undefined diyordu
        footBrandText: "Bashkohu me <strong>#VALENZOPREMIUM</strong>. Bëhu i pari që sheh koleksionet e reja, prapaskenat dhe këshillat ekskluzive të stilit direkt në profilin tonë.",
        linkAbout: "RRETH NESH",
        linkContact: "NA KONTAKTONI",
        linkDelivery: "DËRGIMI & KTHIMET",
        menuHome: "BALLINA", 
        menuAbout: "RRETH NESH", 
        menuContact: "NA KONTAKTONI",
         menuDelivery: "DËRGIMI & KTHIMET",
        aboutTitle: "TRASHËGIMIA FILLON", 
        aboutText1: "E themeluar në vitin 2026, VALENZO PREMIUM lindi nga dëshira për të riuformuar maskulinitetin modern përmes tekstileve.",
        aboutSubTitle: "PSE VETËM INSTAGRAM?", 
        aboutText2: "Në një botë me arka automatike, ne zgjedhim lidhjen njerëzore. Kënaqësia e klientit është obsesioni ynë.",
        contactTitle: "NA KONTAKTONI", 
        contactDesc: "Ne jemi në dispozicion për pyetjet tuaja, këshilla stili dhe porosi.",
        contactInstaText: "Mënyra më e shpejtë për të na kontaktuar.",
        delTitle: "DËRGIMI & KTHIMET", 
        delSub1: "PAKETIM PREMIUM", 
        delText1: "Çdo artikull përgatitet me kujdes të përpiktë. Porosia juaj arrin në paketimin origjinal VALENZO.",
        delSub2: "DËRGIMI", 
        delText2: "Ne bashkëpunojmë me shërbime elitare korrierësh për të siguruar që pakoja juaj të arrijë e sigurt.",
        delSub3: "POLITIKA E KTHIMIT", 
        delText3: "<strong>Higjiena & Ekskluziviteti:</strong> Ne nuk pranojmë kthime për artikujt që janë hapur ose veshur.",
        delText4: "<strong>Ndërrimi i Masës:</strong> Nëse masa nuk është perfekte, ne me kënaqësi ju ndihmojmë me ndërrimin e masës.",
    }
};

// --- 3. BÖLÜM: YÖNLENDİRME SİSTEMİ (ROUTER - EN ÖNEMLİ KISIM) ---
// Tarayıcının adres çubuğundaki değişikliği dinler (#about, #contact vb.)

window.addEventListener('load', handleRouting);
window.addEventListener('hashchange', handleRouting);

function handleRouting() {
    let hash = window.location.hash.substring(1); // # işaretini at

    // 1. Durum: Ana Sayfa (Hash yoksa)
    if (!hash || hash === "") {
        // Her şeyi kapat
        document.getElementById('info-page').style.display = 'none';
        document.getElementById('productModal').style.display = 'none';
        document.getElementById('csModal').style.display = 'none';
        document.body.style.overflow = 'auto'; // Kaydırmayı aç
        
        // Menüdeki aktiflikleri sil
        document.querySelectorAll('.info-link').forEach(l => l.classList.remove('active'));
        return;
    }

    // 2. Durum: Bilgi Sayfaları (About, Contact, Delivery)
    if (['about', 'contact', 'delivery'].includes(hash)) {
        // Diğer pencereleri kapat
        document.getElementById('productModal').style.display = 'none';
        document.getElementById('csModal').style.display = 'none';
        
        // Bilgi sayfasını aç
        const page = document.getElementById('info-page');
        page.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Menüdeki ilgili linki parlat
        document.querySelectorAll('.info-link').forEach(link => link.classList.remove('active'));
        const activeLink = document.getElementById('menu-' + hash);
        if(activeLink) activeLink.classList.add('active');

        // Sağ taraftaki içeriği göster
        document.querySelectorAll('.info-tab-content').forEach(content => content.classList.remove('active'));
        const targetContent = document.getElementById('tab-' + hash);
        if(targetContent) targetContent.classList.add('active');
        
        return;
    }

    // 3. Durum: Ürün Sayfaları
    const pIndex = products.findIndex(p => p.id === hash);
    if (pIndex > -1) {
        document.getElementById('info-page').style.display = 'none';
        const product = products[pIndex];
        if (product.comingSoon) {
            openComingSoonModal();
        } else {
            openProduct(pIndex, false);
        }
    }
}

// --- 4. BÖLÜM: DİĞER FONKSİYONLAR ---

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    setLanguage('en');
    filterSelection('all');
});

function renderProducts() {
    const container = document.getElementById('productContainer');
    container.innerHTML = "";

    // --- SIRALAMA AYARI ---
    // Ürünleri iki gruba ayırıyoruz: Gerçek Ürünler ve Gelecek Olanlar
    const realProducts = products.filter(p => !p.comingSoon);
    const comingSoonProducts = products.filter(p => p.comingSoon);
    
    // Önce gerçek ürünleri, sonra coming soon olanları birleştirip listeliyoruz
    const sortedProducts = realProducts.concat(comingSoonProducts);

    sortedProducts.forEach((p) => {
        const card = document.createElement('div');
        // Tıklayınca URL'i değiştir (#hat1 gibi) -> handleRouting çalışır
        card.onclick = () => { window.location.hash = p.id; };
        card.style.cursor = "pointer";
        
        if (p.comingSoon) {
            card.className = `products-card ${p.category} coming-soon-card`;
            card.innerHTML = `<div class="products-img-thumb coming-soon-img"><span class="cs-text">VALENZO</span></div>
                              <div class="products-info"><h3 class="cs-title" data-en="COMING SOON" data-sq="SË SHPEJTI">COMING SOON</h3><span class="price">--</span></div>`;
        } else {
            card.className = `products-card ${p.category}`;
            card.innerHTML = `<div class="products-img-thumb"><img src="${p.image}" alt="${p.title}"></div>
                              <div class="products-info"><h3 class="p-name" data-en="${p.title}" data-sq="${p.titleSq}">${p.title}</h3><span class="price">${p.price}</span></div>`;
        }
        container.appendChild(card);
    });
}

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.querySelectorAll('.lang-switch button').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + lang).classList.add('active');
    
    // Ana Sayfa
    document.getElementById('motto-title').innerText = t.mottoTitle;
    document.getElementById('motto-desc').innerText = t.mottoDesc;
    document.getElementById('hero-note').innerHTML = t.heroNote.replace('Instagram', '<i>Instagram</i>');
    document.getElementById('cat-all').innerText = t.catAll;
    document.getElementById('cat-shirt').innerText = t.catShirt;
    document.getElementById('cat-sweatshirt').innerText = t.catSweatshirt;
    document.getElementById('cat-pants').innerText = t.catPants;
    document.getElementById('cat-underwear').innerText = t.catUnderwear;
    document.getElementById('cat-hat').innerText = t.catHat;
    

    // Info Page & Footer
    if(document.getElementById('menu-home')) {
        document.getElementById('menu-home').innerText = t.menuHome;
        document.getElementById('menu-about').innerText = t.menuAbout;
        document.getElementById('menu-contact').innerText = t.menuContact;
        document.getElementById('menu-delivery').innerText = t.menuDelivery;
        document.getElementById('about-title').innerText = t.aboutTitle;
        document.getElementById('about-text-1').innerHTML = t.aboutText1;
        document.getElementById('about-sub-title').innerText = t.aboutSubTitle;
        document.getElementById('about-text-2').innerText = t.aboutText2;
        document.getElementById('contact-title').innerText = t.contactTitle;
        document.getElementById('contact-desc').innerText = t.contactDesc;
        document.getElementById('del-title').innerText = t.delTitle;
        document.getElementById('del-sub-1').innerText = t.delSub1;
        document.getElementById('del-text-1').innerText = t.delText1;
        document.getElementById('del-sub-2').innerText = t.delSub2;
        document.getElementById('del-text-2').innerText = t.delText2;
        document.getElementById('del-sub-3').innerText = t.delSub3;
        document.getElementById('del-text-3').innerHTML = t.delText3;
        document.getElementById('del-text-4').innerHTML = t.delText4;
        
        document.getElementById('foot-follow-title').innerText = t.footFollowTitle;
        document.getElementById('foot-follow-desc').innerText = t.footFollowDesc;
        document.getElementById('foot-brand-title').innerText = t.footBrandTitle;
        document.getElementById('foot-brand-text').innerHTML = t.footBrandText;
        document.getElementById('link-about').innerText = t.linkAbout;
        document.getElementById('link-contact').innerText = t.linkContact;
        document.getElementById('link-delivery').innerText = t.linkDelivery;
    }

    // Modal
    document.getElementById('label-size').innerText = t.labelSize;
    document.getElementById('label-details').innerText = t.labelDetails;
    document.getElementById('note-title').innerText = t.noteTitle;
    document.getElementById('note-text').innerHTML = t.noteText;
    document.getElementById('cs-modal-title').innerText = t.csModalTitle;
    document.getElementById('cs-modal-text').innerHTML = t.csModalText;
    document.querySelector('.cs-instagram-btn').innerText = t.csBtnText;
    document.getElementById('promo-text-free').innerText = t.promoFree;
    document.getElementById('promo-text-sale').innerText = t.promoSale;
    document.getElementById('promo-text-men').innerText = t.promoMen;
    document.getElementById('promo-text-women').innerText = t.promoWomen;

    // Ürün Modalı Açıksa Dilini Güncelle
    if(currentProduct && !currentProduct.comingSoon) {
        document.getElementById('modalTitle').innerText = (lang === 'en') ? currentProduct.title : currentProduct.titleSq;
    }

    // 1. Vitrindeki Kart İsimlerini Güncelle
    const productTitles = document.querySelectorAll('.p-name');
    productTitles.forEach(title => {
        if(lang === 'en') {
            title.innerText = title.getAttribute('data-en');
        } else {
            title.innerText = title.getAttribute('data-sq');
        }
    });

    // 2. Eğer Ürün Detayı Açıksa Açıklamasını Güncelle
    if(currentProduct && !currentProduct.comingSoon) {
        document.getElementById('modalTitle').innerText = (lang === 'en') ? currentProduct.title : currentProduct.titleSq;
        
        const descEl = document.getElementById('modalDesc');
        if(descEl) {
            // Sadece seçili dili göster
            descEl.innerText = (lang === 'en') ? (currentProduct.descEn || "") : (currentProduct.descSq || "");
        }
    }
}

// Modal Açma Fonksiyonu
function openProduct(index, updateUrl = true) {
    const p = products[index];
    currentProduct = p;
    
    // 1. Başlık
    document.getElementById('modalTitle').innerText = (currentLang === 'en') ? p.title : p.titleSq;
    
    // 2. Fiyat
    document.getElementById('modalPrice').innerText = p.price;

    // 3. AÇIKLAMA (Düzeltildi)
    // Listeden bağımsız olarak sadece burada gösterilecek.
    const descEl = document.getElementById('modalDesc');
    if(descEl) {
        descEl.innerText = (currentLang === 'en') ? (p.descEn || "") : (p.descSq || "");
    }

    // 4. ÖZELLİKLER (Features)
    // Server.js'de buradan açıklamaları çıkardığımız için artık temiz gelecek.
    const specList = document.getElementById('modalSpecs');
    specList.innerHTML = "";
    p.specs.forEach(s => specList.innerHTML += `<li>${s}</li>`);

    // 5. Resimler
    const imgContainer = document.getElementById('modalImagesContainer');
    imgContainer.innerHTML = "";
    p.images.forEach((img, i) => {
        const div = document.createElement('div');
        div.className = 'detail-img-item';
        div.innerHTML = `<img src="${img}" alt="Detail">`;
        div.onclick = () => openLightbox(i);
        imgContainer.appendChild(div);
    });

    // Modalı Göster
    document.getElementById('productModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Modal Kapatma Fonksiyonu
function closeProductModal() {
    // URL'yi temizle (Hashchange tetiklemez)
    history.pushState("", document.title, window.location.pathname + window.location.search);
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProduct = null;
    
    // Geri tuşuyla uyumluluk için handleRouting'i manuel çağırıp UI güncelliyoruz
    handleRouting();
}

function openComingSoonModal() { document.getElementById('csModal').style.display = 'block'; }

function closeComingSoonModal() {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    document.getElementById('csModal').style.display = 'none';
    handleRouting();
}

// Lightbox
function openLightbox(imgIndex) {
    const lb = document.getElementById('lightbox');
    const thumbContainer = document.getElementById('lbThumbContainer');
    const mainImg = document.getElementById('lbMainImg');
    thumbContainer.innerHTML = "";
    currentProduct.images.forEach((img, i) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.className = 'lb-thumb';
        if(i === imgIndex) thumb.classList.add('active');
        thumb.onclick = () => {
            document.querySelectorAll('.lb-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImg.src = img;
        };
        thumbContainer.appendChild(thumb);
    });
    mainImg.src = currentProduct.images[imgIndex];
    lb.style.display = 'flex';
}
function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }

// Filtreleme
function filterSelection(c) {
    const btns = document.getElementsByClassName("filter-btn");
    for (let i = 0; i < btns.length; i++) btns[i].classList.remove("active");
    let targetId = (c === 'all' || c === '') ? 'cat-all' : 'cat-' + c;
    if(document.getElementById(targetId)) document.getElementById(targetId).classList.add("active");
    if (c == "all") c = "";
    let comingSoonGosterildi = false;
    const cards = document.getElementsByClassName("products-card");
    for (let i = 0; i < cards.length; i++) {
        let kart = cards[i];
        let isComingSoon = kart.classList.contains("coming-soon-card");
        kart.style.display = "none";
        if (c === "" || kart.classList.contains(c)) {
            if (c === "" && isComingSoon) {
                if (!comingSoonGosterildi) { kart.style.display = "block"; comingSoonGosterildi = true; }
            } else { kart.style.display = "block"; }
        }
    }
}

// Beden Seçimi
document.querySelectorAll('.size-box').forEach(box => {
    box.addEventListener('click', function() {
        document.querySelectorAll('.size-box').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Promo Bar
let slideIndex = 0;
const slides = document.querySelectorAll(".promo-slide");
let slideInterval;
function showSlides(n) {
    if(!slides.length) return;
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    slides.forEach(slide => slide.classList.remove("active"));
    slides[slideIndex].classList.add("active");
}
function changeSlide(n) { slideIndex += n; showSlides(slideIndex); resetTimer(); }
function startTimer() {
    if(slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => { slideIndex++; showSlides(slideIndex); }, 4000);
}
function resetTimer() { clearInterval(slideInterval); startTimer(); }
startTimer();

// Scroll Events (Promo Bar & Yukarı Çık Butonu)
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", function() {
    const promoBar = document.getElementById("promoBar");
    if(promoBar) {
        if (window.scrollY > 50) promoBar.classList.add("hidden");
        else promoBar.classList.remove("hidden");
    }
    if(scrollBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) scrollBtn.style.display = "block";
        else scrollBtn.style.display = "none";
    }
});
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// --- MOBİL MENÜYÜ AÇ/KAPA ---
function toggleMobileMenu() {
    // Menüyü bul ve aç/kapa yap
    document.getElementById('infoSidebar').classList.toggle('active');
}

function closeMobileMenu() {
    // Menüyü kapat
    document.getElementById('infoSidebar').classList.remove('active');
}