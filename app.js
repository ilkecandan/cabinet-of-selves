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

    showNotification('✅ Part added successfully!', 'success');
    hideAddPartModal();

    // Refresh parts.html (this is optional if you want it to auto-update the parts page)
    setTimeout(() => {
        window.location.href = 'parts.html';
    }, 1000); // Short delay to show the notification before navigating
}

function loadParts() {
    // Example logic for populating parts (optional, in case you want it here)
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

// 🈯️ Language Switching (With Placeholders)
function switchLanguage(lang) {
    const translations = {
        en: { addPartHeading: "Add a New Part", partNameLabel: "Part Name:", confirmAddPart: "Add", cancelButton: "Cancel" },
        tr: { addPartHeading: "Yeni Bir Parça Ekle", partNameLabel: "Parça Adı:", confirmAddPart: "Ekle", cancelButton: "İptal" },
        de: { addPartHeading: "Neuen Teil hinzufügen", partNameLabel: "Teilname:", confirmAddPart: "Hinzufügen", cancelButton: "Abbrechen" }
    };

    localStorage.setItem('language', lang);
    const t = translations[lang];

    document.getElementById('addPartHeading').innerText = t.addPartHeading;
    document.getElementById('partNameLabel').innerText = t.partNameLabel;
    document.getElementById('confirmAddPart').innerText = t.confirmAddPart;
    document.getElementById('cancelButton').innerText = t.cancelButton;
    document.getElementById('partName').placeholder = t.partNameLabel;
}
