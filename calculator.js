let running_total = 0;
let buffer = "0";

let prevOperator = null;

const screen = document.querySelector(".screen");

document.querySelector('.calc-buttons').addEventListener('click', function(event){
    buttonClick(event.target.innerText);
})

function buttonClick(value) {
    if(isNaN(parseInt(value))) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }

    rerender();
}

function handleNumber(value) {
    if(buffer == "0") {
        buffer = value;
    }
    else {
        buffer += value;
    }
}

function handleSymbol(value) {

    switch(value) {
        case 'C':
            buffer = "0";
            running_total = 0;
            prevOperator = null;
            break;
        case "=":
            if(prevOperator == null) {
                return;
            }
            flushOperation(parseInt(buffer));
            prevOperator = null;
            buffer = "" + running_total;
            running_total = 0;
            break;
        case "←":
            console.log("here");
            if(buffer.length == 1) {
                buffer = "0";
            }
            else {
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        default:
            console.log(value);
            handleMath(value);
            break;
    }

}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if(running_total == 0) {
        running_total += intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    prevOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    if(prevOperator == "+") {
        running_total += intBuffer;
    } else if(prevOperator == "-") {
        running_total -= intBuffer;
    } else if(prevOperator == "*") {
        running_total *= intBuffer;
    }
    else {
        running_total /= intBuffer;
    }

    console.log(running_total);
}

function rerender() {
    screen.innerText = buffer;
}