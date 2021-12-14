import Vue from 'vue';
import Vuex from 'vuex';
import {createId, createDepartmentId} from '@/lib/createId'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    departmentList: null,
    userList: null,
    curUserList: [],
    curLabel: ''
  },
  getters: {
    departmentList: state => state.departmentList || [],
    userList: state => state.userList || [],
    curUserList: state => state.curUserList || [],
    curLabel: state => state.curLabel || ''
  },
  mutations: {
    //初始化组织结构树
    fetchDepartmentList(state) {
      state.departmentList = JSON.parse(window.localStorage.getItem('departmentList') || '[]')
      if (!state.departmentList || state.departmentList.length === 0) {
        store.commit('addDepartment', {id: '1', higher: '组织结构树', label: '人事部', children: [{label: '科室1'}, {label: '科室2'}]});
        store.commit('addDepartment', {id: '2', higher: '组织结构树', label: '宣传部', children: [{label: '科室3'}]});
        store.commit('addDepartment', {id: '3', higher: '组织结构树', label: '党工部', children: []});
      }
    },
    //初始化用户列表
    fetchUserList(state) {
      state.userList = JSON.parse(window.localStorage.getItem('userList') || '[]')
      if (!state.userList || state.userList.length === 0) {
        store.commit('addUser', {name: '张三', username: 'SanZhang', department: '人事部', job: '科长',})
        store.commit('addUser', {name: '李四', username: 'sili', department: '人事部', job: '科员',})
        store.commit('addUser', {name: '王五', username: 'wuwang', department: '宣传部', job: '科长',})
        store.commit('addUser', {name: '赵甲', username: 'jiazhao', department: '宣传部', job: '科员',})
        store.commit('addUser', {name: '孙丙', username: 'bingsun', department: '党工部', job: '科长',})
        store.commit('addUser', {name: '钱丁', username: 'dingqian', department: '党工部', job: '科员',})
      }
      state.curUserList = state.userList
    },
    //筛选相应部门的用户
    setCurDepartmentUsers(state, label) {
      state.curLabel = label
      let arr = state.userList.filter(t => t.department === label)
      if (!arr || arr.length <= 0) {
        state.curUserList = state.userList
      } else {
        state.curUserList = arr
      }
    },
    //添加组织
    addDepartment(state, payload) {
      const id = createDepartmentId().toString();
      state.departmentList.push({id, higher: payload.higher, label: payload.label, children: payload.children})
      window.localStorage.setItem('departmentList', JSON.stringify(state.departmentList));
    },
    //添加用户
    addUser(state, payload) {
      const id = createId().toString();
      state.userList.push({
        id,
        name: payload.name,
        username: payload.username,
        department: payload.department,
        job: payload.job
      })
      window.localStorage.setItem('userList', JSON.stringify(state.userList));
      store.commit('setCurDepartmentUsers', state.curLabel)
    },
    //修改用户
    updateUser(state, payload) {
      const {id} = payload
      const user = state.userList.filter(item => item.id === id)[0]
      user.name = payload.name
      user.username = payload.username
      user.department = payload.department
      user.job = payload.job
      window.localStorage.setItem('userList', JSON.stringify(state.userList));
    },
    //删除用户
    removeUser(state, id) {
      let index
      for (let i = 0; i < state.userList.length; i++) {
        if (state.userList[i].id === id) {
          index = i;
          break;
        }
      }
      state.userList.splice(index, 1);
      window.localStorage.setItem('userList', JSON.stringify(state.userList));
      store.commit('setCurDepartmentUsers', state.curLabel)
    }
  }
});


export default store;