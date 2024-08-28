<template>
    <ion-page style="display: flex; justify-content: center; align-items: center;">
      <ion-spinner name="circles"></ion-spinner>
    </ion-page>

</template>

<script>
import { IonPage, IonSpinner } from '@ionic/vue';

export default {
  components: { IonPage, IonSpinner },
  async created(){
    try {
      const user = await this.$storage.getItem('session-user');
      if(user == null){
        setTimeout(() => { this.$router.push('login') }, 500);
      }else{
        setTimeout(() => { this.$router.push('dashboard') }, 500);
      }
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        this.$router.go()
      }, 500);
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