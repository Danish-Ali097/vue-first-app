<template>
    <header>
        <h1>{{title}}</h1>
        <router-link class="btn" v-show="vueUser.role=='admin'" to="/admin">
            Manage Users
        </router-link>

        <router-link class="btn" v-show="adminPage" to="/">
            Home
        </router-link>

        <Button 
        v-show="homePage"
        @btn-click="$emit('toggle-add-task')"
        :text="showAddTask ? 'Close' : 'Add Task'"
        :color="showAddTask ? 'red' : 'green'"
        />
        <span v-show="vueUser.id > 0 && adminHomePage" class="greet-user">
            <p>Hello, {{vueUser.firstName}}</p>
            <Button 
            @btn-click="$emit('logout-user')"
            text="Logout"/>
        </span>
    </header>
</template>

<script>
import Button from './Button.vue'
export default {
    name: 'Header',
    props: {
        title: String,
        showAddTask: Boolean,
        vueUser: Object

    },
    components:{
        Button
    },
    computed: {
        homePage(){
            if(this.$route.path === '/') {
                return true;
            }else{
                return false;
            }
        },
        adminPage(){
            if(this.$route.path === '/admin') {
                return true;
            }else{
                return false;
            }
        },
        adminHomePage(){
            if(this.$route.path === '/' || this.$route.path === '/admin') {
                return true;
            }else{
                return false;
            }
        }
    }
}
</script>

<style scoped>
header{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
}

.greet-user{
    margin-left: 5px;
    padding: 10px 15px;
    border: 2px solid #01c201;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 230px;
}
</style>