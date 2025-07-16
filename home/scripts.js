// ============================== EFEITO DE MÁQUINA DE ESCREVER ==============================
const textoDigitacao = "Seja bem-vindo(a) à NELLY-TECH - onde suas ideias se transformam em realidade digital";
const elementoMaquinaEscrever = document.getElementById('maquinaEscrever');
let indiceTexto = 0;

function digitarTexto() {
    if (indiceTexto < textoDigitacao.length) {
        elementoMaquinaEscrever.innerHTML = textoDigitacao.substring(0, indiceTexto + 1) + '<span class="cursor">|</span>';
        indiceTexto++;
        setTimeout(digitarTexto, 80);
    } else {
        elementoMaquinaEscrever.innerHTML = textoDigitacao + '<span class="cursor">|</span>';
    }
}

// Iniciar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    setTimeout(digitarTexto, 1000);
});

// ============================== FUNÇÃO DE UPLOAD DE FOTO ==============================
function carregarFoto(evento) {
    const arquivo = evento.target.files[0];
    if (arquivo) {
        const leitorArquivo = new FileReader();
        leitorArquivo.onload = function(e) {
            const fotoPerfil = document.getElementById('fotoPerfilPrincipal');
            if (fotoPerfil) {
                fotoPerfil.src = e.target.result;
            }
        };
        leitorArquivo.readAsDataURL(arquivo);
    }
}

// ============================== NAVEGAÇÃO ENTRE PÁGINAS ==============================
function mostrarPagina(idPagina) {
    // Esconder todas as páginas
    const todasPaginas = document.querySelectorAll('.pagina');
    todasPaginas.forEach(pagina => pagina.classList.remove('ativa'));
    
    // Mostrar página selecionada
    const paginaSelecionada = document.getElementById(idPagina);
    if (paginaSelecionada) {
        paginaSelecionada.classList.add('ativa');
    }
    
    // Rolar para o topo suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================== MANIPULAÇÃO DO FORMULÁRIO ==============================
function manipularEnvio(evento) {
    evento.preventDefault();
    
    const nomeCliente = document.getElementById('nome').value;
    const emailCliente = document.getElementById('email').value;
    const projetoCliente = document.getElementById('projeto').value;
    
    // Verificar se todos os campos estão preenchidos
    if (!nomeCliente || !emailCliente || !projetoCliente) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return false;
    }
    
    // Mostrar mensagem de confirmação
    alert(`Obrigada, ${nomeCliente}! Recebi sua ideia e entrarei em contato em breve no email ${emailCliente}. Estou ansiosa para trabalhar no seu projeto!`);
    
    // Limpar formulário após envio
    evento.target.reset();
    
    return true;
}

// ============================== TRATAMENTO DE ERROS DE IMAGEM ==============================
document.addEventListener('DOMContentLoaded', function() {
    const fotoPerfilPrincipal = document.getElementById('fotoPerfilPrincipal');
    
    if (fotoPerfilPrincipal) {
        fotoPerfilPrincipal.addEventListener('error', function() {
            // Se a imagem falhar ao carregar, mostrar placeholder
            const avatarContainer = document.getElementById('avatar');
            this.style.display = 'none';
            
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder-avatar';
            placeholder.innerHTML = '👩‍💻';
            placeholder.id = 'placeholderAvatar';
            avatarContainer.appendChild(placeholder);
        });
    }
});

// ============================== ROLAGEM SUAVE PARA LINKS INTERNOS ==============================
document.addEventListener('DOMContentLoaded', function() {
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    
    linksInternos.forEach(link => {
        link.addEventListener('click', function (evento) {
            evento.preventDefault();
        });
    });
});

// ============================== FUNÇÃO AUXILIAR PARA VALIDAÇÃO DE EMAIL ==============================
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// ============================== FUNÇÃO PARA MOSTRAR MENSAGENS DE ERRO ==============================
function mostrarErro(mensagem) {
    const alertaPersonalizado = document.createElement('div');
    alertaPersonalizado.innerHTML = mensagem;
    alertaPersonalizado.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 0, 0, 0.1);
        color: #ff0000;
        padding: 1rem;
        border: 2px solid #ff0000;
        border-radius: 10px;
        z-index: 9999;
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
    `;
    
    document.body.appendChild(alertaPersonalizado);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (document.body.contains(alertaPersonalizado)) {
            document.body.removeChild(alertaPersonalizado);
        }
    }, 5000);
}

// ============================== FUNÇÃO PARA MOSTRAR MENSAGENS DE SUCESSO ==============================
function mostrarSucesso(mensagem) {
    const alertaPersonalizado = document.createElement('div');
    alertaPersonalizado.innerHTML = mensagem;
    alertaPersonalizado.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 0, 0.1);
        color: #00ff00;
        padding: 1rem;
        border: 2px solid #00ff00;
        border-radius: 10px;
        z-index: 9999;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
    `;
    
    document.body.appendChild(alertaPersonalizado);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (document.body.contains(alertaPersonalizado)) {
            document.body.removeChild(alertaPersonalizado);
        }
    }, 5000);
}