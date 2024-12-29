import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import GUI from "lil-gui";

// Debug
const gui = new GUI({
	title: "Options",
	closeFolders: true,
});
gui.close();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 5);
const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 3;
pointLight.position.x = 3;
pointLight.position.x = 4;
const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(ambientLight, pointLight);

// Textures
const textureLoader = new THREE.TextureLoader();
// const matcapTexture = textureLoader.load("textures/matcaps/8.png");
// matcapTexture.colorSpace = THREE.SRGBColorSpace;
const colorTexture = textureLoader.load(
	"./textures/ChristmasTreeOrnament/ChristmasTreeOrnament_Color.png"
);
colorTexture.colorSpace = THREE.SRGBColorSpace;
const displacementTexture = textureLoader.load(
	"./textures/ChristmasTreeOrnament/ChristmasTreeOrnament_Displacement.png"
);
// no height
const normalTexture = textureLoader.load(
	"./textures/ChristmasTreeOrnament/ChristmasTreeOrnament_NormalGL.png"
);
const roughnessTexture = textureLoader.load(
	"./textures/ChristmasTreeOrnament/ChristmasTreeOrnament_Roughness.png"
);
const metalnessTexture = textureLoader.load(
	"./textures/ChristmasTreeOrnament/ChristmasTreeOrnament_Metalness.png"
);

// Fonts
const fontLoader = new FontLoader();

fontLoader.load("/fonts/poly.json", (font) => {
	// Material
	// const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
	const material = new THREE.MeshStandardMaterial();
	material.map = colorTexture;
	material.metalnessMap = metalnessTexture;
	material.roughnessMap = roughnessTexture;

	// Text
	const textGeometry = new TextGeometry("Happy New Year", {
		font: font,
		size: 0.3,
		depth: 0.2,
		curveSegments: 25,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 20,
	});
	textGeometry.center();

	const text = new THREE.Mesh(textGeometry, new THREE.MeshNormalMaterial());
	scene.add(text);

	const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);
	const sphereGeometry = new THREE.SphereGeometry(0.3, 30, 20);
	const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

	for (let i = 0; i < 75; i++) {
		const donut = new THREE.Mesh(
			donutGeometry,
			new THREE.MeshNormalMaterial()
		);
		donut.position.x = (Math.random() - 0.5) * 15;
		donut.position.y = (Math.random() - 0.5) * 15;
		donut.position.z = (Math.random() - 0.5) * 15;
		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.y = Math.random() * Math.PI;
		const scale = Math.random();
		donut.scale.set(scale, scale, scale);

		scene.add(donut);
	}
	for (let i = 0; i < 300; i++) {
		const sphere = new THREE.Mesh(
			sphereGeometry,
			new THREE.MeshNormalMaterial()
		);
		sphere.position.x = (Math.random() - 0.5) * 15;
		sphere.position.y = (Math.random() - 0.5) * 15;
		sphere.position.z = (Math.random() - 0.5) * 15;
		sphere.rotation.x = Math.random() * Math.PI;
		sphere.rotation.y = Math.random() * Math.PI;
		const scale = Math.random();
		sphere.scale.set(scale, scale, scale);

		scene.add(sphere);
	}
	for (let i = 0; i < 75; i++) {
		const cube = new THREE.Mesh(
			cubeGeometry,
			new THREE.MeshNormalMaterial()
		);
		cube.position.x = (Math.random() - 0.5) * 15;
		cube.position.y = (Math.random() - 0.5) * 15;
		cube.position.z = (Math.random() - 0.5) * 15;
		cube.rotation.x = Math.random() * Math.PI;
		cube.rotation.y = Math.random() * Math.PI;
		const scale = Math.random();
		cube.scale.set(scale, scale, scale);

		scene.add(cube);
	}
});

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 0.5;
camera.position.y = 0.5;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Render
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
