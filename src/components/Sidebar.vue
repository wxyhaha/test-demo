<template>
  <div id="sidebar">
    <div class="title">
      <div>组织结构树</div>
      <button>+增加</button>
    </div>
    <div class="tree-content">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{
        label: '组织结构树',
        children: [{
          label: '人事部',
          children: [{
            label: '科室1'
          },
            {
              label: '科室2'
            }]
        },
          {
            label: '宣传部',
            children: [{
              label: '科室3'
            }]
          },
          {
            label: '党工部',
            children: []
          }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data, defaultProps) {
      console.log('date:', data);
      console.log('113', defaultProps)
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
  .tree-content{
    overflow:scroll;
    border: 1px solid black;
    height: 90%;
    margin: 5px;
  }
}
</style>