<template>
    <Login @login-user="Login" :showMessage="showMessage" :messageText="messageText" />
</template>

<script>
import Login from '../components/Login.vue';
export default {
    name:"Autherization",
    components: {
        Login
    },
    data(){
        return{
            showMessage:false,
            messageText:''
        }
    },
    methods: {
        async Login(obj){
            const res = await fetch('api/users',{ method:'GET' });
            if(res.status == 200){
               const response = await res.json();
               
               const elem = response.find(x => x.email == obj.email);
               if(elem.password === obj.password)
               {
                   console.log("autherization success", elem);
                   sessionStorage.setItem('vue-user', JSON.stringify(elem));
                   this.$emit('addVueUser', elem);
                   this.$router.push({path:'/'});
               }
               else
               {
                   console.log(`email or password incorrect for ${obj.email}`);
                   this.showMessage=true;
                   this.messageText=`email or password incorrect for ${obj.email}`;
               }
            }
        }
    }
}
</script>