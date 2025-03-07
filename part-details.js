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
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 18px';
    notification.style.borderRadius = '8px';
    notification.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.style.fontWeight = 'bold';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// Language Handling (keep as you had it)
const translations = { /* your existing language objects here */ };

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
