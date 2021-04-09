<template>
  <Header @toggle-add-task="toggleAddTask" title="Task Tracker" :showAddTask="showAddTask" />
  <div v-show="showAddTask">
    <AddTask @add-task="addTask" />
  </div>
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks"/>
</template>

<script>
import Header from './components/Header.vue';
import Tasks from './components/Tasks.vue';
import AddTask from './components/AddTask.vue';

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask
  },
  data() {
    return {
      tasks:[],
      showAddTask:false
    }
  },
  methods:{
    toggleAddTask(){
      this.showAddTask = !this.showAddTask;
    },
    async addTask(task){
      const res = await fetch('api/tasks', {
        method: 'POST',
        headers: { 
          'Content-type':'application/json',
        },
        body: JSON.stringify(task)
      })
      const data = await res.json()
      this.tasks = [...this.tasks, data];
    },
    async deleteTask(id){
      if(confirm('Are u sure ?')){
        const res = await fetch(`api/tasks/${id}`, {
          method:'DELETE'
        });
        res.status === 200 ? 
        (this.tasks = this.tasks.filter(x => x.id != id)) : alert('Error deleting task');
      }
    },
    async toggleReminder(id){
      const taskToToggle = await this.fetchTask(id);
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
      const res = await fetch(`api/tasks/${id}`,
      {
        method:'PUT',headers:{'Content-type':'application/json'
      },
      body:JSON.stringify(updTask)})

      const data = res.json();

      this.tasks = this.tasks.map((task) => 
      task.id === id ? {...task, reminder: !task.reminder} : task)
    },
    async fetchTasks() {
      const res = await fetch('api/tasks');
      const data = await res.json();
      return data;
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`);
      const data = await res.json();
      return data;
    }
  },
  async created() {
    this.tasks = await this.fetchTasks();
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
</style>
