import * as THREE from "three";
import { ExtrudeGeometry, Vector2, Shape } from "three";

export function createTriangle(deselectedColor: number,material:any) {
  const triangleSize = 0.65; // Tamaño del triángulo

  // Define los vértices del triángulo rectángulo
  const triangleShape = new THREE.Shape();
  triangleShape.moveTo(0, triangleSize); // Punto superior
  triangleShape.lineTo(0, 0); // Punto inferior izquierdo
  triangleShape.lineTo(triangleSize, 0); // Punto inferior derecho
  triangleShape.lineTo(0, triangleSize); // Vuelve al punto superior para cerrar el triángulo

  // Define la configuración de extrusión
  const extrudeSettings = {
    depth: 0.2, // Profundidad del triángulo
    bevelEnabled: false, // Sin bisel
  };

  // Crea la geometría extruida a partir de la forma y la configuración de extrusión
  const triangleGeometry = new THREE.ExtrudeGeometry(
    triangleShape,
    extrudeSettings
  );

  const triangleMaterial = new THREE.MeshBasicMaterial({
    color: deselectedColor,
  });
  const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);

  return triangle;
}
function circle(deselectedColor: number) {
  const radiusX = 1; // Radio en el eje X
  const radiusY = 10; // Radio en el eje Y
  const radiusZ = 5; // Radio en el eje Z
  const widthSegments = 32;
  const heightSegments = 32;

  const eggGeometry = new THREE.SphereGeometry(
    radiusX,
    widthSegments,
    heightSegments
  );
  const eggMaterial = new THREE.MeshBasicMaterial({ color: deselectedColor });
  const egg = new THREE.Mesh(eggGeometry, eggMaterial);

  // Aquí puedes ajustar la posición y la escala según tus necesidades
  egg.position.set(0, 0, 0); // Ajusta la posición

  return egg;
}
function cube(deselectedColor: number, cubeSize: number, halfCubeSize: number) {
  const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: deselectedColor });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // Ajusta la posición para que esté a la mitad del tamaño de la esfera en el eje Y
  cube.position.set(0, -halfCubeSize, 0); // Ajusta la posición
  return cube;
}

function trapezoid(deselectedColor: number) {
  const topWidth: number = 1.8;
  const bottomWidth: number = 1.8;
  const height: number = 1.8;
  const depth: number = 0.5;
  const topWidthHalf = topWidth / 2.5;
  const bottomWidthHalf = bottomWidth / 2;
  const heightHalf = height / 5;

  const trapezoidShape = new THREE.Shape();
  trapezoidShape.moveTo(-topWidthHalf, -heightHalf);
  trapezoidShape.lineTo(topWidthHalf, -heightHalf);
  trapezoidShape.lineTo(bottomWidthHalf, heightHalf);
  trapezoidShape.lineTo(-bottomWidthHalf, heightHalf);
  trapezoidShape.lineTo(-topWidthHalf, -heightHalf);

  // Define la configuración de extrusión
  const extrudeSettings = {
    depth: depth, // Ajusta la profundidad
    bevelEnabled: false,
  };

  // Crea la geometría extruida
  const extrudedTrapezoidGeometry = new THREE.ExtrudeGeometry(
    trapezoidShape,
    extrudeSettings
  );

  // Crea el material y el objeto 3D
  const trapezoidMaterial = new THREE.MeshBasicMaterial({
    color: deselectedColor,
  });
  const trapezoid = new THREE.Mesh(
    extrudedTrapezoidGeometry,
    trapezoidMaterial
  );

  return trapezoid;
}

function rectangle(
  deselectedColor: number,
  width: number,
  height: number,
  depth: number
) {
  const rectangleGeometry = new THREE.BoxGeometry(width, height, depth);
  const rectangleMaterial = new THREE.MeshBasicMaterial({
    color: deselectedColor,
  });
  const rectangle = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
  // Escala el rectángulo para que sea vertical
  rectangle.scale.set(1, 1, 1);
  return rectangle;
}

