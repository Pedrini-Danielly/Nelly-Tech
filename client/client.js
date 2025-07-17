// ============================== FUNÇÕES DE ACESSO ==============================
function acessarProjeto(evento) {
    evento.preventDefault();
    
    const codigoProjeto = document.getElementById('codigo-projeto').value.trim();
    const emailCliente = document.getElementById('email-cliente').value.trim();
    
    if (!codigoProjeto || !emailCliente) {
        mostrarAlerta('Por favor, preencha todos os campos.', 'erro');
        return;
    }
    
    // Validar acesso usando o sistema de dados
    const resultadoValidacao = validarAcesso(codigoProjeto, emailCliente);
    
    if (!resultadoValidacao.sucesso) {
        mostrarAlerta(resultadoValidacao.mensagem, 'erro');
        return;
    }
    
    // Acesso autorizado
    mostrarAlerta('Acesso autorizado! Carregando dados do projeto...', 'sucesso');
    
    // Ocultar formulário e mostrar painel
    setTimeout(() => {
        document.getElementById('formulario-acesso').style.display = 'none';
        document.getElementById('painel-projeto').classList.add('ativo');
        
        // Atualizar dados do projeto
        atualizarDadosProjeto(resultadoValidacao.projeto);
        atualizarTimeline(codigoProjeto);
        atualizarMensagens(codigoProjeto);
    }, 1000);
}

// ============================== FUNÇÕES DE ATUALIZAÇÃO ==============================
function atualizarDadosProjeto(projeto) {
    // Atualizar informações básicas
    document.querySelector('.info-projeto h2').textContent = projeto.nome;
    
    // Atualizar todos os detalhes do projeto
    const detalhes = document.querySelectorAll('.detalhe-item');
    detalhes[0].querySelector('.valor').textContent = projeto.cliente;
    detalhes[1].querySelector('.valor').textContent = projeto.codigo;
    detalhes[2].querySelector('.valor').textContent = projeto.tipo;
    detalhes[3].querySelector('.valor').textContent = projeto.inicio;
    detalhes[4].querySelector('.valor').textContent = projeto.prazo;
    detalhes[5].querySelector('.valor').textContent = projeto.status;
    
    // Atualizar progresso
    const progressoFill = document.querySelector('.progresso-fill');
    const progressoTexto = document.querySelector('.progresso-texto');
    
    progressoFill.style.width = projeto.progresso + '%';
    progressoTexto.textContent = projeto.progresso + '% Concluído';
    
    // Atualizar cor da barra de progresso baseada na porcentagem
    if (projeto.progresso < 30) {
        progressoFill.style.background = 'linear-gradient(90deg, #ff6b6b, #ff8e8e)';
    } else if (projeto.progresso < 70) {
        progressoFill.style.background = 'linear-gradient(90deg, #ffd93d, #ffed4e)';
    } else {
        progressoFill.style.background = 'linear-gradient(90deg, #00ffff, #0080ff)';
    }
}

function atualizarTimeline(codigo) {
    const timeline = buscarTimeline(codigo);
    const timelineContainer = document.querySelector('.timeline');
    
    if (timeline.length > 0) {
        // Limpar timeline existente (manter apenas o título)
        const tituloTimeline = timelineContainer.querySelector('h3');
        timelineContainer.innerHTML = '';
        timelineContainer.appendChild(tituloTimeline);
        
        // Adicionar itens da timeline
        timeline.forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            let icone = '🔄';
            let classeMarker = '';
            
            switch(item.status) {
                case 'concluido':
                    icone = '✓';
                    classeMarker = 'concluido';
                    break;
                case 'em-andamento':
                    icone = '⚡';
                    classeMarker = 'em-andamento';
                    break;
                default:
                    icone = '🔄';
                    classeMarker = '';
            }
            
            timelineItem.innerHTML = `
                <div class="timeline-marker ${classeMarker}">${icone}</div>
                <div class="timeline-content">
                    <h4>${item.titulo}</h4>
                    <p>${item.descricao}</p>
                    <div class="data">${item.data}</div>
                </div>
            `;
            
            timelineContainer.appendChild(timelineItem);
        });
    }
}

