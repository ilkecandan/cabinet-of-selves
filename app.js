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

    parts.push({ name: partName, img: 'images/girl.jpg' });
    localStorage.setItem('innerParts', JSON.stringify(parts));

    showNotification(translations[currentLanguage].partAdded, 'success');
    hideAddPartModal();

    setTimeout(() => {
        window.location.href = 'parts.html';
    }, 1000);
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

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

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

let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    const t = translations[lang];

    ['addPartHeading', 'partNameLabel', 'confirmAddPart', 'cancelButton'].forEach(id => {
        if (document.getElementById(id)) document.getElementById(id).innerText = t[id];
    });

    if (document.getElementById('partName')) {
        document.getElementById('partName').placeholder = t.partNamePlaceholder;
    }
}
