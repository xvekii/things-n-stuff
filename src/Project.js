export class Project {
  constructor(name, projID = crypto.randomUUID()) {
    this.name = name;
    this.ID = projID;
  }  

  toJSON() {
    return {
      name: this.name,
      ID: this.ID,
    };
  }

  static fromJSON(obj) {
    const proj = new Project(obj.name, obj.ID);
    
    return proj;
  }
}