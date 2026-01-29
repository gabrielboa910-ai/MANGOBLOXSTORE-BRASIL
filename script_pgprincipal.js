// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initBackgroundAnimation();
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initBannerClose();
    initLoginModal();
    initFaqModal();
    initCopyPixButton();
    initButtonEvents();
    initSmoothScroll();
    initCartSystem();
    initCartModal();
    initMangoImages();
    
    // Carregar tema salvo
    loadSavedTheme();
    
    // Carregar banner salvo
    loadBannerState();
    
    // Carregar carrinho do localStorage
    loadCartFromStorage();
    
    console.log('Mango Store - Marketplace Gamer Oficial para Roblox carregado!');
});

// ===== FUNDO ANIMADO =====
function initBackgroundAnimation() {
    const bg = document.getElementById('animatedBg');
    if (!bg) return;
    
    const squareCount = 20;
    
    for (let i = 0; i < squareCount; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        
        // Tamanho aleatório
        const size = Math.random() * 60 + 20;
        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        
        // Posição aleatória
        square.style.left = `${Math.random() * 100}%`;
        square.style.top = `${Math.random() * 100}%`;
        
        // Cor aleatória (tons de manga)
        const hue = Math.floor(Math.random() * 20) + 20; // 20-40 (laranja)
        const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
        const lightness = Math.floor(Math.random() * 20) + 40; // 40-60%
        square.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.1)`;
        
        // Animação aleatória
        const duration = Math.random() * 30 + 20; // 20-50 segundos
        const delay = Math.random() * 10; // 0-10 segundos
        square.style.animationDuration = `${duration}s`;
        square.style.animationDelay = `${delay}s`;
        
        bg.appendChild(square);
    }
}

// ===== TEMA CLARO/ESCURO =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Atualizar ícone
        const themeIcon = themeToggle.querySelector('.theme-icon');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '🌞';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '🌞';
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
    }
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animação do ícone
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ===== ANIMAÇÕES AO ROLAR =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== BANNER PROMOCIONAL =====
function initBannerClose() {
    const closeBanner = document.getElementById('closeBanner');
    const promoBanner = document.getElementById('promoBanner');
    
    if (closeBanner && promoBanner) {
        closeBanner.addEventListener('click', function() {
            promoBanner.style.animation = 'slideUp 0.5s ease-out forwards';
            
            setTimeout(() => {
                promoBanner.style.display = 'none';
                localStorage.setItem('bannerClosed', 'true');
            }, 500);
        });
    }
}

function loadBannerState() {
    const promoBanner = document.getElementById('promoBanner');
    if (promoBanner && localStorage.getItem('bannerClosed') === 'true') {
        promoBanner.style.display = 'none';
    }
}

// ===== MODAL DE LOGIN =====
function initLoginModal() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    
    if (!loginBtn || !loginModal) return;
    
    // Abrir modal
    loginBtn.addEventListener('click', function() {
        loginModal.classList.add('show');
    });
    
    // Fechar modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            loginModal.classList.remove('show');
        });
    }
    
    // Fechar ao clicar fora
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('show');
        }
    });
    
    // Enviar formulário
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                showNotification('Login realizado com sucesso! Bem-vindo à Mango Store!', 'success');
                loginModal.classList.remove('show');
                loginForm.reset();
            } else {
                showNotification('Por favor, preencha todos os campos.', 'error');
            }
        });
    }
}

// ===== MODAL FAQ =====
function initFaqModal() {
    const faqBtn = document.getElementById('faqBtn');
    const faqModal = document.getElementById('faqModal');
    const closeFaqModal = document.getElementById('closeFaqModal');
    
    if (faqBtn && faqModal) {
        // Abrir modal FAQ
        faqBtn.addEventListener('click', function(e) {
            e.preventDefault();
            faqModal.classList.add('show');
        });
        
        // Fechar modal FAQ
        if (closeFaqModal) {
            closeFaqModal.addEventListener('click', function() {
                faqModal.classList.remove('show');
            });
        }
        
        // Fechar ao clicar fora
        faqModal.addEventListener('click', function(e) {
            if (e.target === faqModal) {
                faqModal.classList.remove('show');
            }
        });
        
        // Toggle FAQ items
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    item.classList.toggle('active');
                });
            }
        });
    }
}

// ===== COPIAR CHAVE PIX =====
function initCopyPixButton() {
    const copyBtn = document.getElementById('copyPixBtn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const pixKey = document.getElementById('pixKey').textContent;
            
            navigator.clipboard.writeText(pixKey)
                .then(() => {
                    // Feedback visual
                    const originalIcon = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    copyBtn.style.backgroundColor = 'var(--leaf-green)';
                    
                    // Restaurar após 2 segundos
                    setTimeout(() => {
                        copyBtn.innerHTML = originalIcon;
                        copyBtn.style.backgroundColor = '';
                    }, 2000);
                    
                    // Mensagem
                    showNotification('Chave PIX copiada para a área de transferência!', 'success');
                })
                .catch(err => {
                    console.error('Erro ao copiar:', err);
                    showNotification('Erro ao copiar. Tente novamente.', 'error');
                });
        });
    }
}

// ===== SISTEMA DE CARRINHO =====
let cart = [];

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

function initCartSystem() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Adicionar eventos aos botões "Adicionar ao Carrinho"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            
            addToCart(id, name, price);
            showNotification(`${name} adicionado ao carrinho! R$ ${price.toFixed(2)}`, 'success');
        });
    });
}

function addToCart(id, name, price) {
    // Verificar se o produto já está no carrinho
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    // Salvar no localStorage
    saveCartToStorage();
    
    // Atualizar contador
    updateCartCount();
    
    // Atualizar modal do carrinho se estiver aberto
    updateCartModal();
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        
        // Animação
        cartCount.style.animation = 'bounce 0.3s ease';
        setTimeout(() => {
            cartCount.style.animation = '';
        }, 300);
    }
}

// ===== MODAL DO CARRINHO =====
function initCartModal() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCartModal = document.getElementById('closeCartModal');
    const continueShopping = document.getElementById('continueShopping');
    const goToProducts = document.getElementById('goToProducts');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!cartBtn || !cartModal) return;
    
    // Abrir modal do carrinho
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        cartModal.classList.add('show');
        updateCartModal();
    });
    
    // Fechar modal do carrinho
    if (closeCartModal) {
        closeCartModal.addEventListener('click', function() {
            cartModal.classList.remove('show');
        });
    }
    
    // Fechar ao clicar fora
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.classList.remove('show');
        }
    });
    
    // Continuar comprando
    if (continueShopping) {
        continueShopping.addEventListener('click', function() {
            cartModal.classList.remove('show');
        });
    }
    
    // Ir para produtos
    if (goToProducts) {
        goToProducts.addEventListener('click', function() {
            cartModal.classList.remove('show');
            scrollToSection('products');
        });
    }
    
    // Finalizar compra
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                // Processar checkout
                processCheckout();
            } else {
                showNotification('Seu carrinho está vazio!', 'error');
            }
        });
    }
}

function updateCartModal() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    if (!cartItemsContainer) return;
    
    // Limpar container
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        // Mostrar carrinho vazio
        if (emptyCart) {
            emptyCart.style.display = 'block';
        }
        if (cartSummary) {
            cartSummary.style.display = 'none';
        }
    } else {
        // Esconder mensagem de carrinho vazio
        if (emptyCart) {
            emptyCart.style.display = 'none';
        }
        if (cartSummary) {
            cartSummary.style.display = 'block';
        }
        
        let total = 0;
        
        // Adicionar cada item do carrinho
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <i class="fas fa-box"></i>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                    <button class="remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Atualizar total
        if (cartTotalPrice) {
            cartTotalPrice.textContent = `R$ ${total.toFixed(2)}`;
        }
        
        // Adicionar eventos aos botões de quantidade
        const decreaseButtons = document.querySelectorAll('.decrease');
        const increaseButtons = document.querySelectorAll('.increase');
        const removeButtons = document.querySelectorAll('.remove-item');
        
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                updateQuantity(index, -1);
            });
        });
        
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                updateQuantity(index, 1);
            });
        });
        
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }
}

function updateQuantity(index, change) {
    if (index < 0 || index >= cart.length) return;
    
    cart[index].quantity += change;
    
    // Remover item se quantidade for 0 ou menos
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
        showNotification('Item removido do carrinho!', 'success');
    }
    
    // Salvar no localStorage
    saveCartToStorage();
    
    // Atualizar contador e modal
    updateCartCount();
    updateCartModal();
}

function removeFromCart(index) {
    if (index < 0 || index >= cart.length) return;
    
    const itemName = cart[index].name;
    cart.splice(index, 1);
    
    // Salvar no localStorage
    saveCartToStorage();
    
    // Atualizar contador e modal
    updateCartCount();
    updateCartModal();
    
    showNotification(`${itemName} removido do carrinho!`, 'success');
}

function saveCartToStorage() {
    try {
        localStorage.setItem('mangoCart', JSON.stringify(cart));
    } catch (e) {
        console.error('Erro ao salvar carrinho:', e);
    }
}

function processCheckout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!', 'error');
        return;
    }
    
    // Calcular total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Mostrar modal de confirmação
    showCheckoutModal(total);
}

function showCheckoutModal(total) {
    // Criar modal de checkout
    const checkoutModal = document.createElement('div');
    checkoutModal.className = 'modal-overlay show';
    checkoutModal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" id="closeCheckoutModal">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="modal-header">
                <h3><i class="fas fa-credit-card"></i> Finalizar Compra</h3>
            </div>
            
            <div class="checkout-summary">
                <p>Total da compra: <strong>R$ ${total.toFixed(2)}</strong></p>
                <p>Itens no carrinho: ${cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                
                <div class="checkout-instructions">
                    <p>Para finalizar sua compra:</p>
                    <ol>
                        <li>Faça o pagamento via PIX para a chave: <strong>mangostore@roblox.com</strong></li>
                        <li>Envie o comprovante para nosso Discord</li>
                        <li>Seus itens serão entregues em até 10 minutos</li>
                    </ol>
                </div>
                
                <div class="checkout-actions">
                    <button class="btn btn-secondary" id="cancelCheckout">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button class="btn btn-primary" id="confirmCheckout">
                        <i class="fas fa-check"></i> Já efetuei o pagamento
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(checkoutModal);
    
    // Fechar modal
    document.getElementById('closeCheckoutModal').addEventListener('click', function() {
        document.body.removeChild(checkoutModal);
    });
    
    // Cancelar
    document.getElementById('cancelCheckout').addEventListener('click', function() {
        document.body.removeChild(checkoutModal);
    });
    
    // Confirmar
    document.getElementById('confirmCheckout').addEventListener('click', function() {
        showNotification('Compra confirmada! Aguarde a entrega dos itens.', 'success');
        document.body.removeChild(checkoutModal);
        
        // Limpar carrinho
        cart = [];
        saveCartToStorage();
        updateCartCount();
        updateCartModal();
        
        // Fechar modal do carrinho
        document.getElementById('cartModal').classList.remove('show');
    });
    
    // Fechar ao clicar fora
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            document.body.removeChild(checkoutModal);
        }
    });
}

// ===== EVENTOS DOS BOTÕES =====
function initButtonEvents() {
    // Botão Comprar Agora
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            scrollToSection('products');
            showNotification('Redirecionando para produtos...', 'info');
        });
    }
    
    // Botão Ver Produtos
    const viewProductsBtn = document.getElementById('viewProductsBtn');
    if (viewProductsBtn) {
        viewProductsBtn.addEventListener('click', function() {
            scrollToSection('products');
        });
    }
    
    // Botão Como Comprar
    const howToBuyBtn = document.getElementById('howToBuyBtn');
    if (howToBuyBtn) {
        howToBuyBtn.addEventListener('click', function() {
            scrollToSection('payment');
            showNotification('Mostrando instruções de compra...', 'info');
        });
    }
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calcular posição considerando o header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

// ===== NOTIFICAÇÕES =====
function showNotification(message, type = 'success') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Adicionar ícone baseado no tipo
    let icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    if (type === 'info') icon = 'fas fa-info-circle';
    
    notification.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== IMAGENS DE MANGA NAS CATEGORIAS =====
function initMangoImages() {
    // Adicionar imagens de manga aos cards de categoria
    const bloxCard = document.getElementById('blox-fruits-card');
    const gpoCard = document.getElementById('gpo-card');
    
    // URL da imagem de manga (exemplo)
    const mangoImageUrl = 'https://img.icons8.com/color/480/mango.png';
    
    if (bloxCard) {
        const bloxMango = document.createElement('div');
        bloxMango.className = 'category-mango-image';
        bloxMango.innerHTML = `<img src="${mangoImageUrl}" alt="Manga Blox Fruits">`;
        bloxCard.appendChild(bloxMango);
    }
    
    if (gpoCard) {
        const gpoMango = document.createElement('div');
        gpoMango.className = 'category-mango-image';
        gpoMango.innerHTML = `<img src="${mangoImageUrl}" alt="Manga GPO">`;
        gpoCard.appendChild(gpoMango);
    }
}

// ===== RESPONSIVIDADE =====
function handleResponsiveMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.getElementById('menuToggle');
    
    function checkScreenSize() {
        if (window.innerWidth <= 992) {
            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.style.display = 'flex';
            }
        } else {
            if (navMenu) navMenu.classList.add('active');
            if (menuToggle) {
                menuToggle.style.display = 'none';
            }
        }
    }
    
    // Verificar tamanho inicial
    checkScreenSize();
    
    // Verificar ao redimensionar
    window.addEventListener('resize', checkScreenSize);
}

// Inicializar responsividade
handleResponsiveMenu();