document.addEventListener("DOMContentLoaded", function () {
    window.showSection = function (id) {
        let menu = document.getElementById("menu");
        let section = document.getElementById(id);

        menu.style.opacity = "0";
        setTimeout(() => {
            menu.style.display = "none";
            section.style.display = "block";
            setTimeout(() => section.classList.add("active"), 50);
        }, 300);
    };

    window.retourMenu = function () {
        let menu = document.getElementById("menu");
        let activeSection = document.querySelector(".section.active");

        if (activeSection) {
            activeSection.classList.remove("active");
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

    document.getElementById("contactForm")?.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Veuillez remplir tous les champs avant d'envoyer.");
            return;
        }

        alert("Message envoyé !");
        this.reset();
    });

    // 🔹 Ripple Effect on Buttons
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

    // 🔹 Drag-and-Drop List Functionality
    const listItems = document.querySelectorAll("#sortable-list li");
    let draggedItem = null;

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
            const siblings = [...container.children].filter((child) => child !== draggingItem);
            
            let nextSibling = siblings.find(sibling => e.clientY < sibling.getBoundingClientRect().top + sibling.offsetHeight / 2);
            container.insertBefore(draggingItem, nextSibling);
        });
    });
});
function showPercentage(name, value) {
    document.getElementById("percentageResult").innerHTML = `<h3>${name} : ${value}</h3>`;
}
