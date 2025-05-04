// Fermer le menu au clic sur un lien
document.querySelectorAll('.navbar a').forEach(link => {//Applique une fonction à chaque lien
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});
// Gestion simplifiée du formulaire
const contactForm = document.querySelector('.contact-forme');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Désactiver le bouton pendant l'envoi
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        
        try {
            // Envoyer les données au serveur
            const response = await fetch('connexion.php', {//Envoie des données au serveur
                method: 'POST',
                body: new FormData(contactForm)//Capture automatiquement les données du formulaire
            });
            
            // Afficher simplement un message de succès
            alert('Merci ! Votre message a bien été envoyé.');
            contactForm.reset();
            
        } catch (error) {
            alert("Une erreur s'est produite. Veuillez réessayer.");
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer';
        }
    });
}
//review section
document.addEventListener('DOMContentLoaded', function() {
    // Création des étoiles de notation
    const ratingStars = document.getElementById('rating-stars');
    const ratingValue = document.getElementById('rating-value');
    const submitBtn = document.getElementById('submit-btn');
    const reviewsList = document.getElementById('reviews-list');
    
    let currentRating = 0;
    
    // Créer 10 étoiles (pour une notation sur 10)
    for (let i = 1; i <= 10; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.innerHTML = '★';
        star.dataset.value = i;
        
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.value);
            updateStars();
            ratingValue.textContent = currentRating + '/10';
        });
        
        ratingStars.appendChild(star);
    }
    
    function updateStars() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            if (parseInt(star.dataset.value) <= currentRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    // Gestion de la soumission du formulaire
    submitBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value.trim();
        const comment = document.getElementById('comment').value.trim();
        
        if (!name || !comment || currentRating === 0) {
            alert('Veuillez remplir tous les champs et donner une note!');
            return;
        }
        
        // Ajouter le nouvel avis
        addReview(name, comment, currentRating);
        
        // Réinitialiser le formulaire
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
        currentRating = 0;
        ratingValue.textContent = '0/10';
        updateStars();
    });
    
    function addReview(name, comment, rating) {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        reviewItem.innerHTML = `
            <div class="review-header">
                <span class="review-name">${name}</span>
                <span class="review-rating">${rating}/10</span>
            </div>
            <p class="review-comment">${comment}</p>
        `;
        
        reviewsList.prepend(reviewItem);
    }
});