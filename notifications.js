function resetTimer(id, milliseconds) {
  chrome.alarms.create(id,{when: milliseconds});
}

function notify(message) {
    alert(message);
}

chrome.alarms.onAlarm.addListener((alarm) => {
  notify(alarm.name);
});
