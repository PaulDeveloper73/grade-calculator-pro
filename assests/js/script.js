const initGradeApp = () => {
  const form = document.querySelector('#grade-form')
  const studentName = document.querySelector('#student-name')
  const subjectName = document.querySelector('#subject-name')
  const subjectMark = document.querySelector('#subject-mark')
  let errMsg = document.querySelector('#err-msg')
  const formStatus = document.querySelector('#form-status')

  // errMsg.textContent = ''
  // available data in the app
  getAllRecords()
  performanceOverview()
  editStudentdetails()
  deleteStudentdetails()

  form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('process data')
    const availableResults = getStoreResults()

    const userData = processUserData(form)
    console.log(userData)
    // Updating data
    if (formStatus.value === 'update') {
      updatingStudentDetails(availableResults, userData)
      return
    }
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
    const allRecords = [...availableResults, userData]
    // /store all records
    storeResults(allRecords)
    getAllRecords()
    performanceOverview()
    showSucessMsg(errMsg, 'New Records Added Successfully!')
    restForm()
  })
}
const getAllRecords = () => {
  const availableResults = getStoreResults()
  const studentList = document.querySelector('#student-results')
  studentList.replaceChildren(' ')
  if (availableResults.length > 0) {
    availableResults.map((item, i) => displayResult(item, i + 1))
  } else {
    console.log('No data is available!')
  }
  // restForm()
}
const showSucessMsg = (target, msg) => {
  target.classList.remove('hidden', 'bg-red-50', 'text-red-600')
  target.classList.add('bg-green-50', 'text-green-600')
  target.textContent = msg
  setTimeout(() => {
    target.classList.add('hidden', 'bg-red-50', 'text-red-600')
    target.classList.remove('bg-green-50', 'text-green-600')
    target.textContent = ''
  }, 5000)
}
const showDeleteMsg = (target, msg) => {
  target.classList.add('bg-red-50', 'text-red-600')
  target.classList.remove('hidden', 'bg-green-50', 'text-green-600')
  target.textContent = msg
  setTimeout(() => {
    target.classList.remove('bg-red-50', 'text-red-600')
    target.classList.add('hidden', 'bg-green-50', 'text-green-600')
    target.textContent = ''
  }, 5000)
}
const updatingStudentDetails = (availableRecords, data) => {
  let errMsg = document.querySelector('#err-msg')

  const UpdatedData = [...availableRecords].map(user => {
    if (user.id == data.id) {
      console.log(user.id)
      return {
        ...user,
        ...data
      }
    } else {
      return user
    }
  })
  storeResults(UpdatedData)
  getAllRecords()
  performanceOverview()
  showSucessMsg(errMsg, 'Record Updated Successfully!')
  restForm()
}
const displayResult = (data, count) => {
  const studentList = document.querySelector('#student-results')
  if (!studentList) {
    console.log('Result section not found')
    return
  }
  const row = document.createElement('tr')

  const counter = String(count)
  let id = counter < 10 ? counter.padStart(2, '0') : counter // user uniqueid
  const studentId = document.createElement('td')
  studentId.textContent = id
  row.appendChild(studentId)
  for (const key in data) {
    if (key === 'id' || key == 'formStatus') {
      continue
    }
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
  // Edit btn
  const editBtnTd = document.createElement('td')
  const editBtn = document.createElement('button')
  editBtn.textContent = 'Edit'
  editBtn.id = data.id
  editBtn.className =
    'editBtn p-2 text-slate-100 rounded bg-blue-400 text-sm hover:bg-blue-700 '
  editBtnTd.appendChild(editBtn)
  // Delete btn
  const deleteBtnTd = document.createElement('td')
  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'Delete'
  deleteBtn.id = data.id
  deleteBtn.className =
    'deleteBtn p-2 rounded text-slate-100 bg-red-400 text-sm hover:bg-red-700 ms-2'
  editBtnTd.appendChild(deleteBtn)

  //append data here

  row.append(totalElement, averageElement, gradeElement, editBtnTd)
  studentList.append(row)
  console.log(row)

  return {
    id,
    fullNames: data.studentName,
    subject: data.subjectName,
    mark: data.subjectMark
  }
}

// Process student record editting
const editStudentdetails = () => {
  const studentList = document.querySelector('#student-results')

  studentList.addEventListener('click', e => {
    const target = e.target.closest('.editBtn')
    if (!target) {
      return
    }
    const studentName = document.querySelector('#student-name')
    const subjectName = document.querySelector('#subject-name')
    const subjectMark = document.querySelector('#subject-mark')
    const submitGradeBtn = document.querySelector('#submit-grade')
    const formStatus = document.querySelector('#form-status')
    const stuId = document.querySelector('#stu-id')
    studentName.focus()
    const allAvailableRecords = getStoreResults()
    const filteredList = [...allAvailableRecords].filter(
      user => user.id == target.id
    )
    submitGradeBtn.textContent = 'Update Record'
    formStatus.value = 'update'
    console.log(filteredList)
    filteredList?.map(user => {
      stuId.value = user.id
      studentName.value = user.studentName
      subjectName.value = user.subjectName
      subjectMark.value = user.subjectMark
    })

    console.log(target.id)
    getAllRecords()
    performanceOverview()
  })
}
const deleteStudentdetails = () => {
  const studentList = document.querySelector('#student-results')
  let errMsg = document.querySelector('#err-msg')

  studentList.addEventListener('click', e => {
    const allAvailableRecords = getStoreResults()
    const target = e.target.closest('.deleteBtn')
    if (!target) {
      return
    }

    const filteredList = [...allAvailableRecords].filter(
      user => user.id != target?.id
    )
    storeResults(filteredList)
    getAllRecords()
    performanceOverview()
    restForm()
    showDeleteMsg(errMsg, 'Record deleted Successfully!')
  })
}

// process student record deleting
const performanceOverview = () => {
  const totalRecords = document.querySelector('#total-records')
  const classAverage = document.querySelector('#class-average')
  const highestMark = document.querySelector('#highest-mark')
  const topGrade = document.querySelector('#top-grade')
  const showingRecords = document.querySelector('#showing-records')
  const studentRecords = getStoreResults()
  const getTotalRecords = studentRecords.length
  // Filter marks
  const filteredMark = studentRecords.filter(
    item =>
      item.subjectMark !== 0 && item.subjectMark > 0 && item.subjectMark <= 100
  )
  console.log(filteredMark)
  const filteredMarkTotal = filteredMark.reduce(
    (total, item) => total + Number(item.subjectMark),
    0
  )
  // Calculate class average
  const getClassAverage =
    filteredMark.length > 0 ? filteredMarkTotal / filteredMark.length : 0
  const maxMark = [...filteredMark].sort(
    (a, b) => Number(b.subjectMark) - Number(a.subjectMark)
  )
  // Calculate the highest mark
  const getHigestMark = maxMark.length > 0 ? maxMark[0].subjectMark : 0
  const getHighestGradeAchieved =
    maxMark.length > 0 ? calculateMarks(getHigestMark) : 0

  // Show students performance
  totalRecords.textContent = getTotalRecords ?? '__'
  classAverage.textContent = getClassAverage.toFixed(2) ?? '__'
  highestMark.textContent = getHigestMark ?? '__'
  topGrade.textContent = getHighestGradeAchieved ?? '__'
  showingRecords.textContent = getTotalRecords ?? 0
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
const storeResults = data => {
  localStorage.setItem('marks', JSON.stringify(data))
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
const restForm = () => {
  const form = document.querySelector('#grade-form')
  const studentName = document.querySelector('#student-name')
  form.reset()
  studentName.focus()
}

// Process user form details
const processUserData = form => {
  const data = new FormData(form)
  const studentName = data.get('student-name').trim()
  const subjectName = data.get('subject-name').trim()
  const subjectMark = Number(data.get('subject-mark').trim())
  const formStatus = data.get('form-status').trim()
  const stuId = data.get('stu-id').trim()
  // Process id
  const allStudentRecords = getStoreResults()
  let id = allStudentRecords.length > 0 ? allStudentRecords.length + 1 : 1
  if (String(formStatus) === 'update') {
    id = stuId
  }

  return {
    id,
    studentName,
    subjectName,
    subjectMark,
    formStatus
  }
}

window.addEventListener('load', e => {
  initGradeApp()
})
