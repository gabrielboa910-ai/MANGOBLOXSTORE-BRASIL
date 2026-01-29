// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initFilters();
    initProductsGrid();
    initCartSystem();
    initModal();
    initHeaderScroll();
    initAnimations();
    initInteractiveElements();
    
    loadSavedTheme();
    loadCartFromStorage();
    
    console.log('Mango Store - Blox Fruits carregado!');
});

// ===== TEMA =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '🌞';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
        
        // Animação no toggle
        themeToggle.classList.add('shake');
        setTimeout(() => {
            themeToggle.classList.remove('shake');
        }, 500);
    });
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) themeIcon.textContent = '🌞';
    } else {
        document.body.classList.remove('dark-mode');
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) themeIcon.textContent = '🌙';
    }
}

// ===== HEADER SCROLL =====
function initHeaderScroll() {
    let lastScroll = 0;
    const header = document.querySelector('.blox-header');
    const filters = document.querySelector('.blox-filters');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Efeito de blur no header ao rolar
        if (currentScroll > 100) {
            if (document.body.classList.contains('dark-mode')) {
                header.style.backgroundColor = 'rgba(34, 34, 34, 0.95)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
            header.style.backdropFilter = 'blur(10px)';
            
            if (filters) {
                filters.style.top = '80px';
            }
        } else {
            header.style.backgroundColor = 'var(--header-bg)';
            header.style.backdropFilter = 'blur(5px)';
            
            if (filters) {
                filters.style.top = 'auto';
            }
        }
        
        // Efeito de desaparecer/aparecer
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
            if (filters) filters.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            if (filters) filters.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== ANIMAÇÕES =====
function initAnimations() {
    // Animação ao carregar produtos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animação no logo
    const logo = document.getElementById('mainLogo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.classList.add('shake');
            setTimeout(() => {
                this.classList.remove('shake');
            }, 500);
        });
        
        // Redireciona para home ao clicar no logo
        logo.addEventListener('click', function() {
            window.location.href = '/frontend/html/pagina_principal.html';
        });
    }
    
    // Animação no botão home
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.addEventListener('mouseenter', function() {
            this.classList.add('shake');
            setTimeout(() => {
                this.classList.remove('shake');
            }, 500);
        });
    }
}

// ===== INTERATIVIDADE =====
function initInteractiveElements() {
    // Efeito de hover em todos os botões
    const buttons = document.querySelectorAll('button, .back-home-btn, .footer-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efeito de hover nos cards de produto
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const title = this.querySelector('.product-title');
            if (title) {
                title.style.color = 'var(--primary-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const title = this.querySelector('.product-title');
            if (title) {
                title.style.color = 'var(--text-dark)';
            }
        });
    });
    
    // Efeito de tremulação no carrinho
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('mouseenter', function() {
            this.classList.add('shake');
            setTimeout(() => {
                this.classList.remove('shake');
            }, 500);
        });
    }
}

// ===== FILTROS =====
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterProducts(filter);
        });
    });
}

