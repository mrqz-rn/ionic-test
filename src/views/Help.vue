<template>
 <div>
    <ion-card class="pa-4 ma-8">
        <ion-input class="mb-2" v-model="userinfo.username" placeholder="Username" fill="outline" label-placement="stacked" ></ion-input>
        <ion-input class="mb-2" v-model="userinfo.password" placeholder="Username" fill="outline" label-placement="stacked" ></ion-input>
        <ion-button @click="checkLogin()" color="primary" expand="full">Login</ion-button>
    </ion-card>
    <ion-button class="pa-6" color="primary" @click="pushFirebase()">Push</ion-button>
    <ion-button @click="getFirebase()">Get</ion-button>
    <div class="d-block">
        <ion-button @click="startTask()">Start</ion-button>
        <ion-button @click="stopTask()">Stop</ion-button>

    </div>
 </div>
</template>

<script>
// import { FirebaseStorage } from '@capacitor-firebase/storage';
// import { Filesystem, Directory } from '@capacitor/filesystem';
import { db } from "@/firebaseConfig";
import { getDatabase, ref, set, get,child   } from "firebase/database";
import axios from 'axios';
import MD5 from 'md5';


// import { startBackgroundTask, stopBackgroundTask } from '@/backgroundRunner.js';

import { IonPage,IonContent, IonImg,IonButton,IonInput,IonCard } from '@ionic/vue';
export default {
    components:{
        IonPage,IonContent,IonImg,IonButton,IonInput,IonCard
    },
    data(){
        return{
            userinfo: {
                username: '23004850',
                name: '',
                password: '07312023',
                updateConfig: 0,
                forceLogout: 0,
                status: 1,
                
            },
            image: ""
        }
    },

    async created(){
        const data = await axios.get('https://ronmarquez.serv00.net/api/spott/test/isconn')
        console.log(data);


    },





    methods:{
        async startTask() {
        await startBackgroundTask();
        },
        async stopTask() {
        await stopBackgroundTask();
        },
        TimeStamp(){
           let newDate = new Date().toLocaleDateString('en-CA')
        //    let split = newDate.split('/')
        //    let formatDate = split[2]+'-'+split[0]+'-'+split[1]
           let time = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
           let timestamp = newDate + ' ' + time
           return timestamp
        },
        async pushFirebase(){
            const path = 'attlogs/' + this.userinfo.username + '/' + this.TimeStamp();
            const db = getDatabase();

            try {
                await set(ref(db, path), {
                    trxdate: '2022-01-01',
                    trxtime: '00:00:00',
                    trxmode: 0,
                    timestamp: '2022-01-01 00:00:00',
                    longitude: 0,
                    latitude: 0,
                    platform: 0,
                    picture: this.image,
                    remarl: '',
                    upload_status: 1,
                    uploaded_on: new Date()
                });
            } catch (error) {
                console.log(error);
            }
          


            // await set(ref(db, path), {
            //     longitude: 0,
            //     latitude: 0,
            //     radius: 0
            // });
            // await set(ref(db, path), {
            //     geoFenceMode: 1,
            //     noOfLocations: 1,
            //     imageCapture: 1,
            //     calibrateStatus: 1,
            //     updateConfig: 0,
            //     forceLogout: 0
            // });


            // await set(ref(db, path), {
            //     username: this.userinfo.username,
            //     name: this.userinfo.name,
            //     password: this.userinfo.password,
            //     updateConfig: this.userinfo.updateConfig,
            //     forceLogout: this.userinfo.forceLogout,
            //     status: this.userinfo.status
            // });

            // const itemsRef = dbRef(db, "users/" + this.userinfo.employeeNo);
            // await push(itemsRef, {
            //   name: this.userinfo.name,
            // });
        },

        async checkLogin(){
            const userId = this.userinfo.username;
            const dbRef = ref(getDatabase());
            try {
                const data = await get(child(dbRef, `users/${userId}`));
                if(data.exists()){
                    let user = data.val();
                    console.log(user);
                    if(MD5(this.userinfo.password) == user.password){
                        const config = await get(child(dbRef, `user_config/${userId}`));
                        console.log(config.val());
                        const locs = await get(child(dbRef, `locations/${userId}`));
                        console.log(locs.val().length );
                        const logs = await get(child(dbRef, `attlogs/${userId}`));
                        console.log(logs.val());
                        let log_arr = logs.val();
                        for (const key in log_arr) {
                            console.log(log_arr[key]);
                        }


                    }else{
                        alert('Password not matched');
                    }
                }else{
                    console.log("No data available");
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getFirebase(){
            const userId = this.userinfo.username;
            const dbRef = ref(getDatabase());
            try {
                const data = await get(child(dbRef, `users/${userId}`));
                if(data.exists()){
                    let fetch = data.val();
                    console.log(fetch);
                    if(this.userinfo.password == fetch.password){
                        console.log("Matched");
                    }
                    if(fetch){
                        const config = await get(child(dbRef, `user_config/${userId}`));
                        console.log(config.val());
                    }

                }else{
                    console.log("No data available");
                }
            } catch (error) {
                console.log(error);
            }
           

       
        }
    }
}
</script>