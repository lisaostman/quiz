var highScore = null;

$( document ).ready(function() {

    $("#htmlBtn").on("click", function() {
        window.location.href="quizpage.html";
    })
    $("#cssBtn").on("click", function() {
        window.location.href="quizpage.html";
    })
    $("#jsBtn").on("click", function() {
        window.location.href="quizpage.html";
    })




    $(".highscoreBtn").on("click", function() {
        $(".highscoreShowing").text("Highscore: " + highScore);
    })


});


