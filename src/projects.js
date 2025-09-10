export const projects = {
  _arr: [],

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

  deleteProject(name) {
    // get _arr, check for name, get ID and splice
  },
}