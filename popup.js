function hoursToMinutes(hours) {
  return (hours*60);
}
function toHours(minutes) {
  return minutes/60;
}
function toMinutes(minutes) {
  return minutes%60;
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
  items[id]=hoursToMinutes(hours) + parseInt(minutes);
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
  var timers = document.getElementsByClassName('timer');
  var i;
  // Load the saved values and modify the input boxes, if needed.

  for(i = 0; i < timers.length; i++) {
    var id = timers[i].id;
    var hours = timers[i].getElementsByClassName('hrs')[0];
    var minutes = timers[i].getElementsByClassName('mins')[0];

    getSavedTimerValue(id, (function(id, hours, minutes) {
      return (function(minutes) {
        if (minutes) {
          resetTimer(id);
          hours.value = toHours(minutes);
          minutes.value = toMinutes(minutes);
        }
      });
    })(id, hours, minutes));

    // Ensure the timers change and saved when the dropdown selection changes.
    hours.addEventListener('change', (function(id, hours, minutes) {
      return (function() {
        saveTimerValue(id, hours.value, minutes.value);
        resetTimer(id);
      });
    })(id, hours, minutes));
    minutes.addEventListener('change', (function(id, hours, minutes) {
      return (function() {
        saveTimerValue(id, hours.value, minutes.value);
        resetTimer(id);
      });
    })(id, hours, minutes));
  }
});
