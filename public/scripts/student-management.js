const deleteStudentButtonElements = document.querySelectorAll(
  '.student-item button'
)

async function deleteStudent(event) {
  const buttonElement = event.target
  const studentId = buttonElement.dataset.studentid
  const csrfToken = buttonElement.dataset.csrf

  const response = await fetch(
    '/admin/student/' + studentId + '?_csrf=' + csrfToken,
    {
      method: 'DELETE',
    }
  )

  if (!response.ok) {
    alert('Something went wrong!')
    return
  }

  const studentListItemElement = buttonElement.closest('li')
  studentListItemElement.remove()
}

for (const deleteStudentButtonElement of deleteStudentButtonElements) {
  deleteStudentButtonElement.addEventListener('click', deleteStudent)
}
