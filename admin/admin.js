// ===== SEÇÃO: DADOS INICIAIS =====
// Array de projetos (simulando banco de dados)
let projetos = [
    {
        id: 1, 
        nome: 'E-commerce Fashion', 
        cliente: 'Maria Santos', 
        status: 'em-andamento', 
        prazo: '2025-06-15', 
        descricao: 'Loja online de roupas'
    },
    {
        id: 2, 
        nome: 'Sistema CRM', 
        cliente: 'João Silva', 
        status: 'novo', 
        prazo: '2025-07-01', 
        descricao: 'Sistema de gerenciamento de clientes'
    },
    {
        id: 3, 
        nome: 'Landing Page', 
        cliente: 'Ana Costa', 
        status: 'concluido', 
        prazo: '2025-05-30', 
        descricao: 'Página de vendas'
    }
];

// Array de mensagens (simulando banco de dados)
let mensagens = [
    {
        id: 1, 
        data: '2025-06-04', 
        nome: 'Pedro Lima', 
        email: 'pedro@email.com', 
        assunto: 'Desenvolvimento de App', 
        status: 'novo', 
        conteudo: 'Olá Nelly, preciso desenvolver um aplicativo mobile para minha empresa. Gostaria de discutir os requisitos e prazos...'
    },
    {
        id: 2, 
        data: '2025-06-03', 
        nome: 'Carla Mendes', 
        email: 'carla@email.com', 
        assunto: 'Site Institucional', 
        status: 'respondida', 
        conteudo: 'Preciso de um site institucional para minha clínica médica. O site deve ter agendamento online e galeria de fotos...'
    }
];

// ===== SEÇÃO: FUNCIONALIDADES DE LOGIN =====
// Event listener para o formulário de login
document.getElementById('formularioLogin').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtém os valores dos campos
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const senhaUsuario = document.getElementById('senhaUsuario').value;

    // Verifica as credenciais (demo)
    if (nomeUsuario === 'admin' && senhaUsuario === 'admin123') {
        // Esconde a página de login
        document.getElementById('paginaLogin').style.display = 'none';
        // Mostra o painel administrativo
        document.getElementById('containerAdmin').style.display = 'block';
        // Atualiza os dados do dashboard
        atualizarDashboard();
        // Carrega as tabelas iniciais
        atualizarTabelaProjetos();
        atualizarTabelaMensagens();
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

// ===== SEÇÃO: FUNCIONALIDADES DE LOGOUT =====
// Função para sair do sistema
function sairSistema() {
    // Confirma se o usuário quer sair
    if (confirm('Tem certeza que deseja sair?')) {
        // Esconde o painel administrativo
        document.getElementById('containerAdmin').style.display = 'none';
        // Mostra a página de login
        document.getElementById('paginaLogin').style.display = 'flex';
        // Limpa o formulário de login
        document.getElementById('formularioLogin').reset();
    }
}

// ===== SEÇÃO: NAVEGAÇÃO ENTRE SEÇÕES =====
// Função para mostrar seção específica
function mostrarSecao(idSecao) {
    // Esconde todas as seções
    document.querySelectorAll('.secao').forEach(secao => {
        secao.classList.remove('ativo');
    });
    
    // Remove classe ativa de todos os itens do menu
    document.querySelectorAll('.menu-lateral a').forEach(link => {
        link.classList.remove('ativo');
    });
    
    // Mostra a seção selecionada
    document.getElementById(idSecao).classList.add('ativo');
    
    // Adiciona classe ativa ao item do menu clicado
    event.target.classList.add('ativo');
}

// ===== SEÇÃO: FUNCIONALIDADES DO DASHBOARD =====
// Função para atualizar estatísticas do dashboard
function atualizarDashboard() {
    // Calcula estatísticas dos projetos
    const totalProjetos = projetos.length;
    const projetosAtivos = projetos.filter(p => p.status === 'em-andamento').length;
    const projetosConcluidos = projetos.filter(p => p.status === 'concluido').length;
    const novasMensagens = mensagens.filter(m => m.status === 'novo').length;
    
    // Atualiza os cards do dashboard
    document.getElementById('totalProjetos').textContent = totalProjetos;
    document.getElementById('projetosAtivos').textContent = projetosAtivos;
    document.getElementById('projetosConcluidos').textContent = projetosConcluidos;
    document.getElementById('novasMensagens').textContent = novasMensagens;
}

// ===== SEÇÃO: GERENCIAMENTO DE PROJETOS =====
// Event listener para o formulário de adição de projetos
document.getElementById('formularioProjeto').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Cria novo projeto com os dados do formulário
    const novoProjeto = {
        id: projetos.length + 1,
        nome: document.getElementById('nomeProjeto').value,
        cliente: document.getElementById('clienteProjeto').value,
        descricao: document.getElementById('descricaoProjeto').value,
        status: document.getElementById('statusProjeto').value,
        prazo: document.getElementById('prazoProjeto').value
    };
    
    // Adiciona o projeto ao array
    projetos.push(novoProjeto);
    
    // Atualiza a tabela e dashboard
    atualizarTabelaProjetos();
    atualizarDashboard();
    
    // Limpa o formulário
    this.reset();
    
    // Exibe mensagem de sucesso
    alert('Projeto adicionado com sucesso!');
});

