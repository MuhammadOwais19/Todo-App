//Selecting DOM elements
let body = document.body;
const elemParent = document.querySelector(".elem-parent");
const theme = document.querySelector(".theme-btn");
const menu = document.querySelector(".menu");
const input = document.querySelector(".input");
const backgroundImg = document.querySelector(".main-img");
const deleteBtn = document.querySelector(".delete-btn");
const form = document.querySelector("form");
const clearBtn = document.querySelector(".clear-btn");
let todoElem = document.querySelectorAll(".todo-elem");
let statusElem = document.querySelectorAll(".status-elem");

//checking number of todoElems
let items = document.querySelector(".total");
items.innerHTML = `<span>${todoElem.length}</span> Items left`;

//Countes the todoelem
function onForm() {
  todoElem = document.querySelectorAll(".todo-elem");

  //Updating the the items counter
  items.innerHTML = `<span>${todoElem.length}</span> Items left`;
}
onForm();

// Todo: ============
let data = [];
let complatedData = [];
const dataLS = localStorage.getItem("todos");
const cmpLS = localStorage.getItem("complete");
// items.innerHTML = `<span>${dataLS.length}</span> Items left`;
data = dataLS == null ? [] : JSON.parse(dataLS);
complatedData = cmpLS == null ? [] : JSON.parse(cmpLS);

// Add new elements in to DOM
form.addEventListener("submit", (e) => {
  //preventing the website to reload
  e.preventDefault();

  if (input.value.length > 0) {
    //Storing
    data.push(input.value);
    saveLS();

    rendering(input.value);
  }

  onForm();

  //empty the input value
  input.value = "";
});

// Todo: Storing in LS
function saveLS() {
  localStorage.setItem("todos", JSON.stringify(data));
  localStorage.setItem("complete", JSON.stringify(complatedData));
}

// Geting from LS and rendering
window.addEventListener("load", () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const cmpTodos = JSON.parse(localStorage.getItem("complete"));

  todos.forEach((v) => {
    rendering(v);
  });
  cmpTodos.forEach((v) => {
    rendering(v);
  });
  onForm();
});

function removeElem(e, c) {
  c.addEventListener("click", () => {
    if (data.includes(e.innerText)) {
      data.splice(data.indexOf(e.innerText), 1);
    }
    complatedData.splice(complatedData.indexOf(e.innerText), 1);
    saveLS();
    e.remove();
    onForm();
  });
}

// Rendering DOM elements
function rendering(value) {
  let inpVal = value;

  //Creating an li
  let elem = document.createElement("li");
  //adding
  if (body.classList.contains("light")) {
    elem.classList.add("todo-elem", "theme");
  }
  if (complatedData.includes(value)) {
    elem.classList.add("todo-elem", "complete");
  } else {
    elem.classList.add("todo-elem");
  }
  //Putting the HTML
  elem.innerHTML = `
    <p class="m-0">${value}</p>
  `;

  //Function that on click add the class
  elem.addEventListener("click", function () {
    elem.classList.toggle("complete");
    if (data.includes(elem.innerText)) {
      data.splice(data.indexOf(elem.innerText), 1);
      complatedData.push(elem.innerText);
    } else if (complatedData.includes(elem.innerText)) {
      complatedData.splice(complatedData.indexOf(elem.innerText), 1);
      data.push(elem.innerText);
    }

    saveLS();
  });

  //Creating another Elem div
  let cross = document.createElement("div");
  //adding the  HTML
  cross.innerHTML = `<img  class="delete-btn"  src="images/icon-cross.svg" alt="" />`;

  removeElem(elem, cross);

  //Appending the second to first child
  elem.appendChild(cross);

  //Appending to the main parent
  elemParent.appendChild(elem);
}

// theme fucntion
theme.addEventListener("click", () => {
  //Selecting body elem
  let body = document.body;

  body.classList.toggle("light");
  menu.classList.toggle("theme");
  input.classList.toggle("inp-theme");
  backgroundImg.classList.toggle("theme-img");

  //checking if  body as white class
  if (body.classList.contains("light")) {
    theme.innerHTML = '<img src="images/icon-moon.svg">';

    //looping thorugh all the todoElem to apply theme
    for (let i = 0; i < todoElem.length; i++) {
      todoElem[i].classList.add("theme");
    }
  } else {
    theme.innerHTML = '<img src="images/icon-sun.svg">';
    for (let i = 0; i < todoElem.length; i++) {
      todoElem[i].classList.remove("theme");
    }
  }
});

//looping through the statusElem
for (let i = 0; i < statusElem.length; i++) {
  //click function
  statusElem[i].addEventListener("click", () => {
    //checking if the statusElem is Active
    if (statusElem[i].innerHTML === "Active") {
      //adding and removing class
      statusElem[i].classList.add("active");
      statusElem[i - 1].classList.remove("active");
      statusElem[i + 1].classList.remove("active");
    }
    //checking if the statusElem is Completed
    else if (statusElem[i].innerHTML === "Completed") {
      //adding and removing class
      statusElem[i].classList.add("active");
      statusElem[i - 1].classList.remove("active");
      statusElem[i - 2].classList.remove("active");
    }
    //checking if the statusElem is All
    else {
      //adding and removing classes
      statusElem[i].classList.add("active");
      statusElem[i + 1].classList.remove("active");
      statusElem[i + 2].classList.remove("active");
    }

    if (statusElem[i].innerHTML === "Active") {
      for (let i = 0; i < todoElem.length; i++) {
        if (todoElem[i].classList.contains("complete")) {
          todoElem[i].classList.add("none");
        } else {
          todoElem[i].classList.remove("none");
        }
      }
    } else if (statusElem[i].innerHTML === "Completed") {
      for (let i = 0; i < todoElem.length; i++) {
        if (!todoElem[i].classList.contains("complete")) {
          todoElem[i].classList.add("none");
          console.log("run");
        } else {
          todoElem[i].classList.remove("none");
        }
      }
    } else {
      for (let i = 0; i < todoElem.length; i++) {
        todoElem[i].classList.remove("none");
      }
    }
  });
}

//clear complete todos function
clearBtn.addEventListener("click", () => {
  for (let i = 0; i < todoElem.length; i++) {
    if (todoElem[i].classList.contains("complete")) {
      todoElem[i].parentNode.removeChild(todoElem[i]);
    }
  }
  complatedData = [];
  saveLS();
  onForm();
});
