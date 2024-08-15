<template>
<div>
    <Login v-if="!admin"/>
    <Dashboard v-else/>
</div>
</template>

<script>
import Login from './Login.vue';
import Dashboard from './Dashboard.vue';


export default {
    components: {
        Login,Dashboard
    },
    data(){
        return{
            admin: {}
        }
    },
    created(){
        const user = async () => {
            this.admin =  await this.$storage.getItem('session-admin');
            
        }
        console.log(user())
    
    }
}
</script>

<style>

</style>