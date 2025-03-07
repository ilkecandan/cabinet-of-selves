const params = new URLSearchParams(window.location.search);
const partName = params.get('part');

// Set page title to include the part's name
document.getElementById('partTitle').innerText = `Meet ${partName}`;

// Load the part details from localStorage
let part = JSON.parse(localStorage.getItem(`part-${partName}`)) || {};

// Pre-fill all fields and set image preview (use default if none saved)
document.getElementById('partSince').value = part.knownSince || '';
document.getElementById('partWants').value = part.wants || '';
document.getElementById('partWorksWith').value = part.worksWith || '';
document.getElementById('partClashesWith').value = part.clashesWith || '';
document.getElementById('partRole').value = part.role || '';
document.getElementById('partImagePreview').src = part.image || 'images/girl.jpg';

// Handle image upload with preview and immediate save
document.getElementById('partImageInput').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById('partImagePreview').src = reader.result;

            // Save image immediately into the part object and localStorage
            part.image = reader.result;
            localStorage.setItem(`part-${partName}`, JSON.stringify(part));

            alert('Image uploaded successfully!');
        };
        reader.readAsDataURL(file);
    }
});

// Save part details (text inputs) to localStorage when the user clicks save
function savePartDetails() {
    const updatedPart = {
        knownSince: document.getElementById('partSince').value,
        wants: document.getElementById('partWants').value,
        worksWith: document.getElementById('partWorksWith').value,
        clashesWith: document.getElementById('partClashesWith').value,
        role: document.getElementById('partRole').value,
        image: part.image || document.getElementById('partImagePreview').src // Ensure image is preserved
    };

    localStorage.setItem(`part-${partName}`, JSON.stringify(updatedPart));
    alert('Details saved!');
}

// Language support logic (this works with the language selector in the HTML)
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
