"use strict";
const firstButton = document.querySelector("#o-first");
const lastButton = document.querySelector("#o-last");
const tableBody = document.querySelector(".table-body");
const detailsContainer = document.querySelector("#modal-container");
const closeDetailsButton = document.querySelector("#close-button");
const detailsModal = document.querySelector("#modal-window");
const studentModal = document.querySelector("#studentModal");
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
    tableBody.innerHTML += `
            <tr>
                <td>${person.toString()}</td>
                <td>
                    <button class='details-btn' type='button' data-target='${index}'>Details</button>
                </td>
                <td>
                    <button class='delete-btn' type='button' data-target='${index}'>X</button>
                </td>
            </tr>
        `;
  });

  deleteStudent();
  showDetails();
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
  //console.log(sortedStudentLast);
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
  return function(a, b) {
    if (a.lastName > b.lastName) {
      return 1;
    } else if (a.lastName < b.lastName) {
      return -1;
    }
  };
}

function deleteStudent() {
  const deleteButtons = document.querySelectorAll("button.delete-btn");
  //console.log(deleteButtons);
  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener("click", function() {
      const index = deleteButton.getAttribute("data-target");
      //console.log(index);

      // remove the student
      students.splice(index, 1);
      displayStudents(students);
    });
  });
}

function showDetails() {
  const detailsButtons = document.querySelectorAll("button.details-btn");
  //console.log(detailsButtons);

  detailsButtons.forEach(detailsButton => {
    detailsButton.addEventListener("click", showModal);

    function showModal() {
      detailsContainer.classList.remove("hidden");
    }

    closeDetailsButton.addEventListener("click", closeDetails);

    function closeDetails() {
      detailsContainer.classList.add("hidden");
    }
  });
}
