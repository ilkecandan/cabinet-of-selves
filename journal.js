document.addEventListener('DOMContentLoaded', loadJournal);

function loadJournal() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('journalDate').value = today;

    loadJournalForDate(today);
    document.getElementById('journalDate').addEventListener('change', () => {
        loadJournalForDate(document.getElementById('journalDate').value);
    });
}

function loadJournalForDate(date) {
    const savedJournals = JSON.parse(localStorage.getItem('dailyJournals')) || {};
    const entry = savedJournals[date] || { prompt1: '', prompt2: '', prompt3: '' };

    document.getElementById('journalPrompt1').value = entry.prompt1;
    document.getElementById('journalPrompt2').value = entry.prompt2;
    document.getElementById('journalPrompt3').value = entry.prompt3;
}

function saveJournal() {
    const date = document.getElementById('journalDate').value;
    const journals = JSON.parse(localStorage.getItem('dailyJournals')) || {};

    journals[date] = {
        prompt1: document.getElementById('journalPrompt1').value,
        prompt2: document.getElementById('journalPrompt2').value,
        prompt3: document.getElementById('journalPrompt3').value
    };

    localStorage.setItem('dailyJournals', JSON.stringify(journals));
    alert('✅ Journal saved for ' + date);
}

function viewJournalHistory() {
    window.location.href = 'journal-history.html';
}
