console.log("frontend.js served up hot");

$(document).ready(function() {

$.get("/api/friendsArray", function(data) {
console.log("doc rdy, sending GET request to api/friendsArray");
console.log(data);

data.forEach(e => {
    
    var newDiv = $("<div>").addClass("friend-div");

    var img = $("<img>").addClass("friend-photo");
        img.attr("src", e.photo);
    var name = $("<h4>").text(e.name);
    
    var innerDiv = $("<div>").addClass("inner-div");
    var scores = $("<h5>").text("Survey Scores:");

    var one =   $("<p>").text(e.q1);
    var two =   $("<p>").text(e.q2);
    var three = $("<p>").text(e.q3);
    var four =  $("<p>").text(e.q4);
    var five =  $("<p>").text(e.q5);
    var six =   $("<p>").text(e.q6);

    innerDiv.append(scores,one,two,three,four,five,six);
    newDiv.append(img,name,innerDiv);
    $(".friends-display").append(newDiv);
});
})

$(".survey-submit-button").on("click", function (event) {

    event.preventDefault();
    console.log("submit-button clicked");
    // console.log($("#name").val().trim());
    // console.log($("#photo").val().trim());
    // console.log($("#q1").val().trim());

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
            console.log("adding friend: ", data);
        });
});

})
