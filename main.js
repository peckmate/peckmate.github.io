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

let modelGroup = new THREE.Group(); // Create a group to hold the model
scene.add(modelGroup); // Add the group to the scene

const loader = new GLTFLoader(); 
loader.load(
  'Computer.gltf',
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.5, 0.5, 0.5); // Adjust scaling if needed

    // Compute the bounding box
    const boundingBox = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);

    // Reposition the model to be centered in the group
    model.position.x -= center.x;
    model.position.y -= center.y;
    model.position.z -= center.z;

    modelGroup.add(model); // Add the centered model to the group
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

  // Rotate the group, not the model
  modelGroup.rotation.x += 0.01;
  modelGroup.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
