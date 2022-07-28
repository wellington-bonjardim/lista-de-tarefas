const inputTarefa = document.querySelector('.nova-tarefa-input')
const botaoAdicionar = document.querySelector('.nova-tarefa-botao')
const tarefaAdicionada = document.querySelector('.tarefa-adicionada')

const validaInput = () => inputTarefa.value.trim().length > 0

const adicionarTarefa = () => {
    const inputValido = validaInput()

    if(!inputValido) {
        return inputTarefa.classList.add('erro')
    }

    const tarefaPendente = document.createElement('div')
    tarefaPendente.classList.add('novo-item')

    const tarefaConteudo = document.createElement('p')
    tarefaConteudo.innerText = inputTarefa.value

    const divBotoes = document.createElement('div')
    
    const concluirTarefa = document.createElement('i')
    concluirTarefa.classList.add('fa-solid')
    concluirTarefa.classList.add('fa-check')

    concluirTarefa.addEventListener('click', () => concluirTarefaClick(tarefaConteudo))

    const deletarTarefa = document.createElement('i')
    deletarTarefa.classList.add('fa-solid')
    deletarTarefa.classList.add('fa-trash-can')

    deletarTarefa.addEventListener('click', () => deletarTarefaClick(tarefaPendente, tarefaConteudo))

    tarefaPendente.appendChild(tarefaConteudo)
    tarefaPendente.appendChild(divBotoes)
    divBotoes.appendChild(concluirTarefa)
    divBotoes.appendChild(deletarTarefa)

    tarefaAdicionada.appendChild(tarefaPendente)

    inputTarefa.value = ''

    atualizarLocalStorage()
}

const concluirTarefaClick = (tarefaConteudo) => {
    const tarefas = tarefaAdicionada.childNodes

    for(const tarefa of tarefas) {
        const tarefaAtualClicada = tarefa.firstChild.isSameNode(tarefaConteudo)

        if(tarefaAtualClicada) {
            tarefa.firstChild.classList.toggle('finalizada')
        }
    }

    atualizarLocalStorage()
}

const deletarTarefaClick = (tarefaPendente, tarefaConteudo) => {
    const tarefas = tarefaAdicionada.childNodes

    for(const tarefa of tarefas) {
        const tarefaAtualClicada = tarefa.firstChild.isSameNode(tarefaConteudo)
        
        if(tarefaAtualClicada) {
            tarefaPendente.remove()
        }
    }

    atualizarLocalStorage()
}

const atualizarLocalStorage = () => {
    const tarefas = tarefaAdicionada.childNodes

    const tarefasLocalStorage = [...tarefas].map((tarefa) => {
        const conteudo = tarefa.firstChild
        const tarefaFinalizada = conteudo.classList.contains('finalizada')

        return {descricao: conteudo.innerText, tarefaFinalizada}
    })
    
    localStorage.setItem('tarefas', JSON.stringify(tarefasLocalStorage))
}

const permanecerDadosFrontEnd = () => {
    const conteudoLocalStorage = JSON.parse(localStorage.getItem('tarefas'))

    if(!conteudoLocalStorage) return

    for(const tarefa of conteudoLocalStorage) {
        const tarefaPendente = document.createElement('div')
        tarefaPendente.classList.add('novo-item')

        const tarefaConteudo = document.createElement('p')
        tarefaConteudo.innerText = tarefa.descricao

        if(tarefa.tarefaFinalizada) {
            tarefaConteudo.classList.add('finalizada')
        }

        const divBotoes = document.createElement('div')
        
        const concluirTarefa = document.createElement('i')
        concluirTarefa.classList.add('fa-solid')
        concluirTarefa.classList.add('fa-check')

        concluirTarefa.addEventListener('click', () => concluirTarefaClick(tarefaConteudo))

        const deletarTarefa = document.createElement('i')
        deletarTarefa.classList.add('fa-solid')
        deletarTarefa.classList.add('fa-trash-can')

        deletarTarefa.addEventListener('click', () => deletarTarefaClick(tarefaPendente, tarefaConteudo))

        tarefaPendente.appendChild(tarefaConteudo)
        tarefaPendente.appendChild(divBotoes)
        divBotoes.appendChild(concluirTarefa)
        divBotoes.appendChild(deletarTarefa)

        tarefaAdicionada.appendChild(tarefaPendente)
    }
}

permanecerDadosFrontEnd()

const mudaEstadoInput = () => {
    const inputValido = validaInput()

    if(inputValido) {
        return inputTarefa.classList.remove('erro')
    }
}

botaoAdicionar.addEventListener('click', () => adicionarTarefa())
inputTarefa.addEventListener('change', () => mudaEstadoInput())
