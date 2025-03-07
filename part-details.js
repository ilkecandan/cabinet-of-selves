const params = new URLSearchParams(window.location.search);
const partName = params.get('part');

// Load part details (including image)
let part = JSON.parse(localStorage.getItem(`part-${partName}`)) || {};
let allParts = JSON.parse(localStorage.getItem('innerParts')) || [];

// Pre-fill data on page load
document.getElementById('partTitle').innerText = `Meet ${partName}`;
document.getElementById('partSince').value = part.knownSince || '';
document.getElementById('partWants').value = part.wants || '';
document.getElementById('partWorksWith').value = part.worksWith || '';
document.getElementById('partClashesWith').value = part.clashesWith || '';
document.getElementById('partRole').value = part.role || '';
document.getElementById('partImagePreview').src = part.image || 'images/girl.jpg';

// Handle image upload (with immediate save and notification)
document.getElementById('partImageInput').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const newImage = reader.result;
            document.getElementById('partImagePreview').src = newImage;
            part.image = newImage;

            savePart(true);  // Save immediately
            showNotification('✅ Your image has been uploaded and saved!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

// Save button logic
function savePartDetails() {
    part.knownSince = document.getElementById('partSince').value;
    part.wants = document.getElementById('partWants').value;
    part.worksWith = document.getElementById('partWorksWith').value;
    part.clashesWith = document.getElementById('partClashesWith').value;
    part.role = document.getElementById('partRole').value;

    savePart();
    showNotification('✅ All details saved successfully!', 'success');
}

// Save part data to both part-{partName} and innerParts
function savePart(isImageOnly = false) {
    localStorage.setItem(`part-${partName}`, JSON.stringify(part));

    // Update or add the part in innerParts
    const index = allParts.findIndex(p => p.name === partName);
    if (index !== -1) {
        allParts[index].img = part.image;
    } else if (!isImageOnly) {
        allParts.push({ name: partName, img: part.image });
    }

    localStorage.setItem('innerParts', JSON.stringify(allParts));
}

// Show floating notification (toasts)
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '8px';
    notification.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// Language system (already working, included for completeness)
const translations = {
    en: {
        pageTitle: `Meet ${partName}`,
        pageDescription: "This is a gentle place to explore and understand this part of you.",
        labelKnownSince: "🌱 How long have you known this part?",
        labelWants: "💬 What does this part want for you?",
        labelWorksWith: "🌟 Which parts does this part work well with?",
        labelClashesWith: "⚔️ Which parts does this part clash with?",
        labelRole: "🎭 What role does this part play?",
        saveButton: "💾 Save Part Details",
        backCabinetButton: "⬅️ Back to Cabinet",
        backPartsButton: "📂 Back to All Parts",
        knownSincePlaceholder: "A long time, since childhood, etc."
    },
    tr: {
        pageTitle: `${partName} ile Tanış`,
        pageDescription: "Bu, bu parçanızı keşfetmek ve anlamak için nazik bir alandır.",
        labelKnownSince: "🌱 Bu parçayı ne zamandır tanıyorsunuz?",
        labelWants: "💬 Bu parça sizden ne istiyor?",
        labelWorksWith: "🌟 Bu parça hangi parçalarla iyi çalışıyor?",
        labelClashesWith: "⚔️ Bu parça hangi parçalarla çatışıyor?",
        labelRole: "🎭 Bu parça hangi rolü oynuyor?",
        saveButton: "💾 Parça Detaylarını Kaydet",
        backCabinetButton: "⬅️ Kabine Geri Dön",
        backPartsButton: "📂 Tüm Parçalar'a Geri Dön",
        knownSincePlaceholder: "Uzun zamandır, çocukluktan beri, vb."
    },
    de: {
        pageTitle: `Lerne ${partName} kennen`,
        pageDescription: "Dies ist ein sanfter Ort, um diesen Teil von dir zu erkunden und zu verstehen.",
        labelKnownSince: "🌱 Wie lange kennst du diesen Teil?",
        labelWants: "💬 Was will dieser Teil von dir?",
        labelWorksWith: "🌟 Mit welchen Teilen arbeitet dieser Teil gut zusammen?",
        labelClashesWith: "⚔️ Mit welchen Teilen gerät dieser Teil in Konflikt?",
        labelRole: "🎭 Welche Rolle spielt dieser Teil?",
        saveButton: "💾 Teil speichern",
        backCabinetButton: "⬅️ Zurück zum Kabinett",
        backPartsButton: "📂 Zurück zu allen Teilen",
        knownSincePlaceholder: "Seit langer Zeit, seit der Kindheit, etc."
    }
};

function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    const t = translations[lang];

    document.title = t.pageTitle;
    document.getElementById('partTitle').innerText = t.pageTitle;
    document.getElementById('pageDescription').innerText = t.pageDescription;
    document.getElementById('labelKnownSince').innerText = t.labelKnownSince;
    document.getElementById('labelWants').innerText = t.labelWants;
    document.getElementById('labelWorksWith').innerText = t.labelWorksWith;
    document.getElementById('labelClashesWith').innerText = t.labelClashesWith;
    document.getElementById('labelRole').innerText = t.labelRole;
    document.getElementById('saveButton').innerText = t.saveButton;
    document.getElementById('backCabinetButton').innerText = t.backCabinetButton;
    document.getElementById('backPartsButton').innerText = t.backPartsButton;

    document.getElementById('partSince').placeholder = t.knownSincePlaceholder;
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('language') || 'en';
    document.getElementById('language').value = lang;
    switchLanguage(lang);
});
