let menu = document.querySelector("#menuBars");
let navbar = document.querySelector(".navbar");
menu.onclick =  () =>{
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
};

window.onscroll = () =>{
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
};


document.querySelector('.Login-button').addEventListener('click', () => {
    window.location.href = './login page/login.html';
});

document.querySelector('.Signup-button').addEventListener('click', () => {
    window.location.href = './sign up/sign-up.html';
});