function resetTimer(id, minutes) {
  chrome.alarms.create(id,{delayInMinutes: minutes});
}
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log('alarm!');
  alert(randomMessage(alarm.name));
  /*
  chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl: 'mascot48.png',
    title: 'Dont forget!',
    message: 'You have things to do'
  }, function(notificationId) {
    console.log(chrome.runtime.lastError);
  });
  */
});