function filterProducts(filter) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.9)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===== PRODUTOS =====
const products = [
    {
        id: 1,
        name: "Fruta Kitsune",
        category: "fruit",
        rarity: "mythical",
        image: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&w=500&q=80",
        description: "Fruta mitica com poderes de raposa celestial. Uma das frutas mais raras do jogo.",
        oldPrice: 299.99,
        price: 279.99,
        discount: 7,
        specs: [
            "Tipo: Mitica",
            "Entrega: Automática",
            "Tempo: 5-10 minutos",
            "Garantia: 30 dias"
        ]
    },
    {
        id: 2,
        name: "Conta Level 2800 + Leopard",
        category: "account",
        rarity: "mythical",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=500&q=80",
        description: "Conta level máximo com fruta Leopard no inventário. Pronta para uso.",
        oldPrice: 189.99,
        price: 169.99,
        discount: 11,
        specs: [
            "Level: 2800",
            "Frutas: Leopard + 3 raras",
            "Beli: 10M+",
            "Fragments: 5000+"
        ]
    },
    {
        id: 3,
        name: "Fruta Dragon",
        category: "fruit",
        rarity: "mythical",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=500&q=80",
        description: "Fruta mitica que transforma o usuário em um dragão poderoso.",
        oldPrice: 269.99,
        price: 249.99,
        discount: 8,
        specs: [
            "Tipo: Mitica",
            "Poder: Fogo + Voo",
            "Raridade: 0.5%",
            "Valor: 5M Beli"
        ]
    },
    {
        id: 4,
        name: "Conta Level 2500 + Buddha",
        category: "account",
        rarity: "rare",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=80",
        description: "Conta level 2500 com fruta Buddha, perfeita para farming.",
        oldPrice: 129.99,
        price: 119.99,
        discount: 8,
        specs: [
            "Level: 2500",
            "Frutas: Buddha + 2 rares",
            "Beli: 5M",
            "Fragments: 3000"
        ]
    },
    {
        id: 5,
        name: "Fruta Venom",
        category: "fruit",
        rarity: "legendary",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80",
        description: "Fruta lendária com poderes de veneno e ácido extremamente tóxico.",
        oldPrice: 179.99,
        price: 159.99,
        discount: 12,
        specs: [
            "Tipo: Lendária",
            "Dano: Veneno + Ácido",
            "Raridade: 2%",
            "Valor: 3M Beli"
        ]
    },
    {
        id: 6,
        name: "Pacote Iniciante",
        category: "bundle",
        rarity: "rare",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=80",
        description: "Pacote perfeito para iniciantes com frutas raras e itens essenciais.",
        oldPrice: 89.99,
        price: 79.99,
        discount: 12,
        specs: [
            "Contém: 3 frutas rares",
            "Itens: Sword + Gun",
            "Beli: 2M",
            "Level boost: 500"
        ]
    },
    {
        id: 7,
        name: "Fruta Shadow",
        category: "fruit",
        rarity: "legendary",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=500&q=80",
        description: "Fruta lendária que permite manipular sombras e teletransporte.",
        oldPrice: 169.99,
        price: 149.99,
        discount: 13,
        specs: [
            "Tipo: Lendária",
            "Habilidade: Sombras",
            "Raridade: 1.5%",
            "Valor: 2.5M Beli"
        ]
    },
    {
        id: 8,
        name: "Conta Level 2700 + Dough",
        category: "account",
        rarity: "legendary",
        image: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&w=500&q=80",
        description: "Conta level 2700 com fruta Dough, excelente para PvP.",
        oldPrice: 159.99,
        price: 139.99,
        discount: 14,
        specs: [
            "Level: 2700",
            "Frutas: Dough + Control",
            "Beli: 8M",
            "Fragments: 4500"
        ]
    },
    {
        id: 9,
        name: "Fruta Control",
        category: "fruit",
        rarity: "mythical",
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=500&q=80",
        description: "Fruta mitica que permite controlar a gravidade e objetos ao redor.",
        oldPrice: 289.99,
        price: 269.99,
        discount: 7,
        specs: [
            "Tipo: Mitica",
            "Poder: Controle gravitacional",
            "Raridade: 0.3%",
            "Valor: 6M Beli"
        ]
    },
    {
        id: 10,
        name: "Pacote Avançado",
        category: "bundle",
        rarity: "legendary",
        image: "https://images.unsplash.com/photo-1550259979-0212b3a5d6db?auto=format&fit=crop&w=500&q=80",
        description: "Pacote completo com frutas lendárias e itens épicos.",
        oldPrice: 249.99,
        price: 219.99,
        discount: 13,
        specs: [
            "Contém: 2 lendárias + 3 rares",
            "Itens: Raros + Épicos",
            "Beli: 5M",
            "Level boost: 1000"
        ]
    },
    {
        id: 11,
        name: "Fruta Rumble",
        category: "fruit",
        rarity: "rare",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=500&q=80",
        description: "Fruta rara com poderes elétricos e controle sobre relâmpagos.",
        oldPrice: 119.99,
        price: 109.99,
        discount: 9,
        specs: [
            "Tipo: Rara",
            "Elemento: Elétrico",
            "Raridade: 5%",
            "Valor: 1.5M Beli"
        ]
    },
    {
        id: 12,
        name: "Conta Level 2600 + Phoenix",
        category: "account",
        rarity: "legendary",
        image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=500&q=80",
        description: "Conta level 2600 com fruta Phoenix, regeneração automática.",
        oldPrice: 139.99,
        price: 124.99,
        discount: 12,
        specs: [
            "Level: 2600",
            "Frutas: Phoenix + Buddha",
            "Beli: 6M",
            "Fragments: 3500"
        ]
    },
    {
        id: 13,
        name: "Fruta Ice",
        category: "fruit",
        rarity: "rare",
        image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=500&q=80",
        description: "Fruta rara que permite congelar inimigos e criar estruturas de gelo.",
        oldPrice: 99.99,
        price: 89.99,
        discount: 11,
        specs: [
            "Tipo: Rara",
            "Elemento: Gelo",
            "Raridade: 6%",
            "Valor: 1.2M Beli"
        ]
    },
    {
        id: 14,
        name: "Pacote Mitico",
        category: "bundle",
        rarity: "mythical",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=80",
        description: "Pacote premium com frutas miticas e contas de alto nível.",
        oldPrice: 399.99,
        price: 349.99,
        discount: 14,
        specs: [
            "Contém: 1 mitica + 2 lendárias",
            "Conta: Level 2800+",
            "Beli: 15M",
            "Itens: Todos raros"
        ]
    },
    {
        id: 15,
        name: "Fruta Flame",
        category: "fruit",
        rarity: "rare",
        image: "https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?auto=format&fit=crop&w=500&q=80",
        description: "Fruta rara com poderes básicos de fogo e calor intenso.",
        oldPrice: 79.99,
        price: 69.99,
        discount: 14,
        specs: [
            "Tipo: Rara",
            "Elemento: Fogo",
            "Raridade: 8%",
            "Valor: 1M Beli"
        ]
    }
];

