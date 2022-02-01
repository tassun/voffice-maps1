/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;
const today = new Date();
const hh = today.getHours();
const mm = today.getMinutes();
const time = (((hh < 10) ? "0":"") + hh) + (((mm < 10) ? ":0" : ":") + mm);

WA.room.onEnterLayer('clockZone').subscribe(() => {
    console.log('toto')
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
