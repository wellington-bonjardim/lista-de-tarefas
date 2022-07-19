const input = document.querySelector('.nova-tarefa-input')
const botaoAdicionar = document.querySelector('.nova-tarefa-botao')
const tarefaAdicionada = document.querySelector('.tarefa-adicionada')

const validaInput = () => input.value.trim().length > 0

const adicionarTarefa = () => {
    const inputValido = validaInput()

    if(!inputValido) {
        return input.classList.add('erro')
    }

    const tarefaPendente = document.createElement('div')
    tarefaPendente.classList.add('novo-item')

    const tarefaConteudo = document.createElement('p')
    tarefaConteudo.innerText = input.value

    const deletarTarefa = document.createElement('i')
    deletarTarefa.classList.add('fa-solid')
    deletarTarefa.classList.add('fa-trash-can')

    tarefaPendente.appendChild(tarefaConteudo)
    tarefaPendente.appendChild(deletarTarefa)

    tarefaAdicionada.appendChild(tarefaPendente)

    input.value = ''
}

const mudaEstadoInput = () => {
    const inputValido = validaInput()

    if(inputValido) {
        return input.classList.remove('erro')
    }
}

botaoAdicionar.addEventListener('click', () => adicionarTarefa())
input.addEventListener('change', () => mudaEstadoInput())
