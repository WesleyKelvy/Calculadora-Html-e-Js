// Passo 1: Capturar os elementos HTML
const res = document.getElementById("res")
const numeros = document.querySelectorAll(".number")
const operacoes = document.querySelectorAll(".operation")
const igual = document.getElementById("equal")
const limpar = document.getElementById("clear")
const oposto = document.getElementById("opposite")
const porcento = document.getElementById("percent")
const comma = document.getElementById("comma")

// Passo 2: Criar variaveis para Guardar valores
    let valorAtual = 0
    let valorAnterior = 0
    let operacaoAtual = null;
    let x = 0; //variavel para ajudar a mostrar o numero em porcento caso nao haja nenhuma operaçao em adamento

// Passo 3: Adicionar os eventos de clique aos botoes
    function eventoCliqueNumeros() { //funçao para add evento
        numeros.forEach((number) => {
            number.addEventListener("click", () => {
                adicionarNumero(number.innerText)
                atualizarRes()
            })
        });
    }

    eventoCliqueNumeros() // Executando funçao: adicionando evento aos botoes

// Passo 4: Adicionando eventos de clique aos botoes de operaçao
    operacoes.forEach((operation) => {
        operation.addEventListener("click", () => {
            // Se já existir uma operação selecionada e valor atual, calcule o resultado.
            if ((operacaoAtual !== null) && valorAtual !== '') {
                calcularResultado()
            }

            // Voltando o botãto a cor padrão.
            operacoes.forEach((btn) => {
                btn.style.backgroundColor = "" // Deixa vazio para voltar a cor original
            });

            // Mudando cor do botão clicado.
            operation.style.backgroundColor = "#f0ab43";

            // Selecionar e atualizar
            selecionarOperacao(operation.innerText)
            atualizarRes()

            // console.log("valor de X depois do if:", x)
        })
    })

    // Determinar a operação a ser usada:
    function selecionarOperacao(operation) {
        // Tratando o caso onde corrigimos um clique em  uma operação indesejada. Onde: 1) Operaçao atual nao pode ser nula ou igual a atual, 2) Deve haver um valor anterior ou será zero, caso else.
        if ((operacaoAtual !== null) && (valorAnterior !== '') 
        && (operacaoAtual !== operation)) {
            // mudando operaçao
            operacaoAtual = operation
            console.log("operacaoAtualCORREÇAO:", operacaoAtual)
            // declarando que já tem operação em andamento
            x = 1
            
        } else {
            valorAnterior = parseFloat(valorAtual)
            valorAtual = 0
            operacaoAtual = operation
            // console.log("operacaoAtual:", operacaoAtual)
            // console.log("valor de X:", x)
        }
    }

// Passo 5: Evento de clique no botão de vírgula:
    // Para juntar o número a "," foi mudado o tipo para string.
    // E depois concatenado em "commaNumber" e atualizado usando um replace. 
    comma.addEventListener('click', () => {
        if (typeof valorAtual !== 'string') {
            valorAtual = String(valorAtual)
        }
        // Tratando para haver somente uma vírgula:
        if (!valorAtual.includes(",")) {
            commaNumber('.')
            res.innerHTML = valorAtual.replace(".", ",")

            // console.log('valorAtualcomVirgula:', valorAtual)
            // console.log('Tipo do valor atual:', typeof valorAtual)
        }
    })

// Passo 6: Evento do botão de porcento
    porcento.addEventListener('click', () => {
        // Puxando funçao:
        porcentoNumber()
        // Controlando a atualização na tela
        if (x == 0) {
            atualizarRes()
        } else {
            res.innerHTML = valorAtual.toLocaleString()
        }
    })

// Passo 7: Evento do botao de oposto
    opposite.addEventListener('click', () => {
        oppositeNumber()
        atualizarRes()
    })

// Passo 8: Evento do botal de "=" e limpar.
    igual.addEventListener("click", () => {
        calcularResultado()
        
        // Estilizando o botão ao clicar
        igual.style.transition = "background .100s"
        igual.style.background = "#f0ab43"

        setTimeout(() => {
            igual.style.transition = "background .40s"
            igual.style.background = ""
        }, 40)
    })

    // Evento do botao de limpar tela:
        limpar.addEventListener("click", () => {
            limparTela() // Usando a função
        })

