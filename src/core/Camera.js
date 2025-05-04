import { Matrix4 } from '../math/Matrix4.js';
import { Vector3 } from '../math/Vector3.js';

export default class Camera {
  constructor(width, height) {
    this.position = new Vector3(0, 0, 5);
    this.target = new Vector3(0, 0, 0);
    this.up = new Vector3(0, 1, 0);
    
    this.projectionMatrix = Matrix4.perspective(
      45 * Math.PI / 180,
      width / height,
      0.1,
      100.0
    );
    
    this.viewMatrix = Matrix4.identity();
    this.updateViewMatrix();
  }
  
  updateViewMatrix() {
    this.viewMatrix = Matrix4.lookAt(
      this.position,
      this.target,
      this.up
    );
  }
  
  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this.updateViewMatrix();
  }
  
  lookAt(x, y, z) {
    this.target.set(x, y, z);
    this.updateViewMatrix();
  }
  
  resize(width, height) {
    this.projectionMatrix = Matrix4.perspective(
      45 * Math.PI / 180,
      width / height,
      0.1,
      100.0
    );
  }
}