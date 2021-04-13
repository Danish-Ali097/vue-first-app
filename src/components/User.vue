<template>
    <div class="card">
        <div class="header">
            <h3>{{user.firstName}}&nbsp;{{user.lastName}}</h3>
            <i @click="$emit('delete-user', user.id)" class="fa fa-times"></i>
        </div>
        <div class="body">
            <table>
                <tr>
                    <th>ID</th>
                    <td>{{user.id}}</td>
                </tr>
                <tr>
                    <th>First Name</th>
                    <td>{{user.firstName}}</td>
                </tr>
                <tr>
                    <th>Last Name</th>
                    <td>{{user.lastName}}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{{user.email}}</td>
                </tr>
                <tr>
                    <th>Role</th>
                    <td>{{user.role}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name:'User',
    props:{
        user:Object
    }
}
</script>

<style scoped>
    .card{
        box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
        margin: 5px;
    }
    .header {
        background-color: #0f54af;
        padding: 10px 20px;
        color: #f2f2f2;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .body {
        padding: 10px 20px;
    }

    .body table{
        width: 100%;
        text-align: left;
    }
    .body table tr {
        height: 30px;
    }
    .fa {color: red;}
</style>