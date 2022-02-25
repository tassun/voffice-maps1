/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;
const today = new Date();
const hh = today.getHours();
const mm = today.getMinutes();
const time = (((hh < 10) ? "0":"") + hh) + (((mm < 10) ? ":0" : ":") + mm);

const clockLists = [
	{ "zone":"clock", "popup":"clockPopup" },
	{ "zone":"clock1", "popup":"clock1Popup" },
	{ "zone":"clock2", "popup":"clock2Popup" },	
	{ "zone":"clock3", "popup":"clock3Popup" },	
	{ "zone":"clock4", "popup":"clock4Popup" }	
];
for(var i=0,isz=clockLists.length;i<isz;i++) {
	let ck = clockLists[i];
	console.log(ck.zone+" = "+ck.popup);
	WA.room.onEnterZone(ck.zone, () => {
		currentPopup = WA.ui.openPopup(ck.popup, "It's " + time, []);
	});
	WA.room.onLeaveZone(ck.zone, closePopUp);	
}

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

function generateKEY() {
    var digits = "0123456789";
    let key = "";
    for (let i = 0; i < 4; i++ ) {
        key += digits[Math.floor(Math.random() * 10)];
    }
    return key;
}

WA.room.onEnterZone("officeDoor2OutsideKey", () => {
	let curKey = WA.state.loadVariable("officeDoor2Key");
	console.log("Current key = ", curKey);
	let newKey = generateKEY();
	currentPopup = WA.ui.openPopup("doorKeyPopup", "Press " + newKey, []);
	WA.state.saveVariable("officeDoor2Key",newKey);
});
WA.room.onLeaveZone("officeDoor2OutsideKey", closePopUp);	

WA.state.onVariableChange("officeDoor2Key").subscribe((value: unknown) => {
    console.log("Door key = ", value);
});
/*
WA.room.onEnterZone("officeOutside2", () => {
	let curKey = WA.state.loadVariable("officeDoor2Key");
	currentPopup = WA.ui.openPopup("doorKeyPopup", "Press " + curKey, []);
});
WA.room.onLeaveZone("officeOutside2", closePopUp);	
*/
let doorKey = generateKEY();
WA.state.saveVariable("officeDoor2Key",doorKey);
