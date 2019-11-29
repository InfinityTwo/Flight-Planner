// variables
var outsideClick = false;
var clickedColour = "rgb(150, 150, 150)";
var clickedColourHover = "rgb(120, 120, 120)";
var clickedColourNormal = "rgb(35, 35, 35)";
var errorColour = "rgb(150, 0, 0)";
var clickedColour0 = "2px solid " + clickedColourNormal;
var clickedColour2 = "2px solid " + clickedColourHover;
var clickedColour3 = "2px solid " + clickedColour;
var lastClicked = -1;
var inputTypeListToCheck = ["Departure", "Arrival", "Date", "FlightNum", "Cruise", "Equipment", "CI", "Cargo", "Pax", "Fuel", "DepTime", "Winds", "ArrTime", "Route", "ADepTime", "AArrTime", "FT", "LR"];
var inputTypeListToCheckValue = {
    "Departure": [3, 0], 
    "Arrival": [3, 0], 
    "Date": [8, 2], 
    "FlightNum": [4, 0], 
    "Cruise": [5, 3], 
    "Equipment": [4, 0], 
    "CI": [1, 1], 
    "Cargo": [1, 1], 
    "Pax": [1, 1], 
    "Fuel": [3, 2], 
    "DepTime": [5, 0], 
    "Winds": [3, 2], 
    "ArrTime": [5, 0], 
    "Route": [1, 0], 
    "ADepTime": [4, 1], 
    "AArrTime": [4, 1], 
    "FT": [1, 0], 
    "LR": [1, 1] 
}; // The first digit in the array is the minimum length, second digit represents the following: 0 - Nothing else to check, 1 - Check integer, 2 - Check integer with strip("/"), 3 - Check integer with strip("FL") or strip("ft")

// functions
function setOverlayUp(inputType) {
    inputType.prev("label.inputOverlayLabels").stop().animate({
        "marginTop": "-8px", 
        "marginLeft": "22px",
        "color": "#ffffff",
        "fontSize": "14px" ,
        "z-index": "1"
    }, 125);
};

function setOverlayDown(inputType) {
    inputType.prev("label.inputOverlayLabels").stop().animate({
        "marginTop": "15px", 
        "marginLeft": "27px", 
        "color": "#5d5d5d",
        "fontSize": "17.26px",
        "z-index": "-1"
    }, 125);
};

function borderColouring(inputType, colour, timer) {
    inputType.stop().animate({
        "borderTopColor": "2px solid " + colour, 
        "borderLeftColor": "2px solid " + colour, 
        "borderRightColor": "2px solid " + colour, 
        "borderBottomColor": "2px solid " + colour
    }, timer);
};

function redBorder(inputType) {
    borderColouring(inputType, errorColour, 125);
};

function normalBorder(inputType) { // need to add ignore those with red border
    borderColouring(inputType, "#232323", 125);
};

function hoverOverColouring(inputType, colour) {
    inputType.stop().animate({ // cannot use "borderColouring(inputType, colour, 125);"" as there is a delay
        "background-color": colour,
        "borderTopColor": "2px solid " + colour, 
        "borderLeftColor": "2px solid " + colour, 
        "borderRightColor": "2px solid " + colour, 
        "borderBottomColor": "2px solid " + colour
    }, 125);
}

function checkFilled(inputTypeValue, lengthOfInputType, inputTypeJQuery, specialCheck, toReturnOnEmpty) {
    if (inputTypeValue.length == 0 && toReturnOnEmpty == true) {
        return false;
    };
    if (inputTypeValue.length < lengthOfInputType) {
        redBorder(inputTypeJQuery);
        return true;
    };
    if (specialCheck >= 1 && specialCheck <= 3) {
        if (specialCheck >= 2) {
            if (specialCheck == 2 && inputTypeValue.includes("/") == false) {
                redBorder(inputTypeJQuery);
                return true;
            };
            inputTypeValue = inputTypeValue.toUpperCase().split("/").join("").split("FL").join("").split("FT").join("");
        };
        if (Math.abs(inputTypeValue) != Math.abs(inputTypeValue)) {
            redBorder(inputTypeJQuery);
            return true;
        };
    };
    return false;
};

function redToNormalBorder(inputType) {
    if (inputType.css("border") == "2px solid " + errorColour) {
        normalBorder(inputType);
    };
};

