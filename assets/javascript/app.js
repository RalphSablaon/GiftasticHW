$(document).ready(function () {
    var topics = [];
        function displayPokemon () {
            var a = $(this).data("search");
            console.log(a);

            var queryURL = "https://api.giphy.com/search?q= " + x + "&api_key=sokOc7Ir2T7ZHtnPkxRzkJlehq33OTqO=10";

            console.log(queryURL);

            $ajax({
                url: queryURL,
                method: "GET",
            }).done(function (res) {
                var results = res.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                    // var to create a column for img
                    var pokeDiv = $("<div class = 'col-md-3'>");
                    
                    // variables to get necessary info from giphy to show still/animated imgs
                    var rating = results[i].rating;
                    var animatedSrc = results[i].images.fixed_height.url;
                    var staticSrc = results[i].images.fixed_height_still.url;
                    
                    // variables to create new img divs with rating captions
                    var showImg = $("<img>");
                    var rateCaption = $("<p>").text("Rating: " + rating);   

                    // give each img a class and also allows it to be static/animated
                    showImg.attr("src", staticSrc);
                    showImg.addClass(pokeGiphy);
                    showImg.attr("data-state", "still");
                    showImg.attr("data-animate", animatedSrc);
                    
                    // append the img to gifBox
                    pokeDiv.append(p);
                    pokeDiv.append(showImg);
                    $("#gifBox").prepend(pokeDiv);
                }
            });
        }
}) //closes the .ready function *line 1*

