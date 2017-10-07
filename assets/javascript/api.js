// array of our starting heros
var heroNames = ['Batman', 'Superman', 'Wonder Woman'];

// this function renders the buttons from the array
function renderButtons() {
	$("#gif-buttons").empty();

    for (var i = 0; i < heroNames.length; i++) {
      $('#gif-buttons').append('<button class="gif-buttons btn brn-primary">' + 
      	heroNames[i] + '</button>');
    }
}



// this function creates new buttons based on the new hero input
$(document).on("click", "#add-hero", function(event) {
	event.preventDefault();

	var heroName = $("#hero-input").val().trim();

	heroNames.push(heroName);

	$('#gif-buttons').append('<button class="gif-buttons btn brn-primary">' + 
		heroName + '</button>');
});
	
// this gathers the gifs from the giphy api 
// and display them when their generated button is clicked 
$(document).on('click', '.gif-buttons', function(event) {

	event.preventDefault();

	var hero = this.innerText;
	
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        hero + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      var results = response.data;

  	  for (var i = 0; i < results.length; i++) {

      	var heroDiv = $('<div>');
      	heroDiv.attr('class', 'gifImage');
      	var p = $('<p>');
      	
      	$('<p>').text(results[i]);

      	var heroImage = $('<img>')
      	heroImage.attr( 'class',"gif"); 
      	heroImage.attr('src', results[i].images.fixed_height.url);
      	
      	heroDiv.append('<p>', "Rating: " + results[i].rating);
      	heroDiv.append(p);
      	heroDiv.append(heroImage);
      	$('#gif-display').prepend(heroDiv);
	  }

	});
	$('#gif-display').empty();
});

renderButtons();



// this pauses and starts the gifs
$('#gif-display').on('click', '.gif', function() {
  var state = $(this).attr('src');
    
    if ($(this).hasClass('playing')) {
      $(this).attr('src', state.replace(/\.gif/i, "_s.gif"));
      $(this).removeClass('playing');
    }
    else {
      $(this).addClass('playing');
      $(this).attr('src', state.replace(/\_s.gif/i, ".gif"));
    }
});