// Passo 9: Funções dos Eventos
    function commaNumber(comma) { // Função da Virgula
        valorAtual = String(valorAtual + comma);
    }

    function porcentoNumber(operation) {
        // Se já houver número anterior e já escolhemos a operaçao e um numero atual, será calculado o valor atual.
        
        if (valorAnterior !== 0 && valorAtual === 0){
            valorAnterior = valorAnterior / 100

            console.log("valorAtual:", valorAtual)
            console.log("valorAnterior:", valorAnterior)
            
        } else if (operacaoAtual !== null) {
            const numAnterior = parseFloat(valorAnterior)
            const numAtual = parseFloat(valorAtual)

            switch (operacaoAtual) {
                case "+":
                    valorAtual = numAnterior + (numAnterior * (numAtual / 100))
                    break
                case "-":
                    valorAtual = numAnterior - (numAnterior * (numAtual / 100))
                    break
                case "x":
                    valorAtual = numAnterior * (numAtual / 100)
                    break
                case "÷":
                    valorAtual = numAnterior / (numAtual / 100)
                    break
                default:
                    return
            }
            // Depois de calcular a porcentagem, reseta o valor anterior e a operação
            valorAnterior = 0
            operacaoAtual = null
            operacoes.forEach((btn) => {
                btn.style.backgroundColor = "" 
            })

        } else {
            valorAtual = valorAtual / 100
        }
    }

    function oppositeNumber() {
        valorAtual = valorAtual * -1
    }


    function adicionarNumero(number) {
        // Se nao tiver operaçao em andamento será o número em tela será substituido.
        if ((res.innerHTML === valorAnterior && operacaoAtual === null) || valorAtual === valorAnterior / 100){
            valorAtual = 0
            valorAtual = parseFloat(valorAtual + number)
            res.innerHTML = valorAtual.toLocaleString()
        } else {
            valorAtual = parseFloat(valorAtual + number)
            res.innerHTML = valorAtual.toLocaleString()
        }
    }

    function calcularResultado() {
        if (x == 1) { // quando já tiver opeçao selecionada e não hove valor atual selecionado, considera-se que o valor anterior como atual também
            const numAnterior = parseFloat(valorAnterior)
            const numAtual = parseFloat(valorAnterior)

            switch (operacaoAtual) {
                case "+":
                    valorAtual = numAnterior + numAnterior
                    break
                case "-":
                    valorAtual = numAnterior - numAnterior
                    break
                case "x":
                    valorAtual = numAnterior * numAnterior
                    break
                case "÷":
                    if (numAtual == 0) {
                        valorAtual = 'erro'
                    } else {
                        valorAtual = numAnterior / numAnterior
                    }
                    break
                default:
                    return
            }
            valorAnterior = valorAtual.toLocaleString()
            res.innerHTML = valorAnterior
            operacaoAtual = null

        } else {
            const numAnterior = parseFloat(valorAnterior)
            const numAtual = parseFloat(valorAtual)

            switch (operacaoAtual) {
                case "+":
                    valorAtual = numAnterior + numAtual
                    break
                case "-":
                    valorAtual = numAnterior - numAtual
                    break
                case "x":
                    valorAtual = numAnterior * numAtual
                    break
                case "÷":
                    if (numAtual == 0) {
                        valorAtual = 'erro'
                    } else {
                        valorAtual = numAnterior / numAtual
                    }
                    break
                default:
                    return
            }
            valorAnterior = valorAtual.toLocaleString()
            res.innerHTML = valorAnterior
            operacaoAtual = null
        }
       
        // Voltar a cor original no botão da opraçao, basta deixar vazio! 
        operacoes.forEach((btn) => {
            btn.style.backgroundColor = "" 
        })

        // Voltando a escrita do limpar para 'C'
        limpar.innerText = 'C'
        limpar.style.fontSize = '133%'
    }

    function limparTela() {
         if (operacaoAtual !== null && valorAnterior !== 0)  { 
            if (limpar.innerHTML === 'AC') {
                valorAtual = 0
                valorAnterior = 0           
                operacaoAtual = null
                res.innerHTML = 0
                res.style.fontSize = "2.4em"
    
                limpar.innerText = 'C'
                limpar.style.fontSize = '133%'
    
                operacoes.forEach((btn) => {
                    btn.style.backgroundColor = ""; // Deixa vazio para voltar a cor original.
                });

            } else {
                valorAtual = 0
                res.innerHTML = valorAtual

                limpar.innerText = 'AC'
                limpar.style.fontSize = '113%'

                // console.log("operacaoAtualX:", operacaoAtual)
            }
        
        } else {
            valorAtual = 0
            valorAnterior = 0
            operacaoAtual = null
            res.innerHTML = 0
            // res.style.fontSize = "2.4em"

            operacoes.forEach((btn) => {
                btn.style.backgroundColor = ""
            });
        }
    }

// Passo 10: Atualizar a tela de exibição.
    function atualizarRes() {
        if (valorAtual === 0) {
            res.innerHTML = valorAnterior.toLocaleString()
        } else {
            res.innerHTML = valorAtual.toLocaleString()
        }
    }