//################################
// hangman game by duncan iaria
//################################
//================================
// EVENTS
//================================
//set up global key listener
window.addEventListener( "keydown", function( e )
{
	hangMan.checkKeyInput( e );
});

//start game after page load (so it can get all the dom elements (div id's and such))
window.addEventListener( "load", function()
{
    console.log( "document loaded" );
    //pass the views to the hangman game
    hangMan.setViews
    (
        document.querySelector( "#current-word-view" ),
        document.querySelector( "#guessed-letter-view" ),
        document.querySelector( "#poke-bank-view"),
        document.querySelector( "#feedback-view" )
    );

    //start hangman
    //hangMan.init();
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
    guessedLetters: [],
    currentLetters: [], //the letters you need to guess
    correctLetters: [], //the correct letters you HAVE guessed


    //initialize the game
    init: function()
    {
        //clear game data (mostly for resetting the game)
        this.guessedLetters.length = 0;
        this.currentLetters.length = 0;
        this.correctLetters.length = 0;

        //establish data
    	this.currentTurn = 0;
        this.currentPokemon = data.pokedex[ this.getRandomInt( 0, data.pokedex.length ) ];
        this.currentWord = this.currentPokemon.name.toLowerCase();
        //console.log( data.pokedex[ this.getRandomInt( 0, data.pokedex.length ) ] );

        //console.log( "current word = " + this.currentWord );
        //console.log( this.currentWordView );

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

        //THIS IS KEY
        this.isEnabled = true;
        //console.log( this.currentLetters );
    },

    //check what button was pressed
    checkKeyInput: function( keyEvent )
    {
        //if the game is enabled, evaluate key presses
        if( this.isEnabled )
        {
            //console.log( this.guessedLetters.indexOf( keyEvent.key ) );

            if( this.guessedLetters.indexOf( keyEvent.key ) >= 0 )
            {
                //already guessed this letter
                return;
            }
            else if( keyEvent.key.length > 1 )
            {   
                //a character key was pressed (like cntrl or something)
                return;
            }
            else
            {
                var isCorrect = false;

                for( var i = this.currentLetters.length - 1; i >= 0; --i )
                {
                    if( keyEvent.key === this.currentLetters[i] )
                    {
                        //we have a match - add to the correct letters array in proper place
                        this.correctLetters[i] = keyEvent.key;

                         console.log( "correct letter array = " + this.correctLetters );

                        //notify that a match was found
                        isCorrect = true;
                    }
                }

                //if a match was NOT found
                if( isCorrect )
                {
                    //update view
                    this.updateCurrentWordView();
                }
                else
                {
                    console.log( "wrong, adding key to the guessed letters view" );
                    //add this key to the guessedLetters array
                    this.guessedLetters.push( keyEvent.key );

                    //iterate this - remain to mssed?
                    this.currentTurn++;

                    //add the key to the text content
                    this.updateGuessedLettersView();
                    this.updateFeedbackView();
                }
            }


            console.log( keyEvent.key + " - " + this.currentTurn );

            this.evaluteWinCondition();
        }
    },

    //====================
    // VIEWS
    //====================
    //setup the initial views
    setViews: function( tCurrentWordView, tGuessedLettersView, tPokebankView, tFeedbackView )
    {
        //hook up views
        this.currentWordView = tCurrentWordView;
        this.guessedLettersView = tGuessedLettersView;
        this.pokeBankView = tPokebankView;
        this.feedbackView = tFeedbackView;
    },

    //updates the current word display
    updateCurrentWordView: function()
    {
        var tempWord = "";

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

        this.currentWordView.innerHTML = `<h1> ${ tempWord } </h1>`;
    },

    //shows the user what letters have already been guessed
    updateGuessedLettersView: function()
    {
        //clear current guessed letters view
        this.guessedLettersView.textContent = "";

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
        //this.updatePokeBankView( this.currentPokemon.id );

        this.isEnabled = false;

        var rightButtonEvents = [ this.init.bind( this ) ];

        modal.openModal
        ( 
            "YOU WON!", 
            `You caught a ${this.currentPokemon.name}!`, 
            `assets/images/${this.currentPokemon.id}.gif`,
            rightButtonEvents,
            null,
            500
        );

        setTimeout( this.updatePokeBankView.bind( this, this.currentPokemon.id), 500 );
    },

    onLose: function()
    {
        this.isEnabled = false;

        var rightButtonEvents = [ this.init.bind( this ) ];

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
    getRandomInt: function ( min, max ) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor( Math.random() * ( max - min ) ) + min;
    }
};

