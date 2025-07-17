// ============================== NELLY-TECH SISTEMA COMPLETO ==============================
"use strict";

// ============================== DADOS DOS PROJETOS ==============================
const projetosDados = {
    // Projeto de teste conforme solicitado
    "tech1234": {
        codigo: "tech1234",
        email: "nelly-tech@nelly",
        nome: "Site Portfolio Nelly-Tech",
        cliente: "Nelly Tech",
        tipo: "Portfolio",
        inicio: "10/07/2024",
        prazo: "25/07/2024",
        status: "Em Desenvolvimento",
        progresso: 75,
        descricao: "Desenvolvimento de portfolio profissional com área do cliente",
        origem: "teste" // Distingue projetos de teste dos reais
    },
    
    // Projeto original do HTML
    "PROJ-2024-001": {
        codigo: "PROJ-2024-001",
        email: "maria.santos@email.com",
        nome: "Site E-commerce para Pet Shop",
        cliente: "Maria Santos",
        tipo: "E-commerce",
        inicio: "15/07/2024",
        prazo: "15/08/2024",
        status: "Em Desenvolvimento",
        progresso: 65,
        descricao: "Desenvolvimento de e-commerce completo para pet shop",
        origem: "teste"
    },
    
    // Projetos adicionais para teste
    "WEB-2024-002": {
        codigo: "WEB-2024-002",
        email: "joao.silva@empresa.com",
        nome: "Sistema de Gestão Empresarial",
        cliente: "João Silva",
        tipo: "Sistema Web",
        inicio: "01/07/2024",
        prazo: "30/08/2024",
        status: "Planejamento",
        progresso: 25,
        descricao: "Sistema completo de gestão empresarial com dashboard",
        origem: "teste"
    },
    
    "MOBILE-2024-003": {
        codigo: "MOBILE-2024-003",
        email: "ana.costa@startup.com",
        nome: "App Mobile de Delivery",
        cliente: "Ana Costa",
        tipo: "Aplicativo Mobile",
        inicio: "20/07/2024",
        prazo: "20/09/2024",
        status: "Design",
        progresso: 40,
        descricao: "Aplicativo de delivery com geolocalização e pagamento",
        origem: "teste"
    },
    
    "SITE-2024-004": {
        codigo: "SITE-2024-004",
        email: "carlos.mendes@clinica.com",
        nome: "Site Institucional Clínica",
        cliente: "Dr. Carlos Mendes",
        tipo: "Site Institucional",
        inicio: "05/07/2024",
        prazo: "05/08/2024",
        status: "Finalizado",
        progresso: 100,
        descricao: "Site institucional para clínica médica com agendamento online",
        origem: "teste"
    }
};

// ============================== DADOS DE TIMELINE ==============================
const timelinesDados = {
    "tech1234": [
        {
            titulo: "Briefing e Planejamento",
            descricao: "Definição do escopo e estrutura do portfolio",
            data: "10/07/2024",
            status: "concluido"
        },
        {
            titulo: "Design e Protótipo",
            descricao: "Criação do layout e identidade visual",
            data: "12/07/2024",
            status: "concluido"
        },
        {
            titulo: "Desenvolvimento Front-end",
            descricao: "Codificação das páginas e funcionalidades",
            data: "Em andamento",
            status: "em-andamento"
        },
        {
            titulo: "Área do Cliente",
            descricao: "Desenvolvimento do sistema de acompanhamento",
            data: "Próxima etapa",
            status: "pendente"
        },
        {
            titulo: "Testes e Otimização",
            descricao: "Testes de funcionalidade e performance",
            data: "Aguardando",
            status: "pendente"
        },
        {
            titulo: "Deploy e Entrega",
            descricao: "Publicação do site e documentação",
            data: "Aguardando",
            status: "pendente"
        }
    ]
};

// ============================== DADOS DE MENSAGENS ==============================
const mensagensDados = {
    "tech1234": [
        {
            autor: "Nelly (Desenvolvedor)",
            data: "Hoje, 15:45",
            conteudo: "Oi! Implementei a área do cliente conforme planejado. Agora você pode acompanhar o progresso em tempo real. O que achou da interface?",
            tipo: "desenvolvedor"
        },
        {
            autor: "Nelly Tech (Cliente)",
            data: "Hoje, 14:20",
            conteudo: "Perfeito! A funcionalidade está exatamente como esperava. Podemos adicionar mais alguns projetos de exemplo para demonstração?",
            tipo: "cliente"
        },
        {
            autor: "Nelly (Desenvolvedor)",
            data: "Ontem, 16:30",
            conteudo: "Finalizei a validação do formulário e o sistema de alertas. Tudo está funcionando perfeitamente. Próximo passo: melhorar a responsividade mobile.",
            tipo: "desenvolvedor"
        }
    ],
    
    "PROJ-2024-001": [
        {
            autor: "Nelly (Desenvolvedor)",
            data: "Hoje, 14:30",
            conteudo: "Oi Maria! Acabei de finalizar a página de produtos. O catálogo está ficando muito bom! Implementei os filtros por categoria e preço como conversamos. Você pode dar uma olhada no preview e me dizer o que achou?",
            tipo: "desenvolvedor"
        },
        {
            autor: "Maria Santos (Cliente)",
            data: "Ontem, 16:45",
            conteudo: "Olá Nelly! Adorei o progresso até agora. O design está exatamente como imaginei. Só uma dúvida: seria possível adicionar um campo para observações no carrinho de compras?",
            tipo: "cliente"
        },
        {
            autor: "Nelly (Desenvolvedor)",
            data: "Ontem, 09:15",
            conteudo: "Bom dia! Terminei a implementação do sistema de login e cadastro. Os usuários agora podem criar contas e fazer login facilmente. Próximo passo: integrar com o sistema de pagamento.",
            tipo: "desenvolvedor"
        }
    ]
};

