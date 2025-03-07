const params = new URLSearchParams(window.location.search);
const partName = params.get('part');

// Set page title
document.getElementById('partTitle').innerText = `Meet ${partName}`;

// Load part data if it exists
let part = JSON.parse(localStorage.getItem(`part-${partName}`)) || {};

// Populate fields
if (part.image) document.getElementById('partImagePreview').src = part.image;

document.getElementById('partSince').value = part.knownSince || '';
document.getElementById('partWants').value = part.wants || '';
document.getElementById('partWorksWith').value = part.worksWith || '';
document.getElementById('partClashesWith').value = part.clashesWith || '';
document.getElementById('partRole').value = part.role || '';

// Handle image upload and preview
document.getElementById('partImageInput').addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = () => {
        document.getElementById('partImagePreview').src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

// Save part details back to localStorage
function savePartDetails() {
    const updatedPart = {
        knownSince: document.getElementById('partSince').value,
        wants: document.getElementById('partWants').value,
        worksWith: document.getElementById('partWorksWith').value,
        clashesWith: document.getElementById('partClashesWith').value,
        role: document.getElementById('partRole').value,
        image: document.getElementById('partImagePreview').src
    };

    localStorage.setItem(`part-${partName}`, JSON.stringify(updatedPart));

    alert('Details saved!');
}
