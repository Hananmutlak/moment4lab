/*
Här lägger du din JavaScript-kod
*/
"use strict";
// 

var myfor = document.getElementById("newtodo");
var mynewtodobutton = document.getElementById("newtodobutton");
var mymassage = document.getElementById("message");
var mylist = document.getElementById("todolist");
var myrensa = document.getElementById("clearbutton");

// för att lägga till listan använd vi addltem()
function addltem() {
    var newtodoText = myfor . value ;
    if (newtodoText.length<5 ){
mymassage.innerHTML="Text är kort";
return;
    } 
    // skapa nytt article
    var newtodoArticle = document.createElement(`article`);
    //lägga text till article
    newtodoArticle . innerHTML = newtodoText;
    // lägga click händelse
    newtodoArticle.addEventListener(`click`,function () {
        deleteltem(newtodoArticle);
    });

// lägga ny article i mylist
mylist.appendChild(newtodoArticle);

// lagring av inmatning till web storage.
storeItem(newtodoText);
myfor.value="";
mymassage.innerHTML="";
}
//sta bort från lista
function deleteltem(item) {
    mylist.removeChild(item);
    updataStorage();
}
// spara ny sak i web
function storeItem(newtodoText) {
    // skapa tomt lista
   var element = JSON.parse(localStorage.getItem(`element`)) || [];
   // lägga ny saken 
   element.push(newtodoText);
   localStorage.setItem(`element`,JSON.stringify(element));
}
// uppdatera web storage efter objekt bort
function updataStorage() {
    var updateElement=[];
    var items = mylist.querySelectorAll(`article`);
    //lägga text till nya list
    
    items.forEach(function(item){
        updateElement.push(item.innerHTML);
    });
    localStorage.setItem(`element`,JSON.stringify(updateElement));
}
// lägga händelsehantener för knappen 
mynewtodobutton.addEventListener(`click`,addltem);
//lägga händelshantener för att ransa lista
myrensa.addEventListener(`click`,function(){
    mylist.innerHTML="";

    // now vi rensa lista från web storage
    localStorage.removeItem(`element`);
});
// now vi lägga data från web storage vid sidinladdning
function loadStorage(){
var element= JSON.parse(loadStorage.getItem(`element`)) ||[];
// now vi skapa motsvarande article element
element.forEach(function(ny){
    var newtodoArticle= document.createElement(`article`);
    newtodoArticle.innerHTML= ny;
    // now vi klick för att ta bort article
    newtodoArticle.addEventListener(`click`,function(){
        deleteltem(newtodoArticle);
    
    });
    mylist.appendChild(newtodoArticle);
});
}
   // now ladda jag lista från localstorage
   Window.onload= loadStorage;