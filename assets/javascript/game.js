class songObject
{
    constructor(var1,var2)
    {
        this.answer = var1;
        this.embedCode = var2;
    }

    assign(songObject)
    {
        this.answer = songObject.answer;
        this.embedCode = songObject.embedCode;
    }
}

var wins = 0;
var triesLeft = 15;
var correctAnswer = new songObject("","");
var songArray = [];
var letterArray = [];
var guessArray = [];
var winCondition = 0;
var correctGuesses = 0;


//setting up the array
songArray.push(new songObject("the righteous one","5drYpn6xtaI4LavbQXevjX"));
songArray.push(new songObject("bellbottoms","1ImAVjs9AXcxGP0fbTsbWf"));
songArray.push(new songObject("them shoes","4ELXC8bDxfXOY6cwNEJIEl"));
songArray.push(new songObject("magnets","2wf6TozoLQ1uS2FI7846PA"));
songArray.push(new songObject("shut em up","2RcKI41icyv7naLhgPOrfW"));
songArray.push(new songObject("we did it right","04c3fiXs0sMf7jFfoX2pc6"));
songArray.push(new songObject("have love will travel","2uXkW8uJcOIhlbUatEPLPs"));
songArray.push(new songObject("light it up","0TQ1FvC8TJ09iibSfwRP81"));
songArray.push(new songObject("dance off","7pDxNYVQLKzrbkCe8OCag3"));
songArray.push(new songObject("i trusted u","38ieFm5YofnBc2HAUHUxjm"));

function resetGame()
{
    var songNumber = Math.floor(Math.random() * songArray.length);
    triesLeft = songArray[songNumber].answer.length + 5;   
    correctAnswer.assign(songArray[songNumber]);
    letterArray = [];
    guessArray[correctAnswer.length];
    winCondition = correctAnswer.answer.length;
    correctGuesses = 0;

    for(var i = 0;i < guessArray.length;i++)
    {
        guessArray[i] = "_";
    }

    window.onload = function()
    {
        var guitarGuy = document.getElementById("airGuitar");
        guitarGuy.style.display = "block";
    
        var spotify = document.getElementById("musicPlayer");
        spotify.style.display = "none";
    }

    //give the user a free correct guess for all whitespace
    for(var i = 0;i < correctAnswer.answer.length;i++)
    {
        if(correctAnswer.answer[i] == ' ')
        {
            correctGuesses += 1;
        }
    }

}

resetGame();

function isValid(char)
{
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(char);
}

document.onkeyup = function(event)
{
    //we don't have any more tries and we lose.
    if(triesLeft <= 0)
    {
        resetGame();
    }

    var correctIndexes = [];
    console.log("correct guesses: " + correctGuesses);
    var char = event.key;
    //if we are a string


    if(typeof char === "string" && isValid(char))
    {
        console.log("log!")
        //first see if we've already guessed this character
        for(var i = 0;i < letterArray.length;i++)
        {
            console.log("letter array has stored: " + letterArray[i]);
            //if we've already guess this character then return otherwise add it to the list of guesses
             if(letterArray[i] === char)
             {
                 console.log("we've already guessed the letter: " + char);
                 return;
             }
             else
             {
                 console.log("pushing the char: " + char);
                 letterArray.push(char);
                 break;
             }
        }

        //first time answering condition. probably could have done this a better way....
        if(letterArray.length == 0)
        {
            console.log("pushing the first char")
            letterArray.push(char);
        }
        
        console.log(char);
        //going through the correct answer
        for(var i = 0;i < correctAnswer.answer.length;i++)
        {
            if(correctAnswer.answer[i] == char)
            {
                //if we got a correct guess then push that into our list of correct indexes
                correctIndexes.push(i);
                console.log("correct!");       
            }
        }
        //if we didn't get any correct answers reduce the number of tries left by one.
        if(correctIndexes.length == 0)
        {
            triesLeft -= 1;
            var guessesLeftElement = document.getElementById("guesses-remaining");
            guessesLeftElement.textContent = triesLeft;
            console.log("tries Left: " + triesLeft);
        }
        else
        {
            //if we did then add the character to all instances of the correct indexes
            for(var i = 0;i < correctIndexes.length;i++)
            {
                guessArray[correctIndexes[i]] = char;
                correctGuesses += 1;
            }
            
            console.log("guess array" + guessArray);
            console.log("winCondition" + winCondition);
            console.log("correctGuesses" + correctGuesses);
        }

        //checking for a win condition
        if(correctGuesses === winCondition)
        {
            console.log("we've won!");
            //we've won!
            var guitarGuy = document.getElementById("airGuitar");
            guitarGuy.style.display = "none";
        
            var spotify = document.getElementById("musicPlayer");
            spotify.src = "https://open.spotify.com/embed/track/" + correctAnswer.embedCode;
            spotify.style.display = "block";

            wins+= 1;

            var winElement = document.getElementById("wins");
            winElement.textContent = wins;





            
        }

    }
}