function checkTimeInputValidity(inputValue, lastclickedValue) {
    try { // try parseInt to make sure it is integer type and not string
        parseInt(lastclickedValue);
    }
    catch(err) {
        return true;
    }
    return (false == (inputValue.length == 4 && parseInt(lastclickedValue.slice(0, 1)) <= 2 && parseInt(lastclickedValue.slice(2, 3)) <= 5)); // returns false if all conditions are met. return true if any condition fails
};

function timeCalculator(lastClickedItem, otherInput, lastClickedID, otherID) {
    if (checkTimeInputValidity(document.getElementById(lastClickedID).value, lastClickedItem.value) == true) { // check last edited time value
        redBorder(lastClicked);
    } else if (checkTimeInputValidity(document.getElementById(otherID).value, otherInput.value) == false) { // check the other time value and do nothing if the other is wrong in case it isn't filled
        var hoursFlown = parseInt(String(document.getElementById("AArrTime").value).substring(2, 0)) - parseInt(String(document.getElementById("ADepTime").value).substring(2, 0));
        var minutesFlown = parseInt(String(document.getElementById("AArrTime").value).substring(4, 2)) - parseInt(String(document.getElementById("ADepTime").value).substring(4, 2));
        if (minutesFlown < 0) { // checking in case the hours are different by one but minutes are different by a negative value (e.g. D: 0159Z, A: 0201Z)
            hoursFlown--;
            minutesFlown += 60;
        };
        if (parseInt(document.getElementById("ADepTime").value) > parseInt(document.getElementById("AArrTime").value)) { // checks if it goes beyond 12am (i.e. D: 2359Z, A: 0001Z)
            hoursFlown = 24 - Math.abs(hoursFlown);
        };
        document.getElementById("FT").value = hoursFlown + "H " + minutesFlown + "M"; // sets text
        // css changes
        setOverlayUp($("#FT")); // animates the placeholder
        redToNormalBorder($("#ADepTime")); // make it normal border if it was red
        redToNormalBorder($("#AArrTime"));
        $("#FT").css("cursor", "text"); // changes cursor to highlightable cursor
    };
};

function clickedOutsideOrTabbed(releasedBox) {
    if (outsideClick == true && lastClicked != -1) {
        if (checkFilled(document.getElementById(lastClicked[0]["id"]).value, inputTypeListToCheckValue[lastClicked[0]["id"]][0], $("#" + lastClicked[0]["id"]), inputTypeListToCheckValue[lastClicked[0]["id"]][1], true) == true) {
            redBorder(lastClicked);
        } else {
            if (lastClicked.val().length == 0) {
                setOverlayDown(lastClicked);
            };
            normalBorder(lastClicked);
        };
        if (lastClicked[0].value.length != 0) { // make sure there's at least something (to check 0 length)
            if (lastClicked[0] == document.getElementById("Cruise")) {
                if (document.getElementById("Cruise").value.length <= 3 && document.getElementById("Cruise").value.length >= 2 && document.getElementById("Cruise").value.toUpperCase().includes("FL") == false && document.getElementById("Cruise").value.toUpperCase().includes("ft") == false) {
                    document.getElementById("Cruise").value = "FL" + document.getElementById("Cruise").value;
                } else if (document.getElementById("Cruise").value.toUpperCase().includes("FT") == false && document.getElementById("Cruise").value.toUpperCase().includes("FL") == false) {
                    document.getElementById("Cruise").value = document.getElementById("Cruise").value + "ft";
                };
            };
            if (lastClicked[0] == document.getElementById("ADepTime")) {
                timeCalculator(lastClicked[0], document.getElementById("AArrTime"), "ADepTime", "AArrTime");
            } else if (lastClicked[0] == document.getElementById("AArrTime")) {
                timeCalculator(lastClicked[0], document.getElementById("ADepTime"), "AArrTime", "ADepTime");
            };
        };
        lastClicked = -1;
        if (document.getElementById("LR").value.length > 0) {
            if (Math.abs(document.getElementById("LR").value) != Math.abs(document.getElementById("LR").value)) {
                redBorder($("#LR"));
            } else {
                document.getElementById("LR").value = Math.abs(document.getElementById("LR").value) * -1;
            };
            if (document.getElementById("FT").value.length > 0) {
                document.getElementById("NewButtonID").innerHTML = "<strong>Complete Plan</strong>";
                hoverOverColouring($("#NewButtonID"), "#3d9e00");
            } else {
                document.getElementById("NewButtonID").innerHTML = "<strong>Set Up Plan</strong>";
                hoverOverColouring($("#NewButtonID"), "#00638a");
            };
        };
    };
    outsideClick = true;
    if (releasedBox != false) {
        lastClicked = releasedBox;
        setOverlayUp(lastClicked);
        borderColouring(lastClicked, clickedColour, 0);
    };
};

