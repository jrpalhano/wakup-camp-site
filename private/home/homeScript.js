const iscrRealizadas = document.getElementById('iscrRealizadas')
const iscrFinalizadas = document.getElementById('iscrFinalizadas')
const ValorPago = document.getElementById('ValorPago')
const lsContent = document.getElementById('lsContent')
const participanteModal = document.getElementById('participanteModal')
const wrapper = document.getElementById('wrapper')
const desconto = document.getElementById('desconto')
const valorFinal =document.getElementById('valorFinal')
const confirmaPagamento = document.getElementById('confirmaPagamento')
let dados = ''
let dadosCauculos = ''
async function initialData(){

    iscrRealizadas.innerText =  "Carregando..."
    iscrFinalizadas.innerText = "Carregando..."
    ValorPago.innerText = "Carregando..."

    let response = await fetch("http://localhost:4000/home_data_stats",{
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
    })
    let data = await response.json()
    dados = data

    
    console.log(data?.data[0]);    
    
    iscrRealizadas.innerText = `${data?.data[0].total_isnscricoes}`
    iscrFinalizadas.innerText = data?.data[0].inscr_finalizadas
    ValorPago.innerText = `R$: ${data?.data[0].total_pagamentos || '0,00'}`
    

    data?.data[0].inscricoes.sort((a, b)=> b.id -a.id)

    let htmlContent = data?.data[0].inscricoes?.map(item=>(`
        <div class="lsContent" onClick="selectUser(${item.id})">
                    <div class="cardSubscribeInfo">
                        <span class="subIcon">
                            <img  src="../../src/assets/${item.parcelamento === "Monitoria" ? "coordenador.png" : "caminhada.png"}" />
                        </span>
                        <div class="subText">
                            <div class="subNamePhone">
                                <h5>${item.nome} ${item.sobrenome} - ${item.telefone}</h5>
                            </div>
                            <div class="subInfo">
                                <p>${item.idade} anos - Camisa ${item.tamanho} ${item.sexovestimenta === "feminino" ? "fem":"masc"}</p>
                            </div>
                        </div>
                        <div class="statusPagamento" style="background-color:${item.status_pagamento === null ? "rgb(250, 45, 45)" : "green"};" >${item.status_pagamento === null ? "X" : "OK"}</div>
                    </div>
                </div>
        `)
        
    ).join("")
    lsContent.innerHTML = htmlContent
    
    const contagem = {
        masculino: { P: 0, M: 0, G: 0, GG: 0, XG: 0, XXG: 0, "P - Baby look":0, "M - Baby look": 0 },
        feminino: { P: 0, M: 0, G: 0, GG: 0, XG: 0, XXG: 0 }
    };

    for (let i = 0; i < data?.data[0].inscricoes.length; i++) {
        const { tamanho, sexo } = data?.data[0].inscricoes[i]; 
        //console.log(data?.data[0].inscricoes[i].tamanho);
        
        contagem[sexo][tamanho]++; 
    }
    //console.log(contagem.masculino);
}

initialData()


