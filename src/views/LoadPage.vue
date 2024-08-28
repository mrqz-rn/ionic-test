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
    const appVersion = '1.2';

    const net = await Network.getStatus();
    if (net.connectionType === 'none') {
      setTimeout(() => { this.$router.push('login') }, 500);
    } else {
      const res = await this.$api.getappconfig();
      this.$storage.setItem('app-config', (res));
      console.log('Current Ver: ' + appVersion + ' | Latest Ver: ' + res.version);
      if (res.version != appVersion) {
        this.$router.push('update');
      } else {
        setTimeout(() => { this.$router.push('dashboard') }, 500);
      }
    }
  }
}
</script>

<style>
ion-spinner {
    width: 60px;
    height: 60px;
  }
</style>