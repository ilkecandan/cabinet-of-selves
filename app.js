document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('language') || 'en';
    document.getElementById('language').value = lang;
    switchLanguage(lang);

    if (document.getElementById('welcomeAnimation') && !localStorage.getItem('hasVisitedBefore')) {
        showWelcomeAnimation();
    }

    if (document.getElementById('addNewPartButton')) {
        document.getElementById('addNewPartButton').addEventListener('click', showAddPartModal);
    }

    if (document.getElementById('confirmAddPart')) {
        document.getElementById('confirmAddPart').addEventListener('click', addPart);
    }

    loadParts();  // Only runs if parts-table or similar exists.
});

function showWelcomeAnimation() {
    const welcomeAnimation = document.getElementById('welcomeAnimation');
    welcomeAnimation.style.display = 'flex';
    setTimeout(() => {
        welcomeAnimation.style.display = 'none';
        localStorage.setItem('hasVisitedBefore', 'true');
    }, 5000);
}

function showAddPartModal() {
    document.getElementById('partModal').style.display = 'block';
}

function hideAddPartModal() {
    document.getElementById('partModal').style.display = 'none';
}

function addPart() {
    const partName = document.getElementById('partName').value.trim();

    if (!partName) {
        showNotification('⚠️ ' + translations[currentLanguage].partNamePlaceholder, 'error');
        return;
    }

    const parts = JSON.parse(localStorage.getItem('innerParts') || '[]');
    if (parts.some(part => part.name === partName)) {
        showNotification('⚠️ Part with this name already exists.', 'error');
        return;
    }

    parts.push({ name: partName, img: 'images/girl.jpg' });
    localStorage.setItem('innerParts', JSON.stringify(parts));

    showNotification(translations[currentLanguage].partAdded, 'success');
    hideAddPartModal();

    setTimeout(() => window.location.href = 'parts.html', 1000);
}

function loadParts() {
    const parts = JSON.parse(localStorage.getItem('innerParts') || '[]');
    const container = document.querySelector('.parts-table') || document.getElementById('partsTable');

    if (!container) return;  // Don't run if no parts container (prevents console errors)

    container.innerHTML = '';

    if (parts.length === 0) {
        container.innerHTML = `<p>${translations[currentLanguage].noParts || 'No parts added yet.'}</p>`;
        return;
    }

    const radius = 160;
    const centerX = 200;
    const centerY = 200;

    parts.forEach((part, index) => {
        const angle = (2 * Math.PI) / parts.length;
        const x = centerX + radius * Math.cos(index * angle) - 50;
        const y = centerY + radius * Math.sin(index * angle) - 50;

        const partDiv = document.createElement('div');
        partDiv.className = 'part-seat';
        partDiv.style.left = `${x}px`;
        partDiv.style.top = `${y}px`;

        partDiv.innerHTML = `
            <img src="${part.img}" class="part-image" alt="${part.name}">
            <span class="part-name">${part.name}</span>
            <button onclick="viewPart('${part.name}')">${translations[currentLanguage].viewEdit}</button>
            <button class="remove" onclick="removePart('${part.name}')">${translations[currentLanguage].remove}</button>
        `;
        container.appendChild(partDiv);
    });
}

function viewPart(name) {
    window.location.href = `part-details.html?part=${encodeURIComponent(name)}`;
}

function removePart(name) {
    const parts = JSON.parse(localStorage.getItem('innerParts') || '[]').filter(p => p.name !== name);
    localStorage.setItem('innerParts', JSON.stringify(parts));
    loadParts();
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    const t = translations[lang];

    // Apply general translations
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.innerText = t[key] || el.innerText;
    });

    // Modal and form-specific
    const placeholders = {
        'partName': t.partNamePlaceholder,
    };

    Object.keys(placeholders).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.placeholder = placeholders[id];
    });

    loadParts();  // Refresh parts with translated buttons
}

const translations = {
    en: {
        addPartHeading: "Add a New Part",
        partNameLabel: "Part Name:",
        confirmAddPart: "Add",
        cancelButton: "Cancel",
        partAdded: "✅ Part added successfully!",
        partNamePlaceholder: "Enter part name",
        viewEdit: "View / Edit",
        remove: "Remove",
        noParts: "No parts added yet."
    },
    tr: {
        addPartHeading: "Yeni Bir Parça Ekle",
        partNameLabel: "Parça Adı:",
        confirmAddPart: "Ekle",
        cancelButton: "İptal",
        partAdded: "✅ Parça başarıyla eklendi!",
        partNamePlaceholder: "Parça adını girin",
        viewEdit: "Görüntüle / Düzenle",
        remove: "Kaldır",
        noParts: "Henüz parça eklenmedi."
    },
    de: {
        addPartHeading: "Neuen Teil hinzufügen",
        partNameLabel: "Teilname:",
        confirmAddPart: "Hinzufügen",
        cancelButton: "Abbrechen",
        partAdded: "✅ Teil erfolgreich hinzugefügt!",
        partNamePlaceholder: "Teilname eingeben",
        viewEdit: "Ansehen / Bearbeiten",
        remove: "Entfernen",
        noParts: "Noch keine Teile hinzugefügt."
    }
};

let currentLanguage = 'en';