function selectUser(id) {

    function filtraId(value){
        if(id === value.id) return value
        
    }
    participanteModal.style.display = "flex"
    console.log(dados?.data[0].inscricoes?.filter(filtraId)[0]);
    let dadosIndividuais = dados?.data[0].inscricoes?.filter(filtraId)[0]
    dadosCauculos = dados?.data[0].inscricoes?.filter(filtraId)[0]
    let modalHtml = `
        <div class="closeModal" onclick="fecharModalParticipantes()">X</div>
        <span class="header">
            <p>Informações do Participante</p>
        </span>
        <div class="line"></div>
        <div class="infoLine">
            <div class="infoArea">
                <span class="infoTitle">Nome Completo:</span>
                <span class="infoData">${dadosIndividuais.nome} ${dadosIndividuais.sobrenome}</span>
            </div>
            <div class="infoArea">
                <span class="infoTitle">Telefone:</span>
                <span class="infoData">${dadosIndividuais.telefone}</span>
            </div>
        </div>
        <div class="infoLine">
            <div class="infoArea">
                <span class="infoTitle">Endereço:</span>
                <span class="infoData">${dadosIndividuais.logradouro}</span>
            </div>
            <div class="infoArea">
                <span class="infoTitle">Número:</span>
                <span class="infoData">${dadosIndividuais.numero}</span>
            </div>
        </div>
        <div class="infoLine">
            <div class="infoArea">
                <span class="infoTitle">Bairro:</span>
                <span class="infoData">${dadosIndividuais.bairro}</span>
            </div>
            <div class="infoArea">
                <span class="infoTitle">Cidade:</span>
                <span class="infoData">${dadosIndividuais.cidade}</span>
            </div>
        </div>
        <div class="infoLine">
            <div class="infoArea">
                <span class="infoTitle">Estado:</span>
                <span class="infoData">${dadosIndividuais.estado}</span>
            </div>
            <div class="infoArea">
                <span class="infoTitle">CEP:</span>
                <span class="infoData">${dadosIndividuais.cep}</span>
            </div>
        </div>
        <div class="infoLine">
            <div class="infoArea">
                <span class="infoTitle">Modelo Camisa:</span>
                <span class="infoData">${dadosIndividuais.sexovestimenta?.toUpperCase()}</span>
            </div>
            <div class="infoArea">
                <span class="infoTitle">Tamanho:</span>
                <span class="infoData">${dadosIndividuais.tamanho}</span>
            </div>
        </div>
        <div class="infoLine">
            <div class="infoArea">
                <span class="infoTitle">Possui restrição médica?</span>
                <span class="infoData">${dadosIndividuais.restricaomedica === "false" ? "Não": "Sim"}</span>
            </div>
            <div class="infoArea">
                <span class="infoTitle">Possui restrição alimentar?</span>
                <span class="infoData">${dadosIndividuais.resticaoalimentar === "false" ? "Não": "Sim"}</span>
            </div>
        </div>
        <div class="infoLine">
            <div class="infoArea">
                <span class="infoTitle">Descrição:</span>
                <span class="infoData">${dadosIndividuais.descrestricaomedica === "" ? "- - - - - - - -": dadosIndividuais.descrestricaoalimentar}</span>
            </div>
            <div class="infoArea">
                <span class="infoTitle">Descrição:</span>
                <span class="infoData">${dadosIndividuais.descrestricaoalimentar === "" ? "- - - - - - - -": dadosIndividuais.descrestricaoalimentar}</span>
            </div>
        </div>
        <div class="infoLine">
            <div class="infoArea">
                <span class="infoTitle">Parcelamento:</span>
                <span class="infoData">${dadosIndividuais.parcelamento}</span>
            </div>
            <div class="infoArea">
                <span class="infoTitle">Valor Entrada:</span>
                <span class="infoData">R$: ${dadosIndividuais.valorentrada}</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="infoLine">
        ${
            dadosIndividuais.status_pagamento ? 
            (`
                <div class="header">
                    <p>Pagamento realizado com sucesso</p>
                </div> 
            `) : (`
            <div class="infoArea">
                <button onCLick="confirmarPagamento()" id="confirmaPagamento">Confirmar Inscrição</button>
            </div>     `)   
        }

        </div>
    `
    wrapper.innerHTML = modalHtml
}

function fecharModalParticipantes(){
    participanteModal.style.display = "none"
}




async function confirmarPagamento(){
    toast()

    let valor = ''
    if(dadosCauculos.parcelamento === "Monitoria"){
        valor = 60
    } else {
        valor = dadosCauculos.valor_pago
    }



    let data = {
        id_participante: dadosCauculos.id,
        status_pagamento:"pago",
        valor_pago: valor
    }

    
    await fetch("http://localhost:4000/compensar_pagamento",{
        "method": "PUT",
        headers:{
            "content-type": "application/json"
        },
        body:JSON.stringify(data)
    }).then((resp)=>{
        return resp.json()        
    }).then((data)=>{
        console.log(data);
        toastSuccess()
        initialData()
        enviarConfirmação()
        return setTimeout(() => {
            fecharModalParticipantes()
        }, 1000);
    }).catch(()=>{
        return toastErroCadastro()
    })
    
    console.log(data);
    
}
async function enviarConfirmação(){

    let data = {
        telefone: dadosCauculos.telefone,
        nome: dadosCauculos.nome,
        sobrenome: dadosCauculos.sobrenome,
        camisaSexo: dadosCauculos.sexovestimenta,
        camisaTamanho: dadosCauculos.tamanho,
    }

    console.log(data);
    


    
    await fetch("https://api-whatsapp-wakeup-production.up.railway.app/confirma_inscricao",{
        "method": "POST",
        headers:{
            "content-type": "application/json"
        },
        body:JSON.stringify(data)
    }).then((resp)=>{      
    })


}
//----------   TOASTS   ----------\\
function toast() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function toastSuccess() {
  var x = document.getElementById("snackbarSuccess");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function toastErroCadastro() {
  var x = document.getElementById("snackbarErroCadastro");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}



console.log(dados);


