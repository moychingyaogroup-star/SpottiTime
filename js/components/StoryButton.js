class StoryButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.mediaFiles = [];
        this.selectedDecoration = 'dec-minimal';
        this.render();
        this.createModal();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item" id="open-story-modal">
                <i class="fas fa-camera" style="color: var(--text-secondary);"></i>
                <span>Story</span>
            </a>
        `;

        document.getElementById('open-story-modal').addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
        });
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal-overlay';
        this.modal.id = 'story-modal';

        this.modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="close-story-modal">&times;</button>
                <h2 class="modal-title">Create Story</h2>

                <input type="file" id="story-file-input" accept="image/*,video/*" multiple style="display: none;">

                <div class="story-upload-area" id="story-upload-trigger">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 32px; color: var(--accent-color); margin-bottom: 10px;"></i>
                    <p>Click to upload photos or videos (Max 10)</p>
                </div>

                <div class="story-preview-container" id="story-preview-container"></div>

                <h3>Choose Style</h3>
                <div class="story-decorations">
                    <div class="story-decoration-option dec-minimal selected" data-style="dec-minimal"></div>
                    <div class="story-decoration-option dec-instagram" data-style="dec-instagram">
                         <div class="dec-instagram-inner"></div>
                    </div>
                    <div class="story-decoration-option dec-neon" data-style="dec-neon"></div>
                </div>

                <button class="post-story-btn" id="post-story-btn" disabled>Post Story</button>
            </div>
        `;

        document.body.appendChild(this.modal);

        // Event Listeners
        document.getElementById('close-story-modal').addEventListener('click', () => this.closeModal());

        document.getElementById('story-upload-trigger').addEventListener('click', () => {
            document.getElementById('story-file-input').click();
        });

        document.getElementById('story-file-input').addEventListener('change', (e) => this.handleFileSelect(e));

        const decOptions = this.modal.querySelectorAll('.story-decoration-option');
        decOptions.forEach(opt => {
            opt.addEventListener('click', (e) => {
                decOptions.forEach(o => o.classList.remove('selected'));
                const target = e.target.closest('.story-decoration-option');
                target.classList.add('selected');
                this.selectedDecoration = target.dataset.style;
                this.updatePreviewsStyle();
            });
        });

        document.getElementById('post-story-btn').addEventListener('click', () => this.postStory());
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);

        // Check limit
        if (this.mediaFiles.length + files.length > 10) {
            alert("You can only upload a maximum of 10 photos and videos combined.");
            return;
        }

        this.mediaFiles = [...this.mediaFiles, ...files].slice(0, 10); // Enforce hard limit just in case
        this.renderPreviews();
        this.updatePostButtonState();
    }

    renderPreviews() {
        const container = document.getElementById('story-preview-container');
        container.innerHTML = '';

        this.mediaFiles.forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                let el;
                if (file.type.startsWith('video/')) {
                    el = document.createElement('video');
                    el.src = e.target.result;
                    el.muted = true;
                } else {
                    el = document.createElement('img');
                    el.src = e.target.result;
                }

                el.className = 'story-preview-item';
                // Apply base class based on selection. The CSS handles the actual styling.
                this.applyStyleToElement(el, this.selectedDecoration);
                container.appendChild(el);
            };

            reader.readAsDataURL(file);
        });
    }

    updatePreviewsStyle() {
         const previews = document.querySelectorAll('.story-preview-item');
         previews.forEach(el => {
             // remove all dec classes
             el.classList.remove('dec-minimal', 'dec-instagram', 'dec-neon');
             this.applyStyleToElement(el, this.selectedDecoration);
         });
    }

    applyStyleToElement(el, styleName) {
         if (styleName === 'dec-instagram') {
             // For instagram style on preview we just add the border style directly or use a wrapper.
             // To keep it simple, applying background/padding to simulate border.
             el.style.border = '3px solid transparent';
             el.style.background = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) border-box';
             el.style.webkitMask = 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)';
             el.style.webkitMaskComposite = 'destination-out';
             el.style.maskComposite = 'exclude';

             // Simplier approach since above is tricky on img:
             el.style.padding = '3px';
             el.style.background = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)';
         } else if (styleName === 'dec-neon') {
             el.style.padding = '0';
             el.style.background = 'none';
             el.style.border = 'none';
             el.style.boxShadow = '0 0 5px #0ff, 0 0 10px #0ff';
         } else {
             // minimal
             el.style.padding = '0';
             el.style.background = 'none';
             el.style.border = '2px solid #333';
             el.style.boxShadow = 'none';
         }
    }

    updatePostButtonState() {
        const btn = document.getElementById('post-story-btn');
        btn.disabled = this.mediaFiles.length === 0;
    }

    postStory() {
        alert(`Story posted successfully with ${this.mediaFiles.length} media files using ${this.selectedDecoration} style!`);
        this.closeModal();
        this.mediaFiles = [];
        this.renderPreviews();
        this.updatePostButtonState();
    }

    openModal() {
        this.modal.style.display = 'flex';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StoryButton('story-button-container');
});
