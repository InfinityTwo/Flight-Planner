var sideElementNumbers = {
    1: "-178px",
    2: "-118px",
    3: "-58px",
};
var currentPageSideElement = 0; // 0 is null value, -1 is last element, 1 and onwards is as logical
var highlightedSidenavElementOpacity = false;
var sidebarExpanded = false;

function sidebarExpand() {
    $(".sidenav, #sidenavElement-1").stop().animate({
        "width": "140px"
    }, 250);
    if (highlightedSidenavElementOpacity == true) {
        $("#highlightedSidenavElement").stop().animate({
            "marginLeft": "108px",
            "opacity": "0"
        }, 200);
    } else {
        $("#highlightedSidenavElement").stop().animate({
            "marginLeft": "108px"
        }, 200);
    };
    $("#selectedSidenavElement").stop().animate({
        "marginLeft": "108px"
    }, 200);
    $(".sidenavText").stop().animate({
        "opacity": "1"
    }, 200);
    highlightedSidenavElementOpacity = false;
    sidebarExpanded = true;
};

function sidebarCollapse() {
    $(".sidenav, #sidenavElement-1").stop().animate({
        "width": "65px"
    }, 250);
    $("#highlightedSidenavElement").stop().animate({
        "opacity": "0",
        "marginLeft": "33px"
    }, 200);
    $("#selectedSidenavElement").stop().animate({
        "marginLeft": "33px"
    }, 200);
    $(".sidenavText").stop().animate({
        "opacity": "0"
    }, 200);
    sidebarExpanded = false;
};

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
        // $("#selectedSidenavElement").stop().show(0, function() {});
        // $("#selectedSidenavElement").css({
        //     "marginTop": "-178px"
        // });
        $("#sidenavElementInner1").css({
            "backgroundColor": "#00638a"
        });
        currentPageSideElement = 1
    } else if (fleetSideBar.includes(file)) {
        // $("#selectedSidenavElement").stop().show(0, function() {});
        // $("#selectedSidenavElement").css({
        //     "marginTop": "-118px"
        // });
        $("#sidenavElementInner2").css({
            "backgroundColor": "#00638a"
        });
        currentPageSideElement = 2
    } else if (checklistSideBar.includes(file)) {
        // $("#selectedSidenavElement").stop().show(0, function() {});
        // $("#selectedSidenavElement").css({
        //     "marginTop": "-58px"
        // });
        $("#sidenavElementInner3").css({
            "backgroundColor": "#00638a"
        });
        currentPageSideElement = 3
    } else if (settingsSideBar.includes(file)) {
        // $("#selectedSidenavElement").stop().show(0, function() {});
        // $("#selectedSidenavElement").css({
        //     "bottom": "0px",
        //     "marginTop": "10px"
        // });
        $("#sidenavElementInner-1").css({
            "backgroundColor": "#00638a"
        });
        currentPageSideElement = -1
    };

    // hides the text under the side labels
    // $(".sidenavText, .sidenavTextLast").hide(0);

    // event handler of hovering sidenav
    $(".sidenav").hover(
        function() {
            sidebarExpand();
        }, function() {
            sidebarCollapse();
        }
    )
    
    // event handler of hovering sidenav Logo
    $(".sidenavElementLogo").hover(
        function() {
            $("#sidenavElement-2").animate({
                "backgroundColor": "#00a3e4"
            }, 200);
        }, function() {
            $("#sidenavElement-2").animate({
                "backgroundColor": "#00a3e4"
            }, 200);
        }
    );

    // event handler of hovering the side labels (dynamic)
    $(".sidenavElement").hover(
        function() { // when hovering
            if ($(this)[0]["id"].split("sidenavElement")[1] != currentPageSideElement) { // checks for not highlighting current page
                if ($(this)[0]["id"].split("sidenavElement")[1] != -1) { // checks for last element as that requires different change in css properties
                    $("#highlightedSidenavElement").css({
                        "bottom": "",
                        "marginTop": sideElementNumbers[$(this)[0]["id"].split("sidenavElement")[1]]
                    });
                    $(this).find(".sidenavElementInner").animate({
                        "borderTopColor": "2px solid #00638a", 
                        "borderLeftColor": "2px solid #00638a", 
                        "borderRightColor": "2px solid #00638a", 
                        "borderBottomColor": "2px solid #00638a",
                        "backgroundColor": "#00638a",
                        // "borderRadius": "10px",
                        "borderSpacing": "5px"
                    });
                } else {
                    $("#highlightedSidenavElement").css({
                        "bottom": "0px",
                        "marginTop": "3px"
                    });
                    $(this).find(".sidenavElementInner").animate({
                        "borderTopColor": "2px solid #00638a", 
                        "borderLeftColor": "2px solid #00638a", 
                        "borderRightColor": "2px solid #00638a", 
                        "borderBottomColor": "2px solid #00638a",
                        "backgroundColor": "#00638a",
                        // "borderRadius": "10px",
                        "borderSpacing": "5px"
                    });
                };
                if (sidebarExpanded == true) {
                    $("#highlightedSidenavElement").stop().animate({
                        "marginLeft": "108px",
                        "opacity": "0"
                    }, 200);
                } else {
                    highlightedSidenavElementOpacity = true
                };
            };
        }, function() { // when leaving hover
            $("#highlightedSidenavElement").stop().animate({
                "opacity": "0"
            }, 200);
            if ($(this)[0]["id"].split("sidenavElement")[1] != currentPageSideElement) {
                $(this).find(".sidenavElementInner").animate({
                    "borderTopColor": "0px solid #00638a", 
                    "borderLeftColor": "0px solid #00638a", 
                    "borderRightColor": "0px solid #00638a", 
                    "borderBottomColor": "0px solid #00638a",
                    "backgroundColor": "#232323"
                    // "borderRadius": "0px"
                });
            };
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
    $("#sidenavElement-2").click(function() {
        window.location = "home.html";
    });
})