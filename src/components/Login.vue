<template>
    <form @submit="onSubmit">
        <h1>Login</h1>
        <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" name="email" placeholder="Enter Email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" name="password" placeholder="Enter Password">
        </div>
        <input class="btn btn-block" type="submit" value="Login">
    </form>
</template>

<script>
export default {
    name:"Login",
    data(){
        return {
            email:'',
            password:''
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault();
            if(this.email === '' || this.password === '') {
                alert('please enter email or password');
                return;
            }
            const userCred = {
                email: this.email,
                password: this.password
            }
            this.$emit('login-user', userCred);
            
            this.email = '';
            this.password = '';
        }
    }
}
</script>

<style scoped>
    h1 {
        text-align: center;
    }
    form {
        width: 70%;
        margin: 30px auto;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    }
    .form-group {
        margin-bottom: 10px;
    }

    .form-group > label {
        display: block;
    }
    .form-group input {
        display: block;
        width: 100%;
        font-size: 17px;
        margin: 5px;
        height: 40px;
        padding: 3px 7px;
    }
</style>