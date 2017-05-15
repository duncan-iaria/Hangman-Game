//################################
// HANG 'MON GAME
// by: duncan iaria
// questions?
// duncaniaria@gmail.com
//################################

//================================
// EVENTS
//================================
//set up global key listener
window.addEventListener( "keydown", function( e )
{
	hangMan.checkKeyInput( e );
});

//set the game views after page load (so it can get all the dom elements (div id's and such))
window.addEventListener( "load", function()
{
    //pass the views to the hangman game
    hangMan.setViews
    (
        document.querySelector( "#current-word-view" ),
        document.querySelector( "#guessed-letter-view" ),
        document.querySelector( "#poke-bank-view"),
        document.querySelector( "#feedback-view" )
    );
});

//================================
// GAME
//================================
//define hangman game object
var hangMan = 
{
    //game variables
    isEnabled: false,
    maxTurns: 10,
    currentTurn: 0,
    currentWord: "",
    currentPokemon: null,

    //views
    currentWordView: null,
    guessedLettersView: null,
    pokeBankView: null,
    feedbackView: null,

    //specific game data
    guessedLetters: [], //the incorrect letters you have guessed
    currentLetters: [], //the letters you need to guess
    correctLetters: [], //the correct letters you HAVE guessed


    //initialize the game (for starting and restarting)
    init: function()
    {
        //clear game data (mostly for resetting the game)
        this.guessedLetters.length = 0;
        this.currentLetters.length = 0;
        this.correctLetters.length = 0;
    	this.currentTurn = 0;

        //establish data
        //get a random pokemon from the data
        this.currentPokemon = data.pokedex[ this.getRandomInt( 0, data.pokedex.length ) ];

        //format the text so that it's all lowercase
        this.currentWord = this.currentPokemon.name.toLowerCase();

        //clear the current letters array
        this.currentLetters.length = 0;

        //populate the current letters array with the letters from our current word
        for( var i = 0; i < this.currentWord.length; ++i )
        {
            this.currentLetters.push( this.currentWord.charAt( i ) );
        }

        //resets the displays
        this.updateCurrentWordView();
        this.updateGuessedLettersView();
        this.updateFeedbackView();

        //THIS IS KEY - turn the game "on" so it can start processing input
        this.isEnabled = true;

        //report what has transpired
        //console.log( this.currentLetters );
        //console.log( this.currentPokemon );
        //console.log( "current word = " + this.currentWord );
        //console.log( this.currentWordView );
    },

    //check what button was pressed
    checkKeyInput: function( keyEvent )
    {
        //if the game is enabled, evaluate key presses
        if( this.isEnabled )
        {   
            //have we already guessed this number or is it even valid? evaluate if valid
            if( this.guessedLetters.indexOf( keyEvent.key ) >= 0 || keyEvent.key.length > 1 )
            {
                //already guessed this letter - or input not valid
                return;
            }
            else
            {   
                //evaluate
                var isCorrect = false;

                for( var i = this.currentLetters.length - 1; i >= 0; --i )
                {
                    if( keyEvent.key === this.currentLetters[i] )
                    {
                        //we have a match - add to the correct letters array in proper place
                        this.correctLetters[i] = keyEvent.key;

                        //notify that a match was found
                        isCorrect = true;

                        //report
                        //console.log( "correct letter array = " + this.correctLetters );
                    }
                }

                //if a match was found
                if( isCorrect )
                {
                    //update view
                    this.updateCurrentWordView();
                }
                else
                {
                    //match was NOT found
                    //add this key to the guessedLetters array
                    this.guessedLetters.push( keyEvent.key );

                    //iterate the turn (number of wrongs you can get)
                    this.currentTurn++;

                    //add the key to the text content (update the views(elements) on the page)
                    this.updateGuessedLettersView();
                    this.updateFeedbackView();

                    //report
                    //console.log( "wrong, adding key to the guessed letters view" );
                }
            }

            //console.log( keyEvent.key + " - " + this.currentTurn );

            //check if we've won or lost
            this.evaluteWinCondition();
        }
    },

    //====================
    // VIEWS
    //====================
    //setup the initial views
    setViews: function( tCurrentWordView, tGuessedLettersView, tPokebankView, tFeedbackView )
    {
        //hook up views (html elemements that need to update)
        this.currentWordView = tCurrentWordView;
        this.guessedLettersView = tGuessedLettersView;
        this.pokeBankView = tPokebankView;
        this.feedbackView = tFeedbackView;
    },

    //updates the current word display
    updateCurrentWordView: function()
    {
        //clear the word so it can be rebuilt
        var tempWord = "";

        //if the array element exists, then it's been guessed correctly
        //otherwise, it's an "unknown" letter
        for( var i = 0; i < this.currentLetters.length; i++ )
        {
            if( this.correctLetters[i] != undefined )
            {
                tempWord += " " + this.correctLetters[i] + " ";
            }
            else
            {
                tempWord += " _ ";
            }
        }

        //update the view with the rebuilt word
        this.currentWordView.innerHTML = `<h1> ${ tempWord } </h1>`;
    },

    //shows the user what letters have already been guessed
    updateGuessedLettersView: function()
    {
        //clear current guessed letters view
        this.guessedLettersView.textContent = "";

        //rebuild the view with the list of guessed letters
        for( var i = 0; i < this.guessedLetters.length; ++i )
        {
            this.guessedLettersView.textContent += " " + this.guessedLetters[i];
        }
    },

    //adds pokemon to your collection! ID is the id of the pokemon to add (the image name)
    updatePokeBankView: function( tIdToAdd )
    {
        //add the following HTML to the pokebank
        //tIdToAdd is the id of the pokemon (and the name of the corresponding gif)
        this.pokeBankView.innerHTML +=
        `<div class="poke-container">
            <div class="poke-ball">
                    <img src="assets/images/${tIdToAdd}.gif"/>
            </div>
        </div>`;
    },

    updateFeedbackView: function()
    {   
        //update with the corresponding image of your current turn
        this.feedbackView.src = `assets/images/pika${this.currentTurn}.png`;
    },

    //====================
    // RESOLUTION
    //====================
    //check if you've won or lost
    evaluteWinCondition: function()
    {
        var isWin = true;

        for( var i = this.currentLetters.length - 1; i >= 0; --i )
        {
            if( this.correctLetters[i] != this.currentLetters[i] )
            {
                //something doesn't match, so it's not a win
                isWin = false;
            }
        }

        //if we've won
        if( isWin )
        {
            setTimeout( hangMan.onWin.bind( this ), 200 );
        }
        else if( this.currentTurn >= 10 )
    	{
    		setTimeout( hangMan.onLose.bind( this ), 200 );
    	}
    },

    onWin: function()
    {
        //turn off inputs
        this.isEnabled = false;

        //build the events to be attatched to the modal button
        //this is an array so you can have multipule events if you want
        var rightButtonEvents = [ this.init.bind( this ) ];

        //open the model with the following parameters
        modal.openModal
        ( 
            "YOU WON!", 
            `You caught a ${this.currentPokemon.name}!`, 
            `assets/images/${this.currentPokemon.id}.gif`,
            rightButtonEvents,
            null,
            500
        );

        //update the pokebank after the modal has opened (don't like that the duration is a magic #)
        setTimeout( this.updatePokeBankView.bind( this, this.currentPokemon.id ), 500 );
    },

    onLose: function()
    {   
        //turn off inputs
        this.isEnabled = false;

        //build the events to be attatched to the modal button
        //using an array so there can be multiple if necessary
        var rightButtonEvents = [ this.init.bind( this ) ];

        //open the modal with the following parameters
        modal.openModal
        ( 
            "YOU LOST!", 
            `You did not catch ${this.currentPokemon.name}, ready to try again?`, 
            null,
            rightButtonEvents,
            null,
            1000
        );
    },

    //====================
    // UTILITIES
    //====================
    //for generating a random number between min(inclusive) and max(exclusive)
    getRandomInt: function ( min, max ) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor( Math.random() * ( max - min ) ) + min;
    }
};

