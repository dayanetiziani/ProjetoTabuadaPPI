import express from 'express';

const app = express();

const host = '0.0.0.0'; //ip genérico que representa todas as interfaces de rede (placas de rede) locais do
const porta = 3000; //porta identifica uma aplicação, dentro unúmeras, que podem estar sendo executadas no 


//paginaInicial está sendo passada como parametro para esse método
app.get('/',paginaInicial);
app.get('/tabuada', processarTabuada);

// () => {} // é uma função anônima (arrow function ou função de seta)
app.listen(porta, host, () => {
    //main - escrever o código aqui dentro
    //string literals permite concatenar variaveis com strings de uma maneira
    //string literals = ``
    console.log(`Servidor executando em http://${host}:${porta}.`);

} );

function processarTabuada(requisicao, resposta){
    try{//aqui é se for informado um numero
        let numero = Number(requisicao.query.numero);
        let conteudoResposta = `<!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tabuada|${numero}</title>
            </head>
            <body>
                <h1> Tabuada ${numero} </h1>
                <hr>
                <ul>
    `;
    for(let i=1; i<=10; i++) {
        let linha = `<li>${numero} * ${i} = ${numero*i} </li>`;
        conteudoResposta += linha;
    } 
    conteudoResposta+= `
                </ul>
            </body>
        </html>
    `;
    resposta.end(conteudoResposta); 
        
    }catch (erro) {
        resposta.end(`
        <!DOCTYPE html>
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Tabuada|Erro</title>
                </head>
                <body>
                    <h1>Erro ao processar Tabuada</h1>
                    <hr>
                    <h2>Não foi possivel processar a sua requisição,
                    <h3>${erro.message} 
                </body>  
            </html>       
        `);
        resposta.end()};
            
}
//requisição e a resposta são parametros que o express automaticamente passará para sua função
function paginaInicial(requisicao, resposta){
    
    resposta.send( `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tabuada|2023</title>
    </head>
    <body>
        <h1> Atividade 1 - Desenvolvimento de um aplicativo web - Tabuada </h1>
        <hr>
        <p>De acordo com os conteúdos apresentados no módulo 1 da disciplina, crie um aplicativo web (http) para disponibilizar uma página html contendo
         a tabuada de um número.
        <br>
    
        </br>Orientações:
        <br><br>
        Desenvolva uma aplicativo web que seja capaz de produzir/responder uma página html contendo a tabuada de um número informado pelo usuário;
        <br>
        O usuário deverá informar esse número por meio da url, por exemplo: http://localhost/?tabuada=3;
        <br>
        A formatação do conteúdo da página é de livre escolha do desenvolvedor;
        <br>
        A resposta deve ser dinâmica e processada pelo servidor, o qual deve criar a página de resposta, exibindo a tabuada do número informado pelo usuário; 
        <br><br>
        Utilize as seguintes bases tecnológicas para o desenvolvimento:</p>
        <ul>
            <li>VSCode;</li>
            <li>Node/Javascript;</li>
            <li> HTTP;</li>
            <li> HTML;</li>
        </ul>
    </body>
    </html>
    `);
    resposta.end();

}