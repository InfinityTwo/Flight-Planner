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

function redBorder(inputType) {
    inputType.stop().animate({
        "borderTopColor": "2px solid " + errorColour, 
        "borderLeftColor": "2px solid " + errorColour, 
        "borderRightColor": "2px solid " + errorColour, 
        "borderBottomColor": "2px solid " + errorColour
    }, 125);
};

function normalBorder(inputType) { //need to add ignore those with red border
    inputType.animate({
        "borderTopColor": "2px solid #232323", 
        "borderLeftColor": "2px solid #232323", 
        "borderRightColor": "2px solid #232323", 
        "borderBottomColor": "2px solid #232323"
    }, 100);
};

function checkFilled(inputType, lengthOfInputType, inputTypeJQuery) {
    if (inputType.length < lengthOfInputType) {
        redBorder(inputTypeJQuery);
        return true;
    } else {
        return false;
    };
};

function checkTimeInputValidity(inputValue, lastclickedValue) {
    if (inputValue.length != 4) { // check correct length of 4
        return true;
    } else {
        try { // try parseInt to make sure it is integer type and not string
            parseInt(lastclickedValue);
        }
        catch(err) {
            return true;
        }
    };
    if (parseInt(lastclickedValue.slice(0, 1)) <= 2 && parseInt(lastclickedValue.slice(2, 3)) <= 5) {
        return false;
    } else {
        return true;
    }
};

function timeCalculator(lastClickedItem, otherInput, lastClickedID, otherID) {
    depArrActualError = checkTimeInputValidity(document.getElementById(lastClickedID).value, lastClickedItem.value);
    if (depArrActualError == true) {
        redBorder(lastClicked);
    } else {
        depArrActualError = checkTimeInputValidity(document.getElementById(otherID).value, otherInput.value);
        if (depArrActualError == false) {
            if (parseInt(document.getElementById("ADepTime").value) <= parseInt(document.getElementById("AArrTime").value)) {
                var departureTimeH = parseInt(String(document.getElementById("ADepTime").value).substring(2, 0));
                var arrivalTimeH = parseInt(String(document.getElementById("AArrTime").value).substring(2, 0));
                var departureTimeM = parseInt(String(document.getElementById("ADepTime").value).substring(4, 2));
                var arrivalTimeM = parseInt(String(document.getElementById("AArrTime").value).substring(4, 2));
                var hoursFlown = arrivalTimeH - departureTimeH;
                var minutesFlown = arrivalTimeM - departureTimeM;
                if (minutesFlown < 0) {
                    hoursFlown--;
                    minutesFlown += 60;
                };
                document.getElementById("FT").value = hoursFlown + "H " + minutesFlown + "M";
                setOverlayUp($("#FT"));;
                if ($("#ADepTime").css("border") == "2px solid " + errorColour) {
                    normalBorder($("#ADepTime"));
                };
                if ($("#AArrTime").css("border") == "2px solid " + errorColour) {
                    normalBorder($("#AArrTime"));
                };
            } else {
                redBorder($("#AArrTime"));
                redBorder($("#ADepTime"));
            };
        };
    }; //else calculate flight time (todo for another day)
};

