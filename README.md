# VillageGenerator Version: 1.5.0
A web based Village Generator for Dungeons and Dragons or other Fantasy Pen and Paper RPGs. If you haven't had the time to prepare for your next session and need a quick adventure.
This is basicly an extended version of the Settlemets segment in Chapter 5 of the Dungeon & Dragons Dungeon Mastar's Guide.

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
# Known Bugs
* Several text errors (they will never be fixed)
# Data
All Data is located in the daten.json file and sorted by Language. The Javascript will pick entries at random from the various lists.
# Translations
I am looking for Translators. The Village Generator is currently available in German and English because these are the only Languages i speak.
If you wish to Translate this Tool in other Languages like French or Spanish (or any other Language) please contact me or edit the JSON yourself.
The Items in the Arcane Shop and their descriptions are only available in English since i was too lazy to translate everything.
# Demo
View the latest beta version here: https://vg.mattiseidel.com (bugs are guaranteed) or here: https://wuethri.ch/projekte/dorfgen/
Use the latest stable version here: https://papiertaverne.ch/dorfgen
# Changelog
## Update 1.5.0 UI rework
### Changes:
* Complete UI rework, mostly by Riipa.
* Addes more non traditionaly names for humans. 35 new male names, 23 new female names, 12 new surnames
* There is now a 25% chance, that an NPC has a truly Random name based on a simple Name generator that does not need data from the json.
* Added a Feature to reroll the Village Name, the Population and what the Town is famous for.
* There is now always a random Hero from outside town present at the Tavern.
* Addes more ages so the chances of middle ages people is the highest.
* Added a additional sentence to the infotext to inform the user about the dice "🎲" buttons.
### Bugfixes:
* A bug was fixed, where several serious conditions (vampirism, werwolf) would happen at the same time. This can still happen but not at the same time.
* Narrowed the tooltip box to 350px so it should not clip outside of the viewing area.
* The white border around the entrys in the arcane shop is now gone.
## Update 1.4.2
### Changes:
* Reworked how the Data is stored. Now the Array "Dorf" saves all the Data from the Village that is created in the Javascript and is not stored anymore in the JSON. This gives the JSON a cleaner looks and it only contains the source Data sorted by language.
## Update 1.4.1
### Changes:
Some edits in the JSON
* 9 new relationships beween Charakters
* 14 new human male names
* 16 new human female names
* 10 new human surnames
* 10 new halfling male names
* 9 new halfling female names
* 7 new halfling surnames
* 15 new tiefling male names
* 17 new tiefling female names
* 9 new tiefling surnames
## Update 1.4.0 
### Changes:
* Marked Variables in the JSON with a "%" at the beginning for better visualisation.
* Anything in the JSON that is written in capital letters with a % in front is a variable and shall not be changed.
* Added all the Magic Items for Uncommon and Rare Rarity with Name, Rarity, Description, and Attribute to the Json in EN. Also added all spells to the Json in EN.
* Added an 11th NPC as a Arcane Shop Keeper
* Added an Arcane shop that will sell five Magic Items. With description of the Items on hover. And a price based on the Rarity and type of the item. If the item is a Spellscroll it will assing a spell based on the lvl of the scroll.
* The version Nr is now hardcoded in the js script.
### Bugfixes:
* Fixed a bug that prevented the language selection to work and saves the language selection
* Undone some of the text errors Riipa corrected datenjson["de"]["Daten"]["Diverses"][1][25] and [26] are endings are for colors in German please do not temper.