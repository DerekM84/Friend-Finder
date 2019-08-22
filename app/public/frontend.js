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
     
        var confirm = $("<h1>").addClass("confirmation-message").text("Profile Created! Check your Match Now!");

        $(".confirmation-message-div").append(confirm);
        var newFriend = {

            name: $("#name").val().trim(),
            photo: $("#photo").val().trim(),
            q1: $("#q1").val(),
            q2: $("#q2").val(),
            q3: $("#q3").val(),
            q4: $("#q4").val(),
            q5: $("#q5").val(),
            q6: $("#q6").val(),
            q7: $("#q7").val(),
        };
        console.log(newFriend);
        $.post("/api/friendsArray", newFriend)
            .then(function (data) {
                console.log("Adding new friend: ", data);
            });
    });
})

$(".reveal-button").on("click", function () {
    var bestMatch = [" "];

    $.get("/api/friendsArray", function (data) {
        var friends = JSON.stringify(data);
        var newestFriend = JSON.stringify(data[data.length - 1]);
        var NF = newestFriend;
        for (let i = 0; i < friends.length - 1; i++) {
            var matchPoints = 0;
            const e = friends[i];
            if (NF.q1 === e.q1) matchPoints++;
            if (NF.q2 === e.q2) matchPoints++;
            if (NF.q3 === e.q3) matchPoints++;
            if (NF.q4 === e.q4) matchPoints++;
            if (NF.q5 === e.q5) matchPoints++;
            if (NF.q6 === e.q6) matchPoints++;
            e.matchPoints = matchPoints;
            if (e.matchPoints > bestMatch[0].matchPoints) {
                bestMatch.push(e);
                bestMatch.splice(0, 1);
                console.log(bestMatch);
            }
        }
        display(NF, bestMatch);
    })
    function display(NF, bestMatch) {

        $(".match-display-area").empty();
        var firstProfile = $("<div>").addClass("friend-div");
        var nameOne = $("<h4>").text(NF.name);
        var imgOne = $("<img>").addClass("friend-photo");
            imgOne.attr("src", NF.photo);

        var secondProfile = $("<div>").addClass("friend-div");
        var nameTwo= $("<h4>").text(bestMatch.name);
        var imgTwo = $("<img>").addClass("friend-photo");
            imgTwo.attr("src", bestMatch.photo);

        firstProfile.append(imgOne, nameOne);
        secondProfile.append(imgTwo, nameTwo);
        $(".match-display-area").append(firstProfile, star, secondProfile);
    }

})