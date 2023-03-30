var button1 = document.getElementById("button1")
var clicked = 0;

button1.addEventListener("click", function () {
    if (clicked == 0) {
        button1.innerText = "Red!"
        button1.style.backgroundColor = "#ff0000";
        clicked = 1;
    } else {
        button1.innerText = "Blue!";
        button1.style.backgroundColor = "#0000ff";
        clicked = 0;
    }
});