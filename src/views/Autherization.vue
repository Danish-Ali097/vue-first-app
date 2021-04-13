<template>
    <Button :text="showLogin ? 'Signup':'Login'" @btn-click="toggleForm" />
    <div v-show="showMessage" class="alert">
        {{messageText}}
    </div>
    <Login v-show="showLogin" @login-user="Login" />
    <Signup v-show="!showLogin" @signup-user="Signup" />
</template>

<script>
import Button from '../components/Button.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
export default {
    name:"Autherization",
    components: {
        Login,
        Signup,
        Button
    },
    data(){
        return{
            showMessage:false,
            messageText:'',
            showLogin:true,
        }
    },
    methods: {
        async Login(obj){
            const res = await fetch('api/users',{ method:'GET' });
            if(res.status == 200){
               const response = await res.json();
               
               const elem = response.find(x => x.email == obj.email);
               if(!elem) { 
                   this.showMessage=true;
                   this.messageText=`user not exist ${obj.email}`; 
                   return
                }
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
        },
        async Signup(obj){
            const res = await fetch('api/users',{ method:'GET' });
            if(res.status == 200){
               const response = await res.json();
               
               const elem = response.find(x => x.email == obj.email);
               if(elem)
               {
                   console.log(`email associated with existing account ${obj.email}`);
                   this.showMessage=true;
                   this.messageText=`email associated with existing account`;
               }

               const result = await fetch('api/users',{ method:'POST', headers:{'Content-type':'application/json'}, body: JSON.stringify(obj) });
               if(result.ok){
                   console.log(`new user created`);
                   this.showMessage=true;
                   this.messageText=`Your account has been created login to continue`;
               }
            }
        },
        toggleForm() {
            this.showLogin = !this.showLogin;
        }
    }
}
</script>
<style scoped>
    .alert
    {
        width: 100%;
        background-color: #2979d4a9;
        border: 2px solid #2979d4;
        color:#ffff;
        padding:20px 30px;
        margin: 5px;
        border-radius: 3px;
    }
</style>