const bodyDel = document.querySelector('body')
const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList'),
  toDoTitle = document.querySelector('.toDoTitle')

const TODOS_LS = 'toDos'
const CURRENT_USER = 'currentUser'
let toDos = []

function deleteToDo(event) {
  const btn = event.target
  const li = btn.parentNode
  toDoList.removeChild(li)
  console.log(`filter 처리 하기 전 toDos 값 ${JSON.stringify(toDos)}`)
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id)
  })
  console.log(`cleanToDos 값 ${JSON.stringify(cleanToDos)}`)
  toDos = cleanToDos
  saveToDos()
}
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}
function paintToDo(text) {
  const li = document.createElement('li')
  const delBtn = document.createElement('button')
  const span = document.createElement('span')
  const newId = toDos.length + 1
  delBtn.innerText = '❌'
  delBtn.addEventListener('click', deleteToDo)
  span.innerText = text
  li.appendChild(delBtn)
  li.appendChild(span)
  li.id = newId
  toDoList.appendChild(li)
  const toDoObj = {
    text: text,
    id: newId
  }
  toDos.push(toDoObj)
  saveToDos()
}

function handleSubmit(event) {
  event.preventDefault()
  console.log('실행됐땅')
  const currentValue = toDoInput.value
  paintToDo(currentValue)
  toDoInput.value = '' //submit처럼 값을 보냈을때 input창에 있는 값 초기화
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS)
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos)
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text)
    })
  }
}

function init() {
  //input 태그에 submit 이벤트가 발생했을 경우
  loadToDos()
  toDoForm.addEventListener('submit', handleSubmit)
}

init()
