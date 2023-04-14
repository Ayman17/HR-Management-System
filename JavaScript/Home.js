//Constants
const el = document.getElementById("animate");

//The hamburger
const toggle = document.querySelector('.navbar_toggle');
const nav = document.querySelector('.navigation');
const content = document.querySelector('.content');

//using the media query to remove animate
const smallScreen = window.matchMedia("(max-width: 800px)");
const homeHeader = document.getElementById("home_header");




//Functions
function mouseOver(){
    el.style.width = "40vw";
}

function mouseOut(){
    el.style.width = "20vw";
}

function hamburgerClicked(){
    toggle.classList.toggle('active');
    if (nav) nav.classList.toggle('active');
    if (content) content.classList.toggle('active');
    if (homeHeader) homeHeader.classList.toggle('active');
}

function addAnimate(){
    //the normal is to add them
    el.addEventListener("mouseover", mouseOver);
    el.addEventListener("mouseout", mouseOut);
}

function checkSmallScreen(){
    if(smallScreen.matches){
        el.removeEventListener("mouseover", mouseOver);
        el.removeEventListener("mouseout", mouseOut);
    }
}



//The Main function 

function Main() {
    /*
    ELy 7t el line dh ... anta 5nzeer.
    window.open("HrHome.html");
    */

    toggle.addEventListener('click', hamburgerClicked);

    /*
    Fakes el animation fe el home page.
    addAnimate(); 
    */

    checkSmallScreen();
}


Main();