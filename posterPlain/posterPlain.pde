/*
  Based on :
 http://paulbourke.net/geometry/chladni/
 https://github.com/v3ga/Processing/blob/master/Forms/Chladni/
 —
 
 Code 3.0 adapted by:
 —, you had a problem, 2021
 
 Code 2.0 adapted by:
 —, you had a problem. 2020
 
 Code 1.0 adapted by:
 —, you had a problem. 2018
 
 Client: Criatech 2020
 
 */

import com.hamoid.*;
import processing.pdf.*;
PShader sh;
PGraphics g1, g2;

ArrayList<Circle> circles;
ArrayList<Square> squares;
int space=31, sizePattern=29, sizeBackground=7;
float m, n;
float epsilon = 0.5;
boolean recompute = true;
boolean animate = false;
float fade = 0.5;
boolean record;
float rotate = 0;
float i = 0;

float currentTimer;
int timer = 10000; // 2 posters

color colC1 = #BBAB9B, colC2 = #EEC0DB, colC3 = #E9E8D4, colC4 = #F9BDFD, colC5 = #F3C9DD, colC6 = #0C3934;
color colBG1 = #371722, colBG2 = #162BF4, colBG3 = #3B465C, colBG4 = #181919, colBG5 = #72AEC5, colBG6 = #F8EBEE;

color [] colorBG = {
  colBG1,
  colBG2,
  colBG3,
  colBG4,
  colBG5,
  colBG6
};

color [] colorC = {
  colC1,
  colC2,
  colC3,
  colC4,
  colC5,
  colC6
};

int [][] alp = {{1, 2}, {1, 3}, {1, 4}, {2, 4}, {2, 5}, {2, 6}, {3, 6}, {3, 7}, {3, 8}, {4, 8}, {4, 9}, {4, 10}, {5, 10}, {5, 11}, {5, 12}, {6, 12}, {7, 12}, {7, 13}, {7, 14}, {8, 10}, {8, 11}, {8, 12}, {9, 13}};

int rand = int(random(colorC.length)); // 0
int randAlp = int(random(alp.length));

boolean click = false;

void setup() {
  size(3401, 4960); // 841, 1190
  //size(800, 800); // 841, 1190
  noStroke();
  smooth();
  pixelDensity(displayDensity());
  rectMode(CENTER);
  //surface.setVisible( false );
  //frameRate(1);

  circles = new ArrayList();
  squares = new ArrayList();

  m = alp[randAlp][0];
  n = alp[randAlp][1];
  
  makePattern(sizePattern, sizeBackground);
  fill(colorC[rand]);
  background(colorBG[rand]);
}

void draw() {
  currentTimer = millis();
  rotate+=0.003;
  fill(colorBG[rand], 150);
  rect(width * 0.5, height * 0.5, width, height);
  for (Circle c : circles) {
    c.update(fade);
    c.draw();
  }
  
  for (Square s : squares) {
    s.update(fade, rotate);
  }
  
  
  if(click){
    exit();
  }
  
  //if(currentTimer > timer) exit();
}

void makePattern(int sizePattern, int sizeBackground) {
  float chladni = 0.0f;

  for (int i = -2 * space; i <= (width) + space; i += space) {
    for (int j = -2 * space; j <= (height) + space; j += space) {

      chladni = cos(n*PI*j/width)*cos(m*PI*i/width) - cos(m*PI*j/width)*cos(n*PI*i/width);
      if (abs(chladni)<=epsilon) {
        squares.add(new Square(i, j, sizePattern, colorC[rand]));
      } else {
        circles.add(new Circle(i, j, sizeBackground, colorC[rand]));
      }
    }
  }
}

void mousePressed() {
  click = true;
  //beginRecord(PDF, "poster-####.pdf");
  save("poster"+year()+month()+day()+hour()+minute()+second()+".tif");
}
