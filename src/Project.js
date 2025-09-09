export class Project {
  constructor(name) {
    this.name = name;
    this.ID = crypto.randomUUID();
  }  
}