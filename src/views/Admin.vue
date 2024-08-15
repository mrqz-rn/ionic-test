<template>
    <ion-page>
        <div v-if="!admin" class="d-flex justify-center backdrop">
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
        <div v-else class="pa-2" style="background-color: white;">
            <ion-segment value="default" class="pb-5" @ionChange="segmentChanged">
                <ion-segment-button value="default">
                    <ion-label>Maintenance</ion-label>
                </ion-segment-button>
                <ion-segment-button value="export">
                    <ion-label>Export Attlogs</ion-label>
                </ion-segment-button>
                <ion-segment-button value="setting">
                    <ion-label>Settings</ion-label>
                </ion-segment-button>
            </ion-segment>

      

            <div v-if="tab == 'default'">
                <ion-row class="d-flex justify-space-between align-content-center mb-2">
                    <ion-col lcass size-xs="12" size-sm="7" size-md="7" size-lg="6" size-xl="5">
                        <ion-searchbar v-model="search" animated="true" placeholder="Search"></ion-searchbar>
                    </ion-col>
                    <ion-col lcass size-xs="12" size-sm="4" size-md="4" size-lg="3" size-xl="3" >
                        <ion-button @click="addModal()" class="mt-3" expand="full" shape="round" color="success">Upload</ion-button>
                    </ion-col>
                </ion-row>
                <div style="max-height: 70vh; overflow-y: scroll;">

                
                <table class="myTable">
                    <thead>
                        <tr>
                            <th>Employee No.</th>
                            <th>Name</th>
                            <th>Last Login</th>
                            <th>Device</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, key) in filteredList" :key="key">
                            <td class="text-center">{{ data.username }}</td>
                            <td class="">{{ data.nickname }}</td>
                            <td class="text-center">{{ data.lastlogin }}</td>
                            <td class="">{{ data.deviceloggedin }}</td>
                            <td>
                                <ion-button id="custom-success" @click="editModal()" size="small" class="me-1">
                                    <ion-icon :icon="createSharp" @click="openModal(data)"></ion-icon>
                                </ion-button>
                                <ion-button size="small" color="primary" class="me-1">
                                    <ion-icon :icon="cog" @click="openModal(data)"></ion-icon>
                                </ion-button>
                                <ion-button size="small" color="danger" class="me-1">
                                    <ion-icon :icon="trashBinSharp" @click="openModal(data)"></ion-icon>
                                </ion-button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- <ion-row class="">
                    <ion-col class="d-flex justify-center" 
                    size-xs="11" size-sm="11" size-md="11" size-lg="11" size-xl="5">
                        <ion-list class="me-3">
                            <ion-item>
                            <ion-select aria-label="pages" interface="popover" placeholder="Select" value="10" @ionChange="setPage($event)">
                                <ion-select-option value="5">5</ion-select-option>
                                <ion-select-option value="10">10</ion-select-option>
                                <ion-select-option value="50">50</ion-select-option>
                                <ion-select-option value="100">100</ion-select-option>
                            </ion-select>
                            </ion-item>
                        </ion-list>
                        <div class="d-flex justify-center py-4" >
                            <ion-button>Prev</ion-button>
                            <ion-button class="mx-2" readonly color="medium">1</ion-button>
                            <ion-button>Next</ion-button>
                        </div>
                    </ion-col>
                </ion-row> -->

              
             
                
                </div>
            </div>


            <!-- ATTLOGS EXPORT SECTION -->
            <ion-grid v-if="tab == 'export'">
                <ion-row class="d-flex justify-center " style="height: 100vh;">
                    <ion-col size-xs="11" size-sm="11" size-md="11" size-lg="11" size-xl="11">
                        <ion-row class="" style="gap: 10px;" >
                            <ion-col size-md="4">
                                <ion-input v-model="displaydate.from" :readonly="true" @click="pickDate(1)"
                                label="Date From" fill="outline"  label-placement="stacked" class="darkInput"></ion-input>
                            </ion-col>
                            <ion-col class="" size-md="4">
                                <ion-input v-model="displaydate.to" :readonly="true" @click="pickDate(2)"
                                label="Date To" fill="outline"  label-placement="stacked" size="small" class="darkInput"></ion-input>
                            </ion-col>
                            <ion-col class="ma-auto" size-md="3">
                                <IonButton  class="" expand="full" shape="round" @click="getAttlogsrpt()">Submit</IonButton>
                            </ion-col>
                            
                        </ion-row>
                        <div class="mt-3">
                            <p v-if="attlogs.length > 0" class="link" @click="exportJson">Export as JSON</p>
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
                                        <tr>f
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
        </div>

        <!-- EDIT MODAL -->
        <ion-button id="edit-modal" expand="block" style="display: none;"></ion-button>
        <ion-modal id="example-modal" ref="modal" trigger="edit-modal">
            <div class="wrapper px-4 pb-2">
                <h3 class="d-flex justify-center pt-3 pb-1 black-text" style="width: 60vw;">EDIT USER</h3>
                <IonInput label="Username" fill="outline"  label-placement="stacked" 
                placeholder="Enter Username" style="text-align: left !important" 
                class="pb-3 darkInput"/>
                <IonInput label="Name" fill="outline"  label-placement="stacked" 
                placeholder="Enter Name" style="text-align: left !important" 
                class="pb-3 darkInput"/>
                <div v-for="(item, key) in modules" :key="key">
                    <ion-checkbox @ionChange="changeModule(item)" :checked="item.isChecked"
                    label-placement="end"> {{ item.moduleName }}</ion-checkbox>
                </div>
             
                <ion-button expand="full" color="primary" shape="round">Submit</ion-button>

            </div>
        </ion-modal>

        <!-- DATE PICKER MODAL -->
        <ion-button id="open-date" expand="block" style="display: none;">Date modal</ion-button>
        <ion-modal id="example-modal" ref="modal" trigger="open-date"  :can-dismiss="datepick.canDismiss">
            <div class="wrapper">
            <h2 class="d-flex justify-center pt-2"></h2>
            <ion-datetime v-model="datepick.model" presentation="date" 
            
            :min="datepick.type == 1 ? `` : `${new Date(modeldate.from).toLocaleDateString('en-CA')}T00:00:00`"
            :max="`${new Date().toLocaleDateString('en-CA')}T23:59:59`"/>
            <div class="pa-3">
                <ion-button expand="full" color="medium" @click="confirmPick()">Confirm</ion-button>
            </div>
            </div>
        </ion-modal>
    </ion-page>
