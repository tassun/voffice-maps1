/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

let currentPopup: any = undefined;
const today = new Date();
const hh = today.getHours();
const mm = today.getMinutes();
const time = (((hh < 10) ? "0":"") + hh) + (((mm < 10) ? ":0" : ":") + mm);

WA.room.onEnterZone('clock', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveZone('clock', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
