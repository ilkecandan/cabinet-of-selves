const params = new URLSearchParams(window.location.search);
const partName = params.get('part');

let part = JSON.parse(localStorage.getItem(`part-${partName}`)) || {};
let allParts = JSON.parse(localStorage.getItem('innerParts')) || [];

document.getElementById('partTitle').innerText = `Meet ${partName}`;
document.getElementById('partSince').value = part.knownSince || '';
document.getElementById('partWants').value = part.wants || '';
document.getElementById('partWorksWith').value = part.worksWith || '';
document.getElementById('partClashesWith').value = part.clashesWith || '';
document.getElementById('partRole').value = part.role || '';
document.getElementById('partImagePreview').src = part.image || 'images/girl.jpg';

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

function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 18px';
    notification.style.color = 'white';
    notification.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('language') || 'en';
    document.getElementById('language').value = lang;
    switchLanguage(lang);
});

function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    // Use your existing translations object for part-details here (same logic as you had)
}
