import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import GUI from "lil-gui";

// Globals
const globals = {
	innerSpheresCount: 0,
	midSphereCount: 0,
	outerSphereCount: 0,
}
let innerSphereStore = [];
let midSphereStore = [];
let outerSphereStore = [];


// Debug
const gui = new GUI({
	title: "Customize :)",
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
const matcapTexture = textureLoader.load(
	"textures/matcaps/6D1616_E6CDBA_DE2B24_230F0F-512px.png",
);
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Fonts
const fontLoader = new FontLoader();

// Material
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });


fontLoader.load("/fonts/poly.json", (font) => {

	// Text
	const textGeometry = new TextGeometry("Happy July", {
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

	// const text = new THREE.Mesh(textGeometry, new THREE.MeshNormalMaterial());
	const text = new THREE.Mesh(textGeometry, material);
	scene.add(text);	
});

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);
const sphereGeometry = new THREE.SphereGeometry(0.3, 30, 20);
const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

const renderShapes = () => {
		for (const shape of [...innerSphereStore, ...midSphereStore, ...outerSphereStore]) {
			scene.remove(shape)
			shape.geometry.dispose();
		}

		innerSphereStore.length = 0
		midSphereStore.length = 0
		outerSphereStore.length = 0

		console.log(innerSphereStore)

		for (let i = 0; i < 300; i++) {
		const donut = new THREE.Mesh(
			donutGeometry,
			new THREE.MeshNormalMaterial(),
		);
		donut.position.x = (Math.random() - 0.5) * 50;
		donut.position.y = (Math.random() - 0.5) * 50;
		donut.position.z = (Math.random() - 0.5) * 50;
		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.y = Math.random() * Math.PI;
		const scale = Math.random();
		donut.scale.set(scale, scale, scale);

		scene.add(donut);
	}
	for (let i = 0; i < 150; i++) {
		const donut = new THREE.Mesh(donutGeometry, material);
		donut.position.x = (Math.random() - 0.5) * 20;
		donut.position.y = (Math.random() - 0.5) * 20;
		donut.position.z = (Math.random() - 0.5) * 20;
		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.y = Math.random() * Math.PI;
		const scale = Math.random() * 0.7;
		donut.scale.set(scale, scale, scale);

		scene.add(donut);
	}
	for (let i = 0; i < globals.outerSphereCount; i++) {
		const sphere = new THREE.Mesh(
			sphereGeometry,
			new THREE.MeshNormalMaterial(),
		);
		sphere.position.x = (Math.random() - 0.5) * 50;
		sphere.position.y = (Math.random() - 0.5) * 50;
		sphere.position.z = (Math.random() - 0.5) * 50;
		sphere.rotation.x = Math.random() * Math.PI;
		sphere.rotation.y = Math.random() * Math.PI;
		const scale = Math.random();
		sphere.scale.set(scale, scale, scale);

		outerSphereStore.push(sphere)
		scene.add(sphere);
	}
	for (let i = 0; i < globals.midSphereCount; i++) {
		const sphere = new THREE.Mesh(sphereGeometry, material);
		sphere.position.x = (Math.random() - 0.5) * 30;
		sphere.position.y = (Math.random() - 0.5) * 30;
		sphere.position.z = (Math.random() - 0.5) * 30;
		sphere.rotation.x = Math.random() * Math.PI;
		sphere.rotation.y = Math.random() * Math.PI;
		const scale = Math.random() * 0.8;
		sphere.scale.set(scale, scale, scale);

		midSphereStore.push(sphere)
		scene.add(sphere);
	}
	for (let i = 0; i < globals.innerSpheresCount; i++) {
		const sphere = new THREE.Mesh(
			sphereGeometry,
			new THREE.MeshNormalMaterial(),
		);
		sphere.position.x = (Math.random() - 0.5) * 15;
		sphere.position.y = (Math.random() - 0.5) * 15;
		sphere.position.z = (Math.random() - 0.5) * 15;
		sphere.rotation.x = Math.random() * Math.PI;
		sphere.rotation.y = Math.random() * Math.PI;
		const scale = Math.random() * 0.6;
		sphere.scale.set(scale, scale, scale);

		innerSphereStore.push(sphere)
		scene.add(sphere);
	}
	for (let i = 0; i < 300; i++) {
		const cube = new THREE.Mesh(
			cubeGeometry,
			new THREE.MeshNormalMaterial(),
		);
		cube.position.x = (Math.random() - 0.5) * 50;
		cube.position.y = (Math.random() - 0.5) * 50;
		cube.position.z = (Math.random() - 0.5) * 50;
		cube.rotation.x = Math.random() * Math.PI;
		cube.rotation.y = Math.random() * Math.PI;
		const scale = Math.random();
		cube.scale.set(scale, scale, scale);

		scene.add(cube);
	}
	for (let i = 0; i < 300; i++) {
		const cube = new THREE.Mesh(cubeGeometry, material);
		cube.position.x = (Math.random() - 0.5) * 15;
		cube.position.y = (Math.random() - 0.5) * 15;
		cube.position.z = (Math.random() - 0.5) * 15;
		cube.rotation.x = Math.random() * Math.PI;
		cube.rotation.y = Math.random() * Math.PI;
		const scale = Math.random() * 0.7;
		cube.scale.set(scale, scale, scale);

		scene.add(cube);
	}
}

renderShapes();

// Debug GUI
const shapeCountGUI = gui.addFolder("Shape Counts")
shapeCountGUI
.add(globals, 'innerSpheresCount')
.min(50)
.max(5000)
.step(5)
.name("Inner Spheres")
.onFinishChange(() => {
	renderShapes()
})


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
	100,
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
