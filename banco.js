const NOME_BANCO = "clientes_db";


function obterDados() {

    try {

        const dados = localStorage.getItem(NOME_BANCO);

        if (!dados) {
            return [];
        }

        return JSON.parse(dados);

    } catch (erro) {

        console.error("Erro ao carregar banco:", erro);

        return [];

    }
}

function salvarDados(dados) {


    if (!Array.isArray(dados)) {

        console.error("Dados inválidos!");

        return;

    }


    localStorage.setItem(
        NOME_BANCO,
        JSON.stringify(dados)
    );

}

function gerarId() {

    return Date.now();

}

function adicionarCliente(cliente) {


    let clientes = obterDados();


    cliente.id = gerarId();

    cliente.dataCadastro = new Date()
        .toLocaleDateString("pt-BR");


    clientes.push(cliente);


    salvarDados(clientes);


}

function listarClientes() {

    return obterDados();

}

function buscarCliente(id) {


    let clientes = obterDados();


    return clientes.find(
        cliente => cliente.id == id
    );


}

function atualizarCliente(id, novosDados) {


    let clientes = obterDados();


    clientes = clientes.map(cliente => {


        if (cliente.id == id) {


            return {
                ...cliente,
                ...novosDados
            };


        }


        return cliente;


    });



    salvarDados(clientes);


}

function excluirCliente(id) {


    let clientes = obterDados();



    clientes = clientes.filter(
        cliente => cliente.id != id
    );



    salvarDados(clientes);


}

function limparBanco() {


    localStorage.removeItem(NOME_BANCO);


}