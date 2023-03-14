document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('select-moedas')
  const botaoConverte = document.getElementById('botao-converte')

  // Função assíncrona, pois deixa de executar o código e busca uma informação em um servidor
  async function converterMoedas () {
    const inputValorReais = Number(document.getElementById('input-valor').value)
    const textoReal = document.getElementById('texto-real')
    const precoMoedas = document.getElementById('preco-moedas-convertidas')

    // Await: Espera o servidor responder. Quando o servidor responder as informações são passadas ao parâmetro respostaConversaoURL em formato json e por fim retornamos elas à constiável moedas
    const moedas = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL').then(function (respostaConversaoURL) {
      return respostaConversaoURL.json()
    })

    const precoDolar = moedas.USDBRL.high // Guardando o valor em dólar da alta
    const precoEuro = moedas.EURBRL.high // Guardando o valor em euro da alta

    // Calculando valor em dólar
    if (select.value === 'US$ Dólar Americano') {
      const valorEmDolar = inputValorReais / precoDolar
      precoMoedas.innerHTML = valorEmDolar.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
    // Calculando valor em euro
    if (select.value === '€ Euro') {
      const valorEmEuro = inputValorReais / precoEuro
      precoMoedas.innerHTML = valorEmEuro.toLocaleString('de-De', { style: 'currency', currency: 'EUR' })
    }

    textoReal.innerHTML = inputValorReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  function trocaMoedas () {
    const textoMoedasConvertidas = document.getElementById('texto-moeda-convertida')
    const bandeiraMoedas = document.getElementById('bandeira-moedas')

    // Trocando texto para o dólar e a bandeira para os EUA ao selecionar o tipo de conversão
    if (select.value === 'US$ Dólar Americano') {
      textoMoedasConvertidas.innerHTML = 'Dólar Americano'
      bandeiraMoedas.src = './img/Eua.png'
    }
    // Trocando texto para o euro e a bandeira para os Euro
    if (select.value === '€ Euro') {
      textoMoedasConvertidas.innerHTML = 'Euro'
      bandeiraMoedas.src = './img/Euro.png'
    }

    converterMoedas()
  }

  botaoConverte.addEventListener('click', converterMoedas) // Evento que ouve o click do botão de converter
  select.addEventListener('change', trocaMoedas) // Evento que ouve a troca do select dos tipos de valores: Dólar e Euro
})
