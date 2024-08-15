<template>
     <div class="pa-2" style="background-color: white;">
            <ion-segment value="default" class="pb-5" @ionChange="segmentChanged">
                <ion-segment-button value="default">
                    <ion-label>User Maintenance</ion-label>
                </ion-segment-button>
                <ion-segment-button value="export">
                    <ion-label>Export Attlogs</ion-label>
                </ion-segment-button>
                <ion-segment-button value="setting">
                    <ion-label>Settings</ion-label>
                </ion-segment-button>
            </ion-segment>

      
            <Users v-if="tab == 'default'"/>
            <Attlogs v-if="tab == 'export'"/>
            <Settings v-if="tab == 'setting'"/>

     
        </div>
</template>

<script>
import Users from './tabs/Users.vue';
import Attlogs from './tabs/Attlogs.vue';
import Settings from './tabs/Settings.vue';


import { 
   IonGrid,IonRow,IonCol, IonInput, IonButton, IonCard, IonSpinner,IonIcon,IonSegment,IonSegmentButton,
   IonSearchbar,IonLabel
} from '@ionic/vue';
export default {
    components: {
        IonGrid,IonRow,IonCol, IonInput, IonButton, IonCard,IonSpinner,IonIcon,IonSegment,IonSegmentButton,
        IonSearchbar,IonLabel,

        Users,Attlogs,Settings
    },
    data(){
        return{
            tab: 'default',
        }
    },
    created(){

    },
    computed: {
    
    },
    methods: {












        // ------------------------------------------------
        segmentChanged(e){
            this.tab = e.detail.value
        },
    }
}
</script>

<style scoped>
  ion-segment-button{
    min-height: 40px !important;
    height: 40px !important;
  }
</style>