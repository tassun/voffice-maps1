"use strict";
/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
let currentPopup = undefined;
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

/*
	WA.room.onEnterZone('clock', () => {
		currentPopup = WA.ui.openPopup('clockPopup', "It's " + time, []);
	});
	WA.room.onLeaveZone('clock', closePopUp);	
*/

function closePopUp() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

var fountainSound = WA.sound.loadSound("../assets/sound/water.ogg");
var fountainSoundConfig = {
    volume : 0.5,
    loop : true,
    rate : 1,
    detune : 1,
    delay : 0,
    seek : 0,
    mute : false
};

WA.room.onEnterZone('fountainsound', () => {
	fountainSound.play(fountainSoundConfig);
});
WA.room.onLeaveZone('fountainsound', () => { 
	console.log("on leave zone : fountainsound");
	fountainSound.stop();
	console.log("sound stop");
});	

//# sourceMappingURL=script.js.map