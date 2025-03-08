document.addEventListener('DOMContentLoaded', () => {
    // Load the language preference from localStorage
    const lang = localStorage.getItem('language') || 'en';
    document.getElementById('language').value = lang;
    switchLanguage(lang);

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
            title: "Cabinet of Selves", 
            welcomeText: "Welcome to your inner world. Which parts want to speak today?",
            partsHeading: "Your Parts",
            seeAllPartsButton: "See All Parts",
            addNewPartButton: "Add New Part",
            checkInHeading: "Daily Check-In",
            startCheckInButton: "Start Daily Check-In",
            viewCheckInHistoryButton: "View Check-In History",
            resourcesHeading: "Resources & Tips",
            youAreEnoughText: "You are enough, even on the quiet days.",
            installBannerText: "📲 Install Cabinet of Selves on your phone!",
            addPartHeading: "Add a New Part",
            partNameLabel: "Part Name:",
            cancelButton: "Cancel",
        },
        tr: { 
            title: "Kendi Parçalarınız Kabini", 
            welcomeText: "İçsel dünyanıza hoş geldiniz. Hangi parçalar konuşmak istiyor?",
            partsHeading: "Parçalarınız",
            seeAllPartsButton: "Tüm Parçaları Gör",
            addNewPartButton: "Yeni Parça Ekle",
            checkInHeading: "Günlük Kontrol",
            startCheckInButton: "Günlük Kontrol Başlat",
            viewCheckInHistoryButton: "Kontrol Geçmişini Gör",
            resourcesHeading: "Kaynaklar ve İpuçları",
            youAreEnoughText: "Sessiz günlerde bile yeterlisiniz.",
            installBannerText: "📲 Kabinetinizi telefonunuza yükleyin!",
            addPartHeading: "Yeni Bir Parça Ekle",
            partNameLabel: "Parça Adı:",
            cancelButton: "İptal",
        },
        de: { 
            title: "Schrank der Selbst", 
            welcomeText: "Willkommen in deiner inneren Welt. Welche Teile möchten heute sprechen?",
            partsHeading: "Deine Teile",
            seeAllPartsButton: "Alle Teile ansehen",
            addNewPartButton: "Neues Teil hinzufügen",
            checkInHeading: "Tägliche Check-In",
            startCheckInButton: "Tägliches Check-In starten",
            viewCheckInHistoryButton: "Check-In Verlauf ansehen",
            resourcesHeading: "Ressourcen & Tipps",
            youAreEnoughText: "Du bist genug, auch an ruhigen Tagen.",
            installBannerText: "📲 Installiere Cabinet of Selves auf deinem Handy!",
            addPartHeading: "Neues Teil hinzufügen",
            partNameLabel: "Teilname:",
            cancelButton: "Abbrechen",
        }
    };

    // Save the selected language to localStorage
    localStorage.setItem('language', lang);

    // Get the corresponding translation object for the selected language
    const t = translations[lang];

    // Update the page content with the translated text
    document.title = t.title;
    document.getElementById('welcomeText').innerText = t.welcomeText;
    document.getElementById('partsHeading').innerText = t.partsHeading;
    document.getElementById('seeAllPartsButton').innerText = t.seeAllPartsButton;
    document.getElementById('addNewPartButton').innerText = t.addNewPartButton;
    document.getElementById('checkInHeading').innerText = t.checkInHeading;
    document.getElementById('startCheckInButton').innerText = t.startCheckInButton;
    document.getElementById('viewCheckInHistoryButton').innerText = t.viewCheckInHistoryButton;
    document.getElementById('resourcesHeading').innerText = t.resourcesHeading;
    document.getElementById('youAreEnoughText').innerText = t.youAreEnoughText;
    document.getElementById('installBanner').innerText = t.installBannerText;
    document.getElementById('addPartHeading').innerText = t.addPartHeading;
    document.getElementById('partNameLabel').innerText = t.partNameLabel;
    document.getElementById('cancelButton').innerText = t.cancelButton;
    document.getElementById('partName').placeholder = t.partNameLabel;  // Update placeholder for input field
}
