class Produto {
  constructor(id, nome, descricao, preco, categoria, imagem) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = parseFloat(preco);
    this.categoria = categoria;
    this.imagem = imagem;
  }
}

class ItemCarrinho {
  constructor(produto, quantidade = 1) {
    this.produto = produto;
    this.quantidade = quantidade;
  }
  getSubtotal() {
    return this.produto.preco * this.quantidade;
  }
}

class Carrinho {
  constructor() {
    this.itens = [];
    this.taxaEntrega = 0;
  }
  adicionarItem(produto) {
    const item = this.itens.find((i) => i.produto.id === produto.id);
    if (item) item.quantidade++;
    else this.itens.push(new ItemCarrinho(produto));
  }
  alterarQuantidade(produtoId, qtd) {
    const item = this.itens.find((i) => i.produto.id === produtoId);
    if (item) {
      item.quantidade += qtd;
      if (item.quantidade <= 0) this.removerItem(produtoId);
    }
  }
  removerItem(produtoId) {
    this.itens = this.itens.filter((i) => i.produto.id !== produtoId);
  }
  limpar() {
    this.itens = [];
  }
  getSubtotal() {
    return this.itens.reduce((acc, i) => acc + i.getSubtotal(), 0);
  }
  getTotal() {
    return this.getSubtotal() + this.taxaEntrega;
  }
}

class Pedido {
  constructor(cliente, itens, tipoEntrega, total) {
    this.id = Date.now();
    this.cliente = cliente;
    this.itens = itens;
    this.tipoEntrega = tipoEntrega;
    this.total = total;
    this.data = new Date().toLocaleString();
    this.status = "Pendente";
  }
}

class Gerenciador {
  constructor() {
    this.produtos = JSON.parse(localStorage.getItem("produtos")) || [
      new Produto(
        1,
        "Hambúrguer",
        "Artesanal com queijo",
        25.0,
        "Lanches",
        "/images/hamburger.jpg",
      ),
      new Produto(
        2,
        "Pizza",
        "Mussarela crocante",
        40.0,
        "Pizzas",
        "/images/pizza.jpg",
      ),
      new Produto(
        3,
        "Esfirra",
        "Carne temperada",
        3.0,
        "Salgados",
        "/images/esfirra.jpg",
      ),
    ];
    this.pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    this.carrinho = new Carrinho();
  }
  salvarProduto(prod) {
    const index = this.produtos.findIndex((p) => p.id === prod.id);
    if (index >= 0) this.produtos[index] = prod;
    else this.produtos.push(prod);
    this.persistir();
  }
  deletarProduto(id) {
    if (confirm("Deseja realmente excluir este produto?")) {
      this.produtos = this.produtos.filter((p) => p.id !== id);
      this.carrinho.removerItem(id);
      this.persistir();
    }
  }
  salvarPedido(pedido) {
    this.pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
  }
  persistir() {
    localStorage.setItem("produtos", JSON.stringify(this.produtos));
  }
}

const app = new Gerenciador();
let carrosselIndex = 0;

function renderCarrossel() {
  const container = document.getElementById("carouselContent");
  if (!container) return;

  if (app.produtos.length === 0) {
    container.innerHTML = "<p>Nenhum prato disponível.</p>";
    return;
  }
  if (carrosselIndex >= app.produtos.length) carrosselIndex = 0;
  if (carrosselIndex < 0) carrosselIndex = app.produtos.length - 1;

  const p = app.produtos[carrosselIndex];
  container.innerHTML = `
    <img src="${p.imagem}" alt="${p.nome}">
    <h3>${p.nome}</h3>
    <p>R$ ${p.preco.toFixed(2)}</p>
    <button onclick="adicionarAoCarrinho(${p.id})">Adicionar ao Carrinho</button>
  `;
}

function renderProdutos() {
  const container = document.getElementById("listaProdutos");
  if (!container) return;

  container.innerHTML = app.produtos
    .map(
      (p) => `
    <div class="prod-item">
      <img src="${p.imagem}" alt="${p.nome}">
      <h4>${p.nome}</h4>
      <p>${p.descricao}</p>
      <p><strong>R$ ${p.preco.toFixed(2)}</strong></p>
      <button onclick="adicionarAoCarrinho(${p.id})">Adicionar</button>
      <button onclick="editarProduto(${p.id})">Editar</button>
      <button class="danger" onclick="deletarProduto(${p.id})">Deletar</button>
    </div>
  `,
    )
    .join("");
}

