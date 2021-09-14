class Rect {
    constructor(x, y, size) {
        this.cx = x;
        this.cy = y;
        this.rot = rot;

        this.rT = 500;
        this.offset = random(-PI / 8, PI / 8);
        this.size = size;

        this.rx = 0;
        this.ry = 0;
    }

    update(zz) {
        this.zz = zz;
        let t = millis() / this.rT;

        t += cos(abs(1 - (this.cx / (width / 2)))) * PI / 2;
        t += cos(abs(1 - (this.cy / (height / 2)))) * PI / 2;
        t += this.offset;

        this.rx = abs(sin(t) * this.size) + this.zz;
        this.ry = this.rx;

        if (this.rx > 0 && this.ry > 0) {
            push();
            translate(this.cx, this.cy);
            rotate(this.rot + (this.rx/10));
            rect(0, 0, this.rx, this.ry, 10);
            pop();
        }
    }
}