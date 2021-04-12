<template>
    <AddTask 
      v-show="showAddTask"
      @add-task="addTask"
    />
    <Tasks 
      @toggle-reminder="toggleReminder" 
      @delete-task="deleteTask" 
      :tasks="tasks"
    />
</template>
<script>
import Tasks from '../components/Tasks.vue';
import AddTask from '../components/AddTask.vue';

export default {
    name:'Home',
    props: {
        showAddTask:Boolean
    },
    components:{
        Tasks,
        AddTask
    },
    data(){
        return {
            tasks:[]
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
    const user = JSON.parse(sessionStorage.getItem('vue-user'));
    if(!user){
      this.$router.push('/autherize');
    }
  }
}
</script>