function renderCarrinho() {
  const container = document.getElementById("itensCarrinho");
  if (!container) return;

  container.innerHTML =
    app.carrinho.itens
      .map(
        (i) => `
    <div class="cart-item">
      <div>
        <strong>${i.produto.nome}</strong> - R$ ${i.produto.preco.toFixed(2)} x ${i.quantidade}
      </div>
      <div>
        <button onclick="alterarQtd(${i.produto.id}, 1)">+</button>
        <button onclick="alterarQtd(${i.produto.id}, -1)">-</button>
        <button class="danger" onclick="removerDoCarrinho(${i.produto.id})">X</button>
      </div>
    </div>
  `,
      )
      .join("") || "<p>Carrinho vazio</p>";

  const subtotalEl = document.getElementById("subtotal");
  const taxaEl = document.getElementById("taxa");
  const totalEl = document.getElementById("total");

  if (subtotalEl) subtotalEl.innerText = app.carrinho.getSubtotal().toFixed(2);
  if (taxaEl) taxaEl.innerText = app.carrinho.taxaEntrega.toFixed(2);
  if (totalEl) totalEl.innerText = app.carrinho.getTotal().toFixed(2);
}

function adicionarAoCarrinho(id) {
  const prod = app.produtos.find((p) => p.id === id);
  if (prod) {
    app.carrinho.adicionarItem(prod);
    renderCarrinho();
    alert(`"${prod.nome}" foi adicionado ao carrinho!`);
  }
}

function alterarQtd(id, delta) {
  app.carrinho.alterarQuantidade(id, delta);
  renderCarrinho();
}

function removerDoCarrinho(id) {
  if (confirm("Remover este item do carrinho?")) {
    app.carrinho.removerItem(id);
    renderCarrinho();
  }
}

function editarProduto(id) {
  window.location.href = `cadastro.html?edit=${id}`;
}

function verificarModoEdicao() {
  const formProd = document.getElementById("formProduto");
  if (!formProd) return;

  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get("edit");

  if (editId) {
    const p = app.produtos.find((prod) => prod.id === Number(editId));
    if (p) {
      document.getElementById("prodId").value = p.id;
      document.getElementById("prodNome").value = p.nome;
      document.getElementById("prodDesc").value = p.descricao;
      document.getElementById("prodPreco").value = p.preco;
      document.getElementById("prodCat").value = p.categoria;
      document.getElementById("prodImg").value = p.imagem;

      const btnCancelar = document.getElementById("btnCancelarEdit");
      if (btnCancelar) btnCancelar.style.display = "inline";
    }
  }
}

function deletarProduto(id) {
  app.deletarProduto(id);
  renderProdutos();
  renderCarrossel();
  renderCarrinho();
}

const formProduto = document.getElementById("formProduto");
if (formProduto) {
  formProduto.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("prodId").value || Date.now();
    const prod = new Produto(
      Number(id),
      document.getElementById("prodNome").value,
      document.getElementById("prodDesc").value,
      document.getElementById("prodPreco").value,
      document.getElementById("prodCat").value,
      document.getElementById("prodImg").value,
    );
    app.salvarProduto(prod);
    alert("Produto salvo com sucesso!");
    window.location.href = "index.html";
  });
}

const btnCancelarEdit = document.getElementById("btnCancelarEdit");
if (btnCancelarEdit) {
  btnCancelarEdit.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

const tipoEntrega = document.getElementById("tipoEntrega");
if (tipoEntrega) {
  tipoEntrega.addEventListener("change", (e) => {
    app.carrinho.taxaEntrega = e.target.value === "delivery" ? 2.5 : 0.0;
    renderCarrinho();
  });
}

const btnLimparCarrinho = document.getElementById("btnLimparCarrinho");
if (btnLimparCarrinho) {
  btnLimparCarrinho.addEventListener("click", () => {
    if (app.carrinho.itens.length === 0) return;
    if (confirm("Deseja limpar todo o carrinho?")) {
      app.carrinho.limpar();
      renderCarrinho();
    }
  });
}

const formPedido = document.getElementById("formPedido");
if (formPedido) {
  formPedido.addEventListener("submit", (e) => {
    e.preventDefault();
    if (app.carrinho.itens.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    const cliente = document.getElementById("nomeCliente").value;
    const tipo = document.getElementById("tipoEntrega").value;
    const pedido = new Pedido(
      cliente,
      app.carrinho.itens,
      tipo,
      app.carrinho.getTotal(),
    );

    app.salvarPedido(pedido);
    app.carrinho.limpar();
    e.target.reset();
    renderCarrinho();
    alert(`Pedido #${pedido.id} finalizado com sucesso para ${cliente}!`);
  });
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
if (prevBtn && nextBtn) {
  prevBtn.onclick = () => {
    carrosselIndex--;
    renderCarrossel();
  };
  nextBtn.onclick = () => {
    carrosselIndex++;
    renderCarrossel();
  };
}

renderProdutos();
renderCarrossel();
renderCarrinho();
verificarModoEdicao();
