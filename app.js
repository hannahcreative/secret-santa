// **Ideas** 

//  - User also set's gift $ limit. (Which is stored and included in the email)
//  - (maybe set date as well?)
//  - Use Etsy API to pull in gift suggetions? (active.js endpoint)

// **Notes** 

// End up with something like this to grab the email addresses from
// var names = [{ giver :'wes', receiver : 'kait' }, { giver :'hannah', receiver : 'snickers' }]

var santaApp = {};

// This array will actually be empty, but for the purpose of testing I've added names
santaApp.names = ['wes','hannah','kait','snickers'];

// This variable will hold the final matches
santaApp.finalMatch = [];

// Create distribute function that will loop through the names in the array and assign each one to another name (but not itself, and can't use a name twice)

var counter = 0;
santaApp.createPair = function(giverArray, reciverArray){
  //the variables below are used in an if statement to make sure that the indexes are not the same number (the indexes represesnt a name from the arrays)

  //recursion function calls itself inside itself
  var firstIndex = Math.floor(Math.random() * giverArray.length);
  var secondIndex = Math.floor(Math.random() * reciverArray.length);
  counter++;
  if (firstIndex === secondIndex && counter < 100) {
    return santaApp.createPair(giverArray, reciverArray);
  }

  var giftGiver = giverArray.splice(firstIndex, 1);
  var giftReciever = reciverArray.splice(secondIndex, 1);
  if (giftGiver === giftReciever) {
    var originalReciver = santaApp.finalMatch[0].reciver;
     santaApp.finalMatch[0].reciver = giftReciever;
     return { 
    giver : giftGiver[0], 
    reciver : originalReciver
    }
  } 

  return { 
    giver : giftGiver[0], 
    reciver : giftReciever[0]
  }
};

santaApp.arrayCopy = function(array2copy) {
  var copy = [];
  for (var i = 0; i < array2copy.length; i++) {
    copy.push(array2copy[i]);
  };
  return copy;
};

santaApp.matchAllUsers = function() {
  var givers = santaApp.arrayCopy(santaApp.names);
  var recievers = santaApp.arrayCopy(santaApp.names);
  while(givers.length > 0) {
    var pairing = santaApp.createPair(givers, recievers);
    santaApp.finalMatch.push(pairing);
  }
  console.log(santaApp.finalMatch);
};




santaApp.init = function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
      if ($('input').val() !== '') {
        var addName = $('input').val();
        console.log(addName);
         $('ul').append("<li>" + addName + "</li>");
        santaApp.names.push(addName);
        $('input').val('');
    };
  });
};

$(document).ready(function(){
  santaApp.init();
});