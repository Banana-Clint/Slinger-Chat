import React, { useEffect,useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import './Model1.css';

const ThreeComponent = () => {
    const containerRef = useRef();

    useEffect(() => {
        console.log('hoho')
        const canvas = document.createElement('canvas');
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); 
        renderer.gammaOutput = true; // set output to gamma correction
        renderer.physicallyCorrectLights = true; // lights will be physically correct
        const clock = new THREE.Clock();
        const scene = new THREE.Scene();
        const fov = 75, aspect = window.innerWidth/window.innerHeight, near =0.1, far =1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z += 3.8;// Set the camera position
        camera.position.y +=4.5
        containerRef.current.appendChild(renderer.domElement);
        // Add lights to the scene
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
    
 
        // Create a GLTFLoader instance
        const loader = new GLTFLoader();
        // Create an instance of TrackballControls
        const controls = new TrackballControls(camera, renderer.domElement);
        controls.noPan = true; // Disables panning
        controls.noZoom = true; // Disables zooming
    //buffer adjustment
        
    // Load your 3D model
    let model;
    let mixer;
    loader.load(
        process.env.PUBLIC_URL + '/Model2/source/model.gltf',
        (gltf) => {
            // Add the loaded scene to your Three.js scene
            model = gltf.scene;
            // Rotate the model to face the right side of the screen
            
    
            scene.add(model);
            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(model);
                const action = mixer.clipAction(gltf.animations[1]);
                action.play();
            }
            // Update the camera position so that the model is in the boxCenter of the scene
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const boxSize = box.getSize(new THREE.Vector3()).length();
            const boxCenter = box.getCenter(new THREE.Vector3());
            // center the model and adjust model position
            model.position.copy(boxCenter);
            model.position.y -= 3.2
            model.rotation.y = Math.PI+0.3; // Rotate 180 degrees
            controls.target.copy(boxCenter);
            controls.update();
        },
        undefined,
        (error) => {
            console.error(error);
        }
    );
    
    var animate = function () {
        requestAnimationFrame(animate);
    
        // Update the mixer on each frame
        if (mixer) {
            // Make the animation 1 second slower
            mixer.timeScale = 0.5; // Adjust this value to get the desired speed
            mixer.update(clock.getDelta());
        }
    
        controls.update(); // Update the controls in the animation loop
        renderer.render(scene, camera);
    };
    
    animate();
    
    }, []);

    return <div ref={containerRef} id="three-container" style={{margin:"0",padding:"0"}} ></div>
        }
export default ThreeComponent;
