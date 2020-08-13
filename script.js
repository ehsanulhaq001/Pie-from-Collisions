window.onload = function() {
    cnv = document.querySelector("#canvas");
    ctx = cnv.getContext("2d");
    cnv.width = 800;
    cnv.height = 300;
    cnv.style.backgroundColor = "black";
    setup();
    requestAnimationFrame(draw);
}
let block;
let bounces = 0;
let digits = 8;
let bigMass = Math.pow(100, digits - 1)
let subDivs = Math.pow(10, (digits < 8 ? digits - 1 : 7));
let bounceCount = document.querySelector("#colValue");
let pie = document.querySelector("#pieValue");

function setup() {
    smallBlock = new Block(300, 0, 0, 50, 1);
    bigBlock = new Block(400, smallBlock.size, -1 / subDivs, 50 + 20 * (digits - 1), bigMass);
}

function draw() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.beginPath();
    ctx.rect(0, 0, 4, cnv.height);
    ctx.rect(0, cnv.height - 4, cnv.width, 4);
    ctx.fill();

    run();
    bigBlock.show();
    smallBlock.show();
    bounceCount.innerHTML = bounces;
    pie.innerHTML = bounces / Math.pow(10, digits - 1);
    requestAnimationFrame(draw);
}

function run() {
    for (let index = 0; index < subDivs; index++) {
        bigBlock.update();
        smallBlock.update();
        if (bigBlock.x <= (smallBlock.x + smallBlock.size)) {
            bounce(bigBlock, smallBlock);
            bounces++;
        }
    }
}

function bounce(block1, block2) {
    let u1 = block1.xv;
    block1.xv = ((block1.mass - block2.mass) / (block1.mass + block2.mass) * u1) + ((2 * block2.mass) / (block1.mass + block2.mass) * block2.xv);
    block2.xv = ((block2.mass - block1.mass) / (block2.mass + block1.mass) * block2.xv) + ((2 * block1.mass) / (block2.mass + block1.mass) * u1);
}