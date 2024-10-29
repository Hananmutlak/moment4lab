"use strict"; 

const myfor = document.getElementById("newtodo");
const mynewtodobutton = document.getElementById("newtodobutton");
const myMessage = document.getElementById("message");
const mylist = document.getElementById("todolist");
const myrensa = document.getElementById("clearbutton");

// // för att lägga till listan använd vi addltem()
function addItem() {
    const newtodoText = myfor.value;
    if (newtodoText.length < 5) {
        myMessage.innerHTML = "Text är kort";
        return;
    } 

    // Skapa ett nytt article
    const newtodoArticle = document.createElement(`article`);
    //lägga text till article
    newtodoArticle.innerHTML = newtodoText;

    // Lägg till click-händelse 
    newtodoArticle.addEventListener(`click`, function () {
        deleteItem(newtodoArticle);
    });

    // Lägg till den nya article i mylist
    mylist.appendChild(newtodoArticle);

    // lagring av inmatning till web storage.
    storeItem(newtodoText);
    myfor.value = ""; 
    myMessage.innerHTML = ""; // Töm meddelandet
}

// Funktion för att ta bort ett objekt från listan
function deleteItem(item) {
    mylist.removeChild(item);
    updateStorage();
}

//  spara en ny sak i web storage
function storeItem(newtodoText) {
    const element = JSON.parse(localStorage.getItem(`element`)) || [];
    element.push(newtodoText);
    localStorage.setItem(`element`, JSON.stringify(element));
}

// uppdatera web storage efter att ett objekt har tagits bort
function updateStorage() {
    const updateElement = [];
    const items = mylist.querySelectorAll(`article`);
    
    items.forEach(function(item) {
        updateElement.push(item.innerHTML);
    });
    localStorage.setItem(`element`, JSON.stringify(updateElement));
}

// Lägg händelsehanterare för knappen
mynewtodobutton.addEventListener(`click`, addItem);

// Lägg händelsehanterare för att rensa lista
myrensa.addEventListener(`click`, function() {
    mylist.innerHTML = "";
    localStorage.removeItem(`element`); //  now vi rensa lista från web storage
    myMessage.innerHTML = "Listan har rensats."; // Informera användaren
});

// Ladda data från web storage vid sidinladdning
function loadStorage() {
    const element = JSON.parse(localStorage.getItem(`element`)) || [];
    // now vi skapa motsvarande article element
    element.forEach(function(ny) {
        const newtodoArticle = document.createElement(`article`);
        newtodoArticle.innerHTML = ny;
 // now vi klick för att ta bort article
        newtodoArticle.addEventListener(`click`, function() {
            deleteItem(newtodoArticle);
        });

        mylist.appendChild(newtodoArticle);
    });
}

// Ladda lista från localstorage när fönstret laddas
window.onload = loadStorage;
