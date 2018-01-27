function toMilliseconds(hours, minutes) {
  return (((hours*60)+minutes)*60000);
}
function toHours(milliseconds) {
  return toMinutes(milliseconds)/60;
}
function toMinutes(milliseconds) {
  return milliseconds/60000;
}

function getSavedTimerValue(id, callback) {
  // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
  // for chrome.runtime.lastError to ensure correctness even when the API call
  // fails.
  chrome.storage.sync.get(id, (items) => {
    callback(chrome.runtime.lastError ? null : items[id]);
  });
}

function saveTimerValue(id, hours, minutes) {
  var items = {}
  items[id]=toMilliseconds(hours, minutes);
  chrome.storage.sync.set(items);
}

function resetTimer(id) {
  getSavedTimerValue(id, (milliseconds) => {
    chrome.runtime.getBackgroundPage((window) => {
      window.resetTimer(id, milliseconds);
    });
  });
}

//Run
document.addEventListener('DOMContentLoaded', () => {
  var timers = getElementsByClassName('timer');
  var i;
  // Load the saved values and modify the input boxes, if needed.

  for(i = 0; i < timers.length; i++) {
    var id = timers[i].id;
    var hours = timers[i].getElementsByClassName('hrs')[0];
    var minutes = timers[i].getElementsByClassName('mins')[0];

    getSavedTimerValue(id, (milliseconds) => {
      if (milliseconds) {
        resetTimer(id);
        hours.value = toHours(milliseconds);
        minutes.value = toMinutes(milliseconds);
      }
    });

    // Ensure the timers change and saved when the dropdown selection changes.
    hours.addEventListener('change', () => {
      resetTimer(id);
      saveTimerValue(id, hours.value, minutes.value);
    });
    minutes.addEventListener('change', () => {
      resetTimer(id);
      saveTimerValue(id, hours.value, minutes.value);
    });
  }
});
