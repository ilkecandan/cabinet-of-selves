const params = new URLSearchParams(window.location.search);
const partName = params.get('part');
document.getElementById('partTitle').innerText = `Meet ${partName}`;

let part = JSON.parse(localStorage.getItem(`part-${partName}`)) || {};
if (part.image) document.getElementById('partImagePreview').src = part.image;

document.getElementById('knownSince').value = part.knownSince || 'Not sure';
document.getElementById('partWants').value = part.wants || '';
document.getElementById('worksWith').value = part.worksWith || '';
document.getElementById('clashesWith').value = part.clashesWith || '';
document.getElementById('partRole').value = part.role || '';

document.getElementById('partImageInput').addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = () => document.getElementById('partImagePreview').src = reader.result;
    reader.readAsDataURL(event.target.files[0]);
});

function savePartDetails() {
    const updatedPart = {
        knownSince: document.getElementById('knownSince').value,
        wants: document.getElementById('partWants').value,
        worksWith: document.getElementById('worksWith').value,
        clashesWith: document.getElementById('clashesWith').value,
        role: document.getElementById('partRole').value,
        image: document.getElementById('partImagePreview').src
    };
    localStorage.setItem(`part-${partName}`, JSON.stringify(updatedPart));
    alert('Details saved!');
}
