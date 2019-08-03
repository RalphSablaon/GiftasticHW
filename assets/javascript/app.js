$(document).ready(function() {
    var topics = [];
        function displayPokemon() {
            var a = $(this).data("search");
            console.log(a);

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + a + "&api_key=sokOc7Ir2T7ZHtnPkxRzkJlehq33OTqO&limit=10";

            console.log(queryURL);

            // AJAX REQ USING GET METHOD
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                    var results = response.data;
                    console.log(results);
                    for (var i = 0; i < results.length; i++) {
                    
                    // VAR TO CREATE COLUMNS FOR IMGS
                    var pokeDiv = $("<div class='col-md-4'>");
                    
                    // VARIABLES TO GET INFO FROM GIPHY FOR STILL/ANIMATED IMGS
                    var rating = results[i].rating;
                    var animatedSrc = results[i].images.fixed_height.url;
                    var staticSrc = results[i].images.fixed_height_still.url;
                    
                    // VARIABLES TO CREATE NEW IMG DIVS WITH RATINGS CAPTION
                    var showImg = $("<img>");
                    var rateCaption = $("<p>").text("Rating: " + rating);   

                    // GIVE EACH IMG A CLASS "pokeGiphy" AND THE ATTR TO MAKE IT STILL AND ANIMATED
                    showImg.attr("src", staticSrc);
                    showImg.addClass("pokeGiphy");
                    showImg.attr("data-state", "still");
                    showImg.attr("data-still", staticSrc);
                    showImg.attr("data-animate", animatedSrc);
                    
                    // APPEND THE IMG TO #gifBox
                    pokeDiv.append(showImg);
                    pokeDiv.append(rateCaption);
                    $("#gifBox").prepend(pokeDiv);
                }
            });
        }

// On click function that takes searched term, pushes to topics array and then displays button
    $("#addPokemon").on("click", function(event) {
        event.preventDefault();
        var newPokemon = $("#pokeSearch").val().trim();
        topics.push(newPokemon);
        console.log(topics);
        $("#pokeSearch").val("");
        displayButtons();
    });

// Function that iterates through topics array to display button with array values in "addedButtons"\
    function displayButtons() {
        $("#addedButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var b = $("<button class='btn btn-primary'>");
            b.attr("id", "pokemon");
            b.attr("data-search", topics[i]);
            b.text(topics[i]);
            $("#addedButtons").append(b);
        }
    };

    displayButtons();

// Click event for #pokemon that uses displayPokemon function
    $(document).on("click", "#pokemon", displayPokemon);

// Click event for #pokeGiophy that uses playPause function
    $(document).on("click", ".pokeGiphy", playPause);

// Function to access "data-state", changse from still to aniumated
    function playPause() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state" , "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});