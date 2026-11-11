const initGradeApp = () => {
  const form = document.querySelector('#grade-form')
  const studentName = document.querySelector('#student-name')
  const subjectName = document.querySelector('#subject-name')
  const subjectMark = document.querySelector('#subject-mark')
  form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('process data')
    const userData = processUserData(form)
    console.log(userData)
  })
}
const displayResult = () => {}
const calculateMarks = () => {}
const storeResults = () => {}
const getResults = () => {}
const processUserData = form => {
  const data = new FormData(form)
  const studentName = data.get('student-name').trim()
  const subjectName = data.get('subject-name').trim()
  const subjectMark = data.get('subject-mark')

  return {
    studentName,
    subjectName,
    subjectMark
  }
}

window.addEventListener('load', e => {
  initGradeApp()
})
