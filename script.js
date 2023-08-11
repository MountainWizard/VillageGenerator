fetch("./daten.json")
  .then((res) => res.json())
  .then((datenjson) => {
console.log(datenjson);

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
let language = getCookie("userLanguage"); //setze Sprache

document.querySelector("#generieredorf").innerHTML = datenjson[language]["Daten"]["Diverses"][1][27];
document.querySelector("#checkbox1text").innerHTML = datenjson[language]["Daten"]["Diverses"][1][28];
document.querySelector("#industrieconf").innerHTML = datenjson[language]["Daten"]["Diverses"][1][11];
document.querySelector("#mehrheitconf").innerHTML = datenjson[language]["Daten"]["Diverses"][1][10];
document.querySelector("#back").innerHTML = datenjson[language]["Daten"]["Diverses"][1][29];
document.querySelector("#blog").innerHTML = datenjson[language]["Daten"]["Diverses"][1][30];
let NPC = { }; // in diesem Objekt werden alle NPCs gespeichert.
const volkarray = Object.keys(datenjson[language]["Namen"]); //ein array mit allen Völker wird aus dem daten.JSON generiert.
const industriearray = datenjson[language]["Daten"]["Industrie"][0];
const anzahlNPC = 10; //Legt fest wie gross das NPC array ist.
const gewTrans = 20; //gewichtung zu Transcharakter in %
const gewName = 20; //gewichtung von Tavernen und Dorfname dass er vom standart abweicht in %
let lgbtq = false;
let i = 0; //loop durchzähl variable
for(i = 0; i < anzahlNPC; ++i) { //generiert ein Objekt mit den richtigen Präfixes aber ohne Daten.
	NPC[i] = { 'Geschlecht':'', 'Volk':'', 'Name': '', 'Alter':'', 'Beruf':'', 'Aussehen':'', 'Eigenschaft':'', 'Beziehung':'', 'BeziehungZu':''};
}
let volkwahl = document.getElementById("volkwahl");
const mixdrpdwn = document.createElement('option'); //fügt Gemischt zum Dropdown hinzu
mixdrpdwn.text = mixdrpdwn.value = datenjson[language]["Daten"]["Diverses"][1][23];//fügt Gemischt zum Dropdown hinzu
volkwahl.add(mixdrpdwn, 0);//fügt Gemischt zum Dropdown hinzu
for(i = 0; i <= volkarray.length - 1; ++i) { //Generiert das Drop Down Menu zur auswahl vom Volk anhand der einträge in namen.json
    let option1 = document.createElement('option');
    option1.text = option1.value = volkarray[i];
    volkwahl.add(option1, 0);
}
let industriewahl = document.getElementById("industriewahl");
const rnddrpdwn = document.createElement('option');//fügt Zufall zum Dropdown hinzu
rnddrpdwn.text = rnddrpdwn.value = datenjson[language]["Daten"]["Diverses"][1][24];//fügt Zufall zum Dropdown hinzu
industriewahl.add(rnddrpdwn, 0);//fügt Zufall zum Dropdown hinzu
for(i = 1; i <= Object.keys(industriearray).length; ++i) { //Generiert das Drop Down Menu zur auswahl vom Industrie anhand der einträge in daten.json
	let option2 = document.createElement('option');
    option2.text = option2.value = industriearray[i];
    industriewahl.add(option2, 0);
}
//---------------------------------------------------------------------
function randnumber(min, max) { //generiert eine Zufallszahl zwischen min und max.
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
function getKeyByValue(object, value) { //Finde den Objektschlüssel anhand des werts.
  return Object.keys(object).find(key => object[key] === value);
}
function namegen(volk, geschlecht) { //generiert ein name für einen NPC nach volk und Geschlecht 0 = Männlich, 1 = Weiblich
	if (volk === volkarray[4]) { //prüft die Spezialfälle für Halbelfen und Gnome
		return datenjson[language]["Namen"][volk][geschlecht][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][geschlecht]).length)] + " " + datenjson[language]["Namen"][volk][2][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][2]).length)] + " " + datenjson[language]["Namen"][volk][3][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][3]).length)] + " " + datenjson[language]["Namen"][volk][3][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][3]).length)];
	}else if(volk === volkarray[6]){
		if (randnumber(0, 99 > 50)){
			//menschen vorname elfen nachname
			return datenjson[language]["Namen"][volkarray[0]][geschlecht][randnumber(1,Object.keys(datenjson[language]["Namen"][volkarray[0]][geschlecht]).length)] + " " + datenjson[language]["Namen"][volkarray[5]][2][randnumber(1,Object.keys(datenjson[language]["Namen"][volkarray[5]][2]).length)];
		}else{
			//elfen vorname menschen nachname
			return datenjson[language]["Namen"][volkarray[5]][geschlecht][randnumber(1,Object.keys(datenjson[language]["Namen"][volkarray[5]][geschlecht]).length)] + " " + datenjson[language]["Namen"][volkarray[0]][2][randnumber(1,Object.keys(datenjson[language]["Namen"][volkarray[0]][2]).length)];
		}
	}else{
		return datenjson[language]["Namen"][volk][geschlecht][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][geschlecht]).length)] + " " + datenjson[language]["Namen"][volk][2][randnumber(1,Object.keys(datenjson[language]["Namen"][volk][2]).length)];
	}
}
function genExternNPC(held, volk){ //generiert einen NPC der nicht im Dorf heimisch ist als Textstring. Dieser wird nichts ins Array eingetragen. ist held = true, wird der Beruf Abenteurer und es wird eine Klasse und ein leven hinzugefügt. Das volk ist die nummer im Volkarray. Ist diese "z" so ist es zufällig.
	let npcstring = "";
	let geschlechtname = 0;
	let geschlecht = 0;
	if (volk === "z"){
		volk = volkarray[randnumber(0, volkarray.length-1)]; //wenn volk <0 dann zufälliges Volk.
	}else{
		volk = volkarray[volk]
	}
	if (lgbtq === true){geschlecht = randnumber(0,Object.keys(datenjson[language]["Daten"]["NPC"][6]).length - 1)}else{geschlecht = randnumber(0,1)}//Geschlecht vom Helden
	if (lgbtq === true && geschlecht > 1){geschlechtname = randnumber(0,1)}else{geschlechtname = geschlecht} //für andere Gender zufällig eine männlichen oder Weiblichen Namen generieren.
	if (lgbtq === true && geschlecht < 2 && randnumber(1,100)<gewTrans){geschlecht = datenjson[language]["Daten"]["Diverses"][1][22] + datenjson[language]["Daten"]["NPC"][6][geschlecht + 1]}else{geschlecht = datenjson[language]["Daten"]["NPC"][6][geschlecht + 1]}
	if (held === true){
		npcstring = datenjson[language]["Daten"]["Industrie"][3][6]+" "+namegen(volk, geschlechtname)+ " / " + volk + " / " + geschlecht + " / " + datenjson[language]["Daten"]["NPC"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["NPC"][0]).length)] + " " + datenjson[language]["Daten"]["Diverses"][1][6] + randnumber(5,15);
	}else{
		npcstring = datenjson[language]["Daten"]["Industrie"][1][5]+" "+namegen(volk, geschlechtname)+ " / " + volk + " / " + geschlecht + " / " + datenjson[language]["Daten"]["Diverses"][1][6] + randnumber(5,15);
	}	
	return npcstring
}
function generiereUnheil(){
	let unheil = datenjson[language]["Daten"]["Events"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Events"][0]).length)] //sucht sich ein Event aus.
	unheil = replaceWORD(unheil);
	datenjson["Dorf"]["AllgemeineInfos"]["Unheil"] = unheil;
	updateHTML();
}
function generiereBegegnung(){
	let begegnung = datenjson[language]["Daten"]["Events"][1][randnumber(1,Object.keys(datenjson[language]["Daten"]["Events"][1]).length)] //sucht sich ein Event aus.
	begegnung = replaceWORD(begegnung);
	datenjson["Dorf"]["AllgemeineInfos"]["Begegnung"] = begegnung;
	updateHTML();
}
function replaceWORD(string){ //ersetzt die FETT geschreibenen worte. muss immer ein " " am ende haben
	let rndnr = randnumber(0, anzahlNPC-1); //generiert eine zufallszahl für das aussuchen des NPCs.
	string = string.replace("NPC ", NPC[rndnr]["Beruf"] + " " + NPC[rndnr]["Name"] + " "); //ersetzt NPC durch einen Zufälligen NPC.
	string = string.replace("NPC0 ", NPC[0]["Beruf"] + " " + NPC[0]["Name"] + " "); //ersetzt NPC0 durch den Anführer
	string = string.replace("NPC4 ", NPC[4]["Beruf"] + " " + NPC[4]["Name"] + " "); //ersetzt NPC4
	string = string.replace("RND ", randnumber(2,9) + " "); //ersetzt RND mit einer zufälligen Zahl.
	string = string.replace("HELD ", genExternNPC(true,"z") + " "); //ersetzt HELD mit einem Zufälligen Helden.
	string = string.replace("BLDG ", datenjson[language]["Daten"]["Gebäude"][0][datenjson["Dorf"]["Gebäude"]["Gebäude"]] + " "); //ersetzt BLDG mit dem Gebäude.
	string = string.replace("INDUSTRIE ", datenjson["Dorf"]["AllgemeineInfos"]["Industrie"] + " ");
	return string;
}
function generiereTaverne(){
	let oldNPC = NPC[6]["Beruf"] + " " + NPC[6]["Name"]+" ";
	if (randnumber(1,100) < gewName){ //Tavernenname % chance auf dass es nur "Zum: datenjson[language]["Daten"]["Taverne"][1]
		datenjson["Dorf"]["Taverne"]["Name"] = datenjson[language]["Daten"]["Diverses"][1][1] + datenjson[language]["Daten"]["Taverne"][1][randnumber(1,Object.keys(datenjson[language]["Daten"]["Taverne"][1]).length)];
	}else{
		datenjson["Dorf"]["Taverne"]["Name"] = datenjson[language]["Daten"]["Taverne"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Taverne"][0]).length)] + " " + datenjson[language]["Daten"]["Taverne"][1][randnumber(1,Object.keys(datenjson[language]["Daten"]["Taverne"][1]).length)];
	}
	datenjson["Dorf"]["Taverne"]["Typ"] = datenjson[language]["Daten"]["Taverne"][2][randnumber(1,Object.keys(datenjson[language]["Daten"]["Taverne"][2]).length)]; //bestimmt des Tavernentyp
	datenjson["Dorf"]["Taverne"]["Preis"] = datenjson[language]["Daten"]["Diverses"][1][2] + randnumber(5,10) + " " + datenjson[language]["Daten"]["Diverses"][0][2] + " / " + randnumber(1,4) + " " + datenjson[language]["Daten"]["Diverses"][0][3] + datenjson[language]["Daten"]["Diverses"][1][3]; //übernachtungspreis / lebenskosten pro tag
	NPC[5]["Beruf"] = datenjson[language]["Daten"]["Industrie"][3][1]; //jobtitel vom Wirt
	if (getKeyByValue(datenjson[language]["Daten"]["Taverne"][2], datenjson["Dorf"]["Taverne"]["Typ"]) < 4){ //Türsteher
			NPC[6]["Beruf"] = datenjson[language]["Daten"]["Taverne"][9][4];
		}else if(getKeyByValue(datenjson[language]["Daten"]["Taverne"][2], datenjson["Dorf"]["Taverne"]["Typ"]) < 6){ //Bordell
			NPC[6]["Beruf"] = datenjson[language]["Daten"]["Taverne"][9][3];
			NPC[6]["Geschlecht"] = 1;
			NPC[6]["Alter"] = datenjson[language]["Daten"]["NPC"][1][2];
			NPC[6]["Name"] = namegen(NPC[6]["Volk"], 1);
		}else if(getKeyByValue(datenjson[language]["Daten"]["Taverne"][2], datenjson["Dorf"]["Taverne"]["Typ"]) < 8){ //Glückspieler
			NPC[6]["Beruf"] = datenjson[language]["Daten"]["Taverne"][9][2];
		}else if(getKeyByValue(datenjson[language]["Daten"]["Taverne"][2], datenjson["Dorf"]["Taverne"]["Typ"]) < 10){ //Musik
			NPC[6]["Beruf"] = datenjson[language]["Daten"]["Taverne"][9][1];
		}else{
			NPC[6]["Beruf"] = datenjson[language]["Daten"]["Industrie"][1][getKeyByValue(datenjson[language]["Daten"]["Industrie"][0], datenjson["Dorf"]["AllgemeineInfos"]["Industrie"])];
	}
	for(let i = 0; i < 4; ++i){ //leere das die Menus
		datenjson["Dorf"]["Taverne"]["Menu" + i] = "";
	}
	for(let i = 2; i < 6; ++i){ //leere die Gäste
		datenjson["Dorf"]["Taverne"]["Gast" + i] = "";
	}
	datenjson["Dorf"]["Taverne"]["AnzahlMenu"] = randnumber(2, 4); //bestimmt die anzahl Menus in der Taverne
	datenjson["Dorf"]["Taverne"]["AnzahlGast"] = randnumber(2, 5); //bestimmt die anzahl Gäste in der Taverne
	let menuselector = 0 //setzt den wert damit das programm weiss woher er die Menus nehmen soll. Abhängig vom Volk des Wirts.
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
	for(i = 0; i < datenjson["Dorf"]["Taverne"]["AnzahlMenu"]; ++i){ //generiere die Menus
		datenjson["Dorf"]["Taverne"]["Menu" + i] = datenjson[language]["Daten"]["Taverne"][menuselector][randnumber(1, Object.keys(datenjson[language]["Daten"]["Taverne"][menuselector]).length)]+ " " + datenjson[language]["Daten"]["Taverne"][8][randnumber(1, Object.keys(datenjson[language]["Daten"]["Taverne"][8]).length)] + " " + datenjson[language]["Daten"]["Taverne"][7][randnumber(1, Object.keys(datenjson[language]["Daten"]["Taverne"][7]).length)] + " / " + randnumber(5,20) + " " + datenjson[language]["Daten"]["Diverses"][0][1];
	}
	for(i = 2; i < datenjson["Dorf"]["Taverne"]["AnzahlGast"]+1; ++i){ //Generiere die Gäste ab Gast2
		let gastwahl = randnumber(0,Object.keys(NPC).length - 1); //wählt ein NPC aus.
		for (let y = 1; y < i; ++y){ //überprüft ob die generierte zahl vorher schon mal vorkommt. Wenn ja y-1 und nochmals eine zahl generieren.
			if (gastwahl === datenjson["Dorf"]["Taverne"]["Gast"+y]){
				gastwahl = randnumber(0,Object.keys(NPC).length - 1);
				y = y - 1;
			}else if (gastwahl === 5){ //NPC5 ist bereits in der Taverne.
				gastwahl = randnumber(0,Object.keys(NPC).length - 1);
				y = y - 1;
			}else if (gastwahl === 6){ //NPC6 ist bereits in der Taverne.
				gastwahl = randnumber(0,Object.keys(NPC).length - 1);
				y = y - 1;
			}else{
				datenjson["Dorf"]["Taverne"]["Gast"+i] = gastwahl; //wenn alles ok schreibe den Gast ins Objekt
				}
				
		}
	}
	
	datenjson["Dorf"]["AllgemeineInfos"]["Begegnung"] = datenjson["Dorf"]["AllgemeineInfos"]["Begegnung"].replace(oldNPC, NPC[6]["Beruf"] + " " + NPC[6]["Name"] + " "); //ersetzt den alte NPC mit dem neuen in Begegnung.
	datenjson["Dorf"]["AllgemeineInfos"]["Unheil"] = datenjson["Dorf"]["AllgemeineInfos"]["Unheil"].replace(oldNPC, NPC[6]["Beruf"] + " " + NPC[6]["Name"] + " "); //ersetzt den alte NPC mit dem neuen in Unheil.
	datenjson["Dorf"]["AllgemeineInfos"]["Lagerhaus"] = datenjson["Dorf"]["AllgemeineInfos"]["Lagerhaus"].replace(oldNPC, NPC[6]["Beruf"] + " " + NPC[6]["Name"] + " ");//ersetzt den NPC im Lager.
	updateHTML();
}
function generiereLager(){
	datenjson["Dorf"]["AllgemeineInfos"]["Lagerhaus"] = datenjson[language]["Daten"]["Gebäude"][3][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][3]).length)];
	datenjson["Dorf"]["AllgemeineInfos"]["Lagerhaus"] = replaceWORD(datenjson["Dorf"]["AllgemeineInfos"]["Lagerhaus"]);
	updateHTML();
}
function generiereDomain(){
	datenjson["Dorf"]["AllgemeineInfos"]["Tempel"] = datenjson[language]["Daten"]["Gebäude"][2][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][2]).length)];
	updateHTML()
}
function generiereGebaude(){
	let oldBldg = datenjson[language]["Daten"]["Gebäude"][0][datenjson["Dorf"]["Gebäude"]["Gebäude"]]+" "; //schreibt das alte gebäude in oldBldg
	let oldNPC = NPC[4]["Beruf"] + " " + NPC[4]["Name"]+" ";
	let [hatWasser, hatKloster, hatBurg, istkurort] = [false,false,false,false] //stelle fest ob gewisse Keywörter im Dorfnamen sind.
	let rndnr = randnumber(1, Object.keys(NPC).length - 1); //sucht einen zufälligen NPC aus.
	datenjson["Dorf"]["AllgemeineInfos"]["Name"].search(datenjson[language]["Daten"]["Dorfname"][1][2]) >= 0 && (hatWasser = true);//prüft auf Fluss in Dorfname
	datenjson["Dorf"]["AllgemeineInfos"]["Name"].search(datenjson[language]["Daten"]["Dorfname"][1][12]) >= 0 && (hatWasser = true);//prüft auf Bucht in Dorfname
	datenjson["Dorf"]["AllgemeineInfos"]["Name"].search(datenjson[language]["Daten"]["Dorfname"][1][17]) >= 0 && (hatWasser = true);//prüft auf See in Dorfname
	datenjson["Dorf"]["AllgemeineInfos"]["Name"].search(datenjson[language]["Daten"]["Dorfname"][1][15]) >= 0 && (hatKloster = true);//prüft auf Kloster in Dorfname
	datenjson["Dorf"]["AllgemeineInfos"]["Name"].search(datenjson[language]["Daten"]["Dorfname"][1][5]) >= 0 && (hatBurg = true);////prüft auf Burg in Dorfname
	datenjson["Dorf"]["AllgemeineInfos"]["Industrie"].search(datenjson[language]["Daten"]["Industrie"][0][8]) >= 0 && (istkurort = true);////prüft auf Kurort in Industrie
	if (istkurort === true){
		datenjson["Dorf"]["Gebäude"]["Gebäude"] = randnumber(8,9); //generiert Bad oder Kurhotel wenn istkurort = true
	}else if(hatKloster === true){
		datenjson["Dorf"]["Gebäude"]["Gebäude"] = 5; //generiert Kloster wenn hatKloster = true
	}else if(hatBurg === true){
		datenjson["Dorf"]["Gebäude"]["Gebäude"] = 4; //generiert Burg wenn hatBurg = true
	}else if(hatWasser === true){
		datenjson["Dorf"]["Gebäude"]["Gebäude"] = randnumber(1, 3); //generiert hafen, fähre, oder Brücke wenn wasser = true
	}else{
		datenjson["Dorf"]["Gebäude"]["Gebäude"] = randnumber(1, Object.keys(datenjson[language]["Daten"]["Gebäude"][0]).length);
	}
	//----------Generiere Zusatzinfos für das Gebäude----------
	for(i = 1; i <= 3; ++i){ //leert die alten einträge
			datenjson["Dorf"]["Gebäude"]["GebäudeA"+i] = "";
			datenjson["Dorf"]["Gebäude"]["GebäudeB"+i] = "";
		}
	if(datenjson["Dorf"]["Gebäude"]["Gebäude"] === 1){//Hafen
		for(let i = 1; i <= randnumber(1,3); ++i){ //viel viele schiffe sind anwesend, wie heissen diese und was haben sie geladen?
			datenjson["Dorf"]["Gebäude"]["GebäudeA"+i] = datenjson[language]["Daten"]["Gebäude"][7][2] + datenjson[language]["Daten"]["Gebäude"][5][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][5]).length)] + " " + datenjson[language]["Daten"]["Gebäude"][6][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][6]).length)]; //generiert Schiffsnamen
			let npcjobname = NPC[rndnr]["Beruf"] + " " + NPC[rndnr]["Name"]; //wählt NPC der im Schiff zu finden ist.
			rndnr = randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][3]).length); //generiert eine zufallszahl für das aussuchen der Fracht.
			if(rndnr === 8){datenjson["Dorf"]["Gebäude"]["GebäudeB"+i] = datenjson["Dorf"]["AllgemeineInfos"]["Industrie"] + datenjson[language]["Daten"]["Gebäude"][3][rndnr]}else if(rndnr === 9){datenjson["Dorf"]["Gebäude"]["GebäudeB"+i] = npcjobname + datenjson[language]["Daten"]["Gebäude"][3][rndnr]}else{datenjson["Dorf"]["Gebäude"]["GebäudeB"+i] = datenjson[language]["Daten"]["Gebäude"][3][rndnr]}

		}
	}
	if(datenjson["Dorf"]["Gebäude"]["Gebäude"] === 2 ||datenjson["Dorf"]["Gebäude"]["Gebäude"] === 3){//Fähre oder Brücke
		datenjson["Dorf"]["Gebäude"]["GebäudeA1"] = datenjson[language]["Daten"]["Gebäude"][7][1];
		datenjson["Dorf"]["Gebäude"]["GebäudeB1"] = randnumber(1,8) + " " + datenjson[language]["Daten"]["Diverses"][0][1]; //wie viel kostet die überfahrt
	}
	if(datenjson["Dorf"]["Gebäude"]["Gebäude"] === 5){//Kloster
		datenjson["Dorf"]["Gebäude"]["GebäudeA1"] = datenjson[language]["Daten"]["Gebäude"][7][3];
		datenjson["Dorf"]["Gebäude"]["GebäudeB1"] = datenjson[language]["Daten"]["Gebäude"][2][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][2]).length)]; //welche Domain hat das Kloster?
	}
	if(datenjson["Dorf"]["Gebäude"]["Gebäude"] === 7){//Ruinen
		datenjson["Dorf"]["Gebäude"]["GebäudeA1"] = datenjson[language]["Daten"]["Gebäude"][7][4];
		datenjson["Dorf"]["Gebäude"]["GebäudeB1"] = datenjson[language]["Daten"]["Gebäude"][4][randnumber(1,Object.keys(datenjson[language]["Daten"]["Gebäude"][4]).length)]; //was sind das für ruinen?
	}
	NPC[4]["Beruf"] = datenjson[language]["Daten"]["Gebäude"][1][datenjson["Dorf"]["Gebäude"]["Gebäude"]]; //jobtitel vom NPCdes Spezialgebäudes
	if (datenjson["Dorf"]["Gebäude"]["Gebäude"] === 5){ //wenn Gebäude = Kloster NPC 4 ist Weiblich.
		NPC[4]["Geschlecht"] = 1;
		NPC[4]["Name"] = namegen(NPC[4]["Volk"], 1);
	}
	console.log("Wasser:"+hatWasser+" | Kloster:"+hatKloster+" | Burg:"+hatBurg+" | Kurort:"+istkurort);
	
	datenjson["Dorf"]["AllgemeineInfos"]["Unheil"] =  datenjson["Dorf"]["AllgemeineInfos"]["Unheil"].replace(oldBldg, datenjson[language]["Daten"]["Gebäude"][0][datenjson["Dorf"]["Gebäude"]["Gebäude"]]+" "); //ersetzt das alte mit dem neuen Gebäude in Unheil.
	datenjson["Dorf"]["AllgemeineInfos"]["Begegnung"] = datenjson["Dorf"]["AllgemeineInfos"]["Begegnung"].replace(oldNPC, NPC[4]["Beruf"] + " " + NPC[4]["Name"] + " "); //ersetzt den alte NPC mit dem neuen in Begegnung.
	datenjson["Dorf"]["AllgemeineInfos"]["Unheil"] = datenjson["Dorf"]["AllgemeineInfos"]["Unheil"].replace(oldNPC, NPC[4]["Beruf"] + " " + NPC[4]["Name"] + " "); //ersetzt den alte NPC mit dem neuen in Unheil.
	datenjson["Dorf"]["AllgemeineInfos"]["Lagerhaus"] = datenjson["Dorf"]["AllgemeineInfos"]["Lagerhaus"].replace(oldNPC, + NPC[4]["Beruf"] + " " + NPC[4]["Name"] + " ");//ersetzt den NPC im Lager.
	updateHTML();
}
function generiereNPC(nr){
	let oldNPC = NPC[nr]["Beruf"] + " " + NPC[nr]["Name"] + " ";
	if (document.getElementById("checkbox1").checked === true){lgbtq = true;}else{lgbtq = false};
	let volkwahl = document.getElementById("volkwahl").value;
	let volk = "";
	let NPCBeziehungNr = -1
	let geschlechtnamegen = 0; //macht aus der zahl des geschlechts ein string anhand des eintrags im data.json.
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
	}while (NPCBeziehungNr === nr); //überprüft, damit der NPC keine beziehung zu sich selbst hat.
	if (lgbtq === true){NPC[nr]["Geschlecht"] = randnumber(0,Object.keys(datenjson[language]["Daten"]["NPC"][6]).length - 1)}else{NPC[nr]["Geschlecht"] = randnumber(0,1)}//Geschlecht vom NPC
	NPC[nr]["Volk"] = volk;
	if(NPC[nr]["Geschlecht"] > 1){geschlechtnamegen = randnumber(0,1)}else{geschlechtnamegen = NPC[nr]["Geschlecht"]} //falls das geschlecht von männlich und weiblich abweicht, so wird der name entweder männlich oder weiblich. Je nach dem.
	NPC[nr]["Name"] = namegen(volk, geschlechtnamegen);
	NPC[nr]["Alter"] = datenjson[language]["Daten"]["NPC"][1][randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][1]).length)];
	NPC[nr]["Eigenschaft"] = datenjson[language]["Daten"]["NPC"][3][randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][3]).length)];
	if (lgbtq === false && NPC[nr]["Geschlecht"] === NPC[NPCBeziehungNr]["Geschlecht"]){ 
		NPC[nr]["Beziehung"] = datenjson[language]["Daten"]["NPC"][5][randnumber(6, Object.keys(datenjson[language]["Daten"]["NPC"][5]).length)] //keine gleichgeschlechtliche Beziehungen.
	}else{
		NPC[nr]["Beziehung"] = datenjson[language]["Daten"]["NPC"][5][randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][5]).length)]
	}
	NPC[nr]["BeziehungZu"] = NPCBeziehungNr;
	let rndnr = randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][4]).length); //generiert die zahl für das aussehen
	let ending = "";
	NPC[nr]["Aussehen"] = datenjson[language]["Daten"]["NPC"][4][randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][4]).length)]; //wählt das aussehen anhand der rndnr.
	if (datenjson["Dorf"]["Gebäude"]["Gebäude"] === 5){ //wenn Gebäude = Kloster NPC 4 ist Weiblich.
		if (nr === 4){
			NPC[4]["Geschlecht"] = 1;
			NPC[4]["Name"] = namegen(NPC[4]["Volk"], 1);
		}
	}
	if (datenjson["Dorf"]["Taverne"]["Typ"] === datenjson[language]["Daten"]["Taverne"][2][4]||datenjson["Dorf"]["Taverne"]["Typ"] === datenjson[language]["Daten"]["Taverne"][2][5]){ //wenn Taverne = Bordell oder Badehaus.
		if (nr === 6){
			NPC[6]["Geschlecht"] = 1;
			NPC[6]["Alter"] = datenjson[language]["Daten"]["NPC"][1][2];
			NPC[6]["Name"] = namegen(NPC[6]["Volk"], 1);
		}
	}
	//ersetzt gewisse worte
	if (rndnr === 23){ending = datenjson[language]["Daten"]["Diverses"][1][25]}else{ending = datenjson[language]["Daten"]["Diverses"][1][26];} //bestimmt die endung für die Farbe.
	NPC[nr]["Aussehen"] = NPC[nr]["Aussehen"].replace("FARBE", datenjson[language]["Daten"]["NPC"][2][randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][2]).length)] + ending); //ersetzt das Wort FARBE.
	NPC[nr]["Eigenschaft"] = NPC[nr]["Eigenschaft"].replace("VOLK", volkarray[randnumber(0, volkarray.length-1)]); //ersetzt das Wort VOLK in der eigenschaft
	NPC[nr]["Beziehung"] = NPC[nr]["Beziehung"].replace("GELD", randnumber(1,50) + " " + datenjson[language]["Daten"]["Diverses"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Diverses"][0]).length)]); //ersetzt das Wort GELD
	datenjson["Dorf"]["AllgemeineInfos"]["Unheil"] = datenjson["Dorf"]["AllgemeineInfos"]["Unheil"].replace(oldNPC, NPC[nr]["Beruf"] + " " + NPC[nr]["Name"] + " "); //ersetzt den alte NPC mit dem neuen in Unheil.
	datenjson["Dorf"]["AllgemeineInfos"]["Begegnung"] = datenjson["Dorf"]["AllgemeineInfos"]["Begegnung"].replace(oldNPC, NPC[nr]["Beruf"] + " " + NPC[nr]["Name"] + " "); //ersetzt den alte NPC mit dem neuen in Begegnung.
	datenjson["Dorf"]["AllgemeineInfos"]["Lagerhaus"] = datenjson["Dorf"]["AllgemeineInfos"]["Lagerhaus"].replace(oldNPC, NPC[nr]["Beruf"] + " " + NPC[nr]["Name"] + " ");//ersetzt den NPC im Lager.
}
function generiereDorf(){
	let volkwahl = document.getElementById("volkwahl").value;
	let industriewahl = document.getElementById("industriewahl").value;
	datenjson["Dorf"]["AllgemeineInfos"]["Name"] = datenjson[language]["Daten"]["Dorfname"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Dorfname"][0]).length)] + datenjson[language]["Daten"]["Dorfname"][1][randnumber(1,Object.keys(datenjson[language]["Daten"]["Dorfname"][1]).length)]; //definiert den Dorfnamen
	datenjson["Dorf"]["AllgemeineInfos"]["Einwohner"] = randnumber(40, 1500);
	if (industriewahl === datenjson[language]["Daten"]["Diverses"][1][24]){ //bestimmt die Nummer der Industrie. 
		datenjson["Dorf"]["AllgemeineInfos"]["Industrie"] = datenjson[language]["Daten"]["Industrie"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Industrie"][0]).length)];
	}else{
		datenjson["Dorf"]["AllgemeineInfos"]["Industrie"] = industriewahl;
	}
	datenjson["Dorf"]["AllgemeineInfos"]["Volk"] = volkwahl;
	datenjson["Dorf"]["AllgemeineInfos"]["Besonderes"] = datenjson[language]["Daten"]["Dorfname"][2][randnumber(1,Object.keys(datenjson[language]["Daten"]["Dorfname"][2]).length)];
	//----------Fülle das NPC Objekt----------
	for(i = 0; i < anzahlNPC; ++i){
		generiereNPC(i)
		NPC[i]["Beruf"] = datenjson[language]["Daten"]["Industrie"][1][getKeyByValue(datenjson[language]["Daten"]["Industrie"][0], datenjson["Dorf"]["AllgemeineInfos"]["Industrie"])]; //fülle mit Arbeiter fürs erste.
	}
	for(i = 0; i < anzahlNPC; ++i){
		if (lgbtq === false && NPC[i]["Geschlecht"] === NPC[NPC[i]["BeziehungZu"]]["Geschlecht"]){ 
			NPC[i]["Beziehung"] = datenjson[language]["Daten"]["NPC"][5][randnumber(6, Object.keys(datenjson[language]["Daten"]["NPC"][5]).length)] //keine gleichgeschlechtliche Beziehungen.
			
		}else{
			NPC[i]["Beziehung"] = datenjson[language]["Daten"]["NPC"][5][randnumber(1, Object.keys(datenjson[language]["Daten"]["NPC"][5]).length)]
		}
		NPC[i]["Beziehung"] = NPC[i]["Beziehung"].replace("GELD", randnumber(1,50) + " " + datenjson[language]["Daten"]["Diverses"][0][randnumber(1,Object.keys(datenjson[language]["Daten"]["Diverses"][0]).length)]); //ersetzt das Wort GELD
	}
	//----------Generiere Berufe----------
	generiereGebaude();
		NPC[0]["Beruf"] = datenjson[language]["Daten"]["Industrie"][2][getKeyByValue(datenjson[language]["Daten"]["Industrie"][0], datenjson["Dorf"]["AllgemeineInfos"]["Industrie"])]; //jobtitel vom Anführer
		NPC[1]["Beruf"] = datenjson[language]["Daten"]["Industrie"][3][2]; //jobtitel vom Ladenbesitzer
		NPC[2]["Beruf"] = datenjson[language]["Daten"]["Industrie"][3][3]; //jobtitel vom Schmid
		NPC[3]["Beruf"] = datenjson[language]["Daten"]["Industrie"][3][5]; //jobtitel vom Kleriker
		NPC[4]["Beruf"] = datenjson[language]["Daten"]["Gebäude"][1][datenjson["Dorf"]["Gebäude"]["Gebäude"]]; //jobtitel vom NPCdes Spezialgebäudes
		if (datenjson["Dorf"]["Gebäude"]["Gebäude"] === 5){ //wenn Gebäude = Kloster NPC 4 ist Weiblich.
			NPC[4]["Geschlecht"] = 1;
			NPC[4]["Name"] = namegen(NPC[4]["Volk"], 1);
		}
		NPC[7]["Beruf"] = datenjson[language]["Daten"]["Industrie"][3][4]; //jobtitel vom Lagerarbeiter
	//----------Generiere das Restliche Dorf----------
	generiereTaverne();
	generiereLager();
	generiereDomain();
	generiereUnheil();
	generiereBegegnung();
	//----------Mach den rest sichtbar----------
	let y = document.getElementsByClassName('hide');
    y[0].style.display = 'block';
	console.log("Generiere Dorf mit folgenden Parameter: Volk= " + volkwahl + " | Industrie= " + industriewahl + " | LGBTQ+= " + lgbtq) //logge die optionen
	console.log("Gewichtung Tavernennamen: " + gewName + "% | Gewichtung Trans-Charakter= " + gewTrans + "%") //logge die optionen
	console.log(NPC); //logge das array mit den NPCs.
	console.log(datenjson["Dorf"]);
	if(datenjson["Dorf"]["AllgemeineInfos"]["Einwohner"] > 1000){document.querySelector("#texttitel").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Name"] + datenjson[language]["Daten"]["Diverses"][1][5];}else{document.querySelector("#texttitel").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Name"] + datenjson[language]["Daten"]["Diverses"][1][4];}
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
	document.querySelector("#dorfname").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Name"];
	document.querySelector("#einwohner").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Einwohner"];
	document.querySelector("#mehrheit").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Volk"];
	document.querySelector("#industrie").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Industrie"];
	document.querySelector("#besonderes").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Besonderes"];
}
function notizen() {
  let notes = document.getElementById("textarea").value;
  document.getElementById("usertext").innerHTML = notes;
}
function updateHTML(){
	let geschlecht = "";
	for(i = 0; i < anzahlNPC; ++i){ //fülle die NPCs ab
		let beziehungsNPC = NPC[NPC[i]["BeziehungZu"]]["Beruf"] + " " + NPC[NPC[i]["BeziehungZu"]]["Name"];
		if (lgbtq === true && NPC[i]["Geschlecht"] < 2 && randnumber(1,100)<gewTrans){geschlecht = datenjson[language]["Daten"]["Diverses"][1][22] + datenjson[language]["Daten"]["NPC"][6][NPC[i]["Geschlecht"]+1]}else{geschlecht = datenjson[language]["Daten"]["NPC"][6][NPC[i]["Geschlecht"]+1]}//macht aus der nummer im Geschlecht einen String. Das +1 wird benötigt da im json männlich 1 ist und um code steht 0 für Männlich. Falls lgbtq aktiv besteht eine x% chance ein trans vor einem cis geschlecht zu haben.
		document.querySelector("#nameNPC" + i).innerHTML = NPC[i]["Name"] + " / " + geschlecht + " / " + NPC[i]["Volk"] + " / " + NPC[i]["Alter"];
		document.querySelector('#berufNPC' + i).innerHTML = NPC[i]["Beruf"];
		document.querySelector("#aussehenNPC" + i).innerHTML = NPC[i]["Aussehen"] + "  " + NPC[i]["Eigenschaft"];
		document.querySelector("#beziehungNPC" + i).innerHTML = NPC[i]["Beziehung"] + " " + beziehungsNPC;
	}
	document.querySelector("#B_DieTaverne").innerHTML = datenjson[language]["Daten"]["Diverses"][1][12] + datenjson["Dorf"]["Taverne"]["Name"];
	document.querySelector("#tavernenname").innerHTML = datenjson["Dorf"]["Taverne"]["Name"];
	document.querySelector("#tavernentyp").innerHTML = datenjson["Dorf"]["Taverne"]["Typ"];
	document.querySelector("#tavernenpreis").innerHTML = datenjson["Dorf"]["Taverne"]["Preis"];
	document.querySelector("#tavernemenu0").innerHTML = datenjson["Dorf"]["Taverne"]["Menu0"];
	document.querySelector("#tavernemenu1").innerHTML = datenjson["Dorf"]["Taverne"]["Menu1"];
	document.querySelector("#tavernemenu2").innerHTML = datenjson["Dorf"]["Taverne"]["Menu2"];
	document.querySelector("#tavernemenu3").innerHTML = datenjson["Dorf"]["Taverne"]["Menu3"];
	for(i = 2; i <= 5; i++){ //leere die querys für einen zweiten Durchlauf
		document.querySelector('#berufgast' + i).innerHTML = "";
		document.querySelector('#namegast' + i).innerHTML = "";
	}
	for(i = 2; i <= datenjson["Dorf"]["Taverne"]["AnzahlGast"]; ++i){//fülle die gäste in der Taverne
		document.querySelector('#berufgast' + i).innerHTML = NPC[datenjson["Dorf"]["Taverne"]["Gast" + i]]["Beruf"];
		document.querySelector('#namegast' + i).innerHTML = NPC[datenjson["Dorf"]["Taverne"]["Gast" + i]]["Name"] + " / " + NPC[datenjson["Dorf"]["Taverne"]["Gast" + i]]["Volk"] + " / " + NPC[datenjson["Dorf"]["Taverne"]["Gast" + i]]["Alter"];
	}
	document.querySelector("#gebaudetitel").innerHTML = datenjson[language]["Daten"]["Gebäude"][0][datenjson["Dorf"]["Gebäude"]["Gebäude"]];
	document.querySelector("#gebaudeA1").innerHTML = datenjson["Dorf"]["Gebäude"]["GebäudeA1"];
	document.querySelector("#gebaudeB1").innerHTML = datenjson["Dorf"]["Gebäude"]["GebäudeB1"];
	document.querySelector("#gebaudeA2").innerHTML = datenjson["Dorf"]["Gebäude"]["GebäudeA2"];
	document.querySelector("#gebaudeB2").innerHTML = datenjson["Dorf"]["Gebäude"]["GebäudeB2"];
	document.querySelector("#gebaudeA3").innerHTML = datenjson["Dorf"]["Gebäude"]["GebäudeA3"];
	document.querySelector("#gebaudeB3").innerHTML = datenjson["Dorf"]["Gebäude"]["GebäudeB3"];
	document.querySelector("#lagerhaus").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Lagerhaus"];
	document.querySelector("#domain").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Tempel"];
	document.querySelector("#unheil").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Unheil"];
	document.querySelector("#begegnung").innerHTML = datenjson["Dorf"]["AllgemeineInfos"]["Begegnung"];
}
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
document.querySelector("#B_Infotext").innerHTML = datenjson[language]["Daten"]["Diverses"][1][21];
document.getElementById("generieredorf").onclick = generiereDorf;
document.getElementById("generiereunheil").onclick = generiereUnheil;
document.getElementById("generiereBegegnung").onclick = generiereBegegnung;
document.getElementById("generiereTaverne").onclick = generiereTaverne;
document.getElementById("generiereGebaude").onclick = generiereGebaude;
document.getElementById("generiereLager").onclick = generiereLager;
document.getElementById("generiereDomain").onclick = generiereDomain;
document.getElementById("notizen").onclick = notizen;
});