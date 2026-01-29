// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginButton = document.getElementById('loginButton');
    
    // Referências para feedback
    const emailFeedback = emailInput.parentElement.querySelector('.input-feedback');
    const passwordFeedback = passwordInput.parentElement.querySelector('.input-feedback');
    
    // Estado da visualização da senha
    let isPasswordVisible = false;
    
    // Alternar visibilidade da senha
    togglePasswordBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (isPasswordVisible) {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
            isPasswordVisible = false;
        } else {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
            isPasswordVisible = true;
        }
    });
    
    // Validação de email em tempo real
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        if (email === '') {
            showFeedback(emailFeedback, '', 'neutral');
            return;
        }
        
        if (isValidEmail(email)) {
            showFeedback(emailFeedback, '✓ E-mail válido', 'valid');
        } else {
            showFeedback(emailFeedback, '⚠ Formato de e-mail inválido', 'invalid');
        }
    });
    
    // Validação de senha em tempo real
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        if (password === '') {
            showFeedback(passwordFeedback, '', 'neutral');
            return;
        }
        
        if (password.length < 6) {
            showFeedback(passwordFeedback, '⚠ A senha deve ter pelo menos 6 caracteres', 'invalid');
        } else {
            showFeedback(passwordFeedback, '✓ Senha válida', 'valid');
        }
    });
    
    // Processar envio do formulário
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validar antes de "enviar"
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validação simples
        let isValid = true;
        
        if (!isValidEmail(email)) {
            showFeedback(emailFeedback, '⚠ Por favor, insira um e-mail válido', 'invalid');
            isValid = false;
        }
        
        if (password.length < 6) {
            showFeedback(passwordFeedback, '⚠ A senha deve ter pelo menos 6 caracteres', 'invalid');
            isValid = false;
        }
        
        // Se for válido, mostrar mensagem de sucesso (simulação)
        if (isValid) {
            simulateLogin();
        }
    });
    
    // Adicionar eventos para os botões de login social
    document.querySelectorAll('.social-button').forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`Esta é uma demonstração. Em uma aplicação real, você seria redirecionado para o login com ${provider}.`);
        });
    });
    
    // Função para simular login (apenas demonstração)
    function simulateLogin() {
        // Alterar texto e desabilitar botão
        const buttonText = loginButton.querySelector('.button-text');
        buttonText.textContent = 'Entrando...';
        loginButton.disabled = true;
        
        // Simular processamento do servidor
        setTimeout(() => {
            // Mostrar mensagem de sucesso
            alert('Login realizado com sucesso! Esta é apenas uma demonstração, então nenhum dado foi enviado.');
            
            // Restaurar botão
            buttonText.textContent = 'Entrar';
            loginButton.disabled = false;
            
            // Limpar formulário
            loginForm.reset();
            showFeedback(emailFeedback, '', 'neutral');
            showFeedback(passwordFeedback, '', 'neutral');
            
            // Restaurar senha para tipo "password"
            if (isPasswordVisible) {
                passwordInput.type = 'password';
                togglePasswordBtn.querySelector('i').classList.remove('fa-eye-slash');
                togglePasswordBtn.querySelector('i').classList.add('fa-eye');
                isPasswordVisible = false;
            }
            
        }, 1500);
    }
    
    // Função para validar formato de e-mail
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Função para mostrar feedback
    function showFeedback(element, message, type) {
        element.textContent = message;
        
        // Remover classes anteriores
        element.classList.remove('valid', 'invalid');
        
        // Adicionar classe apropriada
        if (type === 'valid') {
            element.classList.add('valid');
            element.style.color = '#28a745';
        } else if (type === 'invalid') {
            element.classList.add('invalid');
            element.style.color = '#dc3545';
        } else {
            element.style.color = '#6c757d';
        }
    }
    
    // Adicionar estilos dinâmicos para feedback
    const style = document.createElement('style');
    style.textContent = `
        .valid {
            color: #28a745;
            font-weight: 500;
        }
        
        .invalid {
            color: #dc3545;
            font-weight: 500;
        }
        
        input:valid {
            border-color: #28a745;
        }
        
        input:invalid:not(:placeholder-shown) {
            border-color: #dc3545;
        }
        
        .login-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none !important;
            box-shadow: none !important;
        }
    `;
    document.head.appendChild(style);
    
    // Mensagem de boas-vindas no console
    console.log('Página de login de demonstração carregada com sucesso!');
    console.log('Esta é uma demonstração visual sem funcionalidade real de backend.');
});