<template>
    <header>
        <h1>{{title}}</h1>
        <div>
            <Button 
            v-show="homePage"
            @btn-click="$emit('toggle-add-task')"
            :text="showAddTask ? 'Close' : 'Add Task'"
            :color="showAddTask ? 'red' : 'green'"
            />
            <span v-show="vueUser.id > 0 && homePage" class="greet-user">
                <p>Hello, {{vueUser.first_name}}</p>
                <Button 
                @btn-click="$emit('logout-user')"
                text="Logout"/>
            </span>
        </div>
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
        }
    }
}
</script>

<style scoped>
header{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
}
header h1{
    flex:2;
}
header div {
    flex:1;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.greet-user{
    margin-left: 5px;
    padding: 10px 15px;
    border: 2px solid #01c201;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 220px;
}
</style>