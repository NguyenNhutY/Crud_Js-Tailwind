// Define a variable to keep track of the selected row for editing
let selectedRow = null;

// Function to display alert messages
const showAlert = (message, className) => {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));

  // Find the container and main elements in your HTML
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");

  // Insert the alert div before the main element
  container.insertBefore(div, main);

  // Remove the alert after 3 seconds
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
};

// Function to clear form fields
const clearFields = () => {
  document.querySelector("#name").value = "";
  document.querySelector("#roll").value = "";
  document.querySelector("#action").value = "";
};

// Function to add a new row or update an existing row
document.querySelector("#student_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const roll = document.querySelector("#roll").value;
  const action = document.querySelector("#action").value;

  if (name == "" || roll == "" || action == "") {
    showAlert("Please fill all the fields", "bg-red-700");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#student_list");
      const row = document.createElement("tr");
      row.classList.add("flex", "w-full", "mb-3");
      row.innerHTML = `
      <td class="p-4 w-1/4 text-center">${name}</td>
      <td class="p-4 w-1/4 text-center">${roll}</td>
      <td class="p-4 w-1/4 text-center">${action}</td>
      <td class="mt-6 w-1/4 flex items-center justify-end gap-x-6 ">
          <a href="#"  type="button"
          id="edit"
              class="rounded-md 
                      bg-green-500 
                      px-3 
                      py-2 
                      text-sm 
                      font-semibold 
                      text-white 
                      shadow-sm hover:bg-green-400 
                      focus-visible:outline 
                      focus-visible:outline-2 
                      focus-visible:outline-offset-2 
                      focus-visible:outline-indigo-600"> Edit
          </a>
          <a href="#" class="rounded-md 
                    bg-orange-700 
                    px-3 py-2 
                    text-sm 
                    font-semibold 
                    text-white 
                    shadow-sm 
                    hover:bg-orange-600 
                    focus-visible:outline 
                    focus-visible:outline-2 
                    focus-visible:outline-offset-2 
                    focus-visible:outline-indigo-600 
                    inline-block
                    cursor-pointer
                    delete">Delete
        </a>
      `;

      list.appendChild(row);
      selectedRow = null;
      showAlert("Student Added", "success");
    } else {
      selectedRow.children[0].innerHTML = name;
      selectedRow.children[1].innerHTML = roll;
      selectedRow.children[2].innerHTML = action;
      selectedRow = null;
      showAlert("Student Info Edited", "bg-green-600");
    }
    clearFields();
  }
});

// Function to edit a row

document.querySelector("#student_list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#name").value = selectedRow.children[0].innerHTML;
    document.querySelector("#roll").value = selectedRow.children[1].innerHTML;
    document.querySelector("#action").value = selectedRow.children[2].innerHTML;
  }
});

// Function to delete a row
document.querySelector("#student_list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Student Data has been deleted", "bg-red-700");
  }
});

// Call the functions to set up the functionality
