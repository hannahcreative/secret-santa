var santaApp = {};

// Empty array to hold the inputted names
santaApp.names = [];

// This variable will hold the final matches
santaApp.finalMatch = [];

// Create distribute function that will loop through the names in the array and assign each one to another name (but not itself, and can't use a name twice)

var counter = 0;
santaApp.createPair = function(giverArray, receiverArray){
  //the variables below are used in an if statement to make sure that the indexes are not the same number (the indexes represent a name from the arrays)

  //recursion function calls itself inside itself
  var firstIndex = Math.floor(Math.random() * giverArray.length);
  var secondIndex = Math.floor(Math.random() * receiverArray.length);
  counter++;
  // console.log(counter)
  if (firstIndex === secondIndex && counter < 100) {
    return santaApp.createPair(giverArray, receiverArray);
  }

  var giftGiverArray = giverArray.splice(firstIndex, 1);
  var giftRecieverArray = receiverArray.splice(secondIndex, 1);
  var giftGiver = giftGiverArray[0];
  var giftReciever = giftRecieverArray[0];
  // console.log(giftGiver);
  // console.log(giftReciever);
  if (giftGiver === giftReciever) {
    var originalReceiver = santaApp.finalMatch[0].receiver;
     santaApp.finalMatch[0].receiver = giftReciever;
     return { 
    giver : giftGiver, 
    receiver : originalReceiver
    }
    // console.log('inside the if');
  } 

  return { 
    giver : giftGiver, 
    receiver : giftReciever
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
  santaApp.mailUsers(); 
};


santaApp.mailUsers = function() {
  $.ajax({
    type: "POST",
    url: './send.php',
    data: {
      matches : santaApp.finalMatch
    },
    success: function(data){
      // check to see if the emails send propertly 
      console.log(data); // did it work?
    },
    dataType: 'json'
  });
}

// santaApp.reSize = function() {
//   // $('header').css({ scale: 0.5 });
//   // $('header').css({ translate: [-1000,-100] });
//     $('h1').animate({
//       right: '500px',
//       // right: '0',
//       fontSize: '4rem',
//       top : '0',
//       marginTop : '0'
//     }, 'slow');
// };

santaApp.init = function() {
   $('form').on('submit', function(event) {
    event.preventDefault();
      if ($('input').val() !== '') {
        var addName = $('input').val();
        console.log(addName);
         $('ul').append("<li>" + addName + "</li>");
        santaApp.names.push(addName);
        $('input').val('');
        $('.placeholder').hide();     
    };
  });

  $('button.submit').click(function(){
    santaApp.matchAllUsers();
    alert('Wait for the magic!');
  })
};

$(document).ready(function(){
  santaApp.init();
});