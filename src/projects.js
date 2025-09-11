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

  set tempID(ID) {
    this._tempProjectID = ID;
  },

  get tempID() {
    return this._tempProjectID;
  },

  deleteProject(name) {
    // get _arr, check for name, get ID and splice
  },
}