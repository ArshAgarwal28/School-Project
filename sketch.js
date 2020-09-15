var illnessFont;

var headingFont;

var appState = 1;

var db, allUsers;

var clinic1Anim, clinic2Anim, clinic3Anim, clinic4Anim, clinic5Anim, clinic6Anim;

function preload() {
    illnessFont = loadFont('bahnschrift.ttf');
    headingFont = loadFont('simplifica.ttf');
    
    clinic1Anim = loadImage("clinics/Clinic1.jpg")
    clinic2Anim = loadImage('clinics/Clinic2.jpg')
    clinic3Anim = loadImage('clinics/Clinic3.jpg')
    clinic4Anim = loadImage('clinics/Clinic4.jpg')
    clinic5Anim = loadImage('clinics/Clinic5.png')
    clinic6Anim = loadImage('clinics/Clinic6.jpg')
}

function setup(){
    createCanvas(1000, 625);

    db = firebase.database();

    getDBData();

    setupPage1();
    setupPage2();
    setupPage3();

    checkboxLabels = checkboxLabels.sort();
}

function draw() {
    background('#00ccff');

    drawPage1();
    drawPage2();
    drawPage3();

    feedbackBut.mousePressed(feedbackButPressed)
}

function sortArrays() {
    userSelected = userSelected.sort();   
    checkboxLabels = checkboxLabels.sort();
}
