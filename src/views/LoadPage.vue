<template>
    <ion-page style="display: flex; justify-content: center; align-items: center; background-color: whitesmoke;">
      <ion-spinner color="dark" name="circles"></ion-spinner>
    </ion-page>
</template>

<script>
import { IonPage, IonSpinner } from '@ionic/vue';
import { Network } from '@capacitor/network';

export default {
  components: { IonPage, IonSpinner },
  async created(){
    const user_info = await this.$storage.getItem('session-userinfo');
    const net = await Network.getStatus();
    const appVersion = '1.2.6';
    const user = await this.$storage.getItem('session-user');
    if(net.connectionType != 'none'){
      if(user_info){
        await this.checkLogin(user_info)
      }
      // if online check for update
      const res = await this.$api.getappconfig();
      console.log('Current Ver: ' + appVersion + ' | Latest Ver: ' + res.version);
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
      // for offline
      if(user){
        this.$router.push('dashboard');
      }else{
        this.$router.push('login');
      }
    }

  },
  methods:{
    async checkLogin(data){
      const net = await Network.getStatus();
      if(net.connectionType != 'none'){
        const res = await this.$api.checklogin(data);
        if(res.updateConfig == 1){
          let user = await this.$storage.getItem('session-user')
          let userinfo = {
            username: user.username,
            password: user.password,
            model: user.deviceloggedin
          }
          const logres = await this.$api.login(userinfo)
          await this.$storage.setItem('app-config', (logres.appconfig));
          await this.$storage.setItem('session-userinfo', (logres.userinfo));
          await this.$storage.setItem('session-user', (logres.user));
        }
        if(res.forceLogout == 1){
          await this.$storage.removeItem('session-userinfo');
          await this.$storage.removeItem('session-user');
          await this.$storage.removeItem('session-attlogs');
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