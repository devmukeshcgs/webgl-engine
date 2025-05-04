import Renderer from './Renderer.js';
import Scene from './Scene.js';
import Camera from './Camera.js';
import EventSystem from '../utils/EventSystem.js';

export default class Engine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) throw new Error('Canvas element not found');
    
    this.renderer = new Renderer(this.canvas);
    this.scene = new Scene();
    this.camera = new Camera(this.canvas.width, this.canvas.height);
    this.eventSystem = new EventSystem(this.canvas);
    
    this.lastTime = 0;
    this.running = false;
    
    // Bind context
    this.loop = this.loop.bind(this);
  }
  
  start() {
    if (this.running) return;
    this.running = true;
    requestAnimationFrame(this.loop);
  }
  
  stop() {
    this.running = false;
  }
  
  loop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    
    // Update all entities
    this.scene.update(deltaTime);
    
    // Render the scene
    this.renderer.render(this.scene, this.camera);
    
    if (this.running) {
      requestAnimationFrame(this.loop);
    }
  }
  
  on(event, callback) {
    this.eventSystem.on(event, callback);
    return this; // For chaining
  }
}