import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


//Components
const scene = new THREE.Scene();
const loader = new GLTFLoader();
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
//

//
const accept_click = 1;
const max_trials = 15;
const start_delay = 3000;
const interval_delay = 1000;
const width = window.innerWidth;
const height = window.innerHeight;
//

//
var trial_num = 0;
var time = [];
var target_location = [];
var target_clicked = 0;
var start_time = 0;
var prev_time = 0;
//

//Window Resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//

//Grid Helper
//const size = 10;
//const divisions = 10;
//
//const gridHelper = new THREE.GridHelper( size, divisions );
//scene.add( gridHelper );
//

//Camera
 const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   1000
 );
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 10 );
scene.add( camera );
camera.position.set(0, 0, 10);
camera.rotation.set(0,0,0);
//

//Light
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set(100, 100, 100);
scene.add( directionalLight );
//


// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor("#fffffff");
//

////Mouse
//Move
const onMouseMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //console.log("Mouse Location: " + pointer.x + ", " + pointer.y);

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  // scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000) );

  if(intersects.length > 0){
    var TargetLocation = intersects[0].point;
    intersects[0].object.material.color.set(0xff0000);
    // console.log('Intersection Object: ' + intersects[0].object);
    // console.log('Target Location:'+ TargetLocation);
  }
  else{
    //intersects[0].object.material.color.set(0xfafafa);
    //console.log('No intersection');
  }
};

//Click
const onMouseClick = (event) => {

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //console.log("Mouse Location: " + pointer.x + ", " + pointer.y);

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  // scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000) );
  if(intersects.length > 0){
    var TargetLocation = intersects[0].point;
    intersects[0].object.material.color.set(0x00ff00);
    scene.remove(intersects[0].object);
    target_clicked = 1;
    // console.log('Intersection Object: ' + intersects[0].object);
    // console.log('Target Location:'+ TargetLocation);
  }
    };
    //
    
    //Add target
    const addTarget = (x,y,z) => {
      const geometry = new THREE.BoxGeometry( 0.5, 0.5 , 0.5 );
      const material = new THREE.MeshBasicMaterial( { color: 0xfafafa } );
      const cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      console.log('Target Position: ' + x + ', ' + y + ', ' + z);
      cube.position.set(x,y,z);
    };
    //

    //Start Game
    function start_test(){
      console.log("Start Test");
      setInterval(generateTargets(), interval_delay);
      start_time = Date.now();
      prev_time = start_time;
    }
    //

    //Generate targets
    function generateTargets(){
      while(CheckGameStat()){
        if(Date.now()-prev_time >interval_delay || target_clicked == 1){
        {
          target_clicked = 0;
          var x = (Math.random()-0.5) * 10 - 1;
          var y = (Math.random()-0.5) * 10 - 1;
          var z = 0;
          addTarget(x,y,z);
          time.push(Date.now()-prev_time);
          target_location.push([x,y,z]);
          trial_num++;
          prev_time = Date.now();
        }
      }
}
    }
//

//CheckGameStatus
function CheckGameStat(){
  return trial_num < max_trials;
}
//

//EndGame
function EndGame(){
  console.log("Game Over");
  //Show results
  //SS or .csv?

}


//
//Event Listeners
// window.addEventListener('mousemove' , onMouseMove);
window.addEventListener('click' , onMouseClick);
window.addEventListener('resize', onWindowResize);


window.setTimeout(start_test, start_delay);
addTarget(0,1,0);
// addTarget(0,-1,0);
// addTarget(2,1,0);
// addTarget(2,-1,0);
// addTarget(-2,-1,0);
// addTarget(-2,1,0);


//animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

