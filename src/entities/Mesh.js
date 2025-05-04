export default class Mesh {
    constructor(gl, vertices, indices = null) {
      this.gl = gl;
      this.vertices = vertices;
      this.indices = indices;
      this.componentsPerVertex = 3; // x, y, z
      
      this.vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      
      if (indices) {
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
      }
      
      this.vertexCount = indices ? indices.length : vertices.length / this.componentsPerVertex;
    }
  }