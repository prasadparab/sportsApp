(function () {
    "use strict";
    //star rating highlight code 
    $(document).on("mouseover",".rating span", function () {
        $(this).css("color", "#FFCC36").prevAll().css("color", "#FFCC36");
    }).on("mouseout", function () {
        $(".rating span").css("color", "#cecdcd");
    });

    //animating star section & movie extra info section
    $(document).on("mouseover",".content", function () {
        $(this).find(".rating").addClass("animateRating");
        $(this).find(".movieInfo").addClass("animateMovieInfo");
    }).on("mouseout", function () {
        $(this).find(".rating").removeClass("animateRating");
        $(this).find(".movieInfo").removeClass("animateMovieInfo");
    });
})();