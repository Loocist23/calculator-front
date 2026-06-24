const lightTheme = "styles/light.css";
const darkTheme = "styles/dark.css";
const sunIcon = "assets/SunIcon.svg";
const moonIcon = "assets/MoonIcon.svg";
const themeIcon = document.getElementById("theme-icon");
const res = document.getElementById("result");
const toast = document.getElementById("toast");
const historyList = document.getElementById("history-list");

// Tableau pour stocker l'historique des operations
let history = [];
// Variable pour savoir si on doit effacer l'affichage au prochain chiffre
let shouldClearOnDigit = false;

/**
 * Calculator - Logique métier de la calculatrice
 * Implémente les quatre opérations arithmétiques de base
 */
class Calculator {
  /**
   * Additionne deux nombres
   * @param {number} a - Premier nombre
   * @param {number} b - Deuxième nombre
   * @returns {number} La somme de a et b
   */
  add(a, b) {
    return a + b;
  }

  /**
   * Soustrait deux nombres
   * @param {number} a - Premier nombre
   * @param {number} b - Deuxième nombre
   * @returns {number} La différence entre a et b
   */
  subtract(a, b) {
    return a - b;
  }

  /**
   * Multiplie deux nombres
   * @param {number} a - Premier nombre
   * @param {number} b - Deuxième nombre
   * @returns {number} Le produit de a et b
   */
  multiply(a, b) {
    return a * b;
  }

  /**
   * Divise deux nombres
   * @param {number} a - Dividende
   * @param {number} b - Diviseur
   * @returns {number} Le quotient de a divisé par b
   * @throws {Error} Si b est égal à 0
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error("Division par zéro impossible.");
    }
    return a / b;
  }
}

const calculator = new Calculator();

/**
 * Ajoute une opération à l'historique
 * @param {string} expression - L'expression calculée
 * @param {number} result - Le résultat du calcul
 */
function addToHistory(expression, result) {
  history.unshift({
    expression: expression,
    result: result
  });
  
  // Limiter l'historique à 10 entrées
  if (history.length > 10) {
    history.pop();
  }
  
  renderHistory();
}

/**
 * Affiche l'historique dans le DOM
 */
function renderHistory() {
  historyList.innerHTML = "";
  
  history.forEach((item, index) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.textContent = `${item.expression} = ${item.result}`;
    historyItem.addEventListener("click", () => {
      res.value = item.expression;
      shouldClearOnDigit = false;
    });
    historyList.appendChild(historyItem);
  });
}

/**
 * Parse et évalue une expression mathématique en utilisant la classe Calculator
 * Évalue de gauche à droite (comme une calculatrice basique)
 * @param {string} expression - L'expression à évaluer (ex: "5+3*2")
 * @returns {number} Le résultat du calcul
 */
function evaluateExpression(expression) {
  if (!expression || expression.trim() === "") {
    return 0;
  }
  
  // Remplacer x par * pour uniformiser
  let expr = expression.replace(/x/g, '*');
  
  // Extraire tous les tokens (nombres et opérateurs)
  const tokens = expr.match(/(\d+\.?\d*|[\+\-\*\/])/g);
  
  if (!tokens || tokens.length === 0) {
    return NaN;
  }
  
  // Le premier token doit être un nombre
  let result = parseFloat(tokens[0]);
  
  // Parcourir les tokens par paires (opérateur, nombre)
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextValue = parseFloat(tokens[i + 1]);
    
    if (isNaN(nextValue)) {
      return NaN;
    }
    
    try {
      switch (operator) {
        case '+':
          result = calculator.add(result, nextValue);
          break;
        case '-':
          result = calculator.subtract(result, nextValue);
          break;
        case '*':
          result = calculator.multiply(result, nextValue);
          break;
        case '/':
          result = calculator.divide(result, nextValue);
          break;
        default:
          return NaN;
      }
    } catch (error) {
      // Gérer l'erreur de division par zéro
      return NaN;
    }
  }
  
  return result;
}

