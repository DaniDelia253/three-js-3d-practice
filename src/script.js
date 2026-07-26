import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import GUI from "lil-gui";

// Globals
const globals = {
	innerSpheresCount: 10,
	midSphereCount: 10,
	outerSphereCount: 10,
	innerDonutCount: 10,
	midDonutCount: 10,
	outerDonutCount: 10,
	innerCubeCount: 10,
	midCubeCount: 10,
	outerCubeCount: 10,
	innerSphereStore: [],
	midSphereStore: [],
	outerSphereStore: [],
	innerDonutStore: [],
	midDonutStore: [],
	outerDonutStore: [],
	innerCubeStore: [],
	midCubeStore: [],
	outerCubeStore: [],
};

const clearStores = () => {
	globals.innerSphereStore.length = 0;
	globals.midSphereStore.length = 0;
	globals.outerSphereStore.length = 0;
	globals.innerDonutStore.length;
	globals.midDonutStore.length = 0;
	globals.outerDonutStore.length = 0;
	globals.innerCubeStore.length = 0;
	globals.midCubeStore.length = 0;
	globals.outerCubeStore.length = 0;
};

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
	for (const shape of [
		...globals.innerSphereStore,
		...globals.midSphereStore,
		...globals.outerSphereStore,
		...globals.innerDonutStore,
		...globals.midDonutStore,
		...globals.outerDonutStore,
		...globals.innerCubeStore,
		...globals.midCubeStore,
		...globals.outerCubeStore,
	]) {
		scene.remove(shape);
		shape.geometry.dispose();
	}

	clearStores();

	for (let i = 0; i < globals.outerDonutCount; i++) {
		const donut = new THREE.Mesh(
			donutGeometry,
			new THREE.MeshNormalMaterial(),
		);
		donut.position.x = (Math.random() - 0.5) * 60;
		donut.position.y = (Math.random() - 0.5) * 60;
		donut.position.z = (Math.random() - 0.5) * 60;
		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.y = Math.random() * Math.PI;
		const scale = Math.random();
		donut.scale.set(scale, scale, scale);

		globals.outerDonutStore.push(donut);
		scene.add(donut);
	}
	for (let i = 0; i < globals.midDonutCount; i++) {
		const donut = new THREE.Mesh(
			donutGeometry,
			new THREE.MeshNormalMaterial(),
		);
		donut.position.x = (Math.random() - 0.5) * 30;
		donut.position.y = (Math.random() - 0.5) * 30;
		donut.position.z = (Math.random() - 0.5) * 30;
		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.y = Math.random() * Math.PI;
		const scale = Math.random() * 0.8;
		donut.scale.set(scale, scale, scale);

		globals.midDonutStore.push(donut);
		scene.add(donut);
	}
	for (let i = 0; i < globals.innerDonutCount; i++) {
		const donut = new THREE.Mesh(
			donutGeometry,
			new THREE.MeshNormalMaterial(),
		);
		donut.position.x = (Math.random() - 0.5) * 15;
		donut.position.y = (Math.random() - 0.5) * 15;
		donut.position.z = (Math.random() - 0.5) * 15;
		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.y = Math.random() * Math.PI;
		const scale = Math.random() * 0.6;
		donut.scale.set(scale, scale, scale);

		globals.innerDonutStore.push(donut);
		scene.add(donut);
	}
	for (let i = 0; i < globals.outerSphereCount; i++) {
		const sphere = new THREE.Mesh(
			sphereGeometry,
			new THREE.MeshNormalMaterial(),
		);
		sphere.position.x = (Math.random() - 0.5) * 60;
		sphere.position.y = (Math.random() - 0.5) * 60;
		sphere.position.z = (Math.random() - 0.5) * 60;
		sphere.rotation.x = Math.random() * Math.PI;
		sphere.rotation.y = Math.random() * Math.PI;
		const scale = Math.random();
		sphere.scale.set(scale, scale, scale);

		globals.outerSphereStore.push(sphere);
		scene.add(sphere);
	}
	for (let i = 0; i < globals.midSphereCount; i++) {
		const sphere = new THREE.Mesh(
			sphereGeometry,
			new THREE.MeshNormalMaterial(),
		);
		sphere.position.x = (Math.random() - 0.5) * 30;
		sphere.position.y = (Math.random() - 0.5) * 30;
		sphere.position.z = (Math.random() - 0.5) * 30;
		sphere.rotation.x = Math.random() * Math.PI;
		sphere.rotation.y = Math.random() * Math.PI;
		const scale = Math.random() * 0.8;
		sphere.scale.set(scale, scale, scale);

		globals.midSphereStore.push(sphere);
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

		globals.innerSphereStore.push(sphere);
		scene.add(sphere);
	}
	for (let i = 0; i < globals.outerCubeCount; i++) {
		const cube = new THREE.Mesh(
			cubeGeometry,
			new THREE.MeshNormalMaterial(),
		);
		cube.position.x = (Math.random() - 0.5) * 60;
		cube.position.y = (Math.random() - 0.5) * 60;
		cube.position.z = (Math.random() - 0.5) * 60;
		cube.rotation.x = Math.random() * Math.PI;
		cube.rotation.y = Math.random() * Math.PI;
		const scale = Math.random();
		cube.scale.set(scale, scale, scale);

		globals.outerCubeStore.push(cube);
		scene.add(cube);
	}
	for (let i = 0; i < globals.midCubeCount; i++) {
		const cube = new THREE.Mesh(
			cubeGeometry,
			new THREE.MeshNormalMaterial(),
		);
		cube.position.x = (Math.random() - 0.5) * 30;
		cube.position.y = (Math.random() - 0.5) * 30;
		cube.position.z = (Math.random() - 0.5) * 30;
		cube.rotation.x = Math.random() * Math.PI;
		cube.rotation.y = Math.random() * Math.PI;
		const scale = Math.random() * 0.8;
		cube.scale.set(scale, scale, scale);

		globals.midCubeStore.push(cube);
		scene.add(cube);
	}
	for (let i = 0; i < globals.innerCubeCount; i++) {
		const cube = new THREE.Mesh(
			cubeGeometry,
			new THREE.MeshNormalMaterial(),
		);
		cube.position.x = (Math.random() - 0.5) * 15;
		cube.position.y = (Math.random() - 0.5) * 15;
		cube.position.z = (Math.random() - 0.5) * 15;
		cube.rotation.x = Math.random() * Math.PI;
		cube.rotation.y = Math.random() * Math.PI;
		const scale = Math.random() * 0.6;
		cube.scale.set(scale, scale, scale);

		globals.innerCubeStore.push(cube);
		scene.add(cube);
	}
};

renderShapes();

// Debug GUI
const shapeCountGUI = gui.addFolder("Shape Counts");
const shapeCountProps = [
	"innerSpheresCount-Inner Spheres",
	"innerDonutCount-Inner Donuts",
	"innerCubeCount-Inner Cubes",
	"midSphereCount-Middle Spheres",
	"midDonutCount-Middle Donuts",
	"midCubeCount-Middle Cubes",
	"outerSphereCount-Outer Spheres",
	"outerDonutCount-Outer Donuts",
	"outerCubeCount-OuterCubes",
];
for (const prop of shapeCountProps) {
	const props = prop.split("-")
	shapeCountGUI
		.add(globals, props[0])
		.min(50)
		.max(5000)
		.step(5)
		.name(props[1])
		.onFinishChange(() => {
			renderShapes();
		});
}

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
