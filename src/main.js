import Engine from './core/Engine.js';
import Mesh from './entities/Mesh.js';
import Entity from './entities/Entity.js';

// Create engine instance
const engine = new Engine('canvas');

// Load shaders
engine.renderer.shaderManager.loadShader(
  'basic',
  `attribute vec3 aPosition;
   uniform mat4 uModelMatrix;
   uniform mat4 uViewMatrix;
   uniform mat4 uProjectionMatrix;
   
   void main() {
     gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.0);
   }`,
  `void main() {
     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   }`
);

// Create a triangle
const vertices = [
  0.0, 1.0, 0.0,
  -1.0, -1.0, 0.0,
  1.0, -1.0, 0.0
];

const mesh = new Mesh(engine.renderer.gl, vertices);

// Create an entity
const entity = new Entity();
entity.mesh = mesh;
entity.material = { shader: 'basic' };

// Add to scene
engine.scene.add(entity);

// Start the engine
engine.start();

// Add interaction
engine.on('click', (e) => {
  entity.rotation.y += 0.1;
});