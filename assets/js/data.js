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

	init: function()
	{
		pokedex = [ this.balbasaur, this.ivysaur, this.venusaur, this.charmander, this.charmeleon, this.charizard ];
	}
}

//initialize the data
data.init();