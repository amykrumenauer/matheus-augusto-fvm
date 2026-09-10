/* =========================================================
   MATHEUS AUGUSTO — JAVASCRIPT
========================================================= */


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 700);

});


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

if (menuButton) {

  menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.classList.toggle("menu-open");

  });

}


navLinks.forEach(link => {

  link.addEventListener("click", () => {

    menuButton.classList.remove("active");
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");

  });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const cursorLabel = document.querySelector(".cursor-label");

if (window.innerWidth > 800 && cursor && cursorLabel) {

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

  });


  function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    cursorLabel.style.left = `${cursorX}px`;
    cursorLabel.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  const interactiveElements = document.querySelectorAll(
    "a, button, .image-link, .instagram-post"
  );


  interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

      cursor.classList.add("active");
      cursorLabel.classList.add("active");

      if (element.classList.contains("instagram-post")) {
        cursorLabel.textContent = "LINK";
      } else {
        cursorLabel.textContent = "VIEW";
      }

    });


    element.addEventListener("mouseleave", () => {

      cursor.classList.remove("active");
      cursorLabel.classList.remove("active");

    });

  });

}


/* =========================================================
   PARALLAX LEVE
========================================================= */

const heroImage = document.querySelector(".hero-image");

window.addEventListener("scroll", () => {

  if (!heroImage) return;

  const scrollPosition = window.scrollY;

  if (scrollPosition < window.innerHeight) {

    heroImage.style.transform =
      `translateY(${scrollPosition * 0.08}px)`;

  }

});


/* =========================================================
   INSTAGRAM PLACEHOLDERS
========================================================= */

const instagramPosts = document.querySelectorAll(
  'a[href^="INSTAGRAM_"]'
);


instagramPosts.forEach(post => {

  post.addEventListener("click", event => {

    event.preventDefault();

    console.log(
      "Substitua o href deste post pelo link real do Instagram."
    );

  });

});


/* =========================================================
   IMAGE LINK PLACEHOLDERS
========================================================= */

const emptyLinks = document.querySelectorAll(
  'a[href="#"]'
);


emptyLinks.forEach(link => {

  link.addEventListener("click", event => {

    const href = link.getAttribute("href");

    if (href === "#") {

      event.preventDefault();

    }

  });

});


/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

const yearElements = document.querySelectorAll(".current-year");

yearElements.forEach(element => {

  element.textContent = new Date().getFullYear();

});