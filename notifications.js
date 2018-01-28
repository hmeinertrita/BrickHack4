function resetTimer(id, minutes) {
  chrome.alarms.create(id,{delayInMinutes: minutes});
}

function notify(message) {
    alert(message);
}

chrome.alarms.onAlarm.addListener((alarm) => {
  notify(alarm.name);
});
