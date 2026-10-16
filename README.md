# Portfolio — Game Developer

Site de portfólio estático e bilíngue (português brasileiro / inglês), sem dependências nem etapa de build.

## Rodando localmente

Abra o `index.html` no navegador ou, para um servidor local:

```bash
npx serve .
# ou
python -m http.server 8000
```

## Estrutura

```
index.html        Estrutura da página
css/style.css     Estilos
js/data.js        Seu conteúdo: perfil, habilidades, projetos, experiência, redes
js/i18n.js        Textos fixos da interface em PT-BR e EN + lógica de troca de idioma
js/main.js        Renderização e interações
assets/           Favicon e imagens dos projetos
```

## Personalizando

- **Dados pessoais e projetos**: edite `js/data.js`. Campos traduzíveis usam o formato
  `{ "pt-BR": "...", en: "..." }`; campos iguais nos dois idiomas podem ser uma string simples.
- **Imagens de projetos**: coloque em `assets/` e preencha `image: "assets/meu-jogo.png"`.
  Sem imagem, o card mostra as iniciais do projeto.
- **Currículo**: os PDFs ficam em `assets/cv/`. O botão "Baixar CV" entrega a versão do idioma
  atual do site. Ao atualizar o currículo, substitua os arquivos mantendo os mesmos nomes.
- **Textos da interface** (hero, sobre, contato...): edite `js/i18n.js`.
- **Cores**: variáveis no topo de `css/style.css` (`--accent`, `--accent-2`, ...).

## Idiomas

O idioma inicial segue o navegador do visitante (português → PT-BR, qualquer outro → EN).
O botão **PT | EN** no menu troca o idioma na hora, e a escolha fica salva no navegador.

Para adicionar outro idioma, crie uma nova chave em `TRANSLATIONS` (`js/i18n.js`), adicione a
tradução nos campos de `js/data.js` e um botão `data-lang` no `index.html`.

## Publicando

Por ser estático, funciona direto no GitHub Pages, Netlify, Vercel ou Cloudflare Pages —
basta publicar a pasta raiz.

## Interface de IDE

O site usa uma janela fixa com quatro abas: Sobre (inicial), Habilidades, Projetos e Contato.
Somente o documento central rola; o menu e o seletor PT/EN ficam acessiveis.
A secao Experiencia foi removida da interface.

Ao navegar, o conteudo anterior e apagado e o proximo e digitado. Textos com pelo menos 160 caracteres recebem sugestao em cinza, aceita por um mouse simulado (efeito visual local).
Cliques consecutivos cancelam a transicao anterior. Trocar idioma reinicia a animacao da aba atual com o conteudo traduzido.
A preferencia de movimento reduzido do sistema desativa a animacao.
Use as setas esquerda/direita ou Home/End quando uma aba estiver focada para navegar pelo teclado.

A montagem digita a marcacao HTML de cada elemento antes de revelar seu visual final, incluindo icones e imagens.
O codigo simulado usa velocidade alta: 8 caracteres a cada 16 ms. As pausas do autocomplete e do mouse permanecem independentes.
A marcacao permanece visivel ate o elemento correspondente estar completo. O autocomplete tem pausas independentes para leitura, movimento do ponteiro e clique.

Cada componente mostra seu codigo completo no proprio lugar e e substituido pelo visual final assim que esse trecho termina. Nao ha painel separado de codigo.
Os tres paragrafos de Sobre mim formam uma unica sugestao, iniciada apos Desenvolvedor (ou Developer), com uma unica aceitacao.

O comentario de documento usa // e permanece como texto. O indicador de disponibilidade foi removido.

A IDE ficticia usa arquivos .cs. Cada trecho simulado e um objeto anonimo C# com strings brutas Html e Css (sintaxe de C# 11+); o CSS representa o estilo calculado do componente. Esses trechos sao apenas visuais. O site continua estatico em HTML, CSS e JavaScript.

A frase de apresentacao (Desenvolvo sistemas de gameplay... / I build gameplay systems...) tambem recebe autocomplete, apos a primeira mencao a gameplay systems.

O mouse do autocomplete parte aleatoriamente de um dos quatro cantos da tela e vai diretamente ao botao de aceitar, sem parada intermediaria.

A primeira abertura inicia a montagem de Sobre do zero, sem exibir o documento completo antes.
O idioma usa primeiro a escolha manual salva; sem ela, usa o idioma preferido do navegador (pt-* para PT-BR, demais para EN). Nao usa localizacao por IP ou permissao de GPS.

Widgets prontos usam uma API C# ficticia na animacao: Import.Curriculum("pt-BR"); para o CV e Stats.Add("3+", "Anos em estudios de jogos"); para os indicadores. Ao terminar a chamada curta, o componente aparece.

Em Habilidades, cada caixa com icone e titulo e montada por HTML/CSS simulado, com uma lista vazia para receber itens. Cada skill e adicionada com Import.Skill("Unity");, preservando os textos de cada idioma.

Cada secao anima somente uma vez por idioma durante a visita na mesma aba (sessionStorage, incluindo recargas). Animacoes interrompidas nao contam como concluidas. Uma nova sessao da aba permite animar novamente.

## GitHub no Contato

O calendario usa profile.github em js/data.js (filipecamargo92). Consulta a API publica gh-calendar.rschristian.dev/user/{username} ao abrir Contato e a cada 5 minutos enquanto a secao estiver visivel. Inclui botao de atualizar, traducao PT/EN e preservacao do ultimo grafico em caso de falha. Nao requer token no navegador.

O calendario depende da atualizacao do provedor, e o GitHub pode levar ate 24 horas para contar uma contribuicao. O calendario reflete as contribuicoes disponibilizadas pelo perfil publico, nao um monitoramento instantaneo de cada commit. Requer internet; use servidor HTTP local para validar a integracao.

A integracao normaliza as semanas e intensidades retornadas pela API e confere a soma dos dias contra o total informado. Respostas inconsistentes mostram erro e preservam o ultimo calendario valido.

## Cards de projetos

Cada card aparece por uma simulacao de clique direito e selecao de Add Project, respeitando o historico de animacoes por visita/idioma. Exibe nome, cargo, tipo, estudio/equipe, estado, tecnologias e links, com destaque no Kundara. Campos sem informacao usam PROVISORIO.

As thumbnails usam a referencia de 460 x 215 px do Kundara, a menor imagem original. As demais sao enquadradas com object-fit: cover, mantendo os arquivos originais. A largura diminui proporcionalmente em telas pequenas.