function calculate(value) {
  const calculatedValue = evaluateExpression(value || null);
  if (isNaN(calculatedValue)) {
    res.value = "Can't divide 0 with 0";
    setTimeout(() => {
      res.value = "";
    }, 1300);
  } else {
    // Sauvegarder dans l'historique seulement si value n'est pas vide
    if (value && value.trim() !== "") {
      addToHistory(value, calculatedValue);
    }
    res.value = calculatedValue;
    shouldClearOnDigit = true;
  }
}

// Swaps the stylesheet to achieve dark mode.
function changeTheme() {
  const theme = document.getElementById("theme");
  setTimeout(() => {
    toast.innerHTML = "Calculator";
  }, 1500);
  if (theme.getAttribute("href") === lightTheme) {
    theme.setAttribute("href", darkTheme);
    themeIcon.setAttribute("src", sunIcon);
    toast.innerHTML = "Dark Mode 🌙";
  } else {
    theme.setAttribute("href", lightTheme);
    themeIcon.setAttribute("src", moonIcon);
    toast.innerHTML = "Light Mode ☀️";
  }
}

// Displays entered value on screen.
function liveScreen(enteredValue) {
  const isOperator = ['+', '-', '*', '/', 'x'].includes(enteredValue);
  
  // Si c'est un chiffre ou un point et qu'on doit effacer
  if (shouldClearOnDigit && !isOperator) {
    res.value = "";
    shouldClearOnDigit = false;
  }
  
  if (!res.value) {
    res.value = "";
  }
  
  res.value += enteredValue;
  
  // Si on tape un opérateur, on peut continuer à ajouter à l'expression
  if (isOperator) {
    shouldClearOnDigit = false;
  }
}

//adding event handler on the document to handle keyboard inputs
document.addEventListener("keydown", keyboardInputHandler);

//function to handle keyboard inputs
function keyboardInputHandler(e) {
  // to fix the default behavior of browser,
  // enter and backspace were causing undesired behavior when some key was already in focus.
  // Only prevent default for keys that shouldn't have browser default behavior
  if (['Enter', 'Backspace'].includes(e.key)) {
    e.preventDefault();
  }
  //grabbing the liveScreen

  const isOperator = ['+', '-', '*', '/', 'x'].includes(e.key);
  const isDigitOrDot = /^[0-9.]$/.test(e.key);
  
  // Si c'est un chiffre ou un point et qu'on doit effacer
  if (shouldClearOnDigit && isDigitOrDot) {
    res.value = "";
    shouldClearOnDigit = false;
  }

  //numbers
  if (e.key === "0") {
    res.value += "0";
  } else if (e.key === "1") {
    res.value += "1";
  } else if (e.key === "2") {
    res.value += "2";
  } else if (e.key === "3") {
    res.value += "3";
  } else if (e.key === "4") {
    res.value += "4";
  } else if (e.key === "5") {
    res.value += "5";
  } else if (e.key === "6") {
    res.value += "6";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "8") {
    res.value += "8";
  } else if (e.key === "9") {
    res.value += "9";
  }

  //operators
  if (e.key === "+") {
    res.value += "+";
    shouldClearOnDigit = false;
  } else if (e.key === "-") {
    res.value += "-";
    shouldClearOnDigit = false;
  } else if (e.key === "*") {
    res.value += "*";
    shouldClearOnDigit = false;
  } else if (e.key === "/") {
    res.value += "/";
    shouldClearOnDigit = false;
  }

  //decimal key
  if (e.key === ".") {
    res.value += ".";
  }

  //press enter to see result
  if (e.key === "Enter") {
    calculate(res.value);
  }
  
  //press = to see result (alternative to Enter)
  if (e.key === "=") {
    calculate(res.value);
  }

  //backspace for removing the last input
  if (e.key === "Backspace") {
    const resultInput = res.value;
    //remove the last element in the string
    res.value = resultInput.substring(0, res.value.length - 1);
  }
}
