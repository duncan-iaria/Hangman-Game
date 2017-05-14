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

	caterpie: new Pokemon( 10, "Caterpie" ),
	metapod: new Pokemon( 11, "Metapod" ),
	butterfree: new Pokemon( 12, "Butterfree" ),

	weedle: new Pokemon( 13, "Weedle" ),
	kakuna: new Pokemon( 14, "Kakuna" ),
	beedrill: new Pokemon( 15, "Beedrill" ),

	pidgey: new Pokemon( 16, "Pidgey" ),
	pidgeotto: new Pokemon( 17, "Pidgeotto" ),
	pidgeot: new Pokemon( 18, "Pidgeot" ),

	rattata: new Pokemon( 19, "Rattata" ),
	raticate: new Pokemon( 20, "Raticate" ),

	spearow: new Pokemon( 21, "Spearow" ),
	fearow: new Pokemon( 22, "Fearow" ),

	ekans: new Pokemon( 23, "Ekans" ),
	arbok: new Pokemon( 24, "Arbok" ),

	pikachu: new Pokemon( 25, "Pikachu" ),
	raichu: new Pokemon( 26, "Raichu" ),


 	//builds the pokedex based on the defined pokes
	init: function()
	{
		this.pokedex = [ this.balbasaur, this.ivysaur, this.venusaur,
					this.charmander, this.charmeleon, this.charizard,
					this.squirtle, this.wartotle, this.blastoise,
					 this.caterpie, this.metapod, this.butterfree,
					 this.weedle, this.kakuna, this.beedrill, 
					 this.pidgey, this.pidgeotto, this.pidgeot,
					 this.rattata, this.raticate,
					 this.spearow, this.fearow,
					 this.ekans, this.arbok,
					 this.pikachu, this.raichu ];
	}
}

//initialize the data
data.init();