</template>

<script>
import { Network } from '@capacitor/network';
import {  cog, person, createSharp, trashBinSharp, locationSharp } from 'ionicons/icons';

import { 
  IonPage, IonContent, IonHeader, IonButton, IonToolbar, IonList, IonModal, modalController , IonToast,
  IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonCardSubtitle, IonChip, IonSpinner, IonInput,
  IonMenu, IonMenuButton, IonTitle, IonLabel, IonItem, IonButtons, alertController ,loadingController, IonIcon,
  IonRow, IonCol, IonInputPasswordToggle, IonGrid, IonDatetime, IonSegment,IonSegmentButton, IonSearchbar,
  IonCheckbox
   
} from '@ionic/vue';
export default {
    components: {
        IonPage, IonContent, IonHeader, IonButton, IonToolbar, IonItem,IonList,IonModal,modalController,IonToast,
        IonButtons,IonMenu,IonTitle,IonMenuButton,IonLabel, IonChip, alertController, loadingController,
        IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonCardSubtitle,IonSpinner, IonInput, IonIcon, 
        IonRow, IonCol, IonInputPasswordToggle,IonGrid, IonDatetime,IonSegment,IonSegmentButton, IonSearchbar,
        IonCheckbox
    },
    data(){
        return{
            cog, person, createSharp,trashBinSharp,locationSharp,
            input: {
                username: '',
                password: '',
            },
            admin: {
                name: 'test'
            },
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
            userinput: {
                username: '',
                name: '',
            },
            modules: [],
            busy: {
                b2: false
            },
            tab: 'default',
            spottusers: [],
            search: '',
        }
    },
    async created(){
        const user = await this.$storage.getItem('session-admin');
        this.admin = user
        this.datepick.model = this.dateModel(new Date())
        this.modeldate.from = new Date().toLocaleDateString('en-CA');
        this.modeldate.to =  new Date().toLocaleDateString('en-CA');
        this.displaydate.from = this.formatDate(new Date().toLocaleDateString('en-CA'))
        this.displaydate.to =  this.formatDate(new Date().toLocaleDateString('en-CA'))
       
        await this.getUsers()
        await this.getInit()
        // const saved = await this.$api.savedata({
        //     table_name: 'employee_login',
        //     fields: {
        //         username: 'admin',
        //         password: 'mis1'
        //     },
        //     key: ['username']
        // });
        // console.log(saved)
    },
    computed: {
        filteredList() {
            if(this.search){
                return this.spottusers.filter(item => {
                    return item.username.toLowerCase().includes(this.search.toLowerCase()) ||
                    String(item.nickname).toLowerCase().includes(this.search.toLowerCase()) ||
                    String(item.deviceloggedin).toLowerCase().includes(this.search.toLowerCase())
                })
            }else{
                return this.spottusers
            }
        }
    },
    methods:{
        async getInit(){
            const response = await this.$api.masterselect({
                table_name: 'modules',
            });
            console.log(response)
            this.modules = response
        },
        async getUsers(){
            const response = await this.$api.masterselect({
                table_name: 'employee_login',
            });
            this.spottusers = response
            // console.log(response)
        },
        changeModule(e){
            console.log(e)
        },

        editModal(){
            const btn = document.getElementById('edit-modal');
            if (btn) {
                btn.click();
            }
        },
        segmentChanged(e){
            this.tab = e.detail.value
        },
        setPage(page){
            console.log(page.detail.value)
        },
        async adminLog(){
            console.log(this.input)
            if(this.input.username == 'admin' || this.input.password == 'mis1'){
               await this.$storage.setItem('session-admin', (this.input));
               setTimeout(async () => {
                this.admin = await this.$storage.getItem('session-admin');
               }, 500);
            }else{
                console.log('username: admin, password: mis1')
                return this.showAlert({header: 'Warning!', message: 'Invalid username or password'})
                
            }
        },
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
                if(response.status == true){
                this.attlogs = response.attlogs
                }else{
                this.attlogs = []
                }
            } catch (error) {
                this.showAlert({header: 'Error!', message: 'Something went wrong. Please try again.'})
            }
            
            this.busy.b2 = false
            },
        exportJson(){
            let datenow = new Date();
            let month = datenow.getMonth() + 1;
            let day = datenow.getDate();
            let year = datenow.getFullYear();

            const content = JSON.stringify(this.attlogs, null, 2);
            const blob = new Blob([content], { type: 'application/json' });
            const elem = window.document.createElement('a');
            
            elem.href = window.URL.createObjectURL(blob);
            elem.download = `attlogs_${year}-${month}-${day}.json`;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        },
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
  ion-modal#input-modal .wrapper {
    margin-bottom: 10px;
    width: 60vw;
  }
  ion-modal#input-modal .wrapper div{
    max-height: 70vh;
    overflow-y: scroll;
  }
.backdrop{
    background: hsla(221, 58%, 8%, 1);
    background: linear-gradient(135deg, hsla(221, 58%, 8%, 1) 0%, hsla(220, 78%, 29%, 1) 100%);
    background: -moz-linear-gradient(135deg, hsla(221, 58%, 8%, 1) 0%, hsla(220, 78%, 29%, 1) 100%);
    background: -webkit-linear-gradient(135deg, hsla(221, 58%, 8%, 1) 0%, hsla(220, 78%, 29%, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#091122", endColorstr="#103783", GradientType=1 );
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

.link{
    color: #215bb1;
    text-decoration: underline;
    cursor: pointer;
}
ion-spinner {
    width: 50px;
    height: 50px;
  }
  ion-segment-button{
    min-height: 40px !important;
    height: 40px !important;
  }

</style>