const express = require('express');
const server = express();

server.use(express.json())

//Listas:
let clientes = [];
let carros = [];
let servicos = [];
let agendamentos = [];

//ids:
let idCliente = 1;
let idCarros = 1;
let idServicos = 1;
let idAgendamentos = 1;

//Cadastra um novo cliente:
server.post('/clientes', (req, res) => {
    const { nome, telefone } = req.body;

    if (nome.length < 3) {
        return res.status(404).json({ mensagem: "nome' deve conter no mínimo 3 caracteres" })
    } else if (nome.length > 100) {
        return res.status(404).json({ mensagem: "nome' deve conter no máximo 100 caracteres" })
    }

    const cliente = { id: idCliente++, nome, telefone };
    clientes.push(cliente);
    res.status(200).json({ mensagem: "Cliente cadastrado com sucesso!" });
});

//Busca todos os clientes cadastrados:
server.get('/clientes', (req, res) => {
    res.status(200).json(clientes);
});

//Busca um cliente específico pelo código:
server.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const cliente = clientes.find(c => c.id === Number.parseInt(id));

    //Validação: Se Cliente não for encontrado.
    if (!cliente) {
        return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }
    res.status(200).json(cliente);

});

//Atualiza as informações de um cliente:
server.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { codigo, nome, telefone } = req.body;
    const cliente = clientes.find(c => c.id === Number.parseInt(id));

    //Validação: Se Cliente não for encontrado.
    if (!cliente) {
        return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }
    //Validação: Deve ser maior que 0.
    if (codigo < 0) {
        return res.status(404).json({ mensagem: "codigo' deve ser maior que 0" });
    } else if (nome < 3) { //Validação: Deve conter no mínimo 3 caracteres.
        return res.status(404).json({ mensagem: "nome' deve conter no mínimo 3 caracteres" });
    } else if (nome > 100) { //Validação: Deve conter no máximo 100 caracteres.
        return res.status(404).json({ mensagem: "nome' deve conter no máximo 100 caracteres" });
    }
    cliente.id = codigo;
    cliente.nome = nome;
    cliente.telefone = telefone;
    res.status(200).json({ mensagem: "Cliente atualizado com sucesso" });
});

//Remove um cliente pelo ID.
server.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const index = clientes.findIndex(c => c.id === Number.parseInt(id));

    if (index !== -1) {
        clientes.splice(index, 1);
        res.status(200).json({ mensagem: "Cliente removido com sucesso." });
    } else {
        res.status(404).json({ mensagem: "Cliente não encontrado." })
    }
});

//Cadastra um novo carro.
server.post('/carros', (req, res) => {
    const { marca, modelo, tamanho, id_cliente } = req.body;
    //Procurando o cliente pelo ID:
    const cliente = clientes.find(c => c.id === Number.parseInt(id_cliente));

    if (marca.length < 3) {
        return res.status(404).json({ mensagem: "marca' deve conter mínimo 3 caracteres" });
    } else if (marca.length > 50) {
        return res.status(404).json({ mensagem: "marca' deve conter no máximo 50 caracteres" });
    } else if (modelo.length < 2) {
        return res.status(404).json({ mensagem: "modelo' deve conter no mínimo 2 caracteres" });
    } else if (modelo.length > 50) {
        return res.status(404).json({ mensagem: "modelo' deve conter no máximo 50 caracteres" });
    }/* else if (tamanho !== "HATCH" || tamanho != "SEDAN" || tamanho != "SUV" || tamanho != "PICAPE") {
        return res.status(404).json({ mensagem: "tamanho' deve ser HATCH, SEDAN, SUV ou PICAPE" });
    }*/ else if (!cliente) {
        return res.status(404).json({ mensagem: "id_cliente' não corresponde a um cliente cadastrado" });
    }
    const carro = { id: idCarros++, marca, modelo, tamanho, id_cliente };
    carros.push(carro);
    res.status(200).json({ mensagem: "Carro cadastrado com sucesso" });
});

//Busca um carro específico pelo código.
server.get('/carros/:id', (req, res) => {
    const { id } = req.params;
    const carro = carros.find(c => c.id === Number.parseInt(id));

    if (!carro) {
        return res.status(404).json({ mensagem: "Carro não encontrado." });
    }
    res.status(200).json(carro);
});

