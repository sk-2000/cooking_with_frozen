/**
 * Custom Trailing Food Physics Cursor
 * 
 * Sets up a highly organic custom cursor that trails the mouse with spring physics,
 * morphs into different food items depending on hovered elements, and creates
 * a fluid trailing particle effect.
 */

class FoodCursor {
    constructor() {
        this.cursorEl = null;
        this.cursorInnerEl = null;
        this.particles = [];
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.speed = 0.12; // Spring lerp factor
        this.currentEmoji = '🍽️';
        this.isActive = false;
        
        this.init();
    }

    init() {
        // Create custom cursor elements
        this.cursorEl = document.createElement('div');
        this.cursorEl.className = 'custom-cursor';
        
        this.cursorInnerEl = document.createElement('div');
        this.cursorInnerEl.className = 'custom-cursor-inner';
        this.cursorInnerEl.innerHTML = this.currentEmoji;
        
        this.cursorEl.appendChild(this.cursorInnerEl);
        document.body.appendChild(this.cursorEl);

        // Events
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('mousedown', () => this.onMouseDown());
        window.addEventListener('mouseup', () => this.onMouseUp());
        
        // Dynamic hovered items listener (delegated)
        document.addEventListener('mouseover', (e) => this.handleHover(e));
        document.addEventListener('mouseout', (e) => this.handleHoverOut(e));
        
        // Keep system cursor visible and let trailing food accompany it with offset
        document.body.style.cursor = 'default';
        
        // Start animation loop
        this.animate();
    }

    onMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        
        if (!this.isActive) {
            this.cursorEl.classList.add('visible');
            this.isActive = true;
        }

        // Spawn a trailing liquid droplet occasionally on fast movement
        if (Math.random() < 0.18) {
            this.createParticle(e.clientX, e.clientY);
        }
    }

    onMouseDown() {
        this.cursorEl.classList.add('clicking');
        // Splash small droplets on click!
        for (let i = 0; i < 6; i++) {
            this.createParticle(this.mouse.x, this.mouse.y, true);
        }
    }

    onMouseUp() {
        this.cursorEl.classList.remove('clicking');
    }

    handleHover(e) {
        const target = e.target.closest('[data-cursor-food]');
        if (target) {
            const food = target.getAttribute('data-cursor-food');
            this.updateEmoji(food);
            this.cursorEl.classList.add('hovering');
        }

        // If hovering over standard interactive elements that aren't specific food items
        const isButton = e.target.closest('button, a, input, textarea, select, .timeline-dot');
        if (isButton && !target) {
            this.cursorEl.classList.add('interactive');
            if (isButton.tagName === 'INPUT' || isButton.tagName === 'TEXTAREA') {
                this.cursorInnerEl.innerHTML = '✏️';
            } else {
                this.cursorInnerEl.innerHTML = '🖱️';
            }
        }
    }

    handleHoverOut(e) {
        const target = e.target.closest('[data-cursor-food]');
        if (target) {
            // Check if leaving to another food item
            const related = e.relatedTarget ? e.relatedTarget.closest('[data-cursor-food]') : null;
            if (!related) {
                this.resetEmoji();
                this.cursorEl.classList.remove('hovering');
            }
        }

        const isButton = e.target.closest('button, a, input, textarea, select, .timeline-dot');
        if (isButton) {
            const related = e.relatedTarget ? e.relatedTarget.closest('button, a, input, textarea, select, .timeline-dot') : null;
            if (!related) {
                this.cursorEl.classList.remove('interactive');
                this.resetEmoji();
            }
        }
    }

    updateEmoji(emoji) {
        this.currentEmoji = emoji;
        this.cursorInnerEl.innerHTML = emoji;
    }

    resetEmoji() {
        this.currentEmoji = '🍽️';
        this.cursorInnerEl.innerHTML = '🍽️';
    }

    createParticle(x, y, isClickSplash = false) {
        const particle = document.createElement('div');
        particle.className = 'cursor-droplet';
        
        // Random styles for a dynamic organic look
        const size = isClickSplash ? (Math.random() * 8 + 4) : (Math.random() * 6 + 3);
        const hue = Math.random() < 0.5 ? 24 : 12; // Goldish bronze or terracotta red from our theme
        const color = `hsl(${hue}, 70%, ${50 + Math.random() * 10}%)`;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Velocity for splash
        const angle = Math.random() * Math.PI * 2;
        const speed = isClickSplash ? (Math.random() * 4 + 2) : (Math.random() * 0.5);
        
        this.particles.push({
            el: particle,
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed + (isClickSplash ? -1 : 0.5), // gravity/drift
            opacity: 1,
            size: size
        });
        
        document.body.appendChild(particle);
    }

    animate() {
        // Smooth cursor lag with offset so it trails down and right from the real pointer
        const offset = 22;
        const targetX = this.mouse.x + offset;
        const targetY = this.mouse.y + offset;

        const dx = targetX - this.pos.x;
        const dy = targetY - this.pos.y;
        
        this.pos.x += dx * this.speed;
        this.pos.y += dy * this.speed;
        
        this.cursorEl.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;

        // Update trailing particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.opacity -= 0.03; // Fade out
            p.size *= 0.95; // Shrink
            
            p.el.style.transform = `translate3d(${p.x - p.pos?.x || 0}px, ${p.y - p.pos?.y || 0}px, 0) scale(${p.size / 6})`;
            p.el.style.left = `${p.x}px`;
            p.el.style.top = `${p.y}px`;
            p.el.style.opacity = p.opacity;
            
            if (p.opacity <= 0) {
                p.el.remove();
                this.particles.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialise cursor once DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new FoodCursor();
});
