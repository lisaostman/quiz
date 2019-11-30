
 
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

    $(".highscoreBtn").on("click", function () 
    {   var newcontainer = $("<div>");
         newcontainer.addClass("container");
        var newrow = $("<div>");
        newrow.addClass("row");
        var col = $("<div>");
        col.addClass("col-md-4");
        var highScoreResultReturned = $("<div>");
        highScoreResultReturned.addClass("col-md-4");
        newrow.append(col);
        newrow.append(highScoreResultReturned);
        newcontainer.append(newrow);
        highScoreResultReturned.text("The highest score on record was " + highScore + " by " + localStorage.getItem("initialName"));
        $(".fullbody").append(newcontainer);
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
                if (counter < 0) 
                {
                    //    alert('this is where it happens');
                    clearInterval(counter);
                    $(".fullbody").html("");
                                        
                                        var newcontainer = $("<div>");
                                        newcontainer.addClass("container mt-4");
                                        var newrow2= $("<div>");
                                        newrow2.addClass("row");
                                        var col2 = $("<div>");
                                        col2.addClass("col-md-4");
                                        var col3 = $("<div>");
                                        col3.addClass("col-md-4");
                                        var heading= $("<h2>");
                                        heading.text("Times Up! ");
                                        col3.append(heading);
                                        newrow2.append(col2);
                                        newrow2.append(col3);
                                        
                                        newcontainer.append(newrow2);

                                        var newrow = $("<div>");
                                        newrow.addClass("row");
                                        var col = $("<div>");
                                        col.addClass("col-md-4");
                                        var resultboxDiv = $("<div>");
                                        resultboxDiv.addClass("col-md-4");
                                        newrow.append(col);
                                        newrow.append(resultboxDiv);
                                        newcontainer.append(newrow);
                                        resultboxDiv.text("The highest score on record was " + localStorage.getItem("highscore") + " by " + localStorage.getItem("initialName"));
                                        
                                        var clear = $("<button>");
                                        clear.addClass("clearButton btn-info");
                                        clear.text("Clear High Scores");
                                        newcontainer.append(clear);
                                        $(".fullbody").append(newcontainer);

                                        $(".clearButton").on("click", function() 
                                        {
                                            localStorage.removeItem("highscore");
                                            localStorage.removeItem("initialName");
                                            localStorage.clear();
                                            window.localStorage.clear();
                                            
                                            alert("Highscores cleared!")
                                        }
                                        ) 

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
                                       
                                        var newcontainer = $("<div>");
                                        newcontainer.addClass("container mt-4");
                                        var newrow2= $("<div>");
                                        newrow2.addClass("row");
                                        var col2 = $("<div>");
                                        col2.addClass("col-md-4");
                                        var col3 = $("<div>");
                                        col3.addClass("col-md-4");
                                        var heading= $("<h2>");
                                        heading.text("Highest Score Ever");
                                        col3.append(heading);
                                        newrow2.append(col2);
                                        newrow2.append(col3);
                                        
                                        newcontainer.append(newrow2);

                                        var newrow = $("<div>");
                                        newrow.addClass("row");
                                        var col = $("<div>");
                                        col.addClass("col-md-4");
                                        var resultboxDiv = $("<div>");
                                        resultboxDiv.addClass("col-md-4");
                                        newrow.append(col);
                                        newrow.append(resultboxDiv);
                                        newcontainer.append(newrow);
                                        resultboxDiv.text("The highest score on record was " + localStorage.getItem("highscore") + " by " + localStorage.getItem("initialName"));
                                        
                                        var clear = $("<button>");
                                        clear.addClass("clearButton btn-info");
                                        clear.text("Clear High Scores");
                                        newcontainer.append(clear);
                                        $(".fullbody").append(newcontainer);

                                        $(".clearButton").on("click", function() 
                                        {
                                            localStorage.removeItem("highscore");
                                            localStorage.removeItem("initialName");
                                            localStorage.clear();
                                            window.localStorage.clear();
                                            
                                            alert("highscores cleared!")
                                        }
                                        ) 

                                        
                                
                                     
                                        

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



  