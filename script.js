"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // Start all website functions
    initPageLoader();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initBackToTop();
    initActiveNavigation();
    initScrollReveal();
    initDownloadButton();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initPageLoader() {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    function hideLoader() {

        loader.classList.add("loaded");

        // Safety fallback
        setTimeout(() => {
            loader.style.display = "none";
        }, 700);

    }

    // Normal page loading
    if (document.readyState === "complete") {

        setTimeout(hideLoader, 300);

    } else {

        window.addEventListener(
            "load",
            () => {
                setTimeout(hideLoader, 300);
            },
            { once: true }
        );

    }

    // Extra safety:
    // Loader can NEVER remain stuck forever.
    setTimeout(hideLoader, 3000);

}


/* =========================================================
   HEADER SCROLL
========================================================= */

function initHeaderScroll() {

    const header = document.getElementById("siteHeader");

    if (!header) return;

    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuButton =
        document.getElementById("mobileMenuBtn");

    const mobileNav =
        document.getElementById("mobileNav");

    if (!menuButton || !mobileNav) return;


    function closeMenu() {

        menuButton.classList.remove("active");

        mobileNav.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");

    }


    function openMenu() {

        menuButton.classList.add("active");

        mobileNav.classList.add("open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");

    }


    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileNav.classList.contains("open");

            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    const mobileLinks =
        mobileNav.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                closeMenu();

            }

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);


                if (!target) return;


                event.preventDefault();


                const header =
                    document.getElementById(
                        "siteHeader"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    if (!faqItems.length) return;


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) return;


        question.addEventListener(
            "click",
            () => {

                const wasActive =
                    item.classList.contains(
                        "active"
                    );


                faqItems.forEach(
                    otherItem => {

                        if (
                            otherItem !== item
                        ) {

                            otherItem.classList.remove(
                                "active"
                            );

                        }

                    }
                );


                if (wasActive) {

                    item.classList.remove(
                        "active"
                    );

                } else {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) return;


    function updateButton() {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }


    updateButton();


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );


    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (
        !navLinks.length ||
        !sections.length
    ) {

        return;

    }


    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 150;


        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;


            const sectionHeight =
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute(
                    "href"
                );


            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    }


    updateActiveNavigation();


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".feature-card, " +
            ".preview-info-card, " +
            ".step-card, " +
            ".faq-item, " +
            ".about-card, " +
            ".stat-item, " +
            ".gallery-card, " +
            ".main-screenshot-card"
        );


    if (!revealElements.length) return;


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

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
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );


    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }

}


/* =========================================================
   DOWNLOAD BUTTON
========================================================= */

function initDownloadButton() {

    const downloadButton =
        document.getElementById(
            "downloadBtn"
        );


    if (!downloadButton) return;


    downloadButton.addEventListener(
        "click",
        event => {

            const href =
                downloadButton.getAttribute(
                    "href"
                );


            if (
                !href ||
                href === "#"
            ) {

                event.preventDefault();

                showDownloadMessage();

            }

        }
    );

}


/* =========================================================
   DOWNLOAD MESSAGE
========================================================= */

function showDownloadMessage() {

    const existing =
        document.querySelector(
            ".download-notice"
        );


    if (existing) return;


    const notice =
        document.createElement(
            "div"
        );


    notice.className =
        "download-notice";


    notice.innerHTML = `

        <div class="download-notice-box">

            <strong>
                Download Coming Soon
            </strong>

            <p>
                The official SSTC Manager installer
                download will be available here soon.
            </p>

            <button type="button">
                OK
            </button>

        </div>

    `;


    Object.assign(
        notice.style,
        {

            position: "fixed",

            inset: "0",

            zIndex: "99999",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            padding: "20px",

            background:
                "rgba(20, 8, 38, 0.55)",

            backdropFilter:
                "blur(6px)"

        }
    );


    const box =
        notice.querySelector(
            ".download-notice-box"
        );


    Object.assign(
        box.style,
        {

            width: "min(100%, 400px)",

            padding: "30px",

            background: "#ffffff",

            borderRadius: "18px",

            textAlign: "center",

            boxShadow:
                "0 25px 70px rgba(20, 5, 45, 0.25)"

        }
    );


    const title =
        box.querySelector(
            "strong"
        );


    Object.assign(
        title.style,
        {

            display: "block",

            color: "#4c1d95",

            fontSize: "20px",

            marginBottom: "10px"

        }
    );


    const paragraph =
        box.querySelector(
            "p"
        );


    Object.assign(
        paragraph.style,
        {

            color: "#766d80",

            fontSize: "13px",

            lineHeight: "1.7",

            marginBottom: "20px"

        }
    );


    const closeButton =
        box.querySelector(
            "button"
        );


    Object.assign(
        closeButton.style,
        {

            minWidth: "90px",

            minHeight: "42px",

            padding: "0 20px",

            border: "0",

            borderRadius: "9px",

            color: "#ffffff",

            background: "#6d28d9",

            fontWeight: "700",

            cursor: "pointer"

        }
    );


    closeButton.addEventListener(
        "click",
        () => {

            notice.remove();

        }
    );


    notice.addEventListener(
        "click",
        event => {

            if (
                event.target === notice
            ) {

                notice.remove();

            }

        }
    );


    document.body.appendChild(
        notice
    );

}


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.addEventListener(
    "error",
    event => {

        const element =
            event.target;


        if (
            element &&
            element.tagName === "IMG"
        ) {

            element.classList.add(
                "image-load-error"
            );

        }

    },
    true
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            const activeFAQ =
                document.querySelector(
                    ".faq-item.active"
                );


            if (activeFAQ) {

                activeFAQ.classList.remove(
                    "active"
                );

            }

        }

    }
);


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
    "%cSSTC Manager",
    "font-size: 24px; font-weight: 800; color: #6d28d9;"
);

console.log(
    "%cSales & Purchase Management System",
    "font-size: 12px; color: #766d80;"
);