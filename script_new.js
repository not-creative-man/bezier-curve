let canvas = document.getElementById('canvas'),
    ctxCanv  = canvas.getContext('2d');
let rectSize = 3;
let mouse = {x: 0, y: 0};
canvas.width = 400;
canvas.height = 400;
let num = 0;
ctxCanv.strokeStyle = 'black';
ctxCanv.lineWidth = 1;
ctxCanv.fillStyle = 'black'; 

canvas.addEventListener('mousedown', function(e){
    draw(e);
});

function draw(e){
    if(num == 0){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctxCanv.strokeRect(mouse.x, mouse.y, rectSize, rectSize);
        ctxCanv.fillRect(mouse.x + 1, mouse.y + 1, rectSize - 2, rectSize - 2);
        num++;
    }
    console.log('mouse ' + mouse.x + " " + mouse.y);
}