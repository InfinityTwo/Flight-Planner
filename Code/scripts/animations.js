var sideElementNumbers = {
    1: "-178px",
    2: "-118px",
    3: "-58px",
};
var currentPageSideElement = 0; // 0 is null value, -1 is last element, 1 and onwards is as logical
var highlightedSidenavElement = false; // false is null value
var sidebarExpanded = false;
var timeFormat = 0 // 0 for UTC, 1 for local

function getTime(length, format) { // length of 0 returns timeNow, length of 1 returns timeNowShort
    if (length == 0 && format == 0) {
        return new Date().toUTCString().substr(17, 8);
    } else if (length == 1 && format == 0) {
        return new Date().toUTCString().substr(17, 5);
    } else if (length == 1 && format == 0) {
        return Date().substr(16, 5);
    } else {
        return Date().substr(16, 8);
    };
};

function updateTime() {
    if (sidebarExpanded == true) {
        var time = getTime(0, timeFormat)
    } else {
        var time = getTime(1, timeFormat)
    };
    document.getElementById("sidenavTimer").value = String(time);
    setTimeout(updateTime, 100);
};

function sidebarExpand() {
    $(".sidenav, #sidenavElement-1").stop().animate({ // expands the sidenav
        "width": "170px"
    }, 250);
    $(".sidenavElementInner").stop().animate({ // moves the background nav to a ui left of icon
        "borderRadius": "5px",
        "width": "5px",
        "height": "30px",
        "marginLeft": "15px",
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
    if (currentPageSideElement == -2 || (highlightedSidenavElement != false && highlightedSidenavElement[0]["id"] == "sidenavElement-2" && highlightedSidenavElement != false)) { // basically to keep logo coloured if on home page
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
    if (timeFormat == 0) {
        $("#sidenavTimerUTC").stop().animate({
            "paddingLeft": "45%",
            "color": "#ffffff"
        }, 200);
        $("#sidenavTimer").stop().animate({
            "font-size": "1.3rem",
            "paddingLeft": "27.5%",
            "paddingTop": "5px"
        }, 200);
    } else {
        $("#sidenavTimerUTC").stop().animate({
            "paddingLeft": "34%",
            "color": "#00a3e4"
        }, 200);
        $("#sidenavTimer").stop().animate({
            "font-size": "1.3rem",
            "paddingLeft": "27.5%",
            "color": "#00a3e4",
            "paddingTop": "5px"
        }, 200);
    }
    $("#sidenavImages-2").stop().animate({
        "paddingLeft": "20px"
    }, 200);
    highlightedSidenavElement = false;
    sidebarExpanded = true;
};

function sidebarCollapse() {
    $(".sidenav, #sidenavElement-1").stop().animate({ // collapses the sidenav
        "width": "80px"
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
    $("#sidenavTimer").stop().animate({
        "font-size": "1.1rem",
        "paddingLeft": "22.5%",
        "paddingTop": "10px",
        "color": "#ffffff"
    }, 200);
    $("#sidenavTimerUTC").stop().animate({
        "paddingLeft": "35%",
        "color": "#ffffff"
    }, 200);
    $("#sidenavImages-2").stop().animate({
        "paddingLeft": "25px"
    }, 200);
    highlightedSidenavElement = false;
    sidebarExpanded = false;
};

function checkCurrentFile() {
    //get current page
    file = location.href.split("/").slice(-1)[0].split(".html")[0];
    SideBars = [["home"], ["settings"], [], ["editplan", "newplan", "plans"], ["editequipment", "newplane", "fleet"], ["checklist"]]; // hard coded, 3rd list is empty as 0 is timer. List starts from -2
    for (i = -2; i < SideBars.length - 1; i++) {
        if (SideBars[i + 2].includes(file)) {
            currentPageSideElement = i;
            break;
        };
    };
    $("#sidenavElementInner" + String(currentPageSideElement)).css({
        "backgroundColor": "#00638a"
    });
};

$(document).ready(function() {
    updateTime();
    checkCurrentFile();

    // event handler of hovering sidenav
    $(".sidenav").hover(
        function() {
            sidebarExpand();
        }, function() {
            sidebarCollapse();
        }
    );

    $("#sidenavElement0").hover(
        function() {
            timeFormat = 1;
            document.getElementById("sidenavTimerUTC").value = "UTC " + Date().substr(28, 3) + ":" + Date().substr(31, 2);
            $("#sidenavTimerUTC").stop().animate({
                "paddingLeft": "34%",
                "color": "#00a3e4"
            }, 200);
            $("#sidenavTimer").stop().animate({
                "font-size": "1.3rem",
                "paddingLeft": "27.5%",
                "paddingTop": "5px",
                "color": "#00a3e4"
            }, 200);
        }, function() {
            timeFormat = 0;
            document.getElementById("sidenavTimerUTC").value = "UTC";
            $("#sidenavTimerUTC").stop().animate({
                "paddingLeft": "45%",
                "color": "#ffffff"
            }, 200);
            $("#sidenavTimer").stop().animate({
                "font-size": "1.3rem",
                "paddingLeft": "27.5%",
                "paddingTop": "5px",
                "color": "#ffffff"
            }, 200);
        }
    );
    
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
            if ($(this)[0]["id"].split("sidenavElement")[1] != currentPageSideElement && ($(this)[0]["id"].split("sidenavElement")[1] != -2 || $(this)[0]["id"].split("sidenavElement")[1] != 0)) { // checks for not highlighting current page
                $(this).find(".sidenavElementInner").animate({
                    "backgroundColor": "#00638a"
                }, 100);
                if (sidebarExpanded != true) {
                    highlightedSidenavElement = $(this)
                };
            };
        }, function() { // when leaving hover
            if ($(this)[0]["id"].split("sidenavElement")[1] != currentPageSideElement && ($(this)[0]["id"].split("sidenavElement")[1] != -2 || $(this)[0]["id"].split("sidenavElement")[1] != 0)) {
                $(this).find(".sidenavElementInner").stop().animate({
                    "backgroundColor": "#232323",
                    "borderRadius": "5px",
                    "width": "5px",
                    "height": "30px",
                    "marginLeft": "15px",
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