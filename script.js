// --- Custom Cursor ---
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  if (cursor) {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
  }
  if (follower) {
    follower.style.top = e.clientY - 20 + "px";
    follower.style.left = e.clientX - 20 + "px";
  }
});

// --- Mobile Menu Toggle ---
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });
}

// --- Magnetic Effect ---
const magnetic = document.querySelectorAll(".magnetic");
magnetic.forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

// --- Scroll Reveal Logic (Prevents hidden content on refresh) ---
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      el.classList.add("active");
    }
  });
}

// Event Listeners for Reveal
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
// Initial trigger for content already in view
revealOnScroll();

// --- Set Current Year ---
const yearSpan = document.getElementById('year');
if(yearSpan) yearSpan.textContent = new Date().getFullYear();