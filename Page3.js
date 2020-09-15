var page1But, page2But;

var nameInput, emailInput, feedbackInput;
var submitButton;

var userRef;

function setupPage3() {
    page1But = createButton('Page 1');
    page1But.size(110, 30);
    page1But.position(0, 0);
    page1But.hide();

    page2But = createButton('Page 2');
    page2But.size(125, 30);
    page2But.position(875, 0);
    page2But.hide();

    submitButton = createButton('Submit');
    submitButton.size(100, 30);
    submitButton.position(450, 580);
    submitButton.hide();

    nameInput = createInput('', 'username');
    nameInput.position(400, 100);
    nameInput.size(200, 30);
    nameInput.elt.placeholder = "Please enter your first name";
    nameInput.hide();
    nameInput.required;

    emailInput = createInput('', 'email');
    emailInput.position(400, 175);
    emailInput.size(200, 30);
    emailInput.elt.placeholder = "Please enter your Email ID";
    emailInput.hide();
    emailInput.required;

    feedbackInput = document.getElementsByTagName("TEXTAREA")[0];
    feedbackInput.required;
}
function drawPage3() {
    if (appState === 3) {
        page3Heading();

        inputRestrict();

        page1But.mousePressed(page1ButEvent);
        page2But.mousePressed(page2ButEvent);
        submitButton.mousePressed(submitPressed);
    }
}

function feedbackButPressed() {
    for (var button in checkbox) {
        checkbox[button].hide();
    }

    feedbackBut.hide();
    previousPageBut.hide();

    page1But.show();
    page2But.show();
    submitButton.show();

    nameInput.show();
    emailInput.show();
    feedbackInput.style["display"] = "block";
    hideClinicLinks();

    appState = 3;
}
function page1ButEvent() {
    for (var button in checkbox) {
        checkbox[button].show();
    }

    nextPageBut.show();
    feedbackBut.show();

    page1But.hide();
    page2But.hide()
    submitButton.hide();

    nameInput.hide();
    emailInput.hide();
    feedbackInput.style["display"] = "none";

    appState = 1;
}
function page2ButEvent() {
    for (var button in checkbox) {
        checkbox[button].hide();
    }

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

function feedbackHeading() {
    textFont(headingFont)
    textAlign(CENTER, CENTER);
    fill('black');
    textSize(50)
    text('Feedback Page', 500, 40)
}
function page3Heading() {
    textFont(headingFont)
    textAlign(CENTER, CENTER);
    fill('black');
    textSize(50)
    text('Feedback Page', 500, 40)
}

function submitPressed() {
    if (checkCondition()) {
        if (checkGmail()) {
            db.ref('users/' + nameInput.value()).set({
                userName: nameInput.value(),
                emailID: emailInput.value(),
                feedback: feedbackInput.value
            });

            alert("Thank you for your feedback");
            nameInput.value("");
            emailInput.value("");
            feedbackInput.value = "";
        } else {
            alert("This account has already been used. Loading account!");
            nameInput.value(allUsers[userRef]['userName']);
            emailInput.value(allUsers[userRef]['emailID']);
            feedbackInput.value = allUsers[userRef]['feedback'];

            db.ref('users/' + userRef).remove()
        }
    } else {
        if (nameInput.value().length === 0) {
            alert("Please enter a name")
        } else if (feedbackInput.value.length === 0) {
            alert("Please give feedback!")
        } else {
            alert("Invalid Email ID!");
        }
    }
}

function checkCondition() {
    if (emailInput.value().length > 0) {
        if (emailInput.elt.checkValidity()) {
            if (nameInput.value()) {
                if (feedbackInput.value) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
function checkGmail() {
    if (allUsers !== null) {
        for (var user in allUsers) {
            if (allUsers[user]['emailID'] === emailInput.value()) {
                userRef = allUsers[user]['userName'];
                return false;
            } else if (user === allUsers.length - 1) {
                return true;
            }
        }
    } else {
        return true;
    }
}

function getDBData() {
    var refPlayers = db.ref('users');
    refPlayers.on("value", async (data) => {
        if (data.val() !== undefined) {
            allUsers = data.val();
        }
    });
}

function restrictSpace() {
    var keycode = keyPressed(event); 
    if (keycode === 32) {
        return false;
    }
}
function inputRestrict() {
    nameInput.elt.onkeydown = restrictSpace;
    emailInput.elt.onkeydown = restrictSpace;
}

function keyPressed() {
    var key = event.keyCode || event.charCode || event.which;
    return key;
}
