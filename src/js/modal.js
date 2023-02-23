
// const myModal = document.getElementById('listingModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })




// const modal = document.querySelector("#listingModal");

// // Add an event listener to detect when the modal is shown
// modal.addEventListener("shown.bs.modal", function () {
//   // Get the date input element inside the modal
//   const dateInput = modal.querySelector("#today");

//   // Set the date input value to today's date
//   dateInput.valueAsDate = new Date();
// });

const dateInput = document.querySelector("#listingModal #today");

// Use setTimeout to delay the execution of the code by 100 milliseconds
setTimeout(function() {
  // Set the date input value to today's date
  dateInput.valueAsDate = new Date();
}, 100);