//Atualizar as informações de um carro.
server.put('/carros/:id', (req, res) => {
    const { id } = req.params;
    const carro = carros.find(c => c.id === Number.parseInt(id));

    if (!carro) {
        return res.status(404).json({ mensagem: "Carro não encontrado!" });
    }
    const { id_Carro, marca, modelo, tamanho, id_cliente } = req.body;

    //Procurando o cliente pelo ID:
    const cliente = clientes.find(c => c.id === Number.parseInt(id_cliente));

    if (marca.length < 3) {
        return res.status(404).json({ mensagem: "marca' deve conter mínimo 3 caracteres" });
    } else if (marca.length > 50) {
        return res.status(404).json({ mensagem: "marca' deve conter no máximo 50 caracteres" });
    } else if (modelo.length < 2) {
        return res.status(404).json({ mensagem: "modelo' deve conter no mínimo 2 caracteres" });
    } else if (modelo.length > 50) {
        return res.status(404).json({ mensagem: "modelo' deve conter no máximo 50 caracteres" });
    }/* else if (tamanho !== "HATCH" || tamanho != "SEDAN" || tamanho != "SUV" || tamanho != "PICAPE") {
        return res.status(404).json({ mensagem: "tamanho' deve ser HATCH, SEDAN, SUV ou PICAPE" });
    }*/ else if (!cliente) {
        return res.status(404).json({ mensagem: "id_cliente' não corresponde a um cliente cadastrado" });
    } else if (id_Carro < 0) {
        return res.status(404).json({ mensagem: "id_carro' deve ser maior que 0" });
    }

    carro.id = id_Carro;
    carro.marca = marca;
    carro.modelo = modelo;
    carro.tamanho = tamanho;
    carro.id_cliente = id_cliente
    res.status(200).json({ mensagem: "Carro Atualizado com sucesso" });
});

//Remove um carro pelo ID.
server.delete('/carros/:id', (req, res) => {
    const { id } = req.params;
    const index = carros.findIndex(c => c.id === Number.parseInt(id));

    if (index !== -1) {
        carros.splice(index, 1);
        res.status(200).json({ mensagem: "Carro removido com sucesso." });
    } else {
        res.status(404).json({ mensagem: "Carro não encontrado." });
    }
});

//Cadastra um novo serviço.
server.post('/servicos', (req, res) => {
    const { descricao, tamanho, valor } = req.body;

    if (descricao.length < 5) { //Validação: Deve conter no mínimo 5 caracteres.
        return res.status(404).json({ mensagem: "Deve conter no mínimo 5 caracteres." });
    } else if (descricao.length > 100) { //Validação: Deve conter no máximo 100 caracteres.
        return res.status(404).json({ mensagem: "descricao' deve conter no máximo 100 caracteres" });
    } else if (tamanho === "HATCH" && valor <= 0) {
        return res.status(404).json({ mensagem: "O valor para 'HATCH' deve ser igual ou maior que 0" });
    } else if (tamanho === "SEDAN" && valor <= 0) {
        return res.status(404).json({ mensagem: "O valor para 'SEDAN' deve ser igual ou maior que 0" });
    } else if (tamanho === "SUV " && valor <= 0) {
        return res.status(404).json({ mensagem: "O valor para 'SUV' deve ser igual ou maior que 0" });
    } else if (tamanho === "PICAPE" && valor <= 0) {
        return res.status(404).json({ mensagem: "O valor para 'PICAPE' deve ser igual ou maior que 0" });
    }
    const servico = { id: idServicos++, descricao, valores: [tamanho, valor] };
    servicos.push(servico);
    res.status(200).json({ mensagem: "Serviço cadastrado com sucesso" });
});

//Busca um serviço específico pelo código.
server.get('/servicos/:id', (req, res) => {
    const { id } = req.params;
    const servico = servicos.find(s => s.id === Number.parseInt(id));

    if (!servico) {
        return res.status(404).json({ mensagem: "Serviço não encontrado." });
    }
    res.status(200).json(servico);
});

//Remove um serviço pelo ID.
server.delete('/servicos/:id', (req, res) => {
    const { id } = req.params;
    const index = servicos.findIndex(s => s.id === Number.parseInt(id));

    if (index !== -1) {
        servicos.splice(index, 1);
        res.status(200).json({ mensagem: "Serviço removido com sucesso" });
    } else {
        res.status(404).json({ mensagem: "Serviço não encontrado." });
    }
});

//Cadastra um novo agendamento.
server.post('/agendamentos', (req, res) => {
    const { id_carro, id_servico, data_hora } = req.params;

    const carro = carros.find(c => c.id_carro === Number.parseInt(id_carro));
    const servico = servicos.find(c => c.id_servico === Number.parseInt(id_servico));

    if (!carro) {
        return res.status(404).json({ mensagem: "d_carro' não corresponde a um carro cadastrado" });
    } else if (!servico) {
        return res.status(404).json({ mensagem: "id_servico' não corresponde a um serviço cadastrado" });
    } else if (!data_hora) {
        return res.status(404).json({ mensagem: "data_hora' deve ser informado" });
    }
    const agendamento = {id: idAgendamentos++, id_carro, id_servico, data_hora};
    agendamentos.push(agendamento);
    res.status(200).json({mensagem: "Agendamento cadastrado com sucesso"});

})

//Cadastra um novo agendamento.
server.get('/agendamentos', (req, res) => {
    res.status(200).json(agendamentos);
});


server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})