// ============================== ESTADO DA APLICAÇÃO ==============================
const app = {
    state: {
        fotoPerfil: null,
        mensagens: [],
        clientes: [],
        rascunho: null,
        tema: 'escuro',
        visitas: 0,
        projetoAtual: null,
        clienteLogado: null,
        adminLogado: false,
        pedidosPendentes: [] // Novos pedidos aguardando aprovação
    }
};

// ============================== SISTEMA DE ARMAZENAMENTO ==============================
// Funções para salvar e carregar dados no localStorage
function salvarDados() {
    const dados = {
        projetos: projetosDados,
        timelines: timelinesDados,
        mensagens: mensagensDados,
        state: app.state
    };
    
    // Salvar no localStorage (para ambiente de produção seria substituído)
    if (typeof Storage !== "undefined") {
        try {
            Object.keys(dados).forEach(key => {
                const valor = JSON.stringify(dados[key]);
                // Simular localStorage com variável em memória
                window[`nellytech_${key}`] = valor;
            });
        } catch (e) {
            console.warn('Erro ao salvar dados:', e);
        }
    }
}

function carregarDados() {
    if (typeof Storage !== "undefined") {
        try {
            // Simular carregamento do localStorage
            const projetosStorage = window[`nellytech_projetos`];
            const timelinesStorage = window[`nellytech_timelines`];
            const mensagensStorage = window[`nellytech_mensagens`];
            const stateStorage = window[`nellytech_state`];
            
            if (projetosStorage) {
                Object.assign(projetosDados, JSON.parse(projetosStorage));
            }
            if (timelinesStorage) {
                Object.assign(timelinesDados, JSON.parse(timelinesStorage));
            }
            if (mensagensStorage) {
                Object.assign(mensagensDados, JSON.parse(mensagensStorage));
            }
            if (stateStorage) {
                Object.assign(app.state, JSON.parse(stateStorage));
            }
        } catch (e) {
            console.warn('Erro ao carregar dados:', e);
        }
    }
}

// ============================== FUNÇÕES DE BUSCA E VALIDAÇÃO ==============================
function buscarProjeto(codigo) {
    return projetosDados[codigo] || null;
}

function buscarTimeline(codigo) {
    return timelinesDados[codigo] || [];
}

function buscarMensagens(codigo) {
    return mensagensDados[codigo] || [];
}

function validarAcesso(codigo, email) {
    const projeto = buscarProjeto(codigo);
    
    if (!projeto) {
        return { sucesso: false, mensagem: "Código de projeto não encontrado." };
    }
    
    if (projeto.email !== email) {
        return { sucesso: false, mensagem: "Email não corresponde ao projeto informado." };
    }
    
    return { sucesso: true, projeto: projeto };
}

