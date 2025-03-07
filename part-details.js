const params = new URLSearchParams(window.location.search);
const partName = params.get('part');

document.getElementById('partTitle').innerText = `Meet ${partName}`;

// Load the part details from localStorage
let part = JSON.parse(localStorage.getItem(`part-${partName}`)) || {};

// Pre-fill all fields and set image preview (default if none saved)
document.getElementById('partSince').value = part.knownSince || '';
document.getElementById('partWants').value = part.wants || '';
document.getElementById('partWorksWith').value = part.worksWith || '';
document.getElementById('partClashesWith').value = part.clashesWith || '';
document.getElementById('partRole').value = part.role || '';
document.getElementById('partImagePreview').src = part.image || 'images/girl.jpg';

// Handle image upload with preview and immediate save
document.getElementById('partImageInput').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById('partImagePreview').src = reader.result;

            // Save image immediately into the part object and localStorage
            part.image = reader.result;
            localStorage.setItem(`part-${partName}`, JSON.stringify(part));

            alert('Image uploaded successfully!');
        };
        reader.readAsDataURL(file);
    }
});

// Save part details (text inputs) to localStorage when the user clicks save
function savePartDetails() {
    const updatedPart = {
        knownSince: document.getElementById('partSince').value,
        wants: document.getElementById('partWants').value,
        worksWith: document.getElementById('partWorksWith').value,
        clashesWith: document.getElementById('partClashesWith').value,
        role: document.getElementById('partRole').value,
        image: part.image || document.getElementById('partImagePreview').src // Ensure image is preserved
    };

    localStorage.setItem(`part-${partName}`, JSON.stringify(updatedPart));
    alert('Details saved!');
}
