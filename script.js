            //Variabler som anvendes i koden og som henter elementer fra HTML
            const carousel = document.querySelector('.carousel'); //henviser til class carousel i HTML
            const images = Array.from(carousel.querySelectorAll('img')); //henviser til img i HTML
            const indicatorsContainer = document.querySelector('.carousel-indicators');//henviser til class carousel-indicators i HTML
            let currentIndex = 0; //currentIndex sættes til 0 fordi det er det første billede der skal vises

            images[currentIndex].classList.add('active'); //tilføjer class active til det første billede

            //pilene til at skifte billede defineres
            const prevButton = carousel.querySelector('.prev');
            const nextButton = carousel.querySelector('.next');

            prevButton.addEventListener('click', () => updateCarousel(currentIndex - 1)); //når der klikkes på pilen til venstre, skal der vises det forrige billede, currentIndex sættes til -1 for at gå tilbage til det forrige billede
            nextButton.addEventListener('click', () => updateCarousel(currentIndex + 1)); //når der klikkes på pilen til højre, skal der vises det næste billede. CurrentIndex sættes til +1 for at gå til næste billede
            


            //--------Billederne skifter selv---------//

            setInterval(() => updateCarousel(currentIndex + 1), 3000); /*setInterval er en funktion som kører en funktion efter et bestemt tidsinterval. I dette tilfælde 3000 millisekunder, altså 3 sekunder.
            updateCarousel er en funktion som kaldes efter 3 sekunder, og som viser det næste billede i rækken.
            Denne funktion kører altså hele tiden, og viser det næste billede i rækken efter 3 sekunder.
            */


            //--------Indikatorerne defineres---------//

            /* image is the current image being processed, and index is its index in the images array. The function creates a new div, adds the carousel-indicator class to it, sets up a click event listener that calls updateCarousel(index), appends the new div to indicatorsContainer, and then returns the new div. The map() function then returns a new array containing all these new div elements.*/

            const indicators = images.map((image, index) => {//images.map er en funktion som kører igennem alle billederne i rækken, og laver en indikator for hvert billede. index er et tal som starter på 0 og tæller op for hvert billede, som blev defineret i variablen currentIndex
                const indicator = document.createElement('div');
                indicator.classList.add('carousel-indicator');
                indicator.addEventListener('click', () => updateCarousel(index));
                indicatorsContainer.appendChild(indicator); //appendChild er en funktion som tilføjer et element til et andet element. I dette tilfælde tilføjes indikatorerne til indicatorsContainer
                return indicator;
            });

            //--------Funktionen til at skifte billede---------//
            const updateCarousel = (newIndex) => { //newIndex er et tal som starter på 0 og tæller op for hvert billede, som blev defineret i variablen currentIndex
                images[currentIndex].classList.remove('active'); //fjerner class active fra det nuværende billede
                currentIndex = (newIndex + images.length) % images.length; //currentIndex sættes til newIndex, som er det næste billede i rækken. images.length er antallet af billeder i rækken. % er modulus, som er resten af en division. Hvis der er 3 billeder i rækken, og currentIndex er 2, så er 2+3=5, og 5%3=2, så currentIndex er 2, som er det første billede i rækken.
                images[currentIndex].classList.add('active'); //tilføjer class active til det næste billede
                updateIndicators(); //kalder funktionen updateIndicators, som kan ses nedenunder
            };

            //--------Funktionen til at opdatere indikatorerne---------//
            const updateIndicators = () => {
                indicators.forEach((indicator, index) => { //forEach er en funktion som kører igennem alle indikatorerne. her er index et tal som starter på 0 og tæller op for hvert billede, som blev defineret i variablen currentIndex. indicator er hver indikator, som blev defineret i variablen indicators
                    if (index === currentIndex) { //hvis index er det samme som currentIndex, så skal indikatoren være aktiv
                        indicator.classList.add('active'); //tilføjer class active til indikatoren
                    } else {
                        indicator.classList.remove('active'); //ellers fjernes class active fra indikatoren
                    }
                });
            };

            updateIndicators(); //kalder funktionen updateIndicators, som kan ses ovenover

/*------------------Accordion------------------*/

document.querySelectorAll('.accordion-item h2').forEach((accordionToggle) => { //querySelectorAll er en funktion som henter alle elementer med class accordion-item h2 i HTML
    accordionToggle.addEventListener('click', () => { //når der klikkes på et accordionToggle, skal der ske noget
        const accordionItem = accordionToggle.parentNode; //accordionItem er det element som accordionToggle er inde i. parentNode er det element som er lige over accordionToggle i HTML. I dette tilfælde er det accordionItem. parentNode er en funktion som henter det element som er lige over det element som funktionen er inde i.
        const accordionContent = accordionToggle.nextElementSibling; //accordionContent er det element som er lige under accordionToggle i HTML. nextElementSibling er en funktion som henter det element som er lige under det element som funktionen er inde i.
        //de to variabler ovenover bruges senere i koden til at åbne og lukke accordionen og til at tilføje og fjerne class active

        // If this accordion item is already open, close it.
        if (accordionContent.style.maxHeight) { //hvis accordionContent.style.maxHeight er sandt, så skal accordionen lukkes
            accordionContent.style.maxHeight = null; //maxHeight er en funktion som sætter højden på et element. accordionContent er det element som er lige under accordionToggle i HTML. accordionContent.style.maxHeight sættes til null, som er 0px. Dette gør at accordionen lukkes.
            accordionItem.classList.remove('active'); //fjerner class active fra accordionItem
        } else {
            // ellers skal accordionen åbnes
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; //scrollHeight er en funktion som henter højden på et element. accordionContent er det element som er lige under accordionToggle i HTML. accordionContent.style.maxHeight sættes til accordionContent.scrollHeight + 'px', som er højden på accordionContent. + 'px' er en string som tilføjes til højden på accordionContent, fordi accordionContent.style.maxHeight skal være en string.
            accordionItem.classList.add('active'); //tilføjer class active til accordionItem
        }
    });
});

/*------------------Burger menu------------------*/
const menu = document.querySelector('nav ul'); //variabel som henter elementet nav ul i HTML
const closeButton = document.querySelector('.close-menu'); //variabel som henter elementet med class close-menu i HTML

document.querySelector('.hamburger-menu').addEventListener('click', () => {
    menu.classList.toggle('show'); //toggle er en funktion som tilføjer class show til menu, hvis den ikke har class show, og fjerner class show fra menu, hvis den har class show
    closeButton.style.display = menu.classList.contains('show') ? 'block' : 'none';//if else statement. Hvis menu.classList indeholder class show, så skal closeButton vises, ellers skal closeButton ikke vises
});

closeButton.addEventListener('click', () => { //når der klikkes på closeButton, skal der ske noget
    menu.classList.remove('show');//fjerner class show fra menu
    closeButton.style.display = 'none'; //skjuler closeButton
});