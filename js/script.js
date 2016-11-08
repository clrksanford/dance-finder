$(document).ready(function () {
  changeBackground();
  $('#find').on('click', function (e) {
    e.preventDefault();
    var itemClicked = $(e.currentTarget);
    var userInput = $('#search option:selected').val();

    showResults();
    ajaxCall(userInput);
    $('#search').val('');
  });
  $('h3#title').on('click', showIndex);
});

function ajaxCall(query) {
  $.ajax({
    url: "https://murmuring-tundra-73286.herokuapp.com/results/" + query
  })
    .done(function (response) {
      // If h2's are invisible, show them
      $('h2').css('visibility', 'visible');
      $('.state').text(response[0].state);
      $('ul').empty();

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
      var $map = $('<iframe />').attr('src', 'https://www.google.com/maps/d/embed?mid=1PXXhZmClA4JWm_J71Og5sYpfhIk&hl=en');

      $('.map.column').append($map);
    });
}

function changeBackground() {
  var header = $('body');

  var backgrounds = [
    'url(images/contra.jpg)',
    'url(images/contra-2.jpg)',
    'url(images/contra-3.jpg)'
  ];

  var current = 0;

  function nextBackground() {
    current++;
    current = current % backgrounds.length;
    header.css('background-image', backgrounds[current]);
  }

  setInterval(nextBackground, 5000);

  header.css('background-image', backgrounds[0]);
}

function showResults() {
  $('h1').hide();
  $('main.container').removeClass('hidden');
  $('link[href="css/style.css"]').attr('href', 'css/results.css');
}

function showIndex() {
  $('h1').show();
  $('main.container').addClass('hidden');
  $('link[href="css/results.css"]').attr('href', 'css/style.css');
}
