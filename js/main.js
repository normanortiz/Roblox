/* SCROLL */
gsap.registerPlugin(ScrollTrigger);
const pageContainer = document.querySelector('.scroll-container');

/* SMOOTH SCROLL */
const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true,
    scrollFromAnywhere: true,
    getDirection: true,
    reloadOnContextChange: true,
    smartphone: {
        smooth: true,
        lerp: .5,
        breakpoint: 0
    },
    tablet: {
        smooth: true,
        lerp: .5,
        breakpoint: 0
    }
});

ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
  }, getBoundingClientRect() {
    return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: pageContainer.style.transform ? 'transform' : 'fixed'
});

/* PRELOAD ALL IMAGES THEN UPDATE SCROLLER */
imagesLoaded(pageContainer, { background: true }, function () {

    scroller.on('scroll', ScrollTrigger.update);

    ScrollTrigger.addEventListener('refresh', () => scroller.update());
    ScrollTrigger.refresh();

    /* COUNTING ANIMATION - After ScrollTrigger is ready */
    function animateNumbers() {
        $('.shuffle-text').each(function(index) {
                var $this = $(this);
                var targetText = $this.data('text') || $this.text();
                var finalValue = targetText;

                // Determine the target number and format
                var targetNumber = 0;
                var prefix = '';
                var suffix = '';

                if (index === 0) { // 500
                    targetNumber = 500;
                } else if (index === 1) { // $5M
                    targetNumber = 5;
                    prefix = '$';
                    suffix = 'M';
                } else if (index === 2) { // +$10M
                    targetNumber = 10;
                    prefix = '+$';
                    suffix = 'M';
                }

                // Animate the counting
                setTimeout(function() {
                    var currentNumber = 0;
                    var increment = targetNumber / 30; // 30 steps
                    var timer = setInterval(function() {
                        currentNumber += increment;
                        if (currentNumber >= targetNumber) {
                            currentNumber = targetNumber;
                            clearInterval(timer);
                            // For +$10M, preserve the HTML structure with small plus
                            if (index === 2) {
                                $this.html('<span class="plus-sign">+</span>$10M');
                            } else {
                                $this.text(finalValue); // Set final text with original format
                            }
                        } else {
                            if (index === 0) {
                                $this.text(Math.floor(currentNumber));
                            } else if (index === 2) {
                                // For +$10M animation, keep the plus small
                                $this.html('<span class="plus-sign">+</span>$' + currentNumber.toFixed(1) + suffix);
                            } else {
                                $this.text(prefix + currentNumber.toFixed(1) + suffix);
                            }
                        }
                    }, 30); // Update every 30ms
                }, index * 300 + 100); // Stagger animations
        });
    }

    ScrollTrigger.create({
        trigger: '.goalsContainer',
        scroller: '.scroll-container',
        start: 'top 80%',
        once: true,
        onEnter: animateNumbers,
        onRefresh: function(self) {
            // If already in view on page load, trigger immediately
            if (self.isActive) {
                animateNumbers();
            }
        }
    });

});

/* PARALLAX IMAGES */
function initImageParallax() {

    gsap.utils.toArray('.is-parallax').forEach(section => {

        const image = section.querySelector('img');

        gsap.to(image, {
            scaleX: 1.1,
            scaleY:1.1,
            ease: 'expo.inOut',
            scrollTrigger: {
                trigger: section,
                scroller: '.scroll-container',
                start: 'top bottom',
                scrub: true
            }
        });

    });
    
}

/* PARALLAX BACKGROUND IMAGES */
var $el = $('.parallaxBG');

$(window).on('scroll', function() {

    var scrollPos = $(window).scrollTop();

    $el.css({
        'background-position':'50% ' + (.05*scrollPos)+'%'
    });

});

/* The host box-shadow orbit (.addivBg) and the crew fade-in (.crewInfo) lived in the
   crew section, which no longer exists. Both handlers were removed with it. */

/* MAIN */
$(function(){

    /* GO TO THE TOP */
    $('html, body').animate({scrollTop: 2}).animate({scrollTop: 0});

    /* The cookie consent banner and the hamburger/overlay navigation were removed from
       index.html, so their handlers and the scroller 'call' -> nav-btn highlighting are gone.
       The data-scroll-call attributes remain on the sections but are now unused. */

	/* BACK TO HP */
	function TopPage() {
        /* Two LocomotiveScroll instances exist on this container: `scroller` above and the
           one index.html creates, which is the one every parallax handler listens to.
           Driving `scroller` moved the page without those handlers ever running, so the
           hero arrived with the background still positioned for the old scroll offset -
           a black band above it. Always drive the instance the hero is bound to, and pass
           a real options object (the second argument used to be the number 0). */
        const s = window.locomotiveScroll || scroller;
        s.scrollTo(0, { duration: 900 });
	}
	
	$('a#back-to-top').on('click', function() {
		TopPage();
	});
    
    scroller.on('scroll', (position) => {
        
        var x = position.scroll.y;
        
        if ((position.scroll.y) > 150) {

            $('a#back-to-top').addClass('show');

        } else {

            $('a#back-to-top').removeClass('show');
        }

    });
  
    /* START VIDEO BG */
    // Note: #bgVideo is an iframe, not a video element, so no play() method needed
    // The YouTube iframe autoplays via URL parameters

    /* HP ROTATION */
    var $els = $('div[id^=line]'),
    i = 0,
    len = $els.length;

    $els.slice(1).hide();
    $els.eq(0).hide().delay(200).fadeIn(1200, 'easeInOutQuint');
    $('#countdown').delay(200).fadeIn(1200, 'easeInOutQuint');

    setInterval(function() {
        $els.eq(i).fadeOut(400, 'easeInOutExpo', function() {
            i = (i + 1) % len
            $els.eq(i).fadeIn(1200, 'easeInOutQuint');
        })
    }, 5000)

    /* The VenoBox lightbox (.videoWork, season 1 trailer), the .news-slider Swiper and the
       .reviews-slider marquee all belonged to sections below About, which are now gone. */

    /* ANIMATION - stagger the stat tiles (500 players / $5M / +$10M) in as they scroll into view.
       Previously this handler also covered the partners grid and .claimTxt, both now removed. */
    $('.goalsContainer').bind('inview', function(event, visible) {

        if (visible) {
            $('.itemGoal', this).each(function(i) {
                var item = $(this);
                setTimeout(function() {
                    item.addClass('showItem');
                }, i * 200);
            });
		}

	});

});