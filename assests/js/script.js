const initGradeApp = () => {
  const form = document.querySelector('#grade-form')
  const studentName = document.querySelector('#student-name')
  const subjectName = document.querySelector('#subject-name')
  const subjectMark = document.querySelector('#subject-mark')
  let errMsg = document.querySelector('#err-msg')
  let count = 1
  const availableResults = getStoreResults()
  console.log(availableResults)
  // errMsg.textContent = ''

  form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('process data')

    const userData = processUserData(form)
    console.log(userData)
    // validate userdata
    if (
      userData.subjectMark < 0 ||
      userData.subjectMark > 100 ||
      userData.subjectMark === null
    ) {
      subjectMark.focus()
      if (userData.subjectMark < 0) {
        showErrMsg('Marks should not be less than zero!', errMsg)
      }
      if (userData.subjectMark > 100) {
        showErrMsg('Enter number between (0 - 100)', errMsg)
      }
    }

    if (
      userData.studentName === '' ||
      userData.studentName === null ||
      typeof userData.studentName !== 'string'
    ) {
      showErrMsg('Enter full names', studentName)
    }
    console.log(studentData)
    // store to local storage
    storeResults(studentData, availableResults)
    const studentData = displayResult(userData, count)

    // clearError(errMsg)
  })
}
const displayResult = (data, count) => {
  const studentList = document.querySelector('#student-results')
  const availableResults = getStoreResults()
  const usercounter =
    availableResults.length > 0 ? availableResults.length + 1 : count
  if (!studentList) {
    console.log('Result section not found')
    return
  }
  const row = document.createElement('tr')

  const counter = String(usercounter)
  console.log(availableResults)
  let id = counter < 10 ? counter.padStart(2, '0') : counter // user uniqueid
  const studentId = document.createElement('td')
  studentId.textContent = id
  row.appendChild(studentId)
  for (const key in data) {
    const td = document.createElement('td')
    td.textContent = data[key]
    row.appendChild(td)
  }

  // add other data
  const totalElement = document.createElement('td')
  totalElement.textContent = '100'
  const averageElement = document.createElement('td')
  averageElement.textContent = data.subjectMark
  const gradeElement = document.createElement('td')
  gradeElement.textContent = calculateMarks(data.subjectMark)
  //append data here

  row.append(totalElement, averageElement, gradeElement)
  studentList.append(row)
  console.log(row)

  return {
    id,
    fullNames: data.studentName,
    subject: data.subjectName,
    mark: data.subjectMark
  }
}
const calculateMarks = mark => {
  let grade = Number(mark)
  switch (true) {
    case grade >= 90:
      grade = 'A'
      break
    case grade >= 80:
      grade = 'B'
      break
    case grade >= 70:
      grade = 'C'
      break
    case grade >= 60:
      grade = 'D'
      break
    case grade >= 50:
      grade = 'E'
      break
    default:
      grade = 'F'
      break
  }
  return grade
}
const storeResults = (data, availableResults) => {
  const newRecords = {
    data,
    ...availableResults
  }
  localStorage.setItem('marks', JSON.stringify(newRecords))
}
const getStoreResults = () => {
  const results = JSON.parse(localStorage.getItem('marks') ?? '[]')
  return results
}
const showErrMsg = (message, target) => {
  target.classList.remove('hidden')
  target.textContent = message
  return
}
const clearError = target => {
  target.textContent = ''
  target.classList.add('hidden')
}
const restForm = target => {
  target.reset()
}

// Process user form details
const processUserData = form => {
  const data = new FormData(form)
  const studentName = data.get('student-name').trim()
  const subjectName = data.get('subject-name').trim()
  const subjectMark = Number(data.get('subject-mark').trim())

  return {
    studentName,
    subjectName,
    subjectMark
  }
}

window.addEventListener('load', e => {
  initGradeApp()
})
