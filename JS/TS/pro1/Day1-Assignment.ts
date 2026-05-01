const ipElement = document.getElementById("ip") as HTMLInputElement;
const demo = document.getElementById("demo") as HTMLParagraphElement;
const demo1 = document.getElementById("demo1") as HTMLParagraphElement;
const btn = document.getElementById("btn") as HTMLButtonElement;

btn.addEventListener("click", () => {
    const userInput = ipElement.value.trim();
    demo1.innerText = `Input: ${userInput}`;
    let detectedType: string;
    if (userInput === "true" || userInput === "1") {
        detectedType = "boolean (true)";
    } else if (userInput === "false" || userInput === "0") {
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
