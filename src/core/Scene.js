export default class Scene {
    constructor() {
      this.entities = [];
      this.lights = [];
    }
    
    add(entity) {
      this.entities.push(entity);
      return this; // For chaining
    }
    
    remove(entity) {
      const index = this.entities.indexOf(entity);
      if (index !== -1) {
        this.entities.splice(index, 1);
      }
      return this;
    }
    
    getEntities() {
      return this.entities;
    }
    
    update(deltaTime) {
      this.entities.forEach(entity => {
        if (entity.update) {
          entity.update(deltaTime);
        }
      });
    }
  }