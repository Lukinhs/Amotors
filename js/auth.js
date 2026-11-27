
document.addEventListener("DOMContentLoaded", function () {

    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmar-senha");
    const btnCadastro = document.querySelector(".btn-default");

    btnCadastro.addEventListener("click", cadastrar);

    mostrarSenha();

    async function cadastrar() {

        let emailUsuario = email.value.trim().toLowerCase();
        let senhaUsuario = senha.value;
        let confirmar = confirmarSenha.value;

        if (emailUsuario === "" || senhaUsuario === "" || confirmar === "") {
            alert("Preencha todos os campos!");
            return;
        }

        if (senhaUsuario.length < 6) {
            alert("A senha precisa ter pelo menos 6 caracteres!");
            return;
        }

        if (senhaUsuario !== confirmar) {
            alert("As senhas não são iguais!");
            return;
        }

        let usuarios = buscarUsuarios();

        let usuarioExiste = usuarios.find(usuario => usuario.email === emailUsuario);

        if (usuarioExiste) {
            alert("Este e-mail já está cadastrado!");
            return;
        }

        let salt = crypto.getRandomValues(new Uint8Array(16));

        let senhaHash = await criarHash(senhaUsuario, salt);

        let novoUsuario = {
            email: emailUsuario,
            salt: Array.from(salt),
            senhaHash: senhaHash
        };

        usuarios.push(novoUsuario);

        salvarUsuarios(usuarios);

        alert("Conta criada com sucesso!");

        email.value = "";
        senha.value = "";
        confirmarSenha.value = "";

        window.location.href = "index.html";
    }

    function buscarUsuarios() {

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        return usuarios;
    }

    function salvarUsuarios(usuarios) {

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

    }

    async function criarHash(senha, salt) {

        let dados = new TextEncoder().encode(senha);

        let chave = await crypto.subtle.importKey(
            "raw",
            dados,
            "PBKDF2",
            false,
            ["deriveBits"]
        );

        let resultado = await crypto.subtle.deriveBits(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: 100000,
                hash: "SHA-256"
            },
            chave,
            256
        );

        return Array.from(new Uint8Array(resultado))
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");

    }

    function mostrarSenha() {

        const passwordIcons = document.querySelectorAll(".password-icon");

        passwordIcons.forEach(icon => {

            icon.addEventListener("click", () => {

                const passwordInput = icon.previousElementSibling;

                if (passwordInput.type === "password") {

                    passwordInput.type = "text";

                    icon.classList.remove("fa-eye-slash");
                    icon.classList.add("fa-eye");

                } else {

                    passwordInput.type = "password";

                    icon.classList.remove("fa-eye");
                    icon.classList.add("fa-eye-slash");

                }

            });

        });

    }

});
