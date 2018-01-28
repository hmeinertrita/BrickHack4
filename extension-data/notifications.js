function resetTimer(id, minutes) {
  chrome.alarms.create(id,{delayInMinutes: minutes});
}
function randomMessage(id) {
  var options;
  if(id=='food') {
    options=[
      "Hey, BuBu here! TIME TO FEED YO' SELF.",
      "Go be an omnomnomnivore!",
      "Cookies and chips are not meal-worthy. Eat healthy!"
    ];
  }
  else if(id=='water') {
    options=[
      "H2NO is bad...hydrate yo'self!",
      "Water you doing? Fill your human blob self with more fluids~",
      "You and Bubu are made of water. How cool is that?!"
    ];
  }
  else if(id=='sleep') {
    options=[
      "Let your brain cells heal~",
      "Bubu recommends resting in your bedroom, not the couch.",
      "Remember to sleep with your Bubu plushie~"
    ];
  }
  else if(id=='break') {
    options=[
      "You can procrastinate for a while. But not for too long.",
      "Bubu recommends watching the news channel to stay educated.",
      "You need some alone time away from Bubu and the probably the Internet."
    ];
  }
  else if(id=='work') {
    options=[
      "Bubu will remind you to be productive!",
      "Do you have anything important you need to take care of?",
      "Bubu will work hard with you so don't give up!!!"
    ];
  }
  return options[Math.floor(Math.random()*options.length)];
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
