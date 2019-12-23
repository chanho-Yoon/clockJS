const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList')
const TODOS_LS = 'toDos'
let toDos = []
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}
function paintToDo(text) {
  const li = document.createElement('li')
  const delBtn = document.createElement('button')
  const span = document.createElement('span')
  const newId = toDos.length + 1

  delBtn.innerText = '❌'
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
  loadToDos()
  //input 태그에 submit 이벤트가 발생했을 경우
  toDoForm.addEventListener('submit', handleSubmit)
}

init()
