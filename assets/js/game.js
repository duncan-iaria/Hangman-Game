//================================
// hangman game by duncan iaria
//================================

//set up global key listener
window.addEventListener( "keydown", function( e )
{
	hangMan.checkKeyInput( e );
});

//start game after page load
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

//define hangman game object
var hangMan = 
{
    //game variables
    isEnabled: false,
    maxTurns: 12,
    currentTurn: 0,
    currentWord: "",

    //views
    currentWordView: null,
    guessedLettersView: null,

    //data
    possibleWords: ["one", "two", "three"],
    guessedLetters: [],
    currentLetters: [],


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
    },

    //check what button was pressed
    checkKeyInput: function( keyEvent )
    {
        //if the game is enabled, evaluate key presses
        if( this.isEnabled )
        {
            this.currentTurn--;
            console.log( keyEvent.key + " - " + this.currentTurn );

            this.evaluteWinCondition();
        }
    },

    //check if you've won or lost
    evaluteWinCondition: function()
    {
    	if( this.currentTurn <= 0 )
    	{
    		alert( "you lose" );
    	}
    },

    getRandomInt: function ( min, max ) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor( Math.random() * ( max - min ) ) + min;
    }
};

