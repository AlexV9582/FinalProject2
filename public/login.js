$("#login").on("click", function(){
    event.preventDefault();
    var userInfo = {
        username: $("#userName").val(),
        password: $("#password").val()
    }
    $.post("/users", userInfo, function(data) {
        if (data != "User not found") {
            window.location = "./addSongs/" + data;
        } else {
            alert(data)
        }
    })
    $("#userName").val("");
    $("#password").val("")
});

$("#newUser").on("click", function() {
    event.preventDefault();
    var userInfo = {
        username: $("#newUserName").val(),
        password: $("#newPassword").val()
    }
    $.post("/newUser", userInfo, function(data) {
        console.log(data);
    })
    $("#newUserName").val("");
    $("#newPassword").val("");
})