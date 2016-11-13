$(document).ready(function () {
  // When user clicks search button, load results
  $('button.getResultsButton').on('click', function (e) {
    ajaxCall(e);
  });

  $('h3#title').on('click', showSplash);
});

function ajaxCall(e) {
  var query = getUserInput(e);

  $.ajax({
    url: "https://murmuring-tundra-73286.herokuapp.com/results/" + query
  })
    .done(function (response) {
      // Hide splash page and show results page as well as nav bar
      $('#splashPage').hide();
      $('nav').show();
      $('nav form').show();
      $('#resultsPage').show();

      // Fill in the "state"-specific span at top of results headers
      $('.state').text(response[0].state);

      // Empty out the results ul's
      $('ul.resultsList').empty();

      // Generate results and append to li
      for(var i=0; i < 5; i++) {
        var item = response[i];
        var series = item.series;
        var caller = item.callers;
        var date = new Date(item.date).toString().split(' 00:')[0];
        var location = item.location;
        var state = item.state;

        var resultsList = $('#upcoming');
        var newLi = $('<li />');
        var h6 = $('<h6 />').text("Series: " + series);
        var p1 = $('<p />').text("Location: " + location + ", " + state);
        var p2 = $('<p />').text("Caller: " + caller);
        var p3 = $('<p />').text("Date: " + date);

        newLi.append(h6, p1, p2, p3);
        resultsList.append(newLi);
      }

      // Pull in corresponding map and append
      // var $map = $('<iframe />').attr('src', 'https://www.google.com/maps/d/embed?mid=1PXXhZmClA4JWm_J71Og5sYpfhIk&hl=en');
      //
      // $('.map.column').append($map);
    });
}

function getUserInput(e) {
  e.preventDefault();
  // There are 2 separate dropdowns on the splash page and results page. Unfortunately, each button has 2 classes to distinguish it from the selectpicker, which gets converted to a button when rendered by Bootstrap. Therefore, to determine which one you're working with, first get the class of the clicked button - the split is required to get rid of the first class, getResultsButton, which both buttons share
  var clickedClass = $(e.currentTarget).attr('class').split(' ')[1];

  // Next, get the selected option from the select dropdown that corresponds to the clicked button
  var userInput = $('select.' + clickedClass + ' option:selected').val();

  return userInput;
}

function showResults() {
  $('#splashPage').hide();
  $('nav').show();
  $('#resultsPage').show();
}

function showSplash() {
  $('#splashPage').show();
  $('nav').hide();
  $('#resultsPage').hide();
}

/*-----CODE GRAVEYARD-----*/

// function changeBackground() {
//   var header = $('body');
//
//   var backgrounds = [
//     'url(images/contra.jpg)',
//     'url(images/contra-2.jpg)',
//     'url(images/contra-3.jpg)'
//   ];
//
//   var current = 0;
//
//   function nextBackground() {
//     current++;
//     current = current % backgrounds.length;
//     header.css('background-image', backgrounds[current]);
//   }
//
//   setInterval(nextBackground, 5000);
//
//   header.css('background-image', backgrounds[0]);
// }
