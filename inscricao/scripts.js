const form1 = document.getElementById('primeiroFormulario')
const form2 = document.getElementById('segundoFormulario')
const form3 = document.getElementById('terceiroFormulario')

const nome = document.getElementById('nome')
const sobrenome = document.getElementById('sobrenome')
const idade = document.getElementById('idade')
const telefone = document.getElementById('telefone')
const sexo = document.getElementById('sexo')
const cpf = document.getElementById('cpf')
const logradouro = document.getElementById('logradouro')
const numero = document.getElementById('numero')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const estado = document.getElementById('estado')
const cep = document.getElementById('cep')
const sexoVestimenta = document.getElementById('sexoVestimenta')
const tamanho = document.getElementById('tamanho')
//Campos formulário 2
const restricaoMedica = document.getElementById('restricaoMedica')
const descRestricaoMedica = document.getElementById('descRestricaoMedica')
const resticaoAlimentar = document.getElementById('resticaoAlimentar')
const descRestricaoAlimentar = document.getElementById('descRestricaoAlimentar')
const parcelamento = document.getElementById('parcelamento')
//campo de aceitar condição
const check = document.getElementById('check')
const termosAceitar = document.getElementById('termosAceitar')
const jackPot = document.getElementById('jackPot')


const valorInscricao = document.getElementById('valorInscricao')

const btnEnviar = document.getElementById('btnEnviar')


let valorEntrada = 0



parcelamento.addEventListener("change", ()=>{
 
  if ( Number(idade.value) <= 12 && parcelamento.value === "À Vista (Dinheiro em mãos)" ) {
    console.log(80);    
    valorEntrada = 80
  } 
  else if(Number(idade.value) <= 12 && parcelamento.value === "À Vista (Pix)"){
    console.log(80);
    valorEntrada = 80
  }
  else if(Number(idade.value) <= 12 && parcelamento.value === "Débito à Vista"){
    console.log(80);
    valorEntrada = 80
  }  
  else if ( Number(idade.value) > 12 && parcelamento.value === "À Vista (Dinheiro em mãos)" ) {
    console.log(120);    
    valorEntrada = 120
  } 
  else if(Number(idade.value) > 12 && parcelamento.value === "À Vista (Pix)"){
    console.log(120);
    valorEntrada = 120
  }
  else if(Number(idade.value) > 12 && parcelamento.value === "Débito à Vista"){
    console.log(120);
    valorEntrada = 120
  }  

  else if(Number(idade.value) <= 12 && parcelamento.value === "Parcelamento Crédito (Até 3x)" || (Number(idade.value) <= 12 && parcelamento.value === "Cartão à Vista") ){
    console.log(110);
    valorEntrada = 110
  }
  else if(Number(idade.value) > 12 && parcelamento.value === "Parcelamento Crédito (Até 3x)" || (Number(idade.value) > 12 && parcelamento.value === "Cartão à Vista") ){
    console.log(135);
    valorEntrada = 135
  }
  else if ( parcelamento.value === "Monitoria"){
    valorEntrada = 0
  }

  valorInscricao.innerHTML = String(valorEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) 
  
})

//funçao de validação de dados
function validacao(){

}


