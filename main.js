let theInput = document.querySelector(".add-task input");
let addButton = document.querySelector(".add-task .plus");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let tasksContainer = document.querySelector(".tasks-content");
let deleteAll = document.getElementById("deleteAll");
let finishAll = document.getElementById("finishAll");
let TasksArray = [];

window.onload = () => {
  theInput.focus();
};

if (window.localStorage.getItem("myTasks")) {
  let locArr = localStorage.getItem("myTasks");
  let convertData = JSON.parse(locArr);
  console.log(convertData);
  for (let i = 0; i < convertData.length; i++) {
    let mainSpan = document.createElement("span"),
      deleteButt = document.createElement("span"),
      textSpan = document.createTextNode(convertData[i]),
      deleteText = document.createTextNode("Delete");

    mainSpan.className = "task-box";
    deleteButt.className = "delete";

    mainSpan.appendChild(textSpan);
    deleteButt.appendChild(deleteText);
    mainSpan.appendChild(deleteButt);
    tasksContainer.appendChild(mainSpan);
  }
}

function checkNoTasks() {
  if (document.querySelector(".tasks-content").childElementCount == 0) {
    // Makes a No Tasks Message
    let noTasksspan = document.createElement("span");
    noTasksspan.className = "no-tasks-message";
    noTasksspan.appendChild(document.createTextNode("No Tasks To Show"));
    document.querySelector(".tasks-content").appendChild(noTasksspan);
  } else {
    if (
      document
        .querySelector(".tasks-content")
        .contains(document.querySelector(".no-tasks-message"))
    ) {
      document.querySelector(".no-tasks-message").remove();
    } else {
      return false;
    }
  }
}

function calculateTasks() {
  // Calculate All Tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;
  // Calculate Completed Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

addButton.onclick = function addTask() {
  if (theInput.value == "") {
    theInput.focus();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Write Your Task!",
      footer: '<a href="">Why do I have this issue?</a>'
    });
  } else {
    if (!TasksArray.includes(theInput.value)) {
      taskCreation(theInput.value);
      checkNoTasks();
      calculateTasks();
      deleteSpan();
    } else {
      Swal.fire({
        icon: "error",
        title: "",
        text: `${theInput.value} Already Exists!`,
        footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  }
};

checkNoTasks();
calculateTasks();
deleteSpan();

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
    calculateTasks();
  }
});

finishAll.onclick = function () {
  if (document.querySelector(".tasks-content .task-box")) {
    Swal.fire({
      title: `Do you want to Finish All Tasks ?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        /**Finish All Code Here */

        document.querySelectorAll(".tasks-content .task-box").forEach((els) => {
          els.classList.toggle("finished");
          calculateTasks();
        });

        Swal.fire(`All Tasks Has been finished Succuessfully`, "", "success");
      } else if (result.isDenied) {
        Swal.fire("Process cancelled succesfully", "", "info");
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "",
      text: "There Are No Tasks To Finish!",
      footer: '<a href="">Why do I have this issue?</a>'
    });
  }
};

deleteAll.onclick = function () {
  if (document.querySelector(".tasks-content .task-box")) {
    Swal.fire({
      title: `Do you want to Delete All Tasks ?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        document.querySelector(".tasks-content").innerHTML = "";
        TasksArray.splice(0, TasksArray.length);
        window.localStorage.removeItem("myTasks");
        checkNoTasks();
        calculateTasks();
        Swal.fire(`All Tasks Deleted Succuessfully`, "", "success");
      } else if (result.isDenied) {
        Swal.fire("Process cancelled succesfully", "", "info");
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "",
      text: "There Are No Tasks To Delete!",
      footer: '<a href="">Why do I have this issue?</a>'
    });
  }
};

function deleteSpan() {
  let allDelete = document.querySelectorAll(".delete");
  allDelete.forEach((el) => {
    el.addEventListener("click", function (e) {
      Swal.fire({
        title: `Do you want to Delete "${e.target.parentElement.childNodes[0].textContent}" ?`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Cancel`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          e.target.parentElement.remove();
          if (document.querySelector(".tasks-content").childElementCount == 0) {
            checkNoTasks();
          }
          calculateTasks();
          Swal.fire(
            `"${e.target.parentElement.childNodes[0].textContent}" Deleted`,
            "",
            "success"
          );
        } else if (result.isDenied) {
          Swal.fire("Task Hasnt deleted", "", "info");
        }
      });
    });
  });
}

function taskCreation(task) {
  let mainSpan = document.createElement("span"),
    deleteButt = document.createElement("span"),
    textSpan = document.createTextNode(task),
    deleteText = document.createTextNode("Delete");

  mainSpan.className = "task-box";
  deleteButt.className = "delete";

  TasksArray.push(task);

  //Check Local Storage ::
  if (window.localStorage.getItem("myTasks")) {
    console.log("There Are Tasks , ADD TO THEM");
    let myTasks = window.localStorage.getItem("myTasks");
    let myTasksNW = JSON.parse(myTasks);
    console.log(myTasksNW);
    myTasksNW.push(task);
    console.log(myTasksNW);
    window.localStorage.setItem("myTasks", JSON.stringify(myTasksNW));
  } else {
    localStorage.setItem("myTasks", "");
    localStorage.myTasks += JSON.stringify(TasksArray);
  }
  mainSpan.appendChild(textSpan);
  deleteButt.appendChild(deleteText);
  mainSpan.appendChild(deleteButt);
  tasksContainer.appendChild(mainSpan);

  Swal.fire(` "${theInput.value}" Added Successfully`);

  theInput.value = "";
  theInput.focus();
}
