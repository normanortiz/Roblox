// Initialize Locomotive Scroll and GSAP for parallax effects
(function() {
    'use strict';
    
    // Wait for everything to load
    window.addEventListener('load', function() {
        
        // Remove preloader first
        setTimeout(function() {
            var loader = document.getElementById('c-loader');
            if (loader) {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.5s';
                setTimeout(function() {
                    loader.style.display = 'none';
                    loader.remove();
                }, 500);
            }
            
            // Initialize Locomotive Scroll
            if (typeof LocomotiveScroll !== 'undefined') {
                const locoScroll = new LocomotiveScroll({
                    el: document.querySelector('[data-scroll-container]'),
                    smooth: true,
                    smoothMobile: false,
                    multiplier: 1,
                    lerp: 0.1,
                    class: 'is-inview',
                    scrollbarClass: 'c-scrollbar',
                    scrollingClass: 'has-scroll-scrolling',
                    draggingClass: 'has-scroll-dragging',
                    smoothClass: 'has-scroll-smooth',
                    initClass: 'has-scroll-init'
                });
                
                // Update locomotive scroll
                locoScroll.update();
                
                // ScrollTrigger Setup with Locomotive
                if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                    
                    // Register ScrollTrigger plugin
                    gsap.registerPlugin(ScrollTrigger);
                    
                    // Update ScrollTrigger when Locomotive updates
                    locoScroll.on('scroll', ScrollTrigger.update);
                    
                    // Tell ScrollTrigger to use these proxy methods
                    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
                        scrollTop(value) {
                            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
                        },
                        getBoundingClientRect() {
                            return {
                                top: 0,
                                left: 0,
                                width: window.innerWidth,
                                height: window.innerHeight
                            };
                        },
                        pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
                    });
                    
                    // Refresh both ScrollTrigger and Locomotive
                    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
                    ScrollTrigger.refresh();
                    
                    // Initialize GSAP animations for tutors section
                    // Horizontal scroll effect for tutors
                    document.querySelectorAll('.tutorsInfo').forEach(function(el) {
                        var speed = el.getAttribute('data-scroll-speed') || '1';
                        var direction = parseFloat(speed) < 0 ? -1 : 1;
                        
                        gsap.to(el, {
                            x: direction * 100,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: el,
                                scroller: '[data-scroll-container]',
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: Math.abs(parseFloat(speed))
                            }
                        });
                    });
                    
                    // Parallax for images with data-scroll-speed
                    document.querySelectorAll('[data-scroll][data-scroll-speed]').forEach(function(el) {
                        var speed = el.getAttribute('data-scroll-speed') || '-2';
                        
                        gsap.to(el, {
                            y: parseFloat(speed) * 100,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: el,
                                scroller: '[data-scroll-container]',
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1
                            }
                        });
                    });
                    
                    // Art Director section animation
                    var artDirector = document.querySelector('.addivBg');
                    if (artDirector) {
                        gsap.fromTo(artDirector, 
                            {
                                scale: 1.2,
                                opacity: 0
                            },
                            {
                                scale: 1,
                                opacity: 1,
                                duration: 1.5,
                                scrollTrigger: {
                                    trigger: '#artdirector',
                                    scroller: '[data-scroll-container]',
                                    start: 'top 80%',
                                    end: 'bottom 20%',
                                    scrub: 1
                                }
                            }
                        );
                    }
                    
                    // DJs section animations
                    document.querySelectorAll('.djsInfo').forEach(function(el, index) {
                        var speed = el.getAttribute('data-scroll-speed') || '1';
                        var direction = el.getAttribute('data-scroll-direction') === 'horizontal' ? 'x' : 'y';
                        
                        var animProps = {};
                        animProps[direction] = parseFloat(speed) * 50;
                        
                        gsap.from(el, {
                            ...animProps,
                            opacity: 0,
                            duration: 1,
                            scrollTrigger: {
                                trigger: el,
                                scroller: '[data-scroll-container]',
                                start: 'top 90%',
                                end: 'top 50%',
                                scrub: 1
                            }
                        });
                    });
                    
                    // COME FUNZIONA (How it works) section animations
                    document.querySelectorAll('.howRule').forEach(function(el, index) {
                        var speed = el.getAttribute('data-scroll-speed') || '1';
                        var delay = el.getAttribute('data-scroll-delay') || '0';
                        
                        // Staggered reveal from bottom with different speeds
                        gsap.from(el, {
                            y: 100 * (1 + index * 0.2),
                            opacity: 0,
                            duration: 1.5,
                            delay: parseFloat(delay) * index * 0.1,
                            scrollTrigger: {
                                trigger: el,
                                scroller: '[data-scroll-container]',
                                start: 'top 85%',
                                end: 'top 60%',
                                scrub: parseFloat(speed)
                            }
                        });
                    });
                    
                    // Background image parallax for How section
                    var howBg = document.querySelector('.ruleBG img');
                    if (howBg) {
                        gsap.to(howBg, {
                            y: -150,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: '#how',
                                scroller: '[data-scroll-container]',
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1
                            }
                        });
                    }
                    
                    // Events section animations
                    document.querySelectorAll('.eventInfo').forEach(function(el) {
                        var speed = el.getAttribute('data-scroll-speed') || '0.5';
                        
                        gsap.from(el, {
                            y: 80 * Math.abs(parseFloat(speed)),
                            opacity: 0,
                            duration: 1.2,
                            scrollTrigger: {
                                trigger: el,
                                scroller: '[data-scroll-container]',
                                start: 'top 90%',
                                end: 'top 60%',
                                scrub: Math.abs(parseFloat(speed))
                            }
                        });
                    });
                    
                    // Partners section staggered animations
                    document.querySelectorAll('.partnerItem').forEach(function(el, index) {
                        gsap.from(el, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0.8,
                            delay: index * 0.05,
                            scrollTrigger: {
                                trigger: el,
                                scroller: '[data-scroll-container]',
                                start: 'top 95%',
                                end: 'top 70%',
                                scrub: 0.5
                            }
                        });
                    });
                }
                
                // Update on window resize
                window.addEventListener('resize', function() {
                    locoScroll.update();
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.refresh();
                    }
                });
            }
            
            // Initialize Swiper sliders
            if (typeof Swiper !== 'undefined') {
                // News slider
                var newsSlider = new Swiper('.news-slider', {
                    slidesPerView: 'auto',
                    spaceBetween: 40,
                    speed: 600,
                    loop: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                });
                
                // Reviews slider
                var reviewsSlider = new Swiper('.reviews-slider', {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    speed: 600,
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
                });
            }
            
            // Play background video
            var bgVideo = document.getElementById('bgVideo');
            if (bgVideo) {
                bgVideo.muted = true;
                bgVideo.play().catch(function(e) {
                    
                });
            }
            
            
            
        }, 100);
    });
})();