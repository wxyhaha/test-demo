<template>
<div class="table-wrapper">
  <div class="table-title">
    <div>用户列表</div>
    <button>+增加</button>
  </div>
  <div class="table-content">
    <el-table
        :data="tableData"
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
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
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
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      tableData: [{
        id: '1',
        name: '张三',
        username: 'SanZhang',
        department: '人事部',
        job: '科长',
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.table-wrapper{
  border: 1px solid black;
  margin: 10px;
  width: 70vw;
  .table-title{
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .table-content{
    padding: 5px;
  }
  .paging{
    margin-top: 10px;
    margin-right: 20px;
    display: flex;
    justify-content:flex-end;
  }
}
</style>