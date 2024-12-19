// Texte à animer
const text = "Create your own galaxy...|ARE YOU READY? GO !";

// Vitesse de l'animation
const speed = {
    forward: 300, // Vitesse de frappe
    wait: 1000,  // Temps d'attente avant d'effacer
    backspace: 30, // Vitesse d'effacement
    betweenLines: 500 // Temps entre les lignes
};

// Lancer l'animation
typeWriter("output", text);

function typeWriter(id, text) {
    const element = document.getElementById(id);
    if (!element) {
        console.error("Élément non trouvé !");
        return;
    }

    const eHeader = element.querySelector("h1");
    const eParagraph = element.querySelector("p");

    let index = 0; // Index du caractère actuel
    let isBackspacing = false;
    let isParagraph = false;

    function animate() {
        if (isBackspacing) {
            // Effacement
            if (eParagraph.textContent.length > 0) {
                eParagraph.textContent = eParagraph.textContent.slice(0, -1);
            } else if (eHeader.textContent.length > 0) {
                eHeader.textContent = eHeader.textContent.slice(0, -1);
            } else {
                isBackspacing = false;
                index = 0; // Réinitialiser pour recommencer si besoin
                return;
            }
            setTimeout(animate, speed.backspace);
        } else {
            // Ajout de texte
            if (index < text.length) {
                if (text.charAt(index) === "|") {
                    isParagraph = true;
                    eHeader.classList.remove("cursor");
                    eParagraph.classList.add("cursor");
                    index++;
                    setTimeout(animate, speed.betweenLines);
                } else {
                    const target = isParagraph ? eParagraph : eHeader;
                    target.textContent += text.charAt(index);
                    index++;
                    setTimeout(animate, speed.forward);
                }
            } else {
                isBackspacing = true;
                setTimeout(animate, speed.wait);
            }
        }
    }

    animate();
}
