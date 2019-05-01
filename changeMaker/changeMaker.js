function UpdateChange() { // Primary Update Function
  let monetaryInput = document.getElementById("MonetaryInput").value;
  let changeInput = document.getElementById("ChangeInput").value;
  let OutputBox = document.getElementById("Output");

  let scale = 100;

  // Remove dollar signs from front
  monetaryInput = (monetaryInput.trim().charAt(0) === "$") ? monetaryInput.replace("$","") : monetaryInput;

  // Use the build in functionality of the parseInt() to error check for us and do some extra parsing stuff into base 10
  monetaryInput = parseFloat(monetaryInput);
  console.log(monetaryInput);
  if (Number.isNaN(monetaryInput) || monetaryInput < 0) {
    OutputBox.innerHTML = "Conversion Impossible, monetary input not valid";
    return; // Stop the program
  }

  // Error check the change input
  if (changeInput.search(/[^0-9. ,]/) !== -1 || changeInput.length === 0) { // Bad characters in change string or no input
    OutputBox.innerHTML = "Conversion Impossible, change input not valid";
    return; // Stop the program
  }

  // Create list of changes specified in list. Remove empty declarations and 0's using a filter function
  let changeList = changeInput.trim().split(/[ ,]+/).map(parseFloat).filter(function(element){return (Number.isNaN(element) || element === 0) ? false : true;});

  if (changeList.length === 0) {
    OutputBox.innerHTML = "Conversion Impossible, change input not valid";
    return; // Stop the program
  }

  // Sorting function from https://www.w3schools.com/jsref/jsref_sort.asp
  changeList = changeList.sort(function(a, b){return b-a});


  monetaryInput = Math.round(monetaryInput * scale);
  changeList = changeList.map(function(a){return Math.round(a*scale);});

  let numEachDenomonation = new Array(changeList.length);
  for (let i = 0; i < changeList.length; i++) {
    let numCurrentDenomonation = Math.floor(monetaryInput/changeList[i]);
    monetaryInput -= Math.round(numCurrentDenomonation*changeList[i]);
    numEachDenomonation[i] = numCurrentDenomonation;
  }
  console.log(numEachDenomonation);
  console.log("Remainder: " + monetaryInput/scale);

  // Generate Output HTML

  let output = "";

  for (let i = 0; i < numEachDenomonation.length; i++) {
    if (numEachDenomonation[i] > 0) {
      output += numEachDenomonation[i] + " of denomination: ";
      output += (changeList[i]/scale < 1) ? changeList[i]/scale*100 + "¢" : "$" + changeList[i]/scale;
      output += "<br>";
    }
  }
  if (monetaryInput !== 0) {
    output += "<br><span style='color:darkred;'>Remainder: " + ((monetaryInput/scale < 1) ? monetaryInput/scale*100 + "¢" : "$" + monetaryInput/scale);
    output += "</span>";
  }

  OutputBox.innerHTML = output;
}
