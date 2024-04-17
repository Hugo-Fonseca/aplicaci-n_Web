document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('employee-form');
    const nameInput = document.getElementById('name');
    const positionInput = document.getElementById('position');
    const salaryInput = document.getElementById('salary');
    const addButton = document.getElementById('add-btn');
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
            resetForm();
        }
    });
    
    function validateFields(name, position, salary) {
        if (name === '' || position === '' || isNaN(salary)) {
            alert('Por favor complete todos los campos correctamente.');
            return false;
        }
        return true;
    }
    
    function resetForm() {
        toggleButtons('add');
        editIndex = -1;
    }
    
    function toggleButtons(action) {
        if (action === 'add') {
            addButton.style.display = 'inline';
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
        } else if (action === 'edit') {
            addButton.style.display = 'none';
            saveButton.style.display = 'inline';
            cancelButton.style.display = 'inline';
        } else if (action === 'save') { 
            addButton.style.display = 'inline';
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
        }
    }
  
    function addEmployee(name, position, salary) {
        const row = document.createElement('tr');
        const id = generateUniqueId(); // Generar un identificador único para la fila
        row.dataset.id = id;
        row.innerHTML = `
            <td>${name}</td>
            <td>${position}</td>
            <td>${salary}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn" data-id="${id}">Eliminar</button>
            </td>
        `;
        employeeList.appendChild(row);
    
        const editButtons = document.querySelectorAll('.edit-btn');
    
        editButtons.forEach((button) => {
            button.addEventListener('click', function () {
                const rowIndex = button.parentNode.parentNode.rowIndex;
                editIndex = rowIndex - 1; // Ajustar el índice de edición
                nameInput.value = employeeList.rows[editIndex].cells[0].innerText;
                positionInput.value = employeeList.rows[editIndex].cells[1].innerText;
                salaryInput.value = parseFloat(employeeList.rows[editIndex].cells[2].innerText);
                toggleButtons('edit');
            });
        });
    
        const deleteButtons = document.querySelectorAll('.delete-btn');
    
        deleteButtons.forEach((button) => {
            button.addEventListener('click', function () {
                const id = button.dataset.id;
                const rowToRemove = document.querySelector(`tr[data-id="${id}"]`);
                rowToRemove.remove();
            });
        });
    }
    
    // Función para generar un identificador único
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    
    function configureEditAndDeleteButtons() {
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');
    
        editButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                editIndex = index;
                nameInput.value = employeeList.rows[index].cells[0].innerText;
                positionInput.value = employeeList.rows[index].cells[1].innerText;
                salaryInput.value = parseFloat(employeeList.rows[index].cells[2].innerText);
                toggleButtons('edit');
            });
        });
    
        deleteButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                const rowIndex = index;
                employeeList.deleteRow(rowIndex);
                configureEditAndDeleteButtons();
            });
        });
    }

function configureEditAndDeleteButtons() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            editIndex = index;
            nameInput.value = employeeList.rows[index].cells[0].innerText;
            positionInput.value = employeeList.rows[index].cells[1].innerText;
            salaryInput.value = parseFloat(employeeList.rows[index].cells[2].innerText);
            toggleButtons('edit');
        });
    });

    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const rowIndex = index;
            employeeList.deleteRow(rowIndex);
            configureEditAndDeleteButtons();
        });
    });
}
  
saveButton.addEventListener('click', function (event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const position = positionInput.value.trim();
    const salary = parseFloat(salaryInput.value);

    if (!validateFields(name, position, salary)) {
        return;
    }

    editEmployee(editIndex, name, position, salary);
    nameInput.value = ''; // Limpiar los campos de entrada
    positionInput.value = '';
    salaryInput.value = '';
    resetForm(); // Restablecer el formulario y el índice de edición
});
  
    cancelButton.addEventListener('click', function (event) {
        event.preventDefault();
        resetForm();
    });
  
    function editEmployee(index, name, position, salary) {
        const row = employeeList.rows[index];
        row.cells[0].innerText = name;
        row.cells[1].innerText = position;
        row.cells[2].innerText = salary;
    }
  });


  const botonRegresar = document.getElementById('retornar');
botonRegresar.addEventListener('click', function() {
  window.location.href = '../index.html';
});