document.addEventListener('DOMContentLoaded', function () {
  const popupContainer = document.getElementById('popup-container')
  const closeButton = document.getElementById('close-button')

  // Show the popup on page load
  popupContainer.style.display = 'flex'

  // Close the popup when the close button is clicked
  closeButton.addEventListener('click', function () {
    popupContainer.style.display = 'none'
  })
})
