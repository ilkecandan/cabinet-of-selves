document.addEventListener('DOMContentLoaded', () => {
    loadParts();

    // Check if it's the user's first visit
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

    // Add event listeners for parts modal and buttons
    const addPartButton = document.getElementById('addNewPartButton');
    if (addPartButton) addPartButton.addEventListener('click', showAddPartModal);

    const confirmAddPartButton = document.getElementById('confirmAddPart');
    if (confirmAddPartButton) confirmAddPartButton.addEventListener('click', addPart);

    // Language setup
    const lang = localStorage.getItem('language') || 'en';
    document.getElementById('language').value = lang;
    switchLanguage(lang);
});

// Show the modal to add a new part
function showAddPartModal() {
    document.getElementById('partModal').style.display = 'block';
}

// Hide the add part modal
function hideAddPartModal() {
    document.getElementById('partModal').style.display = 'none';
}

// Add a new part
function addPart() {
    const partName = document.getElementById('partName').value.trim();

    if (!partName) {
        alert('Please enter a name for the part.');
        return;
    }

    const parts = JSON.parse(localStorage.getItem('innerParts') || '[]');
    if (parts.some(part => part.name === partName)) {
        alert('A part with this name already exists.');
        return;
    }

    // Add the new part and save it to localStorage
    parts.push({ name: partName, img: 'images/girl.jpg' });
    localStorage.setItem('innerParts', JSON.stringify(parts));

    alert('Part added successfully!');
    hideAddPartModal();
    window.location.href = 'parts.html';
}

// Load parts data from localStorage (if any)
function loadParts() {
    // This function can be used for initial parts loading if needed elsewhere
}

// Language switching functionality
function switchLanguage(lang) {
    const translations = {
        en: { 
            addPartHeading: "Add a New Part", 
            partNameLabel: "Part Name:", 
            confirmAddPart: "Add", 
            cancelButton: "Cancel" 
        },
        tr: { 
            addPartHeading: "Yeni Bir Parça Ekle", 
            partNameLabel: "Parça Adı:", 
            confirmAddPart: "Ekle", 
            cancelButton: "İptal" 
        },
        de: { 
            addPartHeading: "Neuen Teil hinzufügen", 
            partNameLabel: "Teilname:", 
            confirmAddPart: "Hinzufügen", 
            cancelButton: "Abbrechen" 
        }
    };

    // Save selected language to localStorage
    localStorage.setItem('language', lang);

    // Fetch the translations for the selected language
    const t = translations[lang];

    // Update the page content with the translated text
    document.getElementById('addPartHeading').innerText = t.addPartHeading;
    document.getElementById('partNameLabel').innerText = t.partNameLabel;
    document.getElementById('confirmAddPart').innerText = t.confirmAddPart;
    document.getElementById('cancelButton').innerText = t.cancelButton;
    document.getElementById('partName').placeholder = t.partNameLabel;  // Placeholder for input
}
