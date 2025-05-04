import { Matrix4 } from '../math/Matrix4.js';
import { Vector3 } from '../math/Vector3.js';

export default class Entity {
  constructor() {
    this.position = new Vector3(0, 0, 0);
    this.rotation = new Vector3(0, 0, 0);
    this.scale = new Vector3(1, 1, 1);
    
    this.mesh = null;
    this.material = null;
    this.children = [];
  }
  
  getMatrix() {
    let matrix = Matrix4.identity();
    
    // Apply transformations in order: scale -> rotate -> translate
    const scaleMatrix = Matrix4.scale(this.scale.x, this.scale.y, this.scale.z);
    const rotateXMatrix = Matrix4.rotateX(this.rotation.x);
    const rotateYMatrix = Matrix4.rotateY(this.rotation.y);
    const rotateZMatrix = Matrix4.rotateZ(this.rotation.z);
    const translateMatrix = Matrix4.translate(this.position.x, this.position.y, this.position.z);
    
    // Combine transformations
    matrix = Matrix4.multiply(matrix, scaleMatrix);
    matrix = Matrix4.multiply(matrix, rotateXMatrix);
    matrix = Matrix4.multiply(matrix, rotateYMatrix);
    matrix = Matrix4.multiply(matrix, rotateZMatrix);
    matrix = Matrix4.multiply(matrix, translateMatrix);
    
    return matrix;
  }
  
  update(deltaTime) {
    // To be overridden by child classes
  }
  
  addChild(entity) {
    this.children.push(entity);
    return this;
  }
}