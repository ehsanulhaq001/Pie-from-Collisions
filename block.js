function Block(x, xcon, xv, size, mass) {
    this.mass = mass;
    this.x = x;
    this.xv = xv;
    this.size = size;

    this.show = function() {
        ctx.beginPath();
        if (this.x < xcon) {
            ctx.rect(xcon, cnv.height - this.size - 4, this.size, this.size);
        } else {
            ctx.rect(this.x, cnv.height - this.size - 4, this.size, this.size);
        }
        ctx.fill();
        ctx.fillStyle = "lime";
        ctx.stroke();
    }

    this.update = function() {
        this.x += this.xv;
        if (this.x < 0) {
            this.x = 0;
            this.xv = -this.xv;
            bounces++;
        }
    }
}