const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dots .dot"));
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const sections = Array.from(document.querySelectorAll("section[id]"));
const navLinks = Array.from(document.querySelectorAll(".navbar a"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
let currentSlide = 0;
let autoPlay;
let touchStartX = 0;
let touchDeltaX = 0;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function resetAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(nextSlide, 5000);
}

function updateActiveNav() {
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`,
    );
  });
}

function revealOnScroll() {
  revealItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      item.classList.add("visible");
    }
  });
}

prevBtn?.addEventListener("click", () => {
  prevSlide();
  resetAutoPlay();
});

nextBtn?.addEventListener("click", () => {
  nextSlide();
  resetAutoPlay();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetAutoPlay();
  });
});

menuBtn?.addEventListener("click", () => {
  navbar?.classList.toggle("active");
  const icon = menuBtn.querySelector("i");
  if (icon) {
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  }
});

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar?.classList.remove("active");
    const icon = menuBtn?.querySelector("i");
    if (icon) {
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    }
  });
});

window.addEventListener("scroll", () => {
  updateActiveNav();
  revealOnScroll();
});

window.addEventListener("load", () => {
  updateActiveNav();
  revealOnScroll();
  showSlide(0);
  resetAutoPlay();
});

// touch / swipe support for mobile
const carouselTrackEl = document.querySelector(".carousel-track");
if (carouselTrackEl) {
  carouselTrackEl.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchDeltaX = 0;
    },
    { passive: true },
  );

  carouselTrackEl.addEventListener(
    "touchmove",
    (e) => {
      touchDeltaX = e.touches[0].clientX - touchStartX;
    },
    { passive: true },
  );

  carouselTrackEl.addEventListener("touchend", () => {
    if (Math.abs(touchDeltaX) > 50) {
      if (touchDeltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoPlay();
    }
    touchStartX = 0;
    touchDeltaX = 0;
  });
}

const contactForm = document.querySelector("#contactForm");

// ===== EmailJS Config =====
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (e.g. Gmail) -> copy the Service ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Copy your Public Key from Account > General
// 5. Replace the 3 values below
const EMAILJS_PUBLIC_KEY = "m0JE0vQLQwZRtyMl2";
const EMAILJS_SERVICE_ID = "service_7m8vkyn";
const EMAILJS_TEMPLATE_ID = "template_swx07tl";

if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

if (contactForm) {
  const nameInput = contactForm.querySelector("#name");
  const emailInput = contactForm.querySelector("#email");
  const subjectInput = contactForm.querySelector("#subject");
  const messageInput = contactForm.querySelector("#message");
  const result = document.querySelector("#result");
  const submitBtn = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const subject = subjectInput?.value.trim() || "";
    const message = messageInput?.value.trim() || "";

    if (!name || !email || !subject || !message) {
      if (result) {
        result.textContent = "Please fill in all fields.";
        result.style.color = "#ff8a80";
      }
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      if (result) {
        result.textContent = "Please enter a valid email address.";
        result.style.color = "#ff8a80";
      }
      return;
    }

    if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      if (result) {
        result.textContent =
          "Email service not configured yet. See java.js for setup steps.";
        result.style.color = "#ff8a80";
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      })
      .then(() => {
        if (result) {
          result.textContent = "Message sent successfully.";
          result.style.color = "#8bf5b2";
        }
        contactForm.reset();
      })
      .catch((err) => {
        if (result) {
          result.textContent =
            "Something went wrong: " +
            (err?.text || err?.message || JSON.stringify(err));
          result.style.color = "#ff8a80";
        }
        console.error("EmailJS error:", err);
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        }
      });
  });
}
