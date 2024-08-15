<template>
<div>

    <ion-grid>
        <ion-row class="d-flex justify-center " style="height: 100vh;">
            <ion-col size-xs="11" size-sm="11" size-md="11" size-lg="11" size-xl="11">
                <ion-row class="" style="gap: 10px;" >
                    <ion-col size-xs="12" size-sm="4"  size-md="4" >
                        <ion-input v-model="displaydate.from" :readonly="true" @click="pickDate(1)"
                        label="Date From" fill="outline"  label-placement="stacked" class="darkInput"></ion-input>
                    </ion-col>
                    <ion-col size-xs="12" size-sm="4"  size-md="4">
                        <ion-input v-model="displaydate.to" :readonly="true" @click="pickDate(2)"
                        label="Date To" fill="outline"  label-placement="stacked" size="small" class="darkInput"></ion-input>
                    </ion-col>
                    <ion-col class="ma-auto" size-md="3">
                        <IonButton id="custom-success" expand="full" shape="round" @click="getAttlogsrpt()">Submit</IonButton>
                    </ion-col>
                </ion-row>
                <div class="mt-3">
                    <download-excel v-if="attlogs.length > 0"
                    class="black-text"
                    :data="attlogs"
                    :fields="json_fields"
                    worksheet="My Worksheet"
                    :name="`attlogs-${displaydate.from}-${displaydate.to}.xls`"
                    >
                    <ion-button shape="round" class="me-2" size="small">
                        <ion-icon :icon="cloudDownloadOutline"></ion-icon>
                        <h4 class="px-2">Download</h4>
                    </ion-button>
                    </download-excel>
                    <ion-card class="pa-2">
                        <div style="max-height: 70vh; overflow: auto">
                        <table v-if="busy.b2 == false" class="myTable">
                            <thead>
                                <tr>
                                    <th>Employee No.</th>
                                    <th>Name</th>
                                    <th>Trx Date</th>
                                    <th>Trx Time</th>
                                    <th>Trx Mode</th>
                                    <th>Coordinates</th>
                                </tr>
                            </thead>
                            <tbody v-if="attlogs.length > 0">
                                <tr v-for="(data, key) in attlogs" :key="key">
                                    <td class="text-center">{{ data.username }}</td>
                                    <td>Ron Marquez</td>
                                    <td class="text-center">{{ data.trxdate }}</td>
                                    <td class="text-center">{{ data.trxtime }}</td>
                                    <td class="text-center">{{ data.trxmode == '0' ? 'IN' : 'OUT' }}</td>
                                    <td class="text-center">{{ `${data.latitude} : ${data.longitude}` }}</td>
                            
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="6" class="text-center">No Data Found</td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else class="d-flex justify-center align-content-center" style="height: 15vh;">
                            <ion-spinner class="align-self-center" name="circles" size="large"></ion-spinner>
                        </div>
                        </div>
                    </ion-card>
                </div>
            </ion-col>
        </ion-row>  
    </ion-grid>


    
        <!-- DATE PICKER MODAL -->
        <ion-button id="open-date" expand="block" style="display: none;">Date modal</ion-button>
        <ion-modal id="example-modal" ref="modal" trigger="open-date"  :can-dismiss="datepick.canDismiss">
            <div class="wrapper">
            <h2 class="d-flex justify-center pt-2"></h2>
            <ion-datetime v-model="datepick.model" presentation="date" 
            
            :min="datepick.type == 1 ? `` : `${new Date(modeldate.from).toLocaleDateString('en-CA')}T00:00:00`"
            :max="`${new Date().toLocaleDateString('en-CA')}T23:59:59`"/>
            <div class="pa-3">
                <ion-button expand="full" @click="confirmPick()" shape="round" >Confirm</ion-button>
            </div>
            </div>
        </ion-modal>
</div>
</template>

