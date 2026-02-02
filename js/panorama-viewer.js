class PanoramaViewer {
    constructor() {
        this.canvas = document.getElementById('panoramaCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.loading = document.getElementById('loading');
        
        // Panorama state
        this.panoramas = [];
        this.currentIndex = 0;
        this.currentImage = null;
        
        // View state
        this.yaw = 0;
        this.pitch = 0;
        this.fov = 90;
        this.minFov = 30;
        this.maxFov = 120;
        
        // Interaction state
        this.isDragging = false;
        this.lastX = 0;
        this.lastY = 0;
        
        // Touch state
        this.touches = [];
        this.lastPinchDistance = 0;
        
        // Animation
        this.animationId = null;
        
        this.init();
    }
    
    async init() {
        await this.loadPanoramaList();
        this.setupCanvas();
        this.setupEventListeners();
        this.setupSwitcher();
        
        if (this.panoramas.length > 0) {
            await this.loadPanorama(0);
        }
        
        this.render();
    }
    
    async loadPanoramaList() {
        // Add your panorama image filenames here
        // Just add or remove items from this array to update the viewer
        const imageNames = [
            'Panorama.png',
            'Panorama1.png',
            'Panorama2.png'
            // Add more images like:
            // 'panorama_2.png',
            // 'panorama_3.png',
            // 'my_building.jpg',
        ];
        
        this.panoramas = imageNames.map(name => ({
            name: name,
            path: `images/${name}`,
            displayName: name.replace(/_/g, ' ').replace('.png', '').replace('.jpg', '').replace('.jpeg', '')
        }));
        
        this.updateImageCount();
    }
    
    setupCanvas() {
        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            
            this.canvas.width = window.innerWidth * dpr;
            this.canvas.height = window.innerHeight * dpr;
            
            this.canvas.style.width = window.innerWidth + 'px';
            this.canvas.style.height = window.innerHeight + 'px';
            
            this.ctx.scale(dpr, dpr);
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
    
    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));
        this.canvas.addEventListener('wheel', this.onWheel.bind(this));
        
        // Touch events
        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: false });
        
        // Zoom controls
        document.getElementById('zoomIn').addEventListener('click', () => this.zoom(-10));
        document.getElementById('zoomOut').addEventListener('click', () => this.zoom(10));
        document.getElementById('resetView').addEventListener('click', () => this.resetView());
        
        // Prevent context menu
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    setupSwitcher() {
        const switcherToggle = document.getElementById('switcherToggle');
        const switcherPanel = document.getElementById('switcherPanel');
        const closePanel = document.getElementById('closePanel');
        const thumbnailsContainer = document.getElementById('thumbnails');
        
        // Toggle panel
        switcherToggle.addEventListener('click', () => {
            switcherPanel.classList.toggle('active');
        });
        
        closePanel.addEventListener('click', () => {
            switcherPanel.classList.remove('active');
        });
        
        // Close panel when clicking outside on mobile
        switcherPanel.addEventListener('click', (e) => {
            if (e.target === switcherPanel) {
                switcherPanel.classList.remove('active');
            }
        });
        
        // Create thumbnails
        this.panoramas.forEach((panorama, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'thumbnail';
            if (index === 0) thumb.classList.add('active');
            
            const img = document.createElement('img');
            img.src = panorama.path;
            img.alt = panorama.displayName;
            
            thumb.appendChild(img);
            thumb.addEventListener('click', () => {
                this.loadPanorama(index);
                switcherPanel.classList.remove('active');
            });
            
            thumbnailsContainer.appendChild(thumb);
        });
        
        // Hide switcher button if only one image
        if (this.panoramas.length <= 1) {
            switcherToggle.style.display = 'none';
        }
    }
    
    updateImageCount() {
        const imageCount = document.getElementById('imageCount');
        if (imageCount) {
            imageCount.textContent = this.panoramas.length;
        }
    }
    
    async loadPanorama(index) {
        if (index < 0 || index >= this.panoramas.length) return;
        
        this.loading.classList.remove('hidden');
        this.currentIndex = index;
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                this.currentImage = img;
                this.resetView();
                this.loading.classList.add('hidden');
                this.updateActiveThumbnail();
                resolve();
            };
            
            img.onerror = () => {
                console.error('Failed to load panorama:', this.panoramas[index].path);
                this.loading.classList.add('hidden');
                reject();
            };
            
            img.src = this.panoramas[index].path;
        });
    }
    
    updateActiveThumbnail() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    // Mouse interaction
    onMouseDown(e) {
        this.isDragging = true;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
    }
    
    onMouseMove(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.lastX;
        const deltaY = e.clientY - this.lastY;
        
        this.yaw += deltaX * 0.3;
        this.pitch = Math.max(-90, Math.min(90, this.pitch - deltaY * 0.3));
        
        this.lastX = e.clientX;
        this.lastY = e.clientY;
    }
    
    onMouseUp() {
        this.isDragging = false;
    }
    
    onWheel(e) {
        e.preventDefault();
        this.zoom(e.deltaY * 0.1);
    }
    
    // Touch interaction
    onTouchStart(e) {
        e.preventDefault();
        this.touches = Array.from(e.touches);
        
        if (this.touches.length === 1) {
            this.isDragging = true;
            this.lastX = this.touches[0].clientX;
            this.lastY = this.touches[0].clientY;
        } else if (this.touches.length === 2) {
            this.lastPinchDistance = this.getPinchDistance();
        }
    }
    
    onTouchMove(e) {
        e.preventDefault();
        this.touches = Array.from(e.touches);
        
        if (this.touches.length === 1 && this.isDragging) {
            const deltaX = this.touches[0].clientX - this.lastX;
            const deltaY = this.touches[0].clientY - this.lastY;
            
            this.yaw += deltaX * 0.5;
            this.pitch = Math.max(-90, Math.min(90, this.pitch - deltaY * 0.5));
            
            this.lastX = this.touches[0].clientX;
            this.lastY = this.touches[0].clientY;
        } else if (this.touches.length === 2) {
            const currentDistance = this.getPinchDistance();
            const delta = this.lastPinchDistance - currentDistance;
            this.zoom(delta * 0.5);
            this.lastPinchDistance = currentDistance;
        }
    }
    
    onTouchEnd(e) {
        e.preventDefault();
        this.touches = Array.from(e.touches);
        
        if (this.touches.length === 0) {
            this.isDragging = false;
        } else if (this.touches.length === 1) {
            this.lastX = this.touches[0].clientX;
            this.lastY = this.touches[0].clientY;
        }
    }
    
    getPinchDistance() {
        if (this.touches.length < 2) return 0;
        
        const dx = this.touches[0].clientX - this.touches[1].clientX;
        const dy = this.touches[0].clientY - this.touches[1].clientY;
        
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // Zoom controls
    zoom(delta) {
        this.fov = Math.max(this.minFov, Math.min(this.maxFov, this.fov + delta));
    }
    
    resetView() {
        this.yaw = 0;
        this.pitch = 0;
        this.fov = 90;
    }
    
    // Rendering
    render() {
        if (!this.currentImage) {
            this.animationId = requestAnimationFrame(() => this.render());
            return;
        }
        
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        
        this.ctx.clearRect(0, 0, width, height);
        
        // Calculate source dimensions based on field of view
        const imgWidth = this.currentImage.width;
        const imgHeight = this.currentImage.height;
        
        // Map yaw to image x position (with wrapping)
        const sourceX = ((this.yaw % 360 + 360) % 360) / 360 * imgWidth;
        
        // Calculate source width based on FOV
        const sourceWidth = (this.fov / 360) * imgWidth;
        
        // Calculate source height to maintain aspect ratio
        const sourceHeight = sourceWidth * (height / width);
        
        // Map pitch to image y position (centered view)
        // Normalize pitch from -90/90 to 0/1 range
        const pitchNormalized = (this.pitch + 90) / 180;
        
        // Center the viewport vertically based on pitch
        let sourceY = pitchNormalized * imgHeight - (sourceHeight / 2);
        
        // Clamp to image boundaries
        sourceY = Math.max(0, Math.min(imgHeight - sourceHeight, sourceY));
        
        // Ensure we don't exceed image bounds
        const finalSourceHeight = Math.min(sourceHeight, imgHeight - sourceY);
        
        // Calculate destination height (may be less than full height if we hit boundaries)
        const destHeight = (finalSourceHeight / sourceHeight) * height;
        const destY = (height - destHeight) / 2;
        
        // Draw the visible portion of the panorama
        this.ctx.save();
        
        // Handle wrapping at image edges
        if (sourceX + sourceWidth > imgWidth) {
            // Draw left part
            const leftWidth = imgWidth - sourceX;
            const leftDestWidth = width * (leftWidth / sourceWidth);
            
            this.ctx.drawImage(
                this.currentImage,
                sourceX, sourceY, leftWidth, finalSourceHeight,
                0, destY, leftDestWidth, destHeight
            );
            
            // Draw wrapped part
            const wrappedWidth = sourceWidth - leftWidth;
            const wrappedDestWidth = width * (wrappedWidth / sourceWidth);
            
            this.ctx.drawImage(
                this.currentImage,
                0, sourceY, wrappedWidth, finalSourceHeight,
                leftDestWidth, destY, wrappedDestWidth, destHeight
            );
        } else {
            this.ctx.drawImage(
                this.currentImage,
                sourceX, sourceY, sourceWidth, finalSourceHeight,
                0, destY, width, destHeight
            );
        }
        
        this.ctx.restore();
        
        this.animationId = requestAnimationFrame(() => this.render());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize viewer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const viewer = new PanoramaViewer();
});
