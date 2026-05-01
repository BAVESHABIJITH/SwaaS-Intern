"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ipElement = document.getElementById("ip");
const demo = document.getElementById("demo");
const demo1 = document.getElementById("demo1");
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    const userInput = ipElement.value.trim();
    demo1.innerText = `Input: ${userInput}`;
    let detectedType;
    if (userInput === "true" || userInput === "1") {
        detectedType = "boolean (true)";
    }
    else if (userInput === "false" || userInput === "0") {
        detectedType = "boolean (false)";
    }
    else if (!isNaN(Number(userInput)) && userInput !== "") {
        detectedType = "number";
    }
    else {
        detectedType = "string";
    }
    demo.innerText = `Type: ${detectedType}`;
});
//# sourceMappingURL=Day1-Assignment.js.map