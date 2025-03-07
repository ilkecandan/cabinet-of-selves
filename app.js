document.addEventListener('DOMContentLoaded', () => {
    loadParts();

    if (!localStorage.getItem('hasVisitedBefore')) {
        const welcomeAnimation = document.getElementById('welcomeAnimation');
        if (welcomeAnimation) {
            welcomeAnimation.style.display = 'flex';
            setTimeout(() => {
                welcomeAnimation.style.display = 'none';
                localStorage.setItem('hasVisitedBefore', 'true');
            }, 5000);
        }
    }

    const addPartButton = document.getElementById('addNewPartButton');
    if (addPartButton) addPartButton.addEventListener('click', showAddPartModal);

    const confirmAddPartButton = document.getElementById('confirmAddPart');
    if (confirmAddPartButton) confirmAddPartButton.addEventListener('click', addPart);

    // Language setup
    const lang = localStorage.getItem('language') || 'en';
    document.getElementById('language').value = lang;
    switchLanguage(lang);
});

function showAddPartModal() {
    document.getElementById('partModal').style.display = 'block';
}

function hideAddPartModal() {
    document.getElementById('partModal').style.display = 'none';
}

function addPart() {
    const partName = document.getElementById('partName').value.trim();

    if (!partName) {
        showNotification('⚠️ Please enter a name for the part.', 'error');
        return;
    }

    const parts = JSON.parse(localStorage.getItem('innerParts') || '[]');
    if (parts.some(part => part.name === partName)) {
        showNotification('⚠️ A part with this name already exists.', 'error');
        return;
    }

    parts.push({ name: partName, img: 'images/girl.jpg' }); // Default image
    localStorage.setItem('innerParts', JSON.stringify(parts));

    showNotification(translations[currentLanguage].partAdded, 'success');
    hideAddPartModal();

    setTimeout(() => {
        window.location.href = 'parts.html';
    }, 1000); // Short delay to show the notification before navigating
}

function loadParts() {
    const parts = JSON.parse(localStorage.getItem('innerParts') || '[]');
    const container = document.querySelector('.parts-table');

    if (container) {
        container.innerHTML = '';
        parts.forEach(part => {
            const card = document.createElement('div');
            card.className = 'part-card';
            card.innerHTML = `
                <img src="${part.img}" class="part-image" alt="${part.name}">
                <span class="part-name">${part.name}</span>
                <button onclick="location.href='part-details.html?part=${encodeURIComponent(part.name)}'">View</button>
            `;
            container.appendChild(card);
        });
    }
}

// 🔔 Floating Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 🈯️ Language Switching with Global Translations
const translations = {
    en: {
        addPartHeading: "Add a New Part",
        partNameLabel: "Part Name:",
        confirmAddPart: "Add",
        cancelButton: "Cancel",
        partAdded: "✅ Part added successfully!",
        partNamePlaceholder: "Enter part name"
    },
    tr: {
        addPartHeading: "Yeni Bir Parça Ekle",
        partNameLabel: "Parça Adı:",
        confirmAddPart: "Ekle",
        cancelButton: "İptal",
        partAdded: "✅ Parça başarıyla eklendi!",
        partNamePlaceholder: "Parça adını girin"
    },
    de: {
        addPartHeading: "Neuen Teil hinzufügen",
        partNameLabel: "Teilname:",
        confirmAddPart: "Hinzufügen",
        cancelButton: "Abbrechen",
        partAdded: "✅ Teil erfolgreich hinzugefügt!",
        partNamePlaceholder: "Teilname eingeben"
    }
};

let currentLanguage = 'en'; // Default language

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    const t = translations[lang];

    if (document.getElementById('addPartHeading')) {
        document.getElementById('addPartHeading').innerText = t.addPartHeading;
        document.getElementById('partNameLabel').innerText = t.partNameLabel;
        document.getElementById('confirmAddPart').innerText = t.confirmAddPart;
        document.getElementById('cancelButton').innerText = t.cancelButton;
        document.getElementById('partName').placeholder = t.partNamePlaceholder;
    }

    // Other elements on index.html
    if (document.getElementById('title')) document.getElementById('title').innerText = t.title || "Cabinet of Selves";
    if (document.getElementById('welcomeTitle')) document.getElementById('welcomeTitle').innerText = t.welcomeTitle || "";
    if (document.getElementById('welcomeSubtitle')) document.getElementById('welcomeSubtitle').innerText = t.welcomeSubtitle || "";
    if (document.getElementById('welcomeText')) document.getElementById('welcomeText').innerText = t.welcomeText || "";
    if (document.getElementById('partsHeading')) document.getElementById('partsHeading').innerText = t.partsHeading || "";
    if (document.getElementById('seeAllPartsButton')) document.getElementById('seeAllPartsButton').innerText = t.seeAllPartsButton || "";
    if (document.getElementById('addNewPartButton')) document.getElementById('addNewPartButton').innerText = t.addNewPartButton || "";
    if (document.getElementById('checkInHeading')) document.getElementById('checkInHeading').innerText = t.checkInHeading || "";
    if (document.getElementById('startCheckInButton')) document.getElementById('startCheckInButton').innerText = t.startCheckInButton || "";
    if (document.getElementById('viewCheckInHistoryButton')) document.getElementById('viewCheckInHistoryButton').innerText = t.viewCheckInHistoryButton || "";
    if (document.getElementById('resourcesHeading')) document.getElementById('resourcesHeading').innerText = t.resourcesHeading || "";
    if (document.getElementById('youAreEnoughText')) document.getElementById('youAreEnoughText').innerText = t.youAreEnoughText || "";
}
