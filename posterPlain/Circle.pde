class Circle {
  float cx, cy;
  float rx, ry;
  float rT;
  float offset;
  float size;
  float zz;
  color c;

  Circle(float x, float y, float size, color c) {
    this.cx = x;
    this.cy = y;
    this.size = size;
    this.offset = random(-PI/6, PI/6);
    this.rT = 2000;
    this.c = c;
  }

  void update(float zz) {
    this.zz=zz;
    float t = millis()/this.rT;

    t += cos(abs(1-(this.cx/(width/2))))*TWO_PI;
    t += cos(abs(1-(this.cy/(height/2))))*TWO_PI;
    t += this.offset;

    this.rx = abs(sin(t)*this.size)+this.zz;
    //rx =  sin(t)*size;
    this.ry = this.rx;
  }

  void draw() {
    if (this.rx > 0 && this.ry > 0) {
      noStroke();
      fill(this.c);
      ellipse(this.cx, this.cy, this.rx, this.ry);
    }
  }
}
