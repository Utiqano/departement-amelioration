document.addEventListener("DOMContentLoaded", function () {

    // 🔹 Show Section with Smooth Transition
    window.showSection = function (id) {
        document.getElementById("menu").style.display = "none";
        
        let sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
            setTimeout(() => { section.style.display = 'none'; }, 500);
        });

        setTimeout(() => {
            let target = document.getElementById(id);
            if (target) {
                target.style.display = 'block';
                setTimeout(() => target.classList.add('active'), 10);
            }
        }, 500);
    };

    // 🔹 Return to Menu
    window.retourMenu = function () {
        let sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
            setTimeout(() => { section.style.display = 'none'; }, 500);
        });

        setTimeout(() => {
            document.getElementById("menu").style.display = "block";
        }, 500);
    };

    // 🔹 Contact Form Submission
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        alert("Message envoyé !");
        this.reset();
    });
});
