//  EFEITO DE MÁQUINA DE ESCREVER
const textoDigitacao =
  'Seja bem-vindo(a) à NELLY-TECH - onde suas ideias se transformam em realidade digital';
const elementoMaquinaEscrever = document.getElementById('maquinaEscrever');
let indiceTexto = 0;

function digitarTexto() {
  if (indiceTexto < textoDigitacao.length) {
    elementoMaquinaEscrever.innerHTML =
      textoDigitacao.substring(0, indiceTexto + 1) +
      '<span class="cursor">|</span>';
    indiceTexto++;
    setTimeout(digitarTexto, 80);
  } else {
    elementoMaquinaEscrever.innerHTML =
      textoDigitacao + '<span class="cursor">|</span>';
  }
}

// ============================== NAVEGAÇÃO ENTRE PÁGINAS ==============================
function mostrarPagina(idPagina) {
  // Remover classe ativa de todos os links
  const todosLinks = document.querySelectorAll('.links-navegacao a');
  todosLinks.forEach(link => link.classList.remove('ativo'));

  // Adicionar classe ativa ao link clicado
  event.target.classList.add('ativo');

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

// ============================== VALIDAÇÃO DE EMAIL ==============================
function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

// ============================== MOSTRAR ALERTAS ==============================
function mostrarAlerta(mensagem, tipo = 'sucesso') {
  const alerta = document.createElement('div');
  alerta.className = `alerta ${tipo}`;
  alerta.textContent = mensagem;

  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => {
      if (document.body.contains(alerta)) {
        document.body.removeChild(alerta);
      }
    }, 300);
  }, 4000);
}

// ============================== MANIPULAÇÃO DO FORMULÁRIO ==============================
function manipularEnvio(evento) {
  evento.preventDefault();

  const botaoEnviar = document.getElementById('botaoEnviar');
  const nomeCliente = document.getElementById('nome').value.trim();
  const emailCliente = document.getElementById('email').value.trim();
  const empresaCliente = document.getElementById('empresa').value.trim();
  const tipoProjetoCliente = document.getElementById('tipo-projeto').value;
  const projetoCliente = document.getElementById('projeto').value.trim();
  const prazoCliente = document.getElementById('prazo').value;

  // Validações
  if (
    !nomeCliente ||
    !emailCliente ||
    !projetoCliente ||
    !tipoProjetoCliente ||
    !prazoCliente
  ) {
    mostrarAlerta('Por favor, preencha todos os campos obrigatórios.', 'erro');
    return false;
  }

  if (!validarEmail(emailCliente)) {
    mostrarAlerta('Por favor, insira um email válido.', 'erro');
    return false;
  }

  // Mostrar loading
  botaoEnviar.disabled = true;
  botaoEnviar.innerHTML = 'Enviando... <span class="loader"></span>';

  // Simular envio (substitua pela sua lógica de envio real)
  setTimeout(() => {
    mostrarAlerta(
      `Obrigada, ${nomeCliente}! Recebi sua solicitação e entrarei em contato em breve no email ${emailCliente}. Estou ansiosa para trabalhar no seu projeto de ${tipoProjetoCliente}!`,
      'sucesso'
    );

    // Limpar formulário
    evento.target.reset();

    // Restaurar botão
    botaoEnviar.disabled = false;
    botaoEnviar.innerHTML = 'Enviar Projeto';

    // Opcional: redirecionar para página de agradecimento
    setTimeout(() => {
      mostrarPagina('contatos');
    }, 2000);
  }, 2000);

  return false;
}

// ============================== ANIMAÇÕES AO ROLAR ==============================
function animarElementosVisiveis() {
  const elementos = document.querySelectorAll(
    '.card-servico, .card-projeto, .etapa'
  );

  elementos.forEach(elemento => {
    const posicaoElemento = elemento.getBoundingClientRect().top;
    const alturaJanela = window.innerHeight;

    if (posicaoElemento < alturaJanela - 100) {
      elemento.style.opacity = '1';
      elemento.style.transform = 'translateY(0)';
    }
  });
}

// ============================== INICIALIZAÇÃO ==============================
window.addEventListener('load', () => {
  // Iniciar efeito de digitação
  setTimeout(digitarTexto, 1000);

  // Configurar animações iniciais
  const elementos = document.querySelectorAll(
    '.card-servico, .card-projeto, .etapa'
  );
  elementos.forEach(elemento => {
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(20px)';
    elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Configurar scroll listener
  window.addEventListener('scroll', animarElementosVisiveis);
  animarElementosVisiveis(); // Verificar elementos visíveis na carga
});

// ============================== EASTER EGG ==============================
let sequenciaSecreta = [];
const codigoSecreto = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
];

document.addEventListener('keydown', e => {
  sequenciaSecreta.push(e.code);
  if (sequenciaSecreta.length > codigoSecreto.length) {
    sequenciaSecreta.shift();
  }

  if (JSON.stringify(sequenciaSecreta) === JSON.stringify(codigoSecreto)) {
    mostrarAlerta(
      '🎉 Código Konami ativado! Você descobriu meu easter egg!',
      'sucesso'
    );
    document.body.style.animation = 'pulseGlow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 6000);
  }
});

// ============================== TRATAMENTO DE ERROS ==============================
window.addEventListener('error', e => {
  console.error('Erro capturado:', e.error);
  mostrarAlerta('Ops! Algo deu errado. Tente novamente.', 'erro');
});
