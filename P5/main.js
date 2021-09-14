/**
 * Criatech 2021
 *
 * website background animation
 *  * @version 2.2 P5.js
 * https://www.criatech.pt/
 *
 * @author —, you had a problem
 * (Rafael Ferreira and Miguel Cruz)
 * https://youhadaproblem.com
 *
 * @version 2.1 P5.js
 * https://www.criatech.pt/
 *
 * @author —, you had a problem
 * (Rafael Ferreira and Miguel Cruz)
 * https://youhadaproblem.com
 *
 * @version 2.0 P5.js by
 * Sérgio Rebelo <sergiorebelo@me.com>
 * https://sergiorebelo.work
 * and
 * Beatriz Correia <contact@beatrizcorreia.com>
 * https://www.beatrizcorreia.com
 * June 2020
 *
 * @based on
 * http://paulbourke.net/geometry/chladni/
 * https://github.com/v3ga/Processing/blob/master/Forms/Chladni/
 * https://drive.google.com/file/d/0BzWGMpvCa9PEM3ZGT3k3YlJsWk0/view
 * https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
 * &&
 * @version 1.0 (Processing.js) by —, you had a problem
 * (Rafael Ferreira and Miguel Cruz) 2018
 *
 * August 2021
 */

let canvas, density, g, glsl;
let loaded = false;

let circles = [];
let rects = [];
let sizePattern = 40;
let sizeBackground = 7;
let m = 1;
let n = 2;
let epsilon = 0.5;
let space = 51;

let recompute = true;
let animate = true;

let fade = 2;
let rot = 0;

const colorC = [];
const colorBG = [];

let val, valCol;

let time = 0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    density = displayDensity();
    pixelDensity(density);

    colorC.push(
        color('#BBAB9B'),
        color('#EEC0DB'),
        color('#E9E8D4'),
        color('#F9BDFD'),
        color('#F3C9DD'),
        color('#0C3934')
    );

    colorBG.push(
        color('#371722'),
        color('#162BF4'),
        color('#3B465C'),
        color('#181919'),
        color('#72AEC5'),
        color('#F8EBEE')
    );

    val = Math.floor(random(5));
    valCol = Math.floor(random(colorC.length));

    const bgCSScol = "#" + hex(red(colorBG[valCol]), 2) + hex(green(colorBG[valCol]), 2) + hex(blue(colorBG[valCol]), 2);
    const cCSScol = "#" + hex(red(colorC[valCol]), 2) + hex(green(colorC[valCol]), 2) + hex(blue(colorC[valCol]), 2);
    const sCol = color(map(red(colorC[valCol]), 0, 255, 200, 255), map(green(colorC[valCol]), 0, 255, 200, 255), map(blue(colorC[valCol]), 0, 255, 200, 255));
    const sCSScol = "#" + hex(floor(red(sCol)), 2) + hex(floor(green(sCol)), 2) + hex(floor(blue(sCol)), 2);

    document.documentElement.style.setProperty("--highlight-color", cCSScol);
    document.documentElement.style.setProperty("--s-highlight-color", sCSScol);
    document.documentElement.style.setProperty("--bg-color", bgCSScol);

    if (window.mobileCheck()) {
        sizePattern = 29;
        sizeBackground = 5;
        space = 31;
    }

    background(colorBG[valCol]);
    makePattern();
    noStroke();
    fill(colorC[valCol]);
    rectMode(CENTER);
    colorBG[valCol].setAlpha(30);
}

function draw() {
    background(colorBG[valCol]);
    //if (recompute && loaded) {
        time += 0.05;
        rot += 0.0003;
        recompute = animate;
        circles.forEach(c => {
            c.update(fade);
        });

        rects.forEach(r => {
            r.update(fade, rot);
        });
}

function makePattern() {
    let chladni = 0.0;

    if (val == 0) {
        m = 0;
        n = 1;
        recompute = true;
    } else if (val == 1) {
        m = 1;
        n = 2;
        recompute = true;
    } else if (val == 2) {
        m = 0;
        n = 2;
        recompute = true;
    } else if (val == 3) {
        m = 0;
        n = 3;
        recompute = true;
    } else if (val == 4) {
        m = 1;
        n = 3;
        recompute = true;
    }

    for (let i = -2 * space; i <= (width) + space; i += space) {
        for (let j = -2 * space; j <= (height) + space; j += space) {

            chladni = cos(n * TWO_PI * j / width) * cos(m * TWO_PI * i / width) - cos(m * TWO_PI * j / width) * cos(n * TWO_PI * i / width);
            if (abs(chladni) <= epsilon) {
                circles.push(new Rect(i, j, sizePattern));
            } else {
                circles.push(new Circle(i, j, sizeBackground));
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    circles = [];
    makePattern();
}

window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

window.mobileAndTabletCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};