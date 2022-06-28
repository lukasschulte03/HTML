const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = screen.width;
canvas.height = screen.height;

/* const mouseRadiusDivider = 10; */

const connectThreshold = 200;
const maxBallSize = 5;
const minBallSize = 3;
const speedMax = 2;
const lineThickness = 2;
const themeColor = "#0d314a";

let particlesArray;

//colorChannelA and colorChannelB are ints ranging from 0 to 255
function colorChannelMixer(colorChannelA, colorChannelB, amountToMix){
    var channelA = colorChannelA*amountToMix;
    var channelB = colorChannelB*(1-amountToMix);
    return parseInt(channelA+channelB);
}
//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
function colorMixer(rgbA, rgbB, amountToMix){
    var r = colorChannelMixer(rgbA[0],rgbB[0],amountToMix);
    var g = colorChannelMixer(rgbA[1],rgbB[1],amountToMix);
    var b = colorChannelMixer(rgbA[2],rgbB[2],amountToMix);
    return "rgb("+r+","+g+","+b+")";
}


/* let mouse = {
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
 */
class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.startSize = size
        this.size = this.startSize;
        this.color = color;
    }
    draw(){
        /* ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill(); */
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
/*         if (this.x > canvas.width * 1.1 || this.x < -(canvas.width * 1.1)){
            this.x = -this.directionX;
        }
        if (this.y > canvas.height * 1.1 || this.y < -(canvas.height * 1.1)){
            this.directionY = -this.directionY;
        }
 */
        if (this.size > this.startSize){
            this.size -= 0.1;
        }

        if (this.x > canvas.width || this.x < 0){
            this.x = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        } 
        /* let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size){
             if (mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10){
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10){
                this.y -= 2;
            } 
            this.size += 0.2

        } */
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();

    }
}

function init(){
    particlesArray = [];
    let numberOfParticles = Math.min(1000,((canvas.height * canvas.width) / 9000));
    for (let i = 0; i < numberOfParticles; i++){
        let size = (Math.random()*(maxBallSize-minBallSize))+minBallSize;
        let x = (Math.random() * ((canvas.width - size *2) - (size*2)) + size*2);
        let y = (Math.random() * ((canvas.height - size *2) - (size*2)) + size*2);
        let directionX = Math.random() * (speedMax + speedMax) - speedMax;
        let directionY = Math.random() * (speedMax + speedMax) - speedMax;
        let color = themeColor;

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
                ctx.strokeStyle = "rgba(13,49,74," + opacityValue + ")";
                ctx.lineWidth = lineThickness;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener("resize",
    function(){
        canvas.width = screen.width;
        canvas.height = screen.height;
        /* mouse.radius = ((canvas.height/mouseRadiusDivider)) */

    }
)

/* window.addEventListener("mouseout",
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
); */



init();
animate();