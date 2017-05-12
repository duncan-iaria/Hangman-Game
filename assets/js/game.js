//################################
// hangman game by duncan iaria
//################################
console.log( pokedex[ 4 ] );
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
    //init hangman game with starting values and pass in views
    hangMan.init
    (
        document.querySelector( "#current-word-view" ),
        document.querySelector( "#guessed-letter-view" )
    );
});

//================================
// GAME
//================================
//define hangman game object
var hangMan = 
{
    //game variables
    isEnabled: true,
    maxTurns: 12,
    currentTurn: 0,
    currentWord: "",

    //views
    currentWordView: null,
    guessedLettersView: null,

    //data
    possibleWords: ["one", "two", "three"],
    guessedLetters: [],
    currentLetters: [], //the letters you need to guess
    correctLetters: [], //the correct letters you HAVE guessed


    //initialize the game
    init: function( tCurrentWordView, tGuessedLettersView )
    {
        //establish data
    	this.currentTurn = this.maxTurns;
        this.currentWord = this.possibleWords[ this.getRandomInt( 0, this.possibleWords.length ) ];

        //hook up views
        this.currentWordView = tCurrentWordView;
        this.guessedLettersView = tGuessedLettersView;

        console.log( "current word = " + this.currentWord );
        console.log( this.currentWordView );

        //clear the current letters array
        this.currentLetters.length = 0;

        //populate the current letters array with the letters from our current word
        for( var i = 0; i < this.currentWord.length; ++i )
        {
            this.currentLetters.push( this.currentWord.charAt( i ) );
        }

        console.log( this.currentLetters );
    },

    //check what button was pressed
    checkKeyInput: function( keyEvent )
    {
        //if the game is enabled, evaluate key presses
        if( this.isEnabled )
        {
            console.log( this.guessedLetters.indexOf( keyEvent.key ) );

            if( this.guessedLetters.indexOf( keyEvent.key ) >= 0 )
            {
                //already guessed this letter
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
                    console.log("wrong, adding key to the guessed letters view")
                    //add this key to the guessedLetters array
                    this.guessedLetters.push( keyEvent.key );

                    //add the key to the text contetn
                    this.guessedLettersView.textContent += ( " " + keyEvent.key );
                }
            }

            this.currentTurn--;

            console.log( keyEvent.key + " - " + this.currentTurn );

            this.evaluteWinCondition();
        }
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

        this.currentWordView.innerHTML = `<h1>${tempWord}</h1>`;
    },

    //check if you've won or lost
    evaluteWinCondition: function()
    {
    	if( this.currentTurn <= 0 )
    	{
    		alert( "you lose" );
    	}
    },

    //UTILITY
    getRandomInt: function ( min, max ) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor( Math.random() * ( max - min ) ) + min;
    }
};