<script>
import { Network } from '@capacitor/network';
import JsonExcel from "vue-json-excel3";
import { 
   IonGrid,IonRow,IonCol, IonInput, IonButton, IonCard, IonSpinner,IonIcon,alertController,loadingController,
   IonModal,IonDatetime
} from '@ionic/vue';
import {  cloudDownloadOutline } from 'ionicons/icons';
export default {
    components: {
        IonGrid,IonRow,IonCol, IonInput, IonButton, IonCard, IonSpinner,IonIcon,alertController,loadingController,
        IonModal,IonDatetime,
        downloadExcel:JsonExcel,
    },
    data(){
        return{
            cloudDownloadOutline,
            displaydate:{
                from: '00/00/0000',
                to: '00/00/0000'
            },
            modeldate: {
                from: '',
                to: ''
            },
            datepick: {
                canDismiss: true,
                type: 1,
                model: new Date()
            },
            attlogs: [],
            busy: {
                b2: false
            },
            json_fields: { 
            "username": "username",
            "trxdate": "trxdate",
            "trxdatedb": "trxdatedb",
            "trxtime": "trxtime",
            "trxmode": "trxmode",
            "timestamp": "timestamp",
            "longitude": "longitude",
            "latitude": "latitude",
            "platform": "platform",
            "picture": "picture",
            "remark": "remark",
            "upload_status": "upload_status",
            "uploaded_on": "uploaded_on",
            },
        }
    },
    mounted(){
        this.datepick.model = this.dateModel(new Date())
        this.modeldate.from = new Date().toLocaleDateString('en-CA');
        this.modeldate.to =  new Date().toLocaleDateString('en-CA');
        this.displaydate.from = this.formatDate(new Date().toLocaleDateString('en-CA'))
        this.displaydate.to =  this.formatDate(new Date().toLocaleDateString('en-CA'))
    },
    methods: {
        
        async getAttlogsrpt() {
            const network = await Network.getStatus();
            if(network.connectionType == 'none' ){
                return this.showAlert({header: 'Warning!', message: 'Please check your internet status'})
            }

            if(this.modeldate.from == '' || this.modeldate.to == ''){
                return this.showAlert({header: 'Warning!', message: 'Please select date range'})
            }

            this.attlogs = []
            this.busy.b2 = true
            let data = {
                dateFrom: this.modeldate.from != '' ? this.modeldate.from : '',
                dateTo: this.modeldate.to != '' ? this.modeldate.to : '',
            }
            try {
                const response = await this.$api.getrptattlogs(data);
                console.log(response)
                if(response.status == true){
                this.attlogs = response.dtrinfo
                }else{
                this.attlogs = []
                }
            } catch (error) {
                this.showAlert({header: 'Error!', message: 'Something went wrong. Please try again.'})
            }
            
            this.busy.b2 = false
            },


        // ----------------------------------------------------------
        pickDate(data){
            this.datepick.canDismiss = false
            if(data == 1){
                this.datepick.type = 1
            }else if(data == 2){
                this.datepick.type = 2
            }

            const datebtn = document.getElementById('open-date');
            if (datebtn) {
                datebtn.click();
            }
        },
        confirmPick(){
            this.datepick.canDismiss = true
            if(this.datepick.type == 1){
                this.displaydate.from = this.formatDate(this.datepick.model)
                this.modeldate.from = this.dateFormat(this.datepick.model)
            }else{
                this.displaydate.to = this.formatDate(this.datepick.model)
                this.modeldate.to = this.dateFormat(this.datepick.model)
            }
            this.$refs.modal.$el.dismiss();
        },
        dateModel(date) {
            const pad = (number) => (number < 10 ? '0' + number : number);

            const year = date.getFullYear();
            const month = pad(date.getMonth() + 1); // Months are zero-based
            const day = pad(date.getDate());
            const hours = pad(date.getHours());
            const minutes = pad(date.getMinutes());
            const seconds = pad(date.getSeconds());

            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        },
        formatDate(date){
            let year = date.substring(0, 4);
            let month = date.substring(5, 7)
            let day = date.substring(8, 10)
            // console.log(`${month}/${day}/${year}`)
            return `${month}/${day}/${year}`
        },
        dateFormat(date){
            let year = date.substring(0, 4);
            let month = date.substring(5, 7)
            let day = date.substring(8, 10)
            // console.log(`${month}/${day}/${year}`)
            return `${year}-${month}-${day}`
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

<style scoped>
ion-modal#example-modal {
--width: fit-content;
--min-width: 250px;
--height: fit-content;
--border-radius: 6px;
--box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}
ion-modal#example-modal h1 {
margin: 20px 20px 10px 20px;
}
ion-modal#example-modal ion-icon {
margin-right: 6px;
width: 48px;
height: 48px;
padding: 4px 0;
color: #aaaaaa;
}
ion-modal#example-modal .wrapper {
margin-bottom: 10px;
}
ion-modal#example-modal .wrapper div{
max-height: 70vh;
overflow-y: scroll;
}
.myTable{
    width: 100%; 
    border-collapse: collapse; 
    table-layout: auto;
}
.myTable thead tr{
    background-color: #0D47A1;
    color: white;
    border-bottom: 2px solid #1f1f1f;
}
.myTable thead tr th{
    padding: 8px; 
    text-align: center;
}
.myTable tbody tr{
    color: black;
    border-bottom: 1px solid #353535;
}
.myTable tbody tr td{
    padding: 5px; 
}
</style>