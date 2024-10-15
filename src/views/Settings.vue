<template>
    <ion-page>
        <ion-content class="pa-4">
            <ion-card class=" pb-3 ma-3" color="dark"  style="border-radius: 25px; padding: 3vh;">
              <div class="d-flex pb-2">
                  <ion-icon :icon="camera" size="large" style="scale: 1.2 !important; width: 60px;" class="py-2"/>
                  <ion-label class="px-3 align-self-center" style="font-size: 3vh; font-weight: 600;">ImageCapture: {{ user_info.imageCapture_desc }}</ion-label>
                </div>
                <div class="d-flex pb-2">
                  <ion-icon :icon="location" size="large" style="scale: 1.2 !important; width: 60px;" class="py-2"/>
                  <ion-label class="px-2 align-self-center" style="font-size: 3vh; font-weight: 600;">GeoFencing: {{ user_info.geoFenceMode_desc }}</ion-label>
                </div>
               
                <div >
                  <ion-button @click="startCalibrate()" v-if="calibrate.length < 3" :disabled="user_info.calibrateStatus == '1' && user_info.isReachedMaxLocation == '0' ? false : true"
                  expand="full" class="main pt-2" shape="round" size="large" 
                  style="min-height: 2vh !important; height: 8vh; color: white; font-weight: 600; font-size: 3vh;">CALIBRATE</ion-button>
                  <ion-button @click="uploadLocation()" v-else
                  expand="full" class="main pt-2" shape="round" size="large" style="color: white; font-weight: 600;">UPLOAD LOCATION</ion-button>
                </div>
                <h4 class="d-flex justify-center pt-1" style="font-size: 2.2vh;">Max Location: {{ user_info.noOfLocations }}</h4>
              </ion-card>
            <h4 class="px-4" style="font-size: 2.7vh;">Configured Locations({{ Locations.length }}):</h4>
            <ion-list  class="mx-3" style="height: 40vh; overflow-y: auto;">
              <ion-item v-for="(loc, key) in Locations" :key="key"> 
                <div class="d-block">
                  <ion-label style="font-size: 2.2vh;">{{ address[key] ? address[key].display_name : 'Searching Address....' }}</ion-label>
                  <div class="d-flex ">
                    <h5 class="pe-5" style="font-size: 1.9vh;">Lat: {{ loc.lat }}</h5>
                    <h5 style="font-size: 1.9vh;">Long: {{ loc.long }}</h5>
                  </div>
                </div>
              </ion-item>
          
            </ion-list>
            <div style="position: absolute; bottom: 0px; left: 0px; transform: translate(0%, 0%); width:100%;">
              <ion-button @click="logout()" expand="full" class="main pa-3 pb-4" shape="round"  style="color: white; font-weight: 600;">Log Out</ion-button>
            </div>
            
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent,IonList, IonItem, IonLabel, IonButton, IonIcon,IonCard,
  alertController,loadingController } from '@ionic/vue';
import { camera, location, book} from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';


