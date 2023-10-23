import { computed, onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  createFace,
  createNeck,
  createchest,
  createStomach,
  createHip,
  createLeftThigh,
  createRightThigh,
  createLeftKnee,
  createRightKnee,
  createLeftLeg,
  createRightLeg,
  createRightFoot,
  createLeftFoot,
  createLeftShoulder,
  createRightShoulder,
  createLeftArm,
  createRightArm,
  createLeftForeArm,
  createRightForeArm,
  createLeftHand,
  createRightHand,
} from "./BodyParts";

const clickableObjects: any = [];
const namePartBody: Array<string> = [];
const ImageViewVue = () => {
  const canvasContainer = ref<HTMLElement | null>(null);
  const listBodyParts = ref<Array<any>>([]);
  //Crear escenario
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 9;

  const selectedColor = 0x0000ff; // Color cuando se selecciona
  const deselectedColor = 0xff0000; // Color cuando no se selecciona
  //sirve para manipular el lienzo (escenario) como el tamaño, resolucion
  const renderer = new THREE.WebGLRenderer();
  //renderer.setSize(window.innerWidth, window.innerHeight);
  //document.body.appendChild(renderer.domElement);

  // sirve para permitir rotar el escenario
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Habilita la amortiguación para movimientos suaves
  controls.dampingFactor = 0.05; // Ajusta la velocidad de amortiguación
  //
  function addFigureToScenario(
    part: any,
    idPart: string,
    x: number,
    y: number,
    z: number
  ) {
    clickableObjects.push(part);
    namePartBody.push(idPart);
    scene.add(part);
    part.userData = { clickable: true, id: idPart };
    part.position.set(x, y, z);
  }

  //face
  const face = createFace(deselectedColor);
  addFigureToScenario(face, "face", 0, 3, 0);
  //neck
  const neck = createNeck(deselectedColor);
  addFigureToScenario(neck, "neck", 0, 2.1, 0);
  //chest
  const chest = createchest(deselectedColor);
  addFigureToScenario(chest, "chest", 0, 1.4, -0.25);
  //left Shoulder
  const leftChest = createLeftShoulder(deselectedColor);
  addFigureToScenario(leftChest, "leftChest", -1.3, 1.4, -0.25);
  //Right Shoulder
  const rightChest = createRightShoulder(deselectedColor);
  addFigureToScenario(rightChest, "rightChest", 1.3, 1.4, -0.25);
  //stomach
  const stomach = createStomach(deselectedColor);
  addFigureToScenario(stomach, "stomach", 0, 0.08, 0);
  //hip
  const hip = createHip(deselectedColor);
  addFigureToScenario(hip, "hip", 0, -1.2, -0.25);
  //Left Leg
  const LeftThigh = createLeftThigh(deselectedColor);
  addFigureToScenario(LeftThigh, "leftThigh", -0.5, -2.4, -0.25);
  //Right Thigh
  const rightThigh = createRightThigh(deselectedColor);
  addFigureToScenario(rightThigh, "rightThigh", 0.5, -2.4, -0.25);
  //Left Knee
  const leftknee = createLeftKnee(deselectedColor);
  addFigureToScenario(leftknee, "leftknee", -0.5, -3.3, -0.25);
  //Right Knee
  const rightknee = createRightKnee(deselectedColor);
  addFigureToScenario(rightknee, "rightknee", 0.5, -3.3, -0.25);
  //Left Knee
  const leftLeg = createLeftLeg(deselectedColor);
  addFigureToScenario(leftLeg, "leftLeg", -0.5, -4.24, -0.25);
  //Right Knee
  const rightLeg = createRightLeg(deselectedColor);
  addFigureToScenario(rightLeg, "rightLeg", 0.5, -4.24, -0.25);
  //Right Foot
  const rightFootBase = createRightFoot(deselectedColor);
  addFigureToScenario(rightFootBase, "rightFootBase", 0.5, -5.4, -0.25);
  //Left Foot
  const leftFootBase = createLeftFoot(deselectedColor);
  addFigureToScenario(leftFootBase, "leftFootBase", -0.7, -6.05, -0.25);
  //left Arm
  const leftArm = createLeftArm(deselectedColor);
  addFigureToScenario(leftArm, "leftArm", -1.3, 0.3, -0.25);
  //Right Arm
  const rightArm = createRightArm(deselectedColor);
  addFigureToScenario(rightArm, "rightArm", 1.3, 0.3, -0.25);
  //left Fore Arm
  const leftForeArm = createLeftForeArm(deselectedColor);
  addFigureToScenario(leftForeArm, "leftForeArm", -1.3, -1, -0.25);
  //Right Fore Arm
  const rightForeArm = createRightForeArm(deselectedColor);
  addFigureToScenario(rightForeArm, "rightForeArm", 1.3, -1, -0.25);
  //left Hand
  const leftHand = createLeftHand(deselectedColor);
  addFigureToScenario(leftHand, "leftHand", -1.3, -2.1, -0.25);
  //right Hand
  const rightHand = createRightHand(deselectedColor);
  addFigureToScenario(rightHand, "rightHand", 1.3, -2.1, -0.25);

  const toggleColor = (targetId: string) => {
    
    let materialGrl: any;
    const partsBody: any = {
      face: face,
      neck: neck,
      chest: chest,
      leftChest: leftChest,
      rightChest: rightChest,
      stomach: stomach,
      hip: hip,
      leftLeg: leftLeg,
      leftThigh: LeftThigh,
      rightThigh: rightThigh,
      leftknee: leftknee,
      rightknee: rightknee,
      rightLeg: rightLeg,
      rightFootBase: rightFootBase,
      leftFootBase: leftFootBase,
      leftArm: leftArm,
      rightArm: rightArm,
      leftForeArm: leftForeArm,
      rightForeArm: rightForeArm,
      leftHand: leftHand,
      rightHand: rightHand,
    };

    const figureSelected: any = partsBody[targetId] ?? "n/a";

    const material = figureSelected.material as THREE.MeshBasicMaterial;
    const materials = figureSelected.children;

    if (material) {
      if (material.color.getHex() === selectedColor) {
        material.color.setHex(deselectedColor);
        deleteList(targetId);
      } else {
        material.color.setHex(selectedColor);
        addList(targetId);
      }
    }

    if (materials) {
      //const materials = figureSelected?.children[0]?.material as THREE.MeshBasicMaterial
      for (let i = 0; i < materials.length; i++) {
        if (materials[i].material.color.getHex() === selectedColor) {
          materials[i].material.color.setHex(deselectedColor);
          deleteList(targetId);
        } else {
          materials[i].material.color.setHex(selectedColor);
          addList(targetId);
        }
      }
    }
  };

  const addList = (targetId: string) => {
    const obj: any = {
      value: targetId,
    };
    const validationElement = listBodyParts.value.find(
      (v) => v.value == obj.value
    );

    if (!validationElement) {
      listBodyParts.value.push(obj);
    }
  };

  const deleteList = (targetId: string) => {
    const obj: any = {
      value: targetId,
    };
    listBodyParts.value = listBodyParts.value.filter(
      (v) => v.value != obj.value
    );
  };

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  }

  animate();

  onMounted(() => {
    if (canvasContainer.value) {
      canvasContainer.value.style.backgroundColor = "blue";
      const containerWidth = canvasContainer.value.clientWidth;
      const containerHeight = canvasContainer.value.clientHeight;
      // Configura el tamaño del renderizador para que coincida con las dimensiones del contenedor
      renderer.setSize(containerWidth, containerHeight);
      canvasContainer.value.appendChild(renderer.domElement);
      // Actualiza la relación de aspecto de la cámara
      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
      //detectar clics en un objeto
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // Configura un manejador de clics en el contenedor en lugar de la ventana
      canvasContainer.value.addEventListener("click", (event) => {
        // Calcula las coordenadas del mouse en relación con el contenedor
        if (canvasContainer.value) {
          const rect = canvasContainer.value.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / containerWidth) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / containerHeight) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(clickableObjects, true);
          if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            if (clickedObject.userData.clickable) {
              const objectId = clickedObject.userData.id;
              toggleColor(objectId);
            }
          }
        }
      });
    }
  });

  return {
    canvasContainer,
    listBodyParts,
  };
};

export default ImageViewVue;
