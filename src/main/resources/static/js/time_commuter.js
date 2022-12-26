const next = document.querySelector(".next");
const back = document.querySelector(".back");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const one = document.querySelector(".one");
const two = document.querySelector(".two");

next.onclick = () => {
    box2.classList.remove("invisible");
    box1.classList.add("invisible");
    two.classList.remove("invisible");
    one.classList.add("invisible");
}
back.onclick = () => {
    box1.classList.remove("invisible");
    box2.classList.add("invisible");
    one.classList.remove("invisible");
    two.classList.add("invisible");
}