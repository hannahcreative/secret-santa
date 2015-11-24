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

// Create distribute function that will loop through the names in the array and assign each one to another name (but not itself, and can't use a name twice)

santaApp.distribute = function() {
  
  var availableNames = santaApp.names.slice();

  santaApp.pickedNames = santaApp.names.map(function(name) {
    // pick a random person from the array
    // remove that person from the array because they are taken
    // Make sure that person ins't the same person (wes has wes)
    // return 'wes has kait'
    return { giver : name, reciver : 'You gotta do this part'}
  });

  console.log(santaApp.pickedNames); // final aray with the matches
};
// will need to use Math.random and "probably a couple of if statements"



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