<template>
    <h2>
        Manage User
    </h2>
    <AddUser @add-user="addNewUser"/>
    <Users @delete-user="deleteUser" :users="users"/>
</template>

<script>
import AddUser from '../components/AddUser.vue';
import Users from '../components/Users.vue';
export default {
    name:'Admin',
    data() {
        return {
            users: Array
        }
    },
    components:{
        AddUser,
        Users
    },
    methods: {
        async addNewUser(obj){
            const res = await this.fetchUsers()
            if(res.length > 0){
               
               const elem = res.find(x => x.email == obj.email);
               if(elem)
               {
                   alert(`email associated with existing account ${obj.email}`);
               }
               else
               {
                    const result = await fetch('api/users',{ method:'POST', headers:{'Content-type':'application/json'}, body: JSON.stringify(obj) });
                    if(result.ok){
                        alert(`new user created`);
                        this.users = await this.fetchUsers();
                    }
               }
            }
        },
        // users methods
        async fetchUsers() {
            const res = await fetch('api/users');
            const data = await res.json();
            return data;
        },
        async fetchUser(id) {
            const res = await fetch(`api/users/${id}`);
            const data = await res.json();
            return data;
        },
        async deleteUser(id) {

            if(confirm('Are u sure ?')){
                const res = await fetch(`api/users/${id}`, { method:'DELETE' });
                res.status == 200 ? (this.users = this.users.filter(x => x.id !== id)) : alert('Error deleting user');
            }
        }
    },
    async created() {
        const user = JSON.parse(sessionStorage.getItem('vue-user'));
        console.log(user);
        if(!user){
            this.$router.push('/autherize');
        }else if(user.role === 'admin'){
            this.users = await this.fetchUsers();
        } else {
            this.$router.push('/unaurtherize');
        }
    }
}
</script>