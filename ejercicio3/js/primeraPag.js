const botonRegresar = document.getElementById('retornar');
botonRegresar.addEventListener('click', function() {
  window.location.href = '../index.html';
});
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('employee-form');
  const nameInput = document.getElementById('name');
  const positionInput = document.getElementById('position');
  const salaryInput = document.getElementById('salary');
  const addButton = document.getElementById('add-btn');
  const editButton = document.getElementById('edit-btn');
  const cancelButton = document.getElementById('cancel-btn');
  const employeeList = document.getElementById('employee-list');
  const saveButton = document.getElementById('save-btn'); // Agregamos la referencia al botón de guardar

  let editIndex = -1;

  addButton.addEventListener('click', function (event) {
      event.preventDefault();
  
      const name = nameInput.value.trim();
      const position = positionInput.value.trim();
      const salary = parseFloat(salaryInput.value);
  
      if (!validateFields(name, position, salary)) {
          return;
      }
  
      if (editIndex === -1) {
          addEmployee(name, position, salary);
      } else {
          editEmployee(editIndex, name, position, salary);
      }
  
      resetForm();
  });
  
  function validateFields(name, position, salary) {
      if (name === '' || position === '' || isNaN(salary)) {
          alert('Por favor complete todos los campos correctamente.');
          return false;
      }
      return true;
  }
  
  function resetForm() {
      form.reset();
      toggleButtons('add'); // Mostramos el botón de agregar y ocultamos los de editar
      editIndex = -1;
  }
  
  function toggleButtons(action) {
      if (action === 'add') {
          addButton.style.display = 'inline';
          editButton.style.display = 'none';
          cancelButton.style.display = 'none';
          saveButton.style.display = 'none';
      } else if (action === 'edit') {
          addButton.style.display = 'none';
          editButton.style.display = 'none';
          cancelButton.style.display = 'inline';
          saveButton.style.display = 'inline';
      }
  }

  function addEmployee(name, position, salary) {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${name}</td>
          <td>${position}</td>
          <td>${salary}</td>
          <td>
              <button class="edit-btn">Editar</button>
              <button class="delete-btn">Eliminar</button>
          </td>
      `;
      employeeList.appendChild(row);

      const editButtons = document.querySelectorAll('.edit-btn');
      const deleteButtons = document.querySelectorAll('.delete-btn');

      editButtons.forEach((button, index) => {
          button.addEventListener('click', function () {
              editIndex = index;
              nameInput.value = employeeList.rows[index].cells[0].innerText;
              positionInput.value = employeeList.rows[index].cells[1].innerText;
              salaryInput.value = parseFloat(employeeList.rows[index].cells[2].innerText);
              addButton.style.display = 'none';
              editButton.style.display = 'none';
              cancelButton.style.display = 'inline';
              saveButton.style.display = 'inline'; // Mostramos el botón de guardar
          });
      });

      deleteButtons.forEach((button, index) => {
          button.addEventListener('click', function () {
              employeeList.deleteRow(index);
          });
      });
  }

  function editEmployee(index, name, position, salary) {
      employeeList.rows[index].cells[0].innerText = name;
      employeeList.rows[index].cells[1].innerText = position;
      employeeList.rows[index].cells[2].innerText = salary;
  }

  cancelButton.addEventListener('click', function (event) {
      event.preventDefault();
      form.reset();
      addButton.style.display = 'inline';
      editButton.style.display = 'none';
      cancelButton.style.display = 'none';
      saveButton.style.display = 'none'; // Ocultamos el botón de guardar aquí también
      editIndex = -1;
  });
});