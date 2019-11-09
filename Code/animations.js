$(document).ready(function() {
    // just to test if nothing goes wrong
    console.log("loaded");

    // hides the text under the side labels
    $(".sidenavText").hide(0);

    // event handler of hovering the side labels (dynamic)
    $(".sidenavElement").hover(
        function() { // when hovering
            $(this).css("background-color", "#5D5D5D"); // changes label bg colour
            $(this).find(".sidenavImages").animate({ // moves label up
                "margin-top": "-=11px"
            }, 125, function() {});
            $(this).find(".sidenavText").show(125, function() {}); // shows text
        }, function() { // when leaving hover
            $(this).css("background-color", "#1E1E1E"); //changes label bg colour
            $(this).find(".sidenavImages").animate({ // moves label down
                "margin-top": "+=11px"
            }, 125, function() {});
            $(this).find(".sidenavText").hide(125, function() {}); // hides text
        }
    );

    // event handlers of clicking the side labels (not dynamic)
    $("#sidenavElement1").click(function() {
        window.location = "plans.html";
    });
    $("#sidenavElement2").click(function() {
        window.location = "fleet.html";
    });
})