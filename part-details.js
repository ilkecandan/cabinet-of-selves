const params = new URLSearchParams(window.location.search);
const partName = params.get('part');

// Load the part details from localStorage on page load
let part = JSON.parse(localStorage.getItem(`part-${partName}`)) || {};

// Set page title to include the part's name
document.getElementById('partTitle').innerText = `Meet ${partName}`;

// Pre-fill all fields and set image preview (use default if none saved)
document.getElementById('partSince').value = part.knownSince || '';
document.getElementById('partWants').value = part.wants || '';
document.getElementById('partWorksWith').value = part.worksWith || '';
document.getElementById('partClashesWith').value = part.clashesWith || '';
document.getElementById('partRole').value = part.role || '';
document.getElementById('partImagePreview').src = part.image || 'images/girl.jpg';

// Handle image upload with preview and **immediate save** to localStorage
document.getElementById('partImageInput').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById('partImagePreview').src = reader.result;

            // Immediately save the new image to localStorage
            part.image = reader.result;
            localStorage.setItem(`part-${partName}`, JSON.stringify(part));

            alert('✅ Your image has been uploaded and saved!');
        };
        reader.readAsDataURL(file);
    }
});

// Save all part details (including any previously saved image) when user clicks save
function savePartDetails() {
    // Reload part to ensure we don’t lose previously saved fields (like the image)
    const existingPart = JSON.parse(localStorage.getItem(`part-${partName}`)) || {};

    const updatedPart = {
        knownSince: document.getElementById('partSince').value,
        wants: document.getElementById('partWants').value,
        worksWith: document.getElementById('partWorksWith').value,
        clashesWith: document.getElementById('partClashesWith').value,
        role: document.getElementById('partRole').value,
        image: existingPart.image || document.getElementById('partImagePreview').src // Preserve image
    };

    localStorage.setItem(`part-${partName}`, JSON.stringify(updatedPart));
    alert('✅ Details saved successfully!');
}

// Language handling (this part stays as you already have it working)
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
