//================================
// DATA
//================================
//pokemon constructor
function Pokemon( tId, tName ) 
{
    this.id = tId;
    this.name = tName;
}

//holds all the pokemons
var data = 
{
	pokedex : [],
	balbasaur: new Pokemon( 1, "Balbasaur" ),
	ivysaur: new Pokemon( 2, "Ivysaur" ),
	venusaur: new Pokemon( 3, "Venusaur" ),

	charmander: new Pokemon( 4, "Charmander" ),
	charmeleon: new Pokemon( 5, "Charmeleon" ),
	charizard: new Pokemon( 6, "Charizard" ),

	squirtle: new Pokemon( 7, "Squirtle" ),
	wartotle: new Pokemon( 8, "Wartotle" ),
	blastoise: new Pokemon( 9, "Blastoise" ),
 
 	//builds the pokedex based on the defined pokes
	init: function()
	{
		this.pokedex = [ this.balbasaur, this.ivysaur, this.venusaur,
					this.charmander, this.charmeleon, this.charizard,
					this.squirtle, this.wartotle, this.blastoise ];
	}
}

//initialize the data
data.init();