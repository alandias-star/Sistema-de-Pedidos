### 1. Programação Orientada a Objetos (POO)

- **`Produto`**: Representa os itens do cardápio (`id`, `nome`, `descricao`, `preco`, `categoria`, `imagem`).
- **`ItemCarrinho`**: Associa um `Produto` a uma quantidade e calcula subtotal.
- **`Carrinho`**: Agrupa os itens, calcula subtotal, soma a taxa de entrega e calcula o valor total.
- **`Pedido`**: Armazena o pedido finalizado (`cliente`, `itens`, `tipoEntrega`, `total`, `data`, `status`).
- **`Gerenciador`**: Controla o repositório de produtos/pedidos e executa as operações do CRUD.

### 2. Cobertura dos 4 CRUDs

- **Create**: Cadastrar novos produtos no cardápio e adicionar produtos ao carrinho.
- **Read**: Listar produtos no cardápio e visualizar os itens dentro do carrinho.
- **Update**: Editar dados de um produto existente (via formulário dedicado) e alterar a quantidade (+/-) de um item no carrinho.
- **Delete**: Excluir produtos do cardápio e remover itens do carrinho.

### 3. Carrossel de Pratos

- Carrossel interativo na página inicial (`index.html`) com navegação por botões (setas).
- Exibe imagem, nome e preço de cada prato cadastrado.

### 4. Regras do Carrinho e Taxa de Entrega

- Atualização automática dos valores ao alterar itens ou quantidade.
- Aplicação dinâmica de taxa de **R$ 2,50** ao selecionar a opção **Delivery**.
- Isenção de taxa para opções de **Retirada / Consumo Local**.

### 5. Padrões de IHC (Interação Humano-Computador)

- **Feedback ao usuário**: Mensagens informativas (`alert`) ao adicionar itens, editar ou finalizar pedidos.
- **Prevenção de erros**: Confirmação visual (`confirm`) para remoções de itens e limpeza do carrinho.
- **Consistência e Affordance**: Estilização padronizada para botões, campos de entrada, ações destrutivas (botões vermelhos) e navegação limpa entre telas (`index.html` e `cadastro.html`).
- **Visibilidade do estado**: Exibição clara do subtotal, taxa aplicada e total calculado em tempo real.

### 6. Bônus — Persistência de Dados

- Implementação do **`localStorage`** na classe `Gerenciador` para garantir a manutenção dos produtos cadastrados e pedidos finalizados mesmo após recarregar a página.
