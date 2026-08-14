// Complete Parallax and Animation System for Lady-J Website
(function() {
    'use strict';
    
    // Wait for DOM and all assets
    window.addEventListener('load', function() {
        
        // Phase 1: Remove preloader with fade
        const loader = document.getElementById('c-loader');
        if (loader) {
            loader.style.transition = 'opacity 0.8s ease-out';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 800);
        }
        
        // Phase 2: Initialize after preloader is gone
        setTimeout(function() {
            
            // Initialize Locomotive Scroll for smooth scrolling
            let locoScroll = null;
            const scrollContainer = document.querySelector('[data-scroll-container]');
            
            if (scrollContainer && typeof LocomotiveScroll !== 'undefined') {
                locoScroll = new LocomotiveScroll({
                    el: scrollContainer,
                    smooth: true,
                    smoothMobile: false,
                    multiplier: 0.8,
                    lerp: 0.08,
                    class: 'is-inview',
                    scrollbarContainer: false,
                    getDirection: true,
                    getSpeed: true
                });
                
                // Initial update
                locoScroll.update();
                
                // GSAP ScrollTrigger Integration
                if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                    gsap.registerPlugin(ScrollTrigger);
                    
                    // Sync ScrollTrigger with Locomotive
                    locoScroll.on('scroll', ScrollTrigger.update);
                    
                    ScrollTrigger.scrollerProxy(scrollContainer, {
                        scrollTop(value) {
                            return arguments.length ? 
                                locoScroll.scrollTo(value, 0, 0) : 
                                locoScroll.scroll.instance.scroll.y;
                        },
                        getBoundingClientRect() {
                            return {
                                top: 0,
                                left: 0,
                                width: window.innerWidth,
                                height: window.innerHeight
                            };
                        },
                        pinType: scrollContainer.style.transform ? 'transform' : 'fixed'
                    });
                    
                    // ========== SECTION 1: HOMEPAGE ==========
                    // Scroll down circle rotation
                    gsap.to('.scroll-down-circle', {
                        rotation: 360,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#homepage',
                            scroller: scrollContainer,
                            start: 'top top',
                            end: 'bottom top',
                            scrub: 2
                        }
                    });
                    
                    // ========== SECTION 2: CLAIM ==========
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: '#claim',
                            scroller: scrollContainer,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            scrub: 1
                        }
                    })
                    .from('.clipPathTop', {
                        y: 100,
                        opacity: 0,
                        stagger: 0.1
                    });
                    
                    // ========== SECTION 3: VIDEO THUMB ==========
                    gsap.to('#video .thumb-image img', {
                        y: -100,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#video',
                            scroller: scrollContainer,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1
                        }
                    });
                    
                    // ========== SECTION 4: DJS BACKGROUND ==========
                    gsap.to('.djsdivBg img', {
                        y: -200,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#djsdiv',
                            scroller: scrollContainer,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1
                        }
                    });
                    
                    // ========== SECTION 5: DJS CARDS ==========
                    document.querySelectorAll('.djsInfo').forEach((el, i) => {
                        const speed = parseFloat(el.dataset.scrollSpeed || 1);
                        const direction = speed < 0 ? -1 : 1;
                        
                        gsap.fromTo(el, 
                            {
                                x: direction * 100,
                                opacity: 0
                            },
                            {
                                x: 0,
                                opacity: 1,
                                scrollTrigger: {
                                    trigger: el,
                                    scroller: scrollContainer,
                                    start: 'top 90%',
                                    end: 'top 40%',
                                    scrub: Math.abs(speed)
                                }
                            }
                        );
                    });
                    
                    // ========== SECTION 6: TUTORS BACKGROUND ==========
                    gsap.to('.tutorsdivBg img', {
                        y: -200,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#tutorsdiv',
                            scroller: scrollContainer,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1
                        }
                    });
                    
                    // ========== SECTION 7: ART DIRECTOR (TOMMY VEE) ==========
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: '#artdirector',
                            scroller: scrollContainer,
                            start: 'top 70%',
                            end: 'bottom 30%',
                            scrub: 1
                        }
                    })
                    .from('.addivBg img', {
                        scale: 1.3,
                        opacity: 0
                    })
                    .from('.addivTxt', {
                        y: 50,
                        opacity: 0,
                        stagger: 0.2
                    }, '<0.2');
                    
                    // ========== SECTION 8: TUTORS CARDS ==========
                    document.querySelectorAll('.tutorsInfo').forEach((el, i) => {
                        const speed = parseFloat(el.dataset.scrollSpeed || 1);
                        const direction = speed < 0 ? -1 : 1;
                        
                        gsap.fromTo(el,
                            {
                                x: direction * 150,
                                opacity: 0,
                                scale: 0.9
                            },
                            {
                                x: 0,
                                opacity: 1,
                                scale: 1,
                                scrollTrigger: {
                                    trigger: el,
                                    scroller: scrollContainer,
                                    start: 'top 85%',
                                    end: 'top 35%',
                                    scrub: Math.abs(speed)
                                }
                            }
                        );
                    });
                    
                    // ========== SECTION 9: COME FUNZIONA (HOW IT WORKS) ==========
                    // Background parallax
                    gsap.to('.ruleBG img', {
                        y: -150,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#how',
                            scroller: scrollContainer,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1
                        }
                    });
                    
                    // Rules with staggered animation
                    document.querySelectorAll('.howRule').forEach((el, i) => {
                        const speed = parseFloat(el.dataset.scrollSpeed || 1);
                        
                        gsap.from(el, {
                            y: 150 + (i * 30),
                            opacity: 0,
                            scrollTrigger: {
                                trigger: el,
                                scroller: scrollContainer,
                                start: 'top 90%',
                                end: 'top 50%',
                                scrub: speed
                            }
                        });
                    });
                    
                    // ========== SECTION 10: EVENTS ==========
                    document.querySelectorAll('.eventInfo').forEach((el, i) => {
                        const speed = parseFloat(el.dataset.scrollSpeed || 0.5);
                        const direction = speed < 0 ? -1 : 1;
                        
                        gsap.from(el, {
                            y: 100 * Math.abs(speed),
                            x: direction * 50,
                            opacity: 0,
                            rotation: direction * 5,
                            scrollTrigger: {
                                trigger: el,
                                scroller: scrollContainer,
                                start: 'top 95%',
                                end: 'top 45%',
                                scrub: Math.abs(speed)
                            }
                        });
                    });
                    
                    // ========== SECTION 11: NEWS ==========
                    // News title animation
                    gsap.from('.newsTitle', {
                        x: -100,
                        opacity: 0,
                        scrollTrigger: {
                            trigger: '#news',
                            scroller: scrollContainer,
                            start: 'top 80%',
                            end: 'top 60%',
                            scrub: 1
                        }
                    });
                    
                    // News container horizontal scroll effect
                    gsap.to('.newsContainer', {
                        x: -200,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#news',
                            scroller: scrollContainer,
                            start: 'top 50%',
                            end: 'bottom top',
                            scrub: 2
                        }
                    });
                    
                    // ========== SECTION 12: PARTNERS ==========
                    // Title animations with different speeds
                    document.querySelectorAll('.partnersTitle').forEach((el, i) => {
                        const speed = parseFloat(el.dataset.scrollSpeed || 1 + i * 0.5);
                        
                        gsap.from(el, {
                            x: i % 2 === 0 ? -100 : 100,
                            opacity: 0,
                            scrollTrigger: {
                                trigger: el,
                                scroller: scrollContainer,
                                start: 'top 90%',
                                end: 'top 60%',
                                scrub: speed
                            }
                        });
                    });
                    
                    // Partner logos reveal
                    document.querySelectorAll('.partnerItem').forEach((el, i) => {
                        gsap.from(el, {
                            scale: 0.5,
                            opacity: 0,
                            rotation: 180,
                            scrollTrigger: {
                                trigger: el,
                                scroller: scrollContainer,
                                start: 'top 95%',
                                end: 'top 65%',
                                scrub: 0.5
                            }
                        });
                    });
                    
                    // ========== SECTION 13: REVIEWS ==========
                    gsap.from('.reviewsTitle', {
                        y: 50,
                        opacity: 0,
                        scrollTrigger: {
                            trigger: '#reviews',
                            scroller: scrollContainer,
                            start: 'top 80%',
                            end: 'top 60%',
                            scrub: 1
                        }
                    });
                    
                    // Reviews container animation
                    gsap.from('.reviewsContainer', {
                        y: 100,
                        opacity: 0,
                        scrollTrigger: {
                            trigger: '.reviewsContainer',
                            scroller: scrollContainer,
                            start: 'top 90%',
                            end: 'top 50%',
                            scrub: 1
                        }
                    });
                    
                    // ========== SECTION 14: FOOTER ==========
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: '#bottom',
                            scroller: scrollContainer,
                            start: 'top 90%',
                            end: 'top 50%',
                            scrub: 1
                        }
                    })
                    .from('.footerLogo', {
                        scale: 0,
                        rotation: 360,
                        opacity: 0
                    })
                    .from('.footerInfo', {
                        y: 50,
                        opacity: 0
                    }, '<0.2')
                    .from('.footerSocial a', {
                        scale: 0,
                        opacity: 0,
                        stagger: 0.1
                    }, '<0.2');
                    
                    // Refresh ScrollTrigger after setup
                    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
                    ScrollTrigger.refresh();
                }
            }
            
            // ========== SWIPER SLIDERS ==========
            if (typeof Swiper !== 'undefined') {
                // News Slider
                new Swiper('.news-slider', {
                    slidesPerView: 'auto',
                    spaceBetween: 40,
                    loop: true,
                    speed: 800,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                });
                
                // Reviews Slider
                new Swiper('.reviews-slider', {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    loop: true,
                    speed: 800,
                    centeredSlides: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                });
            }
            
            // ========== VIDEO AUTOPLAY ==========
            const bgVideo = document.getElementById('bgVideo');
            if (bgVideo) {
                bgVideo.muted = true;
                bgVideo.play().catch(e => {});
            }
            
            // ========== MARQUEE ANIMATION ==========
            const marquee = document.querySelector('.marquee-content');
            if (marquee) {
                gsap.to(marquee, {
                    x: '-50%',
                    ease: 'none',
                    duration: 20,
                    repeat: -1
                });
            }
            
            // ========== WINDOW RESIZE HANDLER ==========
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    if (locoScroll) locoScroll.update();
                    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                }, 250);
            });

        }, 1000); // Wait 1 second after page load
    });
})();