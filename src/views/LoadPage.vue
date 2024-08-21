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
    const user = await this.$storage.getItem('session-user');
    const attlogs = await this.$storage.getItem('session-attlogs');
    console.log(attlogs)
    // if(attlogs != null){
    //   let limitdate = new Date();
    //   limitdate.setDate(limitdate.getDate() - 60);

    //   let fordeletion = attlogs.filter(e => e.upload_status == '1' && new Date(e.trxdatedb) < limitdate);
    //   if(fordeletion.length > 0){
    //     let ids = fordeletion.map(e => {
    //       return e.id
    //     })
      
    //   if(attlogs.length > 1){
    //     let valid_attlogs = attlogs.filter(e => !ids.includes(e.id));
    //     await this.$storage.removeItem('session-attlogs');
    //     await this.$storage.setItem('session-attlogs', valid_attlogs);
    //     console.log(valid_attlogs)
    //   }
    // }
    // }


    if(user == null){
      setTimeout(() => { this.$router.push('login') }, 500);
    }else{
      setTimeout(() => { this.$router.push('dashboard') }, 500);
      // console.log(user)
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