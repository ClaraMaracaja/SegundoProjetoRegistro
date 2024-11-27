const tabelaExercicios = document.getElementById('tabela-exercicios').getElementsByTagName('tbody')[0];
const pesquisarBtn = document.getElementById('pesquisar-btn');
const contagemExercicios = document.getElementById('contagem-exercicios');

let exercicios = JSON.parse(localStorage.getItem('exercicios')) || [];

function atualizarTabela(exercicios) {
    tabelaExercicios.innerHTML = '';
    exercicios.forEach(exercicio => {
        const row = tabelaExercicios.insertRow();
        row.insertCell(0).innerText = exercicio.nome;
        row.insertCell(1).innerText = exercicio.descricao;
        row.insertCell(2).innerText = exercicio.data;
        row.insertCell(3).innerText = exercicio.duracao;
    });

    contagemExercicios.innerText = `Total de Exercícios: ${exercicios.length}`;
}

pesquisarBtn.addEventListener('click', function() {
    const tipoPesquisa = document.getElementById('pesquisa-tipo-input').value.trim().toLowerCase();
    const dataPesquisa = document.getElementById('pesquisa-data-input').value.trim();

    const resultados = exercicios.filter(exercicio => {
        const tipoValido = !tipoPesquisa || exercicio.nome.toLowerCase().includes(tipoPesquisa); 
        const dataValida = !dataPesquisa || exercicio.data === dataPesquisa; 

        return tipoValido && dataValida; 
    });

    if (resultados.length === 0) {
        tabelaExercicios.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum exercício encontrado</td></tr>';
    } else {
        atualizarTabela(resultados);
    }
});

atualizarTabela(exercicios); // Exibe os dados armazenados inicialmente
