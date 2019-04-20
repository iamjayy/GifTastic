 // create array 
 var heros =    ["Captain America", 
                "Iron Man", 
                "Hulk", 
                "Hawkeye", 
                "Thor", 
                "I Am Groot", 
                "Black Panther", 
                "Spiderman"]

    function displayHeros() {

    var x = $(this).attr("data-name");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
                    +x+
                    "&api_key=81sRUQS41S5fySuaefCpaPPAmJvqMPZx&limit=10";

    //  AJAX call 
    $.ajax({
            url: queryURL,
            method: "GET"
           })
    .done(function(response) {
        console.log(response);
        for(var i=0; i<response.data.length;i++){

        var heroDiv = $('<div>')
        rating = $('<p>').text("Rating: "+response.data[i].rating);
        heroImage = $("<img>")
        heroImage.addClass("gif")
        heroImage.attr({
                        src: response.data[i].images.fixed_height.url, 
                        dataAnimate: response.data[i].images.fixed_height.url,
                        dataStill: response.data[i].images.fixed_height.url, 
                        dataState: "still"
                     });
        //append ratings and images to div
        heroDiv.append(heroImage);
        heroDiv.append(rating);
        $("#heroesGoHere").prepend(heroDiv);
        }
    });

 }   //closing bracket function displayHeros


    //function to animate gif
    $(document).on("click", ".gif",  function animate() {  
    var state = $(this).attr("dataState");

    if (state === "still") {
        $(this).attr("src", $(this).attr("dataAnimate"));
        $(this).attr("dataState", "animate");
    }else {
        $(this).attr("src", $(this).attr("dataAnimate"));
        $(this).attr("dataState", "animate");
      }
    });


    // Function for displaying new button
    function renderButtons() {

     $("#new-buttons").empty();
        //for loop 8 for new buttons, not zero or else same buttons will repeat
        for (var i = 8; i < heros.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-primary hero-btn");
        button.attr("data-name", heros[i]);
        button.text(heros[i]);
        $("#new-buttons").append(button);
        }
    }



 //on click event to play sound of hero/button
    function PlaySound(path) {
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', path);
        audioElement.play();
      }

    //    $(document).ready(function() {
    //      var obj = document.createElement("audio");
    //      obj.src = "audio/fondue.mp3"
    //      obj.src = "audio/petty.mp3";
    //      obj.volume = 0.10;
    //      obj.autoPlay = false;
    //      obj.preLoad = true;
    //      obj.controls = true;
      
    //     $(".playSound").click(function() {
    //       obj.play();
    //       obj.pause();
    //       });
    //     $(".playSound").click(function() {
    //       obj.play();
    //       obj.pause();
    //       });
    //   });

    // This function handles events where a button is clicked
    $("#add").on("click", function(event) {
         event.preventDefault();
        var hero = $("#hero-input").val().trim();
        heros.push(hero);
        renderButtons();
        });

    //event listener
        $(document).on("click", ".hero-btn", displayHeros);

         renderButtons();
