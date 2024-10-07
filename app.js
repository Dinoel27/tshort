let camera, scene, renderer;
let cube;
let controller;

const init = () => {
    // Create the scene
    scene = new THREE.Scene();
    
    // Set up the camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    
    // Create a WebGL renderer with WebXR support
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    
    // Append renderer to the DOM
    document.body.appendChild(renderer.domElement);
    
    // Create a cube
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    
    // Add cube to the scene
    scene.add(cube);
    
    // Set up AR session on button click
    const arButton = document.getElementById('ar-button');
    arButton.addEventListener('click', () => {
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
            if (supported) {
                renderer.xr.setSession(navigator.xr.requestSession('immersive-ar', { requiredFeatures: ['hit-test'] }));
                document.getElementById('ar-button').style.display = 'none';
            } else {
                alert('AR not supported on this device.');
            }
        });
    });

    // Set up AR controller
    const controller = renderer.xr.getController(0);
    scene.add(controller);
    
    // Start rendering
    renderer.setAnimationLoop(render);
};

const render = () => {
    // Rotate cube for a little dynamic effect
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// Resize handler for mobile responsiveness
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize the AR experience
init();
