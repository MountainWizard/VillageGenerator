# VillageGenerator Version: 1.4.0
A web based Village Generator for Dungeons and Dragons or other Fantasy Pen and Paper RPGs. If you haven't had the time to prepare for your next session and need a quick adventure.

Autor: Andreas Wüthrich
Website: https://wuethri.ch
Website of the Village Generator: https://papiertaverne.ch

# Features
*  Generates a small Village with 11 NPCs.
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
* Undone some of the text errors Riipa corrected datenjson["de"]["Daten"]["Diverses"][1][25] and [26] are endings are for colors in German please do not temper.
* Marked Variables in the JSON with a "%" at the beginning for better visualisation.
* Anything in the JSON that is written in capital letters with a % in front is a variable and shall not be changed.
* Added all the Magic Items for Uncommon and Rare Rarity with Name, Rarity, Description, and Attribute to the Json in EN. Also added all spells to the Json in EN.
* Added an 11th NPC as a Arcane Shop Keeper
* Added an Arcane shop that will sell five Magic Items. With description of the Items on hover. And a price based on the Rarity and type of the item. If the item is a Spellscroll it will assing a spell based on the lvl of the scroll.
* The version Nr is now defined in the JSON under datenjson["Dorf"]["AllgemeineInfos"]["Version"]
# Known Bugs
* Several text errors
* Too high chance for several serious conditions (vampirism, werwolf) to happen in the same village
* white border around the entrys in the arcane shop.
* tooltip with item description clips outside of viewing area.
# Data
All Data is located in the daten.json file and sorted by Language. The Javascript will pick entries at random from the various lists.
# Demo
Use the latest stable version here: https://papiertaverne.ch/dorfgen
View the latest beta version here: https://vg.mattiseidel.com (bugs are guaranteed) or here: https://wuethri.ch/projekte/dorfgen/