// main code
$(document).ready(function() {
    // just to test if nothing goes wrong
    console.log("loaded");

    // ANIMATIONS AND UI EFFECTS
    // event handler of hovering textboxes in new plan
    $(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5").hover(
        function() {
            if ($(this).css("border") != clickedColour3 && $(this).css("border") != "2px solid " + errorColour) {
                $(this).animate({
                    "borderTopColor": "2px solid " + clickedColourHover, 
                    "borderLeftColor": "2px solid " + clickedColourHover, 
                    "borderRightColor": "2px solid " + clickedColourHover, 
                    "borderBottomColor": "2px solid " + clickedColourHover
                }, 100);
            };
        }, function() {
            if ($(this).css("border") != clickedColour3 && $(this).css("border") != "2px solid " + errorColour) {
                normalBorder($(this));
            };
        }
    );
    
    // event handler of clicking anywhere except textboxes in plan
    $(document).click(function(event) {
        // console.log(typeof lastClicked)
        if (outsideClick == true && lastClicked != -1) {
            normalBorder(lastClicked);
            if (lastClicked.val().length == 0) {
                setOverlayDown(lastClicked);
            };
            if (lastClicked[0] == document.getElementById("Cruise")) {
                if (document.getElementById("Cruise").value.length <= 3 && document.getElementById("Cruise").value.length >= 2 && document.getElementById("Cruise").value.includes("FL") == false) {
                    document.getElementById("Cruise").value = "FL" + document.getElementById("Cruise").value;
                };
            };
            var depArrActualError1 = false;
            var depArrActualError2 = false;
            if (lastClicked[0].value.length != 0) { // make sure there's at least something (to check 0 length)
                if (lastClicked[0] == document.getElementById("ADepTime")) {
                    timeCalculator(lastClicked[0], document.getElementById("AArrTime"), "ADepTime", "AArrTime");
                } else if (lastClicked[0] == document.getElementById("AArrTime")) {
                    timeCalculator(lastClicked[0], document.getElementById("ADepTime"), "AArrTime", "ADepTime");
                };
            };
            lastClicked = -1;
        };
        if (document.getElementById("FT").value.length > 0 && document.getElementById("LR").value.length > 0) {
            document.getElementById("NewButtonID").innerHTML = "<strong>Complete Plan</strong>";
        } else {
            document.getElementById("NewButtonID").innerHTML = "<strong>Set Up Plan</strong>";
        };
        outsideClick = true;
    });
    
    // event handler of clicking textboxes in new plan
    function textboxClick(thisEventHandler, outsideClickBoolean) {
        // normalBorder($(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5")); //can be removed if there is no bugs after some testing
        if (lastClicked != -1) {
            normalBorder(lastClicked)
        };
        thisEventHandler.stop().animate({
            "borderTopColor": "2px solid " + clickedColour, 
            "borderLeftColor": "2px solid " + clickedColour, 
            "borderRightColor": "2px solid " + clickedColour, 
            "borderBottomColor": "2px solid " + clickedColour
        }, 0);
        setOverlayUp(thisEventHandler);
        if (lastClicked != -1 && lastClicked.val().length == 0) {
            setOverlayDown(lastClicked);
        };
        outsideClick = outsideClickBoolean;
        lastClicked = thisEventHandler;
    };

    $(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5").click(function() {
        textboxClick($(this), false);
    });

    $(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5").select(function() {
        textboxClick($(this), true);
    });

    // event handlers of hovering fetch and new plan
    $(".FetchMETAR, #FetchSB").hover(
        function() {
            $(this).animate({
                "background-color": "#232323"
            }, 125);
        }, function() {
            $(this).animate({
                "background-color": "#161616"
            }, 125);
        }
    );

    $(".NewButton").hover(
        function() {
            $(this).animate({
                "background-color": "#505050",
                "borderTopColor": "2px solid #505050",
                "borderLeftColor": "2px solid #505050",
                "borderRightColor": "2px solid #505050",
                "borderBottomColor": "2px solid #505050"
            }, 125);
        }, function() {
            $(this).animate({
                "background-color": "#232323",
                "borderTopColor": "2px solid #232323",
                "borderLeftColor": "2px solid #232323",
                "borderRightColor": "2px solid #232323",
                "borderBottomColor": "2px solid #232323"
            }, 125);
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
        var toExit = false;
        var inputTypeListToCheck = ["Departure", "Arrival", "Date", "FlightNum", "Cruise", "Equipment", "Cargo", "Fuel", "DepTime", "ArrTime", "Route"];
        var inputTypeListToCheckValue = [3, 3, 8, 4, 5, 3, 1, 4, 4, 4, 3];
        for (i = 0; i < inputTypeListToCheck.length; i++) {
            toExit = checkFilled(document.getElementById(inputTypeListToCheck[i]).value, inputTypeListToCheckValue[i], $("#" + inputTypeListToCheck[i]))
        };
        outsideClick = false;
        if (toExit == true) {
            return;
        };
    })

    // Fetch Simbrief Clicked
    $("#FetchSB").click(function() {
        $.get("https://www.simbrief.com/api/xml.fetcher.php?username=InFInItyKiLL33").done(function(data) {
            // console.log(data); //used for testing only
            if (document.getElementById("Departure").value != data.getElementsByTagName("origin")[0].childNodes[0].nextSibling.innerHTML) {
                document.getElementById("Departure").value = data.getElementsByTagName("origin")[0].childNodes[0].nextSibling.innerHTML;
                setOverlayUp($("#Departure"));
            }
            if (document.getElementById("Arrival").value != data.getElementsByTagName("destination")[0].childNodes[0].nextSibling.innerHTML) {
                document.getElementById("Arrival").value = data.getElementsByTagName("destination")[0].childNodes[0].nextSibling.innerHTML;
                setOverlayUp($("#Arrival"));
            }
            if (document.getElementById("Date").value.length == 0) {
                var date = new Date();
                date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                document.getElementById("Date").value = date;
                setOverlayUp($("#Date"));
            }
            if (document.getElementById("FlightNum").value != data.getElementsByTagName("general")[0].childNodes[2].nextSibling.innerHTML + data.getElementsByTagName("general")[0].childNodes[4].nextSibling.innerHTML) {
                document.getElementById("FlightNum").value = data.getElementsByTagName("general")[0].childNodes[2].nextSibling.innerHTML + data.getElementsByTagName("general")[0].childNodes[4].nextSibling.innerHTML;
                setOverlayUp($("#FlightNum"));
            }
            if (document.getElementById("Cruise").value != data.getElementsByTagName("general")[0].childNodes[26].nextSibling.innerHTML) {
                document.getElementById("Cruise").value = data.getElementsByTagName("general")[0].childNodes[26].nextSibling.innerHTML;
                setOverlayUp($("#Cruise"));
            }
            if (document.getElementById("CI").value != data.getElementsByTagName("general")[0].childNodes[14].nextSibling.innerHTML.slice(2)) {
                document.getElementById("CI").value = data.getElementsByTagName("general")[0].childNodes[14].nextSibling.innerHTML.slice(2);
                setOverlayUp($("#CI"));
            }
            if (document.getElementById("Fuel").value != data.getElementsByTagName("fuel")[0].childNodes[18].nextSibling.innerHTML + "/" + String(parseInt(data.getElementsByTagName("fuel")[0].childNodes[4].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[6].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[8].nextSibling.innerHTML))) {
                document.getElementById("Fuel").value = data.getElementsByTagName("fuel")[0].childNodes[18].nextSibling.innerHTML + "/" + String(parseInt(data.getElementsByTagName("fuel")[0].childNodes[4].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[6].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[8].nextSibling.innerHTML));
                setOverlayUp($("#Fuel"));
            }
            if (document.getElementById("Winds").value != data.getElementsByTagName("general")[0].childNodes[36].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[38].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[30].nextSibling.innerHTML) {
                document.getElementById("Winds").value = data.getElementsByTagName("general")[0].childNodes[36].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[38].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[30].nextSibling.innerHTML;
                setOverlayUp($("#Winds"));
            }
            //changing the route to a preferable format
            var Route = data.getElementsByTagName("general")[0].childNodes[54].nextSibling.innerHTML;
            var ATCRoute = data.getElementsByTagName("atc")[0].childNodes[2].nextSibling.innerHTML;
            var index = ATCRoute.indexOf(Route.split(" ")[0]);
            ATCRoute = ATCRoute.slice(index, ATCRoute.length);
            Route = ATCRoute.split("/");
            //to get rid of N and K for waypoints
            while (Route.length > 1) {
                for (i = 0; i < Route.length - 1; i++) {
                    if (Route[1][0] != "F") {
                        Route[1] = Route[1].slice(Route[1].indexOf("F"), Route[1].length);
                    };
                    Route[1] = Route[0] + "/" + Route[1];
                    Route = Route.slice(1, Route.length);
                };
            };
            //to shorten route because of the N and K
            Route = String(Route);
            Route = Route.split(" ");
            var toPurge = [];
            var lastAltitude = String(document.getElementById("Cruise").value);
            lastAltitude = lastAltitude.slice(0, lastAltitude.length - 2);
            for (i = 0; i < Route.length; i++) {
                if (Route[i].indexOf("/F") != -1) {
                    if (i != 0 || i != Route.length - 1) {
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
            };
            for (i = toPurge.length - 1; i >= 0; i--) {
                Route.splice(toPurge[i], 1);
            };
            Route = Route.join(" ");
            if (document.getElementById("Route").value != Route) {
                document.getElementById("Route").value = Route;
                setOverlayUp($("#Route"));
            };
            // console.log(data.getElementsByTagName("general")[0].childNodes[54].nextSibling.innerHTML); //used for testing only
        });
        lastClicked = -1
        // todo: animated placeholder text
    });
});