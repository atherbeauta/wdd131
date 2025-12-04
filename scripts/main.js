/*
 * WDD 131: Projet Final - Logique JavaScript
 * Ce fichier implémente tous les critères JS requis (9 à 15).
 */

// Critère 12 & 13: Utilisation d'un Array d'Objects pour stocker les données du site
const destinations = [
    {
        id: 'bora-bora',
        name: 'Bora Bora, Polynésie',
        type: 'plage',
        price: 4500,
        description: 'Lagon turquoise, bungalows sur pilotis et détente absolue. Le paradis des lunes de miel.',
        image: 'https://placehold.co/400x300/00b4d8/03045e?text=Bora+Bora'
    },
    {
        id: 'machu-picchu',
        name: 'Machu Picchu, Pérou',
        type: 'culture',
        price: 2800,
        description: 'Découvrez la cité inca perdue dans les Andes. Une aventure historique et majestueuse.',
        image: 'https://placehold.co/400x300/03045e/90e0ef?text=Machu+Picchu'
    },
    {
        id: 'alpes-suisses',
        name: 'Alpes Suisses',
        type: 'montagne',
        price: 3200,
        description: 'Randonnée en été, ski en hiver. Des paysages alpins à couper le souffle, toute l\'année.',
        image: 'https://placehold.co/400x300/90e0ef/03045e?text=Alpes+Suisses'
    },
    {
        id: 'kyoto-japon',
        name: 'Kyoto, Japon',
        type: 'culture',
        price: 3900,
        description: 'Temples anciens, jardins zen et culture traditionnelle. Le cœur historique du Japon.',
        image: 'https://placehold.co/400x300/0077b6/ffffff?text=Kyoto+Japon'
    },
    {
        id: 'bali-indonesie',
        name: 'Bali, Indonésie',
        type: 'plage',
        price: 2500,
        description: 'Rizieres en terrasse, plages magnifiques et spiritualité. L\'île des Dieux.',
        image: 'https://placehold.co/400x300/00b4d8/03045e?text=Bali+Indonesie'
    },
];

// Critère 9: Fonction pour afficher les destinations sur le DOM (index.html et produits.html)
function displayDestinations(containerId, data, limit = Infinity) {
    // Critère 10: Sélection d'un élément
    const container = document.getElementById(containerId);
    if (!container) return; // Arrêter si le conteneur n'est pas sur la page actuelle

    // Critère 13: Array Method .slice() pour limiter les destinations sur la page d'accueil
    const destinationsToDisplay = data.slice(0, limit);

    // Critère 13: Array Method .map() pour construire le HTML de chaque carte
    const htmlCards = destinationsToDisplay.map(destination => {
        // Critère 14: Utilisation exclusive de Template Literals
        return `
            <div class="card">
                <img src="${destination.image}" alt="Image de ${destination.name}" loading="lazy">
                <h3>${destination.name}</h3>
                <p><strong>Type:</strong> ${destination.type}</p>
                <p>${destination.description}</p>
                <p style="font-weight: bold;">Prix estimé: ${destination.price} €</p>
                <!-- Critère 7: Intégration du lazy loading -->
            </div>
        `;
    }).join('');

    // Critère 10: Modification de l'élément (Mise à jour du DOM)
    container.innerHTML = htmlCards;
}

// Critère 9: Fonction pour gérer le formulaire d'avis (contact.html)
function handleReviewSubmit(event) {
    event.preventDefault();

    const form = event.target;
    // Critère 10: Sélection des éléments
    const name = document.getElementById('name').value;
    const rating = parseInt(document.getElementById('rating').value);
    const reviewText = document.getElementById('review-text').value;
    const destination = document.getElementById('destination').value;
    const messageElement = document.getElementById('form-message');

    // Critère 11: Conditional Branching (Validation des données)
    if (reviewText.length < 50) {
        messageElement.textContent = "L'avis doit contenir au moins 50 caractères.";
        return;
    }
    
    if (rating < 1 || rating > 5) {
        messageElement.textContent = "La note doit être entre 1 et 5.";
        return;
    }
    
    if (destination === "") {
        messageElement.textContent = "Veuillez sélectionner une destination.";
        return;
    }

    messageElement.textContent = "Avis soumis avec succès !";
    form.reset();
    
    // Critère 15: Mise à jour du localStorage après soumission réussie
    updateReviewCount(1);
    
    // Ajouter le nouvel avis au stockage local des avis pour l'affichage immédiat
    const newReview = {
        name: name,
        destination: destination,
        rating: rating,
        text: reviewText,
        date: new Date().toLocaleDateString('fr-FR')
    };
    saveNewReview(newReview);
    loadReviews(); // Recharger la liste des avis après l'ajout
}

