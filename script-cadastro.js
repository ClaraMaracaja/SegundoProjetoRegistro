const form = document.getElementById('form-exercicios');
const erroMsg = document.getElementById('erro-msg');

let exercicios = JSON.parse(localStorage.getItem('exercicios')) || [];

function exibirMensagemErro(mensagem) {
    erroMsg.innerText = mensagem;
    erroMsg.style.display = 'block'; // Torna a mensagem visível
}

function ocultarMensagemErro() {
    erroMsg.style.display = 'none'; // Oculta a mensagem de erro
}

function validarData(data) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(data)) {
        return false; // Caso o formato da data seja inválido.
    }

    const [day, month, year] = data.split('/').map(Number);
    const date = new Date(year, month - 1, day); // Cria um objeto Date com a data fornecida.

    // Verifica se a data é válida (por exemplo, 30 de fevereiro não é válido).
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const data = document.getElementById('data').value.trim();
    const duracao = parseInt(document.getElementById('duracao').value);

    ocultarMensagemErro(); // Esconde a mensagem de erro antes de verificar novamente

    if (!validarData(data)) {
        exibirMensagemErro('Por favor, insira uma data válida no formato dd/mm/aaaa.');
        return;
    }

    if (isNaN(duracao) || duracao <= 0) {
        exibirMensagemErro('Por favor, insira uma duração válida (minutos).');
        return;
    }

    if (nome === '' || descricao === '') {
        exibirMensagemErro('Por favor, preencha todos os campos.');
        return;
    }

    const exercicio = { nome, descricao, data, duracao };
    exercicios.push(exercicio);
    localStorage.setItem('exercicios', JSON.stringify(exercicios)); 
    form.reset();
});
