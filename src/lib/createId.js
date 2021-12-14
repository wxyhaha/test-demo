let id= parseInt(window.localStorage.getItem('_idMax') || '0') || 0;
let departmentId= parseInt(window.localStorage.getItem('_departmentIdMax') || '0') || 0;

export function createId() {
  id++;
  window.localStorage.setItem('_idMax', id.toString());
  return id;
}
export function createDepartmentId() {
  departmentId++;
  window.localStorage.setItem('_departmentIdMax', id.toString());
  return departmentId;
}
