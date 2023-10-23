import { computed, onMounted, ref } from "vue";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const ImageImport = () => {
  const canvasContainer = ref<HTMLElement | null>(null);

  let scene: any, renderer: any, camera: any, stats: any;
  let model: any, skeleton: any, mixer: any, clock: any;

  const crossFadeControls: any = [];

  const allActions: any = [];
  const baseActions: any = {
    idle: { weight: 1 },
    walk: { weight: 0 },
    run: { weight: 0 },
  };
  const additiveActions: any = {
    sneak_pose: { weight: 0 },
    sad_pose: { weight: 0 },
    agree: { weight: 0 },
    headShake: { weight: 0 },
  };
  let panelSettings: any, numAnimations: any;

  init();

  function init() {
    //Create Scene
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(3, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);
    // ground
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);
    //Camera
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(-1, 2, 3);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.target.set(0, 1, 0);
    controls.update();

    const loader = new GLTFLoader();
    loader.load("src/models/Xbot.glb", function (gltf) {
      model = gltf.scene;
      scene.add(model);

      model.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
      });

      skeleton = new THREE.SkeletonHelper(model);
      skeleton.visible = false;
      scene.add(skeleton);

      const animations = gltf.animations;
      mixer = new THREE.AnimationMixer(model);

      numAnimations = animations.length;

      for (let i = 0; i !== numAnimations; ++i) {
        let clip = animations[i];
        const name = clip.name;

        if (baseActions[name]) {
          const action = mixer.clipAction(clip);
          activateAction(action);
          baseActions[name].action = action;
          allActions.push(action);
        } else if (additiveActions[name]) {
          // Make the clip additive and remove the reference frame

          THREE.AnimationUtils.makeClipAdditive(clip);

          if (clip.name.endsWith("_pose")) {
            clip = THREE.AnimationUtils.subclip(clip, clip.name, 2, 3, 30);
          }

          const action = mixer.clipAction(clip);
          activateAction(action);
          additiveActions[name].action = action;
          allActions.push(action);
        }
      }

      animate();
    });
    stats = new Stats();
  }

  function activateAction(action: any) {
    const clip = action.getClip();
    const settings = baseActions[clip.name] || additiveActions[clip.name];
    setWeight(action, settings.weight);
    action.play();
  }

  // This function is needed, since animationAction.crossFadeTo() disables its start action and sets
  // the start action's timeScale to ((start animation's duration) / (end animation's duration))

  function setWeight(action: any, weight: any) {
    action.enabled = true;
    action.setEffectiveTimeScale(1);
    action.setEffectiveWeight(weight);
  }

  function onWindowResize() {
    if (canvasContainer.value) {
      const containerWidth = canvasContainer.value.clientWidth;
        const containerHeight = canvasContainer.value.clientHeight;
      camera.aspect = containerWidth / containerHeight;
      renderer.setSize(containerWidth, containerHeight);
      camera.updateProjectionMatrix();
    }
  }

  function animate() {
    // Render loop

    requestAnimationFrame(animate);

    for (let i = 0; i !== numAnimations; ++i) {
      const action = allActions[i];
      const clip = action.getClip();
      const settings = baseActions[clip.name] || additiveActions[clip.name];
      settings.weight = action.getEffectiveWeight();
    }

    // Get the time elapsed since the last frame, used for mixer update

    const mixerUpdateDelta = clock.getDelta();

    // Update the animation mixer, the stats panel, and render this frame

    mixer.update(mixerUpdateDelta);

    stats.update();

    renderer.render(scene, camera);
  }

  onMounted(() => {
    if (canvasContainer.value) {
      onWindowResize();
      canvasContainer.value.appendChild(renderer.domElement);
      canvasContainer.value.addEventListener("click", () => {
        console.log("123");
      });
    }
  });

  return {
    canvasContainer,
  };
};

export default ImageImport;
