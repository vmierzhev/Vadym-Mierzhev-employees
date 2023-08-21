import { Employees } from "./employees.js";
import { parseDate } from "./dateFormat.js";
const employeesArr = [];
const commonProjectsArr = [];

const handleFile = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;
    const rows = content.split("\n");
    for (let el in rows) {
      const rowArr = rows[el].split(", ");
      rowArr[2] = parseDate(rowArr[2]);
      rowArr[3] = parseDate(rowArr[3]);
      const employeeObj = new Employees(rowArr);
      employeesArr.push(employeeObj);
    }
    findCommonProjects(employeesArr);
  };
  reader.readAsText(file);
};
const findCommonProjects = (empArr) => {
  for (let i = 1; i < empArr.length; i++) {
    for (let ii = 1; ii < empArr.length; ii++) {
      if (empArr[i].employeeID === empArr[ii].employeeID) continue;
      if (empArr[i].projectID === empArr[ii].projectID) {
        const emp1 = empArr[i].employeeID;
        const emp2 = empArr[ii].employeeID;
        const commonPeriod = findCommonPeriod(
          empArr[i].dateFrom,
          empArr[ii].dateFrom,
          empArr[i].dateTo,
          empArr[ii].dateTo
        );
        commonProjectsArr.push({
          employee1: emp1,
          employee2: emp2,
          projectId: empArr[i].projectID,
          commonPeriodLength: commonPeriod.diff,
        });
      }
    }
  }
  const longestPeriod = findLongestPeriod(
    commonProjectsArr,
    "commonPeriodLength"
  );
  displayResult(longestPeriod);
};

const findCommonPeriod = (dateFrom1, dateFrom2, dateTo1, dateTo2) => {
  let dFrom, dTo;
  if (dateFrom1 > dateFrom2 || dateFrom1 == dateFrom2) {
    dFrom = dateFrom1;
  } else if (dateFrom1 < dateFrom2) {
    dFrom = dateFrom2;
  }
  if (dateTo1 < dateTo2 || dateTo1 == dateTo2) {
    dTo = dateTo1;
  } else if (dateTo1 > dateTo2) {
    dTo = dateTo2;
  }
  const diff = (dTo - dFrom) / (1000 * 60 * 60 * 24);
  return { diff };
};

const findLongestPeriod = (objects, key) => {
  return objects.reduce((maxObject, currentObject) => {
    if (currentObject[key] > maxObject[key]) {
      return currentObject;
    }
    return maxObject;
  }, objects[0]);
};

const displayResult = (resultObj) => {
  const divContainer = document.getElementById('results');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = '<th>Employee 1</th><th>Employee 2</th><th>Project ID</th><th>Days</th>';
  thead.appendChild(headerRow);
  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');
  Object.values(resultObj).forEach(cellData =>{
    const td = document.createElement('td');
    td.textContent = cellData;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
  table.appendChild(thead);
  table.appendChild(tbody);
  divContainer.appendChild(table);
};

document.getElementById("csvFileInput").addEventListener("change", handleFile);
