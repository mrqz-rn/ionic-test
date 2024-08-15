<template>
<div>
    <ion-row class="d-flex justify-space-between align-content-center mb-2">
        <ion-col lcass size-xs="12" size-sm="7" size-md="7" size-lg="6" size-xl="5">
            <ion-searchbar v-model="search" animated="true" placeholder="Search"></ion-searchbar>
        </ion-col>
        <ion-col lcass size-xs="12" size-sm="4" size-md="4" size-lg="3" size-xl="3" >
            <ion-button @click="uploadModal()" class="mt-3" expand="full" shape="round" id="custom-success">Upload Users</ion-button>
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
                    <ion-button id="custom-success" @click="editModal(data)" size="small" class="me-1">
                        <ion-icon :icon="createSharp"></ion-icon>
                    </ion-button>
                    <ion-button @click="locModal(data)" size="small" color="primary" class="me-1" >
                        <ion-icon :icon="locationSharp" ></ion-icon>
                    </ion-button>
                    <ion-button size="small" color="danger" class="me-1"  @click="deleteUser(data)">
                        <ion-icon :icon="trashBinSharp"></ion-icon>
                    </ion-button>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    
    <!-- EDIT MODAL -->
    <ion-button id="edit-modal" expand="block" style="display: none;"></ion-button>
    <ion-modal id="example-modal" ref="modal1" trigger="edit-modal">
        <div class="wrapper px-4 pb-2" style="max-width: 85vw;">
            <h3 class="d-flex justify-center py-3 black-text">USER CONFIG</h3>
            <ion-row>
                <ion-col size-xs="12" size-sm="4" size-md="4" size-lg="4" size-xl="4">
                    <div style="overflow: hidden;" class="py-1 px-1">
                        <ion-input label="Username" fill="outline"  label-placement="stacked" class="pb-1 darkInput"/>
                    </div>
                </ion-col> 
                <ion-col size-xs="12" size-sm="8" size-md="8" size-lg="8" size-xl="8" >
                    <div style="overflow: hidden;" class="pt-1 px-1">
                        <ion-input label="Name" fill="outline"  label-placement="stacked" class="pb-1 darkInput"/>
                    </div>
                </ion-col> 
                <ion-col size-xs="6" size-sm="4" size-md="3" size-lg="3" size-xl="3" >
                    <ion-checkbox class="pt-2" label-placement="end">Geo Fence</ion-checkbox>
                </ion-col>
                <ion-col size-xs="6" size-sm="4" size-md="3" size-lg="3" size-xl="3" >
                    <ion-checkbox class="pt-2" label-placement="end">Image Capture</ion-checkbox>
                </ion-col>
                <ion-col size-xs="12" size-sm="4" size-md="3" size-lg="3" size-xl="3" >
                    <ion-checkbox class="pt-2" label-placement="end">Calibrate Status</ion-checkbox>
                </ion-col>
                <ion-col size-xs="12" size-sm="12" size-md="3" size-lg="3" size-xl="3" >
                    <ion-input label="Modules" fill="outline"  label-placement="stacked" class="pb-1 darkInput"/>
                </ion-col>
            </ion-row>  
            

            
            
            <ion-button expand="full" color="primary" shape="round">Submit</ion-button>

        </div>
    </ion-modal>
    
    
    <!-- LOCATION MODAL -->
    <ion-button id="loc-modal" expand="block" style="display: none;"></ion-button>
    <ion-modal id="example-modal" ref="modal2" trigger="loc-modal">
        <div class="wrapper px-4 pb-2">
            <h3 class="d-flex justify-center pt-3 pb-3 black-text" style="">USER LOCATIONS</h3>
            <ion-row style="gap: 6px;" class="d-flex pb-3">
                <ion-col size-xs="5" size-sm="5" size-md="4" size-lg="4" size-xl="4" >
                    <IonInput v-model="inputLoc.lat" label="Latitude" fill="outline"  label-placement="stacked" 
                    class="darkInput"/>
                </ion-col>
                <ion-col size-xs="5" size-sm="5" size-md="4" size-lg="4" size-xl="4" >
                    <IonInput v-model="inputLoc.long" label="Longitude" fill="outline"  label-placement="stacked" 
                    class="darkInput"/>
                </ion-col>
                <ion-col size-xs="5" size-sm="5" size-md="2" size-lg="2" size-xl="2" >
                    <IonInput v-model="inputLoc.rad" label="Radius" fill="outline"  label-placement="stacked" 
                    class="darkInput"/>
                </ion-col>
                <ion-col size-xs="6" size-sm="5" size-md="1" size-lg="1" size-xl="1"  class="align-self-center">
                    <ion-button id="custom-success" shape="round" @click="addLoc()">add</ion-button>
                </ion-col>
            </ion-row>
       
            <table class="myTable">
                <thead>
                    <tr>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Radius</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, key) in userLocs" :key="key">
                        <td class="text-center">{{ data.latitude }}</td>
                        <td class="text-center">{{ data.longitude }}</td>
                        <td class="text-center">{{ data.radius }}</td>
                        <td class="text-center">
                            <ion-button @click="deleteLoc(data)" size="small" class="me-1" color="danger">Delete</ion-button>
                        </td>   

                    </tr>
                </tbody>
            </table>
            <div v-if="busy.loc" class="d-flex justify-center align-content-center" style="height: 15vh;">
                <ion-spinner class="align-self-center" name="circles" size="large"></ion-spinner>
            </div>
            
            <ion-button @click="closeModal()" expand="full" color="medium" shape="round" size="small" class="pt-3">Close</ion-button>

        </div>
    </ion-modal>

     <!-- UPLOAD MODAL -->
     <ion-button id="upload-modal" expand="block" style="display: none;"></ion-button>
    <ion-modal id="example-modal" ref="modal3" trigger="upload-modal">
        <div class="wrapper px-4 pb-2" style="max-width: 85vw;">
            <h3 class="d-flex justify-center py-3 black-text">UPLOADING</h3>
            <ion-row>
        
                <ion-col size-xs="12" size-sm="12" size-md="6" size-lg="6" size-xl="6" >
                    <ion-item >
                        <h4 style="width: 100px;">User Login</h4>
                        <input type="file" id="fileinput1" @change="onFileChange1" @click="handleFIle" accept=".txt, .xlsx, .xls" 
                        style="scale: 0.9; border: 1px solid gray; padding: 6px 12px; border-radius: 5px;"/>
                    </ion-item>
                </ion-col>
                <ion-col size-xs="12" size-sm="12" size-md="6" size-lg="6" size-xl="6" >
                    <ion-item>
                        <h4 style="width: 100px;">User Config</h4>
                        <input type="file" id="fileinput2" @change="onFileChange2" @click="handleFIle" accept=".txt, .xlsx, .xls" 
                        style="scale: 0.9; border: 1px solid gray; padding: 6px 12px; border-radius: 5px;"/>
                    </ion-item>
                </ion-col>
            </ion-row>  
            

            <ion-button @click="uploadFiles()" class="mt-3" expand="full" color="primary" shape="round">DONE</ion-button>

        </div>
    </ion-modal>

