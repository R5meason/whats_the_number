$(document).ready(function () {            //targets submit button, function sends user_input to the make_guess function
    $("#submit").click(function () {
        make_guess();
    });
    amtOfTurns(0);
    $("#prize_container").hide();
    $("#reset").hide();
});

var the_number = null;
var guesses = 4;
the_number = pick_number();

var amtOfTurns = function (turns) {
    guesses -= turns;
    if (guesses === 0) {
        $('#response_div').text("Out of Turns! Game Over");
        $('#game_input').hide("fast");
        $("#reset").show();
        $('.enterGuess').hide();
        $('#remainingGuesses').hide();
        $('#info').hide();
    }
    else {
        $('#guessNum').text(guesses);
    }
};

function pick_number() {
    var random_number = Math.floor(Math.random() * 10 + 1); //Math.Random gives random # from 0 - .9999[...] Math.floor gives whole number, *10 + 1 multiplies whole number by 10 and adds 1 (in case of zero).
    console.log(random_number);
    return random_number;
}

function make_guess() {                 //compares user input to the random number
    var guess = parseInt($('#guess_input').val());
    if (guess > 10 || guess < 1) {
        $('#response_div').text("You did not enter a number between 1-10. Please try again.");
        $('#guess_input').effect("shake");
        amtOfTurns(1);
    }
    else if (guess > the_number) {
        $('#response_div').text("The number you've guessed is too high");
        $('#guess_input').effect("shake");
        amtOfTurns(1);
    }
    else if (guess < the_number) {
        $('#response_div').text("The number you've guessed is too low");
        $('#guess_input').effect("shake");
        amtOfTurns(1);
    }
    else if (guess === the_number) {
        $('#response_div').hide();

        $('.enterGuess').hide();
        $('#info').hide();
        $('#remainingGuesses').hide();
        $("#prize_container").show();
        $("#reset").show();
        if (the_number % 2 === 0){
            getImg();
        }
        else {
            getQuote();
            $("#giphyLogo").hide();
        }

    }
    else {
        $('#response_div').text("You did not enter a number between 1-10. Please try again.");
        $('#guess_input').effect("shake");
        amtOfTurns(1);
    }
    document.getElementById("guess_input").value = "";
}



var getImg = function () {
    $.ajax({
        dataType: 'json',
        url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC',
        success: function (result) {
            var randoImg = result.data.fixed_height_downsampled_url;
            var imgStart = "<img src='";
            var imgStop = "'>";
            document.getElementById("randomPrize").innerHTML = imgStart + randoImg + imgStop;
        }
    });
};



var getQuote = function () {
    var quoteContainer;

    $.ajax({
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
        datatype: 'json',
        success: function(data) {
            quoteContainer = JSON.parse(data);
            var quote = "<br>"+"\""+quoteContainer.quote+"\""+'<br><span id=\"aaa\"> -'+quoteContainer.author+'</span>';
            document.getElementById("randomPrize").innerHTML = quote;
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "035vi91FxRmshxP9HdyDipEnKGr5p15ixpjjsn1IF2377M87v7"); // Enter here your Mashape key
        }
    });
};

