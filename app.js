// app.js - Cabinet of Selves Core Functionality

document.addEventListener('DOMContentLoaded', () => {
    // Handle Welcome Animation on First Visit
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

    // Load Language & Parts
    const lang = localStorage.getItem('language') || 'en';
    document.getElementById('language').value = lang;
    switchLanguage(lang);

    if (document.getElementById('addNewPartButton')) {
        document.getElementById('addNewPartButton').addEventListener('click', showAddPartModal);
    }
    if (document.getElementById('confirmAddPart')) {
        document.getElementById('confirmAddPart').addEventListener('click', addPart);
    }

    // Load parts on index if available
    if (document.querySelector('.parts-table')) {
        loadParts();
    }
});

// Show Add Part Modal
function showAddPartModal() {
    document.getElementById('partModal').style.display = 'block';
}

// Hide Add Part Modal
function hideAddPartModal() {
    document.getElementById('partModal').style.display = 'none';
}

// Add New Part to Local Storage
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

// Load Parts into Grid (Index Page)
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
                <button onclick="location.href='part-details.html?part=${encodeURIComponent(part.name)}'">${translations[currentLanguage].view}</button>
            `;
            container.appendChild(card);
        });
    }
}

// Show Notification (For Feedback)
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// Language Switching
const translations = {
    en: {
        addPartHeading: "Add a New Part",
        partNameLabel: "Part Name:",
        confirmAddPart: "Add",
        cancelButton: "Cancel",
        partAdded: "✅ Part added successfully!",
        partNamePlaceholder: "Enter part name",
        view: "View"
    },
    tr: {
        addPartHeading: "Yeni Bir Parça Ekle",
        partNameLabel: "Parça Adı:",
        confirmAddPart: "Ekle",
        cancelButton: "İptal",
        partAdded: "✅ Parça başarıyla eklendi!",
        partNamePlaceholder: "Parça adını girin",
        view: "Görüntüle"
    },
    de: {
        addPartHeading: "Neuen Teil hinzufügen",
        partNameLabel: "Teilname:",
        confirmAddPart: "Hinzufügen",
        cancelButton: "Abbrechen",
        partAdded: "✅ Teil erfolgreich hinzugefügt!",
        partNamePlaceholder: "Teilname eingeben",
        view: "Ansehen"
    }
};

let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    const t = translations[lang];

    // Apply translation across all pages (if elements exist)
    ['addPartHeading', 'partNameLabel', 'confirmAddPart', 'cancelButton'].forEach(id => {
        if (document.getElementById(id)) document.getElementById(id).innerText = t[id];
    });

    if (document.getElementById('partName')) {
        document.getElementById('partName').placeholder = t.partNamePlaceholder;
    }

    // If you have a parts page, reload parts with correct language buttons
    if (document.querySelector('.parts-table')) {
        loadParts();
    }
}