async function submit(){

  btnEnviar.innerHTML = 'Carregando suas informações'
  btnEnviar.style.backgroundColor = '#947347'
  btnEnviar.style.fontWeight = 400
  
  
  //validação
  if(!check.checked){
    termosAceitar.style.backgroundColor = "rgba(255, 0, 0, 0.7)"
    
    btnEnviar.innerHTML = 'Prosseguir com a inscrição'
    btnEnviar.style.backgroundColor = '#ffad42'
    btnEnviar.style.fontWeight = 400
    
    return toast()
  }
  btnEnviar.setAttribute('disabled','')
  
  const data = {
    nome: nome.value,
    sobrenome: sobrenome.value,
    idade: idade.value,
    telefone: telefone.value,
    sexo: sexo.value,
    cpf: cpf.value,
    sexoVestimenta: sexoVestimenta.value,
    tamanho: tamanho.value,
    logradouro: logradouro.value,
    numero: numero.value,
    bairro: bairro.value,
    cidade: cidade.value,
    estado: estado.value,
    cep: cep.value,
    restricaoMedica : restricaoMedica.value,
    descRestricaoMedica : descRestricaoMedica.value,
    resticaoAlimentar : resticaoAlimentar.value,
    descRestricaoAlimentar : descRestricaoAlimentar.value,
    parcelamento : parcelamento.value,
    valorEntrada: valorEntrada
  }

  const aviso ={
    telefone:telefone.value,
    nome:nome.value,
    sobrenome:sobrenome.value
  }
  if(jackPot.value){
    return null
  }

  return Promise.all([
    fetch("https://api-wakeup-camp-production.up.railway.app/novo_participante", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data),
    }).then((resp)=>{}),
    fetch("https://api-whatsapp-wakeup-production.up.railway.app/aviso_inscricao",{
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(aviso),
    }).then({})
    
  ]).then(()=>{
    toastSuccess()
    btnEnviar.innerHTML = 'Inscrição enviada!'
    btnEnviar.setAttribute('disabled','')
    btnEnviar.style.backgroundColor = '#00928b'
    btnEnviar.style.fontWeight = 400
    setTimeout(() => {
      return window.location.href = '/'
    }, [2000]);
    
  }).catch(()=>{
    toastErroCadastro()
    btnEnviar.innerHTML = 'Erro no envio...'
    btnEnviar.setAttribute('disabled', 'false')
    btnEnviar.style.backgroundColor = '#00928b'
    btnEnviar.style.fontWeight = 400    
  })


}

function avancarForm() {

  if(nome.value === null || nome.value === ""|| nome.value === undefined){
    nome.style.border = "3px solid red"
    return toast()
  }
  if(sobrenome.value === null || sobrenome.value === ""|| sobrenome.value === undefined){
    sobrenome.style.border = "3px solid red"
    return toast()
  }
  if(idade.value === null || idade.value === ""|| idade.value === undefined){
    idade.style.border = "3px solid red"
    return toast()
  }
  if(telefone.value === null || telefone.value === ""|| telefone.value === undefined){
    telefone.style.border = "3px solid red"
    return toast()
  }
  if(sexo.value === null || sexo.value === ""|| sexo.value === undefined){
    sexo.style.border = "3px solid red"
    return toast()
  }
  if(cpf.value === null || cpf.value === ""|| cpf.value === undefined){
    cpf.style.border = "3px solid red"
    return toast()
  }
  if(sexoVestimenta.value === null || sexoVestimenta.value === ""|| sexoVestimenta.value === undefined){
    sexoVestimenta.style.border = "3px solid red"
    return toast()
  }
  if(tamanho.value === null || tamanho.value === ""|| tamanho.value === undefined){
    tamanho.style.border = "3px solid red"
    return toast()
  }
  if(logradouro.value === null || logradouro.value === ""|| logradouro.value === undefined){
    logradouro.style.border = "3px solid red"
    return toast()
  }
  if(numero.value === null || numero.value === ""|| numero.value === undefined){
    numero.style.border = "3px solid red"
    return toast()
  }
  if(bairro.value === null || bairro.value === ""|| bairro.value === undefined){
    bairro.style.border = "3px solid red"
    return toast()
  }
  if(cidade.value === null || cidade.value === ""|| cidade.value === undefined){
    cidade.style.border = "3px solid red"
    return toast()
  }
  if(estado.value === null || estado.value === ""|| estado.value === undefined){
    estado.style.border = "3px solid red"
    return toast()
  }
  if(cep.value === null || cep.value === ""|| cep.value === undefined){
    cep.style.border = "3px solid red"
    return toast()
  }

  form1.style.display = "none"
  form2.style.display = "flex"  
  form3.style.display = "none"
}