// Função para atualizar a tabela de projetos
function atualizarTabelaProjetos() {
    const corpoTabela = document.getElementById('tabelaProjetos');
    corpoTabela.innerHTML = '';
    
    // Mapa de status para exibição
    const textoStatus = {
        'novo': 'Novo',
        'em-andamento': 'Em Andamento',
        'concluido': 'Concluído'
    };
    
    // Itera sobre todos os projetos
    projetos.forEach(projeto => {
        const classeStatus = `status-${projeto.status}`;
        const textoStatusAtual = textoStatus[projeto.status];
        
        // Cria linha da tabela
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${projeto.nome}</td>
            <td>${projeto.cliente}</td>
            <td><span class="status ${classeStatus}">${textoStatusAtual}</span></td>
            <td>${formatarData(projeto.prazo)}</td>
            <td>
                <button class="botao botao-info" onclick="editarProjeto(${projeto.id})">Editar</button>
                <button class="botao botao-perigo" onclick="excluirProjeto(${projeto.id})">Excluir</button>
            </td>
        `;
        
        corpoTabela.appendChild(linha);
    });
}

// Função para editar projeto
function editarProjeto(id) {
    const projeto = projetos.find(p => p.id === id);
    if (projeto) {
        // Preenche o formulário com os dados do projeto
        document.getElementById('nomeProjeto').value = projeto.nome;
        document.getElementById('clienteProjeto').value = projeto.cliente;
        document.getElementById('descricaoProjeto').value = projeto.descricao;
        document.getElementById('statusProjeto').value = projeto.status;
        document.getElementById('prazoProjeto').value = projeto.prazo;
        
        // Remove o projeto original para evitar duplicatas
        excluirProjeto(id, false);
        
        // Rola para o formulário
        document.getElementById('formularioProjeto').scrollIntoView({ behavior: 'smooth' });
        
        alert('Projeto carregado no formulário para edição!');
    }
}

// Função para excluir projeto
function excluirProjeto(id, confirmar = true) {
    if (!confirmar || confirm('Tem certeza que deseja excluir este projeto?')) {
        // Remove o projeto do array
        projetos = projetos.filter(p => p.id !== id);
        
        // Atualiza a tabela e dashboard
        atualizarTabelaProjetos();
        atualizarDashboard();
        
        if (confirmar) {
            alert('Projeto excluído com sucesso!');
        }
    }
}

// ===== SEÇÃO: GERENCIAMENTO DE MENSAGENS =====
// Função para atualizar a tabela de mensagens
function atualizarTabelaMensagens() {
    const corpoTabela = document.getElementById('tabelaMensagens');
    corpoTabela.innerHTML = '';
    
    // Mapa de status para exibição
    const textoStatus = {
        'novo': 'Nova',
        'respondida': 'Respondida',
        'arquivada': 'Arquivada'
    };
    
    // Itera sobre todas as mensagens
    mensagens.forEach(mensagem => {
        const classeStatus = `status-${mensagem.status}`;
        const textoStatusAtual = textoStatus[mensagem.status];
        
        // Cria linha da tabela
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${formatarData(mensagem.data)}</td>
            <td>${mensagem.nome}</td>
            <td>${mensagem.email}</td>
            <td>${mensagem.assunto}</td>
            <td><span class="status ${classeStatus}">${textoStatusAtual}</span></td>
            <td>
                <button class="botao botao-info" onclick="verMensagem('${mensagem.conteudo}')">Ver</button>
                <button class="botao botao-primario" onclick="responderMensagem(${mensagem.id})">Responder</button>
                <button class="botao botao-perigo" onclick="excluirMensagem(${mensagem.id})">Excluir</button>
            </td>
        `;
        
        corpoTabela.appendChild(linha);
    });
}

// Função para visualizar mensagem completa
function verMensagem(conteudo) {
    alert('Mensagem completa:\n\n' + conteudo);
}

