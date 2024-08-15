<template>
  <div class="d-flex justify-center backdrop">
            <ion-grid>
                <ion-row class="d-flex justify-center align-content-center" style="height: 100vh;">
                <ion-col lcass size-xs="11" size-sm="9" size-md="6" size-lg="6" size-xl="4">
                    <ion-card style="border-radius: 15px;">
                    <h2 class="text-center py-2" style="color: black;">ADMIN</h2>
                    <div class="px-5 pb-3">
                        <IonInput v-model="input.username" 
                        label="Username" fill="outline"  label-placement="stacked" 
                        placeholder="Enter Username" style="text-align: left !important" 
                        class="pb-3 darkInput">
                        </IonInput>
                        <IonInput v-model="input.password"
                        type="password" label="Password" fill="outline" 
                        placeholder="Enter Password" label-placement="stacked" 
                        style="text-align: left !important" class="darkInput">
                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                        </IonInput>
                        <IonButton  @click="adminLog()" class="mt-4" expand="full" shape="round" >LOG IN</IonButton>
                    </div>
                    </ion-card>
                </ion-col>
                </ion-row>
            </ion-grid>  
        </div>
</template>

<script>
import { 
   IonGrid,IonRow,IonCol, IonInput, IonButton, IonCard,alertController,IonInputPasswordToggle
} from '@ionic/vue';
export default {
    components: {
        IonGrid,IonRow,IonCol, IonInput, IonButton, IonCard,alertController,IonInputPasswordToggle
    },
    data(){
        return{
            input: {
                username: '',
                password: '',
            },
        }
    },
    methods:{
        async adminLog(){
            if(this.input.username == 'admin' || this.input.password == 'mis1'){
               await this.$storage.setItem('session-admin', (this.input));
               setTimeout(async () => {
                this.admin = await this.$storage.getItem('session-admin');
                this.$router.go()
               }, 500);
            }else{
                console.log('username: admin, password: mis1')
                return this.showAlert({header: 'Warning!', message: 'Invalid username or password'})
                
            }
        },








        // -----------------------------------------------
        async showAlert(data){
            const alert = await alertController.create({
                header: data.header,
                message: data.message,
                buttons: ['Okay'],
            });
            await alert.present();
        },
    }
}
</script>

<style>
.backdrop{
    background: hsla(221, 58%, 8%, 1);
    background: linear-gradient(135deg, hsla(221, 58%, 8%, 1) 0%, hsla(220, 78%, 29%, 1) 100%);
    background: -moz-linear-gradient(135deg, hsla(221, 58%, 8%, 1) 0%, hsla(220, 78%, 29%, 1) 100%);
    background: -webkit-linear-gradient(135deg, hsla(221, 58%, 8%, 1) 0%, hsla(220, 78%, 29%, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#091122", endColorstr="#103783", GradientType=1 );
}
.darkInput{
    --border-color: #212121;
    --border-radius: 4px;
    --padding-start: 16px;
    --padding-end: 16px;
    min-height: 45px !important;
    --color: black;
}
</style>