function textboxClick(thisEventHandler, outsideClickBoolean) {
    if (lastClicked != -1) {
        normalBorder(lastClicked)
    };
    borderColouring(thisEventHandler, clickedColour, 0);
    setOverlayUp(thisEventHandler);
    if (lastClicked != -1 && lastClicked.val().length == 0) {
        setOverlayDown(lastClicked);
    };
    outsideClick = outsideClickBoolean;
    lastClicked = thisEventHandler;
};

// main code
$(document).ready(function() {
    // ANIMATIONS AND UI EFFECTS
    // event handler of hovering textboxes in new plan
    $(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5").hover(
        function() {
            if ($(this).css("border") != clickedColour3 && $(this).css("border") != "2px solid " + errorColour) {
                borderColouring($(this), clickedColourHover, 125)
            };
        }, function() {
            if ($(this).css("border") != clickedColour3 && $(this).css("border") != "2px solid " + errorColour) {
                normalBorder($(this));
            };
        }
    );

    // event handler of tabbing into the next div
    $(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5").on("keyup", function(e) {
        if (e.which == 9) {
            clickedOutsideOrTabbed($(this));
        };
    })
    
    // event handler of clicking anywhere except textboxes in plan
    $(document).click(function(event) {
        clickedOutsideOrTabbed(false);
    });
    
    // event handler of clicking textboxes in new plan
    $(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5").click(function() {
        textboxClick($(this), false);
    });

    $(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5").select(function() {
        textboxClick($(this), true);
    });

    // event handlers of hovering fetch and new plan
    $(".FetchMETAR").hover(
        function() {
            hoverOverColouring($(this), "#ad8000");
        }, function() {
            hoverOverColouring($(this), "#946d00");
        }
    );

    $("#FetchSB").hover(
        function() {
            hoverOverColouring($(this), "#00a3e4");
        }, function() {
            hoverOverColouring($(this), "#00638a");
        }
    );

    $(".NewButton").hover(
        function() {
            if (document.getElementById("NewButtonID").innerHTML == "<strong>Complete Plan</strong>") {
                hoverOverColouring($(this), "#31d100");
            } else {
                hoverOverColouring($(this), "#00a3e4");
            };
        }, function() {
            if (document.getElementById("NewButtonID").innerHTML == "<strong>Complete Plan</strong>") {
                hoverOverColouring($(this), "#3d9e00");
            } else {
                hoverOverColouring($(this), "#00638a");
            };
        }
    );

    // BACKEND MAGIC

    // Double Click autofill
    $("#CI").dblclick(function() {
        const CI = Math.floor((Math.random() * 200) + 1);
        document.getElementById("CI").value = CI;
        setOverlayUp($("#CI"));
    })
    $("#Cargo").dblclick(function() {
        const Cargo = Math.floor((Math.random() * 50000) + 1);
        document.getElementById("Cargo").value = Cargo;
        setOverlayUp($("#Cargo"));
    })
    $("#Pax").dblclick(function() {
        const Pax = Math.floor((Math.random() * 125) + 76);
        document.getElementById("Pax").value = Pax;
        setOverlayUp($("#Pax"));
    })

    $("#Date").dblclick(function() {
        var date = new Date();
        date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        document.getElementById("Date").value = date;
        setOverlayUp($("#Date"));
    })

    // Fetch Metar Clicked
    $(".FetchMETAR").click(function() {
        clickedOutsideOrTabbed(false);
        normalBorder($(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5"));
        var Departure = document.getElementById("Departure").value;
        var Arrival = document.getElementById("Arrival").value;
        if (Departure.length >= 3 && Arrival.length >= 3) {
            $.get("https://avwx.rest/api/metar/" + Departure.toUpperCase() + "?options=&airport=true&reporting=true&format=json&onfail=cache&token=qpNMIdTcDq7TJlgxbfkZfJKPiyZ4ui_oDRIYxyMnLFc", {"Authorization" : "TOKEN qpNMIdTcDq7TJlgxbfkZfJKPiyZ4ui_oDRIYxyMnLFc"}).done(function(data) {
                document.getElementById("METARbox1").innerHTML = data["raw"];
            });
            $.get("https://avwx.rest/api/metar/" + Arrival.toUpperCase() + "?options=&airport=true&reporting=true&format=json&onfail=cache&token=qpNMIdTcDq7TJlgxbfkZfJKPiyZ4ui_oDRIYxyMnLFc", {"Authorization" : "TOKEN qpNMIdTcDq7TJlgxbfkZfJKPiyZ4ui_oDRIYxyMnLFc"}).done(function(data) {
                document.getElementById("METARbox2").innerHTML = data["raw"];
            });
            $(".METARbox").css("cursor", "text")
        } else {
            if (Departure.length < 3) {
                redBorder($("#Departure"));
            };
            if (Arrival.length < 3) {
                redBorder($("#Arrival"));
            };
            outsideClick = false;
        }
    })

    // New Plan Clicked
    $(".NewButton").click(function() {
        clickedOutsideOrTabbed(false);
        var toExit = false;
        var inputTypeListToCheck = ["Departure", "Arrival", "Date", "FlightNum", "Cruise", "Equipment", "Cargo", "Fuel", "DepTime", "ArrTime", "Route"];
        for (i = 0; i < inputTypeListToCheck.length; i++) {
            toExit = checkFilled(document.getElementById(inputTypeListToCheck[i]).value, inputTypeListToCheckValue[inputTypeListToCheck[i]][0], $("#" + inputTypeListToCheck[i]), inputTypeListToCheckValue[inputTypeListToCheck[i]][1], false);
        };
        outsideClick = false;
        if (toExit == true) {
            return;
        };
    })

    // Fetch Simbrief Clicked
    $("#FetchSB").click(function() {
        clickedOutsideOrTabbed(false);
        $.get("https://www.simbrief.com/api/xml.fetcher.php?username=InFInItyKiLL33").done(function(data) {
            // console.log(data); // used for testing only
            // updating all div text values from the api data and animating all of the edited data's placeholder text
            function overlayUpAndNormalBorder(inputValue) {
                setOverlayUp(inputValue);
                normalBorder(inputValue);
            };
            if (document.getElementById("Departure").value != data.getElementsByTagName("origin")[0].childNodes[0].nextSibling.innerHTML) {
                document.getElementById("Departure").value = data.getElementsByTagName("origin")[0].childNodes[0].nextSibling.innerHTML;
                overlayUpAndNormalBorder($("#Departure"));
            }
            if (document.getElementById("Arrival").value != data.getElementsByTagName("destination")[0].childNodes[0].nextSibling.innerHTML) {
                document.getElementById("Arrival").value = data.getElementsByTagName("destination")[0].childNodes[0].nextSibling.innerHTML;
                overlayUpAndNormalBorder($("#Arrival"));
            }
            if (document.getElementById("Date").value.length == 0) {
                var date = new Date();
                date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                document.getElementById("Date").value = date;
                overlayUpAndNormalBorder($("#Date"));
            }
            if (document.getElementById("FlightNum").value != data.getElementsByTagName("general")[0].childNodes[2].nextSibling.innerHTML + data.getElementsByTagName("general")[0].childNodes[4].nextSibling.innerHTML) {
                document.getElementById("FlightNum").value = data.getElementsByTagName("general")[0].childNodes[2].nextSibling.innerHTML + data.getElementsByTagName("general")[0].childNodes[4].nextSibling.innerHTML;
                overlayUpAndNormalBorder($("#FlightNum"));
            }
            if (document.getElementById("Cruise").value != data.getElementsByTagName("general")[0].childNodes[26].nextSibling.innerHTML) {
                document.getElementById("Cruise").value = "FL" + data.getElementsByTagName("general")[0].childNodes[26].nextSibling.innerHTML.substring(0, data.getElementsByTagName("general")[0].childNodes[26].nextSibling.innerHTML.length - 2);
                overlayUpAndNormalBorder($("#Cruise"));
            }
            if (document.getElementById("CI").value != data.getElementsByTagName("general")[0].childNodes[14].nextSibling.innerHTML.slice(2)) {
                document.getElementById("CI").value = data.getElementsByTagName("general")[0].childNodes[14].nextSibling.innerHTML.slice(2);
                overlayUpAndNormalBorder($("#CI"));
            }
            if (document.getElementById("Fuel").value != data.getElementsByTagName("fuel")[0].childNodes[18].nextSibling.innerHTML + "/" + String(parseInt(data.getElementsByTagName("fuel")[0].childNodes[4].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[6].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[8].nextSibling.innerHTML))) {
                document.getElementById("Fuel").value = data.getElementsByTagName("fuel")[0].childNodes[18].nextSibling.innerHTML + "/" + String(parseInt(data.getElementsByTagName("fuel")[0].childNodes[4].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[6].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[8].nextSibling.innerHTML));
                overlayUpAndNormalBorder($("#Fuel"));
            }
            if (document.getElementById("Winds").value != data.getElementsByTagName("general")[0].childNodes[36].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[38].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[30].nextSibling.innerHTML) {
                document.getElementById("Winds").value = data.getElementsByTagName("general")[0].childNodes[36].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[38].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[30].nextSibling.innerHTML;
                overlayUpAndNormalBorder($("#Winds"));
            }
            // changing the route to a preferable format
            var Route = data.getElementsByTagName("general")[0].childNodes[54].nextSibling.innerHTML;
            var ATCRoute = data.getElementsByTagName("atc")[0].childNodes[2].nextSibling.innerHTML;
            var index = ATCRoute.indexOf(Route.split(" ")[0]);
            ATCRoute = ATCRoute.slice(index, ATCRoute.length);
            Route = ATCRoute.split("/");
            // to get rid of N and K for waypoints
            while (Route.length > 1) {
                for (i = 0; i < Route.length - 1; i++) {
                    if (Route[1][0] != "F") {
                        if (Route[1].includes("F")) {
                            Route[1] = Route[1].slice(Route[1].indexOf("F"), Route[1].length);
                        } else {
                            Route[1] = ""
                        };
                    };
                    if (Route[1] != "") {
                        Route[1] = Route[0] + "/" + Route[1];
                    } else {
                        Route[1] = Route[0]
                    };
                    Route = Route.slice(1, Route.length);
                };
            };
            // to shorten route because of the N and K
            Route = String(Route).split(" ");
            var toPurge = [];
            var lastAltitude = String(document.getElementById("Cruise").value);
            lastAltitude = lastAltitude.slice(2, lastAltitude.length);
            for (i = 0; i < Route.length; i++) {
                if ((Route[i].indexOf("/F") != -1) && (i != 0 || i != Route.length - 1)) {
                    if (Route[i - 1] == Route[i + 1] && parseInt(Route[i].slice(Route[i].indexOf("/F") + 2, Route[i].length)) == parseInt(lastAltitude)) {
                        if (toPurge.includes(i - 1) == false) {
                            toPurge.push(i - 1);
                        };
                        if (toPurge.includes(i) == false) {
                            toPurge.push(i);
                        };
                    } else {
                        lastAltitude = parseInt(Route[i].slice(Route[i].indexOf("/F") + 2, Route[i].length));
                    };
                };
            };
            for (i = toPurge.length - 1; i >= 0; i--) {
                Route.splice(toPurge[i], 1);
            };
            // adds origin, origin runway, dest, dest runway and joins the list of waypoints and airways together
            Route = document.getElementById("Departure").value + "/" + data.getElementsByTagName("origin")[0].childNodes[12].nextSibling.innerHTML + " " + Route.join(" ") + " " + document.getElementById("Arrival").value + "/" + data.getElementsByTagName("destination")[0].childNodes[12].nextSibling.innerHTML;
            if (document.getElementById("Route").value != Route) {
                document.getElementById("Route").value = Route;
                overlayUpAndNormalBorder($("#Route"));
            };
            // console.log(data.getElementsByTagName("general")[0].childNodes[54].nextSibling.innerHTML); // used for testing only
        });
        lastClicked = -1
    });
});