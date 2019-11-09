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
    $(".Fetch, .NewButton").hover(
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

    $(".Fetch").click(function() {
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
})