$(document).ready(function() {
    clearCurrentValue();
    deleteLastValue();
    addNumberToDisplay();
    addOperationToDisplay();
    addParentheses();
    performOperation();
    $("#content-display-body").html(0);
    $("#content-display-result").html(0);
});

function clearCurrentValue() {
    $("#clear").click(function(event) {
        $("#content-display-body").html(0);
        $("#content-display-result").html(0);
    })
}

function deleteLastValue() {
    $("#del").click(function(event) {
        var currentValue = getCurrentValue();
        currentValue = currentValue.slice(0, -1);
        setCurrentValue(currentValue);
    });
}

function getCurrentValue() {
    var currentValue = $("#content-display-body").html();
    return currentValue;
}

function setCurrentValue(value) {
    $("#content-display-body").html(value);
}

function displayResult(value) {
    $("#content-display-result").html(value);
}

function hasOperationLastCharacter() {
    var currentValue = getCurrentValue();
    var currentValueLastCharacter = currentValue.substr(currentValue.length - 1);
    if(currentValueLastCharacter == "+" || currentValueLastCharacter == "-" || currentValueLastCharacter == "x" || currentValueLastCharacter == "÷") {
        return true;
    }
    else {
        return false;
    }
}

function addNumberToDisplay() {
    $(".number").click(function(event) {
        var currentValue = getCurrentValue();
        if(currentValue == "0") {
            setCurrentValue(this.innerHTML);
        }
        else {
            setCurrentValue(currentValue + this.innerHTML);
        }
    });
}

function addOperationToDisplay() {
    $(".operation").click(function(event) {
        if(!hasOperationLastCharacter()) {
            var currentValue = getCurrentValue();
            setCurrentValue(currentValue + this.innerHTML);
        }
    })
}

function addParentheses() {
    $("#parentheses").click(function(event) {
        var currentValue = getCurrentValue();
        for(var i = currentValue.length; i > 0; i--) {
            if(currentValue[i] == ")") {
                if(hasOperationLastCharacter()) {
                    setCurrentValue(currentValue + "(");
                }
                return;
            }
            if(currentValue[i] == "(") {
                if(i == currentValue.length - 1) {
                    setCurrentValue(currentValue + "0)");
                    return;
                }
                if(!hasOperationLastCharacter()) {
                    setCurrentValue(currentValue + ")");
                    return;
                }
            }
        }

        if(hasOperationLastCharacter()) {
            setCurrentValue(currentValue + "(");
        }
        else {
            return;
        }
    })
}

function performOperation() {
    $("#equals").click(function(event) {
        var currentValue = getCurrentValue();
        currentValue = currentValue.replace(new RegExp('x', 'g'), "*");
        currentValue = currentValue.replace(new RegExp('÷', 'g'), "/");
        displayResult(eval(currentValue));
    });
}