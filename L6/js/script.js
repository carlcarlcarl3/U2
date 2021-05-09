// Globala konstanter och variabler
const roomPrice = [600, 800, 950]; // Pris för rumstyperna
const extraPrice = [40, 80, 100]; // Pris för extravalen
var formElem; // Referens till elementet med hela formuläret
var totalCostElem; // Referens till elementet för totalpris
// ------------------------------
// Initiera globala variabler och koppla funktion till knapp
function init() {
	formElem = document.getElementById("booking");
	totalCostElem = document.getElementById("totalCost");


	for (var i = 0; i < 3; i++) {
		formElem.roomType[i].addEventListener("click", calculateCost);
		formElem.roomType[i].addEventListener("click", checkifFamilyRoom);
		formElem.roomType[i].parentNode.lastChild.textContent += " (" + roomPrice[i] + " kr)";
	}

	for (i = 0; i < 3; i++) {

		formElem.extra[i].addEventListener("click", calculateCost);
		formElem.extra[i].parentNode.lastChild.textContent += " (" + extraPrice[i] + " kr)";
	}

	formElem.nrOfNights.addEventListener("change", calculateCost);

	// Händelsehanterare för textfält som ska kontrolleras
	formElem.zipcode.addEventListener("blur", checkField);
	formElem.telephone.addEventListener("blur", checkField);

	formElem.city.addEventListener("blur", checkCity);
	// Händelsehanterare för kampanjkod
	formElem.campaigncode.addEventListener("focus", startCheckCampaign);
	formElem.campaigncode.addEventListener("keyup", checkCampaign);
	formElem.campaigncode.addEventListener("blur", endCheckCampaign);



	checkifFamilyRoom();
	calculateCost();
} // End init
window.addEventListener("load", init);
// ------------------------------

function checkifFamilyRoom() {

	if (formElem.roomType[2].checked == true) {

		formElem.persons.disabled = false;
		formElem.persons.parentNode.style.color = "#000";

		formElem.extra[2].disabled = true;
		formElem.extra[2].parentNode.style.color = "#999";
		formElem.extra[2].checked = false;
	} else {
		formElem.persons.disabled = true;
		formElem.persons.parentNode.style.color = "#999";

		formElem.extra[2].disabled = false;
		formElem.extra[2].parentNode.style.color = "#000";
	}

}

function calculateCost() {

	var price;

	for (var i = 0; i < 3; i++) {


		if (formElem.roomType[i].checked == true) {
			price = roomPrice[i];
			break;
		}
	}

	for (i = 0; i < 3; i++) {

		if (formElem.extra[i].checked == true) {
			price += extraPrice[i];
		}
	}

	var nrOfNights = formElem.nrOfNights.value;
	totalCostElem.innerHTML = nrOfNights * price;


}


function checkCity() {

	var city = this.value;

	city = city.toUpperCase();

	this.value = city;

}





function checkField() {

	const fieldNames = ["zipcode", "telephone"];
	const re = [ // Array med reguljära uttryck för fälten
		/^\d{3} ?\d{2}$/,
		/^0\d{1,3}[-/ ]?\d{5,8}$/
	];

	const errMsg = [
		"postnummret måste bestå av fem siffror.",
		"telnr måste börja med en 0:a och förljas av 6-11 siffror."
	];
	let ix = fieldNames.indexOf(this.name);
	let errMsgElem = this.nextElementSibling;
	errMsgElem.innerHTML = "";
	if (!re[ix].test(this.value)) {
		errMsgElem.innerHTML = errMsg[ix];
		return false;
	} else return true;
}


function startCheckCampaign() {

	this.style.backgroundColor = "#F99";
	this.select();


}

function endCheckCampaign() {

	this.style.backgroundColor = "";

	this.value = this.value.toUpperCase();


}

//fix
function checkCampaign() {

	var re = /\w{3}-\d{2}-\w\d$/;
	if (re.test(this.value)) this.style.backgroundColor = "#6f9";
	else this.style.backgroundColor = "#F99";


}