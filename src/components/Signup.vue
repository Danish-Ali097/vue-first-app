<template>
    <form @submit="onSubmit">
        <h1>Signup</h1>
        <div class="form-group">
            <label for="firstname">First Name</label>
            <input v-model="firstName" type="text" name="firstname" placeholder="Enter your First name">
        </div>
        <div class="form-group">
            <label for="lastname">Last Name</label>
            <input v-model="lastName" type="text" name="lastname" placeholder="Enter your Last name">
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" name="email" placeholder="Enter your Email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" name="password" placeholder="Enter your password">
        </div>
        <div class="form-group">
            <label for="role">Role</label>
            <select v-model="role" name="role">
                <option
                 :key="role"
                 v-for="role in userRole"
                 :value="role.value"
                 :selected="role.value == 'user' ? true : false" 
                >{{role.key}}</option>
            </select>
        </div>
        <input class="btn btn-block" type="submit" value="Signup">
    </form>
</template>

<script>
export default {
    name:'Signup',
    props:{
        userRole:Array
    },
    data() {
        return{
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            role:'user'
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
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                role: this.role
            }
            this.$emit('signup-user', userCred);

            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.password = '';
            this.role = 'user';
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
    .form-group input, .form-group select {
        display: block;
        width: 100%;
        font-size: 17px;
        margin: 5px;
        height: 40px;
        padding: 3px 7px;
    }
    .alert{
        width: 100%;
        background-color: #2979d4a9;
        border: 2px solid #2979d4;
        color:#ffff;
        padding:20px 30px;
        margin: 5px;
        border-radius: 3px;
    }
</style>