function voltarForm1(){

  form1.style.display = "flex"
  form2.style.display = "none" 
  form3.style.display = "none"
}
function avancarForm3(){
  if(restricaoMedica.value === null || restricaoMedica.value === ""|| restricaoMedica.value === undefined){
    restricaoMedica.style.border = "3px solid red"
    return toast()
  }
  if(restricaoMedica.value === "true" && (descRestricaoMedica.value === null || descRestricaoMedica.value === ""|| descRestricaoMedica.value === undefined)){
    descRestricaoMedica.style.border = "3px solid red"
    return toast()
  }
  if(resticaoAlimentar.value === null || resticaoAlimentar.value === ""|| resticaoAlimentar.value === undefined){
    resticaoAlimentar.style.border = "3px solid red"
    return toast()
  }
  if(resticaoAlimentar.value === "true" && (descRestricaoAlimentar.value === null || descRestricaoAlimentar.value === ""|| descRestricaoAlimentar.value === undefined)){
    descRestricaoAlimentar.style.border = "3px solid red"
    return toast()
  }
  if(parcelamento.value === null || parcelamento.value === ""|| parcelamento.value === undefined){
    parcelamento.style.border = "3px solid red"
    return toast()
  }

  form1.style.display = "none"
  form2.style.display = "none" 
  form3.style.display = "flex"
}

function voltarForm2(){
  form1.style.display = "none"
  form2.style.display = "flex" 
  form3.style.display = "none"
}


//++++++++++++++   TOASTS   ++++++++++++++\\ 


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



cpf.addEventListener('input', (e) => {
  let value = e.target.value;
  
  value = value.replace(/\D/g, '');
  
  if (value.length >= 3) {
      value = value.substring(0, 3) + '.' + value.substring(3);
  }
  if (value.length >= 7) {
      value = value.substring(0, 7) + '.' + value.substring(7);
  }
  if (value.length >= 11) {
      value = value.substring(0, 11) + '-' + value.substring(11);
  }
  
  if (value.length > 14) {
      value = value.substring(0, 14);
  }
  
  e.target.value = value;
});

// Função para validar CPF (opcional)
function validaCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11) return false;
  
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  let soma = 0;
  let resto;
  
  for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}

cpf.addEventListener('blur', () => {
  const cpf = cpf.value;
  if (cpf.length === 14) { // Só valida se estiver completo
      if (!validaCPF(cpf)) {
          alert('CPF inválido!');
          cpf.value = '';
      }
  }
});



telefone.addEventListener('input', (e) => {
  let value = e.target.value;
  
  value = value.replace(/\D/g, '');
  
  if (value.length >= 3 && value[2] !== '9') {
      value = value.substring(0, 2) + '9' + value.substring(2);
  }
  
  if (value.length >= 2) {
      value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
  }
  if (value.length >= 10) {
      value = value.substring(0, 10) + '-' + value.substring(10);
  }
  
  if (value.length > 15) {
      value = value.substring(0, 15);
  }
  
  e.target.value = value;
});

function validaCelular(celular) {
  const numero = celular.replace(/\D/g, '');
  
  if (numero.length !== 11) return false;
  
  const ddd = parseInt(numero.substring(0, 2));
  if (ddd < 11 || ddd > 99) return false;
  
  if (numero[2] !== '9') return false;
  
  return true;
}

telefone.addEventListener('blur', () => {
  const celular = telefone.value;
  if (celular.length === 15) { // Só valida se estiver completo
      if (!validaCelular(celular)) {
          alert('Número de celular inválido!');
          telefone.value = '';
      }
  }
});

cep.addEventListener('input', (e) => {
  let value = e.target.value;
  
  value = value.replace(/\D/g, '');
  
  if (value.length >= 5) {
      value = value.substring(0, 5) + '-' + value.substring(5);
  }
  
  if (value.length > 9) {
      value = value.substring(0, 9);
  }
  
  e.target.value = value;
});

// Função para validar CEP
function validaCEP(cep) {
  const numero = cep.replace(/\D/g, '');
  
  if (numero.length !== 8) return false;
  
  if (/^(\d)\1{7}$/.test(numero)) return false;
  
  return true;
}

async function buscaEndereco(cep) {
  try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
          throw new Error('CEP não encontrado');
      }
      
      return data;
  } catch (error) {
      alert('Erro ao buscar CEP: ' + error.message);
      return null;
  }
}

cep.addEventListener('blur', async () => {
  const cep = cep.value;
  if (cep.length === 9) { // Só valida se estiver completo
      if (!validaCEP(cep)) {
          alert('CEP inválido!');
          cep.value = '';
          return;
      }
      
      const endereco = await buscaEndereco(cep.replace(/\D/g, ''));
      if (endereco) {
          console.log('Endereço encontrado:', endereco);
      }
  }
});

