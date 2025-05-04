export default class ShaderManager {
    constructor(gl) {
      this.gl = gl;
      this.shaders = {};
    }
    
    loadShader(name, vertexSrc, fragmentSrc) {
      const vertexShader = this.compileShader(vertexSrc, this.gl.VERTEX_SHADER);
      const fragmentShader = this.compileShader(fragmentSrc, this.gl.FRAGMENT_SHADER);
      
      const program = this.gl.createProgram();
      this.gl.attachShader(program, vertexShader);
      this.gl.attachShader(program, fragmentShader);
      this.gl.linkProgram(program);
      
      if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
        console.error('Shader program failed to link:', this.gl.getProgramInfoLog(program));
        return null;
      }
      
      // Get attribute and uniform locations
      const shader = {
        program,
        attributes: {
          position: this.gl.getAttribLocation(program, 'aPosition')
        },
        uniforms: {
          projectionMatrix: this.gl.getUniformLocation(program, 'uProjectionMatrix'),
          viewMatrix: this.gl.getUniformLocation(program, 'uViewMatrix'),
          modelMatrix: this.gl.getUniformLocation(program, 'uModelMatrix')
        }
      };
      
      this.shaders[name] = shader;
      return shader;
    }
    
    compileShader(source, type) {
      const shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }
    
    getShader(name) {
      return this.shaders[name];
    }
  }