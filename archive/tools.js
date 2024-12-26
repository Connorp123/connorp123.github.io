let output;
let command;
let outputContainer;
let radioButtons;
let processing = false;

let onSubmit = async () => {
  if (processing) {
    return false;
  }

  // Set processing
  processing = true;
  outputContainer = document.getElementById("output");

  // Set command to the checked button
  radioButtons = document.getElementsByName("command");
  radioButtons.forEach(button => {
    if (button.checked === true) {
      command = button.value;
    }
  });
  outputContainer.innerText = `Running the selected command... ${command}`;

  // Get the response
  const response = await fetch(`https://tools.connorpeace.com/run/${command}`, {
    method: "GET",
  });
  output = await response.text();

  // Set the output
  outputContainer = document.getElementById("output");
  outputContainer.innerText = output;
  processing = false;
};