// ============================== GERADOR DE CÓDIGO DE PROJETO ==============================
function gerarCodigoProjeto() {
    const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigo = '';
    
    for (let i = 0; i < 8; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    
    // Verificar se o código já existe
    if (projetosDados[codigo]) {
        return gerarCodigoProjeto(); // Gerar novamente se já existir
    }
    
    return codigo;
}

// ============================== CRIAR PROJETO A PARTIR DO PEDIDO ==============================
function criarProjetoDesdeHome(nome, email, descricaoProjeto) {
    const codigo = gerarCodigoProjeto();
    const agora = new Date();
    const dataInicio = agora.toLocaleDateString('pt-BR');
    
    // Calcular prazo (30 dias a partir de hoje)
    const prazoDate = new Date(agora);
    prazoDate.setDate(prazoDate.getDate() + 30);
    const prazo = prazoDate.toLocaleDateString('pt-BR');
    
    // Determinar tipo do projeto baseado na descrição
    let tipoProjeto = "Website";
    const descricaoLower = descricaoProjeto.toLowerCase();
    
    if (descricaoLower.includes('e-commerce') || descricaoLower.includes('loja')) {
        tipoProjeto = "E-commerce";
    } else if (descricaoLower.includes('app') || descricaoLower.includes('aplicativo')) {
        tipoProjeto = "Aplicativo Mobile";
    } else if (descricaoLower.includes('sistema') || descricaoLower.includes('erp')) {
        tipoProjeto = "Sistema Web";
    } else if (descricaoLower.includes('portfolio') || descricaoLower.includes('portfólio')) {
        tipoProjeto = "Portfolio";
    }
    
    // Criar projeto
    const novoProjeto = {
        codigo: codigo,
        email: email,
        nome: `Projeto para ${nome}`,
        cliente: nome,
        tipo: tipoProjeto,
        inicio: dataInicio,
        prazo: prazo,
        status: "Aguardando Aprovação",
        progresso: 0,
        descricao: descricaoProjeto,
        origem: "home", // Marca que veio do site home
        dataCriacao: agora.toISOString()
    };
    
    // Adicionar ao sistema
    projetosDados[codigo] = novoProjeto;
    
    // Criar timeline inicial
    timelinesDados[codigo] = [
        {
            titulo: "Pedido Recebido",
            descricao: "Seu pedido foi recebido e está sendo analisado",
            data: dataInicio,
            status: "concluido"
        },
        {
            titulo: "Análise e Orçamento",
            descricao: "Analisando requisitos e preparando orçamento",
            data: "Em andamento",
            status: "em-andamento"
        },
        {
            titulo: "Aprovação do Cliente",
            descricao: "Aguardando aprovação do orçamento",
            data: "Próxima etapa",
            status: "pendente"
        },
        {
            titulo: "Desenvolvimento",
            descricao: "Início do desenvolvimento do projeto",
            data: "Aguardando",
            status: "pendente"
        },
        {
            titulo: "Testes e Revisão",
            descricao: "Testes finais e revisão do projeto",
            data: "Aguardando",
            status: "pendente"
        },
        {
            titulo: "Entrega Final",
            descricao: "Entrega do projeto finalizado",
            data: "Aguardando",
            status: "pendente"
        }
    ];
    
    // Criar mensagem inicial
    mensagensDados[codigo] = [
        {
            autor: "Nelly (Desenvolvedor)",
            data: `Hoje, ${agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            conteudo: `Olá ${nome}! Recebi seu pedido para: "${descricaoProjeto}". Vou analisar os requisitos e em breve entrarei em contato com mais detalhes e orçamento. Você pode acompanhar o progresso usando o código ${codigo} e seu email.`,
            tipo: "desenvolvedor"
        }
    ];
    
    // Adicionar aos pedidos pendentes para o admin
    app.state.pedidosPendentes.push({
        codigo: codigo,
        nome: nome,
        email: email,
        projeto: descricaoProjeto,
        data: agora.toISOString(),
        status: "novo"
    });
    
    // Salvar dados
    salvarDados();
    
    return codigo;
}

// ============================== ÁREA ADMINISTRATIVA ==============================
function mostrarAreaAdmin() {
    // Verificar se admin está logado (implementar autenticação se necessário)
    if (!app.state.adminLogado) {
        const senha = prompt("Digite a senha de administrador:");
        if (senha !== "admin123") { // Mude para uma senha segura
            mostrarErro("Senha incorreta!");
            return;
        }
        app.state.adminLogado = true;
    }
    
    const areaAdmin = document.getElementById('areaAdmin') || criarElementoAdmin();
    
    // Buscar todos os projetos
    const todosProjetos = Object.values(projetosDados);
    const projetosHome = todosProjetos.filter(p => p.origem === "home");
    const pedidosPendentes = app.state.pedidosPendentes.filter(p => p.status === "novo");
    
    areaAdmin.innerHTML = `
        <div class="admin-header">
            <h2>🛡️ Área Administrativa</h2>
            <button onclick="logoutAdmin()" class="btn-logout">Sair</button>
        </div>
        
        <div class="admin-stats">
            <div class="stat-card">
                <h3>Total de Projetos</h3>
                <span class="stat-number">${todosProjetos.length}</span>
            </div>
            <div class="stat-card">
                <h3>Pedidos do Site</h3>
                <span class="stat-number">${projetosHome.length}</span>
            </div>
            <div class="stat-card">
                <h3>Pedidos Pendentes</h3>
                <span class="stat-number">${pedidosPendentes.length}</span>
            </div>
        </div>
        
        <div class="admin-section">
            <h3>🆕 Novos Pedidos do Site</h3>
            ${pedidosPendentes.length > 0 ? `
                <div class="pedidos-lista">
                    ${pedidosPendentes.map(pedido => `
                        <div class="pedido-card">
                            <div class="pedido-header">
                                <strong>${pedido.nome}</strong>
                                <span class="pedido-data">${new Date(pedido.data).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div class="pedido-info">
                                <p><strong>Email:</strong> ${pedido.email}</p>
                                <p><strong>Código:</strong> ${pedido.codigo}</p>
                                <p><strong>Projeto:</strong> ${pedido.projeto}</p>
                            </div>
                            <div class="pedido-acoes">
                                <button onclick="aprovarPedido('${pedido.codigo}')" class="btn-aprovar">Aprovar</button>
                                <button onclick="rejeitarPedido('${pedido.codigo}')" class="btn-rejeitar">Rejeitar</button>
                                <button onclick="verProjeto('${pedido.codigo}')" class="btn-ver">Ver Projeto</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : '<p>Nenhum pedido pendente no momento.</p>'}
        </div>
        
        <div class="admin-section">
            <h3>📊 Todos os Projetos</h3>
            <div class="projetos-lista">
                ${todosProjetos.map(projeto => `
                    <div class="projeto-card-admin">
                        <div class="projeto-header-admin">
                            <strong>${projeto.nome}</strong>
                            <span class="status-badge ${projeto.status.toLowerCase().replace(' ', '-')}">${projeto.status}</span>
                        </div>
                        <div class="projeto-info-admin">
                            <p><strong>Cliente:</strong> ${projeto.cliente}</p>
                            <p><strong>Código:</strong> ${projeto.codigo}</p>
                            <p><strong>Tipo:</strong> ${projeto.tipo}</p>
                            <p><strong>Progresso:</strong> ${projeto.progresso}%</p>
                            <p><strong>Origem:</strong> ${projeto.origem || 'manual'}</p>
                        </div>
                        <div class="projeto-acoes-admin">
                            <button onclick="editarProjeto('${projeto.codigo}')" class="btn-editar">Editar</button>
                            <button onclick="verProjeto('${projeto.codigo}')" class="btn-ver">Ver</button>
                            ${projeto.origem === 'home' ? `<button onclick="excluirProjeto('${projeto.codigo}')" class="btn-excluir">Excluir</button>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    areaAdmin.style.display = 'block';
}

function criarElementoAdmin() {
    const areaAdmin = document.createElement('div');
    areaAdmin.id = 'areaAdmin';
    areaAdmin.className = 'area-admin';
    areaAdmin.style.display = 'none';
    document.body.appendChild(areaAdmin);
    return areaAdmin;
}

function aprovarPedido(codigo) {
    // Atualizar status do projeto
    if (projetosDados[codigo]) {
        projetosDados[codigo].status = "Em Planejamento";
        projetosDados[codigo].progresso = 15;
        
        // Atualizar timeline
        if (timelinesDados[codigo]) {
            timelinesDados[codigo][1].status = "concluido";
            timelinesDados[codigo][1].data = new Date().toLocaleDateString('pt-BR');
        }
        
        // Remover dos pedidos pendentes
        app.state.pedidosPendentes = app.state.pedidosPendentes.filter(p => p.codigo !== codigo);
        
        // Adicionar mensagem de aprovação
        adicionarMensagem(codigo, "Nelly (Desenvolvedor)", "Ótima notícia! Seu projeto foi aprovado e já está em planejamento. Em breve você receberá mais detalhes sobre o cronograma e próximos passos.", "desenvolvedor");
        
        salvarDados();
        mostrarSucesso("Pedido aprovado com sucesso!");
        mostrarAreaAdmin(); // Recarregar área admin
    }
}

function rejeitarPedido(codigo) {
    const motivo = prompt("Digite o motivo da rejeição:");
    if (motivo) {
        // Atualizar status do projeto
        if (projetosDados[codigo]) {
            projetosDados[codigo].status = "Rejeitado";
            
            // Adicionar mensagem de rejeição
            adicionarMensagem(codigo, "Nelly (Desenvolvedor)", `Lamentamos informar que seu pedido foi rejeitado. Motivo: ${motivo}. Entre em contato conosco para mais esclarecimentos.`, "desenvolvedor");
            
            // Remover dos pedidos pendentes
            app.state.pedidosPendentes = app.state.pedidosPendentes.filter(p => p.codigo !== codigo);
            
            salvarDados();
            mostrarInfo("Pedido rejeitado.");
            mostrarAreaAdmin(); // Recarregar área admin
        }
    }
}

function verProjeto(codigo) {
    const projeto = buscarProjeto(codigo);
    if (projeto) {
        // Simular login como cliente para ver o projeto
        app.state.clienteLogado = {
            codigo: codigo,
            email: projeto.email,
            projeto: projeto
        };
        mostrarAreaCliente(projeto);
    }
}

function editarProjeto(codigo) {
    const projeto = buscarProjeto(codigo);
    if (projeto) {
        const novoProgresso = prompt(`Progresso atual: ${projeto.progresso}%\nNovo progresso (0-100):`, projeto.progresso);
        if (novoProgresso !== null && !isNaN(novoProgresso) && novoProgresso >= 0 && novoProgresso <= 100) {
            projeto.progresso = parseInt(novoProgresso);
            
            // Atualizar status baseado no progresso
            if (projeto.progresso === 0) {
                projeto.status = "Planejamento";
            } else if (projeto.progresso < 25) {
                projeto.status = "Em Planejamento";
            } else if (projeto.progresso < 50) {
                projeto.status = "Em Desenvolvimento";
            } else if (projeto.progresso < 75) {
                projeto.status = "Em Teste";
            } else if (projeto.progresso < 100) {
                projeto.status = "Finalizando";
            } else {
                projeto.status = "Finalizado";
            }
            
            salvarDados();
            mostrarSucesso("Projeto atualizado com sucesso!");
            mostrarAreaAdmin();
        }
    }
}

function excluirProjeto(codigo) {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
        delete projetosDados[codigo];
        delete timelinesDados[codigo];
        delete mensagensDados[codigo];
        
        // Remover dos pedidos pendentes também
        app.state.pedidosPendentes = app.state.pedidosPendentes.filter(p => p.codigo !== codigo);
        
        salvarDados();
        mostrarSucesso("Projeto excluído com sucesso!");
        mostrarAreaAdmin();
    }
}

function logoutAdmin() {
    app.state.adminLogado = false;
    const areaAdmin = document.getElementById('areaAdmin');
    if (areaAdmin) {
        areaAdmin.style.display = 'none';
    }
    mostrarInfo('Deslogado da área administrativa');
}

function atualizarProgresso(codigo, novoProgresso) {
    if (projetosDados[codigo]) {
        projetosDados[codigo].progresso = novoProgresso;
        salvarDados();
        return true;
    }
    return false;
}

function adicionarMensagem(codigo, autor, conteudo, tipo = "cliente") {
    if (!mensagensDados[codigo]) {
        mensagensDados[codigo] = [];
    }
    
    const agora = new Date();
    const horario = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    mensagensDados[codigo].unshift({
        autor: autor,
        data: `Hoje, ${horario}`,
        conteudo: conteudo,
        tipo: tipo
    });
    
    salvarDados();
}

// ============================== FUNCIONALIDADES DO SITE ==============================

// Efeito de máquina de escrever
function iniciarMaquinaEscrever() {
    const texto = "Seja bem-vindo(a) à NELLY-TECH - onde suas ideias se transformam em realidade digital";
    const elemento = document.getElementById('maquinaEscrever');
    
    if (!elemento) return;
    
    let i = 0;
    function digitar() {
        if (i < texto.length) {
            elemento.innerHTML = texto.substring(0, i + 1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(digitar, 80);
        } else {
            elemento.innerHTML = texto + '<span class="cursor">|</span>';
        }
    }
    
    setTimeout(digitar, 1000);
}

// Upload de foto
function carregarFoto(evento) {
    const arquivo = evento.target.files[0];
    if (!arquivo) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const foto = document.getElementById('fotoPerfilPrincipal');
        if (foto) {
            foto.src = e.target.result;
            app.state.fotoPerfil = e.target.result;
            salvarDados();
        }
    };
    reader.readAsDataURL(arquivo);
}

// Navegação entre páginas
function mostrarPagina(idPagina) {
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(p => p.classList.remove('ativa'));
    
    const pagina = document.getElementById(idPagina);
    if (pagina) {
        pagina.classList.add('ativa');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validação de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ============================== FORMULÁRIO PRINCIPAL ATUALIZADO ==============================
function manipularEnvio(evento) {
    evento.preventDefault();
    
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const projeto = document.getElementById('projeto');
    
    if (!nome || !email || !projeto) {
        mostrarErro('Elementos do formulário não encontrados');
        return false;
    }
    
    const nomeVal = nome.value.trim();
    const emailVal = email.value.trim();
    const projetoVal = projeto.value.trim();
    
    if (!nomeVal || !emailVal || !projetoVal) {
        mostrarErro('Por favor, preencha todos os campos');
        return false;
    }
    
    if (!validarEmail(emailVal)) {
        mostrarErro('Por favor, insira um email válido');
        return false;
    }
    
    // Criar projeto automático
    const codigo = criarProjetoDesdeHome(nomeVal, emailVal, projetoVal);
    
    // Salvar mensagem no sistema antigo também
    const mensagem = {
        id: Date.now(),
        nome: nomeVal,
        email: emailVal,
        projeto: projetoVal,
        data: new Date().toISOString(),
        codigo: codigo
    };
    
    app.state.mensagens.push(mensagem);
    salvarDados();
    
    // Limpar formulário
    nome.value = '';
    email.value = '';
    projeto.value = '';
    
    // Mostrar mensagem de sucesso com o código
    mostrarSucesso(`Obrigada, ${nomeVal}! Seu pedido foi registrado com sucesso.<br>
                   <strong>Código do projeto: ${codigo}</strong><br>
                   Você pode acompanhar o progresso na área do cliente usando este código e seu email.`);
    
    return true;
}

// Manipulação do formulário de acesso à área do cliente
function manipularAcessoCliente(evento) {
    evento.preventDefault();
    
    const codigo = document.getElementById('codigoProjeto');
    const email = document.getElementById('emailCliente');
    
    if (!codigo || !email) {
        mostrarErro('Elementos do formulário não encontrados');
        return false;
    }
    
    const codigoVal = codigo.value.trim();
    const emailVal = email.value.trim();
    
    if (!codigoVal || !emailVal) {
        mostrarErro('Por favor, preencha todos os campos');
        return false;
    }
    
    // Continuação do código a partir de onde parou...

    if (!validarEmail(emailVal)) {
        mostrarErro('Por favor, insira um email válido');
        return false;
    }
    
    // Validar acesso
    const resultado = validarAcesso(codigoVal, emailVal);
    
    if (!resultado.sucesso) {
        mostrarErro(resultado.mensagem);
        return false;
    }
    
    // Salvar cliente logado
    app.state.clienteLogado = {
        codigo: codigoVal,
        email: emailVal,
        projeto: resultado.projeto
    };
    
    // Mostrar área do cliente
    mostrarAreaCliente(resultado.projeto);
    
    // Limpar formulário
    codigo.value = '';
    email.value = '';
    
    return true;
}

// ============================== ÁREA DO CLIENTE ==============================
function mostrarAreaCliente(projeto) {
    const areaCliente = document.getElementById('areaCliente') || criarElementoCliente();
    
    const timeline = buscarTimeline(projeto.codigo);
    const mensagens = buscarMensagens(projeto.codigo);
    
    areaCliente.innerHTML = `
        <div class="area-cliente-header">
            <h2>🎯 Área do Cliente</h2>
            <div class="cliente-info">
                <p><strong>Projeto:</strong> ${projeto.nome}</p>
                <p><strong>Cliente:</strong> ${projeto.cliente}</p>
                <p><strong>Código:</strong> ${projeto.codigo}</p>
            </div>
            <button onclick="voltarHome()" class="btn-voltar">← Voltar</button>
        </div>
        
        <div class="progresso-principal">
            <div class="progresso-header">
                <h3>📈 Progresso do Projeto</h3>
                <span class="status-badge ${projeto.status.toLowerCase().replace(' ', '-')}">${projeto.status}</span>
            </div>
            <div class="progresso-bar">
                <div class="progresso-fill" style="width: ${projeto.progresso}%"></div>
            </div>
            <p class="progresso-text">${projeto.progresso}% concluído</p>
        </div>
        
        <div class="informacoes-projeto">
            <div class="info-card">
                <h4>📋 Informações do Projeto</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Tipo:</strong> ${projeto.tipo}
                    </div>
                    <div class="info-item">
                        <strong>Início:</strong> ${projeto.inicio}
                    </div>
                    <div class="info-item">
                        <strong>Prazo:</strong> ${projeto.prazo}
                    </div>
                    <div class="info-item">
                        <strong>Descrição:</strong> ${projeto.descricao}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="timeline-container">
            <h3>📅 Cronograma do Projeto</h3>
            <div class="timeline">
                ${timeline.map(item => `
                    <div class="timeline-item ${item.status}">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>${item.titulo}</h4>
                            <p>${item.descricao}</p>
                            <span class="timeline-data">${item.data}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="mensagens-container">
            <h3>💬 Mensagens do Projeto</h3>
            <div class="mensagens-lista">
                ${mensagens.map(msg => `
                    <div class="mensagem ${msg.tipo}">
                        <div class="mensagem-header">
                            <strong>${msg.autor}</strong>
                            <span class="mensagem-data">${msg.data}</span>
                        </div>
                        <div class="mensagem-conteudo">${msg.conteudo}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="nova-mensagem">
                <h4>✍️ Enviar nova mensagem</h4>
                <form onsubmit="enviarMensagem(event)" class="form-mensagem">
                    <textarea id="novaMensagem" placeholder="Digite sua mensagem aqui..." required></textarea>
                    <button type="submit" class="btn-enviar">Enviar Mensagem</button>
                </form>
            </div>
        </div>
    `;
    
    areaCliente.style.display = 'block';
    mostrarPagina('areaCliente');
}

function criarElementoCliente() {
    const areaCliente = document.createElement('div');
    areaCliente.id = 'areaCliente';
    areaCliente.className = 'area-cliente pagina';
    document.body.appendChild(areaCliente);
    return areaCliente;
}

function enviarMensagem(evento) {
    evento.preventDefault();
    
    if (!app.state.clienteLogado) {
        mostrarErro('Você precisa estar logado para enviar mensagens');
        return;
    }
    
    const novaMensagem = document.getElementById('novaMensagem');
    if (!novaMensagem || !novaMensagem.value.trim()) {
        mostrarErro('Por favor, digite uma mensagem');
        return;
    }
    
    const codigo = app.state.clienteLogado.codigo;
    const projeto = app.state.clienteLogado.projeto;
    
    adicionarMensagem(
        codigo,
        `${projeto.cliente} (Cliente)`,
        novaMensagem.value.trim(),
        'cliente'
    );
    
    novaMensagem.value = '';
    mostrarSucesso('Mensagem enviada com sucesso!');
    
    // Recarregar área do cliente
    mostrarAreaCliente(projeto);
}

function voltarHome() {
    app.state.clienteLogado = null;
    const areaCliente = document.getElementById('areaCliente');
    if (areaCliente) {
        areaCliente.style.display = 'none';
    }
    mostrarPagina('home');
}

// ============================== SISTEMA DE NOTIFICAÇÕES ==============================
function mostrarNotificacao(tipo, mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.innerHTML = `
        <div class="notificacao-conteudo">
            <span class="notificacao-icone">${obterIconeNotificacao(tipo)}</span>
            <div class="notificacao-texto">${mensagem}</div>
            <button onclick="fecharNotificacao(this)" class="notificacao-fechar">×</button>
        </div>
    `;
    
    document.body.appendChild(notificacao);
    
    // Mostrar notificação
    setTimeout(() => notificacao.classList.add('mostrar'), 100);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notificacao.parentNode) {
            fecharNotificacao(notificacao.querySelector('.notificacao-fechar'));
        }
    }, 5000);
}

function obterIconeNotificacao(tipo) {
    const icones = {
        'sucesso': '✅',
        'erro': '❌',
        'info': 'ℹ️',
        'aviso': '⚠️'
    };
    return icones[tipo] || 'ℹ️';
}

function fecharNotificacao(botao) {
    const notificacao = botao.closest('.notificacao');
    notificacao.classList.remove('mostrar');
    setTimeout(() => {
        if (notificacao.parentNode) {
            notificacao.parentNode.removeChild(notificacao);
        }
    }, 300);
}

// Funções de conveniência para notificações
function mostrarSucesso(mensagem) {
    mostrarNotificacao('sucesso', mensagem);
}

function mostrarErro(mensagem) {
    mostrarNotificacao('erro', mensagem);
}

function mostrarInfo(mensagem) {
    mostrarNotificacao('info', mensagem);
}

function mostrarAviso(mensagem) {
    mostrarNotificacao('aviso', mensagem);
}

// ============================== SISTEMA DE TEMA ==============================
function alternarTema() {
    const novoTema = app.state.tema === 'escuro' ? 'claro' : 'escuro';
    app.state.tema = novoTema;
    
    document.body.classList.toggle('tema-claro', novoTema === 'claro');
    document.body.classList.toggle('tema-escuro', novoTema === 'escuro');
    
    const botaoTema = document.querySelector('.botao-tema');
    if (botaoTema) {
        botaoTema.textContent = novoTema === 'escuro' ? '☀️' : '🌙';
    }
    
    salvarDados();
}

// ============================== CONTADOR DE VISITAS ==============================
function incrementarVisitas() {
    app.state.visitas++;
    salvarDados();
    atualizarContadorVisitas();
}

function atualizarContadorVisitas() {
    const contador = document.getElementById('contadorVisitas');
    if (contador) {
        contador.textContent = app.state.visitas;
    }
}

// ============================== SCROLL SUAVE ==============================
function scrollSuave(elemento) {
    const destino = document.getElementById(elemento);
    if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================== VALIDAÇÃO DE FORMULÁRIOS ==============================
function validarFormulario(formulario) {
    const campos = formulario.querySelectorAll('input[required], textarea[required]');
    let valido = true;
    
    campos.forEach(campo => {
        if (!campo.value.trim()) {
            campo.classList.add('erro');
            valido = false;
        } else {
            campo.classList.remove('erro');
        }
    });
    
    return valido;
}

// ============================== ANIMAÇÕES E EFEITOS ==============================
function iniciarAnimacoes() {
    // Animação de fade-in para elementos
    const elementos = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    });
    
    elementos.forEach(elemento => {
        observer.observe(elemento);
    });
}

// ============================== BUSCA DE PROJETOS ==============================
function buscarProjetos(termo) {
    const projetos = Object.values(projetosDados);
    return projetos.filter(projeto => 
        projeto.nome.toLowerCase().includes(termo.toLowerCase()) ||
        projeto.cliente.toLowerCase().includes(termo.toLowerCase()) ||
        projeto.codigo.toLowerCase().includes(termo.toLowerCase())
    );
}

// ============================== EXPORTAR DADOS ==============================
function exportarDados() {
    const dados = {
        projetos: projetosDados,
        timelines: timelinesDados,
        mensagens: mensagensDados,
        estado: app.state,
        dataExportacao: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(dados, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `nelly-tech-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// ============================== IMPORTAR DADOS ==============================
function importarDados(evento) {
    const arquivo = evento.target.files[0];
    if (!arquivo) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const dados = JSON.parse(e.target.result);
            
            if (dados.projetos) Object.assign(projetosDados, dados.projetos);
            if (dados.timelines) Object.assign(timelinesDados, dados.timelines);
            if (dados.mensagens) Object.assign(mensagensDados, dados.mensagens);
            if (dados.estado) Object.assign(app.state, dados.estado);
            
            salvarDados();
            mostrarSucesso('Dados importados com sucesso!');
        } catch (error) {
            mostrarErro('Erro ao importar dados: ' + error.message);
        }
    };
    reader.readAsText(arquivo);
}

// ============================== UTILITÁRIOS ==============================
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

function formatarHora(data) {
    return new Date(data).toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function calcularDiasRestantes(prazo) {
    const hoje = new Date();
    const prazoData = new Date(prazo.split('/').reverse().join('-'));
    const diferenca = prazoData - hoje;
    return Math.ceil(diferenca / (1000 * 60 * 60 * 24));
}

function obterCorStatus(status) {
    const cores = {
        'planejamento': '#ffa500',
        'em-desenvolvimento': '#007bff',
        'em-teste': '#ff6b6b',
        'finalizado': '#28a745',
        'pausado': '#6c757d',
        'cancelado': '#dc3545'
    };
    return cores[status.toLowerCase().replace(' ', '-')] || '#6c757d';
}

// ============================== RELATÓRIOS ==============================
function gerarRelatorio() {
    const projetos = Object.values(projetosDados);
    const totalProjetos = projetos.length;
    const projetosFinalizados = projetos.filter(p => p.status === 'Finalizado').length;
    const projetosAndamento = projetos.filter(p => p.status.includes('Desenvolvimento')).length;
    const progressoMedio = projetos.reduce((acc, p) => acc + p.progresso, 0) / totalProjetos;
    
    const relatorio = {
        totalProjetos,
        projetosFinalizados,
        projetosAndamento,
        progressoMedio: Math.round(progressoMedio),
        taxaConclusao: Math.round((projetosFinalizados / totalProjetos) * 100),
        dataGeracao: new Date().toISOString()
    };
    
    return relatorio;
}

// ============================== INICIALIZAÇÃO ==============================
function inicializarSistema() {
    // Carregar dados salvos
    carregarDados();
    
    // Aplicar tema
    document.body.classList.add(`tema-${app.state.tema}`);
    
    // Iniciar animações
    iniciarAnimacoes();
    
    // Incrementar visitas
    incrementarVisitas();
    
    // Iniciar máquina de escrever
    iniciarMaquinaEscrever();
    
    // Configurar event listeners
    configurarEventListeners();
    
    console.log('Sistema Nelly-Tech inicializado com sucesso!');
}

function configurarEventListeners() {
    // Formulário principal
    const formPrincipal = document.getElementById('formPrincipal');
    if (formPrincipal) {
        formPrincipal.addEventListener('submit', manipularEnvio);
    }
    
    // Formulário de acesso
    const formAcesso = document.getElementById('formAcesso');
    if (formAcesso) {
        formAcesso.addEventListener('submit', manipularAcessoCliente);
    }
    
    // Upload de foto
    const inputFoto = document.getElementById('uploadFoto');
    if (inputFoto) {
        inputFoto.addEventListener('change', carregarFoto);
    }
    
    // Botão de tema
    const botaoTema = document.querySelector('.botao-tema');
    if (botaoTema) {
        botaoTema.addEventListener('click', alternarTema);
    }
}

// ============================== INICIALIZAÇÃO AUTOMÁTICA ==============================
document.addEventListener('DOMContentLoaded', inicializarSistema);

// ============================== EXPOSIÇÃO GLOBAL ==============================
window.NellyTech = {
    // Funcionalidades principais
    mostrarPagina,
    mostrarAreaCliente,
    mostrarAreaAdmin,
    
    // Manipulação de projetos
    buscarProjeto,
    criarProjetoDesdeHome,
    atualizarProgresso,
    
    // Sistema de mensagens
    adicionarMensagem,
    enviarMensagem,
    
    // Notificações
    mostrarSucesso,
    mostrarErro,
    mostrarInfo,
    mostrarAviso,
    
    // Utilitários
    alternarTema,
    scrollSuave,
    validarEmail,
    
    // Dados (somente leitura)
    get projetos() { return Object.freeze({...projetosDados}); },
    get state() { return Object.freeze({...app.state}); },
    
    // Relatórios
    gerarRelatorio,
    exportarDados
};

// ============================== FUNÇÕES PARA ATALHOS DE TECLADO ==============================
document.addEventListener('keydown', function(evento) {
    // Ctrl + Alt + A = Área Admin
    if (evento.ctrlKey && evento.altKey && evento.key === 'a') {
        evento.preventDefault();
        mostrarAreaAdmin();
    }
    
    // Ctrl + Alt + H = Home
    if (evento.ctrlKey && evento.altKey && evento.key === 'h') {
        evento.preventDefault();
        mostrarPagina('home');
    }
    
    // Ctrl + Alt + T = Alternar Tema
    if (evento.ctrlKey && evento.altKey && evento.key === 't') {
        evento.preventDefault();
        alternarTema();
    }
    
    // ESC = Fechar modais/voltar
    if (evento.key === 'Escape') {
        const areaCliente = document.getElementById('areaCliente');
        const areaAdmin = document.getElementById('areaAdmin');
        
        if (areaCliente && areaCliente.style.display === 'block') {
            voltarHome();
        } else if (areaAdmin && areaAdmin.style.display === 'block') {
            logoutAdmin();
        }
    }
});

// ============================== FIM DO SISTEMA ==============================
console.log('🚀 Sistema Nelly-Tech carregado com sucesso!');
console.log('📊 Projetos disponíveis:', Object.keys(projetosDados).length);
console.log('💬 Use Ctrl+Alt+A para acessar área admin');
console.log('🎨 Use Ctrl+Alt+T para alternar tema');
console.log('🏠 Use Ctrl+Alt+H para voltar ao início');