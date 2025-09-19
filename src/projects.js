export const projects = {
  _arr: [],
  _tempProjectID: null, 

  get arr() {
    return this._arr;
  },

  addProject (obj) {
    this._arr.push(obj);
  },

  checkDuplicateName(name) {
    return this._arr.some(
      project => project.name === name);
  },

  updateName(newName, ID) {
    const project = this.arr.find(project => project.ID === ID);
    if (!project) return;
    if (project.name === newName) return;
    
    const duplicateName = this.checkDuplicateName(newName);

    if (duplicateName) {
      return "This name already exists";
    } else {
      project.name = newName;
    }
  },

  set tempID(ID) {
    this._tempProjectID = ID;
  },

  get tempID() {
    return this._tempProjectID;
  },

  deleteProject(ID) {
    const projectIndex = this.arr.findIndex(project => project.ID === ID);
    if (projectIndex === -1) return;

    this._arr.splice(projectIndex, 1);
  },
}