document.addEventListener('DOMContentLoaded', () => {
const carrinhoContainer = document.querySelector('.item-carrinho-container');
const cardBotoes = document.querySelectorAll('.carrinho-link');

class Produto {
    constructor(nome, preco, imagem) {
    this.nome = nome;
    this.preco = preco;
    this.imagem = imagem;
    }
}


function salvarProdutoNoLocalStorage(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}


function removerProdutoDoLocalStorage(nomeProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(prod => prod.nome !== nomeProduto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    
}


function criarItemCarrinho(produto) {
    const item = document.createElement('div');
    item.classList.add('item-carrinho');

    item.innerHTML = `
    <div class="item-carrinho-imagem-info">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="item-carrinho-info">   
            <h3>${produto.nome}</h3>
            <p>Price: $ ${parseFloat(produto.preco.replace('R$', '').replace('$', '').replace(',', '.')).toFixed(2)
            }</p>
        </div>
    </div>
    <button class="remover-item">Remover</button>
    `;

    carrinhoContainer.appendChild(item);

    const removerButton = item.querySelector('.remover-item');
    removerButton.addEventListener('click', () => {
    carrinhoContainer.removeChild(item);
    removerProdutoDoLocalStorage(produto.nome);
    const carrinhoAtualizado = JSON.parse(localStorage.getItem('carrinho')) || [];
    atualizarTotal(carrinhoAtualizado);
    });
}


if (cardBotoes.length > 0) {
    cardBotoes.forEach(botao => {
    botao.addEventListener('click', (event) => {
        event.preventDefault();

        const card = botao.closest('.card');
        const nome = card.querySelector('.produto-texto').textContent;
        const preco = card.querySelector('.preco').textContent;
        const imagem = card.querySelector('.produto-img').src;


        const produto = new Produto(nome, preco, imagem);
        salvarProdutoNoLocalStorage(produto);

    
    });
    });
}


if (carrinhoContainer) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinhoContainer.innerHTML = '';
    carrinho.forEach(produto => {
    criarItemCarrinho(produto);
    });
}

function calcularTotal(carrinho) {
    return carrinho.reduce((total, produto) => {
        const preco = parseFloat(produto.preco.replace('R$', '').replace('$', '').replace(',', '.'));
        return total + preco;
    }, 0);
}

function atualizarTotal(carrinho) {
    const totalSpan = document.getElementById('valor-total');
    const total = calcularTotal(carrinho);
    totalSpan.textContent = total.toFixed(2);
}

if (carrinhoContainer) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinhoContainer.innerHTML = '';
    carrinho.forEach(produto => {
        criarItemCarrinho(produto);
    });
    atualizarTotal(carrinho);
}



});
