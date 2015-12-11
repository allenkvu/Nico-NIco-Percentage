// Saves options to chrome.storage.sync.
function save_options() {
    var color = document.getElementById('color').value;
    var percentageChoice = document.getElementById('percentage').value;
    var bold = document.getElementById('bold').checked;
    chrome.storage.sync.set({
        colorChoice: color,
        percentageChoice: percentageChoice,
        boldChecked: bold
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value
    chrome.storage.sync.get({
        percentageChoice: 'M/V',
        colorChoice: 'black',
        boldChecked: false
    }, function (items) {
        document.getElementById('color').value = items.colorChoice;
        document.getElementById('percentage').value = items.percentageChoice;
        document.getElementById('bold').checked = items.boldChecked;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);