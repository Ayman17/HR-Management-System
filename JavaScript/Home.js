function OurProject() {
    window.open("HrHome.html");
}
let el = document.getElementById("animate");
el.addEventListener("mouseover", ()=>{
    el.style.width = "40vw";
});
el.addEventListener("mouseout", ()=>{
    el.style.width = "20vw";
});
