$(document).ready(function () {            //targets submit button, function sends user_input to the make_guess function
    $("#submit").click(function () {
        make_guess();
    });
    amtOfTurns(0);
    $("#image_container").hide();
    $("#reset").hide();
});

var the_number = null;
var guesses = 4;

var amtOfTurns = function (turns) {
    guesses -= turns;
    if (guesses === 0) {
        $('#response_div').text("Out of Turns! Game Over");
        $("#reset").show();
        $('.enterGuess').hide();
        $('#remainingGuesses').hide();
    }
    else {
        $('#guessNum').text(guesses);
    }
};

function pick_number() {
    var random_number = Math.floor(Math.random() * 10 + 1); //Math.Random gives random # from 0 - .9999[...] Math.floor gives whole number, *10 + 1 multiplies whole number by 10 and adds 1 (in case of zero).
    return random_number;
}

function make_guess() {                 //compares user input to the random number
    var guess = parseInt($('#guess_input').val());
    if (guess > 10 || guess < 1) {
        $('#response_div').text("You did not enter a number between 1-10. Please try again.");
        amtOfTurns(1);
    }
    else if (guess > the_number) {
        $('#response_div').text("The number you've guessed is too high");
        amtOfTurns(1);
    }
    else if (guess < the_number) {
        $('#response_div').text("The number you've guessed is too low");
        amtOfTurns(1);
    }
    else if (guess === the_number) {
        $('#response_div').text("You've guessed the correct number!");
        getImg();
        $('.enterGuess').hide();
        $('#remainingGuesses').hide();
        $("#image_container").show();
        $("#reset").show();
    }
    else {
        $('#response_div').text("You did not enter a number between 1-10. Please try again.");
        amtOfTurns(1);
    }
    document.getElementById("guess_input").value = "";
}

the_number = pick_number();

var getImg = function () {
    $.ajax({
        dataType: 'json',
        url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC',
        success: function (result) {
            var randoImg = result.data.image_url;
            var imgStart = "<img src='";
            var imgStop = "'>";
            document.getElementById("randomImg").innerHTML = imgStart + randoImg + imgStop;
        }
    });

};
