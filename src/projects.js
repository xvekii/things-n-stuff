export const projects = {
  _arr: [],

  get arr() {
    return this._arr;
  },

  set arr(obj) {
    this._arr.push(obj);
  },

  checkDuplicateName(name) {
    return this_arr.some(
      projectName => projectName === name);
  },

  deleteProject(name) {
    // get _arr, check for name, get ID and splice
  },
}