import * as THREE from 'three'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
const renderer = new THREE.WebGLRenderer(); 
renderer.setSize(window.innerWidth, window.innerHeight); 
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xaaaaaa); // Set background color

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

let model; // Variable to hold the loaded model

const loader = new GLTFLoader(); 
loader.load(
  'Computer.gltf',
  function (gltf) {
    model = gltf.scene;
    model.scale.set(0.5, 0.5, 0.5); // Adjust scaling if needed
    model.position.x = 0; 
    model.position.y = 0;
    model.position.z = 0;
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

camera.position.set(0, 2, 5); // Adjust the camera position
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);

  // Rotate the model if it's loaded
  if (model) {
    model.rotation.x += 0.01;
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();
