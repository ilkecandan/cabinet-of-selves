document.addEventListener('DOMContentLoaded', () => {
    loadParts();

    const addPartButton = document.getElementById('addPartButton');
    if (addPartButton) addPartButton.addEventListener('click', showAddPartModal);

    const confirmAddPartButton = document.getElementById('confirmAddPart');
    if (confirmAddPartButton) confirmAddPartButton.addEventListener('click', addPart);

    const startCheckInButton = document.getElementById('startCheckInButton');
    if (startCheckInButton) startCheckInButton.addEventListener('click', () => {
        window.location.href = 'daily-checkin.html';
    });

    const viewCheckInHistoryButton = document.getElementById('viewCheckInHistoryButton');
    if (viewCheckInHistoryButton) viewCheckInHistoryButton.addEventListener('click', viewCheckInHistory);
});

function loadParts() {
    const parts = JSON.parse(localStorage.getItem('innerParts')) || [];
    const container = document.getElementById('partsContainer');
    if (!container) return;

    container.innerHTML = '';

    parts.forEach(part => {
        const partElement = document.createElement('div');
        partElement.classList.add('part-item');

        const savedPart = JSON.parse(localStorage.getItem(`part-${part.name}`)) || {};

        const profileImage = document.createElement('img');
        profileImage.src = savedPart.image || 'images/girl.jpg';
        profileImage.classList.add('part-profile-image');

        const partLink = document.createElement('button');
        partLink.innerText = part.name;
        partLink.classList.add('part-name-button');
        partLink.onclick = () => {
            window.location.href = `part-details.html?part=${encodeURIComponent(part.name)}`;
        };

        const removeButton = document.createElement('button');
        removeButton.innerText = '❌ Remove';
        removeButton.classList.add('remove-part-button');
        removeButton.onclick = () => removePart(part.name);

        partElement.appendChild(profileImage);
        partElement.appendChild(partLink);
        partElement.appendChild(removeButton);

        container.appendChild(partElement);
    });
}

function removePart(partName) {
    if (!confirm(`Are you sure you want to remove "${partName}"?`)) return;

    let parts = JSON.parse(localStorage.getItem('innerParts')) || [];
    parts = parts.filter(part => part.name !== partName);

    localStorage.removeItem(`part-${partName}`);
    localStorage.setItem('innerParts', JSON.stringify(parts));
    loadParts();
}

function showAddPartModal() {
    const modal = document.getElementById('partModal');
    if (modal) modal.style.display = 'block';
}

function hideAddPartModal() {
    const modal = document.getElementById('partModal');
    if (modal) modal.style.display = 'none';
}

function addPart() {
    const partNameInput = document.getElementById('partName');
    const partName = partNameInput ? partNameInput.value.trim() : '';

    if (partName === '') {
        alert('Please enter a name for the part!');
        return;
    }

    let parts = JSON.parse(localStorage.getItem('innerParts')) || [];
    parts.push({ name: partName });

    localStorage.setItem('innerParts', JSON.stringify(parts));

    window.location.href = `part-details.html?part=${encodeURIComponent(partName)}`;
}

function viewCheckInHistory() {
    window.location.href = 'checkin-history.html';
}
