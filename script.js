fetch("./daten.json")
  .then((res) => res.json())
  .then((datenjson) => {
//console.log(datenjson); //the whole json goes into the console for better view during developement.
//--------------------Riipas Stuff-------------------------------
//trying to load string from cookie, I have no idea, what I am doing here. Hurrah for C&P from w3schools xD
function getCookie(userLanguage) {
	
	var cookieArr = document.cookie.split(";"); // Split cookie string and get all individual name=value pairs in an array
	
	for(var i = 0; i < cookieArr.length; i++) {     // Loop through the array elements
		var cookiePair = cookieArr[i].split("=");
	
		/* Removing whitespace at the beginning of the cookie name and compare it with the given string */
		if(userLanguage == cookiePair[0].trim()) {
			// Decode the cookie value and return
			return decodeURIComponent(cookiePair[1]);
			}
	}
	
	// Return null if not found
	return null;
	}

//The function checks, if there is a language preset in the cookie. If there is no preset, German is set. I know this is bullshit, but it is bullshit for future Matti
function checkCookie(userLanguage) {
	var checkLanguage = getCookie("userLanguage");
	if (checkLanguage != "") {
		console.log("Cookie found for " + checkLanguage);
	} else {
		document.cookie = "userLanguage=de; expires=Thu, 31 Dec 2099 23:59:59 GMT";   
		console.log("Cookie set for German");
	}
  }
var userLanguage;
checkCookie(userLanguage);
let language = getCookie("userLanguage"); //set language
//------------------Riipas stuff ends here-----------------------------
document.querySelector("#generieredorf").innerHTML = datenjson[language]["Daten"]["Diverses"][1][27];
document.querySelector("#checkbox1text").innerHTML = datenjson[language]["Daten"]["Diverses"][1][28];
document.querySelector("#industrieconf").innerHTML = datenjson[language]["Daten"]["Diverses"][1][11];
document.querySelector("#mehrheitconf").innerHTML = datenjson[language]["Daten"]["Diverses"][1][10];
let NPC = { }; // creating a new object to save all the NPCs
let Dorf = {AllgemeineInfos:{Name:"",Einwohner:"",Volk:"",Industrie:"",Besonderes:"",Tempel:"",Lagerhaus:"",Unheil:"",Begegnung:"",Version:"1.5.0"},Taverne:{Name:"",Typ:"",Preis:"",AnzahlGast:"",AnzahlMenu:"",Menu1:"",Menu2:"",Menu3:"",Gast1:"6",Gast2:"",Gast3:"",Gast4:"",Gast5:"",gasthero:"",},Gebäude:{Gebäude:"",GebäudeA1:"",GebäudeB1:"",GebäudeA2:"",GebäudeB2:"",GebäudeA3:"",GebäudeB3:"",},ArcaneShop:[]}
let i = 0; //loop var
let y = 0; //loop var2
for(i = 0; i < 6; ++i){ //fill out the Properties for the Arcane shop
		Dorf["ArcaneShop"][i] = {Name:"",Rarity:"",Type:"",Attunement:"",Properties:"",Description:"",Output:"",Price:""}
	}
const volkarray = Object.keys(datenjson[language]["Namen"]); //an array with all the Races from the JSON for the dropdown
const industriearray = datenjson[language]["Daten"]["Industrie"][0]; //an array with all the Industries from the JSON for the dropdown
const vocals = ["a", "e", "i", "o", "u"]; //defines the vocals.
const consonants = ["w", "r", "t", "z", "p", "s", "d", "f", "g", "h", "j", "k", "l", "c", "v", "b", "n", "m"]; //defines the consonants except Q,X,Y,
const anzahlNPC = 11; //How many NPCs do you want to generate? NPC 1 has ID: 0
const gewTrans = 35; //If LGBTQ+ is on. How likely in % is it for a Male or Female charakter to be trans.
const gewName = 20; //how likely it is in % that the Tavern and Village name does not follow the normal standarts.
let lgbtq = false;
for(i = 0; i < anzahlNPC; ++i) { //fill the NPC object will the descriptions.
	NPC[i] = { 'Geschlecht':'', 'GeschlechtString':'', 'Volk':'', 'Name': '', 'Alter':'', 'Beruf':'', 'Aussehen':'', 'Eigenschaft':'', 'Beziehung':'', 'BeziehungZu':'', 'Beziehungscheck':''};
}
let volkwahl = document.getElementById("volkwahl");
const mixdrpdwn = document.createElement('option'); //adds a mixed to the drop down menu
mixdrpdwn.text = mixdrpdwn.value = datenjson[language]["Daten"]["Diverses"][1][23];//adds a mixed to the drop down menu
volkwahl.add(mixdrpdwn, 0);//adds a mixed to the drop down menu
for(i = 0; i <= volkarray.length - 1; ++i) { //Generates the drop down menu for the Major Race of the Village according to the Races in the json.
    let option1 = document.createElement('option');
    option1.text = option1.value = volkarray[i];
    volkwahl.add(option1, 0);
}
let industriewahl = document.getElementById("industriewahl");
const rnddrpdwn = document.createElement('option');//adds Random to the Dropdown menu.
rnddrpdwn.text = rnddrpdwn.value = datenjson[language]["Daten"]["Diverses"][1][24];//adds Random to the Dropdown menu.
industriewahl.add(rnddrpdwn, 0);//adds Random to the Dropdown menu.
for(i = 1; i <= Object.keys(industriearray).length; ++i) { //Generates the drop down menu for the Industry of the Village according to the Data in the json.
	let option2 = document.createElement('option');
    option2.text = option2.value = industriearray[i];
    industriewahl.add(option2, 0);
}
//---------------------------------------------------------------------
function randnumber(min, max) { //generates a random number beween min and max.
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
function getKeyByValue(object, value) { //Find the Object key from a Value.
  return Object.keys(object).find(key => object[key] === value);
}
function GenerateRandomName(){
	let laenge = randnumber(3,8); //defines the length of the name
	let name = "";
	for ( let i = 1; i <= laenge; i++){
		let lastchar = name.charAt(name.length - 1) //outputs the last charakter in the name
		if (consonants.includes(lastchar)) { //checks if the last letter was a consonant
			name = name + vocals[randnumber(0,vocals.length -1)]; //pushes a vocal into the name
		}else{
			name = name + consonants[randnumber(0,consonants.length -1)]; //pushes a consonant into the name
		}
	}
	return name.charAt(0).toUpperCase() + name.slice(1); //makes the first letter uppercase
}
function namegen(volk, geschlecht) { //Generates a Name for the NPC according to the Race and Gender 0 = Male, 1 = Female
	if (randnumber(0,4) === 0){ //25% chance for an NPC to have a complete random name that is not bound to the race or gender.
		return GenerateRandomName();
	}else{
		if (volk === volkarray[4]) { //Checks a special case for Half-elves and Gnomes.
			return datenjson[language]["Namen"][volk][geschlecht][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][geschlecht]).length)] + " " + datenjson[language]["Namen"][volk][2][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][2]).length)] + " " + datenjson[language]["Namen"][volk][3][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][3]).length)] + " " + datenjson[language]["Namen"][volk][3][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][3]).length)];
		}else if(volk === volkarray[6]){
			if (randnumber(0, 99 > 50)){
				//human firstname elvish lastname
				return datenjson[language]["Namen"][volkarray[0]][geschlecht][randnumber(1,Object.keys(datenjson[language]["Namen"][volkarray[0]][geschlecht]).length)] + " " + datenjson[language]["Namen"][volkarray[5]][2][randnumber(1,Object.keys(datenjson[language]["Namen"][volkarray[5]][2]).length)];
			}else{
				//elvish firstname human lastname
				return datenjson[language]["Namen"][volkarray[5]][geschlecht][randnumber(1,Object.keys(datenjson[language]["Namen"][volkarray[5]][geschlecht]).length)] + " " + datenjson[language]["Namen"][volkarray[0]][2][randnumber(1,Object.keys(datenjson[language]["Namen"][volkarray[0]][2]).length)];
			}
		}else{
			return datenjson[language]["Namen"][volk][geschlecht][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][geschlecht]).length)] + " " + datenjson[language]["Namen"][volk][2][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][2]).length)];
		}
	}
}
function genExternNPC(held, volk){ //generates an NPC that does not live in the village as a text string. If held = true, then the Job will be Adventurer and it adds an Class and a Level. The "volk" is the realated number from the Volkarray. If this var is "z" so the Race will be Random.
	let npcstring = "";
	let geschlechtname = 0;
	let geschlecht = 0;
	if (volk === "z"){
		volk = volkarray[randnumber(0, volkarray.length-1)]; //if volk <0 then pick a random race
	}else{
		volk = volkarray[volk]
	}
	if (lgbtq === true){geschlecht = randnumber(0,Object.keys(datenjson[language]["Daten"]["NPC"][6]).length - 1)}else{geschlecht = randnumber(0,1)}//Gender of the Hero
	if (lgbtq === true && geschlecht > 1){geschlechtname = randnumber(0,1)}else{geschlechtname = geschlecht} //For diverse Gender add a Random male of female name.
	if (lgbtq === true && geschlecht < 2 && randnumber(1,100)<gewTrans){
		geschlecht = datenjson[language]["Daten"]["Diverses"][1][22] + datenjson[language]["Daten"]["NPC"][6][geschlecht + 1]
	}else{
		geschlecht = datenjson[language]["Daten"]["NPC"][6][geschlecht + 1]}
	if (held === true){
		npcstring = datenjson[language]["Daten"]["Industrie"][3][6]+" "+namegen(volk, geschlechtname)+ " / " + volk + " / " + geschlecht + " / " + datenjson[language]["Daten"]["NPC"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["NPC"][0]).length)] + " " + datenjson[language]["Daten"]["Diverses"][1][6] + randnumber(2,15);
	}else{
		npcstring = datenjson[language]["Daten"]["Industrie"][1][5]+" "+namegen(volk, geschlechtname)+ " / " + volk + " / " + geschlecht + " / " + datenjson[language]["Daten"]["Diverses"][1][6] + randnumber(5,15);
	}	
	return npcstring
}
function genderToString(npcnr){
	if (lgbtq === true && NPC[npcnr]["Geschlecht"] < 2 && randnumber(1,100)<gewTrans){
			NPC[npcnr]["GeschlechtString"] = datenjson[language]["Daten"]["Diverses"][1][22] + datenjson[language]["Daten"]["NPC"][6][NPC[npcnr]["Geschlecht"]+1]
		}else{
			NPC[npcnr]["GeschlechtString"] = datenjson[language]["Daten"]["NPC"][6][NPC[npcnr]["Geschlecht"]+1]}//creates from the number in Geschlecht a Gender. The +1 is neede because in the json male is 1 and female 2 and in the Array male is 0 and female 2. If lgbtq is true there is an x% chance for a trans to appear in front of a cis gender.
}
function generiereUnheil(){ //Get a random event.
	let unheil = datenjson[language]["Daten"]["Events"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Events"][0]).length)];
	unheil = replaceWORD(unheil);
	Dorf["AllgemeineInfos"]["Unheil"] = unheil;
	updateHTML();
}
function generiereBegegnung(){ //Get a random event.
	let begegnung = datenjson[language]["Daten"]["Events"][1][randnumber(1,Object.keys(datenjson[language]["Daten"]["Events"][1]).length)];
	begegnung = replaceWORD(begegnung);
	Dorf["AllgemeineInfos"]["Begegnung"] = begegnung;
	updateHTML();
}
function genvillagename(){  //generates the Village Name
	Dorf["AllgemeineInfos"]["Name"] = datenjson[language]["Daten"]["Dorfname"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Dorfname"][0]).length)] + datenjson[language]["Daten"]["Dorfname"][1][randnumber(1,Object.keys(datenjson[language]["Daten"]["Dorfname"][1]).length)];
	updateHTML();
}
function genvillagepop(){  //generates the population
	Dorf["AllgemeineInfos"]["Einwohner"] = randnumber(40, 1500);
	updateHTML();
}
function genvillageprofile(){  //generates what the village is famous for.
	Dorf["AllgemeineInfos"]["Besonderes"] = datenjson[language]["Daten"]["Dorfname"][2][randnumber(1,Object.keys(datenjson[language]["Daten"]["Dorfname"][2]).length)];
	updateHTML();
}
function replaceWORD(string){ //Replaces the words writtel like %THIS . with a percent in front and all caps with a word. Always needs an space at the end.
	let rndnr = randnumber(0, anzahlNPC-1); //Generate a random number for the NPC to be replaced.
	string = string.replace("%NPC ", NPC[rndnr]["Beruf"] + " " + NPC[rndnr]["Name"] + " "); //Replacec %NPC with a Random NPC
	string = string.replace("%NPC0 ", NPC[0]["Beruf"] + " " + NPC[0]["Name"] + " "); //replaces %NPC0 with the Village Leader
	string = string.replace("%NPC4 ", NPC[4]["Beruf"] + " " + NPC[4]["Name"] + " "); //replacec %NPC4 with NPC4
	string = string.replace("%RND ", randnumber(2,9) + " "); //replaces %RND with a random number
	string = string.replace("%HELD ", genExternNPC(true,"z") + " "); //Replaces %HERO with a Random Hero
	string = string.replace("%BLDG ", datenjson[language]["Daten"]["Gebäude"][0][Dorf["Gebäude"]["Gebäude"]] + " "); //replacec %BLDG with the Building of the Village.
	string = string.replace("%INDUSTRIE ", Dorf["AllgemeineInfos"]["Industrie"] + " "); //replacec %INDUSTRIE with the Villages Industry.
	return string;
}
function generiereTaverne(){ //generates the Tavern
	let oldNPC = NPC[6]["Beruf"] + " " + NPC[6]["Name"]+" ";
	if (randnumber(1,100) < gewName){ //Tavernenname % chance auf dass es nur "Zum: datenjson[language]["Daten"]["Taverne"][1]
		Dorf["Taverne"]["Name"] = datenjson[language]["Daten"]["Diverses"][1][1] + datenjson[language]["Daten"]["Taverne"][1][randnumber(1,Object.keys(datenjson[language]["Daten"]["Taverne"][1]).length)];
	}else{
		Dorf["Taverne"]["Name"] = datenjson[language]["Daten"]["Taverne"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Taverne"][0]).length)] + " " + datenjson[language]["Daten"]["Taverne"][1][randnumber(1,Object.keys(datenjson[language]["Daten"]["Taverne"][1]).length)];
	}
	Dorf["Taverne"]["Typ"] = datenjson[language]["Daten"]["Taverne"][2][randnumber(1,Object.keys(datenjson[language]["Daten"]["Taverne"][2]).length)]; //chooses the Taverntype
	Dorf["Taverne"]["Preis"] = datenjson[language]["Daten"]["Diverses"][1][2] + randnumber(5,9) + " " + datenjson[language]["Daten"]["Diverses"][0][2] + " / " + randnumber(1,3) + " " + datenjson[language]["Daten"]["Diverses"][0][3] + datenjson[language]["Daten"]["Diverses"][1][3]; //price per night / daily expenses
	NPC[5]["Beruf"] = datenjson[language]["Daten"]["Industrie"][3][1]; //jobtitle of the innkeeper
	if (getKeyByValue(datenjson[language]["Daten"]["Taverne"][2], Dorf["Taverne"]["Typ"]) < 4){ //bouncer
			NPC[6]["Beruf"] = datenjson[language]["Daten"]["Taverne"][9][4];
		}else if(getKeyByValue(datenjson[language]["Daten"]["Taverne"][2], Dorf["Taverne"]["Typ"]) < 6){ //brothel
			NPC[6]["Beruf"] = datenjson[language]["Daten"]["Taverne"][9][3];
			NPC[6]["Geschlecht"] = 1;
			genderToString(6);
			NPC[6]["Alter"] = datenjson[language]["Daten"]["NPC"][1][5];
			NPC[6]["Name"] = namegen(NPC[6]["Volk"], 1);
		}else if(getKeyByValue(datenjson[language]["Daten"]["Taverne"][2], Dorf["Taverne"]["Typ"]) < 8){ //gambler
			NPC[6]["Beruf"] = datenjson[language]["Daten"]["Taverne"][9][2];
		}else if(getKeyByValue(datenjson[language]["Daten"]["Taverne"][2], Dorf["Taverne"]["Typ"]) < 10){ //music
			NPC[6]["Beruf"] = datenjson[language]["Daten"]["Taverne"][9][1];
		}else{
			NPC[6]["Beruf"] = datenjson[language]["Daten"]["Industrie"][1][getKeyByValue(datenjson[language]["Daten"]["Industrie"][0], Dorf["AllgemeineInfos"]["Industrie"])];
	}
	for(let i = 0; i < 4; ++i){ //emptys the menu
		Dorf["Taverne"]["Menu" + i] = "";
	}
	for(let i = 2; i < 6; ++i){ //emptys the guests
		Dorf["Taverne"]["Gast" + i] = "";
	}
	Dorf["Taverne"]["AnzahlMenu"] = randnumber(2, 4); //how many menus does the tavern offer?
	Dorf["Taverne"]["AnzahlGast"] = randnumber(2, 5); //how many guests are present in the tavern
	let menuselector = 0 //chooses different menus depending on what Race the innkeeper is
	if (getKeyByValue(volkarray, NPC[5]["Volk"]) < 3){
		menuselector = 3
	}else if (getKeyByValue(volkarray, NPC[5]["Volk"]) < 5){
		menuselector = 4
	}else if (getKeyByValue(volkarray, NPC[5]["Volk"]) < 7){
		menuselector = 5
	}else if (getKeyByValue(volkarray, NPC[5]["Volk"]) < 9){
		menuselector = 6
	}else{
		menuselector = 3
	}
	for(i = 0; i < Dorf["Taverne"]["AnzahlMenu"]; ++i){ //generating the menus
		Dorf["Taverne"]["Menu" + i] = datenjson[language]["Daten"]["Taverne"][menuselector][randnumber(1, Object.keys(datenjson[language]["Daten"]["Taverne"][menuselector]).length)]+ " " + datenjson[language]["Daten"]["Taverne"][8][randnumber(1, Object.keys(datenjson[language]["Daten"]["Taverne"][8]).length)] + " " + datenjson[language]["Daten"]["Taverne"][7][randnumber(1, Object.keys(datenjson[language]["Daten"]["Taverne"][7]).length)] + " / " + randnumber(5,20) + " " + datenjson[language]["Daten"]["Diverses"][0][1];
	}
	for(i = 2; i < Dorf["Taverne"]["AnzahlGast"]+1; ++i){ //Generating the guests beginning with guest 2
		let gastwahl = randnumber(0,Object.keys(NPC).length - 1); //wählt ein NPC aus.
		for (let y = 1; y < i; ++y){ //checks if the guests is already sittin in the tavern.
			if (gastwahl === Dorf["Taverne"]["Gast"+y]){
				gastwahl = randnumber(0,Object.keys(NPC).length - 1);
				y = y - 1;
			}else if (gastwahl === 5){ //NPC5 is already in the tavern
				gastwahl = randnumber(0,Object.keys(NPC).length - 1);
				y = y - 1;
			}else if (gastwahl === 6){ //NPC6 is already in the tavern
				gastwahl = randnumber(0,Object.keys(NPC).length - 1);
				y = y - 1;
			}else{
				Dorf["Taverne"]["Gast"+i] = gastwahl; //if everything is ok write the Guest to the Object.
			}
		}	
		}
	Dorf["Taverne"]["gasthero"] = "";
	document.querySelector("#B_Held").innerHTML = "";
	if(randnumber(1,4) === 1){
		Dorf["Taverne"]["gasthero"] = genExternNPC(true,"z") //25% chance that the last guest is an Hero form Outside Town.
		document.querySelector("#B_Held").innerHTML = datenjson[language]["Daten"]["Diverses"][1][29];
	}
	Dorf["AllgemeineInfos"]["Begegnung"] = Dorf["AllgemeineInfos"]["Begegnung"].replace(oldNPC, NPC[6]["Beruf"] + " " + NPC[6]["Name"] + " "); //Replaces the old NPC with the New one in Encounter
	Dorf["AllgemeineInfos"]["Unheil"] = Dorf["AllgemeineInfos"]["Unheil"].replace(oldNPC, NPC[6]["Beruf"] + " " + NPC[6]["Name"] + " "); //Replaces the old NPC with the New one in Calamity
	Dorf["AllgemeineInfos"]["Lagerhaus"] = Dorf["AllgemeineInfos"]["Lagerhaus"].replace(oldNPC, NPC[6]["Beruf"] + " " + NPC[6]["Name"] + " ");//Replaces the old NPC with the New one in the Storage
	updateHTML();
}
function generiereLager(){ //generates the Storehouse
	Dorf["AllgemeineInfos"]["Lagerhaus"] = datenjson[language]["Daten"]["Gebäude"][3][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][3]).length)];
	Dorf["AllgemeineInfos"]["Lagerhaus"] = replaceWORD(Dorf["AllgemeineInfos"]["Lagerhaus"]);
	updateHTML();
}
function generiereDomain(){
	Dorf["AllgemeineInfos"]["Tempel"] = datenjson[language]["Daten"]["Gebäude"][2][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][2]).length)];
	updateHTML()
}
function generiereArcaneshop(){ //Generates the Arcane Shop. English is still hardcoded because i was to lazy to translate.
	let itemnr = 0; //defines a var to store the number of the picked magic item.
	//Dorf["ArcaneShop"]["Item1"] = Dorf["ArcaneShop"]["Item1"] + " / " + datenjson[language]["Daten"]["Diverses"][1][32] + " " + randnumber(1,5); //adds an amount between 1 and 5
	for(let i = 0; i < 5; ++i){
		if(i === 0){ //the first Item is always a Potion of Healing. 
			if (randnumber(1, 100)> 50){ //50% change of Greater Healing.
				itemnr = 161;
			}else{
				itemnr = 163;
			}
		}else if(i === 1){ //the second item is always a spell scroll
			itemnr = randnumber(230,235);
		}else{
			itemnr = randnumber(0,Object.keys(datenjson["en"]["Daten"]["MagicItems"]).length-1)
		}
		Dorf["ArcaneShop"][i]["Name"] = datenjson["en"]["Daten"]["MagicItems"][itemnr]["Name"];
		Dorf["ArcaneShop"][i]["Rarity"] = datenjson["en"]["Daten"]["MagicItems"][itemnr]["Rarity"];
		Dorf["ArcaneShop"][i]["Type"] = datenjson["en"]["Daten"]["MagicItems"][itemnr]["Type"];
		Dorf["ArcaneShop"][i]["Attunement"] = datenjson["en"]["Daten"]["MagicItems"][itemnr]["Attunement"];
		Dorf["ArcaneShop"][i]["Properties"] = datenjson["en"]["Daten"]["MagicItems"][itemnr]["Properties"];
		Dorf["ArcaneShop"][i]["Description"] = datenjson["en"]["Daten"]["MagicItems"][itemnr]["Description"];
		Dorf["ArcaneShop"][i]["Price"] = "PRICE PLACEHOLDER";
		if (Dorf["ArcaneShop"][i]["Type"] === "potion"){ //price for Potions
			if (Dorf["ArcaneShop"][i]["Rarity"] === "common"){ 
				Dorf["ArcaneShop"][i]["Price"] = randnumber(35, 65); //common
			}else if (Dorf["ArcaneShop"][i]["Rarity"] === "uncommon"){
				Dorf["ArcaneShop"][i]["Price"] = randnumber(80, 300); //uncommon
			}else if (Dorf["ArcaneShop"][i]["Rarity"] === "rare"){
				Dorf["ArcaneShop"][i]["Price"] = randnumber(180, 1000); //rare
			}else{console.log("Error Potion Rarity Not Found for Item " + i+1)} //logs an error if nothing applies.
		}else if (Dorf["ArcaneShop"][i]["Type"] === "scroll"){ //price for Scrolls
			if (Dorf["ArcaneShop"][i]["Rarity"] === "common"){ 
				Dorf["ArcaneShop"][i]["Price"] = randnumber(25, 50); //common
			}else if (Dorf["ArcaneShop"][i]["Rarity"] === "uncommon"){
				Dorf["ArcaneShop"][i]["Price"] = randnumber(50, 250); //uncommon
			}else if (Dorf["ArcaneShop"][i]["Rarity"] === "rare"){
				Dorf["ArcaneShop"][i]["Price"] = randnumber(250, 2500); //rare
			}else{console.log("Error Scroll Rarity Not Found for Item " + i+1)} //logs an error if nothing applies.
		}else{ //price for the all the other items
			if (Dorf["ArcaneShop"][i]["Rarity"] === "common"){ 
				Dorf["ArcaneShop"][i]["Price"] = randnumber(50, 100); //common
			}else if (Dorf["ArcaneShop"][i]["Rarity"] === "uncommon"){
				Dorf["ArcaneShop"][i]["Price"] = randnumber(100, 500); //uncommon
			}else if (Dorf["ArcaneShop"][i]["Rarity"] === "rare"){
				Dorf["ArcaneShop"][i]["Price"] = randnumber(500, 5000); //rare
			}else{console.log("Error Item Rarity Not Found for Item " + i+1)} //logs an error if nothing applies.
		}	
		if (typeof Dorf["ArcaneShop"][i]["Properties"] === 'number') { //checks if the type is a number. Otherwise the whole script breaks.
			let spellnr = randnumber(0,Object.keys(datenjson["en"]["Daten"]["Spells"][Dorf["ArcaneShop"][i]["Properties"]]).length-1) //which item to pick?
			let spell = datenjson["en"]["Daten"]["Spells"][Dorf["ArcaneShop"][i]["Properties"]][spellnr]["Name"]; //write the spell name into the var spell
			spell = spell + " (" + datenjson["en"]["Daten"]["Spells"][Dorf["ArcaneShop"][i]["Properties"]][spellnr]["School"] + ") "; //add the School of magic to the var Spell
			Dorf["ArcaneShop"][i]["Name"] = Dorf["ArcaneShop"][i]["Name"].replace("%SPELL", spell); //replaces the %SPELL Var with a Spell
		}
		Dorf["ArcaneShop"][i]["Output"] = Dorf["ArcaneShop"][i]["Name"] + " / " + Dorf["ArcaneShop"][i]["Rarity"] + " / " + Dorf["ArcaneShop"][i]["Price"] + " "+ datenjson[language]["Daten"]["Diverses"][0][3]; //writes everithing into the Output.
		document.querySelector('#Item'+i).innerHTML = Dorf["ArcaneShop"][i]["Output"]; //update html for Items
		document.querySelector('#itemdescription'+i).innerHTML = Dorf["ArcaneShop"][i]["Description"]; //update html for Item tooltips
	}
	updateHTML();
}
function generiereGebaude(){
	let oldBldg = datenjson[language]["Daten"]["Gebäude"][0][Dorf["Gebäude"]["Gebäude"]]+" "; //schreibt das alte gebäude in oldBldg
	let oldNPC = NPC[4]["Beruf"] + " " + NPC[4]["Name"]+" ";
	let [hatWasser, hatKloster, hatBurg, istkurort] = [false,false,false,false] //stelle fest ob gewisse Keywörter im Dorfnamen sind.
	let rndnr = randnumber(1, Object.keys(NPC).length - 1); //sucht einen zufälligen NPC aus.
	Dorf["AllgemeineInfos"]["Name"].search(datenjson[language]["Daten"]["Dorfname"][1][2]) >= 0 && (hatWasser = true);//prüft auf Fluss in Dorfname
	Dorf["AllgemeineInfos"]["Name"].search(datenjson[language]["Daten"]["Dorfname"][1][12]) >= 0 && (hatWasser = true);//prüft auf Bucht in Dorfname
	Dorf["AllgemeineInfos"]["Name"].search(datenjson[language]["Daten"]["Dorfname"][1][17]) >= 0 && (hatWasser = true);//prüft auf See in Dorfname
	Dorf["AllgemeineInfos"]["Name"].search(datenjson[language]["Daten"]["Dorfname"][1][15]) >= 0 && (hatKloster = true);//prüft auf Kloster in Dorfname
	Dorf["AllgemeineInfos"]["Name"].search(datenjson[language]["Daten"]["Dorfname"][1][5]) >= 0 && (hatBurg = true);////prüft auf Burg in Dorfname
	Dorf["AllgemeineInfos"]["Industrie"].search(datenjson[language]["Daten"]["Industrie"][0][8]) >= 0 && (istkurort = true);////prüft auf Kurort in Industrie
	if (istkurort === true){
		Dorf["Gebäude"]["Gebäude"] = randnumber(8,9); //generiert Bad oder Kurhotel wenn istkurort = true
	}else if(hatKloster === true){
		Dorf["Gebäude"]["Gebäude"] = 5; //generiert Kloster wenn hatKloster = true
	}else if(hatBurg === true){
		Dorf["Gebäude"]["Gebäude"] = 4; //generiert Burg wenn hatBurg = true
	}else if(hatWasser === true){
		Dorf["Gebäude"]["Gebäude"] = randnumber(1, 3); //generiert hafen, fähre, oder Brücke wenn wasser = true
	}else{
		Dorf["Gebäude"]["Gebäude"] = randnumber(1, Object.keys(datenjson[language]["Daten"]["Gebäude"][0]).length);
	}
	//----------Generiere Zusatzinfos für das Gebäude----------
	for(i = 1; i <= 3; ++i){ //leert die alten einträge
			Dorf["Gebäude"]["GebäudeA"+i] = "";
			Dorf["Gebäude"]["GebäudeB"+i] = "";
		}
	if(Dorf["Gebäude"]["Gebäude"] === 1){//Hafen
		for(let i = 1; i <= randnumber(1,3); ++i){ //viel viele schiffe sind anwesend, wie heissen diese und was haben sie geladen?
			Dorf["Gebäude"]["GebäudeA"+i] = datenjson[language]["Daten"]["Gebäude"][7][2] + datenjson[language]["Daten"]["Gebäude"][5][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][5]).length)] + " " + datenjson[language]["Daten"]["Gebäude"][6][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][6]).length)]; //generiert Schiffsnamen
			let npcjobname = NPC[rndnr]["Beruf"] + " " + NPC[rndnr]["Name"]; //wählt NPC der im Schiff zu finden ist.
			rndnr = randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][3]).length); //generiert eine zufallszahl für das aussuchen der Fracht.
			if(rndnr === 8){Dorf["Gebäude"]["GebäudeB"+i] = Dorf["AllgemeineInfos"]["Industrie"] + datenjson[language]["Daten"]["Gebäude"][3][rndnr]}else if(rndnr === 9){Dorf["Gebäude"]["GebäudeB"+i] = npcjobname + datenjson[language]["Daten"]["Gebäude"][3][rndnr]}else{Dorf["Gebäude"]["GebäudeB"+i] = datenjson[language]["Daten"]["Gebäude"][3][rndnr]}

		}
	}
	if(Dorf["Gebäude"]["Gebäude"] === 2 ||Dorf["Gebäude"]["Gebäude"] === 3){//Fähre oder Brücke
		Dorf["Gebäude"]["GebäudeA1"] = datenjson[language]["Daten"]["Gebäude"][7][1];
		Dorf["Gebäude"]["GebäudeB1"] = randnumber(1,8) + " " + datenjson[language]["Daten"]["Diverses"][0][1]; //wie viel kostet die überfahrt
	}
	if(Dorf["Gebäude"]["Gebäude"] === 5){//Kloster
		Dorf["Gebäude"]["GebäudeA1"] = datenjson[language]["Daten"]["Gebäude"][7][3];
		Dorf["Gebäude"]["GebäudeB1"] = datenjson[language]["Daten"]["Gebäude"][2][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][2]).length)]; //welche Domain hat das Kloster?
	}
	if(Dorf["Gebäude"]["Gebäude"] === 7){//Ruinen
		Dorf["Gebäude"]["GebäudeA1"] = datenjson[language]["Daten"]["Gebäude"][7][4];
		Dorf["Gebäude"]["GebäudeB1"] = datenjson[language]["Daten"]["Gebäude"][4][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][4]).length)]; //was sind das für ruinen?
	}
	NPC[4]["Beruf"] = datenjson[language]["Daten"]["Gebäude"][1][Dorf["Gebäude"]["Gebäude"]]; //jobtitel vom NPCdes Spezialgebäudes
	if (Dorf["Gebäude"]["Gebäude"] === 5){ //wenn Gebäude = Kloster NPC 4 ist Weiblich.
		NPC[4]["Geschlecht"] = 1;
		NPC[4]["Name"] = namegen(NPC[4]["Volk"], 1);
	}	
	Dorf["AllgemeineInfos"]["Unheil"] =  Dorf["AllgemeineInfos"]["Unheil"].replace(oldBldg, datenjson[language]["Daten"]["Gebäude"][0][Dorf["Gebäude"]["Gebäude"]]+" "); //ersetzt das alte mit dem neuen Gebäude in Unheil.
	Dorf["AllgemeineInfos"]["Begegnung"] = Dorf["AllgemeineInfos"]["Begegnung"].replace(oldNPC, NPC[4]["Beruf"] + " " + NPC[4]["Name"] + " "); //ersetzt den alte NPC mit dem neuen in Begegnung.
	Dorf["AllgemeineInfos"]["Unheil"] = Dorf["AllgemeineInfos"]["Unheil"].replace(oldNPC, NPC[4]["Beruf"] + " " + NPC[4]["Name"] + " "); //ersetzt den alte NPC mit dem neuen in Unheil.
	Dorf["AllgemeineInfos"]["Lagerhaus"] = Dorf["AllgemeineInfos"]["Lagerhaus"].replace(oldNPC, + NPC[4]["Beruf"] + " " + NPC[4]["Name"] + " ");//ersetzt den NPC im Lager.
	updateHTML();
}
function generiereNPC(nr){ //generates the NPC with the Number nr.
	let oldNPC = NPC[nr]["Beruf"] + " " + NPC[nr]["Name"] + " "; //saves occupation of the NPC
	let volkwahl = document.getElementById("volkwahl").value;
	let volk = "";
	let NPCBeziehungNr = -1 //resets the NPC Relationsip nr
	let geschlechtnamegen = 0; //generates a string from the number in json with the gender.
	let relchcarr = []; //generate the relationship check array.
	if (volkwahl === datenjson[language]["Daten"]["Diverses"][1][23]){
		volk = volkarray[randnumber(0, volkarray.length-1)]
	}else{
		if (randnumber(1,100) < 70){
			volk = volkwahl
		}else{
			volk = volkarray[randnumber(0, volkarray.length-1)]
		}
	}
	do{
		NPCBeziehungNr = randnumber(0, anzahlNPC - 1);
	}while (NPCBeziehungNr === nr); //prevents an NPC from having a relationship with himself.
	for(y = 0; y < anzahlNPC; ++y){ //fills the relationship check array.
		relchcarr.push(NPC[y]["Beziehungscheck"]);
	}
	if (lgbtq === true){NPC[nr]["Geschlecht"] = randnumber(0,Object.keys(datenjson[language]["Daten"]["NPC"][6]).length - 1)}else{NPC[nr]["Geschlecht"] = randnumber(0,1)}//Geschlecht vom NPC
	NPC[nr]["Volk"] = volk;
	if(NPC[nr]["Geschlecht"] > 1){geschlechtnamegen = randnumber(0,1)}else{geschlechtnamegen = NPC[nr]["Geschlecht"]} //is the gender is not male or female, pick a random name.
	NPC[nr]["Name"] = namegen(volk, geschlechtnamegen);
	NPC[nr]["Alter"] = datenjson[language]["Daten"]["NPC"][1][randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][1]).length)];
	NPC[nr]["Eigenschaft"] = datenjson[language]["Daten"]["NPC"][3][randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][3]).length)];
	let beziehungsnr = 0;
	let check = false;
	do{
		if (lgbtq === false && NPC[nr]["Geschlecht"] === NPC[NPCBeziehungNr]["Geschlecht"]){ 
			beziehungsnr = randnumber(6, Object.keys(datenjson[language]["Daten"]["NPC"][5]).length); //no same sex realationships
		}else{
			beziehungsnr = randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][5]).length); //same sex realationships
		}
		if (relchcarr.includes(29) && beziehungsnr == 30){check = false}else if(relchcarr.includes(30) && beziehungsnr == 29){check = false}else{check = true} //no Vamp with a Wolf and no Wolf with a Vamp
	}while (check === false);//never pick the Werewolf or the Vampire at the same time.
	NPC[nr]["Beziehungscheck"] = beziehungsnr;
	NPC[nr]["Beziehung"] = datenjson[language]["Daten"]["NPC"][5][beziehungsnr];
	NPC[nr]["BeziehungZu"] = NPCBeziehungNr;
	let rndnr = randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][4]).length); //generate the nr for the looks of the NPC
	let ending = "";
	NPC[nr]["Aussehen"] = datenjson[language]["Daten"]["NPC"][4][randnumber(1, rndnr)]; //chooses the look base of the var rndnr.
	if (Dorf["Gebäude"]["Gebäude"] === 5){ //if the Building is a Monestary, NPC4 is always female.
		if (nr === 4){
			NPC[4]["Geschlecht"] = 1;
			NPC[4]["Name"] = namegen(NPC[4]["Volk"], 1);
		}
	}
	if (Dorf["Taverne"]["Typ"] === datenjson[language]["Daten"]["Taverne"][2][4]||Dorf["Taverne"]["Typ"] === datenjson[language]["Daten"]["Taverne"][2][5]){ //do this if the tavern is a bathhouse or brothel.
		if (nr === 6){
			NPC[6]["Geschlecht"] = 1;
			NPC[6]["Alter"] = datenjson[language]["Daten"]["NPC"][1][2];
			NPC[6]["Name"] = namegen(NPC[6]["Volk"], 1);
		}
	}
	genderToString(nr);
	//replaces some words
	if (rndnr === 22){
		ending = datenjson[language]["Daten"]["Diverses"][1][25]
	}else{
		ending = datenjson[language]["Daten"]["Diverses"][1][26];} //picks the ending for the colour. Only used in German.
	NPC[nr]["Beziehung"] = NPC[nr]["Beziehung"].replace("%GELD", randnumber(1,50) + " " + datenjson[language]["Daten"]["Diverses"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Diverses"][0]).length)]); //Replaces the var %GELD
	NPC[nr]["Aussehen"] = NPC[nr]["Aussehen"].replace("%FARBE", datenjson[language]["Daten"]["NPC"][2][randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][2]).length)] + ending); //replaces the Var %FARBE.
	NPC[nr]["Eigenschaft"] = NPC[nr]["Eigenschaft"].replace("%VOLK", volkarray[randnumber(0, volkarray.length-1)]); //replaces the Var %VOLK in eigenschaft
	NPC[nr]["Beziehung"] = NPC[nr]["Beziehung"].replace("%GELD", randnumber(1,50) + " " + datenjson[language]["Daten"]["Diverses"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Diverses"][0]).length)]); //Replaces the var %GELD
	Dorf["AllgemeineInfos"]["Unheil"] = Dorf["AllgemeineInfos"]["Unheil"].replace(oldNPC, NPC[nr]["Beruf"] + " " + NPC[nr]["Name"] + " "); //replaces the old with the new NPC in the Calamity
	Dorf["AllgemeineInfos"]["Begegnung"] = Dorf["AllgemeineInfos"]["Begegnung"].replace(oldNPC, NPC[nr]["Beruf"] + " " + NPC[nr]["Name"] + " "); //replaces the old with the new NPC in the Encounter
	Dorf["AllgemeineInfos"]["Lagerhaus"] = Dorf["AllgemeineInfos"]["Lagerhaus"].replace(oldNPC, NPC[nr]["Beruf"] + " " + NPC[nr]["Name"] + " ");//replaces the old with the new NPC in the Storehouse
}
function generiereDorf(){
	if (document.getElementById("checkbox1").checked === true){lgbtq = true;}else{lgbtq = false}; //checks if lgbtq is on.
	let volkwahl = document.getElementById("volkwahl").value;
	let industriewahl = document.getElementById("industriewahl").value;
	if (industriewahl === datenjson[language]["Daten"]["Diverses"][1][24]){ //if industry is random pick a random industry, otherwise pick the selected industry.
		Dorf["AllgemeineInfos"]["Industrie"] = datenjson[language]["Daten"]["Industrie"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Industrie"][0]).length)];
	}else{
		Dorf["AllgemeineInfos"]["Industrie"] = industriewahl;
	}
	//----------Fill the NPC Objekt----------
	for(i = 0; i < anzahlNPC; ++i){ //fills the relationship check array.
		NPC[i]["Beziehungscheck"] = ""; //empties the Beziehungscheck for new round
	}
	for(i = 0; i < anzahlNPC; ++i){
		generiereNPC(i)
		NPC[i]["Beruf"] = datenjson[language]["Daten"]["Industrie"][1][getKeyByValue(datenjson[language]["Daten"]["Industrie"][0], Dorf["AllgemeineInfos"]["Industrie"])]; //fülle mit Arbeiter fürs erste.
	}
	genvillagename();
	genvillagepop();
	genvillageprofile();
	Dorf["AllgemeineInfos"]["Volk"] = volkwahl;
	//----------Generate Occupations----------
	generiereGebaude();
	NPC[0]["Beruf"] = datenjson[language]["Daten"]["Industrie"][2][getKeyByValue(datenjson[language]["Daten"]["Industrie"][0], Dorf["AllgemeineInfos"]["Industrie"])]; //jobtitel of the leader
	NPC[1]["Beruf"] = datenjson[language]["Daten"]["Industrie"][3][2]; //jobtitel of the store owner
	NPC[2]["Beruf"] = datenjson[language]["Daten"]["Industrie"][3][3]; //jobtitel of the smith
	NPC[3]["Beruf"] = datenjson[language]["Daten"]["Industrie"][3][5]; //jobtitel of the cleric
	NPC[4]["Beruf"] = datenjson[language]["Daten"]["Gebäude"][1][Dorf["Gebäude"]["Gebäude"]]; //jobtitel of the NPCd from the special building
	if (Dorf["Gebäude"]["Gebäude"] === 5){ //if the Building is a Monestary, NPC4 is always female.
		NPC[4]["Geschlecht"] = 1;
		NPC[4]["Name"] = namegen(NPC[4]["Volk"], 1);
		genderToString(4);
	}
	NPC[7]["Beruf"] = datenjson[language]["Daten"]["Industrie"][3][4]; //jobtitel of the storehouseworker
	NPC[10]["Beruf"] = datenjson[language]["Daten"]["NPC"][0][8]; //jobtitel of the ArcaneShop owner
	//----------Generate the rest of the Village----------
	generiereTaverne();
	generiereLager();
	generiereDomain();
	generiereUnheil();
	generiereBegegnung();
	generiereArcaneshop();
	//----------Make everything Visible----------
	let y = document.getElementsByClassName('hide');
    y[0].style.display = 'block';
	//----------logging some config info to the console----------
	console.log("Generating Village with the following Parameters: Majority= " + volkwahl + " | Industriy= " + industriewahl + " | LGBTQ+= " + lgbtq) //logge the choosen options
	console.log(NPC); //display the Array with the NPCs to the console
	console.log(Dorf); //display the Array with the Village to the console
	//----------updating the html text that will not change----------
	document.querySelector("#B_AllgemeineInfos").innerHTML = datenjson[language]["Daten"]["Diverses"][1][7];
	document.querySelector("#B_AI_Name").innerHTML = datenjson[language]["Daten"]["Diverses"][1][8];
	document.querySelector("#B_AI_Einwohner").innerHTML = datenjson[language]["Daten"]["Diverses"][1][9];
	document.querySelector("#B_AI_Mehrheit").innerHTML = datenjson[language]["Daten"]["Diverses"][1][10];
	document.querySelector("#B_AI_Industrie").innerHTML = datenjson[language]["Daten"]["Diverses"][1][11];
	document.querySelector("#B_T_Name").innerHTML = datenjson[language]["Daten"]["Diverses"][1][8];
	document.querySelector("#B_T_Typ").innerHTML = datenjson[language]["Daten"]["Diverses"][1][13];
	document.querySelector("#B_T_Karte").innerHTML = datenjson[language]["Daten"]["Diverses"][1][14];
	document.querySelector("#B_Unheil").innerHTML = datenjson[language]["Daten"]["Diverses"][1][15];
	document.querySelector("#B_Zufallsbegebnung").innerHTML = datenjson[language]["Daten"]["Diverses"][1][19];
	document.querySelector("#B_Dorfbewohner").innerHTML = datenjson[language]["Daten"]["Diverses"][1][16];
	document.querySelector("#B_Tempel").innerHTML = datenjson[language]["Daten"]["Diverses"][1][17];
	document.querySelector("#B_T_Domain").innerHTML = datenjson[language]["Daten"]["Gebäude"][7][3];
	document.querySelector("#B_Lagerhaus").innerHTML = datenjson[language]["Daten"]["Diverses"][1][18];
	document.querySelector("#B_Notizen").innerHTML = datenjson[language]["Daten"]["Diverses"][1][20];
	document.querySelector("#B_Arcaneshop").innerHTML = datenjson[language]["Daten"]["Diverses"][1][31];
}
function notizen() {
  let notes = document.getElementById("textarea").value;
  document.getElementById("usertext").innerHTML = notes;
}
function updateHTML(){
	document.querySelector("#dorfname").innerHTML = Dorf["AllgemeineInfos"]["Name"];
	document.querySelector("#einwohner").innerHTML = Dorf["AllgemeineInfos"]["Einwohner"];
	document.querySelector("#mehrheit").innerHTML = Dorf["AllgemeineInfos"]["Volk"];
	document.querySelector("#industrie").innerHTML = Dorf["AllgemeineInfos"]["Industrie"];
	for(i = 0; i < anzahlNPC; ++i){ //fills the NPCs
		let beziehungsNPC = NPC[NPC[i]["BeziehungZu"]]["Beruf"] + " " + NPC[NPC[i]["BeziehungZu"]]["Name"];
		document.querySelector("#nameNPC" + i).innerHTML = NPC[i]["Name"] + " / " + NPC[i]["GeschlechtString"] + " / " + NPC[i]["Volk"] + " / " + NPC[i]["Alter"];
		document.querySelector('#berufNPC' + i).innerHTML = NPC[i]["Beruf"];
		document.querySelector("#aussehenNPC" + i).innerHTML = NPC[i]["Aussehen"] + "  " + NPC[i]["Eigenschaft"];
		document.querySelector("#beziehungNPC" + i).innerHTML = NPC[i]["Beziehung"] + " " + beziehungsNPC;
	}
	if(Dorf["AllgemeineInfos"]["Einwohner"] > 1000){document.querySelector("#texttitel").innerHTML = Dorf["AllgemeineInfos"]["Name"] + datenjson[language]["Daten"]["Diverses"][1][5];}else{document.querySelector("#texttitel").innerHTML = Dorf["AllgemeineInfos"]["Name"] + datenjson[language]["Daten"]["Diverses"][1][4];}
	document.querySelector("#besonderes").innerHTML = Dorf["AllgemeineInfos"]["Besonderes"];
	document.querySelector("#B_DieTaverne").innerHTML = datenjson[language]["Daten"]["Diverses"][1][12] + Dorf["Taverne"]["Name"];
	document.querySelector("#tavernenname").innerHTML = Dorf["Taverne"]["Name"];
	document.querySelector("#tavernentyp").innerHTML = Dorf["Taverne"]["Typ"];
	document.querySelector("#tavernenpreis").innerHTML = Dorf["Taverne"]["Preis"];
	document.querySelector("#tavernemenu0").innerHTML = Dorf["Taverne"]["Menu0"];
	document.querySelector("#tavernemenu1").innerHTML = Dorf["Taverne"]["Menu1"];
	document.querySelector("#tavernemenu2").innerHTML = Dorf["Taverne"]["Menu2"];
	document.querySelector("#tavernemenu3").innerHTML = Dorf["Taverne"]["Menu3"];
	for(i = 2; i <= 5; i++){ //empties the query to generate get guests in the taver a secont time.
		document.querySelector('#berufgast' + i).innerHTML = "";
		document.querySelector('#namegast' + i).innerHTML = "";
	}
	for(i = 2; i <= Dorf["Taverne"]["AnzahlGast"]; ++i){//fills the guests in the tavern.
		document.querySelector('#berufgast' + i).innerHTML = NPC[Dorf["Taverne"]["Gast" + i]]["Beruf"];
		document.querySelector('#namegast' + i).innerHTML = NPC[Dorf["Taverne"]["Gast" + i]]["Name"] + " / " + NPC[Dorf["Taverne"]["Gast" + i]]["Volk"] + " / " + NPC[Dorf["Taverne"]["Gast" + i]]["Alter"];
	}
	document.querySelector("#gasthero").innerHTML = Dorf["Taverne"]["gasthero"]
	document.querySelector("#gebaudetitel").innerHTML = datenjson[language]["Daten"]["Gebäude"][0][Dorf["Gebäude"]["Gebäude"]];
	document.querySelector("#gebaudeA1").innerHTML = Dorf["Gebäude"]["GebäudeA1"];
	document.querySelector("#gebaudeB1").innerHTML = Dorf["Gebäude"]["GebäudeB1"];
	document.querySelector("#gebaudeA2").innerHTML = Dorf["Gebäude"]["GebäudeA2"];
	document.querySelector("#gebaudeB2").innerHTML = Dorf["Gebäude"]["GebäudeB2"];
	document.querySelector("#gebaudeA3").innerHTML = Dorf["Gebäude"]["GebäudeA3"];
	document.querySelector("#gebaudeB3").innerHTML = Dorf["Gebäude"]["GebäudeB3"];
	document.querySelector("#lagerhaus").innerHTML = Dorf["AllgemeineInfos"]["Lagerhaus"];
	document.querySelector("#domain").innerHTML = Dorf["AllgemeineInfos"]["Tempel"];
	document.querySelector("#unheil").innerHTML = Dorf["AllgemeineInfos"]["Unheil"];
	document.querySelector("#begegnung").innerHTML = Dorf["AllgemeineInfos"]["Begegnung"];
}
//---------------------defines all the functions to regenerate every npc individualy-------------------------
function generiereNPC0(){generiereNPC(0); updateHTML();}
function generiereNPC1(){generiereNPC(1); updateHTML();}
function generiereNPC2(){generiereNPC(2); updateHTML();}
function generiereNPC3(){generiereNPC(3); updateHTML();}
function generiereNPC4(){generiereNPC(4); updateHTML();}
function generiereNPC5(){generiereNPC(5); updateHTML();}
function generiereNPC6(){generiereNPC(6); updateHTML();}
function generiereNPC7(){generiereNPC(7); updateHTML();}
function generiereNPC8(){generiereNPC(8); updateHTML();}
function generiereNPC9(){generiereNPC(9); updateHTML();}
function generiereNPC10(){generiereNPC(10); updateHTML();}
document.getElementById("generiereNPC0").onclick = generiereNPC0;
document.getElementById("generiereNPC1").onclick = generiereNPC1;
document.getElementById("generiereNPC2").onclick = generiereNPC2;
document.getElementById("generiereNPC3").onclick = generiereNPC3;
document.getElementById("generiereNPC4").onclick = generiereNPC4;
document.getElementById("generiereNPC5").onclick = generiereNPC5;
document.getElementById("generiereNPC6").onclick = generiereNPC6;
document.getElementById("generiereNPC7").onclick = generiereNPC7;
document.getElementById("generiereNPC8").onclick = generiereNPC8;
document.getElementById("generiereNPC9").onclick = generiereNPC9;
document.getElementById("generiereNPC10").onclick = generiereNPC10;
//-------------------------defines all the functions to regenerate events individualy-------------------------------------
document.querySelector("#B_Titel").innerHTML = datenjson[language]["Daten"]["Diverses"][1][34];
document.querySelector("#B_Infotext").innerHTML = datenjson[language]["Daten"]["Diverses"][1][21] + " " + Dorf["AllgemeineInfos"]["Version"];
document.getElementById("generieredorf").onclick = generiereDorf;
document.getElementById("generiereunheil").onclick = generiereUnheil;
document.getElementById("generiereBegegnung").onclick = generiereBegegnung;
document.getElementById("generiereTaverne").onclick = generiereTaverne;
document.getElementById("generiereGebaude").onclick = generiereGebaude;
document.getElementById("generiereLager").onclick = generiereLager;
document.getElementById("generiereDomain").onclick = generiereDomain;
document.getElementById("generiereArcaneshop").onclick = generiereArcaneshop;
document.getElementById("notizen").onclick = notizen;
document.getElementById("genvillagename").onclick = genvillagename;
document.getElementById("genvillagepop").onclick = genvillagepop;
document.getElementById("genvillageprofile").onclick = genvillageprofile;
});