function atualizarMensagens(codigo) {
    const mensagens = buscarMensagens(codigo);
    const mensagensContainer = document.querySelector('.mensagens-container');
    
    if (mensagens.length > 0) {
        // Limpar mensagens existentes (manter apenas o título)
        const tituloMensagens = mensagensContainer.querySelector('h3');
        mensagensContainer.innerHTML = '';
        mensagensContainer.appendChild(tituloMensagens);
        
        // Adicionar mensagens
        mensagens.forEach(mensagem => {
            const mensagemDiv = document.createElement('div');
            mensagemDiv.className = `mensagem ${mensagem.tipo}`;
            
            mensagemDiv.innerHTML = `
                <div class="mensagem-header">
                    <span class="mensagem-autor">${mensagem.autor}</span>
                    <span class="mensagem-data">${mensagem.data}</span>
                </div>
                <div class="mensagem-conteudo">${mensagem.conteudo}</div>
            `;
            
            mensagensContainer.appendChild(mensagemDiv);
        });
    }
}

// ============================== FUNÇÕES DE ALERTAS ==============================
function mostrarAlerta(mensagem, tipo) {
    // Remover alertas existentes
    const alertasExistentes = document.querySelectorAll('.alerta');
    alertasExistentes.forEach(alerta => alerta.remove());
    
    // Criar novo alerta
    const alerta = document.createElement('div');
    alerta.className = `alerta ${tipo}`;
    alerta.textContent = mensagem;
    
    document.body.appendChild(alerta);
    
    // Remover alerta após 4 segundos
    setTimeout(() => {
        if (document.body.contains(alerta)) {
            alerta.remove();
        }
    }, 4000);
}

// ============================== FUNÇÕES DE ARQUIVOS ==============================
function baixarArquivo(tipo) {
    let nomeArquivo = '';
    
    switch(tipo) {
        case 'wireframes':
            nomeArquivo = 'wireframes_projeto.pdf';
            break;
        case 'documentacao':
            nomeArquivo = 'documentacao_tecnica.pdf';
            break;
        default:
            nomeArquivo = 'arquivo.pdf';
    }
    
    mostrarAlerta(`Iniciando download: ${nomeArquivo}`, 'sucesso');
    
    // Simular download
    setTimeout(() => {
        mostrarAlerta('Download concluído!', 'sucesso');
    }, 2000);
}

function visualizarPreview() {
    mostrarAlerta('Abrindo preview do projeto...', 'sucesso');
    
    // Simular abertura do preview
    setTimeout(() => {
        mostrarAlerta('Preview carregado com sucesso!', 'sucesso');
        // Em um projeto real, você abriria uma nova janela ou modal
        // window.open('preview.html', '_blank');
    }, 1000);
}

// ============================== FUNÇÕES DE NAVEGAÇÃO ==============================
function voltarInicio() {
    if (document.getElementById('painel-projeto').classList.contains('ativo')) {
        // Voltar para o formulário
        document.getElementById('painel-projeto').classList.remove('ativo');
        document.getElementById('formulario-acesso').style.display = 'block';
        
        // Limpar formulário
        document.getElementById('codigo-projeto').value = '';
        document.getElementById('email-cliente').value = '';
        
        mostrarAlerta('Voltando ao formulário de acesso...', 'sucesso');
    } else {
        // Voltar para o site principal
        mostrarAlerta('Redirecionando para o site principal...', 'sucesso');
        setTimeout(() => {
            window.location.href = '../Home/index.html';
        }, 1000);
    }
}

// ============================== FUNÇÕES DE VALIDAÇÃO ==============================
function validarFormulario() {
    const codigo = document.getElementById('codigo-projeto').value.trim();
    const email = document.getElementById('email-cliente').value.trim();
    
    // Validação básica
    if (codigo.length < 5) {
        mostrarAlerta('Código do projeto deve ter pelo menos 5 caracteres.', 'erro');
        return false;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        mostrarAlerta('Por favor, insira um email válido.', 'erro');
        return false;
    }
    
    return true;
}

