function resetTimer(id, minutes) {
  chrome.alarms.create(id,{delayInMinutes: minutes});
}

function notify(message) {
    alert(message);
}

alert("Before");
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("ALARM!!");
  chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'https://avatars.githubusercontent.com/u/1407390?',
        title: 'Dont forget!',
        message: 'You have things to do'
     }, function(notificationId) {console.log("created")});
});
alert("After");