export function createFace(deselectedColor: number) {
  const circleFigure = circle(deselectedColor);
  circleFigure.scale.set(0.5, 0.6, 0.5); // Ajusta la escala
  return circleFigure;
}

export function createNeck(deselectedColor: number) {
  const cubeSize = 0.3; // Tamaño del cubo
  const halfCubeSize = cubeSize / 12; // La mitad del tamaño del cubo
  const figureCube = cube(deselectedColor, cubeSize, halfCubeSize);
  return figureCube;
}

export function createchest(deselectedColor: number) {
  const figureTrapezoid = trapezoid(deselectedColor);
  figureTrapezoid.position.set(1.0, 0.5, 0.5);
  return figureTrapezoid;
}

export function createStomach(deselectedColor: number) {
  const cubeSize = 1.6; // Tamaño del cubo
  const halfCubeSize = cubeSize / 2; // La mitad del tamaño del cubo
  const scaleFactor = 0.2;
  const figureCube = cube(deselectedColor, cubeSize, halfCubeSize);
  figureCube.scale.z = scaleFactor;
  return figureCube;
}

export function createHip(deselectedColor: number) {
  // Define los vértices del trapecio
  const figureTrapezoid = trapezoid(deselectedColor);
  figureTrapezoid.position.set(1.0, 0.5, 0.5);
  figureTrapezoid.position.set(1.0, 0.5, 0.5); // Ajusta la posición
  figureTrapezoid.rotation.set(0, 0, Math.PI / 1); // Ajusta el angulo
  return figureTrapezoid;
}

export function createLeftThigh(deselectedColor: number) {
  const width = 0.6; // Ancho del rectángulo
  const height = 1.2; // Altura del rectángulo
  const depth = 0.2; // Profundidad del rectángulo

  const figureRectangule = rectangle(deselectedColor, width, height, depth);

  return figureRectangule;
}

export function createRightThigh(deselectedColor: number) {
  const width = 0.6; // Ancho del rectángulo
  const height = 1.2; // Altura del rectángulo
  const depth = 0.2; // Profundidad del rectángulo
  const figureRectangule = rectangle(deselectedColor, width, height, depth);
  return figureRectangule;
}

export function createLeftKnee(deselectedColor: number) {
  const circleFigure = circle(deselectedColor);
  circleFigure.position.set(0, 0, 0); // Ajusta la posición
  circleFigure.scale.set(0.2, 0.2, 0.2); // Ajusta la escala
  return circleFigure;
}
export function createRightKnee(deselectedColor: number) {
  const circleFigure = circle(deselectedColor);
  circleFigure.position.set(0, 0, 0); // Ajusta la posición
  circleFigure.scale.set(0.2, 0.2, 0.2); // Ajusta la escala
  return circleFigure;
}

export function createLeftLeg(deselectedColor: number) {
  const width = 0.6; // Ancho del rectángulo
  const height = 1.2; // Altura del rectángulo
  const depth = 0.2; // Profundidad del rectángulo

  const figureRectangule = rectangle(deselectedColor, width, height, depth);

  return figureRectangule;
}

export function createRightLeg(deselectedColor: number) {
  const width = 0.6; // Ancho del rectángulo
  const height = 1.2; // Altura del rectángulo
  const depth = 0.2; // Profundidad del rectángulo
  const figureRectangule = rectangle(deselectedColor, width, height, depth);
  return figureRectangule;
}

