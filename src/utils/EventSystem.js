export default class EventSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.events = {};
      
      // Set up event listeners
      canvas.addEventListener('mousedown', this.handleEvent.bind(this));
      canvas.addEventListener('mouseup', this.handleEvent.bind(this));
      canvas.addEventListener('mousemove', this.handleEvent.bind(this));
      canvas.addEventListener('click', this.handleEvent.bind(this));
      // Add more as needed
    }
    
    on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    }
    
    handleEvent(e) {
      const callbacks = this.events[e.type];
      if (callbacks) {
        callbacks.forEach(callback => callback(e));
      }
    }
  }