import ShaderManager from './ShaderManager.js';

export default class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = this.initWebGL();
    this.shaderManager = new ShaderManager(this.gl);
    
    // Configure WebGL
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }
  
  initWebGL() {
    const gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (!gl) throw new Error('WebGL not supported');
    return gl;
  }
  
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }
  
  render(scene, camera) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Get all renderable entities
    const entities = scene.getEntities();
    
    entities.forEach(entity => {
      if (!entity.mesh || !entity.material) return;
      
      // Use the entity's shader
      const shader = this.shaderManager.getShader(entity.material.shader);
      this.gl.useProgram(shader.program);
      
      // Set uniforms
      this.setMatrixUniforms(shader, camera, entity);
      
      // Draw the entity
      this.drawMesh(entity.mesh, shader);
    });
  }
  
  setMatrixUniforms(shader, camera, entity) {
    const gl = this.gl;
    
    // Set projection matrix
    gl.uniformMatrix4fv(
      shader.uniforms.projectionMatrix,
      false,
      camera.projectionMatrix
    );
    
    // Set view matrix
    gl.uniformMatrix4fv(
      shader.uniforms.viewMatrix,
      false,
      camera.viewMatrix
    );
    
    // Set model matrix
    gl.uniformMatrix4fv(
      shader.uniforms.modelMatrix,
      false,
      entity.getMatrix()
    );
  }
  
  drawMesh(mesh, shader) {
    const gl = this.gl;
    
    // Bind vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
    gl.vertexAttribPointer(
      shader.attributes.position,
      mesh.componentsPerVertex,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(shader.attributes.position);
    
    // Draw
    if (mesh.indices) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
      gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, mesh.vertexCount);
    }
  }
}