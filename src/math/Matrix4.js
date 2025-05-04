export class Matrix4 {
    static identity() {
      return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ]);
    }
    
    static perspective(fov, aspect, near, far) {
      const f = 1.0 / Math.tan(fov / 2);
      const matrix = this.identity();
      
      matrix[0] = f / aspect;
      matrix[5] = f;
      matrix[10] = (far + near) / (near - far);
      matrix[11] = -1;
      matrix[14] = (2 * far * near) / (near - far);
      matrix[15] = 0;
      
      return matrix;
    }
    
    static lookAt(eye, target, up) {
      const matrix = this.identity();
      
      const zAxis = new Float32Array([
        eye.x - target.x,
        eye.y - target.y,
        eye.z - target.z
      ]);
      const zLength = Math.sqrt(zAxis[0] * zAxis[0] + zAxis[1] * zAxis[1] + zAxis[2] * zAxis[2]);
      zAxis[0] /= zLength;
      zAxis[1] /= zLength;
      zAxis[2] /= zLength;
      
      const xAxis = new Float32Array([
        up.y * zAxis[2] - up.z * zAxis[1],
        up.z * zAxis[0] - up.x * zAxis[2],
        up.x * zAxis[1] - up.y * zAxis[0]
      ]);
      const xLength = Math.sqrt(xAxis[0] * xAxis[0] + xAxis[1] * xAxis[1] + xAxis[2] * xAxis[2]);
      xAxis[0] /= xLength;
      xAxis[1] /= xLength;
      xAxis[2] /= xLength;
      
      const yAxis = new Float32Array([
        zAxis[1] * xAxis[2] - zAxis[2] * xAxis[1],
        zAxis[2] * xAxis[0] - zAxis[0] * xAxis[2],
        zAxis[0] * xAxis[1] - zAxis[1] * xAxis[0]
      ]);
      
      matrix[0] = xAxis[0];
      matrix[1] = yAxis[0];
      matrix[2] = zAxis[0];
      matrix[4] = xAxis[1];
      matrix[5] = yAxis[1];
      matrix[6] = zAxis[1];
      matrix[8] = xAxis[2];
      matrix[9] = yAxis[2];
      matrix[10] = zAxis[2];
      
      matrix[12] = -(xAxis[0] * eye.x + xAxis[1] * eye.y + xAxis[2] * eye.z);
      matrix[13] = -(yAxis[0] * eye.x + yAxis[1] * eye.y + yAxis[2] * eye.z);
      matrix[14] = -(zAxis[0] * eye.x + zAxis[1] * eye.y + zAxis[2] * eye.z);
      
      return matrix;
    }
    
    static translate(x, y, z) {
      const matrix = this.identity();
      matrix[12] = x;
      matrix[13] = y;
      matrix[14] = z;
      return matrix;
    }
    
    static rotateX(angle) {
      const matrix = this.identity();
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      
      matrix[5] = c;
      matrix[6] = -s;
      matrix[9] = s;
      matrix[10] = c;
      
      return matrix;
    }
    
    static rotateY(angle) {
      const matrix = this.identity();
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      
      matrix[0] = c;
      matrix[2] = s;
      matrix[8] = -s;
      matrix[10] = c;
      
      return matrix;
    }
    
    static rotateZ(angle) {
      const matrix = this.identity();
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      
      matrix[0] = c;
      matrix[1] = -s;
      matrix[4] = s;
      matrix[5] = c;
      
      return matrix;
    }
    
    static scale(x, y, z) {
      const matrix = this.identity();
      matrix[0] = x;
      matrix[5] = y;
      matrix[10] = z;
      return matrix;
    }
    
    static multiply(a, b) {
      const matrix = this.identity();
      
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          matrix[i * 4 + j] = 0;
          for (let k = 0; k < 4; k++) {
            matrix[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
          }
        }
      }
      
      return matrix;
    }
}