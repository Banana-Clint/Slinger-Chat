import React, { useEffect,useRef,useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import './Model1.css';
import Bubble from "../Bubble/Bubble.js";

const ThreeComponent = () => {

      const canvasRef = useRef();
      const [clock] = useState(new THREE.Clock());
      const configuredRendererRef = useRef();
      const configuredCameraRef = useRef();
      const loadedModelRef=useRef();
      const currentWidthRef=useRef(window.innerWidth);
      const firstResizeRef=useRef(true);
      const firstSmallToBigResizeRef=useRef(false);

useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
        console.log('canvas up');
        const fov = 80, aspect = window.innerWidth / window.innerHeight, near = 2, far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        const configuredCamera = cameraSetup(camera);
        configuredCameraRef.current = configuredCamera;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        const configuredRenderer = rendererSetup(renderer);
        configuredRendererRef.current = configuredRenderer;
        const newControls = new TrackballControls(configuredCamera, configuredRenderer.domElement);
        controlsSetup(newControls);
        const scene = new THREE.Scene();
        const litScene = lightsSetup(scene);

        async function loadAndAnimateModel() {
            const { loadedModel, loadedMixer } = await loadModel(newControls, litScene);
            loadedModelRef.current = loadedModel; 
            animate(configuredRenderer, loadedModel, configuredCamera, litScene, loadedMixer);
         
            
        }
        loadAndAnimateModel();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }
}, []);

function handleResize() {
  const newWidth = window.innerWidth;
  configuredRendererRef.current.setSize(newWidth, window.innerHeight);
  configuredCameraRef.current.aspect = newWidth / window.innerHeight;
  configuredCameraRef.current.updateProjectionMatrix();
  if (newWidth < currentWidthRef.current) {
    if(newWidth<=900 && firstResizeRef.current) 
    {
      firstSmallToBigResizeRef.current=false
      loadedModelRef.current.position.x=2.5
      loadedModelRef.current.position.y +=0.9;
      configuredCameraRef.current.position.z =-6.5;
      loadedModelRef.current.rotation.y -= 0.45; 
      firstResizeRef.current=false;
    }
      configuredCameraRef.current.position.z -= 0.05;
      loadedModelRef.current.position.x -=0.8
  } else if (newWidth > currentWidthRef.current) {
    if(currentWidthRef.current<=900 && newWidth>=900 && !firstSmallToBigResizeRef.current) {
      firstSmallToBigResizeRef.current=true
      
      loadedModelRef.current.position.y -=0.9;
      loadedModelRef.current.position.x=8;
      loadedModelRef.current.rotation.y += 0.45; 
      configuredCameraRef.current.position.z = -6.4;
      firstResizeRef.current=true
    }
      configuredCameraRef.current.position.z += .15;
      loadedModelRef.current.position.x -=0.02
  }


  // Update the current width for the next resize event
  currentWidthRef.current = newWidth;
}

      const animate = (renderer, model,camera,scene,mixer) => {
        requestAnimationFrame(() => animate( renderer, model, camera,scene,mixer));
      
        // // Update the mixer on each frame
        if (mixer) {
          // Make the animation 1 second slower
          mixer.timeScale = 1.2; // Adjust this value to get the desired speed
          mixer.update(clock.getDelta());
        }
      

        // if (controls) {
        //   controls.update(); // Update the controls in the animation loop
        // }
        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };
      

    const controlsSetup = (newControls) => {
        newControls.noPan = true; // Disables panning
        newControls.noZoom = true; // Disables zooming
        newControls.noRotate = false; // Disables rotation
        return newControls
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
                  if(currentWidthRef.current<=900) 
                  {
                    if(currentWidthRef.current<=450){
                      loadedModel.position.y -= 1;
                      loadedModel.position.x = -1;
                    loadedModel.rotation.y += .5;
                    }else{
                  loadedModel.position.y -= 1.5;
                    loadedModel.position.x =+1;
                  loadedModel.rotation.y += .5;
                    }
                  }
                  else{ 
                  loadedModel.position.y -= 3;
                  loadedModel.position.x += 8.5;
                  loadedModel.rotation.y += 1.3;
                  }
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
        camera.position.z += 6.5 *-1; // Set the camera position
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
      

    return <div>
          <Bubble/>
        <canvas ref={canvasRef} ></canvas>
         </div>
        }
export default ThreeComponent;
