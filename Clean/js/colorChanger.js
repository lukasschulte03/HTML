const break1 = document.getElementsByClassName("color-break-1");
const break2 = document.getElementsByClassName("color-break-2");
const break3 = document.getElementsByClassName("color-break-3");

document.querySelector(":root").style.setProperty('--secondary-color', '#6c63ff');
document.querySelector(":root").style.setProperty('--secondary-accent-color', '#8779ff');

var result = Math.floor(Math.random() * 3)

if (result == 0){
    document.querySelector(":root").style.setProperty('--secondary-color', '#467061');
    document.querySelector(":root").style.setProperty('--secondary-accent-color', '#56937d');
}
if (result == 1){
    document.querySelector(":root").style.setProperty('--secondary-color', '#f67228');
    document.querySelector(":root").style.setProperty('--secondary-accent-color', '#fba879');
}
if (result == 2){
    document.querySelector(":root").style.setProperty('--secondary-color', '#6c63ff');
    document.querySelector(":root").style.setProperty('--secondary-accent-color', '#8779ff');
}

/* 
function isInViewport(el) {
    const rect = el[0].getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


window.onload = function() {            
    function changeTheme(){
        console.log("test");
        if (isInViewport(break3)){
            document.querySelector(":root").style.setProperty('--secondary-color', '#467061');
            document.querySelector(":root").style.setProperty('--secondary-accent-color', '#56937d');
        }
        if (isInViewport(break2)){
            document.querySelector(":root").style.setProperty('--secondary-color', '#f67228');
            document.querySelector(":root").style.setProperty('--secondary-accent-color', '#fba879');
        }
        if (isInViewport(break1)){
            document.querySelector(":root").style.setProperty('--secondary-color', '#6c63ff');
            document.querySelector(":root").style.setProperty('--secondary-accent-color', '#8779ff');
        }
    }
    setInterval(changeTheme, 200);
}
 */
