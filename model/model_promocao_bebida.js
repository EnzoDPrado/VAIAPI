/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo Diógenes do Prado
 * Data Criacao: 11/12/2022
 * Versao: 1.0
 *********************************************************************/

// ****** // ---------- EndPoints de Pizza---------- // ******

// ---------- EndPoint para inserir nova pizza ---------- //
app.post('/v1/pizza', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de pizza
            const controllerPizza = require('./controller/controller_pizza.js');
            //Chama a funcao novaPizza da controller e encaminha os dados do body 
            const novaPizza = await controllerPizza.novaPizza(dadosBody)
            console.log(dadosBody)
            statusCode = novaPizza.status;
            message = novaPizza.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});



// ---------- EndPoint para buscar pizza pelo ID---------- //
app.get('/v1/pizza/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerPizza
        const controllerPizza = require('./controller/controller_pizza.js');

        //Retorna todos as pizzas existentes no BD
        const dadosPizza = await controllerPizza.buscarPizza(id);

        //Valida se existe retorno de dados
        if (dadosPizza) {   //Status 200
            statusCode = 200;
            message = dadosPizza;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para listar todas as pizzas existentes no BD---------- //
app.get('/v1/pizzas', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerPizza
    const controllerPizza = require('./controller/controller_pizza.js');

    //Retorna todos os pizzas existentes no BD
    const dadosPizza = await controllerPizza.listarPizzas();

    //Valida se existe retorno de dados
    if (dadosPizza) {   //Status 200
        statusCode = 200;
        message = dadosPizza;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para atualizar uma pizza pelo ID---------- //
app.put('/v1/pizza/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de pizza
                const controllerPizza = require('./controller/controller_pizza.js');
                //Chama a funcao novaPizza da controller e encaminha os dados do body 
                const novaPizza = await controllerPizza.atualizarPizza(dadosBody);
                console.log(dadosBody);
                statusCode = novaPizza.status;
                message = novaPizza.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});



app.delete('/v1/pizza/:id', cors(),jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de pizza
        const controllerPizza = require('./controller/controller_pizza.js');
        
        //Chama a funcao para excluir um item 
        const pizza = await controllerPizza.excluirPizza(id);

        statusCode = pizza.status;
        message = pizza.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});

// ****** // ---------- EndPoints de Tamanho de Pizza---------- // ******

// ---------- EndPoint para inserir novo tamanho pizza ---------- //
app.post('/v1/tamanhoPizza', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de tamanho pizza
            const controllerTamanhoPizza = require('./controller/controller_tamanhoPizza.js');
            //Chama a funcao novoTamanhoPizza da controller e encaminha os dados do body 
            const novoTamanhoPizza = await controllerTamanhoPizza.novoTamanhoPizza(dadosBody)
            statusCode = novoTamanhoPizza.status;
            message = novoTamanhoPizza.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar tamanho de pizza pelo ID---------- //
app.get('/v1/tamanhoPizza/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerPizza
        const controllerTamanhoPizza = require('./controller/controller_tamanhoPizza.js');

        //Retorna todos as pizzas existentes no BD
        const dadosTamanhoPizza = await controllerTamanhoPizza.buscarTamanhoPizza(id);

        //Valida se existe retorno de dados
        if (dadosTamanhoPizza) {   //Status 200
            statusCode = 200;
            message = dadosPizza;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para listar todas as pizzas existentes no BD---------- //
app.get('/v1/tamanhoPizzas', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerPizza
    const controllerTamanhoPizza = require('./controller/controller_tamanhoPizza.js');

    //Retorna todos os pizzas existentes no BD
    const dadosTamanhoPizza = await controllerTamanhoPizza.listarTamanhosPizza();

    //Valida se existe retorno de dados
    if (dadosTamanhoPizza) {   //Status 200
        statusCode = 200;
        message = dadosPizza;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para atualizar uma pizza pelo ID---------- //
app.put('/v1/tamanhoPizza/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de pizza
                const controllerTamanhoPizza = require('./controller/controller_tamanhoPizza.js');
                //Chama a funcao novaPizza da controller e encaminha os dados do body 
                const novoTamanhoPizza = await controllerTamanhoPizza.atualizarTamanhoPizza(dadosBody);
                
                statusCode = novoTamanhoPizza.status;
                message = novoTamanhoPizza.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para excluir tamanho existente---------- //
app.delete('/v1/tamanhoPizza/:id', cors(),jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de pizza
        const controllerTamanhoPizza = require('./controller/controller_tamanhoPizza.js');
        
        //Chama a funcao para excluir um item 
        const pizza = await controllerTamanhoPizza.excluirTamanhoPizza(id);

        statusCode = pizza.status;
        message = pizza.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});



// ****** // ---------- EndPoints de Ingredientes ---------- // ******

// ---------- EndPoint para inserir novo ingrediente ---------- //
app.post('/v1/ingrediente', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de tamanho pizza
            const controllerIngrediente = require('./controller/controller_ingredientes.js');
            //Chama a funcao novoTamanhoPizza da controller e encaminha os dados do body 
            const novoIngrediente = await controllerIngrediente.novoIngrediente(dadosBody)
            statusCode = novoIngrediente.status;
            message = novoIngrediente.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});



// ---------- EndPoint para listar todos os ingredientes existentes no BD---------- //
app.get('/v1/ingredientes', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerPizza
    const controllerIngrediente = require('./controller/controller_ingredientes.js');

    //Retorna todos os pizzas existentes no BD
    const dadosIngrediente = await controllerIngrediente.listarIngrediente();

    //Valida se existe retorno de dados
    if (dadosIngrediente) {   //Status 200
        statusCode = 200;
        message = dadosPizza;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para atualizar uma pizza pelo ID---------- //
app.put('/v1/ingrediente/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de pizza
                const controllerIngrediente = require('./controller/controller_ingredientes.js');
                //Chama a funcao novaPizza da controller e encaminha os dados do body 
                const novoIngrediente = await controllerIngrediente.atualizarIngrediente(dadosBody);
                
                statusCode = novoIngrediente.status;
                message = novoIngrediente.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para excluir tamanho existente---------- //
app.delete('/v1/ingrediente/:id', cors(),jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de pizza
        const controllerIngrediente = require('./controller/controller_ingredientes.js');
        
        //Chama a funcao para excluir um item 
        const ingrediente = await controllerIngrediente.excluirIngrediente(id);

        statusCode = ingrediente.status;
        message = ingrediente.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});














//Funcao para inserir uma nova promocao
const insertBebidaPromocao = async function (bebidaPromocao) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_bebida_promocao(preco_promocao, id_bebida)
                    values('${bebidaPromocao.preco_promocao}', '${bebidaPromocao.id_bebida}')`;
        
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);
        // console.log(result);

        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}


//Funcao para atualizar um registro no BD
const updateBebidaPromocao = async function (bebidaPromocao) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_bebida_promocao set preco_promocao            = '${pizzaPromocao.preco}',
                                                  id_bebida                 = '${pizzaPromocao.id_bebida}' 
                                                   
                                        
                            where id = '${pizzaPromocao.id}'
                        `;
       
        
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);
        
        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }

}

//Funcao para excluir um registro no BD
const deleteBebidaPromocao = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
        reutl
        
        let sql = `delete from tbl_bebida_promocao
                            where id = '${id}'
                        `;
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);

        
        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

//Funcao para retornar todos os registros do BD
const selectAllBebidasPromocoes = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)
    const rsBebidasPromocoes = await prisma.$queryRaw `select tbl_promocao_bebida.id as IDPromocao, tbl_promocao_bebida.preco_promocao as preco, tbl_bebida.volume, tbl_tipo_bebida.tipo, tbl_sabor_bebida.sabor, tbl_marca_bebida.marca FROM tbl_promocao_bebida
                                                        INNER JOIN tbl_bebida on tbl_bebida.id = tbl_promocao_bebida.id_bebida
                                                        INNER JOIN tbl_marca_bebida on tbl_marca_bebida.id = tbl_bebida.id_marca_bebida
                                                        INNER JOIN tbl_sabor_bebida on tbl_sabor_bebida.id = tbl_bebida.id_sabor_bebida
                                                        INNER JOIN tbl_tipo_bebida on tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida;`;

  

    if (rsBebidasPromocoes.length > 0)
        return rsBebidasPromocoes;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdBebidaPromocao = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select tbl_promocao_bebida.id as IDPromocao, tbl_promocao_bebida.preco_promocao as preco, tbl_bebida.volume, tbl_tipo_bebida.tipo, tbl_sabor_bebida.sabor, tbl_marca_bebida.marca FROM tbl_promocao_bebida
                    INNER JOIN tbl_bebida on tbl_bebida.id = tbl_promocao_bebida.id_bebida
                    INNER JOIN tbl_marca_bebida on tbl_marca_bebida.id = tbl_bebida.id_marca_bebida
                    INNER JOIN tbl_sabor_bebida on tbl_sabor_bebida.id = tbl_bebida.id_sabor_bebida
                    INNER JOIN tbl_tipo_bebida on tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida; where tbl_bebida_promocao.id = ${id} `

    const rsBebidaPromocao = await prisma.$queryRawUnsafe(sql) ;

    if (rsBebidaPromocao.length > 0)
        return rsPizzaPromocao;
    else
        return false;

}

module.exports={
    insertBebidaPromocao,
    updateBebidaromocao,
    deleteBebidaPromocao,
    selectAllBebidasPromocoes,
    selectByIdBebidaPromocao
}