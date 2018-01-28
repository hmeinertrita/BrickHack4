function resetTimer(id, minutes) {
  chrome.alarms.create(id,{delayInMinutes: minutes});
}

function notify(message) {
    alert(message);
}

chrome.alarms.onAlarm.addListener((alarm) => {
  //notify(alarm.name);
  chrome.alarms.create(alarm.notifName. {delayInMinutes: 0.1. periodinMinutes: 0.1});

});

(function(){
  'use strict';
  var alarmName = 'remindme';
  function createAlarm() {
     chrome.alarms.create(alarmName, {
       delayInMinutes: 0.1, periodInMinutes: 0.1});
   }
   function cancelAlarm() {
     chrome.alarms.clear(alarmName);
   }
})();
