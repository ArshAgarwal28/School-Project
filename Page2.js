var previousPageBut;

var allImages;

var feedbackBut;

var baseXVal, baseYVal;

function setupPage2() {
    previousPageBut = createButton('Page 1');
    previousPageBut.size(125, 30);
    previousPageBut.position(875, 0);
    previousPageBut.hide();
    
    baseXVal = 100;
    baseYVal = 100;
}

function drawPage2() {
    if (appState === 2) {
        doctor2Heading();
        previousPageBut.mousePressed(previousButPressed)
        feedbackBut.mousePressed(feedbackButPressed)

        createImages();
    }
}



function doctor2Heading() {
    textFont(headingFont)
    textAlign(CENTER, CENTER);
    fill('black');
    textSize(50)
    text('Famous Clinics', 500, 40)
}

function previousButPressed() {
    for (var button in checkbox) {
        checkbox[button].show();
    }

    previousPageBut.hide();
    page1But.hide();
    page2But.hide();
    submitButton.hide();

    nextPageBut.show();
    feedbackBut.show();

    nameInput.hide();
    emailInput.hide();
    feedbackInput.style["display"] = "none";
    hideClinicLinks();
    
    appState = 1;
}

function createImages() {
    image(clinic1Anim, baseXVal, baseYVal, 200, 150);
    textAlign(CENTER, CENTER);
    textSize(30);

    image(clinic2Anim, baseXVal + 300, baseYVal, 200, 150);
    textAlign(CENTER, CENTER);
    textSize(30);

    image(clinic3Anim, baseXVal + 600, baseYVal, 200, 150);
    textAlign(CENTER, CENTER);
    textSize(30);

    image(clinic4Anim, baseXVal, baseYVal + 260, 200, 150);
    textAlign(CENTER, CENTER);
    textSize(30);

    image(clinic5Anim, baseXVal + 300, baseYVal + 260, 200, 150);
    textAlign(CENTER, CENTER);
    textSize(30);

    image(clinic6Anim, baseXVal + 600, baseYVal + 260, 200, 150);
    textAlign(CENTER, CENTER);
    textSize(30);
}

function hideClinicLinks() {
    for (var i = 0; i < document.getElementsByTagName('h2').length; i++) {
        document.getElementsByTagName('h2')[i].style["display"] = "none"
    }
}

function showClinicLinks() {
    for (var i = 0; i < document.getElementsByTagName('h2').length; i++) {
        document.getElementsByTagName('h2')[i].style["display"] = "block"
    }
}