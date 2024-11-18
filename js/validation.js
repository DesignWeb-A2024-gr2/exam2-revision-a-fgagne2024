// Objet regex dont le pattern est de permettre seulement des chiffres
const REGEX_SEULEMENT_CHIFFRE = /^\d+$/;

// Les éléments html du formulaire utilisés dans le script
const inputNoDA = document.getElementById('numero_da');             // Le input du numéro de da
const declaration = document.getElementById('declaration');         // Le checkbox de la déclaration
const sliderNote = document.getElementById('note_estime');          // Le slider de sélection de la note estimée
const titreNote = document.getElementById('titre_note_estime');     // Le titre de la note estimé
const daIconeErreur = document.getElementById('da_icone_erreur');   // L'icone d'erreur associée au input du numéro de da
const daIconeSucces = document.getElementById('da_icone_succes');   // L'icone de succès associée au input du numéro de da
const validePourSubmit = false;
const messageDa = document.getElementById("message_numero_da");
const messageDecla = document.getElementById("message_declaration");

inputNoDA.addEventListener("input",ValidationDa);
sliderNote.addEventListener("input",Note);

// Initialisation de l'affichage de la bonne icone associé au numéro de da
daIconeErreur.classList.remove('hidden');
daIconeSucces.classList.add('hidden');

/**
 * Modifie les classes d'un élément icone selon la valeur d'une note
 * @param {integer} note La note utilisée pour savoir qu'elle classe prendre
 */
function ModifierIconeNote(note) {
    // l'élément icone qui sera modifié
    const iconeNote = document.getElementById('icone_note');
    // On initialise les classes de l'élément à "vide"
    
    if(note<20){
        iconeNote.setAttribute("class", "far fa-sad-cry");

    }
    else if(note<40){
        iconeNote.setAttribute("class", "far fa-sad-tear");
    }
    else if(note<60){
        iconeNote.setAttribute("class", "far fa-frown");
    }
    else if(note<80){
        iconeNote.setAttribute("class", "far fa-smile");
    }
    else{
        iconeNote.setAttribute("class", "far fa-grin-squint-tears");
    }
    // Ajout des bonnes classes selon la valeur de la note
    // À COMPLÉTER
}

/**
 * Affiche un message dans la première balise small du même niveau qu'un élément html
 * @param {HTMLElement} element L'élément html de départ
 * @param {string} message Le message à afficher
 */
function AfficherMessage(element, message = '') {
    const zoneMessage = element.parentElement.querySelector('small');
    zoneMessage.innerHTML = message;
}

/**
 * Génère un nombre entier aléatoirement
 * @param {int} min La valeur minimum du nombre généré
 * @param {int} max La valeur maximum du nombre généré
 * @returns Un nombre entier
 */
function ObtenirNombreAleatoire(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function ValidationDa(){
    messageDa.innerHTML = ""
    let a = SeulementChiffre()
    let b = Longueur()
    let c =PremierCarac()
    let valide = false;
    if(a&&b&&c){
        
        daIconeSucces.classList.remove('hidden');
        daIconeErreur.classList.add('hidden');
        valide = true;
    }
    else{
        
        daIconeErreur.classList.remove('hidden');
        daIconeSucces.classList.add('hidden');
        
    }
    return valide;
}

function SeulementChiffre(){
    let valide = false;
    if(REGEX_SEULEMENT_CHIFFRE.test(inputNoDA.value)){
        valide = true;

    }
    else{
        console.log("chiffre");
        messageDa.innerHTML += "le nunero de DA n'est pas uniquement compose de chiffres<br>" 
    }
    return valide;
}
function Longueur(){
    
    let valide = false;
    if(inputNoDA.value.length == 7){
        valide = true;
    }
    else{
        console.log("longueur")
        messageDa.innerHTML += "le nunero de DA n'as pas une longueur de 7 chiffres <br>"

    }
    return valide;

}
function PremierCarac(){
    let valide = false;
    if(inputNoDA.value[0]==1||inputNoDA.value[0]==2){
        valide = true;

    }
    else{
        console.log("prCarac")
        messageDa.innerHTML += "le nunero de DA ne commence pas par 1 ou par 2 <br>"
    }
    return valide;
}



function Note(){
    ModifierIconeNote(sliderNote.value);
    titreNote.innerText = "Ma note estimée ="+sliderNote.value+"%"; 
}

function ValideSubmit(){
    messageDa.innerHTML = ""
    
    let valide = false;
    if(ValidationDa()&&declaration.checked == true){
        valide = true;
    }
    else if (declaration.checked == false){
        messageDecla.innerHTML = "Vous devez lire la declaration"
    }

    return valide;
}