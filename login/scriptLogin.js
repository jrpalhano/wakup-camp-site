const usuarioDiv = document.getElementById('usuarioDiv')
const senhaDiv = document.getElementById('senhaDiv')
const login = document.getElementById('usuario')
const senha = document.getElementById('senha')
const btnEntrar = document.getElementById('btnEntrar')

async function handleLogin(){

    btnEntrar.innerText = 'Aguarde...'
    btnEntrar.setAttribute = "disabled"

    if(!login.value){
        btnEntrar.innerText = 'Entrar'
        return usuarioDiv.style.border = "3px solid red" 

    } else if(!senha.value){
        btnEntrar.innerText = 'Entrar'
        return senhaDiv.style.border = "3px solid red"
    }

    const data = {
        login: login.value,
        senha:senha.value
    }

    const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data),
      })
    const dataResp = await response.json()
    
    if(response.ok){
        btnEntrar.innerText = "Logado!"
        localStorage.setItem("data", JSON.stringify(response))
        setTimeout(() => {
            window.location.href = "/private/home"
        }, [3000]);
    }else{
        console.log("nada certo");
        
    }



    console.log(dataResp);
    
    
}