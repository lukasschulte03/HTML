const sections = document.querySelectorAll('section');
const bubble = document.querySelector('.bubble');
const parent = document.querySelector('.parent');

console.log(sections)

const options = {
    "rootMargin": "-53% 0% -45% 0%",
    "threshold": "0"
}

let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries){
    entries.forEach(entry =>{
        if(entry.isIntersecting){

            const className = entry.target.className;
            console.log(entry)
            const activeAnchor = document.querySelector(`[data-page=${className}]`);
            const coords = activeAnchor.getBoundingClientRect();
            const directions = {
                height : coords.height,
                width : coords.width,
                top : coords.top,
                left : coords.left
            };

            
                bubble.style.setProperty("left", `${Array.prototype.indexOf.call(parent.children, activeAnchor) * 90}px`) ;
                /* bubble.style.setProperty("left", `${directions.left}px`); */
                bubble.style.setProperty("top", `${directions.top}px`);
                bubble.style.setProperty("width", `${directions.width}px`);
                bubble.style.setProperty("height", `${directions.height}px`);
        }
    })
}

sections.forEach(section => {
    observer.observe(section);
})