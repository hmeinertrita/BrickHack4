function resetTimer(id, minutes) {
  chrome.alarms.create(id,{delayInMinutes: minutes});
}

function notify(message) {
    alert(message);
}

chrome.alarms.onAlarm.addListener((alarm) => {
  //notify(alarm.name);
  chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl: 'mascot 128*128.png',
    title: 'Reminder',
    message: 'Alarm went off'
  }, function(notificationId) {});
});