</div>
</template>

<script>
import {  settingsSharp, person, createSharp, trashBinSharp, locationSharp } from 'ionicons/icons';
import readXlsxFile from 'read-excel-file';


import { 
   IonGrid,IonRow,IonCol, IonInput, IonButton, IonCard, IonSpinner,IonIcon,alertController,loadingController,
   IonSearchbar,IonLabel,IonModal,IonCheckbox,IonItem
} from '@ionic/vue';
export default {
    components: {
        IonGrid,IonRow,IonCol, IonInput, IonButton, IonCard, IonSpinner,IonIcon,alertController,loadingController,
        IonSearchbar,IonLabel,IonModal,IonCheckbox,IonItem
    },
    data(){
        return{
            settingsSharp, person, createSharp, trashBinSharp, locationSharp,
            activeUser: {},
            search: '',
            data: [],
            spottusers: [],
            modules:[],
            busy:{
                loc: false,
            },

            userLocs:[],
            inputLoc: {
                lat: '',
                long: '',
                rad: ''
            },
            selectedFile: null,
            file1: {
                type: '',
                content: ''
            },
            file2: {
                type: '',
                content: ''
            },
            fileContent: '',
            fileType: '',
        }
    },
    created(){

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
    mounted(){
        this.getInit()

    },
    methods:{
        async getInit(){
            const response = await this.$api.masterselect({
                table_name: 'employee_login',
            });
            this.spottusers = response
        },


        handleFIle(event){
            if (event && event.target) {
                event.target.value = null;
                if(event.target.id == 'fileinput1'){
                    this.file1.type = ''
                }else{
                    this.file2.type = ''
                }
            }
        },
        onFileChange1(e) {
            const file = e.target.files[0];
            if(file.name.split('.')[1] == 'txt'){
                this.file1.type = 'txt'
                this.readFile(file)
            } else if(file.name.split('.')[1] == 'xlsx' || file.name.split('.')[1] == 'xls'){
                readXlsxFile(file).then((rows) => {
                    this.file1.type = file.name.split('.')[1]
                    delete rows[0];
                    // rows.pop();
                    this.file1.content = rows
                    console.log(this.file1.content)
                }) .catch((error) => {
                    console.error(error);
                });
            }else{
                this.file1.type = ''
            }
        },
        onFileChange2(e) {
            const file = e.target.files[0];
            if(file.name.split('.')[1] == 'txt'){
                this.file2.type = 'txt'
                this.readFile(file)
            } else if(file.name.split('.')[1] == 'xlsx' || file.name.split('.')[1] == 'xls'){
                readXlsxFile(file).then((rows) => {
                    this.file2.type = file.name.split('.')[1]
                    delete rows[0];
                    // rows.pop();
                    this.file2.content = rows
                    console.log(this.file2.content)
                }) .catch((error) => {
                    console.error(error);
                });
            } else{
                this.file2.type = ''
            }
        },
        async uploadFiles(){
            const loading = await loadingController.create({ message: 'Please Wait while uploading...', translucent: true });
            await loading.present();
            if(this.file1.type == '' && this.file2.type == ''){
                await loading.dismiss();
                return this.showAlert({header: 'Warning!', message: 'Please select a file'})
            }
            if(this.file1.type != ''){
                let file1valid = true
                this.file1.content.forEach(async element => {
                    console.log(element.length)
                    if(element.length != 6){
                       file1valid = false
                    }
                })
                if(!file1valid){
                    await loading.dismiss();
                    return this.showAlert({header: 'Warning!', message: 'File 1: Please check your file format'})
                }else{
                    this.file1.content.forEach(async element => {
                        await this.$api.savedata({
                            table_name: 'employee_login',
                            fields: {
                                username: element[0],
                                nickname: element[1],
                                password: element[2],
                                status: element[3],
                                created_on: element[4],
                                created_by: element[5]
                            },
                            key: ['username']
                        })
                    });
                }
            }
            if(this.file2.type != ''){
                let file2valid = true
                this.file2.content.forEach(async element => {
                    console.log(element.length)
                    if(element.length != 41){
                       file2valid = false
                    }
                })
                if(!file2valid){
                    await loading.dismiss();
                    return this.showAlert({header: 'Warning!', message: 'File 2: Please check your file format'})
                }else{
                    this.file2.content.forEach(async element => {
                        await this.$api.savedata({
                            table_name: 'spott_config_view',
                            fields: {
                                username: element[0],
                                geoFenceMode: element[1],
                                geoFenceMode_desc: element[2],
                                noOfLocations: element[3],
                                allowedLocations: element[4],	
                                isReachedMaxLocation: element[5],
                                imageCapture: element[6],
                                imageCapture_desc: element[7],
                                calibrateStatus: element[8],
                                withApproval: element[9],	
                                IAPP: element[10],	
                                FAPP: element[11],	
                                modules: element[12],
                                companyAccess: element[13],	
                                departmentAccess: element[14],	
                                isLive: element[15],	
                                EMPNUMB: element[16],	
                                EMPLNAM: element[17],	
                                EMPFNAM: element[18],	
                                EMPMNAM: element[19],	
                                fullName: element[20],	
                                cmpname: element[21],	
                                companyID: element[22],	
                                company: element[23],
                                PCCD: element[24],	
                                PAYCLASS: element[25],	
                                DPCD: element[26],	
                                DEP_DESC: element[27],	
                                department: element[28],	
                                posdesc: element[29],	
                                FBTYPE: element[30],	
                                FBNAME: element[31],
                                SHIFT_DESC: element[32],	
                                EMPSHFT: element[33],	
                                TIME_IN: element[34],	
                                TIME_OUT: element[35],	
                                EMVRDCD: element[36],	
                                EMVLCCD: element[37],	
                                FPEMPNUMB: element[38],	
                                FPID: element[39],	
                                FPLCCD: element[40]

                            }
                        })
                    })
                }
            }
           
            


            await loading.dismiss();
            this.showAlert({header: 'Success!', message: 'Your files were uploaded successfully'})
            this.closeModal()
        },

        async deleteUser(data){
            console.log(data)
            
            const alert = await alertController.create({
                header: 'Alert!',
                message: 'Are you sure you want to delete this user?',
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
                            const res = await this.$api.deletedata({
                                table_name: 'employee_login',
                                filters: { username: data.username },
                                key: ['username']
                            })
                            await this.$api.deletedata({
                                table_name: 'spott_config_view',
                                filters: { username: data.username },
                                key: ['username']
                            })
                            await this.$api.deletedata({
                                table_name: 'registered_device',
                                filters: { user: data.username },
                                key: ['user']
                            })
                            if(res.result){
                                await this.getInit()
                                return this.showAlert({header: 'Success!', message: 'User deleted successfully'})
                            }else{
                                console.log(res)
                                return this.showAlert({header: 'Error!', message: 'Failed to delete user'})
                            }
                        },
                    },
                ],
            });
            await alert.present();
        },

        // ------------------------------------------------
        async editModal(data){
            const btn = document.getElementById('edit-modal');
            if (btn) {
                btn.click();
            }

            const res = await this.$api.masterselect({
                table_name: 'spott_config_view',
                having: {
                    username: data.username
                }
            })
            console.log(res)

        },
        async locModal(data){
            this.activeUser = data
            this.busy.loc = true
            const btn = document.getElementById('loc-modal');
            if (btn) {
                btn.click();
            }
            await this.getUserLoc(data);
            
            this.busy.loc = false
        },
        async getUserLoc(data){
            const response = await this.$api.masterselect({
                table_name: 'allowed_locations',
                having: {
                    username: data.username
                }
            })
            this.userLocs = response
            // console.log(response)
        },
        async addLoc(){
            if(this.inputLoc.lat == '' || this.inputLoc.long == '' || this.inputLoc.rad == ''){
                return this.showAlert({header: 'Warning!', message: 'Please fill in all fields'})
            } else if (isNaN(this.inputLoc.lat) || isNaN(this.inputLoc.long) || isNaN(this.inputLoc.rad)) {
                return this.showAlert({header: 'Warning!', message: 'Please enter valid values'})
            }
             const saved = await this.$api.savedata({
                table_name: 'allowed_locations',
                fields: {
                    username: this.activeUser.username,
                    latitude: this.inputLoc.lat,
                    longitude: this.inputLoc.long,
                    radius: this.inputLoc.rad
                },
                key: ['ID']
            });
            this.inputLoc.lat = ''
            this.inputLoc.long = ''
            this.inputLoc.rad = ''
            await this.getUserLoc(this.activeUser)
            let allowed = ''
            this.userLocs.forEach((element, index) => {
                allowed += `${element.longitude}:${element.latitude}:${element.radius}`
                if(index < this.userLocs.length - 1){
                    allowed += ','
                }
            });
            await this.$api.savedata({
                table_name: 'spott_config_view',
                fields: {
                    username: this.activeUser.username,
                    allowedLocations: allowed
                },
                key: ['username']
            })
        },
        async deleteLoc(data){
            const alert = await alertController.create({
                header: 'Alert!',
                message: 'Are you sure you want to delete this location?',
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
                            const res = await this.$api.deletedata({
                                table_name: 'allowed_locations',
                                filters: { ID: data.ID },
                                key: ['ID']
                            })
                            if(res.result){
                                await this.getUserLoc(data)
                                return this.showAlert({header: 'Success!', message: 'Location deleted successfully'})
                            }else{
                                console.log(res)
                                return this.showAlert({header: 'Error!', message: 'Failed to delete location'})
                            }
                        },
                    },
                ],
            });
            await alert.present();
        },

        uploadModal(){
            const btn = document.getElementById('upload-modal');
            if (btn) {
                btn.click();
            }
        },
        closeModal(){
            const modals = ['modal1', 'modal2', 'modal3'];
            modals.forEach(modal => {
                this.$refs[modal].$el.dismiss();
            });
           
            this.$forceUpdate()
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
    padding: 2px; 
    font-size: 1em;
    text-align: center;
}
.myTable tbody tr{
    color: black;
    border-bottom: 1px solid #353535;
}
.myTable tbody tr td{
    padding: 5px; 
    font-size: .8em;
}
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
</style>