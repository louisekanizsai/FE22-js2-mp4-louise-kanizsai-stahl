const numberBtns: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".number"); // 0-9
const operatorBtns: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".operator"); // + - * /

const clearBtn: HTMLButtonElement | null = document.querySelector(".clear"); 
const equalsBtn: HTMLButtonElement | null = document.querySelector(".equals"); 
const display: HTMLElement | null = document.querySelector(".display");

let lastValue: string = ""; // senast inskrivna värdet på displayen
let storedValue: string = ""; // sparar senast inmatat tal (lastValue) när man klickar på en operatorknapp (eller sparar resultatet av en beräkning, om man klickar på en operatorknapp för andra gången)
let storedOperator: string = ""; //sparar senast klickade operatorknappen

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const clickedNumber: string = button.innerText;

    if (display !== null) {
      // om den är resettad, eller om man nyss klickat på en operator: ersätt vad som står med den klickade siffran
      if (
        display.innerText === "0" ||
        display.innerText === "+" ||
        display.innerText === "-" ||
        display.innerText === "*" ||
        display.innerText === "/"
      ) {
        display.innerText = clickedNumber;
      } else {
        // om det står siffror i displayen: fyll på med siffror
        display.innerText += clickedNumber;
      }

      // uppdaterar senaste värdet
      lastValue = display.innerText;
    }
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const clickedOperator: string = button.innerText;

    if (display !== null) {
      // ser till att senaste värdet alltid är det som står på displayen
      lastValue = display.innerText;

      // om det finns en sparad operator, dvs man gör flera beräkningar på rad: gör beräkningen med sparat värde och senast värde, spara det i storedValue
      if (storedOperator !== "") {
        storedValue = calculate(storedValue, lastValue, storedOperator);
      } else {
        // annars: spara bara ner senaste värdet i storedValue
        storedValue = lastValue;
      }

      // nollställ senaste värdet, uppdatera sparad operator
      lastValue = "";
      storedOperator = clickedOperator;
      display.innerText = clickedOperator; // visa vilken operator man klickat på
    }
  });
});

if (clearBtn !== null) {
  clearBtn.addEventListener("click", () => {
    // resettar allt
    if (display !== null) {
      display.innerText = "0";
    }
    storedValue = "";
    lastValue = "";
    storedOperator = "";
  });
}

if (equalsBtn !== null) {
  equalsBtn.addEventListener("click", () => {
    // kollar att allt är ok dvs det finns ett senaste värde och en vald operator. Annars händer inget
    if (display !== null && lastValue !== "" && storedOperator !== "") {
      // gör beräkningen med sparat värde, senast värde och vald operator, spara det i storedValue
      storedValue = calculate(storedValue, lastValue, storedOperator);
      
      // visa resultat och resetta
      display.innerText = storedValue; 
      lastValue = ""; 
      storedOperator = ""; 
    }
  });
}

// beräkningsfunktion som tar emot tre strängar: två värden (sparat och senaste), plus vår valda operator
function calculate(firstValue: string, secondValue: string, operator: string): string {
  const num1: number = parseFloat(firstValue);
  const num2: number = parseFloat(secondValue);

  // kollar vilken operator som valts, returnerar beräkningsresultat som sträng
  if (operator === "+") {
    return (num1 + num2).toString();
  } else if (operator === "-") {
    return (num1 - num2).toString();
  } else if (operator === "*") {
    return (num1 * num2).toString();
  } else if (operator === "/") {
    return (num1 / num2).toString();
  } else {
    return "0";
  }
}

// lägger till bakgrundsbild på miniräknaren
const calculator: HTMLElement | null = document.querySelector(".calculator");
const imgUrl = new URL("images/bg.jpg",import.meta.url);

 if(calculator !== null) {
    calculator.style.backgroundImage = `url(${imgUrl})`;
 }