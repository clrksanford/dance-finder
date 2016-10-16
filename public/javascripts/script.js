$(document).ready(function () {
  $('#find').on('click', function (e) {
    e.preventDefault();
    var itemClicked = $(e.currentTarget);
    var userInput = $('#search option:selected').val();

    ajaxCall(userInput);
    $('#search').val('');
  });
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
