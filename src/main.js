var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(0xEEEEEE, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);

var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;

plane.rotation.x=-0.5*Math.PI;
plane.position.x=15;
plane.position.y=0;
plane.position.z=0;
scene.add(plane);

var cubeGeometry = new THREE.CubeGeometry(4,4,4);
var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;

// position the cube
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

// add the cube to the scene
scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(4,20,20);
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

// position the sphere
sphere.position.x = 20;
sphere.position.y = 0;
sphere.position.z = 2;
sphere.castShadow = true;

// add the sphere to the scene
scene.add(sphere);

// position and point the camera to the center of the scene
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

// add subtle ambient lighting
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 4096;
spotLight.shadow.mapSize.height = 4096;
scene.add(spotLight);

// call the render function
var step=0;
render();

function render() {
  // rotate the cube around its axes
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  cube.rotation.z += 0.02;

  // bounce the sphere up and down
  sphere.position.x = 20+( 10*(Math.cos(step+=0.01)));
  sphere.position.y = 2 +( 10*Math.abs(Math.sin(step+=0.03)));

  // render using requestAnimationFrame
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
