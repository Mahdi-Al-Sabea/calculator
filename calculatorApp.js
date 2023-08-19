function checkOperation(ins, out) {
  let lastCharacter = out[out.length - 1];
  console.log(lastCharacter + " last char");

  if (isNaN(parseInt(lastCharacter))) {
    console.log("substitute");
    out = out.slice(0, out.length - 1) + ins;
    return out;
  } else {
    console.log("new");
    out += ins;
    return out;
  }
}

const elements = document.querySelectorAll(".cal-elements");
let output = "";
let ans;

elements.forEach((Element) => {
  Element.addEventListener("click", (e) => {
    let input = e.target.innerHTML;
    handleInput(input);
  });
});

window.addEventListener("keydown", (e) => {
  let key = e.key;
  const allowedKeys = /[1-9+\-=*/.c]|\bBackspace\b|\bEnter\b/; // Regular expression for allowed keys

  if (!allowedKeys.test(key)) {
    e.preventDefault(); // Ignore unwanted characters
    return;
  }

  if (key === "Enter") {
    key = "=";
  }

  if (key === "Backspace") {
    key = "back";
  }

  const shiftKey = event.shiftKey;
  if (key === "+" && shiftKey) {
    key = "+";
  }

  handleInput(key);
});

function handleInput(input) {
  if (input === "back") {
    let temp = "";

    for (i = 0; i < output.length - 1; i++) {
      temp += output[i];
    }

    output = temp;
  } else if (input === "c") {
    output = "";
  } else if (input === "=") {
    ans = 1;
    output = eval(output);
    output = output.toString();
    console.log(typeof output);
  } else if (input <= 9) {
    if (ans === 1) {
      output = "";
      ans = 0;
    }

    output += input;
    console.log("new number");
  } else {
    if (ans === 1) {
      ans = 0;
    }

    output = checkOperation(input, output);
    console.log(output);
  }

  document.querySelector(".screen").innerHTML = output;
  console.log(output);
}
