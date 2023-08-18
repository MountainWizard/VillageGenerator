# VillageGenerator Version: 1.4.1
A web based Village Generator for Dungeons and Dragons or other Fantasy Pen and Paper RPGs. If you haven't had the time to prepare for your next session and need a quick adventure.

Autor: Andreas Wüthrich
Seite: https://wuethri.ch

# Features
*  Generates a small Village with 10 NPCs.
*  Options for the User to Choose the Dominant Race and the Industry of the Village.
*  Option to generate LGBTQ+ NPCs.
*  Each NPC has a Race, Name, Gender, Age, Character and a relationship to another NPC in the village.
*  Generates a Tavern with a Menu specific to the owners Race and NPCs who are currently in the Tavern.
*  Generates a Random building in each Village
*  Generates a Random event, that the players will encounter as soon as they enter the village.
*  Generates a calamity that haunts the village. This is the main objective for your player.
*  a Feature to print the generates village on one A4 page.
# Changes 1.4.0
* Fixed a bug that prevented the language selection to work and saves the language selection
* UI re-work
# Changes 1.4.1
* Undone some of the text errors Riipa corrected datenjson["de"]["Daten"]["Diverses"][1][25] and [26] are endings are for colors in German please do not temper.
* Marked Variables in the JSON with a "%" at the beginning for better visualisation.
* Anything in the JSON that is written in capital letters with a % in front is a variable and shall not be changed.
* Added all the Magic Items for Uncommon and Rare Rarity with Name, Rarity, Description, and Attribute to the Json in EN.
* Added a 11th NPC as a Arcane Shop Keeper
* Added a Arcane shop that will sell five Magic Items.
* Addes a Prices to the Arcane Shop based on the Rarity.
# Known Bugs
* Several text errors
* Too high chance for several serious conditions (vampirism, werwolf) to happen in the same village
# Data
All Data is located in the daten.json file and sorted by Language. The Javascript will pick entries at random from the various lists.
# Demo
Use the latest stable version here: https://wuethri.ch/projekte/dorfgen/
View the latest beta version here: https://vg.mattiseidel.com (bugs are guaranteed)