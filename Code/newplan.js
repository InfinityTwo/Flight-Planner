// ANIMATIONS AND UI EFFECTS variables
var outsideClick = false
var clickedColour = "rgb(150, 150, 150)"
var clickedColourHover = "rgb(120, 120, 120)"
var clickedColourNormal = "rgb(35, 35, 35)"
var errorColour = "rgb(150, 0, 0)"
var clickedColour0 = "2px solid " + clickedColourNormal
var clickedColour2 = "2px solid " + clickedColourHover
var clickedColour3 = "2px solid " + clickedColour
var lastClicked = NaN

// BACKEND MAGIC variables

$(document).ready(function() {
    // just to test if nothing goes wrong
    console.log("loaded");

    // ANIMATIONS AND UI EFFECTS
    // event handler of clicking and hovering textboxes in new plan
    $(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5").hover(
        function() {
            if ($(this).css("border") != clickedColour3) {
                $(this).animate({"borderTopColor": "2px solid " + clickedColourHover, "borderLeftColor": "2px solid " + clickedColourHover, "borderRightColor": "2px solid " + clickedColourHover, "borderBottomColor": "2px solid " + clickedColourHover}, 100);
            };
        }, function() {
            if ($(this).css("border") != clickedColour3) {
                $(this).animate({"borderTopColor": "2px solid #232323", "borderLeftColor": "2px solid #232323", "borderRightColor": "2px solid #232323", "borderBottomColor": "2px solid #232323"}, 100);
            };
        }
    )

    $(document).click(function(event) {
        // console.log(typeof lastClicked)
        if (outsideClick == true && lastClicked != NaN) {
            lastClicked.stop().animate({"borderTopColor": "2px solid #232323", "borderLeftColor": "2px solid #232323", "borderRightColor": "2px solid #232323", "borderBottomColor": "2px solid #232323"}, 100);
            if (lastClicked[0] == document.getElementById("Cruise")) {
                if (document.getElementById("Cruise").value.length <= 3 && document.getElementById("Cruise").value.length >= 2 && document.getElementById("Cruise").value.includes("FL") == false) {
                    document.getElementById("Cruise").value = "FL" + document.getElementById("Cruise").value
                }
            }
            lastClicked = NaN;
        }
        outsideClick = true
    })

    $(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5").click(function() {
        $(".inputType1, .inputType2, .inputType3, .inputType4, .inputType5").animate({"borderTopColor": "2px solid #232323", "borderLeftColor": "2px solid #232323", "borderRightColor": "2px solid #232323", "borderBottomColor": "2px solid #232323"}, 100);
        $(this).stop().animate({"borderTopColor": "2px solid " + clickedColour, "borderLeftColor": "2px solid " + clickedColour, "borderRightColor": "2px solid " + clickedColour, "borderBottomColor": "2px solid " + clickedColour}, 0);
        outsideClick = false;
        lastClicked = $(this)
    })

    // event handler of hovering fetch and new plan
    $(".FetchMETAR, .NewButton, #FetchSB").hover(
        function() {
            $(this).animate({"background-color": "#232323"}, 125);
        }, function() {
            $(this).animate({"background-color": "#161616"}, 125);
        }
    )

    // BACKEND MAGIC
    $("#CI").dblclick(function() {
        const CI = Math.floor((Math.random() * 200) + 1);
        document.getElementById("CI").value = CI;
    })
    $("#Cargo").dblclick(function() {
        const Cargo = Math.floor((Math.random() * 50000) + 1);
        document.getElementById("Cargo").value = Cargo;
    })
    $("#Pax").dblclick(function() {
        const Pax = Math.floor((Math.random() * 125) + 76);
        document.getElementById("Pax").value = Pax;
    })

    $("#Date").dblclick(function() {
        var date = new Date();
        date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        document.getElementById("Date").value = date;
    })

    $(".FetchMETAR").click(function() {
        var Departure = document.getElementById("Departure").value
        var Arrival = document.getElementById("Arrival").value
        if (Departure.length >= 3 && Arrival.length >= 3) {
            $.get("https://avwx.rest/api/metar/" + Departure.toUpperCase() + "?options=&airport=true&reporting=true&format=json&onfail=cache&token=qpNMIdTcDq7TJlgxbfkZfJKPiyZ4ui_oDRIYxyMnLFc", {"Authorization" : "TOKEN qpNMIdTcDq7TJlgxbfkZfJKPiyZ4ui_oDRIYxyMnLFc"}).done(function(data) {
                document.getElementById("METARbox1").innerHTML = data["raw"]
            });
            $.get("https://avwx.rest/api/metar/" + Arrival.toUpperCase() + "?options=&airport=true&reporting=true&format=json&onfail=cache&token=qpNMIdTcDq7TJlgxbfkZfJKPiyZ4ui_oDRIYxyMnLFc", {"Authorization" : "TOKEN qpNMIdTcDq7TJlgxbfkZfJKPiyZ4ui_oDRIYxyMnLFc"}).done(function(data) {
                document.getElementById("METARbox2").innerHTML = data["raw"]
            });
        } else {
            if (Departure.length < 3) {
                $("#Departure").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            };
            if (Arrival.length < 3) {
                $("#Arrival").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            };
            outsideClick = false;
        }
    })

    $(".NewButton").click(function() {
        var current = document.getElementById("Departure").value;
        var toExit = false
        if (current.length < 3) {
            $("#Departure").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        current = document.getElementById("Arrival").value;
        if (current.length < 3) {
            $("#Arrival").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        current = document.getElementById("Date").value;
        if (current.length < 8) {
            $("#Date").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        current = document.getElementById("FlightNum").value;
        if (current.length < 4) {
            $("#FlightNum").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        current = document.getElementById("Cruise").value;
        if (current.length < 5) {
            $("#Cruise").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        current = document.getElementById("Equipment").value;
        if (current.length < 3) {
            $("#Equipment").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        current = document.getElementById("Cargo").value;
        if (current.length < 1) {
            $("#Cargo").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        current = document.getElementById("Fuel").value;
        if (current.length < 4) {
            $("#Fuel").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        current = document.getElementById("DepTime").value;
        if (current.length < 4) {
            $("#DepTime").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        current = document.getElementById("ArrTime").value;
        if (current.length < 4) {
            $("#ArrTime").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        current = document.getElementById("Route").value;
        if (current.length < 1) {
            $("#Route").stop().animate({"borderTopColor": "2px solid " + errorColour, "borderLeftColor": "2px solid " + errorColour, "borderRightColor": "2px solid " + errorColour, "borderBottomColor": "2px solid " + errorColour}, 125);
            toExit = true
        };
        outsideClick = false;
        if (toExit == true) {
            return;
        };
    })

    $("#FetchSB").click(function() {
        $.get("https://www.simbrief.com/api/xml.fetcher.php?username=InFInItyKiLL33").done(function(data) {
            // console.log(data); //used for testing only
            if (document.getElementById("Departure").value != data.getElementsByTagName("origin")[0].childNodes[0].nextSibling.innerHTML) {
                document.getElementById("Departure").value = data.getElementsByTagName("origin")[0].childNodes[0].nextSibling.innerHTML;
            }
            if (document.getElementById("Arrival").value != data.getElementsByTagName("destination")[0].childNodes[0].nextSibling.innerHTML) {
                document.getElementById("Arrival").value = data.getElementsByTagName("destination")[0].childNodes[0].nextSibling.innerHTML;
            }
            if (document.getElementById("Date").value.length == 0) {
                var date = new Date();
                date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                document.getElementById("Date").value = date;
            }
            if (document.getElementById("FlightNum").value != data.getElementsByTagName("general")[0].childNodes[2].nextSibling.innerHTML + data.getElementsByTagName("general")[0].childNodes[4].nextSibling.innerHTML) {
                document.getElementById("FlightNum").value = data.getElementsByTagName("general")[0].childNodes[2].nextSibling.innerHTML + data.getElementsByTagName("general")[0].childNodes[4].nextSibling.innerHTML;
            }
            if (document.getElementById("Cruise").value != data.getElementsByTagName("general")[0].childNodes[26].nextSibling.innerHTML) {
                document.getElementById("Cruise").value = data.getElementsByTagName("general")[0].childNodes[26].nextSibling.innerHTML;
            }
            if (document.getElementById("CI").value != data.getElementsByTagName("general")[0].childNodes[14].nextSibling.innerHTML.slice(2)) {
                document.getElementById("CI").value = data.getElementsByTagName("general")[0].childNodes[14].nextSibling.innerHTML.slice(2);
            }
            if (document.getElementById("Fuel").value != data.getElementsByTagName("fuel")[0].childNodes[18].nextSibling.innerHTML + "/" + String(parseInt(data.getElementsByTagName("fuel")[0].childNodes[4].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[6].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[8].nextSibling.innerHTML))) {
                document.getElementById("Fuel").value = data.getElementsByTagName("fuel")[0].childNodes[18].nextSibling.innerHTML + "/" + String(parseInt(data.getElementsByTagName("fuel")[0].childNodes[4].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[6].nextSibling.innerHTML) + parseInt(data.getElementsByTagName("fuel")[0].childNodes[8].nextSibling.innerHTML));
            }
            if (document.getElementById("Winds").value != data.getElementsByTagName("general")[0].childNodes[36].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[38].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[30].nextSibling.innerHTML) {
                document.getElementById("Winds").value = data.getElementsByTagName("general")[0].childNodes[36].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[38].nextSibling.innerHTML + "/" + data.getElementsByTagName("general")[0].childNodes[30].nextSibling.innerHTML;
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
            var toPurge = []
            var lastAltitude = String(document.getElementById("Cruise").value)
            lastAltitude = lastAltitude.slice(0, lastAltitude.length - 2)
            for (i = 0; i < Route.length; i++) {
                if (Route[i].indexOf("/F") != -1) {
                    if (i != 0 || i != Route.length - 1) {
                        if (Route[i - 1] == Route[i + 1] && parseInt(Route[i].slice(Route[i].indexOf("/F") + 2, Route[i].length)) == parseInt(lastAltitude)) {
                            if (toPurge.includes(i - 1) == false) {
                                toPurge.push(i - 1)
                            };
                            if (toPurge.includes(i) == false) {
                                toPurge.push(i)
                            };
                        } else {
                            lastAltitude = parseInt(Route[i].slice(Route[i].indexOf("/F") + 2, Route[i].length))
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
            };
            // console.log(data.getElementsByTagName("general")[0].childNodes[54].nextSibling.innerHTML); //used for testing only
        });
        lastClicked = NaN
    });
})