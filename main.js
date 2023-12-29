(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


let form = $("#form1");
let table = $("#gridSection tbody");

let usrId = $("#usrId");
let fullName = $("#fullName");
let usrName = $("#usrName");
let password = $("#password");
let firstName = $("#firstName");
let lastName = $("#lastName");

let isrtBtn = $("#insertBtn");
let updtBtn = $("#updateBtn");

let data = [{}];

let validator = form.validate({
  showErrors: function(errorMap, errorList) {}
});

function insertData() {
  if(form.valid()){
    data.push({
      FullName: fullName.val(),
      UserName: usrName.val(),
      Password: password.val(),
      FirstName:firstName.val(),
      LastName: lastName.val()
    });
  
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    bindTable();
  }
  else{
    console.log("Form validation failed!");
  }
}

let bindTable = () => {
  table.empty();

  data.forEach((item, index) => {
    const row = $("<tr>");
    row.append(`<th scope="row">${index + 1}</th>`);
    row.append(`<td>${item.FullName}</td>`);
    row.append(`<td>${item.UserName}</td>`);
    row.append(`<td>${item.Password}</td>`);
    row.append(`<td>${item.FirstName}</td>`);
    row.append(`<td>${item.LastName}</td>`);

    const actions = $("<td>");
    actions.append(`<button type="button" class="btn btn-sm btn-outline-primary me-3" onclick="editData(${index}, $(this))"><i class="bi bi-pencil-square me-2"></i>Edit</button>`);
    actions.append(`<button type="button" class="btn btn-sm btn-outline-danger ms-3" onclick="deleteData(${index})"><i class="bi bi-trash3-fill me-2"></i>Delete</button>`);

    row.append(actions);
    
    table.append(row);
  });
  resetForm();
}

let resetForm = () => {
  form[0].reset();
  updtBtn.addClass("d-none");
  isrtBtn.removeClass("d-none");
  enableBtns();
}

function updateData() {
  let usrIndex = usrId.val();
  if(form.valid() && usrIndex){
    data[usrIndex].FullName = fullName.val();
    data[usrIndex].UserName = usrName.val();
    data[usrIndex].Password = password.val();
    data[usrIndex].FirstName = firstName.val();
    data[usrIndex].LastName = lastName.val();
  
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    bindTable();
  }
  else{
    console.log("Form validation failed!");
  }
  enableBtns();
}

let deleteData = (index) => {
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
  bindTable();
}

function editData(index, button) {
  enableBtns();

  const row = button.closest("tr");
  const buttons = row.find("button");
  buttons.prop("disabled", true);
  const item = data[index];

  usrId.val(index);
  fullName.val(item.FullName);
  usrName.val(item.UserName);
  password.val(item.Password);
  firstName.val(item.FirstName);
  lastName.val(item.LastName);

  isrtBtn.addClass("d-none");
  updtBtn.removeClass("d-none");
}

let replaceURL = () => {
  window.history.replaceState({}, document.title, "/" + "crudJS.html");
}

let enableBtns = () => {
  let buttons = table.find("button:disabled");
  buttons.removeAttr("disabled");
}

(() => {
  replaceURL();
  data = JSON.parse(localStorage.getItem("data")) || []
  bindTable();
})();