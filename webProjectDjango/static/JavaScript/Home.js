//Constants
const el = document.getElementById("animate");

//The hamburger
const menu = document.querySelector('.menu');
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
    menu.classList.toggle('active');
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

function OurProject(){
  window.location.href = 'HrHome.html';

  const currentPagePath = window.location.pathname;

  // Loop over all links in the navigation
  const navLinks = document.querySelectorAll('.navigation a');
  navLinks.forEach(link => {
    // Check if the link's href matches the current page path
    if (link.getAttribute('href') === currentPagePath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}



//The Main function 

function Main() {
    /*
    ELy 7t el line dh ... anta 5nzeer.
    window.open("HrHome.html");
    */

    menu.addEventListener('click', hamburgerClicked);

    /*
    Fakes el animation fe el home page.
    addAnimate(); 
    */

    checkSmallScreen();
}


Main();