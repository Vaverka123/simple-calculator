let currentOperand = "";
let previousOperand = "";
let operation = undefined;
let resultLocked = false;

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
    clearInput();
  } else if (type === "equal") {
    calculateResult();
  }
}

function appendNumber(number) {
  if (resultLocked) {
    clearInput();
  }
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
  resultLocked = true;
}

function chooseOperation(op) {
  if (currentOperand === "") return;
  if (previousOperand !== "") calculateResult();
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
  resultLocked = false;
}

function calculateResult() {
  if (!operation) return;

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
        resultLocked = true;
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
  resultLocked = true;
}

function clearInput() {
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

const setTheme = (theme) => {
  document.documentElement.className = theme;
};

document.addEventListener("DOMContentLoaded", () => {
  const themeButtons = document.querySelectorAll(
    'button[data-type="color-theme"]'
  );

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.querySelector("img").alt.includes("bright")) {
        setTheme("bright");
        button.style.display = "none";
        button.nextElementSibling.style.display = "block";
      } else if (button.querySelector("img").alt.includes("dark")) {
        setTheme("dark");
        button.style.display = "none";
        button.previousElementSibling.style.display = "block";
      }
    });
  });
});

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    appendNumber(key);
  } else if (key === ".") {
    appendNumber(".");
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    chooseOperation(key);
  } else if (key === "%") {
    caculatePercent();
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Delete" || key === "Escape" || key === "Backspace") {
    clearInput();
  }
});
