$(document).ready(function () {
  $('#find').on('click', function (e) {
    e.preventDefault();
    var itemClicked = $(e.currentTarget);
    var userInput = $('#search').val();

    console.log('userInput', userInput);

    ajaxCall(userInput);
    $('#search').val('');
  });
});

function ajaxCall(query) {

  $.ajax({
    url: "/" + query
  })
    .done(function (response) {
      console.log(response);
    })
}
