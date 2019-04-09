var InputA;
var InputB;
var table;
var outputDiv;

var Initialize = function() {
   InputA = document.getElementById("InputA");
   InputB = document.getElementById("InputB");
   table = document.getElementById("OutputTable");
   outputDiv = document.getElementById("outputDiv");
   Run();
}

var Run = function() {
   ResetTable();
   var result = RussianPM(+InputA.value,+InputB.value);
   outputDiv.innerHTML = "total = " + result;
}

var RussianPM = function(A , B) {
   // Sorter block

   if (A < B) {
       // alert("A is less than B, pick a number larger than B for A");
       // return NaN;
       let C = A;
       A = B;
       B = C;
   }

   let total = 0;
   let i = 0;
   WriteIterationToTable(i,total,A,B);
   i++;
   while (B > 1) {
       if (B%2 == 1) {
           total += A;
       }
       A = A * 2;
       B = Math.floor(B / 2);
       WriteIterationToTable(i,total,A,B);
       i++;
   }
   total = total + A;
   WriteIterationToTable("End Result", total, A, B);
   return total;
}
function WriteIterationToTable(i,total,A,B) {
   let tempOutput = table.innerHTML;
   tempOutput = tempOutput.replace("</tbody>","");
   tempOutput += "<tr>";
   tempOutput += '<th class="BodyEl">' + i + "</th>";
   tempOutput += '<th class="BodyEl">' + total + "</th>";
   tempOutput += '<th class="BodyEl">' + A + "</th>";
   tempOutput += '<th class="BodyEl">' + B + "</th>";

   tempOutput += "</tr> </tbody>";

   table.innerHTML = tempOutput;
   console.log(tempOutput);
}

function ResetTable() {
   let htmlString = '<tr>';
   htmlString += '<th class="HeaderEl">Iteration</th>';
   htmlString += '<th class="HeaderEl">Total</th>';
   htmlString += '<th class="HeaderEl">A</th>';
   htmlString += '<th class="HeaderEl">B</th></tr>';
   table.innerHTML = htmlString;
}
