<template>
    <canvas ref="backgroundCanvas" class="background-canvas"></canvas>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const backgroundCanvas = ref(null);
let animationFrameId;
let renderer;
let camera;

onMounted(() => {
    // Set up Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: backgroundCanvas.value, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Set initial size

    // Create a particle system for the star field
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const particlesPositions = [];

    for (let i = 0; i < particleCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        particlesPositions.push(x, y, z);
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesPositions, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    function animate() {
        animationFrameId = requestAnimationFrame(animate);

        // Rotate the stars slowly
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    // Resize the canvas and camera aspect ratio when the window is resized
    window.addEventListener('resize', onWindowResize);
});

function onWindowResize() {
    if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}
</script>
  
<style scoped>
.background-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    /* Ensure the canvas is behind the blog posts */
}
</style>
