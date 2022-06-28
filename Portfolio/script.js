const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const connectThreshold = 200;
const mouseRadiusDivider = 10;
const speedMax = 2

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: ((canvas.height/mouseRadiusDivider))
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        if (this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size){
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();

    }
}

function init(){
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++){
        let size = (Math.random()*5) + 1;
        let x = (Math.random() * ((innerWidth - size *2) - (size*2)) + size*2);
        let y = (Math.random() * ((innerHeight - size *2) - (size*2)) + size*2);
        let directionX = Math.random() * (speedMax + speedMax) - speedMax;
        let directionY = Math.random() * (speedMax + speedMax) - speedMax;
        let color = '#ffffff';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect(){
    for (let a = 0; a < particlesArray.length; a++) {
        let opacityValue = 1;
        for (let b = a; b < particlesArray.length; b++) {
            let distance = Math.sqrt(((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)))
            if (distance < connectThreshold){
                opacityValue = (connectThreshold - distance)/connectThreshold
                ctx.strokeStyle = "rgba(255,255,255," + opacityValue + ")";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener("resize",
    function(){
        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;
        mouse.radius = ((canvas.height/mouseRadiusDivider))
    }
)

window.addEventListener("mouseout",
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
);



init();
animate();