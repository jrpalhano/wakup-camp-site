document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("data"); // Buscar o token salvo

    if (!token) {
        // Se não houver token, redireciona para a página de login
        window.location.href = "/";
    } else {
        // Se houver token, exibe o conteúdo oculto
        document.body.style.display = "flex";
    }
});