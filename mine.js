"use strict";
const firstButton = document.querySelector("#o-first");
const lastButton = document.querySelector("#o-last");
const infoContainer = document.querySelector(".info");
const tableBody = document.querySelector(".table-body");
const JSON = "frontenders2018.json";

let students = [];

window.addEventListener("DOMContentLoaded", init);

function init() {
  fetch(JSON)
    .then(result => result.json())
    .then(json => createList(json));
}

function createList(data) {
  data.forEach(student => {
    //console.log(student);
    const studentNames = student.split(" "); // [string] - array with names
    // const [firstNames, ...lastName] = studentNames;
    const firstNames = studentNames.slice(0, -1);
    //console.log(firstNames);
    const lastName = studentNames.slice(-1);
    const firstNameString = firstNames.join(" ");
    const newStudent = new Student(firstNameString, lastName);

    students.push(newStudent);
  });
  displayStudents(students);
  //console.log(students);
}

function Student(first, last) {
  this.firstNames = first;
  this.lastName = last;
}

Student.prototype.toString = function() {
  return this.firstNames + " " + this.lastName;
};

function displayStudents(toDisplay) {
  tableBody.innerHTML = "";
  toDisplay.forEach((person, index) => {
    /* console.log(person); -> 
          Student {firstNames: "Elísabet Rós", lastName: Array(1)}
          firstNames:"Elísabet Rós"
          lastName:["Valsdóttir"]  ---- why array?
          --most probably the first would have been an array itself but we add the .toString method
            }*/
    tableBody.innerHTML += `
            <tr>
                <td>${person.toString()}</td>
                <td>
                    <button class='info-btn' type='button' data-target='${index}'>More info...</button>
                </td>
                <td>
                    <button class='delete-btn' type='button' data-target='${index}'>X</button>
                </td>
            </tr>
        `;
  });

  addDeleteHandlers();
  addInfoHandlers();
}

//Eventlistener First Name/Last Name sorting button

firstButton.addEventListener("click", function() {
  orderByFirstName();
});

lastButton.addEventListener("click", function() {
  orderByLastName();
});

function orderByFirstName() {
  const sortedStudentFirst = students.sort(sortNameFirst());
  //console.log(sortedStudentFirst);
  displayStudents(sortedStudentFirst);
}

function orderByLastName() {
  const sortedStudentLast = students.sort(sortNameLast());
  console.log(sortedStudentLast);
  displayStudents(sortedStudentLast);
}

function sortNameFirst() {
  return function(a, b) {
    if (a.firstNames > b.firstNames) {
      return 1;
    } else {
      return -1;
    }
  };
}

function sortNameLast() {
  //console.log(nameChoice);
  // displays "firstNames" or "lastName" depending on button clicked
  return function(a, b) {
    if (a.lastName > b.lastName) {
      return 1;
    } else if (a.lastName < b.lastName) {
      return -1;
    }
  };
}

function addDeleteHandlers() {
  const buttonpersonents = document.querySelectorAll("button.delete-btn");
  //console.log(buttonpersonents);
  buttonpersonents.forEach(btnpersonent => {
    btnpersonent.addEventListener("click", function() {
      const index = btnpersonent.getAttribute("data-target");
      //console.log(index);

      // remove the student
      students.splice(index, 1);
      displayStudents(students);
    });
  });
}

function addInfoHandlers() {
  const buttonpersonents = document.querySelectorAll("button.info-btn");

  buttonpersonents.forEach(btnpersonent => {
    btnpersonent.addEventListener("click", function() {
      const index = btnpersonent.getAttribute("data-target");
      const studentName = students[index].toString();

      // display student info
      infoContainer.innerHTML = `
                <p>INFO ABOUT STUDENT</p>
                <p>Name: ${studentName}</p>
                <p>Study Programme: Multimedia Design & Communication</p>
            `;
    });
  });
}
