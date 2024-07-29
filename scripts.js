const todos = JSON.parse(localStorage.getItem('todos')) || []
// pega um item na local storage (se isso n tiver nada da uma lista vazia)
// resultado vem como string, transformar em obj com JSON.parse
// salvar o item, dizer qual e a chave, e o que eu vou passar na chave, e coverte tudo pra string, ex:
// JSON.stringify(localStorage.setItem('todos', ['correr', 'nadar']))
// console.log(todos)
// criar uma funçao para salvar tarefas
const input = document.querySelector('.input')
const container = document.querySelector('.container')
const addButton = document.querySelector('.add')

function salvarTarefas(){
    localStorage.setItem('todos', JSON.stringify(todos))
}

function addTarefa(nome) {
    const itemBox = document.createElement('div')
    itemBox.classList.add('item')

    const inputTask = document.createElement('input')
    inputTask.type = 'text'
    inputTask.disabled = true
    inputTask.value = nome
    inputTask.classList.add('item-input')

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.innerText = 'EDITAR'
    editBtn.addEventListener('click', () => editTarefa(inputTask, nome))


    const removeBtn = document.createElement('button')
    removeBtn.classList.add('remove')
    removeBtn.innerText = 'REMOVER'
    removeBtn.addEventListener('click', () => removeTarefa(itemBox, nome))

    container.append(itemBox)
    itemBox.append(inputTask)
    itemBox.append(editBtn)
    itemBox.append(removeBtn)

    todos.push(nome)
    

    input.value = ''
    input.focus()
}

function editTarefa(input, tarefa) {
    input.disabled = !input.disabled

    if (!input.disabled) {
        const index = todos.indexOf(tarefa)
        todos[index] = input.value
        salvarTarefas()
    }
}

function removeTarefa(itemBox, tarefa) {
    container.removeChild(itemBox)
    const index = todos.indexOf(tarefa)
    todos.splice(index,1)
    salvarTarefas()
}


addButton.addEventListener('click', () => {
    addTarefa(input.value)
    salvarTarefas()
})

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTarefa(input.value)
        salvarTarefas()
    }
})


// for(const tarefa of todos) {
//     addTarefa(tarefa)
// }


todos.forEach(task => {
    addTarefa(task)
});