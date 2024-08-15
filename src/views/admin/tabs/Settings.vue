<template>
<div>
    <ion-row>
        <ion-col  size-xs="12" size-sm="12"  size-md="12" size-lg="12" size-xl="12" >
            <ion-card class="pa-4 mb-4">
                <h3 class="pb-2 px-2 black-text">App Config</h3>
                <ion-row>
                    <ion-col size-xs="12" size-sm="3"  size-md="3" size-lg="3" size-xl="3" >
                        <div class="px-1 pb-2">
                            <ion-input v-model="appconfig.timein_allowance"
                            label="Time Allowance(in hrs)" fill="outline"  label-placement="stacked" class="darkInput"></ion-input>
                        </div>
                    </ion-col>
                    <ion-col size-xs="12" size-sm="3"  size-md="3" size-lg="3" size-xl="3" >
                        <div class="px-1 pb-2">
                            <ion-input v-model="appconfig.min_timein"
                            label="TimeIn Min(in hrs)" fill="outline"  label-placement="stacked" class="darkInput"></ion-input>
                        </div>
                    </ion-col>
                    <ion-col size-xs="12" size-sm="3"  size-md="3" size-lg="3" size-xl="3" >
                        <div class="px-1 pb-2">
                            <ion-input v-model="appconfig.onMaintenance"
                            label="onMaintenance" fill="outline"  label-placement="stacked" class="darkInput"></ion-input>
                        </div>
                    </ion-col>
                    <ion-col size-xs="12" size-sm="3"  size-md="3" size-lg="3" size-xl="3" >
                        <div class="px-1 pb-2 pt-1">
                            <ion-button  id="custom-success" @click="saveConfig()" expand="full"  shape="round">Save</ion-button>
                        </div>
                    </ion-col>
                </ion-row>


            </ion-card>
        </ion-col>
        <ion-col size-xs="12" size-sm="12"  size-md="12" size-lg="12" size-xl="12" >
            <ion-card class="pa-4">
                <h3 class="pb-2 px-2 black-text">Attlogs Record</h3>
                <ion-button color="danger" shape="round" @click="deleteAttlogs()">Delete Record older than 90 days</ion-button>
            </ion-card>
        </ion-col>
    </ion-row>

    <ion-button class="mt-16 " @click="logout()" expand="full"  shape="round">Logout</ion-button>
</div>
</template>

<script>
import { 
   IonGrid,IonRow,IonCol, IonInput, IonButton, IonCard, IonSpinner,IonIcon,alertController,loadingController,
   IonModal,IonDatetime
} from '@ionic/vue';
export default {
    components: {
        IonGrid,IonRow,IonCol, IonInput, IonButton, IonCard, IonSpinner,IonIcon,alertController,loadingController,
        IonModal,IonDatetime
    },  
    data(){
        return{
            appconfig: {},

        }
    },
    mounted(){
        this.getAppconfig()
    },
    methods:{
        async getAppconfig(){
            const res = await this.$api.masterselect({
                table_name: 'app_config',
            })
            if(res){
                this.appconfig = res[0]
            }
            console.log(res[0])
        },

        async saveConfig(){
            const alert = await alertController.create({
                header: 'Alert!',
                message: 'Are you sure you want to save changes?',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: () => {
                            console.log('Alert canceled');
                        },
                    },
                    {
                        text: 'Yes',
                        role: 'confirm',
                        handler: async () => {
                            const res = await this.$api.savedata({
                                table_name: 'app_config',
                                fields: { 
                                    ID: 1,
                                    timein_allowance: this.appconfig.timein_allowance,
                                    min_timein: this.appconfig.min_timein,
                                    onMaintenance: this.appconfig.onMaintenance
                                },
                                key: ['ID']
                            })
                            if(res.result){
                                return this.showAlert({header: 'Success!', message: 'App Config saved successfully'})
                            }else{
                                console.log(res)
                                return this.showAlert({header: 'Error!', message: 'Failed to save config'})
                            }
                        },
                    },
                ],
            });
            await alert.present();
        },
        async logout(){
            const alert = await alertController.create({
                header: 'Alert!',
                message: 'Are you sure you want to logout?',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: () => {
                            console.log('Alert canceled');
                        },
                    },
                    {
                        text: 'Yes',
                        role: 'confirm',
                        handler: async () => {
                            await this.$storage.removeItem('session-admin')
                            setTimeout(() => {
                                this.$router.go()
                            }, 500);
                        },
                    },
                ],
            });
            await alert.present();

        },
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