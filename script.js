document.addEventListener("DOMContentLoaded", function () {
    // Affichage des sections (reste inchangé)
    window.showSection = function (id) {
        let menu = document.getElementById("menu");
        let section = document.getElementById(id);
        menu.style.opacity = "0";
        setTimeout(() => {
            menu.style.display = "none";
            section.style.display = "block";
            section.classList.add("fade-in");
            setTimeout(() => section.classList.add("active"), 50);
        }, 300);
    };

    window.retourMenu = function () {
        let menu = document.getElementById("menu");
        let activeSection = document.querySelector(".section.active");
        if (activeSection) {
            activeSection.classList.remove("active");
            activeSection.classList.remove("fade-in");
            setTimeout(() => {
                activeSection.style.display = "none";
                menu.style.display = "block";
                setTimeout(() => (menu.style.opacity = "1"), 50);
            }, 300);
        }
    };

    window.afficherPDF = function (pdfUrl) {
        if (pdfUrl) {
            window.open(pdfUrl, "_blank");
        } else {
            alert("Le document PDF est introuvable.");
        }
    };

    // Formulaire de contact avec message de confirmation en fade-out
    document.getElementById("contactForm")?.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Veuillez remplir tous les champs avant d'envoyer.");
            return;
        }

        // Préparer les paramètres du template
        const templateParams = {
            name: name,
            email: email,
            message: message,
        };

        // Envoi du message via EmailJS
        emailjs.send('service_bvzi4ft', 'template_imkem7x', templateParams)
            .then(response => {
                console.log('Succès de l\'envoi:', response);
                alert('Votre message a été envoyé avec succès !');
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi du message:', error);
                alert('Désolé, une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
            });

        // Message de succès avec fade-out
        const formMessage = document.getElementById("formMessage");
        formMessage.textContent = "Message envoyé avec succès !";
        formMessage.classList.add("show");

        setTimeout(() => {
            formMessage.classList.remove("show");
        }, 3000);

        this.reset();
    });

    // Effet Ripple sur les boutons
    document.querySelectorAll(".btn-custom").forEach((button) => {
        button.addEventListener("click", function (e) {
            let ripple = document.createElement("span");
            ripple.classList.add("ripple");
            let rect = this.getBoundingClientRect();
            let size = Math.max(rect.width, rect.height);
            let x = e.clientX - rect.left - size / 2;
            let y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Drag-and-Drop pour la liste triable
    let draggedItem = null;
    const listItems = document.querySelectorAll("#sortable-list li");
    listItems.forEach((item) => {
        item.addEventListener("dragstart", function () {
            draggedItem = this;
            setTimeout(() => this.classList.add("dragging"), 0);
        });
        item.addEventListener("dragend", function () {
            this.classList.remove("dragging");
            draggedItem = null;
        });
        item.addEventListener("dragover", function (e) {
            e.preventDefault();
            const draggingItem = document.querySelector(".dragging");
            const container = this.parentElement;
            const siblings = [...container.children].filter(child => child !== draggingItem);
            let nextSibling = siblings.find(sibling => e.clientY < sibling.getBoundingClientRect().top + sibling.offsetHeight / 2);
            if (nextSibling) {
                container.insertBefore(draggingItem, nextSibling);
            } else {
                container.appendChild(draggingItem);
            }
        });
    });

    // Navbar toggle pour mobile (menu hamburger)
    const mobileMenuToggle = document.getElementById("mobile-menu");
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener("click", function () {
            const navbarMenu = document.getElementById("navbar-menu");
            navbarMenu.classList.toggle("active");
        });
    }

    // Fermer le menu mobile après avoir cliqué sur un lien de la navbar
    document.querySelectorAll("#navbar-menu li a").forEach((link) => {
        link.addEventListener("click", function () {
            const navbarMenu = document.getElementById("navbar-menu");
            if (navbarMenu.classList.contains("active")) {
                navbarMenu.classList.remove("active");
            }
        });
    });
});

// Afficher un pourcentage avec le nom
function showPercentage(name, value) {
    document.getElementById("percentageResult").innerHTML = `<h3>${name} : ${value}</h3>`;
}
