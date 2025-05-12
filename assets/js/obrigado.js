document.addEventListener('DOMContentLoaded', function() {
    // Animação adicional para o container
    const container = document.querySelector('.thank-you-container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    container.style.transition = 'all 0.5s ease-out';
    
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // Tempo de redirecionamento automático (opcional)
    setTimeout(() => {
        // window.location.href = 'index.html'; // Descomente para redirecionar após 8 segundos
    }, 8000);
});