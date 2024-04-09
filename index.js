let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e.currentTarget)
  formValidation();
});
let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "task cannot be blank";
  } else {
    console.log("success");
    //you have noticed that the modal doesnt close automatically
    //write this fun inside the else statement of the foemValidation
    //add.setAttribute("data-bs-dsismiss", "modal");  add.click(); (() => {add.setAttribute("data-bs-dismiss", ""); })();

    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", " ");
    })();
    acceptData();
    msg.innerHTML = "";
  }
};

// how to collect data and use local storage;
//we collect the data from the input fields using the fun named acceptData
//and an array named data then we push them inside the local storage;
//let data=[];
//let acceptData=()=>{}
//localStorage.setItem("data",JSON.stringify(data));
//
let data = [];
console.log("main data:" + data);
let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTask();
};
//how to create new tasks
//in order to create a new task we nedd to create a func, use template literals to create the Html
//use  amap to push the data collection from user inside the template ;
let createTask = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    console.log("x:" + x.text); // data
    console.log("y:" + y); // index m=number
    return (tasks.innerHTML += `
      <div id=${y}>
         
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this)" class="fas fa-trash-alt"></i>
          </span>

      </div>
      `);
  });
  resetForm();
};
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};
function deleteTask(e) {
  //first: remove HTML element from screen;
  e.parentElement.parentElement.remove();
  //seond remove the targeted element from the data array;
  let indexN = e.parentElement.parentElement.id;
  console.log(indexN);
  data.splice(indexN, 1);
  //update the local storage wth new data;

  localStorage.setItem("data", JSON.stringify(data));//takes js obj and transform it to js string
  console.log(e);
}
function editTask(e) {
  //targetting the task that we selected to edit
  let selectTask = e.parentElement.parentElement;
  console.log(selectTask);
  //targetting the values  text input date input and textarea input;
  textarea.value = selectTask.children[0].innerHTML;
  console.log(textarea);
  textInput.value = selectTask.children[1].innerHTML;
  console.log(textInput);
  dateInput.value = selectTask.children[2].innerHTML;
  console.log(dateInput);
  deleteTask(e);
}
//how to get data from local storage
//If you refresh the page, you'll note that all of your data is gone. In order to solve that issue, we run a IIFE (Immediately invoked function expression) to retrieve the data from local storage.
(()=>{
  const dataString=localStorage.get("data") || [];
  //json.parse()=> // takes json string and transforms it to js obj
  data=JSON.parse(dataString)

})()
