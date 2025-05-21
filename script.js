const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
let W, H;
let confettiParticles = [];

function resizeCanvas() {
    W = window.innerWidth;
    H = window.innerHeight;
    confettiCanvas.width = W;
    confettiCanvas.height = H;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

class Confetti {
    constructor() {
        this.x = randomRange(0, W);
        this.y = randomRange(-H, 0);
        this.size = randomRange(7, 12);
        this.speed = randomRange(1, 3);
        this.angle = randomRange(0, 2 * Math.PI);
        this.spin = randomRange(0.05, 0.1);
        this.color = `hsl(${randomRange(300, 360)}, 70%, 65%)`;
        this.opacity = 1;
    }

    update() {
        this.y += this.speed;
        this.angle += this.spin;
        if (this.y > H) {
            this.y = -this.size;
            this.x = randomRange(0, W);
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function createConfetti(count = 150) {
    for (let i = 0; i < count; i++) {
        confettiParticles.push(new Confetti());
    }
}

function animate() {
    ctx.clearRect(0, 0, W, H);
    confettiParticles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// Surprise button effect
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMessage = document.getElementById('surpriseMessage');

surpriseBtn.addEventListener('click', () => {
    surpriseMessage.classList.remove('hidden');
    setTimeout(() => {
        surpriseMessage.classList.add('show');
    }, 10);

    // Optional: disable button after clicked
    surpriseBtn.disabled = true;
    surpriseBtn.style.cursor = 'default';
    surpriseBtn.style.opacity = '0.6';
});

createConfetti();
animate();
