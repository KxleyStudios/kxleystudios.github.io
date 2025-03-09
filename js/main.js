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
        { image: 'images/projects/anim1.jpg', title: 'Animation 1', description: 'Description of animation 1' },
        { image: 'images/projects/anim2.jpg', title: 'Animation 2', description: 'Description of animation 2' },
        { image: 'images/projects/anim3.jpg', title: 'Animation 3', description: 'Description of animation 3' }
    ],
    storyboard: [
        { image: 'images/projects/story1.jpg', title: 'Storyboard 1', description: 'Description of storyboard 1' },
        { image: 'images/projects/story2.jpg', title: 'Storyboard 2', description: 'Description of storyboard 2' }
    ],
    gamedev: [
        { image: 'images/projects/game1.jpg', title: 'Game Project 1', description: 'Description of game project 1' },
        { image: 'images/projects/game2.jpg', title: 'Game Project 2', description: 'Description of game project 2' },
        { image: 'images/projects/game3.jpg', title: 'Game Project 3', description: 'Description of game project 3' }
    ],
    'ui-ux': [
        { image: 'images/projects/ui1.jpg', title: 'UI Design 1', description: 'Description of UI design 1' },
        { image: 'images/projects/ui2.jpg', title: 'UX Project 2', description: 'Description of UX project 2' }
    ]
};

// Function to populate gallery with projects
function populateGallery() {
    for (const [category, items] of Object.entries(projects)) {
        const gallery = document.getElementById(`${category}-gallery`);
        if (!gallery) continue;
        
        items.forEach((item, index) => {
            const delay = index * 100; // Stagger the animations
            
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" style="transition-delay: ${delay}ms">
                <div class="item-info">
                    <h3 class="item-title">${item.title}</h3>
                    <p class="item-desc">${item.description}</p>
                </div>
            `;
            
            gallery.appendChild(galleryItem);
            
            // Force reflow to ensure transition works
            setTimeout(() => {
                galleryItem.classList.add('loaded');
            }, 50);
        });
    }
}

// Initialize the galleries when the page loads
document.addEventListener('DOMContentLoaded', populateGallery);

// Example of how to implement lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-item img');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const parent = img.parentElement;
                    
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
                img.parentElement.classList.add('loaded');
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
