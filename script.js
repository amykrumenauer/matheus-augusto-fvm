/* =========================================================
   MATHEUS AUGUSTO
   FOTOGRAFIA & VIDEOMAKER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const loader =
        document.querySelector(".camera-loader");

    const timer =
        document.querySelector("#loader-timer");

    const flash =
        document.querySelector(".loader-flash");

    const cursor =
        document.querySelector(".cursor");

    const cursorLabel =
        document.querySelector(".cursor-label");

    const menuButton =
        document.querySelector(".menu-button");

    const nav =
        document.querySelector(".nav");

    const year =
        document.querySelector(".current-year");

    const revealElements =
        document.querySelectorAll(".reveal");


    /* =====================================================
       ANO AUTOMÁTICO
    ====================================================== */

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       CAMERA LOADER
    ====================================================== */

    let seconds = 0;

    let loaderTimer = null;


    if (timer) {

        loaderTimer = setInterval(() => {

            seconds++;

            const hours =
                String(
                    Math.floor(seconds / 3600)
                ).padStart(2, "0");

            const minutes =
                String(
                    Math.floor(
                        (seconds % 3600) / 60
                    )
                ).padStart(2, "0");

            const secs =
                String(
                    seconds % 60
                ).padStart(2, "0");

            timer.textContent =
                `${hours}:${minutes}:${secs}`;

        }, 1000);

    }


    function finishLoader() {

        if (!loader) {
            startRevealAnimations();
            return;
        }

        if (flash) {
            flash.classList.add("active");
        }

        setTimeout(() => {

            loader.classList.add("hide");

            document.body.classList.add("loaded");

            if (loaderTimer) {
                clearInterval(loaderTimer);
            }

            startRevealAnimations();

        }, 350);

    }


    window.addEventListener("load", () => {

        setTimeout(() => {

            finishLoader();

        }, 1200);

    });


    /* =====================================================
       FALLBACK DO LOADER
       Evita ficar preso caso alguma imagem externa falhe
    ====================================================== */

    setTimeout(() => {

        if (
            loader &&
            !loader.classList.contains("hide")
        ) {

            finishLoader();

        }

    }, 5000);


    /* =====================================================
       REVEAL ON SCROLL
    ====================================================== */

    function startRevealAnimations() {

        if (!revealElements.length) {
            return;
        }


        if (
            !("IntersectionObserver" in window)
        ) {

            revealElements.forEach(
                (element) => {
                    element.classList.add("visible");
                }
            );

            return;
        }


        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element, index) => {

                element.style.transitionDelay =
                    `${Math.min(
                        index * 0.035,
                        0.25
                    )}s`;

                observer.observe(element);

            }
        );

    }


    /* =====================================================
       CUSTOM CURSOR
    ====================================================== */

    if (
        cursor &&
        window.innerWidth > 800 &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let cursorX = 0;
        let cursorY = 0;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                if (cursorLabel) {

                    cursorLabel.style.left =
                        `${mouseX}px`;

                    cursorLabel.style.top =
                        `${mouseY}px`;

                }

            }
        );


        function animateCursor() {

            cursorX +=
                (mouseX - cursorX) *
                0.15;

            cursorY +=
                (mouseY - cursorY) *
                0.15;


            cursor.style.left =
                `${cursorX}px`;

            cursor.style.top =
                `${cursorY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .story-image, .instagram-post"
            );


        interactiveElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        cursor.classList.add(
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

                    }
                );

            }
        );

    }


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    if (menuButton && nav) {

        menuButton.addEventListener(
            "click",
            () => {

                nav.classList.toggle(
                    "open"
                );

                menuButton.classList.toggle(
                    "open"
                );

            }
        );


        nav.querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "open"
                        );

                        menuButton.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }


    /* =====================================================
       ESC FECHA MENU
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                nav?.classList.remove(
                    "open"
                );

                menuButton?.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       PARALLAX DO HERO
    ====================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image img"
        );


    if (
        heroImage &&
        window.innerWidth > 800 &&
        window.matchMedia(
            "(prefers-reduced-motion: no-preference)"
        ).matches
    ) {

        let ticking = false;


        window.addEventListener(
            "scroll",
            () => {

                if (ticking) {
                    return;
                }


                window.requestAnimationFrame(
                    () => {

                        const scrollY =
                            window.scrollY;


                        if (
                            scrollY <
                            window.innerHeight
                        ) {

                            heroImage.style.transform =
                                `translateY(${scrollY * 0.08}px) scale(1.01)`;

                        }


                        ticking = false;

                    }
                );


                ticking = true;

            }
        );

    }


    /* =====================================================
       HOVER NAS IMAGENS
    ====================================================== */

    const images =
        document.querySelectorAll(
            ".hero-image, .story-image, .cats-image, .instagram-post"
        );


    images.forEach((image) => {

        image.addEventListener(
            "mouseenter",
            () => {

                image.classList.add(
                    "image-hover"
                );

            }
        );


        image.addEventListener(
            "mouseleave",
            () => {

                image.classList.remove(
                    "image-hover"
                );

            }
        );

    });


    /* =====================================================
       LINK EXTERNO
       Impede links placeholder de quebrarem
    ====================================================== */

    const placeholderLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    placeholderLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       LOG NO CONSOLE
    ====================================================== */

    console.log(
        "%c MATHEUS AUGUSTO ",
        "background:#0B3D91;color:#fff;padding:8px;font-family:serif;font-size:16px;"
    );

    console.log(
        "Fotografia & Videomaker — Cajati, SP"
    );

});