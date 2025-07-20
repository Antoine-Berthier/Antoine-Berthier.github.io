// Attend que le contenu du DOM soit entièrement chargé avant d'exécuter le script.
document.addEventListener('DOMContentLoaded', function() {

    // ===================================================================
    // --- LOGIQUE SPÉCIFIQUE À LA PAGE D'ACCUEIL (index.html) ---
    // --- On exécute ce bloc uniquement si l'élément #property-preview existe.
    // ===================================================================
    const previewContainer = document.getElementById('property-preview');
    if (previewContainer) {

        // Données des biens pour la carte (simule une base de données)
        const propertiesData = {
            'centre': { 
                image: 'img/Maison_ex.png', title: 'Maison de ville', price: '450 000 €', surface: '120m²', surfaceTotale: '150m²', link: '#'
            },
            'fetilly': { 
                image: 'img/Maison_ex.png', title: 'Maison avec jardin', price: '380 000 €', surface: '95m²', surfaceTotale: '200m²', link: '#'
            },
            'la-genette': { 
                image: 'img/Maison_ex.png', title: 'Villa vue mer', price: '850 000 €', surface: '200m²', surfaceTotale: '500m²', link: '#'
            },
            'les-minimes': { 
                image: 'img/Maison_ex.png', title: 'Studio moderne', price: '180 000 €', surface: '25m²', surfaceTotale: '30m²', link: '#'
            },
            'le-gabut': { 
                image: 'img/Maison_ex.png', title: 'Loft industriel', price: '550 000 €', surface: '150m²', surfaceTotale: '160m²', link: '#'
            },
            'aytre': { 
                image: 'img/Maison_ex.png', title: 'Maison familiale', price: '350 000 €', surface: '110m²', surfaceTotale: '400m²', link: '#'
            },
            'perigny': { 
                image: 'img/Maison_ex.png', title: 'Maison récente', price: '420 000 €', surface: '130m²', surfaceTotale: '550m²', link: '#'
            },
            'lagord': { 
                image: 'img/Maison_ex.png', title: 'Duplex avec terrasse', price: '290 000 €', surface: '70m²', surfaceTotale: '90m²', link: '#'
            },
            'nieul': { 
                image: 'img/Maison_ex.png', title: 'Villa avec piscine', price: '720 000 €', surface: '210m²', surfaceTotale: '800m²', link: '#'
            },
            'marsilly': { 
                image: 'img/Maison_ex.png', title: 'Terrain à bâtir', price: '160 000 €', surface: 'N/A', surfaceTotale: '600m²', link: '#'
            }
        };

        const mapPoints = document.querySelectorAll('.map-point');

        // Fonction pour mettre à jour la carte d'aperçu
        function updatePreviewCard(propertyId) {
            const property = propertiesData[propertyId];
            if (!property) return;

            // Crée le HTML pour la nouvelle carte
            const cardHTML = `
                <img src="${property.image}" alt="${property.title}">
                <h3>${property.title}</h3>
                <p class="price">${property.price}</p>
                <p class="surface-info">${property.surface}</p>
                <p class="surface-info">${property.surfaceTotale}</p>
                <a href="${property.link}" class="btn-voir-plus">Voir +</a>
            `;
            previewContainer.innerHTML = cardHTML;

            // Met à jour le point actif sur la carte
            mapPoints.forEach(point => {
                point.classList.remove('active');
                if (point.dataset.propertyId === propertyId) {
                    point.classList.add('active');
                }
            });
        }

        // Ajoute les écouteurs d'événements sur chaque point de la carte
        mapPoints.forEach(point => {
            point.addEventListener('click', function() {
                updatePreviewCard(this.dataset.propertyId);
            });
        });

        // Initialisation : Affiche le premier bien par défaut au chargement
        if (mapPoints.length > 0) {
            updatePreviewCard(mapPoints[0].dataset.propertyId);
        }
    }


    // =======================================================================
    // --- LOGIQUE SPÉCIFIQUE À LA PAGE D'ANNONCES (annonces_explorer.html) ---
    // =======================================================================
    const resultsGrid = document.querySelector('.results-grid');
    if (resultsGrid) {

        // --- 1. DONNÉES CENTRALISÉES DES PROPRIÉTÉS ---
        // Dans une vraie application, ces données viendraient d'une base de données (API).
        const allProperties = [
            // Maisons à La Rochelle
            { 
                id: 1, type: 'maison', title: 'Maison de ville', location: 'Centre-ville', price: '450 000 €', surface: '120m²', surfaceTotale: '150m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 3, bains: 2, autres: 1 }
            },
            { 
                id: 2, type: 'maison', title: 'Maison avec jardin', location: 'Fétilly', price: '380 000 €', surface: '95m²', surfaceTotale: '200m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 3, bains: 1, autres: 1 }
            },
            { 
                id: 3, type: 'maison', title: 'Villa vue mer', location: 'La Genette', price: '850 000 €', surface: '200m²', surfaceTotale: '500m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 5, bains: 3, autres: 2 }
            },

            // Appartements à La Rochelle
            { 
                id: 4, type: 'appartement', title: 'Studio moderne', location: 'Les Minimes', price: '180 000 €', surface: '25m²', surfaceTotale: '30m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 1, bains: 1, autres: 0 }
            },
            { 
                id: 5, type: 'appartement', title: 'Grand T4', location: 'Saint-Nicolas', price: '320 000 €', surface: '80m²', surfaceTotale: '85m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 3, bains: 1, autres: 1 }
            },

            // Biens dans l'agglomération
            { 
                id: 6, type: 'maison', title: 'Maison familiale', location: 'Aytré', price: '350 000 €', surface: '110m²', surfaceTotale: '400m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 4, bains: 2, autres: 1 }
            },
            { 
                id: 7, type: 'maison', title: 'Maison récente', location: 'Périgny', price: '420 000 €', surface: '130m²', surfaceTotale: '550m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 4, bains: 2, autres: 2 }
            },
            { 
                id: 8, type: 'appartement', title: 'Duplex avec terrasse', location: 'Lagord', price: '290 000 €', surface: '70m²', surfaceTotale: '90m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 2, bains: 2, autres: 1 }
            },
            { 
                id: 9, type: 'maison', title: 'Villa avec piscine', location: 'Nieul-sur-Mer', price: '720 000 €', surface: '210m²', surfaceTotale: '800m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 5, bains: 3, autres: 3 }
            },

            // Biens atypiques et terrains
            { 
                id: 10, type: 'atypique', title: 'Loft industriel', location: 'Le Gabut', price: '550 000 €', surface: '150m²', surfaceTotale: '160m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 2, bains: 2, autres: 1 }
            },
            { 
                id: 11, type: 'terrain', title: 'Terrain à bâtir', location: 'Marsilly', price: '160 000 €', surface: 'N/A', surfaceTotale: '600m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 0, bains: 0, autres: 0 }
            },
            { 
                id: 12, type: 'locaux', title: 'Bureau en centre-ville', location: 'Centre-ville', price: '250 000 €', surface: '60m²', surfaceTotale: '60m²', 
                images: ['img/Maison_ex.png'], link: '#',
                rooms: { chambres: 0, bains: 1, autres: 3 }
            }
        ];

        
        // --- 2. FONCTIONS DE RENDU ET D'INITIALISATION ---

        /**
         * Affiche les propriétés dans la grille.
         * @param {Array} propertiesToDisplay - Le tableau des propriétés à afficher.
         */
        function renderProperties(propertiesToDisplay) {
            resultsGrid.innerHTML = ''; // Vide la grille avant de la remplir

            if (propertiesToDisplay.length === 0) {
                resultsGrid.innerHTML = '<p class="no-results">Aucun bien ne correspond à votre recherche.</p>';
                return;
            }

            propertiesToDisplay.forEach(property => {
                const imagesHTML = property.images.map(img => `<img src="${img}" alt="${property.title} à ${property.location}">`).join('');
                const showCarouselNav = property.images.length > 1;

                const cardHTML = `
                    <article class="property-card">
                        <div class="card-image-container">
                            <div class="carousel-images">${imagesHTML}</div>
                            ${showCarouselNav ? `
                                <button class="carousel-nav prev"><i class="fa-solid fa-chevron-left"></i></button>
                                <button class="carousel-nav next"><i class="fa-solid fa-chevron-right"></i></button>
                            ` : ''}
                        </div>
                        <div class="card-content">
                            <h3>${property.title}</h3>
                            <p class="location">${property.location}</p>
                            <p class="price">${property.price}</p>
                            <p class="surface">Surface ${property.surface}</p>
                            <p class="surface-totale">Surface totale ${property.surfaceTotale}</p>
                        </div>
                        <a href="${property.link}" class="btn-card-details" aria-label="Voir les détails de ${property.title} à ${property.location}">
                            <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </article>
                `;
                resultsGrid.innerHTML += cardHTML;
            });
            
            // Il est crucial d'initialiser les carrousels APRÈS avoir ajouté les cartes au DOM.
            initializeCarousels();
        }

        /**
         * Initialise la logique des carrousels pour toutes les cartes présentes.
         */
        function initializeCarousels() {
            const propertyCards = document.querySelectorAll('.property-card');
            propertyCards.forEach(card => {
                const imageContainer = card.querySelector('.carousel-images');
                if (!imageContainer) return;

                const images = card.querySelectorAll('.carousel-images img');
                const prevBtn = card.querySelector('.carousel-nav.prev');
                const nextBtn = card.querySelector('.carousel-nav.next');

                if (images.length <= 1) return;

                let currentIndex = 0;
                function updateCarousel() {
                    imageContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
                }

                nextBtn.addEventListener('click', e => {
                    e.preventDefault();
                    currentIndex = (currentIndex + 1) % images.length;
                    updateCarousel();
                });
                prevBtn.addEventListener('click', e => {
                    e.preventDefault();
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    updateCarousel();
                });
            });
        }
        

        // --- 3. LOGIQUE DE FILTRAGE ---

        /**
         * Convertit un prix au format string (ex: "645 000 €") en nombre.
         * @param {string} priceString - Le prix en format chaîne de caractères.
         * @returns {number} Le prix en format numérique.
         */
        function parsePrice(priceString) {
            if (typeof priceString !== 'string') return 0;
            // Enlève les espaces, le symbole € et convertit en nombre
            return parseInt(priceString.replace(/\s|€/g, ''), 10);
        }

        /**
         * Filtre la liste complète des propriétés en fonction des critères actifs.
         */
        function applyAllFilters() {
            // Récupère les valeurs du filtre "Type"
            const selectedTypes = Array.from(document.querySelectorAll('#type-dropdown-menu input:checked')).map(cb => cb.value);

            // Récupère les valeurs du filtre "Prix"
            const minPrice = parseInt(document.getElementById('price-min').value, 10) || 0;
            const maxPrice = parseInt(document.getElementById('price-max').value, 10) || Infinity;

            // Récupère les valeurs du filtre "Localisation"
            const selectedLocations = Array.from(document.querySelectorAll('#location-dropdown-menu input:checked')).map(cb => cb.value);

            // Récupère les valeurs du filtre "Pièces"
            const requiredChambres = parseInt(document.getElementById('rooms-chambres').value, 10) || 0;
            const requiredBains = parseInt(document.getElementById('rooms-bains').value, 10) || 0;
            const requiredAutres = parseInt(document.getElementById('rooms-autres').value, 10) || 0;

            let filteredProperties = [...allProperties];

            // Applique le filtre "Type"
            if (selectedTypes.length > 0) {
                filteredProperties = filteredProperties.filter(property => selectedTypes.includes(property.type));
            }

            // Applique le filtre "Prix"
            filteredProperties = filteredProperties.filter(property => {
                const propertyPrice = parsePrice(property.price);
                return propertyPrice >= minPrice && propertyPrice <= maxPrice;
            });

            // Applique le filtre "Localisation"
            if (selectedLocations.length > 0) {
                filteredProperties = filteredProperties.filter(property => selectedLocations.includes(property.location));
            }

            // Applique le filtre "Pièces"
            filteredProperties = filteredProperties.filter(property => {
                const p = property.rooms;
                return p.chambres >= requiredChambres && p.bains >= requiredBains && p.autres >= requiredAutres;
            });

            // Affiche les résultats filtrés
            renderProperties(filteredProperties);
        }
        

        // --- 4. GESTION DES ÉVÉNEMENTS DES FILTRES ---
        const typeFilterBtn = document.getElementById('type-filter-btn');
        const typeDropdownMenu = document.getElementById('type-dropdown-menu');
        const priceFilterBtn = document.getElementById('price-filter-btn');
        const priceDropdownMenu = document.getElementById('price-dropdown-menu');
        const locationFilterBtn = document.getElementById('location-filter-btn');
        const locationDropdownMenu = document.getElementById('location-dropdown-menu');
        const roomsFilterBtn = document.getElementById('rooms-filter-btn');
        const roomsDropdownMenu = document.getElementById('rooms-dropdown-menu');

        function setupFilter(btn, menu) {
            const indicator = btn.querySelector('.filter-indicator');
            const validateBtn = menu.querySelector('.btn-dropdown-validate');

            btn.addEventListener('click', e => {
                e.stopPropagation();
                // Ferme tous les autres menus
                document.querySelectorAll('.filter-dropdown.show').forEach(m => {
                    if (m !== menu) m.classList.remove('show');
                });
                menu.classList.toggle('show');
            });

            validateBtn.addEventListener('click', () => {
                let isActive = false;
                if (menu.id === 'type-dropdown-menu' || menu.id === 'location-dropdown-menu') {
                    isActive = menu.querySelectorAll('input:checked').length > 0;
                } else {
                    const inputs = menu.querySelectorAll('input');
                    isActive = Array.from(inputs).some(input => input.value !== '');
                }
                indicator.classList.toggle('active', isActive);
                menu.classList.remove('show');
                applyAllFilters();
            });
        }

        if (typeFilterBtn) setupFilter(typeFilterBtn, typeDropdownMenu);
        if (priceFilterBtn) setupFilter(priceFilterBtn, priceDropdownMenu);
        if (locationFilterBtn) setupFilter(locationFilterBtn, locationDropdownMenu);
        if (roomsFilterBtn) setupFilter(roomsFilterBtn, roomsDropdownMenu);

        // Ferme les menus déroulants si on clique n'importe où sur la page
        window.addEventListener('click', () => {
            document.querySelectorAll('.filter-dropdown.show').forEach(m => m.classList.remove('show'));
        });

        // Empêche la fermeture quand on clique à l'intérieur d'un menu
        document.querySelectorAll('.filter-dropdown').forEach(menu => {
            menu.addEventListener('click', e => e.stopPropagation());
        });
        
        // --- 5. INITIALISATION AU CHARGEMENT DE LA PAGE ---
        // Affiche toutes les propriétés au début.
        renderProperties(allProperties);
    }

    
});