// Função para responder mensagem
function responderMensagem(id) {
    const mensagem = mensagens.find(m => m.id === id);
    if (mensagem) {
        // Simula resposta (em uma aplicação real, abriria modal ou nova página)
        const resposta = prompt(`Responder para ${mensagem.nome} (${mensagem.email}):\n\nAssunto: Re: ${mensagem.assunto}\n\nDigite sua resposta:`);
        
        if (resposta && resposta.trim() !== '') {
            // Marca mensagem como respondida
            mensagem.status = 'respondida';
            
            // Atualiza tabela e dashboard
            atualizarTabelaMensagens();
            atualizarDashboard();
            
            alert('Resposta enviada com sucesso!');
        }
    }
}

// Função para excluir mensagem
function excluirMensagem(id) {
    if (confirm('Tem certeza que deseja excluir esta mensagem?')) {
        // Remove a mensagem do array
        mensagens = mensagens.filter(m => m.id !== id);
        
        // Atualiza tabela e dashboard
        atualizarTabelaMensagens();
        atualizarDashboard();
        
        alert('Mensagem excluída com sucesso!');
    }
}

// ===== SEÇÃO: CONFIGURAÇÕES DO PERFIL =====
// Event listener para o formulário de perfil
document.getElementById('formularioPerfil').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simula salvamento do perfil
    alert('Perfil atualizado com sucesso!');
});

// Event listener para o formulário de alteração de senha
document.getElementById('formularioSenha').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação básica das senhas
    const senhaAtual = this.querySelector('input[type="password"]:nth-child(1)').value;
    const novaSenha = this.querySelector('input[type="password"]:nth-child(2)').value;
    const confirmarSenha = this.querySelector('input[type="password"]:nth-child(3)').value;
    
    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }
    
    if (novaSenha.length < 6) {
        alert('A nova senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    // Simula alteração de senha
    this.reset();
    alert('Senha alterada com sucesso!');
});

// Event listener para o formulário de configurações do site
document.getElementById('formularioSite').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simula salvamento das configurações
    alert('Configurações do site salvas com sucesso!');
});

// ===== SEÇÃO: FUNÇÕES UTILITÁRIAS =====
// Função para formatar data no padrão brasileiro
function formatarData(data) {
    const dataObj = new Date(data + 'T00:00:00');
    return dataObj.toLocaleDateString('pt-BR');
}

// Função para gerar ID único
function gerarIdUnico() {
    return Date.now() + Math.random();
}

// ===== SEÇÃO: INICIALIZAÇÃO =====
// Executa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa as tabelas se estiver logado
    if (document.getElementById('containerAdmin').style.display === 'block') {
        atualizarTabelaProjetos();
        atualizarTabelaMensagens();
        atualizarDashboard();
    }
});

// ===== SEÇÃO: FUNCIONALIDADES EXTRAS =====
// Função para buscar projetos (funcionalidade futura)
function buscarProjetos(termo) {
    return projetos.filter(projeto => 
        projeto.nome.toLowerCase().includes(termo.toLowerCase()) ||
        projeto.cliente.toLowerCase().includes(termo.toLowerCase())
    );
}

// Função para filtrar projetos por status
function filtrarProjetosPorStatus(status) {
    return projetos.filter(projeto => projeto.status === status);
}

// Função para obter estatísticas detalhadas
function obterEstatisticas() {
    return {
        totalProjetos: projetos.length,
        projetosNovos: projetos.filter(p => p.status === 'novo').length,
        projetosEmAndamento: projetos.filter(p => p.status === 'em-andamento').length,
        projetosConcluidos: projetos.filter(p => p.status === 'concluido').length,
        totalMensagens: mensagens.length,
        mensagensNovas: mensagens.filter(m => m.status === 'novo').length,
        mensagensRespondidas: mensagens.filter(m => m.status === 'respondida').length
    };
}

// ===== SEÇÃO: EVENTOS GLOBAIS =====
// Previne perda de dados ao sair da página
window.addEventListener('beforeunload', function(e) {
    // Verifica se há dados não salvos (simulação)
    const formularioProjeto = document.getElementById('formularioProjeto');
    if (formularioProjeto.querySelector('#nomeProjeto').value.trim() !== '') {
        e.preventDefault();
        e.returnValue = 'Você tem dados não salvos. Tem certeza que deseja sair?';
    }
});

// Atalhos de teclado para navegação rápida
document.addEventListener('keydown', function(e) {
    // Alt + D = Dashboard
    if (e.altKey && e.key === 'd') {
        mostrarSecao('dashboard');
        e.preventDefault();
    }
    // Alt + P = Projetos
    else if (e.altKey && e.key === 'p') {
        mostrarSecao('projetos');
        e.preventDefault();
    }
    // Alt + M = Mensagens
    else if (e.altKey && e.key === 'm') {
        mostrarSecao('mensagens');
        e.preventDefault();
    }
    // Alt + C = Configurações
    else if (e.altKey && e.key === 'c') {
        mostrarSecao('configuracoes');
        e.preventDefault();
    }
});