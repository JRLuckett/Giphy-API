//shows array
var topics = ["gilmore girls", "mindy show","the new girl"];
//input box value variable 
var showSearch = $('#search-theme').val().trim();
//document ready 
$(document).ready(function(){
//on click for submit button
  $('#search-button').on('click', function(){
    var showSearch = $('#search-theme').val().trim();
//push input value to shows array
    topics.push(showSearch);
//empty the area where piphs will print 
    $('#giphs').html("");
//empty the area where buttons will print 
    $('#theme-buttons').html("")
//map over shows array 
    topics.map(function(show){
//save button creation to variable 
    var button = '<button data-show="'+show+'"class="shows">'+show+'</button>';
    $('#theme-buttons').append(button);
    });
  });
//on click for dynamically created buttons 
  $(document).on('click', '.shows', function(event){
//empty the area where piphs will print 
    $('#giphs').html("");
//prevent page refresh 
    event.preventDefault();
//save the data attr of clicked button
    var showSearch = $(this).data("show");
//save the above data into url with api key
    var urlAPI = 'https://api.giphy.com/v1/gifs/search?q='+ showSearch +'&api_key=dc6zaTOxFJmzC&limit=11';
//make ajax call 
    $.ajax({
      url: urlAPI,
      method: 'GET'
    }).done(function(response){
//save result object 
      var result = response.data;
//iterate over result
      for (var i = 0; i < 10; i++) {
//append sill image, animated data, still data, state date, and rating to main html
        $('#giphs').append('<img data-state="still" data-still="'+result[i].images.fixed_height_still.url+'" data-animate="'+result[i].images.fixed_height_downsampled.url
          +'"src="'+result[i].images.fixed_height_still.url+'" class="image-button"/>').append('<div id="rating"><p>CLICK ME</p>Rating: '+result[i].rating+'</div>');
      };
    });
  });
//on click for dynamically created images
  $(document).on('click', '.image-button', function(){
//save the state of the clicked image to a variable 
    var state = $(this).attr("data-state");
//see what state the image has and change it along with src to either still or animate
    if(state === "still"){
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate")
    }else{
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    };
  });
});
// $.ajax({url:"http://api.giphy.com/v1/gifs/search?q=cats&api_key=dc6zaTOxFJmzC&limit=11",method: "GET"}).done(function(response){
//   console.log(response);
// })











