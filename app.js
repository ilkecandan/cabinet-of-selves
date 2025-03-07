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

    const addPartButton = document.getElementById('addPartButton');
    if (addPartButton) addPartButton.addEventListener('click', showAddPartModal);
});

// All your existing loadParts, addPart, removePart, etc., remain the same.
// Only the welcome GIF logic was added.

