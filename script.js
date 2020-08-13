window.onload = function() {
    cnv = document.querySelector("#canvas");
    ctx = cnv.getContext("2d");
    cnv.width = window.innerWidth / 2;
    cnv.height = 300;
    cnv.style.backgroundColor = "black";
    start();
}

function start() {
    setup();
    requestAnimationFrame(draw);
}
let block;
let bounces;
let digits;
let bigMass;
let subDivs;
let bounceCount;
let pie = document.querySelector("#pieValue");

function setup() {
    bounces = 0;
    digits = document.querySelector("#input").value;;
    bigMass = Math.pow(100, digits - 1)
    subDivs = Math.pow(10, (digits < 8 ? digits - 1 : 7));
    bounceCount = document.querySelector("#colValue");
    smallBlock = new Block(cnv.width / 2 - 100, 0, 0, 50, 1);
    bigBlock = new Block(cnv.width / 2, smallBlock.size, -1 / subDivs, 50 + 20 * (digits - 1), bigMass);
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

    if (digits != document.querySelector("#input").value) {
        digits = document.querySelector("#input").value;
        document.querySelector("#digits").innerHTML = digits;
        start();
    } else {
        requestAnimationFrame(draw);
    }
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