//================================
// hangman game by duncan iaria
//================================

//set up global key listener
window.addEventListener( "keydown", function( e )
{
	hangMan.checkKeyInput( e );
});

//define hangman game object
var hangMan = 
{
    maxTurns: 12,
    currentTurn: 0,

    //initialize the game
    init: function()
    {
    	this.currentTurn = this.maxTurns;
    },

    //check what button was pressed
    checkKeyInput: function( keyEvent )
    {
    	this.currentTurn--;
    	console.log( keyEvent.key + " - " + this.currentTurn );

    	this.evaluteWinCondition();
    },

    //check if you've won or lost
    evaluteWinCondition: function()
    {
    	if( this.currentTurn <= 0 )
    	{
    		alert( "you lose" );
    	}
    },
};

//init hangman game with starting values
hangMan.init();

