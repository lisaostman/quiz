
 
var counterstart = 80;
var highScore = localStorage.getItem("highscore");
var questionArr = [];
var counter = 0;

$(document).ready(function () 
{
    $(".homebtn").on("click", function () 
    {
        location.reload();
    } )

    $(".startquiz").on("click", function () 
    {
        if (this.value === "htmlBtn") {
            questionArr = htmlQuestions;
        }
        else if (this.value === "jsBtn") {
            questionArr = javaQuestions;
        }
        else {
            questionArr = cssQuestions;
        }

        $(".fullbody").html("");
        var container = $("<div>");
        container.addClass("container-fluid");
        container.css("background-color", "white");
        var row1 = $("<div>");
        row1.addClass("row mt-4");
        container.append(row1);
        var questionTitle = $("<div>");
        questionTitle.addClass("col-md-10 questionTitle ml-4");

        row1.append(questionTitle);
        var row2 = $("<div>");
        row2.addClass("row mt-4");
        container.append(row2);
        var options = $("<div>");
        options.addClass("col-md-8 ml-4 optiontest");
        var list = $("<ul>");
        list.addClass("uniqueList");
        var correctbox = $("<div>");
        correctbox.addClass("correctbox");
        options.append(list);
        row2.append(options);
        $(".fullbody").append(container);
        var questionNumber = 0;
        
        /////////
        function timer() 
        {
             counter = counterstart;
       

            setInterval(function () 
            {
                counter--;
                if (counter >= 0) 
                {
                    span = document.getElementById("span");
                    span.innerHTML = counter;
                }
                // Display 'counter' wherever you want to display it.
                if (counter === 0) 
                {
                    //    alert('this is where it happens');
                    clearInterval(counter);
                }

            }, 1000);
        }

        timer();



     
        function setUpQuestion() 
        {
            var questions = questionArr[questionNumber];
            questionTitle.text(questions.title);
            $(".correctbox").empty();
            $(".uniqueList").empty();
        
            for (i = 0; i < questions.choices.length; i++) 
            {

                var listElement = $("<li>");
                var listElementButton = $("<button>");
                listElementButton.addClass("btn btn-info mb-2 buttonchoice");
                listElementButton.text(questions.choices[i]);
                listElementButton.attr("value", questions.choices[i]);
                listElement.append(listElementButton);
                $(".uniqueList").append(listElement);
                $(".uniqueList").append(correctbox);

            }
    
        




            

            $(".buttonchoice").on("click", function () 
            {

                if (this.value === questions.answer) 
                {
                    $(".correctbox").empty();
                    var correct = $("<div>");
                    correct.html("<hr>" + "Correct!");
                    $(".correctbox").append(correct);
                    var nextQuestion = $("<button>");
                    nextQuestion.text("Next Question");
                    nextQuestion.addClass("btn btn-primary button-next");
                    $(".correctbox").append(nextQuestion);


                    $(".button-next").on("click", function () 
                    {
                        questionNumber++;
                        
                        if (questionNumber < questionArr.length) 
                        {
                            
                            setUpQuestion(questionNumber);
                            
                        } else 
                        {
                            $(".correctbox").empty();
                            $(".uniqueList").empty();
                            questionTitle.empty();
                            var header = $("<div>").html("<h1>Hey! Look at you!</h1>");
                            var divvv = $("<div>");
                            $(".uniqueList").append(header);
                            $(".uniqueList").append(divvv);

                            if (counter > highScore) 
                            {
                                
                                highScore = counter;
                                divvv.text("Congratulations! You beat your high score, scoring " + highScore + ". Enter your intials to save this high score!");
                                var initialForm = $("<form>");
                                
                                var initialSubmit = $("<button>");
                                 initialSubmit.addClass("highscoreBtn btn-info");
                                 initialSubmit.text("Submit");
                                 
                                initialForm.append('<input type="text" name="initial">');
                                initialForm.append(initialSubmit);
                                divvv.append(initialForm);

                                    $(".highscoreBtn").on("click", function(event) 
                                    {
                                        var valueOfName = $("input").val();
                                        event.preventDefault();
                                        $(".fullbody").html("");
                                        localStorage.setItem("highscore", highScore);
                                       
                                        localStorage.setItem("initialName", valueOfName);
                                       
                                        var divvv = $("<div>");
                                        
                                        divvv.text("The highest highscore on record is: " + localStorage.getItem("highscore") + " by " + localStorage.getItem("initialName"));
                                        
                                        $(".fullbody").append(divvv);
                                     
                                        

                                    })
                                
                            }
                            else 
                            {
                                
                                        divvv.text("Sorry, you kind of sucked! Better luck next time and maybe you can save your high score. The highest highscore on record is: " + localStorage.getItem("highscore") + " by " + localStorage.getItem("initialName"));
                                        var clear = $("<button>");
                                        clear.addClass("clearButton btn-info");
                                        clear.text("Clear High Scores");
                                        $(".fullbody").append(divvv);
                                        $(".fullbody").append(clear);

                                        $(".clearButton").on("click", function() 
                                        {
                                            localStorage.removeItem("highscore");
                                            localStorage.removeItem("initialName");
                                            localStorage.clear();
                                            window.localStorage.clear();
                                            
                                            alert("highscores cleared!")
                                        }
                                        ) 
                                     
                            }

                            
                        }
    


                    })
                   
                }

                else 
                {
                    $(".correctbox").empty();
                    var incorrect = $("<div>");
                    incorrect.html("<hr>" + "Incorrect!");
                    $(".correctbox").append(incorrect);
                    counter-= 10;
                }
        
            })
        }


        setUpQuestion();

        


    })
})






$("#cssBtn").on("click", function () {
    window.location.href = "quizpage.html";
})


$("#jsBtn").on("click", function () {
    window.location.href = "quizpage.html";
})




$(".highscoreBtn").on("click", function () {
    $(".highscoreShowing").text("Highscore: " + highScore);
})


    ;

// window.location.href="quizpage.html";
        // var questionTitle = $("<h1>");
        // questionTitle.text("string.title");
        // $("#questionHeading").append(questionTitle);


        // // for (i = 0; i<htmlQuestions.length;i++) {
        // //     var string= htmlQuestions[i];

        // // }

