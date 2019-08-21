$(".survey-submit-button").on("click", function(event) {
    event.preventDefault();

    var newFriend = {
      name: $("#name").val().trim(),
      photo: $("#role").val().trim(),
      q1: $("#q1").val(),
      q2: $("#q2").val(),
      q3: $("#q3").val(),
      q4: $("#q4").val(),
      q5: $("#q5").val(),
      q6: $("#q6").val(),
      q7: $("#q7").val(),
    };

    $.post("/api/friendsArray", newFriend)
      .then(function(data) {
        console.log("adding friend: ", data);
      });
  });

  