export function createRightFoot(deselectedColor: number) {
  const footGroup = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color: deselectedColor });
  const width = 0.6; // Ancho del rectángulo
  const height = 0.62; // Altura del rectángulo
  const depth = 0.2; // Profundidad del rectángulo
  const figureRectangule = rectangle(deselectedColor, width, height, depth);
  const triangle = createTriangle(deselectedColor,material);
  figureRectangule.position.set(0, 0, 0);
  triangle.position.set(width / 2.67, -0.23, 0);
  footGroup.add(figureRectangule);
  footGroup.add(triangle);
  // Configura userData para objetos internos
  figureRectangule.userData = { clickable: true, id:'rightFootBase' };
  triangle.userData = { clickable: true, id:'rightFootBase' };

  // Configura userData para el grupo
  footGroup.userData = { clickable: true, id:'rightFootBase' };
  return footGroup;
}
export function createLeftFoot(deselectedColor: number) {
  const leftFootShape = new THREE.Shape();
  // Define los puntos para la forma personalizada del pie derecho
  leftFootShape.moveTo(0.5, 1);
  leftFootShape.lineTo(-0.1, 1);
  leftFootShape.lineTo(-0.72, 0.4);
  leftFootShape.lineTo(0.5, 0.4);
  const leftFootGroup = new THREE.Group();
  
  // Crea la geometría extruida a partir de la forma personalizada
  const extrudeSettings = {
    depth: 0.2, // Profundidad del pie derecho
    bevelEnabled: false, // Sin bisel
  };
  const leftFootGeometry = new THREE.ExtrudeGeometry(
    leftFootShape,
    extrudeSettings
    );
    
    // Crea un material para el pie derecho
    const leftFootMaterial = new THREE.MeshBasicMaterial({
      color: deselectedColor,
    });
    
    // Crea el objeto 3D del pie derecho
    const leftFoot = new THREE.Mesh(leftFootGeometry, leftFootMaterial);
    leftFoot.userData = { clickable: true, id:"leftFootBase" };

  // Agrega el pie derecho al grupo
  leftFootGroup.add(leftFoot);
  leftFootGroup.userData = { clickable: true, id:"leftFootBase" };
  return leftFootGroup;
}

export function createLeftShoulder(deselectedColor: number) {
  const circleFigure = circle(deselectedColor);
  circleFigure.position.set(0, 0, 0); // Ajusta la posición
  circleFigure.scale.set(0.3, 0.45, 0.3); // Ajusta la escala
  return circleFigure;
}
export function createRightShoulder(deselectedColor: number) {
  const circleFigure = circle(deselectedColor);
  circleFigure.position.set(0, 0, 0); // Ajusta la posición
  circleFigure.scale.set(0.3, 0.45, 0.3); // Ajusta la escala

  return circleFigure;
}
export function createLeftArm(deselectedColor: number) {
  const width = 0.6; // Ancho del rectángulo
  const height = 1.2; // Altura del rectángulo
  const depth = 0.2; // Profundidad del rectángulo
  const figureRectangule = rectangle(deselectedColor, width, height, depth);
  return figureRectangule;
}
export function createRightArm(deselectedColor: number) {
  const width = 0.6; // Ancho del rectángulo
  const height = 1.2; // Altura del rectángulo
  const depth = 0.2; // Profundidad del rectángulo
  const figureRectangule = rectangle(deselectedColor, width, height, depth);
  return figureRectangule;
}
export function createLeftForeArm(deselectedColor: number) {
  const width = 0.4; // Ancho del rectángulo
  const height = 1.2; // Altura del rectángulo
  const depth = 0.2; // Profundidad del rectángulo
  const figureRectangule = rectangle(deselectedColor, width, height, depth);
  return figureRectangule;
}
export function createRightForeArm(deselectedColor: number) {
  const width = 0.4; // Ancho del rectángulo
  const height = 1.2; // Altura del rectángulo
  const depth = 0.2; // Profundidad del rectángulo
  const figureRectangule = rectangle(deselectedColor, width, height, depth);
  return figureRectangule;
}
export function createLeftHand(deselectedColor: number) {
  const circleFigure = circle(deselectedColor);
  circleFigure.scale.set(0.2, 0.4, 0.2); // Ajusta la escala
  return circleFigure;
}
export function createRightHand(deselectedColor: number) {
  const circleFigure = circle(deselectedColor);
  circleFigure.scale.set(0.2, 0.4, 0.2); // Ajusta la escala
  return circleFigure;
}
