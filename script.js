document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active");
      nav.classList.toggle("active");

      // Toggle menu button appearance
      const spans = this.querySelectorAll("span");
      if (this.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";

        // Show mobile nav
        nav.style.display = "block";
        setTimeout(() => {
          nav.style.opacity = "1";
        }, 10);
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";

        // Hide mobile nav
        nav.style.opacity = "0";
        setTimeout(() => {
          nav.style.display = "";
        }, 300);
      }
    });
  }

  // Modal functionality
  const modal = document.getElementById("appointmentModal");
  const scheduleBtn = document.getElementById("scheduleBtn");
  const closeModal = document.querySelector(".close-modal");

  if (scheduleBtn && modal) {
    scheduleBtn.addEventListener("click", function () {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  }

  if (closeModal && modal) {
    closeModal.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Form submission
  const appointmentForm = document.getElementById("appointmentForm");

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Agendamento concluído! Em breve, você receberá um e-mail de confirmação."
      );
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (nav.classList.contains("active")) {
          mobileMenuBtn.click();
        }

        // Scroll to element
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll animations
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".service-card, .barber-card, .contact-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.classList.add("animate");
      }
    });
  };

  // Add animation classes
  const cards = document.querySelectorAll(
    ".service-card, .barber-card, .contact-card"
  );
  cards.forEach((card) => {
    card.style.opacity = "1";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Initial check for elements in view
  animateOnScroll();

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Add active class to navigation based on scroll position
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.querySelectorAll(".nav a").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  });
});