function initProductsGrid() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    
    // Determinar classe da badge baseada na raridade
    let badgeClass = '';
    switch(product.rarity) {
        case 'mythical': badgeClass = 'mythical'; break;
        case 'legendary': badgeClass = 'legendary'; break;
        case 'rare': badgeClass = 'rare'; break;
        default: badgeClass = 'fruit';
    }
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-badges">
                <span class="badge ${product.category}">${product.category === 'fruit' ? 'Fruta' : 
                    product.category === 'account' ? 'Conta' : 
                    product.category === 'bundle' ? 'Pacote' : 'Produto'}</span>
                <span class="badge ${badgeClass}">${product.rarity === 'mythical' ? 'Mitica' : 
                    product.rarity === 'legendary' ? 'Lendária' : 'Rara'}</span>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category === 'fruit' ? 'FRUTA' : 
                product.category === 'account' ? 'CONTA' : 'PACOTE'}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                <span class="old-price">De R$ ${product.oldPrice.toFixed(2)}</span>
                <span class="current-price">R$ ${product.price.toFixed(2)}</span>
                <span class="discount-badge">-${product.discount}%</span>
            </div>
            <div class="product-actions">
                <button class="btn-details" data-id="${product.id}">
                    <i class="fas fa-info-circle"></i> Detalhes
                </button>
                <button class="btn-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// ===== MODAL =====
let currentProduct = null;
let currentQuantity = 1;

function initModal() {
    // Evento para abrir modal
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-details')) {
            const button = e.target.closest('.btn-details');
            const productId = parseInt(button.dataset.id);
            openProductModal(productId);
        }
        
        // Fechar modal
        if (e.target.id === 'modalClose' || e.target.closest('.modal-overlay')) {
            closeProductModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });
    
    // Controle de quantidade
    document.getElementById('qtyMinus')?.addEventListener('click', function() {
        if (currentQuantity > 1) {
            currentQuantity--;
            updateQuantityDisplay();
            this.classList.add('shake');
            setTimeout(() => this.classList.remove('shake'), 300);
        }
    });
    
    document.getElementById('qtyPlus')?.addEventListener('click', function() {
        currentQuantity++;
        updateQuantityDisplay();
        this.classList.add('shake');
        setTimeout(() => this.classList.remove('shake'), 300);
    });
    
    // Adicionar ao carrinho do modal
    document.getElementById('modalAddToCart')?.addEventListener('click', function() {
        if (currentProduct) {
            addToCart(currentProduct.id, currentProduct.name, currentProduct.price, currentQuantity);
            showNotification(`${currentProduct.name} (${currentQuantity}x) adicionado ao carrinho!`, 'success');
            
            // Animação no botão
            this.classList.add('shake');
            setTimeout(() => {
                this.classList.remove('shake');
            }, 500);
            
            setTimeout(() => {
                closeProductModal();
                currentQuantity = 1;
                updateQuantityDisplay();
            }, 1000);
        }
    });
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    const modal = document.getElementById('productModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Preencher informações do modal
    document.getElementById('modalProductTitle').textContent = product.name;
    document.getElementById('modalProductCategory').textContent = 
        product.category === 'fruit' ? 'FRUTA' : 
        product.category === 'account' ? 'CONTA' : 'PACOTE';
    document.getElementById('modalProductDescription').textContent = product.description;
    
    // Imagem do produto
    const imageContainer = document.getElementById('modalProductImage');
    imageContainer.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
    
    // Especificações
    const specsList = document.getElementById('modalProductSpecs');
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check"></i> ${spec}`;
        specsList.appendChild(li);
    });
    
    // Preços
    document.getElementById('modalOldPrice').textContent = `De R$ ${product.oldPrice.toFixed(2)}`;
    document.getElementById('modalCurrentPrice').textContent = `R$ ${product.price.toFixed(2)}`;
    document.getElementById('modalDiscount').textContent = `-${product.discount}%`;
    
    // Atualizar quantidade
    updateQuantityDisplay();
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProduct = null;
}

