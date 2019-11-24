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
    return (false == (inputValue.length == 4 && parseInt(lastclickedValue.slice(0, 1)) <= 2 && parseInt(lastclickedValue.slice(2, 3)) <= 5)); //returns false if all conditions are met. return true if any condition fails
};

function timeCalculator(lastClickedItem, otherInput, lastClickedID, otherID) {
    if (checkTimeInputValidity(document.getElementById(lastClickedID).value, lastClickedItem.value) == true) { //check last edited time value
        redBorder(lastClicked);
    } else if (checkTimeInputValidity(document.getElementById(otherID).value, otherInput.value) == false) { //check the other time value and do nothing if the other is wrong in case it isn't filled
        var hoursFlown = parseInt(String(document.getElementById("AArrTime").value).substring(2, 0)) - parseInt(String(document.getElementById("ADepTime").value).substring(2, 0));
        var minutesFlown = parseInt(String(document.getElementById("AArrTime").value).substring(4, 2)) - parseInt(String(document.getElementById("ADepTime").value).substring(4, 2));
        if (minutesFlown < 0) { //checking in case the hours are different by one but minutes are different by a negative value (e.g. D: 0159Z, A: 0201Z)
            hoursFlown--;
            minutesFlown += 60;
        };
        if (parseInt(document.getElementById("ADepTime").value) > parseInt(document.getElementById("AArrTime").value)) { //checks if it goes beyond 12am (i.e. D: 2359Z, A: 0001Z)
            hoursFlown = 24 - Math.abs(hoursFlown);
        };
        document.getElementById("FT").value = hoursFlown + "H " + minutesFlown + "M"; //sets text
        //css changes
        setOverlayUp($("#FT")); //animates the placeholder
        redToNormalBorder($("#ADepTime")); //make it normal border if it was red
        redToNormalBorder($("#AArrTime"));
        $("#FT").css("cursor", "text"); //changes cursor to highlightable cursor
    };
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
            if (lastClicked[0].value.length != 0) { // make sure there's at least something (to check 0 length)
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
                    document.getElementById("NewButtonID").innerHTML = "<strong>Save Plan</strong>";
                } else {
                    document.getElementById("NewButtonID").innerHTML = "<strong>Save Plan</strong>";
                };
            };
        };
        outsideClick = true;
    });
    
    // event handler of clicking textboxes in new plan
    function textboxClick(thisEventHandler, outsideClickBoolean) {
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

    // event handler of hovering fetch and new plan
    $(".FetchMETAR, #FetchSB, .restorePlan, .cancelPlan").hover(
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

    $(".SavePlan").hover(
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

    // Save Plan Clicked
    $(".SavePlan").click(function() {
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

    // event handler of clicking the cancel button
    $("#cancelPlanID").click(function() {
        window.location = "plans.html";
    });
});