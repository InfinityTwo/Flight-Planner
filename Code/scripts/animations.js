var sideElementNumbers = {
    1: "-178px",
    2: "-118px",
    3: "-58px",
};
var currentPageSideElement = 0; // 0 is null value, -1 is last element, 1 and onwards is as logical
var highlightedSidenavElement = false; // false is null value
var sidebarExpanded = false;

function sidebarExpand() {
    $(".sidenav, #sidenavElement-1").stop().animate({ // expands the sidenav
        "width": "140px"
    }, 250);
    $(".sidenavElementInner").stop().animate({ // moves the background nav to a ui left of icon
        "borderRadius": "5px",
        "width": "5px",
        "height": "30px",
        "marginLeft": "10px",
        "marginTop": "13px"
    }, 200);
    if (highlightedSidenavElement != false) {
        highlightedSidenavElement.find(".sidenavElementInner").stop().animate({ // show colour on selected icon in case it was hovered immediately
            "borderRadius": "5px",
            "width": "5px",
            "height": "30px",
            "marginLeft": "10px",
            "marginTop": "13px",
            "backgroundColor": "#00638a"
        }, 200);
    };
    if (currentPageSideElement == -2 || ($("#sidenavElement-2")[0]["id"] == "sidenavElement-2" && highlightedSidenavElement != false)) { // basically to keep logo coloured if on home page
        $("#sidenavElement-2").stop().animate({
            "backgroundColor": "#00a3e4"
        }, 200);
    } else {
        $("#sidenavElement-2").stop().animate({
            "backgroundColor": "transparent"
        }, 200);
    };
    $(".sidenavText").stop().animate({ // shows text of icon
        "opacity": "1"
    }, 200);
    highlightedSidenavElement = false;
    sidebarExpanded = true;
};

function sidebarCollapse() {
    $(".sidenav, #sidenavElement-1").stop().animate({ // collapses the sidenav
        "width": "65px"
    }, 250);
    $(".sidenavElementInner").stop().animate({ // moves the ui left of icon to background nav
        "borderRadius": "0px",
        "width": "100%",
        "height": "60px",
        "marginLeft": "",
        "marginTop": "0",
        "backgroundColor": "#232323"
    }, 200);
    if (currentPageSideElement != -2) {}
    $("#sidenavElementInner" + String(currentPageSideElement)).stop().animate({ // keep the current page's icon selected
        "borderRadius": "0px",
        "width": "100%",
        "height": "60px",
        "marginLeft": "",
        "marginTop": "0",
        "backgroundColor": "#00638a"
    }, 200);
    $("#sidenavElement-2").stop().animate({ // makes the logo coloured again, yay!
        "backgroundColor": "#00a3e4"
    }, 200);
    $(".sidenavText").stop().animate({ // hides text of icon
        "opacity": "0"
    }, 200);
    highlightedSidenavElement = false;
    sidebarExpanded = false;
};

function checkCurrentFile() {
    //get current page
    file = location.href.split("/").slice(-1)[0].split(".html")[0];
    SideBars = [["home"], ["settings"], [], ["editplan", "newplan", "plans"], ["editequipment", "newplane", "fleet"], ["checklist"]]; // hard coded, 3rd list is empty as 0 is a null value. List starts from -2
    for (i = -2; i < SideBars.length - 1; i++) {
        if (SideBars[i + 2].includes(file)) {
            currentPageSideElement = i;
            break;
        };
    };
    $("#sidenavElementInner" + String(currentPageSideElement)).css({
        "backgroundColor": "#00638a"
    });
}

$(document).ready(function() {
    // just to test if nothing goes wrong
    console.log("loaded");

    checkCurrentFile();

    // event handler of hovering sidenav
    $(".sidenav").hover(
        function() {
            sidebarExpand();
        }, function() {
            sidebarCollapse();
        }
    )
    
    // event handler of hovering sidenav Logo
    $(".sidenavElement-2").hover(
        function() {
            $("#sidenavElement-2").stop().animate({
                "backgroundColor": "#00638a"
            }, 200);
            highlightedSidenavElement = $("#sidenavElement-2");
        }, function() {
            $("#sidenavElement-2").stop().animate({
                "backgroundColor": "transparent"
            }, 200);
        }
    );

    // event handler of hovering the side labels (dynamic)
    $(".sidenavElement").hover(
        function() { // when hovering
            if ($(this)[0]["id"].split("sidenavElement")[1] != currentPageSideElement) { // checks for not highlighting current page
                if ($(this)[0]["id"].split("sidenavElement")[1] != -1) { // checks for last element as that requires different change in css properties
                    $(this).find(".sidenavElementInner").animate({
                        "backgroundColor": "#00638a"
                    }, 100);
                };
                if (sidebarExpanded != true) {
                    highlightedSidenavElement = $(this)
                };
            };
        }, function() { // when leaving hover
            if ($(this)[0]["id"].split("sidenavElement")[1] != currentPageSideElement) {
                $(this).find(".sidenavElementInner").stop().animate({
                    "backgroundColor": "#232323",
                    "borderRadius": "5px",
                    "width": "5px",
                    "height": "30px",
                    "marginLeft": "10px",
                    "marginTop": "13px"
                }, 100);
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