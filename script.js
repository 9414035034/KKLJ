// Mobile menu toggle
document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector("nav").classList.toggle("active");
});

// Close menu when clicking menu items
document.querySelectorAll("nav a").forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelector("nav").classList.remove("active");
  });
});

// Scroll to contact section
function scrollToContact() {
  document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
}

// Toggle share menu
document.getElementById("favButton").addEventListener("click", function () {
  document.getElementById("shareMenu").classList.toggle("active");
});

// Share functions
function shareOnWhatsApp() {
  const text = "Discover KKLJ Energy - Your Partner in Sustainable Power Solutions!";
  const url = window.location.href;
  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
}

function shareViaEmail() {
  const subject = "KKLJ Energy - Sustainable Power Solutions";
  const body = "Explore innovative and reliable energy solutions by KKLJ Energy: " + window.location.href;
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function copyLink() {
  const el = document.createElement("textarea");
  el.value = window.location.href;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("Link copied to clipboard!");
}

// Close share menu when clicking outside
document.addEventListener("click", function (event) {
  const shareMenu = document.getElementById("shareMenu");
  const favButton = document.getElementById("favButton");
  if (!favButton.contains(event.target) && !shareMenu.contains(event.target) && shareMenu.classList.contains("active")) {
    shareMenu.classList.remove("active");
  }
});

// Carousel functionality
const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicators = document.querySelectorAll(".indicator");
let currentIndex = 0;
const totalSlides = document.querySelectorAll(".carousel-slide").length;

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  indicators.forEach((ind, idx) => {
    ind.classList.toggle("active", idx === currentIndex);
  });
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });
}

indicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    currentIndex = parseInt(indicator.getAttribute("data-index"));
    updateCarousel();
  });
});

// Auto-slide every 3 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 3000);

// Form validation and submission
document.getElementById("inquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,12}$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!phoneRegex.test(phone.replace(/[-()\s]/g, ""))) {
    alert("Please enter a valid phone number (10-12 digits).");
    return;
  }

  // Submit data to the form endpoint
  fetch("https://submit-form.com/NSYjvkmBl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: email,
      phone: phone,
      message: document.getElementById("message").value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Thank you for your inquiry! We will get back to you soon.");
        document.getElementById("inquiryForm").reset();
      } else {
        alert("There was a problem submitting your inquiry. Please try again.");
      }
    })
    .catch((error) => {
      alert("Network error. Please try again later.");
    });
});