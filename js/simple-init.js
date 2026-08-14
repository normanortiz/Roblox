// Simple initialization - just remove loader and let original scripts work
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after a short delay
    setTimeout(function() {
        var loader = document.getElementById('c-loader');
        if (loader) {
            loader.style.display = 'none';
        }
        
        // Ensure body is visible
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        
        // Play video if exists (only for actual video elements, not iframes)
        var video = document.getElementById('bgVideo');
        if (video && video.tagName === 'VIDEO') {
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.autoplay = true;

            // Remove controls to make it a background video
            video.controls = false;

            // Try to play
            var playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(function() {
                    
                }).catch(function(error) {
                    
                    // Try playing on user interaction
                    document.addEventListener('click', function playOnClick() {
                        video.play();
                        document.removeEventListener('click', playOnClick);
                    }, { once: true });
                });
            }
        }
    }, 500);
});