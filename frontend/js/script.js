$(document).ready(function () {
  changeBackground();
  $('#find').on('click', function (e) {
    e.preventDefault();
    var itemClicked = $(e.currentTarget);
    var userInput = $('#search option:selected').val();

    showResults();
    // ajaxCall(userInput);
    // $('#search').val('');
  });
  $('h3#title').on('click', showIndex);
});

function ajaxCall(query) {

  $.ajax({
    url: "/" + query
  })
    .done(function (response) {

      // If h2's are invisible, show them
      $('h2').css('visibility', 'visible');
      $('.state').text(response[0].state);
      $('ul').empty();


      for(var i=0; i < 10; i++) {
        var item = response[i];
        var series = item.series;
        var caller = item.callers;
        var date = new Date(item.date).toString().split(' 00:')[0];
        var location = item.location;
        var state = item.state;

        var resultsList = $('#upcoming');
        var newLi = $('<li></li>');
        var h3 = $('<h6 />').text(series);
        var p1 = $('<p />').text(date);
        var p2 = $('<p />').text(caller);
        var p3 = $('<p />').text(location);
        var p4 = $('<p />').text(state);

        newLi.append(h3, p1, p2, p3, p4);
        resultsList.append(newLi);
      }
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
