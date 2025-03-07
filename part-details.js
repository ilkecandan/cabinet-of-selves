const params = new URLSearchParams(window.location.search);
const partName = params.get('part');

// Load existing part details and the master parts list
let part = JSON.parse(localStorage.getItem(`part-${partName}`)) || {};
let allParts = JSON.parse(localStorage.getItem('innerParts')) || [];

// Pre-fill data when page loads
document.getElementById('partTitle').innerText = `Meet ${partName}`;
document.getElementById('partSince').value = part.knownSince || '';
document.getElementById('partWants').value = part.wants || '';
document.getElementById('partWorksWith').value = part.worksWith || '';
document.getElementById('partClashesWith').value = part.clashesWith || '';
document.getElementById('partRole').value = part.role || '';
document.getElementById('partImagePreview').src = part.image || 'images/girl.jpg';

// Handle image upload (preview, save to both places, show notification)
document.getElementById('partImageInput').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const newImage = reader.result;
            document.getElementById('partImagePreview').src = newImage;
            part.image = newImage;

            savePart(true);
            showNotification('✅ Your image has been uploaded and saved!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

function savePartDetails() {
    part.knownSince = document.getElementById('partSince').value;
    part.wants = document.getElementById('partWants').value;
    part.worksWith = document.getElementById('partWorksWith').value;
    part.clashesWith = document.getElementById('partClashesWith').value;
    part.role = document.getElementById('partRole').value;

    savePart();
    showNotification('✅ All details saved successfully!', 'success');
}

// Save part to both part-{name} and innerParts
function savePart(isImageOnly = false) {
    localStorage.setItem(`part-${partName}`, JSON.stringify(part));

    const index = allParts.findIndex(p => p.name === partName);
    if (index !== -1) {
        allParts[index].img = part.image;
    } else if (!isImageOnly) {
        allParts.push({ name: partName, img: part.image || 'images/girl.jpg' });
    }

    localStorage.setItem('innerParts', JSON.stringify(allParts));
}

// Floating notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications to prevent stacking
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 18px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.fontFamily = 'Quicksand, Arial, sans-serif';

    if (type === 'success') {
        notification.style.backgroundColor = '#4caf50';
    } else {
        notification.style.backgroundColor = '#f44336';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Language Handling System
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

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('language') || 'en';
    document.getElementById('language').value = lang;
    switchLanguage(lang);
});
