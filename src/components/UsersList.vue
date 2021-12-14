<template>
  <div class="table-wrapper">
    <div class="table-title">
      <div>用户列表</div>
      <button @click="addUserVisible=true">+增加</button>
      <el-dialog title="添加用户" :visible.sync="addUserVisible">
        <el-form :model="addUserForm" ref="addUserForm">
          <el-form-item label="人员名称">
            <el-input v-model="addUserForm.name" autocomplete="off" placeholder="请输入人员名称"></el-input>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input v-model="addUserForm.username" autocomplete="off" placeholder="请输入用户名称"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-input v-model="addUserForm.department" autocomplete="off" placeholder="请输入所属部门"></el-input>
          </el-form-item>
          <el-form-item label="岗位名称">
            <el-input v-model="addUserForm.job" autocomplete="off" placeholder="请输入岗位名称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUserForm('addUserForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="table-content">
      <el-table
          :data="this.curUserList"
          border
          style="width: 100%">
        <el-table-column
            prop="id"
            label="编号"
            width="">
        </el-table-column>
        <el-table-column
            prop="name"
            label="人员名称"
            width="">
        </el-table-column>
        <el-table-column
            prop="username"
            label="账号名称"
            width="">
        </el-table-column>
        <el-table-column
            prop="department"
            label="所属部门"
            width="">
        </el-table-column>
        <el-table-column
            prop="job"
            label="岗位名称"
            width="">
        </el-table-column>
        <el-table-column
            label="操作"
            width="">
          <!-- eslint-disable -->
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-dialog title="修改用户信息" :visible.sync="editFormVisible">
              <el-form :model="editForm">
                <el-form-item label="编号">
                  <el-input v-model="editForm.id" autocomplete="off" placeholder="请输入编号" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="人员名称">
                  <el-input v-model="editForm.name" autocomplete="off" placeholder="请输入人员名称"></el-input>
                </el-form-item>
                <el-form-item label="用户名称">
                  <el-input v-model="editForm.username" autocomplete="off" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="所属部门">
                  <el-input v-model="editForm.department" autocomplete="off" placeholder="请输入所属部门"></el-input>
                </el-form-item>
                <el-form-item label="岗位名称">
                  <el-input v-model="editForm.job" autocomplete="off" placeholder="请输入岗位名称"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
              </div>
            </el-dialog>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  created() {
    this.fetchUserList()
  },
  computed: {
    ...mapGetters([
      'userList',
      'curUserList'
    ])
  },
  methods: {
    ...mapMutations([
      'fetchUserList',
      'setCurDepartmentUsers',
      'addUser',
      'updateUser',
      'removeUser'
    ]),
    //修改用户信息
    handleEdit(row) {
      this.editFormVisible = true
      this.editForm.id = row.id
      this.editForm.name = row.name
      this.editForm.username = row.username
      this.editForm.department = row.department
      this.editForm.job = row.job
    },
    //提交用户添加
    submitUserForm() {
      this.addUserVisible = false
      this.addUser(this.addUserForm)
      this.$nextTick(() => {
        this.$refs.addUserForm.resetFields()
      })
    },
    //提交用户修改
    submitForm() {
      this.editFormVisible = false
      this.updateUser(this.editForm)
    },
    remove(row) {
      this.removeUser(row.id)
    }
  },

  data() {
    return {
      editFormVisible: false,
      addUserVisible: false,
      addUserForm: {
        name: '',
        username: '',
        department: '',
        job: '',
      },
      editForm: {
        id: '',
        name: '',
        username: '',
        department: '',
        job: '',
      },
    }
  }
}
</script>

<style lang="less" scoped>
.table-wrapper {
  border: 1px solid black;
  margin: 10px;
  width: 70vw;

  .table-title {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .table-content {
    padding: 5px;
  }

  .paging {
    margin-top: 10px;
    margin-right: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>