let currentOperand = "";
let previousOperand = "";
let operation = undefined;

function updateInput() {
  const input = document.getElementById("main-input");
  input.value = currentOperand || "0";
}

function handleButtonClick(event) {
  const value = event.target.getAttribute("data-value");
  const type = event.target.getAttribute("data-type");

  if (type === "number") {
    appendNumber(value);
  } else if (type === "sign") {
    toggleSign();
  } else if (type === "percent") {
    caculatePercent();
  } else if (type === "operator") {
    chooseOperation(value);
  } else if (type === "clear") {
    clearScreen();
  } else if (type === "equal") {
    calculateResult();
  }
}

function appendNumber(number) {
  if (currentOperand === "" && number === "0") return;
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
  updateInput();
}

function toggleSign() {
  if (currentOperand === "") return;
  currentOperand = (parseFloat(currentOperand) * -1).toString();
  updateInput();
}

function caculatePercent() {
  if (currentOperand === "") return;
  currentOperand = (parseFloat(currentOperand) * 0.01).toString();
  updateInput();
}

function chooseOperation(op) {
  if (currentOperand === "") return;
  if (previousOperand !== "") calculateResult();
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
}

function calculateResult() {
  let result;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);

  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      if (curr === 0) {
        currentOperand = "undefined";
        updateInput();
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  operation = undefined;
  previousOperand = "";
  updateInput();
}

function clearScreen() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
  updateInput();
}

document
  .getElementById("main-input")
  .addEventListener("paste", function (event) {
    event.preventDefault();
  });

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
