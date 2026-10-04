### 1. Programação Orientada a Objetos (POO)

- **`Produto`**: Representa a entidade do item do cardápio (`id`, `nome`, `descricao`, `preco`, `categoria`, `imagem`).
- **`ItemCarrinho`**: Associa um `Produto` a uma quantidade e calcula o subtotal individual.
- **`Carrinho`**: Agrupa os itens, calcula o subtotal, aplica a taxa de entrega e calcula o valor total.
- **`Pedido`**: Encapsula os dados do pedido finalizado (`cliente`, `itens`, `tipoEntrega`, `total`, `data`, `status`).
- **`Gerenciador`**: Atua como repositório central, controlando as operações de CRUD do cardápio e o armazenamento de pedidos.

---

### 2. Operações CRUD Completas

- **Create**: Cadastrar novos produtos via formulário (`cadastro.html`) e adicionar produtos ao carrinho.
- **Read**: Listar produtos do cardápio e visualizar os itens dentro do carrinho em tempo real.
- **Update**: Editar dados de um produto existente (redirecionando ao formulário) e alterar as quantidades (+/-) no carrinho.
- **Delete**: Excluir produtos do cardápio e remover/limpar itens do carrinho.

---

### 3. Carrossel de Pratos

- Slider de destaques interativo na página inicial (`index.html`) com navegação por botões (setas).
- Exibe imagem, nome, preço e permite a adição direta do prato ao carrinho.

---

### 4. Regras do Carrinho e Taxa de Entrega

- Atualização automática dos valores do carrinho a cada alteração de itens ou quantidade.
- Aplicação dinâmica da taxa de **R$ 2,50** na escolha da opção **Delivery** e isenção na opção **Retirada / Consumo Local**.
- Finalização de pedido com geração do comprovante/objeto `Pedido` com os dados do cliente.

---

### 5. Padrões de IHC (Interação Humano-Computador) e Arquitetura Visual

- **Header e Navbar Moderno**: Barra fixa com identidade de marca (`RestauranteHPE`) e botão de ação para alternar entre a loja e o gerenciador.
- **Sistema de Design (Paleta de Cores)**: Uso de variáveis CSS (`:root`) para padronizar cores, contrastes e sombras.
- **Feedback Visual**: Mensagens informativas (`alert`) para adição, alteração e confirmação de pedidos.
- **Prevenção de Erros**: Confirmações explícitas (`confirm`) antes de excluir produtos ou limpar o carrinho.
- **Affordance e Visibilidade**: Botões bem delimitados com efeitos de _hover_, identificadores visuais de ações destrutivas (botões vermelhos) e atualização do subtotal/total em tempo real.
- **Responsividade**: Layout adaptável para dispositivos móveis via CSS Grid dinâmico e Media Queries.

---

### 6. Bônus — Persistência de Dados

- Implementação de **`localStorage`** na classe `Gerenciador` para garantir a manutenção dos produtos cadastrados e pedidos finalizados mesmo após recarregar ou fechar a página.
