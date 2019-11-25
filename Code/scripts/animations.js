var sideElementNumbers = {
    1: "-300px",
    2: "-200px",
    3: "-100px",
}
var currentPageSideElement = 0 // 0 is null value, -1 is last element, 1 and onwards is as logical

$(document).ready(function() {
    // just to test if nothing goes wrong
    console.log("loaded");

    //get current page
    file = location.href.split("/").slice(-1)[0].split(".html")[0];
    plansSideBar = ["editplan", "newplan", "plans"];
    fleetSideBar = ["editequipment", "newplane", "fleet"];
    checklistSideBar = ["checklist"];
    settingsSideBar = ["settings"];
    if (plansSideBar.includes(file)) {
        $("#selectedSidenavElement").stop().show(0, function() {});
        $("#selectedSidenavElement").css({
            "marginTop": "-300px"
        });
        currentPageSideElement = 1
    } else if (fleetSideBar.includes(file)) {
        $("#selectedSidenavElement").stop().show(0, function() {});
        $("#selectedSidenavElement").css({
            "marginTop": "-200px"
        });
        currentPageSideElement = 2
    } else if (checklistSideBar.includes(file)) {
        $("#selectedSidenavElement").stop().show(0, function() {});
        $("#selectedSidenavElement").css({
            "marginTop": "-100px"
        });
        currentPageSideElement = 3
    } else if (settingsSideBar.includes(file)) {
        $("#selectedSidenavElement").stop().show(0, function() {});
        $("#selectedSidenavElement").css({
            "bottom": "0px",
            "marginTop": "3px"
        });
        currentPageSideElement = -1
    };

    // hides the text under the side labels
    $(".sidenavText, .sidenavTextLast").hide(0);

    // event handler of hovering the side labels (dynamic)
    $(".sidenavElement").hover(
        function() { // when hovering
            // $(this).css("background-color", "rgba(93, 93, 93, 0.25)"); // changes label bg colour
            $(this).find(".sidenavImages").stop().animate({ // moves label up
                "margin-top": "14px"
            }, 125, function() {});
            $(this).find(".sidenavText").stop().show(150, function() {}); // shows text
            if ($(this)[0]["id"].split("sidenavElement")[1] != currentPageSideElement) { // checks for not highlighting current page
                if ($(this)[0]["id"].split("sidenavElement")[1] != -1) { // checks for last element as that requires different change in css properties
                    $("#highlightedSidenavElement").stop().css({
                        "bottom": "",
                        "marginTop": sideElementNumbers[$(this)[0]["id"].split("sidenavElement")[1]]
                    });
                } else {
                    $("#highlightedSidenavElement").stop().css({
                        "bottom": "0px",
                        "marginTop": "3px"
                    });
                };
                $("#highlightedSidenavElement").stop().animate({
                    "opacity": "1"
                }, 250); // shows the highlight
            };
        }, function() { // when leaving hover
            // $(this).css("background-color", "rgba(30, 30, 30, 0)"); //changes label bg colour
            $(this).find(".sidenavImages").stop().animate({ // moves label down
                "margin-top": "25px"
            }, 125, function() {});
            $(this).find(".sidenavText").stop().hide(275, function() {}); // hides text
            $("#highlightedSidenavElement").stop().animate({
                "opacity": "0"
            }, 250);
        }
    );

    // event handlers of clicking the side labels (not dynamic)
    $("#sidenavElement1").click(function() {
        window.location = "plans.html";
    });
    $("#sidenavElement2").click(function() {
        window.location = "fleet.html";
    });
    $("#sidenavElement3").click(function() {
        window.location = "checklist.html";
    });
    $("#sidenavElement-1").click(function() {
        window.location = "settings.html";
    });
})