var select = document.getElementById("select-moedas")
//var inputValorConverte = document.getElementById("input-valor")
var botaoConverte = document.getElementById("botao-converte")

// Função assíncrona, pois deixa de executar o código e busca uma informação em um servidor
async function converterMoedas() {
    // Await: Espera o servidor responder. Quando o servidor responder as informações são passadas ao parâmetro respostaConversaoURL em formato json e por fim retornamos elas à variável moedas
    var moedas = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL").then(function (respostaConversaoURL) {
        return respostaConversaoURL.json()
    })
    //console.log(moedas) // Console foi usado apenas para pegar os Objetos em formato Json vindos da API para em seguida guardar os valores em alta do dólar e do euro nas variáveis abaixo
    
    var precoDolar = moedas.USDBRL.high // Guardando o valor em dólar da alta
    var precoEuro = moedas.EURBRL.high // Guardando o valor em euro da alta

    var inputValorReais = Number(document.getElementById("input-valor").value)
    var textoReal = document.getElementById("texto-real")
    var precoMoedas = document.getElementById("preço-moedas-convertidas")

    // Calculando valor em dólar
    if (select.value === "US$ Dólar Americano") {
        var valorEmDolar = inputValorReais / precoDolar
        precoMoedas.innerHTML = valorEmDolar.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
    // Calculando valor em euro
    if (select.value === "€ Euro") {
        var valorEmEuro = inputValorReais / precoEuro
        precoMoedas.innerHTML = valorEmEuro.toLocaleString('de-De', { style: 'currency', currency: 'EUR' })
    }

    textoReal.innerHTML = inputValorReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function trocaMoedas() {

    var textoMoedasConvertidas = document.getElementById("texto-moeda-convertida")
    var bandeiraMoedas = document.getElementById("bandeira-moedas")

    // Trocando texto para o dólar e a bandeira para os EUA ao selecionar o tipo de conversão
    if (select.value === "US$ Dólar Americano") {
        textoMoedasConvertidas.innerHTML = "Dólar Americano"
        bandeiraMoedas.src = "./img/Eua.png"
    }
    // Trocando texto para o euro e a bandeira para os Euro
    if (select.value === "€ Euro") {
        textoMoedasConvertidas.innerHTML = "Euro"
        bandeiraMoedas.src = "./img/Euro.png"
    }

    converterMoedas()
}

// Ao digitar um valor desejado no campo para converter que não seja número, exibe uma mensagem de erro
/*function mensagemErro(){
    if(inputValorConverte.value != Number(inputValorConverte)){
        alert("Digite apenas números")
    }
}*/

botaoConverte.addEventListener("click", converterMoedas) // Evento que ouve o click do botão de converter
select.addEventListener("change", trocaMoedas) // Evento que ouve a troca do select dos tipos de valores: Dólar e Euro
//inputValorConverte.addEventListener("keydown", mensagemErro)
//inputValorConverte.addEventListener("change", mensagemErro)S