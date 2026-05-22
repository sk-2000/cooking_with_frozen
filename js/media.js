/**
 * Right-Side Media Accordion & Horizontal Router Component
 * 
 * Manages:
 * 1. Horizontal full-screen slide transitions between the Left content view 
 *    and the Right media accordion view.
 * 2. Muted background video hover-playing logic.
 * 3. Expansion transitions across accordion columns.
 */

class MediaAccordion {
    constructor() {
        this.panels = [];
        this.init();
    }

    init() {
        // --- Part 1: Horizontal Sliding Nav System ---
        const goRightBtn = document.getElementById('horizontal-go-right');
        const goLeftBtn = document.getElementById('horizontal-go-left');
        const container = document.querySelector('.app-container');

        if (goRightBtn && container) {
            goRightBtn.addEventListener('click', (e) => {
                e.preventDefault();
                container.classList.add('slide-right');
            });
        }

        if (goLeftBtn && container) {
            goLeftBtn.addEventListener('click', (e) => {
                e.preventDefault();
                container.classList.remove('slide-right');
                
                // Pause all active videos when leaving the media screen
                this.panels.forEach(panel => this.pauseVideo(panel));
            });
        }

        // --- Part 2: Accordion Hover Playing Video Systems ---
        this.panels = document.querySelectorAll('.media-panel');
        
        this.panels.forEach(panel => {
            const video = panel.querySelector('video');
            
            if (video) {
                video.muted = true;
                video.loop = true;
                video.setAttribute('playsinline', '');
                video.setAttribute('webkit-playsinline', '');
                video.preload = "auto";
                
                // If offline or network blocks Mixkit links, flag fallback layout
                video.addEventListener('error', () => {
                    console.warn(`Video load failed for panel: ${panel.dataset.cuisine}. Firing animated fallback pattern.`);
                    panel.classList.add('video-fallback');
                });
            }

            // Mouse enter: expand active vertical column and play video
            panel.addEventListener('mouseenter', () => {
                // Only act if currently displaying the media page
                if (container.classList.contains('slide-right')) {
                    this.expandPanel(panel);
                }
            });

            // Mouse leave: collapse vertical columns and pause video
            panel.addEventListener('mouseleave', () => {
                this.collapsePanel(panel);
            });

            // Touch support for tablet/mobile
            panel.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    if (!panel.classList.contains('expanded')) {
                        e.preventDefault();
                        this.expandPanel(panel);
                    }
                }
            });
        });
    }

    expandPanel(activePanel) {
        this.panels.forEach(panel => {
            if (panel === activePanel) {
                panel.classList.add('expanded');
                
                const video = panel.querySelector('video');
                if (video) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("Hover video play prevented:", error);
                        });
                    }
                }
            } else {
                panel.classList.remove('expanded');
                this.pauseVideo(panel);
            }
        });
    }

    collapsePanel(activePanel) {
        activePanel.classList.remove('expanded');
        this.pauseVideo(activePanel);
    }

    pauseVideo(panel) {
        const video = panel.querySelector('video');
        if (video) {
            video.pause();
            setTimeout(() => {
                if (video.paused) {
                    video.currentTime = 0; // Rewind for snappy entry on next hover
                }
            }, 100);
        }
    }
}

// Instantiate accordion horizontal router when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new MediaAccordion();
    }, 400);
});