// ============================== FUNÇÕES DE INICIALIZAÇÃO ==============================
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar animação aos elementos quando carregados
    const elementos = document.querySelectorAll('.detalhe-item, .timeline-item, .arquivo-item, .mensagem');
    
    elementos.forEach((elemento, index) => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            elemento.style.transition = 'all 0.5s ease';
            elemento.style.opacity = '1';
            elemento.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Adicionar interatividade
    adicionarInteratividade();
    
    // Mostrar dica de teste no console
    console.log('🔑 Para testar o sistema, use:');
    console.log('Código: tech1234');
    console.log('Email: nelly-tech@nelly');
});

// ============================== FUNÇÕES DE INTERATIVIDADE ==============================
function adicionarInteratividade() {
    // Adicionar hover effects dinâmicos
    const itensInterativos = document.querySelectorAll('.detalhe-item, .arquivo-item, .mensagem');
    
    itensInterativos.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Adicionar efeito de clique nos campos do formulário
    const campos = document.querySelectorAll('input');
    campos.forEach(campo => {
        campo.addEventListener('focus', function() {
            this.style.borderColor = '#00ffff';
            this.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.3)';
        });
        
        campo.addEventListener('blur', function() {
            this.style.borderColor = '#333';
            this.style.boxShadow = 'none';
        });
    });
}

// ============================== FUNÇÕES DE RESPONSIVIDADE ==============================
function ajustarResponsividade() {
    const larguraTela = window.innerWidth;
    
    if (larguraTela < 768) {
        // Ajustes para mobile
        document.querySelector('.container').style.padding = '0 10px';
        const formulario = document.querySelector('.formulario-acesso');
        if (formulario) {
            formulario.style.margin = '0 auto 2rem';
        }
    } else {
        // Ajustes para desktop
        document.querySelector('.container').style.padding = '0 20px';
        const formulario = document.querySelector('.formulario-acesso');
        if (formulario) {
            formulario.style.margin = '0 auto 3rem';
        }
    }
}

// ============================== EASTER EGG ==============================
let sequenciaCliques = [];
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('logotipo')) {
        sequenciaCliques.push(Date.now());
        
        // Manter apenas os últimos 5 cliques
        if (sequenciaCliques.length > 5) {
            sequenciaCliques.shift();
        }
        
        // Verificar se foram 5 cliques rápidos
        if (sequenciaCliques.length === 5) {
            const primeiro = sequenciaCliques[0];
            const ultimo = sequenciaCliques[4];
            
            if (ultimo - primeiro < 2000) {
                mostrarAlerta('🚀 Easter Egg! Desenvolvido com 💚 pela Nelly-Tech', 'sucesso');
                document.querySelector('.logotipo').style.animation = 'pulseGlow 2s infinite';
                setTimeout(() => {
                    document.querySelector('.logotipo').style.animation = '';
                }, 6000);
            }
        }
    }
});

// ============================== LISTENERS DE EVENTOS ==============================
window.addEventListener('load', ajustarResponsividade);
window.addEventListener('resize', ajustarResponsividade);

// ============================== FUNÇÕES DE DESENVOLVIMENTO ==============================
// Função para adicionar mais projetos facilmente (use no console)
function adicionarProjetoTeste(codigo, email, nome, cliente) {
    projetosDados[codigo] = {
        codigo: codigo,
        email: email,
        nome: nome,
        cliente: cliente,
        tipo: "Teste",
        inicio: new Date().toLocaleDateString('pt-BR'),
        prazo: "30/12/2024",
        status: "Em Desenvolvimento",
        progresso: Math.floor(Math.random() * 100),
        descricao: "Projeto de teste criado dinamicamente"
    };
    
    console.log(`✅ Projeto ${codigo} adicionado com sucesso!`);
    console.log(`📧 Email: ${email}`);
}
 console.log('✅ NELLY-TECH Sistema completo carregado com sucesso!');
   

 // Mostrar projetos disponíveis no console
    console.log('📋 Projetos disponíveis para teste:');

   
    
    console.log('\n🔑 Credenciais de acesso recomendadas:');
    console.log('Código: tech1234');
    console.log('Email: nelly-tech@nelly');


// Inicialização quando a página carregar
window.addEventListener('load', function() {
    setTimeout(iniciarMaquinaEscrever, 500);
});






