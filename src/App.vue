<template>
  <Header 
   @toggle-add-task="toggleAddTask"
   @logout-user="logoutUser"
   title="Task Tracker"
   :showAddTask="showAddTask"
   :vueUser="vueUser"
  />
  <router-view @addVueUser="addVueUser" :showAddTask="showAddTask"></router-view>
  <Footer/>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showAddTask: false,
      vueUser: {}
    }
  },
  methods:{
    toggleAddTask(){
      this.showAddTask = !this.showAddTask;
    },
    addVueUser(obj){
      this.vueUser = obj;
    },
    logoutUser(){
      sessionStorage.removeItem('vue-user');
      this.vueUser = {}
      this.$router.push('/autherize');
    }
  },
  created() {
    const user = JSON.parse(sessionStorage.getItem('vue-user'));
    if(user)
    {
      this.vueUser = user;
    }
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 30px auto;
    padding: 10px 15px;
    border: 1px solid #1087a5;
    border-radius: 3px;
    max-width: 700px;
  }
  .btn{
    border:none;
    border-radius: 3px;
    padding: 10px 15px;
    color: white;
    background-color: black;
    cursor: pointer;
    outline: none;
  }
  .btn:active{
    box-shadow: 1px 1px 2px #111111;  
  }
  .btn-block {
    display: block;
    width: 100%;
  }
  a.btn{
    text-decoration: none;
  }
</style>
