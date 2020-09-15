var globalYVal;

//For making user related input
var checkbox, box, boxXVal, boxY;  
var checkboxLabels, checkboxVal, checkboxVal2;
var submitButton; 

//For getting user input
var userSelected, changeArr;

//For boxChecked Algorithm
var lastValue = null;

//For matchingSymptoms Algorithm
var illnesses;
var depressionSymp;
var anxietySymp;
var adhdSymp;
var outputIllness;

var nextPageBut, feedbackBut;

function setupPage1() {
    userSelected = [];
    globalYVal = 140;

    checkboxLabels = ['Restlessness', 'Unwanted Thoughts', 'Sweating', 'Fatigue', 'Sadness', 'Lack of Concentration', 'Aggression', 'Fidgeting'];
    checkbox = [];
    boxY = globalYVal;
    boxXVal = 90;

    makeBoxes();

    //Defining Symptoms
    depressionSymp = ['Depression', 0, 'Restlessness', 'Sadness', 'Lack of Concentration'];
    anxietySymp = ['Anxiety', 0, 'Restlessness', 'Unwanted Thoughts', 'Sweating', 'Fatigue'];
    adhdSymp = ['ADHD', 0, 'Aggression', 'Fidgeting', 'Sweating', 'Fatigue'];


    illnesses = [depressionSymp, anxietySymp, adhdSymp];

    outputIllness = [];

    nextPageBut = createButton('Page 2');
    nextPageBut.size(125, 30);
    nextPageBut.position(875, 0);    

    feedbackBut = createButton('Feedback Page');
    feedbackBut.size(110, 30);
    feedbackBut.position(0, 0);

    changeArr = [];
}

function drawPage1() {
    if (appState === 1) {
        sortArrays();

        nextPageBut.mousePressed(nextPagePressed);  

        checkChange();

        showIllnesses();

        displayHeading();
    }
}

function makeBoxes() {
    for (var i=0; i < checkboxLabels.length; i++) {
        if (i === 6) {
            boxXVal += 230;
            boxY = globalYVal;
        }
        box = createCheckbox(checkboxLabels[i], false);
        box.style('font-family', 'Hack')
        box.position(boxXVal, boxY)
        boxY += 50;
        checkbox.push(box)
    }
}

function checkChange() {
    resetValues();

    for (var j in checkbox) {
        if (checkbox[j].checked() === true) {
            changeArr.push(checkbox[j].value());
            changeArr = Array.from(new Set(changeArr));   
        }
    }

    if (changeArr !== []) {
        userSelected = changeArr;
        checkIllness(); 
        sortCount();
    }
}

function checkIllness() {
    for (var i in illnesses) {
        for (var symptom in illnesses[i]) {
            for (var userSymptom in userSelected) {
                if (illnesses[i][symptom] === userSelected[userSymptom]) {
                    illnesses[i][1] = int(illnesses[i][1]) + 1;          
                }
            }
        }
    }
}

function resetValues() {
    userSelected = [];
    outputIllness = [];
    changeArr = [];

    for (var i in illnesses) {
        illnesses[i][1] = 0;
    }
}

function sortCount() {
    var tempArr = [];
    for (var i in illnesses) {
        tempArr.push(illnesses[i][1]);
    }

    tempArr = tempArr.sort();


    for (var illness in illnesses) {
        if (illnesses[illness][1] === tempArr[tempArr.length - 1] && tempArr[tempArr.length - 1] > 0) {
            outputIllness.push(illnesses[illness][0]);
        }
    }

    outputIllness = Array.from(new Set(outputIllness))
    outputIllness = outputIllness.sort()
}

function showIllnesses() {
    createLine();

    textFont(illnessFont)
    textAlign(LEFT, CENTER);
    fill('black');
    textSize(20)
    text("The following illnesses have the \nmost matching symptoms -", 600, globalYVal)

    var yVal = globalYVal + 45;

    for (var illnessName in outputIllness) {
        text('      - ' + outputIllness[illnessName], 600, yVal)
        yVal += 30;
    }

}

function createLine() {
    let xVal = 530;
    for (var valY=5; valY < height; valY += 20) {
        line(xVal, valY, xVal, valY+10);
    }
}

function displayHeading() {
    textFont(headingFont)
    textAlign(CENTER, CENTER);
    fill('black');
    textSize(50)
    text('Assess Yourself', 275, globalYVal - 100)
    text('Results', 750, globalYVal - 100)
}

function nextPagePressed() {
    for (var button in checkbox) {
        checkbox[button].hide();
    }

    nextPageBut.hide();
    previousPageBut.show();
    feedbackBut.show();

    page1But.hide();
    page2But.hide()
    submitButton.hide();

    nameInput.hide();
    emailInput.hide();
    feedbackInput.style["display"] = "none";
    showClinicLinks();

    appState = 2;
}
