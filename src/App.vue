<template>
  <div id="app">
    <Sidebar/>
    <UsersList/>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import UsersList from './components/UsersList'

export default {
  name: 'App',
  components: {
    Sidebar,
    UsersList
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  align-items: stretch;
}
</style>