// Critère 9 & 15: Fonction pour gérer le compteur localStorage
function updateReviewCount(increment = 0) {
    // Critère 15: Récupération de la valeur
    let count = parseInt(localStorage.getItem('reviewCount') || '0');
    count += increment;

    // Critère 15: Sauvegarde de la nouvelle valeur
    localStorage.setItem('reviewCount', count.toString());

    // Critère 10: Modification du DOM
    const countElement = document.getElementById('review-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Critère 9 & 15: Fonctions pour gérer les avis stockés dans localStorage
function saveNewReview(review) {
    let reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    reviews.push(review);
    localStorage.setItem('customerReviews', JSON.stringify(reviews));
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    const listContainer = document.getElementById('customer-reviews-list');
    
    if (!listContainer) return;

    if (reviews.length === 0) {
        listContainer.innerHTML = '<li>Aucun avis à afficher pour le moment.</li>';
        return;
    }

    // Critère 13: Array Method .forEach() pour générer la liste
    listContainer.innerHTML = '';
    reviews.forEach(review => {
        const ratingStars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        // Critère 14: Template Literals
        const listItem = `
            <li class="review-item">
                <p><strong>${review.name}</strong> a donné une note de ${ratingStars} pour <strong>${review.destination}</strong>.</p>
                <p>${review.text}</p>
                <small>Soumis le ${review.date}</small>
            </li>
        `;
        listContainer.innerHTML += listItem;
    });
}

// Critère 9: Fonction pour appliquer le filtre (produits.html)
function applyFilter() {
    const filterValue = document.getElementById('filter-type').value;
    
    // Critère 11 & 13: Conditional Branching et Array Method .filter()
    let filteredDestinations;
    if (filterValue === 'all') {
        filteredDestinations = destinations;
    } else {
        filteredDestinations = destinations.filter(dest => dest.type === filterValue);
    }
    
    displayDestinations('all-destinations-list', filteredDestinations);
}

// Critère 9: Fonction principale d'initialisation (appelée par DOMContentLoaded)
function init() {
    // Critère 10: Interaction DOM (mise à jour de l'année)
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#copyright-year, #current-year-display');
    yearElements.forEach(el => el.textContent = currentYear);

    // Initialisation du menu mobile (Critère 10: Event Listener)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Critère 10: Modification de l'élément (toggle class)
            navLinks.classList.toggle('open');
        });
    }

    // --- LOGIQUE SPÉCIFIQUE À CHAQUE PAGE ---

    // Page d'Accueil (index.html)
    if (document.getElementById('featured-destinations-list')) {
        // Afficher les 3 premières destinations (Array Method .slice() implicite)
        displayDestinations('featured-destinations-list', destinations, 3);
    }

    // Page de Destinations (produits.html)
    if (document.getElementById('all-destinations-list')) {
        displayDestinations('all-destinations-list', destinations);

        // Critère 10: Event Listener pour le filtre
        document.getElementById('apply-filter').addEventListener('click', applyFilter);
        // Optionnel: Écouter le changement sur le select directement pour une meilleure UX
        document.getElementById('filter-type').addEventListener('change', applyFilter);
    }

    // Page Contact & Avis (contact.html)
    if (document.getElementById('review-form')) {
        // 1. Remplir les options de la liste déroulante des destinations
        const selectElement = document.getElementById('destination');
        
        // Critère 13: Array Method .forEach() pour remplir les options
        destinations.forEach(dest => {
            // Critère 14: Template Literals
            selectElement.innerHTML += `<option value="${dest.name}">${dest.name}</option>`;
        });

        // 2. Initialiser le compteur d'avis et la liste d'avis
        updateReviewCount(0); // Met à jour le DOM avec le compte actuel sans incrémenter
        loadReviews();
        
        // 3. Critère 10: Event Listener pour la soumission du formulaire
        document.getElementById('review-form').addEventListener('submit', handleReviewSubmit);
    }
}

// Critère 10: S'assurer que le DOM est complètement chargé avant d'exécuter init()
document.addEventListener('DOMContentLoaded', init);