export default {
  components: { IonPage,IonContent,IonList, IonItem, IonLabel, IonButton, IonIcon,IonCard,alertController,loadingController },
  data(){
    return{
      camera, location,book ,
      calibrate: [],
      busy: false,
      app_config:{},
      session_user:{},
      user_info:{},
      allowedLocations:[],
      address: [],
    }
  },
  async created(){
    this.session_user = await this.$storage.getItem('session-user');
    this.user_info = await this.$storage.getItem('session-userinfo');
    this.app_config = await this.$storage.getItem('app-config');
    this.allowedLocations = this.user_info.allowedLocations ? this.user_info.allowedLocations.split(",") : [];
    setInterval(async () => {
      await this.checkPageStatus()
    }, 1000);
    setTimeout(async () => {
      await this.fetchAddress()
    }, 3500);
  
  },
  computed: {
    Locations() {
      return this.allowedLocations.map(e => {
        const [long, lat, radius] = e.split(":");
        return { long, lat, radius };
      });
    },
  },
  methods: {
    async fetchAddress() {
      this.address = await Promise.all(this.Locations.map(e => this.$api.addressapi({ latitude: e.lat, longitude: e.long })  ));
      // console.log(this.address)
      this.$forceUpdate();
    },
    async startCalibrate(){
      const alert = await alertController.create({
        header: 'Confirm',
        message: 'Internet and location access are required for calibration. Would you like to proceed?',
        buttons: [ 
          { text: 'No', role: 'cancel', handler: () => { console.log('Alert canceled') } },
          { text: 'Yes', role: 'confirm', handler: () => { this.getCalibrate() } },
      ],
      });
      await alert.present();
    },
    async getCalibrate(){
      const network = await Network.getStatus();
      const loading = await loadingController.create({ message: 'Calibrating...', translucent: true });
      await loading.present();
      if(this.user_info.isReachedMaxLocation == '1'){
        await loading.dismiss();
        return this.showAlert({header: 'Warning', message: 'You have reached maximum allowed locations.', buttons: ['Okay'], })
      }
      if(network.connectionType == 'none'){
        await loading.dismiss();
        return this.showAlert({header: 'Warning!', message: 'Please connect to internet.', buttons: ['Okay'], })
      }
      let loc = {}
      try {
        loc = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,  
          timeout: 10000,            
          maximumAge: Infinity
        });
      } catch (error) {
        await loading.dismiss();
        this.showAlert({header: 'Warning', message: 'Please enable device location.', buttons: ['Okay'], })
        return
      }

      const coords = async () => {
        const coords = await this.getLocation();
        return coords
      }
      do {
        this.calibrate.push(await coords());
      } while (this.calibrate.length < 8);

      this.$forceUpdate()
      await loading.dismiss();
      if(this.calibrate.length == 8){
        this.showAlert({header: 'Success', message: 'Location captured successfully. Please proceed to uploading.', buttons: ['Okay'], })
      }

    },
    async getLocation() {
      const loc = await Geolocation.checkPermissions();
      if (loc.location != 'granted') return { status: false, err: 1 };
      const { coords } = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: Infinity
      });
      return { status: true, coordinates: { latitude: coords.latitude, longitude: coords.longitude } };
    },

    async uploadLocation() {
      const loading = await loadingController.create({ message: 'Uploading location...', translucent: true });
      await loading.present();

      let long = 0;
      let lat = 0;
      this.calibrate.forEach(e => {
        const { longitude, latitude } = e.coordinates;
        long += parseFloat(longitude);
        lat += parseFloat(latitude);
      });

      const data = {
        username: this.user_info.username,
        longitude: (long / 8).toFixed(4),
        latitude: (lat / 8).toFixed(4)
      };

      if (this.Locations.some(e => e.lat == data.latitude && e.long == data.longitude)) {
        await loading.dismiss();
        return this.showAlert({header: 'Warning', message: 'Location already exists.', buttons: ['Okay'], })
      }

      try {
        const res = await this.$api.uploadLocation(data);
        if (res.status) {
          this.user_info = res.userinfo;
          await this.$storage.setItem('session-userinfo', res.userinfo);
          this.allowedLocations = this.user_info.allowedLocations.split(",");
          this.calibrate = [];
          this.$forceUpdate()
          await loading.dismiss();
          this.showAlert({header: 'Success', message: 'Location uploaded successfully.', buttons: ['Okay'], })
          this.$storage.setItem('newLoc', ({status: true}));
          setTimeout(() => {
            this.$router.go()
          }, 250);
        } else {
          await loading.dismiss();
          this.showAlert({header: 'Warning', message: 'Something went wrong. Please try again.', buttons: ['Okay'], })
        }
      } catch (error) {
        await loading.dismiss();
        this.showAlert({header: 'Warning', message: 'Cannot connect to server. Please check your internet connection.', buttons: ['Okay'], })
      }
    },
    async logout() {
      let attlogs = await this.$storage.getItem('session-attlogs');
      attlogs = attlogs.filter(n => n)
      const hasUnuploaded = attlogs.some(log => log.upload_status == '0');
      if(hasUnuploaded){
        this.showAlert({header: 'Warning!', message: 'Please transfer your logs first before logging out. Thank you.', buttons: ['Okay'], })
        return
      }
      const alert = await alertController.create({
        header: hasUnuploaded ? 'Warning!' : 'Confirm',
        message: hasUnuploaded ? 'You have unuploaded logs. Are you sure you want to logout?' : 'Are you sure you want to logout?',
        buttons: [
          { text: 'No', role: 'cancel' },
          { text: 'Yes', role: 'confirm', handler: async () => {
            await this.$storage.removeItem('session-attlogs');
            await this.$storage.removeItem('session-userinfo');
            await this.$storage.removeItem('session-user');
            
            setTimeout(() => {
              this.$router.push('login').then(() => { window.location.reload() });
            }, 250);
          } },
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
    async checkPageStatus(){
      const log = await this.$storage.getItem('logout');
      if (this.$route.name === 'login') {
        await this.$storage.setItem('logout', { status: true });
        await this.$storage.setItem('relogin', { status: true });
      }
      if (log && this.$route.name === 'settings') {
        this.session_user = await this.$storage.getItem('session-user');
        this.user_info = await this.$storage.getItem('session-userinfo');
        this.app_config = await this.$storage.getItem('app-config');
        this.allowedLocations = (this.user_info.allowedLocations || '').split(',');
        await this.$storage.removeItem('logout');
        this.$forceUpdate();
      }
    },
  }

}
</script>