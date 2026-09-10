/* =========================================================
   MATHEUS AUGUSTO — FOTOGRAFIA & VIDEOMAKER
   Main JavaScript
========================================================= */


/* =========================================================
   CAMERA LOADER
========================================================= */

const loader = document.querySelector(".camera-loader");
const timer = document.querySelector("#loader-timer");
const flash = document.querySelector(".loader-flash");

let loaderSeconds = 0;
let loaderFinished = false;
let loaderInterval = null;

function finishLoader() {
    if (loaderFinished) return;

    loaderFinished = true;

    if (loaderInterval) {
        clearInterval(loaderInterval);
        loaderInterval = null;
    }

    if (flash) {
        flash.classList.add("active");
    }

    setTimeout(() => {
        if (loader) {
            loader.classList.add("hide");
        }

        document.body.classList.add("loaded");
    }, 350);
}


/* Contador do loader */

if (timer) {
    loaderInterval = setInterval(() => {
        loaderSeconds++;

        const hours = String(
            Math.floor(loaderSeconds / 3600)
        ).padStart(2, "0");

        const minutes = String(
            Math.floor((loaderSeconds % 3600) / 60)
        ).padStart(2, "0");

        const seconds = String(
            loaderSeconds % 60
        ).padStart(2, "0");

        timer.textContent =
            `${hours}:${minutes}:${seconds}`;
    }, 1000);
}


/* Finaliza quando a página carregar */

window.addEventListener("load", () => {
    setTimeout(() => {
        finishLoader();
    }, 1200);
});


/* Segurança caso alguma imagem demore */

setTimeout(() => {
    finishLoader();
}, 5000);


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav");

function closeMenu() {
    if (!menuButton || !navigation) return;

    navigation.classList.remove("open");
    menuButton.classList.remove("open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Abrir menu"
    );

    document.body.classList.remove("menu-open");
}

function openMenu() {
    if (!menuButton || !navigation) return;

    navigation.classList.add("open");
    menuButton.classList.add("open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    menuButton.setAttribute(
        "aria-label",
        "Fechar menu"
    );

    document.body.classList.add("menu-open");
}

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {
        const isOpen =
            navigation.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });


    /* Fecha ao clicar em algum link */

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });


    /* Fecha com ESC */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });


    /* Fecha quando volta para desktop */

    window.addEventListener("resize", () => {
        if (window.innerWidth > 800) {
            closeMenu();
        }
    });
}


/* =========================================================
   SCROLL SUAVE
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const header =
            document.querySelector(".header");

        const headerHeight =
            header ? header.offsetHeight : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    });

});


/* =========================================================
   HEADER — EFEITO AO ROLAR
========================================================= */

const header =
    document.querySelector(".header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================================
   REVEAL — ANIMAÇÕES DE ENTRADA
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================================
   CURSOR PERSONALIZADO
========================================================= */

const cursor =
    document.querySelector(".cursor");

const cursorLabel =
    document.querySelector(".cursor-label");

const hasFinePointer =
    window.matchMedia &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


/*
   Seu HTML possui apenas:
   .cursor
   .cursor-label

   Portanto não usamos .cursor-follower.
*/

if (
    cursor &&
    cursorLabel &&
    hasFinePointer
) {

    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;

            cursorLabel.style.left =
                `${mouseX}px`;

            cursorLabel.style.top =
                `${mouseY}px`;
        }
    );


    /* Elementos interativos */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .project, .story, .instagram-post, .hero-image, .cats-image"
        );

    interactiveElements.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.classList.add(
                        "active"
                    );

                    cursorLabel.classList.add(
                        "active"
                    );
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.classList.remove(
                        "active"
                    );

                    cursorLabel.classList.remove(
                        "active"
                    );
                }
            );
        }
    );

} else {

    if (cursor) {
        cursor.style.display = "none";
    }

    if (cursorLabel) {
        cursorLabel.style.display = "none";
    }
}


/* =========================================================
   PARALLAX DO HERO
========================================================= */

const hero =
    document.querySelector(".hero");

const heroImage =
    document.querySelector(".hero-image");

if (
    hero &&
    heroImage &&
    hasFinePointer
) {

    let parallaxTicking = false;

    function updateParallax() {

        if (window.innerWidth <= 800) {

            heroImage.style.transform =
                "";

            parallaxTicking = false;

            return;
        }

        const rect =
            hero.getBoundingClientRect();

        if (
            rect.bottom > 0 &&
            rect.top < window.innerHeight
        ) {

            const progress =
                (
                    window.innerHeight -
                    rect.top
                ) /
                (
                    window.innerHeight +
                    rect.height
                );

            const movement =
                (progress - 0.5) * 25;

            heroImage.style.transform =
                `translate3d(0, ${movement}px, 0)`;
        }

        parallaxTicking = false;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (!parallaxTicking) {

                requestAnimationFrame(
                    updateParallax
                );

                parallaxTicking = true;
            }
        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateParallax
    );

    updateParallax();
}


/* =========================================================
   HOVER DAS IMAGENS
========================================================= */

/*
   O efeito principal já está no CSS.
   Aqui adicionamos apenas uma classe auxiliar
   para manter compatibilidade com interações futuras.
*/

const imageLinks =
    document.querySelectorAll(
        ".image-link, .instagram-post, .cats-image"
    );

imageLinks.forEach((card) => {

    const image =
        card.querySelector("img");

    if (!image) return;

    card.addEventListener(
        "mouseenter",
        () => {
            image.classList.add(
                "is-hovered"
            );
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {
            image.classList.remove(
                "is-hovered"
            );
        }
    );
});


/* =========================================================
   PROJECTS — HOVER
========================================================= */

const projectCards =
    document.querySelectorAll(".project");

if (hasFinePointer) {

    projectCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.classList.add(
                    "is-hovered"
                );
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.classList.remove(
                    "is-hovered"
                );
            }
        );
    });
}


/* =========================================================
   LINKS EXTERNOS
========================================================= */

document
    .querySelectorAll('a[href^="http"]')
    .forEach((link) => {

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );
    });


/* =========================================================
   ANO AUTOMÁTICO NO FOOTER
========================================================= */

const currentYear =
    document.querySelector(".current-year");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   LAZY LOADING
========================================================= */

document
    .querySelectorAll("img")
    .forEach((image) => {

        /*
           A imagem principal do hero já possui
           fetchpriority="high", então não alteramos
           o loading dela.
        */

        if (
            !image.hasAttribute("loading") &&
            !image.hasAttribute("fetchpriority")
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );
        }

        if (
            !image.hasAttribute("decoding")
        ) {

            image.setAttribute(
                "decoding",
                "async"
            );
        }
    });


/* =========================================================
   REDUÇÃO DE MOVIMENTO
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

function handleReducedMotion() {

    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    } else {

        document.documentElement.classList.remove(
            "reduced-motion"
        );
    }
}

handleReducedMotion();

if (reducedMotion.addEventListener) {

    reducedMotion.addEventListener(
        "change",
        handleReducedMotion
    );
}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c Matheus Augusto. ",
    "background:#0B3D91;color:#F1F1EC;font-size:18px;font-weight:bold;padding:8px 12px;"
);

console.log(
    "%c Fotografia & Videomaker — Cajati, SP ",
    "color:#8D969D;font-size:12px;"
);