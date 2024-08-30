<template>
    <ion-page style="display: flex; justify-content: center; align-items: center;">
      <ion-spinner name="circles"></ion-spinner>
    </ion-page>

</template>

<script>
import { IonPage, IonSpinner } from '@ionic/vue';
import { Network } from '@capacitor/network';

export default {
  components: { IonPage, IonSpinner },
  async created(){
    const user = await this.$storage.getItem('session-user');
    const user_info = await this.$storage.getItem('session-userinfo');
    const net = await Network.getStatus();
    const appVersion = '1.2.5';

    if(net.connectionType != 'none'){
      if(user_info){
        await this.checkLogin(user_info)
      }
      
      const res = await this.$api.getappconfig();
      console.log('Current Ver: ' + appVersion + ' | Latest Ver: ' + res.version);
      // console.log(res)
      await this.$storage.setItem('app-config', res);
      if (res.version != appVersion) {
        this.$router.push('update');
      }else{
        if(user){
          this.$router.push('dashboard');
        }else{
          this.$router.push('login');
        }
      }
    }else{
      if(user){
        this.$router.push('dashboard');
      }else{
        this.$router.push('login');
      }
    }

    // try {
    //   const user = await this.$storage.getItem('session-user');
    //   if(user == null){
    //     setTimeout(() => { this.$router.push('login') }, 500);
    //   }else{
    //     setTimeout(() => { this.$router.push('dashboard') }, 500);
    //   }
    // } catch (error) {
    //   console.log(error)
    //   setTimeout(() => {
    //     this.$router.go()
    //   }, 500);
    // }
  },
  methods:{
    async checkLogin(data){
      const net = await Network.getStatus();
      if(net.connectionType != 'none'){
        const res = await this.$api.checklogin(data);
    
        if(res.requireLogin == 1){
          console.log('require login')
          let user = await this.$storage.getItem('session-user')
          let userinfo = {
            username: user.username,
            password: user.password,
            model: user.deviceloggedin
          }
          const logres = await this.$api.login(userinfo)
          this.$storage.setItem('app-config', (logres.appconfig));
          this.$storage.setItem('session-userinfo', (logres.userinfo));
          this.$storage.setItem('session-user', (logres.user));
        }
      }
    },
  }
  
}
</script>

<style>
ion-spinner {
    width: 60px;
    height: 60px;
  }
</style>