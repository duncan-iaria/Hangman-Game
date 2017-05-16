# Hangman-Game
_In the style of Pokemon_

## Files
* game.js - this is the hangman game logic
* data.js - this is all the data that is used by the hangman game (in this case, the Pokemon)
* modal.js - this is a file that contains the logic for the modal window (that pops up in the beginning and between rounds)

##Program Flow
On document load, the program gets and caches all the views that it will need (html elements for both the game itself, as well as for the modal).

The modal kicks us off with a prompt. When the user presses "Ready" - hangman.js is initilized, and the game begins. As input is received by key press, the program evalutes it and provides feedback. Once the user has either guessed correctly, or ran out of turns, the modal will pop back up, give feedback, and re-initialize the game.