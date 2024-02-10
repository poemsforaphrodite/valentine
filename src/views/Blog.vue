<template>
    <div class="blog-post" v-for="post in posts" :key="post.title">
        <h1 class="blog-post-title">{{ post.title }}</h1>
        <p class="blog-post-meta">
            Posted by {{ post.author }} on {{ post.date }}
        </p>
        <div class="blog-post-content" v-html="post.content"></div>
    </div>
    <canvas ref="backgroundCanvas" class="background-canvas"></canvas>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const posts = ref([
    {
        title: 'My First Blog Post',
        author: 'John Doe',
        date: 'January 1, 2022',
        content: '<p>This is the content of my first blog post.</p>'
    },
    {
        title: 'My Second Blog Post',
        author: 'Jane Smith',
        date: 'February 15, 2022',
        content: '<p>This is the content of my second blog post.</p>'
    }
]);

const backgroundCanvas = ref(null);
let animationFrameId;
let renderer;

onMounted(() => {
    // Set up Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: backgroundCanvas.value, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Set initial size

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        animationFrameId = requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();

    // Resize the canvas and camera aspect ratio when the window is resized
    window.addEventListener('resize', onWindowResize);
});

onUnmounted(() => {
    // Stop the animation loop
    cancelAnimationFrame(animationFrameId);
    // Remove the event listener for the resize event
    window.removeEventListener('resize', onWindowResize);
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
.blog-post {
    margin-bottom: 2rem;
}

.blog-post-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.blog-post-meta {
    color: #6c757d;
    margin-bottom: 1rem;
}

.blog-post-content {
    font-size: 1.2rem;
    line-height: 1.8;
}

.background-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    /* Ensure the canvas is behind the blog posts */
}
</style>