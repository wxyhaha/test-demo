<template>
  <div id="sidebar">
    <div class="title">
      <div>组织结构树</div>
      <button @click="addFormVisible=true">+增加</button>
      <el-dialog title="添加组织" :visible.sync="addFormVisible">
        <el-form :model="addForm" ref="addForm">
          <el-form-item label="单位描述">
            <el-input v-model="addForm.label" autocomplete="off" placeholder="请输入单位描述"></el-input>
          </el-form-item>
          <el-form-item label="所属上级单位">
            <el-input v-model="addForm.higher" autocomplete="off" placeholder="请输入所属上级单位"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="tree-content">
      <el-tree :data="this.departmentList" :props="defaultProps" @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
       <span>{{ node.label }}</span>
       <span class="delete-icon">
         <i @click="deleteNode(node, data)" class="el-icon-delete"></i>
       </span>
     </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  created() {
    this.fetchDepartmentList()
  },
  computed: {
    ...mapGetters([
      'departmentList'
    ])
  },
  data() {
    return {
      addFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      addForm: {
        label: '',
        higher: '',
      }
    };
  },
  methods: {
    ...mapMutations([
      'fetchDepartmentList',
      'addDepartment',
      'setCurDepartmentUsers'
    ]),
    //提交添加组织
    submitForm() {
      this.addFormVisible = false
      this.addDepartment(this.addForm)
    },
    //点击组织结构树，据部门筛选用户
    handleNodeClick(data) {
      this.setCurDepartmentUsers(data.label)
    },
    //删除节点
    deleteNode(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      window.localStorage.setItem('departmentList', JSON.stringify(this.departmentList));
    }
  }
};
</script>

<style lang="less" scoped>
#sidebar {
  border: 1px solid black;
  width: 25vw;
  height: (100vh)-10px;
  margin: 10px;

  .title {
    height: 7%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .tree-content {
    overflow: scroll;
    border: 1px solid black;
    height: 90%;
    margin: 5px;
  }

  .custom-tree-node {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .delete-icon {
      padding-right: 10px;
    }
  }
}
</style>