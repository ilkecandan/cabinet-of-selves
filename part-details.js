const params = new URLSearchParams(window.location.search);
const partName = params.get('part');

// Set page title to reflect the part name
document.getElementById('partTitle').innerText = `Meet ${partName}`;

// Load the part details from localStorage
let part = JSON.parse(localStorage.getItem(`part-${partName}`)) || {};

// Pre-fill fields and load image if available
if (part.image) {
    document.getElementById('partImagePreview').src = part.image;
} else {
    document.getElementById('partImagePreview').src = 'images/girl.jpg'; // Default image
}

document.getElementById('partSince').value = part.knownSince || '';
document.getElementById('partWants').value = part.wants || '';
document.getElementById('partWorksWith').value = part.worksWith || '';
document.getElementById('partClashesWith').value = part.clashesWith || '';
document.getElementById('partRole').value = part.role || '';

// Handle image upload and preview
document.getElementById('partImageInput').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById('partImagePreview').src = reader.result;
            part.image = reader.result; // Save to part object immediately
            alert('Image uploaded successfully!');
        };
        reader.readAsDataURL(file);
    }
});

// Save part details back to localStorage when user clicks save
function savePartDetails() {
    const updatedPart = {
        knownSince: document.getElementById('partSince').value,
        wants: document.getElementById('partWants').value,
        worksWith: document.getElementById('partWorksWith').value,
        clashesWith: document.getElementById('partClashesWith').value,
        role: document.getElementById('partRole').value,
        image: part.image || document.getElementById('partImagePreview').src // Make sure to save the latest image
    };

    localStorage.setItem(`part-${partName}`, JSON.stringify(updatedPart));
    alert('Details saved!');
}
