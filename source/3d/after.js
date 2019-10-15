/* global performance Sequence THREE */

const main = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // translate (width / 2.0, height / 2.0, - (max (width, height) * 0.4));
  camera.position.z = 4.0;
  // ambientLight (245, 245, 245);
  const ambientLight = new THREE.AmbientLight(0xfefefe);
  scene.add(ambientLight);
  // directionalLight (50, 50, 50, 0, 1, -1);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(-2.5, 5, 10);
  scene.add(directionalLight);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );
  const sequence = new Sequence(scene, performance.now());
  function animate(now) {
	requestAnimationFrame(animate);
    sequence.updateObjects(now);
	renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
};

window.onload = main;
