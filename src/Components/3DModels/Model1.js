import React, { useEffect,useRef,useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './Model1.css';
import Bubble from "../Bubble/Bubble.js";

const ThreeComponent = () => {

      const canvasRef = useRef();
      const [clock] = useState(new THREE.Clock());
      const configuredRendererRef = useRef();
      const configuredCameraRef = useRef();
      const loadedModelRef=useRef();

useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
        console.log('canvas up');
        const parent=canvas.parentElement;
        const parentWidth = parent.clientWidth;
        const parentHeight = parent.clientHeight;
        const fov = 87, aspect = parentWidth/ parentHeight*0.90, near = 2, far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        const configuredCamera = cameraSetup(camera);
        configuredCameraRef.current = configuredCamera;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        const configuredRenderer = rendererSetup(renderer);
        configuredRendererRef.current = configuredRenderer;
        const newControls = new OrbitControls(configuredCamera, configuredRenderer.domElement);
        controlsSetup(newControls);
        const scene = new THREE.Scene();
        const litScene = lightsSetup(scene);

        async function loadAndAnimateModel() {
            const { loadedModel, loadedMixer } = await loadModel(newControls, litScene);
            loadedModelRef.current = loadedModel; 
            animate(configuredRenderer, loadedModel, configuredCamera, litScene, loadedMixer,newControls);
         
            
        }
        loadAndAnimateModel();
        window.addEventListener('resize', handleResize(aspect));
        function grim() {
          let isDragging = false;
          let previousMousePosition = { x: 0, y: 0 };
          let startTouchPosition = { x: 0, y: 0 };
        
          // Add event listeners for both mouse and touch events
          ['mousedown', 'touchstart'].forEach(event => {
            canvas.addEventListener(event, (e) => {
              isDragging = true;
              if (e.changedTouches) { // Check if this is a touch event
                startTouchPosition = {
                  x: e.changedTouches[0].clientX,
                  y: e.changedTouches[0].clientY
                };
              }
            });
          });
        
          ['mousemove', 'touchmove'].forEach(event => {
            canvas.addEventListener(event, (e) => {
              var clientX, clientY;
        
              // Check if this is a touch event
              if (e.changedTouches) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
              } else {
                clientX = e.clientX;
                clientY = e.clientY;
              }
        
              var deltaMove = {
                x: clientX - previousMousePosition.x,
                y: clientY - previousMousePosition.y
              };
        
              if (isDragging) {
        
                // Handle vertical swipes (for scrolling)
                if (Math.abs(deltaMove.y) > Math.abs(deltaMove.x)) {
                  // Check if this is a swipe down
                  if (clientY > startTouchPosition.y) {
                    // Scroll up
                    window.scrollBy(0, -Math.abs(deltaMove.y));
                  }
                  // Check if this is a swipe up
                  else if (clientY < startTouchPosition.y) {
                    // Scroll down
                    window.scrollBy(0, Math.abs(deltaMove.y));
                  }
                }
        
                // Handle horizontal swipes (for rotating the model)
                else {
                  var deltaRotationQuaternion = new THREE.Quaternion()
                    .setFromEuler(new THREE.Euler(
                      0, // No rotation around X
                      toRadians(deltaMove.x * 1), // Angle rotation around Y
                      0,
                      'XYZ'
                    ));
        
                  loadedModelRef.current.quaternion.multiplyQuaternions(deltaRotationQuaternion, loadedModelRef.current.quaternion);
                }
              }
        
              previousMousePosition = {
                x: clientX,
                y: clientY
              };
            });
          });
        
          ['mouseup', 'touchend'].forEach(event => {
            canvas.addEventListener(event, (e) => {
              isDragging = false;
            });
          });
        
          // Helper function to convert degree to radian
          function toRadians(angle) {
            return angle * (Math.PI / 180);
          }
        }
        
            grim()
        return () => {
            window.removeEventListener('resize', handleResize(aspect));
        };
    }
}, []);

function handleResize(aspect) {
  configuredCameraRef.current.aspect = aspect;
  configuredCameraRef.current.updateProjectionMatrix();

}

 const controlsSetup = (newControls) => {
    newControls.enableZoom = false; // Disable zooming
    newControls.enablePan = false; // Disable panning
     newControls.enableRotate=false
    return newControls;
};


    const rendererSetup = (newRenderer) => {
            newRenderer.setSize(window.innerWidth, window.innerHeight);
            newRenderer.setClearColor(0x000000, 0);
            newRenderer.gammaOutput = true; // set output to gamma correction
            newRenderer.physicallyCorrectLights = true; // lights will be physically correct
            // handleResize(newRenderer,camera,model)
            console.log("renderer up")
            return newRenderer
          };



     const animate = (renderer, model, camera, scene, mixer, controls) => {
    requestAnimationFrame(() => animate(renderer, model, camera, scene, mixer, controls));
    controls.update();

    // Rotate the model around its Y-axis
    if (model) {
        model.rotation.y += 0.004; // Adjust this value to get the desired speed
    }

    // Update the mixer on each frame
    if (mixer) {
        // Make the animation 1 second slower
        mixer.timeScale = 1.2; // Adjust this value to get the desired speed
        mixer.update(clock.getDelta());
    }

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
};
      



    const loadModel = (controls, newScene) => {
      return new Promise((resolve, reject) => {
          const loader = new GLTFLoader();
  
          // Load your 3D model
          loader.load(
              process.env.PUBLIC_URL + '/Model2/source/model.gltf',
              (gltf) => {
                  // Add the loaded scene to your Three.js scene
                  const loadedModel = gltf.scene;
                  newScene.add(loadedModel);
  
                  let loadedMixer;
                  if (gltf.animations && gltf.animations.length > 0) {
                      loadedMixer = new THREE.AnimationMixer(loadedModel);
                      let action = loadedMixer.clipAction(gltf.animations[1]);
                      action.play();
                  }
           
                  loadedModel.position.y -= 2.9;
                  loadedModel.position.x =-0.1;
                  loadedModel.rotation.y += .3;
                  controls.update();
                  console.log("model loaded")
                  resolve({loadedModel, loadedMixer});
                  
              },
              undefined,
              (error) => {
                  console.error(error);
                  reject(error);
              }
          );
      });
  };
  
      const cameraSetup = (camera) => {
        camera.position.z += 4 *-1; // Set the camera position
        console.log("camera up")
        return camera
        
      };
      

    const lightsSetup = (scene) => {
        const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 0.1, 0.1);
        pointLight.position.set(0, 0, 5);
        scene.add(pointLight);
      
        // Add a directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
        directionalLight.position.set(0.1, 0.1, 0.5);
        scene.add(directionalLight);
      
        // Add a hemisphere light
        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 10);
        scene.add(hemisphereLight);
        console.log("lit up")
        return scene
      };
      

    return( <div className='Canvas-Wrapper'>
          <Bubble/>
        <canvas ref={canvasRef} ></canvas>
         </div>)
        }
export default ThreeComponent;
