// Cambiare lo sfondo della barra di navigazione durante lo scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.top-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mostrare il menu a tendina delle impostazioni
const settingsBtn = document.querySelector('.settings-btn');
settingsBtn.addEventListener('click', function() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
});

// Mostrare le opzioni sotto Info
const infoBtn = document.getElementById('info-btn');
infoBtn.addEventListener('click', function() {
    const infoContent = document.getElementById('info-content');
    infoContent.style.display = infoContent.style.display === 'flex' ? 'none' : 'flex';
});
