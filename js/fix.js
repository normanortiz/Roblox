// Force remove preloader and show content
window.addEventListener('load', function() {
    setTimeout(function() {
        // Remove loader
        var loader = document.getElementById('c-loader');
        if (loader) {
            loader.style.display = 'none';
            loader.remove();
        }
        
        // Show body
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        
        // Show all sections
        var sections = document.querySelectorAll('section');
        sections.forEach(function(el) {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
        
        // Force display main content
        var main = document.querySelector('main');
        if (main) {
            main.style.display = 'block';
            main.style.opacity = '1';
            main.style.visibility = 'visible';
        }
        
        // Play video if exists (only for actual video elements, not iframes)
        var video = document.getElementById('bgVideo');
        if (video && video.tagName === 'VIDEO') {
            video.play().catch(function(e) {});
        }
        
        // Initialize Swiper if available
        if (typeof Swiper !== 'undefined') {
            new Swiper('.news-slider', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                },
            });
            
            new Swiper('.reviews-slider', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                },
            });
        }
    }, 100);
});

// Immediate removal
if (document.getElementById('c-loader')) {
    document.getElementById('c-loader').style.display = 'none';
}