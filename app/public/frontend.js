console.log("frontend.js served up hot");

$(document).ready(function () {

    $.get("/api/friendsArray", function (data) {
        console.log("document ready, sending GET request to api/friendsArray");
        data.forEach(e => {

            var newDiv = $("<div>").addClass("friend-div");

            var img = $("<img>").addClass("friend-photo");
            img.attr("src", e.photo);
            var name = $("<h4>").text(e.name);

            var innerDiv = $("<div>").addClass("inner-div");
            var scores = $("<h5>").text("Survey Scores:");

            var one = $("<p>").text(e.q1);
            var two = $("<p>").text(e.q2);
            var three = $("<p>").text(e.q3);
            var four = $("<p>").text(e.q4);
            var five = $("<p>").text(e.q5);
            var six = $("<p>").text(e.q6);

            innerDiv.append(scores, one, two, three, four, five, six);
            newDiv.append(img, name, innerDiv);
            $(".friends-display").append(newDiv);
        });
    })

    $(".survey-submit-button").on("click", function (event) {
        event.preventDefault();

        var newDiv = $("<div>").addClass("friend-div");
        var img = $("<img>").addClass("friend-photo");
            img.attr("src", $("#photo").val().trim());


        newDiv.append(img);
        

        var confirm = $("<h1>").addClass("confirmation-message").text("Profile Created! Check your Match Now!");

        $(".confirmation-message-div").append(newDiv, confirm);
        var newFriend = {

            name: $("#name").val().trim(),
            photo: $("#photo").val().trim(),
            q1: parseInt($("#q1").val()),
            q2: parseInt($("#q2").val()),
            q3: parseInt($("#q3").val()),
            q4: parseInt($("#q4").val()),
            q5: parseInt($("#q5").val()),
            q6: parseInt($("#q6").val()),
        };
        console.log(newFriend);
        $.post("/api/friendsArray", newFriend)
            .then(function (data) {
                console.log("Adding new friend: ", data);
            });
    });
})

$(".reveal-button").on("mouseover", function () {
    console.log("clicked-reveal");
    $.get("/api/friendsArray", function (data) {
        var NF = data[data.length - 1];
        var bestMatch = 1;
        for (let i = 0; i < (data.length - 1); i++) {
            console.log("starting loop");
            var matchPoints = 0;
            var e = data[i];
            if (NF.q1 == e.q1) matchPoints++;
            if (NF.q2 == e.q2) matchPoints++;
            if (NF.q3 == e.q3) matchPoints++;

            if (NF.q4 == e.q4) matchPoints++;
            if (NF.q5 == e.q5) matchPoints++;
            if (NF.q6 == e.q6) matchPoints++;
            console.log("total matchPoints: " + matchPoints);
            e.matchPoints = matchPoints;
            console.log("setting e.matchPoints to: " + e.matchPoints);
            console.log(e);
            //  var newE = JSON.stringify(e);
            if (bestMatch === 1) {
                bestMatch = e;

                console.log("changed bestmatch to: " + JSON.stringify(bestMatch));
            }
            
            

            if (e.matchPoints > bestMatch.matchPoints) {
                    bestMatch = e;
                console.log("bestmatch after points update: " + JSON.stringify(bestMatch.name, bestMatch.matchPoints));
            }
        }
        display(NF, bestMatch);
    })
        
        display(NF, bestMatch);
        function display(NF, bestMatch) {
        console.log(NF, bestMatch);
        $(".match-display-area").empty();
        var firstProfile = $("<div>").addClass("friend-div");
        var nameOne = $("<h4>").text(NF.name);
        var imgOne = $("<img>").addClass("friend-photo");
        imgOne.attr("src", NF.photo);

        var secondProfile = $("<div>").addClass("friend-div");
        var nameTwo = $("<h4>").text(bestMatch.name);
        var imgTwo = $("<img>").addClass("friend-photo");
        imgTwo.attr("src", bestMatch.photo);


        var star = $("<img>").addClass("star").attr("src", "https://www.animatedimages.org/data/media/280/animated-star-image-0061.gif");
        firstProfile.append(imgOne, nameOne);
        secondProfile.append(imgTwo, nameTwo);
        $(".match-display-area").append(firstProfile,star, secondProfile);
    }

})