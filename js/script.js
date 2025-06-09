const properties = {
            1: {
                title: "Maison sur Fetilly La Rochelle",
                price: "364 000 €",
                surface: "87 m²",
                surfaceTotal: "122 m²",
                image: "house"
            },
            2: {
                title: "Villa moderne avec piscine",
                price: "485 000 €",
                surface: "120 m²",
                surfaceTotal: "150 m²",
                image: "villa"
            },
            3: {
                title: "Appartement centre-ville",
                price: "220 000 €",
                surface: "65 m²",
                surfaceTotal: "65 m²",
                image: "apartment"
            },
            4: {
                title: "Maison de caractère",
                price: "395 000 €",
                surface: "95 m²",
                surfaceTotal: "180 m²",
                image: "character"
            },
            5: {
                title: "Propriété insolite sur l'eau",
                price: "750 000 €",
                surface: "110 m²",
                surfaceTotal: "200 m²",
                image: "water"
            }
        };

// Fonction pour afficher une propriété
function showProperty(id) {
    const property = properties[id];
    const preview = document.getElementById('property-preview');
    
    // Animation de transition
    preview.style.transform = 'scale(0.95)';
    preview.style.opacity = '0.7';
    
    setTimeout(() => {
        // Mise à jour du contenu
        preview.querySelector('.property-title').textContent = property.title;
        preview.querySelector('.property-price').textContent = property.price;
        preview.querySelector('.property-info').innerHTML = `
            <div><strong>Surface :</strong> ${property.surface}</div>
            <div><strong>Surface totale :</strong> ${property.surfaceTotal}</div>
        `;
        
        // Animation de retour
        preview.style.transform = 'scale(1)';
        preview.style.opacity = '1';
    }, 200);
}

// Navigation entre les pages
function goToPageVide() {
    document.getElementById('accueil').style.display = 'none';
    document.getElementById('page-vide').style.display = 'block';
}

function goToAccueil() {
    document.getElementById('page-vide').style.display = 'none';
    document.getElementById('accueil').style.display = 'block';
}

// Initialisation - afficher la première propriété
document.addEventListener('DOMContentLoaded', function() {
    showProperty(1);
});