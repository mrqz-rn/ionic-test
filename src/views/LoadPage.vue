<template>
    <ion-page style="display: flex; justify-content: center; align-items: center; background-color: whitesmoke;">
      <!-- <ion-spinner color="dark" name="circles"></ion-spinner> -->
      <div class="loader" :class="color"></div>
      <div :class="message ? 'animate__animated animate__bounceIn' : 'animate__animated animate__bounceOut' "
      style="color: black; position: absolute; bottom: 15vh;">
       <span style="font-weight: 600;">{{message}}</span> 
      </div>
    </ion-page>
</template>

<script>
import { IonPage, IonSpinner } from '@ionic/vue';
import { Network } from '@capacitor/network';
import '../assets/animate.css'

export default {
  components: { IonPage, IonSpinner },
  data(){
    return{
      message: 'Please wait...',
      color: 'color1'
    }
  },
  async created(){
    let id = 1;
    let intervalId = setInterval(() => {
      id++;
      this.color = 'color' + id;
      if(id == 4){ id = 0; }
    }, 2000);
    setTimeout(() => clearInterval(intervalId), 75000);

    const user_info = await this.$storage.getItem('session-userinfo');
    const net = await Network.getStatus();
    const appVersion = '1.2.6';
    const user = await this.$storage.getItem('session-user');
    if(net.connectionType != 'none'){
      if(user_info){
        try {
          await this.checkLogin(user_info)
        } catch (error) {
          this.message = '';
          setTimeout(() => {
            this.message = 'Please wait while getting app data...';
          }, 500);
          console.log(error)
        }
      }
      // if online check for update
      try {
        const timeout = (ms) => new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), ms)
        );
        const res = await Promise.race([
          this.$api.getappconfig(),
          timeout(2500)
        ])
        // const res = await this.$api.getappconfig();
        console.log('Current Ver: ' + appVersion + ' | Latest Ver: ' + res.version);
        await this.$storage.setItem('app-config', res);

        if (res.version != appVersion) {
          setTimeout(() => {
            this.$router.push('update');
          }, 1000);
        }else{
          setTimeout(() => {
            if(user){
              this.$router.push('dashboard');
            }else{
              this.$router.push('login');
            }
          }, 1000);
        
        }
      } catch (error) {
        this.message = '';
        setTimeout(() => {
          this.message = 'Please wait while getting app data...';
        }, 500);
        setTimeout(() => {
          if(user){
            this.$router.push('dashboard');
          }else{
            this.$router.push('login');
          }
        }, 2500);
      }
    
    }else{
      // for offline
      setTimeout(() => {
        if(user){
          this.$router.push('dashboard');
        }else{
          this.$router.push('login');
        }
      }, 1000);
     
    }

  },
  methods:{
    async checkLogin(data){
      const net = await Network.getStatus();
      if(net.connectionType != 'none'){
        const timeout = (ms) => new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), ms)
        );
        const res = await Promise.race([
          this.$api.checklogin(data),
          timeout(2500)
        ])
        console.log(res)
        // const res = await this.$api.checklogin(data);
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
  .loader {
  width: 45px;
  aspect-ratio: 1;
  --_g: no-repeat radial-gradient(farthest-side,#205400 80%,#0000);
  background:
    var(--_g) 0    0,
    var(--_g) 100% 0,
    var(--_g) 100% 100%,
    var(--_g) 0    100%;
  background-size: 38% 38%;
  animation: l38 .4s infinite; 
}
@keyframes l38 {
  100% {background-position: 100% 0,100% 100%,0 100%,0 0}
}
.color1{
  --_g: no-repeat radial-gradient(farthest-side,#205400 80%,#0000);
}
.color2{
  --_g: no-repeat radial-gradient(farthest-side,#003ea8 80%,#0000);
}
.color3{
  --_g: no-repeat radial-gradient(farthest-side,#ad1a03 80%,#0000);
}
.color4{
  --_g: no-repeat radial-gradient(farthest-side,#d1af02 80%,#0000);
}




.loader2 {
  width: 35px;
  aspect-ratio: 1;
  --_g: no-repeat radial-gradient(circle closest-side,#205400 80%,#0000);
  background: 
    var(--_g) 0    0,
    var(--_g) 0    100%,
    var(--_g) 100% 100%;
  background-size: 40% 40%;
  animation:l11 1s infinite linear;
}
.loader3 {
  width: 35px;
  aspect-ratio: 1;
  --_g: no-repeat radial-gradient(circle closest-side,#205400 80%,#0000);
  background: 
    var(--_g) 0    0,
    var(--_g) 0    100%,
    var(--_g) 100% 100%;
  background-size: 40% 40%;
  animation:l11 1s infinite linear;
}
@keyframes l11 {
    25% {background-position:100% 0   ,0 100%,100% 100%}
    50% {background-position:100% 0   ,0 0   ,100% 100%}
    75% {background-position:100% 0   ,0 0   ,0    100%}
    100%{background-position:100% 100%,0 0   ,0    100%}
}
</style>




