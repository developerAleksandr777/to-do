const output = document.querySelector('.output')
const form = document.querySelector('form')
const input = document.querySelector('input')
const delBtn = document.querySelector('.container__delete__btn')

let todos = []


const createTask = () => {
    let task = {
        id: new Date().toISOString(),
        message: input.value,
        status: false,
        date: new Date()
    }
    todos.push(task)
    renderTodos()
}

delBtn.addEventListener('click', () => {
    todos = []
    output.innerHTML = ''
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!input.value) {
        alert('error')
    } else {
        createTask()
    }
    input.value = ''
    console.log(todos);
})



const renderTodos = () => {
    output.innerHTML = ''
    const ol = document.createElement('ol')
    todos.forEach((el) => {
        const block = document.createElement('div')
        const message = document.createElement('p')
        const edit = document.createElement('button')
        const deleteBtn = document.createElement('button')
        const done = document.createElement('button')
        const status = document.createElement('p')

        const li = document.createElement('li')

        message.textContent = el.message

        edit.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        `

        deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
        `
        done.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
        </svg>
        `
        status.textContent = el.status ? status.textContent = 'todo is completed' : status.textContent = 'todo is not completed'

        block.className = 'container__block'
        
        block.style.background = el.status ? li.classList = 'block__active1' : li.classList = 'block__active2'

        
        if (el.status) {
            message.style.cssText = `text-decoration: line-through;`
            edit.addEventListener('click', () => {
                alert('Error. ToDo is already completed')
            })
        } else {
            edit.addEventListener('click', () => {
                editTodo(el.id)
            })
        }
        deleteBtn.addEventListener('click', () => {
            // deleteTodoSplice(el.id)
            if (el.status) {
                deleteTodoFilter(el.id)
            } else {
                alert('ToDo is not completed')
            }
        })
        done.addEventListener('click', () => {
            doneTodo(el.id)
        })

        output.append(ol)
        ol.append(li)
        li.append(message,status,edit,deleteBtn,done)
    })

}




const editTodo = (id) => {
    const editedMessage = prompt('edit message')
    if (editedMessage === '' || editedMessage === null) {
        alert('Error. Prompt is empty')
    } else {
        todos = todos.map(item => {
            if (id === item.id) {
                return { ...item, message: editedMessage }
            }
            return item
        })
    }
    // todos = newTodos
    renderTodos()
}

// const deleteTodoSplice = (id) => {
//     const index = todos.findIndex(el => el.id === id)
//     const newTodos = [...todos]
//     newTodos.splice(index, 1)
//     todos = newTodos
//     renderTodos()
// }

// [{1},{2},{3}] - todos
// [{1},{2}]
// {1} - true
// {2} - true
// {3} - false
const deleteTodoFilter = (id) => {
    todos = todos.filter(el => el.id !== id)
    renderTodos()
}

const doneTodo = (id) => {
    todos = todos.map(item => {
        if (id === item.id) {
            return { ...item, status: !item.status }
        }
        return item
    })
    console.log(todos)
    renderTodos()
}