function updateQuantityDisplay() {
    const qtyValue = document.getElementById('qtyValue');
    if (qtyValue) {
        qtyValue.textContent = currentQuantity;
        qtyValue.classList.add('shake');
        setTimeout(() => qtyValue.classList.remove('shake'), 300);
    }
}

// ===== CARRINHO =====
let cart = [];

function initCartSystem() {
    // Adicionar ao carrinho dos cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-cart')) {
            const button = e.target.closest('.btn-cart');
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            
            addToCart(id, name, price, 1);
            showNotification(`${name} adicionado ao carrinho!`, 'success');
            
            // Animação no botão
            button.classList.add('shake');
            setTimeout(() => {
                button.classList.remove('shake');
            }, 500);
        }
    });
    
    // Abrir carrinho (redireciona para página principal)
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            // Salvar carrinho no localStorage
            saveCartToStorage();
            
            // Animação
            this.classList.add('shake');
            setTimeout(() => {
                this.classList.remove('shake');
            }, 500);
            
            // Redirecionar para página principal
            window.location.href = '/frontend/html/pagina_principal.html';
        });
    }
}

function addToCart(id, name, price, quantity = 1) {
    // Verificar se o produto já está no carrinho
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: quantity
        });
    }
    
    // Salvar no localStorage
    saveCartToStorage();
    
    // Atualizar contador
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        
        // Animação
        cartCount.style.animation = 'none';
        setTimeout(() => {
            cartCount.style.animation = 'pulse 0.3s ease';
        }, 10);
        
        // Efeito visual quando adiciona item
        if (totalItems > 0) {
            cartCount.style.backgroundColor = 'var(--primary-color)';
            setTimeout(() => {
                cartCount.style.backgroundColor = 'var(--accent-color)';
            }, 300);
        }
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem('mangoCart', JSON.stringify(cart));
    } catch (e) {
        console.error('Erro ao salvar carrinho:', e);
    }
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('mangoCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartCount();
        } catch (e) {
            console.error('Erro ao carregar carrinho:', e);
            cart = [];
            localStorage.removeItem('mangoCart');
        }
    }
}

// ===== NOTIFICAÇÕES =====
function showNotification(message, type = 'success') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: var(--radius);
        color: white;
        font-weight: 500;
        z-index: 3000;
        box-shadow: var(--shadow-hover);
        transform: translateX(150%);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 350px;
        backdrop-filter: blur(10px);
    `;
    
    // Cor baseada no tipo
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, rgba(78, 205, 196, 0.9), rgba(46, 204, 113, 0.9))';
        notification.style.border = '1px solid rgba(78, 205, 196, 0.3)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.9), rgba(231, 76, 60, 0.9))';
        notification.style.border = '1px solid rgba(255, 107, 53, 0.3)';
    } else {
        notification.style.background = 'linear-gradient(135deg, rgba(52, 152, 219, 0.9), rgba(41, 128, 185, 0.9))';
        notification.style.border = '1px solid rgba(52, 152, 219, 0.3)';
    }
    
    // Ícone baseado no tipo
    let icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    if (type === 'info') icon = 'fas fa-info-circle';
    
    notification.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// ===== ANIMAÇÕES ADICIONAIS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .floating {
        animation: float 3s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Adicionar animação flutuante aos stats
document.querySelectorAll('.stat-item').forEach(item => {
    item.classList.add('floating');
    item.style.animationDelay = `${Math.random() * 2}s`;
});