// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Tab switching functionality
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all tabs
        tabLinks.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current tab
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Sample project data (you would replace these with your actual projects)
const projects = {
    art: [
        { image: 'images/projects/art1.jpg', title: '3D Cinny', description: 'This is a 3D Render Of One of my Ocs (Origonal Characters) Cinny' },
        { image: 'images/projects/art2.jpg', title: 'The darkness, it calls me.', description: 'Join the darkness.' },
        { image: 'images/projects/art3.jpg', title: 'Who is this?', description: 'Take a deep breath and Pace Yourself' },
        { image: 'images/projects/art4.jpg', title: 'Demo Artwork', description: 'I feel so... funny?' },
        { image: 'images/projects/art5.jpg', title: 'Artwork 5', description: 'Description of artwork 5' },
        { image: 'images/projects/art6.jpg', title: 'Artwork 6', description: 'Description of artwork 6' }
    ],
    animation: [
        { 
            type: 'video',
            src: 'videos/anim1.mp4',
            poster: 'images/projects/anim1.jpg', 
            title: 'Character Walk Cycle', 
            description: 'Smooth character animation demonstrating a basic walk cycle'
        },
        { 
            type: 'video',
            src: 'videos/anim2.mp4',
            poster: 'images/projects/anim2.jpg', 
            title: 'Cinny Animation', 
            description: 'Animation showcasing my OC Cinny in motion'
        },
        { 
            type: 'gif',
            src: 'videos/anim3.gif',
            poster: 'images/projects/anim3.jpg', 
            title: 'Looping Background', 
            description: 'Seamless loop animation for game backgrounds'
        }
    ],
    storyboard: [
        { image: 'images/projects/story1.jpg', title: 'Storyboard 1', description: 'Description of storyboard 1' },
        { image: 'images/projects/story2.jpg', title: 'Storyboard 2', description: 'Description of storyboard 2' }
    ],
    gamedev: [
        { image: 'images/projects/game1.jpg', title: 'Game Project 1', description: 'Description of game project 1' },
        { 
            type: 'video',
            src: 'videos/game2.mp4',
            poster: 'images/projects/game2.jpg', 
            title: 'Gameplay Demo', 
            description: 'Short demo of my latest game project in action'
        },
        { image: 'images/projects/game3.jpg', title: 'Game Project 3', description: 'Description of game project 3' }
    ],
    'ui-ux': [
        { image: 'images/projects/ui1.jpg', title: 'UI Design 1', description: 'Description of UI design 1' },
        { image: 'images/projects/ui2.jpg', title: 'UX Project 2', description: 'Description of UX project 2' }
    ]
};

// Function to create video gallery item
function createVideoGalleryItem(item, index) {
    const delay = index * 100;
    const isGif = item.type === 'gif';
    
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item video-item';
    
    // For GIFs, we use img tag but with special controls
    if (isGif) {
        galleryItem.innerHTML = `
            <div class="video-container" style="transition-delay: ${delay}ms">
                <img src="${item.poster}" data-gif="${item.src}" alt="${item.title}" class="gif-preview">
                <div class="video-controls">
                    <button class="play-button" aria-label="Play">▶</button>
                </div>
            </div>
            <div class="item-info">
                <h3 class="item-title">${item.title}</h3>
                <p class="item-desc">${item.description}</p>
            </div>
        `;
    } else {
        // For MP4s, use video element with controls
        galleryItem.innerHTML = `
            <div class="video-container" style="transition-delay: ${delay}ms">
                <video poster="${item.poster}" preload="metadata">
                    <source src="${item.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="video-controls">
                    <button class="play-button" aria-label="Play">▶</button>
                    <div class="timeline-container">
                        <div class="timeline">
                            <div class="progress"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-info">
                <h3 class="item-title">${item.title}</h3>
                <p class="item-desc">${item.description}</p>
            </div>
        `;
    }
    
    return galleryItem;
}

// Function to create image gallery item
function createImageGalleryItem(item, index) {
    const delay = index * 100;
    
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" style="transition-delay: ${delay}ms">
        <div class="item-info">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-desc">${item.description}</p>
        </div>
    `;
    
    return galleryItem;
}

// Function to populate gallery with projects
function populateGallery() {
    for (const [category, items] of Object.entries(projects)) {
        const gallery = document.getElementById(`${category}-gallery`);
        if (!gallery) continue;
        
        items.forEach((item, index) => {
            let galleryItem;
            
            // Check if the item is a video or an image
            if (item.type === 'video' || item.type === 'gif') {
                galleryItem = createVideoGalleryItem(item, index);
            } else {
                galleryItem = createImageGalleryItem(item, index);
            }
            
            gallery.appendChild(galleryItem);
            
            // Force reflow to ensure transition works
            setTimeout(() => {
                galleryItem.classList.add('loaded');
            }, 50);
        });
    }
    
    // Initialize video controls after populating the gallery
    initializeVideoControls();
}

// Function to handle video controls
function initializeVideoControls() {
    // Handle MP4 videos
    document.querySelectorAll('.video-container video').forEach(video => {
        const container = video.closest('.video-container');
        const playButton = container.querySelector('.play-button');
        const progress = container.querySelector('.progress');
        
        // Play/pause toggle
        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButton.textContent = '❚❚'; // Pause symbol
            } else {
                video.pause();
                playButton.textContent = '▶'; // Play symbol
            }
        });
        
        // Update progress bar
        video.addEventListener('timeupdate', () => {
            if (progress) {
                const percent = (video.currentTime / video.duration) * 100;
                progress.style.width = `${percent}%`;
            }
        });
        
        // Reset when video ends
        video.addEventListener('ended', () => {
            playButton.textContent = '▶';
            if (progress) progress.style.width = '0%';
        });
        
        // Click timeline to seek
        const timeline = container.querySelector('.timeline');
        if (timeline) {
            timeline.addEventListener('click', e => {
                const rect = timeline.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
            });
        }
    });
    
    // Handle GIFs
    document.querySelectorAll('.gif-preview').forEach(img => {
        const container = img.closest('.video-container');
        const playButton = container.querySelector('.play-button');
        const gifSrc = img.getAttribute('data-gif');
        let isPlaying = false;
        
        playButton.addEventListener('click', () => {
            if (!isPlaying) {
                // Switch to GIF
                img.setAttribute('src', gifSrc);
                playButton.textContent = '❚❚'; // Pause symbol
                isPlaying = true;
            } else {
                // Switch back to poster image
                img.setAttribute('src', img.getAttribute('alt-src') || img.src);
                playButton.textContent = '▶'; // Play symbol
                isPlaying = false;
            }
        });
        
        // Store original poster image for toggling back
        if (!img.getAttribute('alt-src')) {
            img.setAttribute('alt-src', img.src);
        }
    });
}

// Initialize the galleries when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populateGallery();
    
    // Example of how to implement lazy loading for images
    const images = document.querySelectorAll('.gallery-item img:not(.gif-preview)');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const parent = img.closest('.gallery-item');
                    
                    // Add loaded class to trigger animation
                    setTimeout(() => {
                        parent.classList.add('loaded');
                    }, 100);
                    
                    // Stop observing once loaded
                    observer.unobserve(img);
                }
            });
        }, { threshold: 0.1 });
        
        images.forEach(img => {
            observer.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            setTimeout(() => {
                img.closest('.gallery-item').classList.add('loaded');
            }, 300);
        });
    }
});

// Function to add working contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // You would add your actual form submission code here
            // For example, using fetch to send the data to a server
            
            alert('Form submission functionality would go here. In a real implementation, this would send your message.');
            
            // Reset the form
            this.reset();
        });
    }
});