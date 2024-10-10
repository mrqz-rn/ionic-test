import axios from 'axios';
import { CapacitorHttp } from '@capacitor/core';

// TEST
// const API_URL = 'http://192.168.86.1/api/spott'; // localhost
// const DB_NAME = 'spottdb';
// const SWFS_URL = 'http://192.168.86.1/swfs-api/';

// LIVE OUTSIDE
const API_URL = 'http://112.199.74.59:286/api/spott';
const DB_NAME = 'spottdb';
const SWFS_URL = 'http://112.199.74.59:286/swfs-api/';


// const API_URL = 'http://192.168.0.113/api/spott'; // localhost
// const API_URL = 'http://112.199.74.59:286/testapi/spott';
// const API_URL = 'https://ronmarquez.serv00.net/api/spott';
// const DB_NAME = 'm10857_spottdb';


const MyApi = {
    install(app) {
        app.config.globalProperties.$api = {
            login: async (userData) => {
              const options = {
                url:`${API_URL}/employee/login`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: userData.username,
                  password: (userData.password),
                  model: userData.model
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
                // console.log(response);
              } catch (error) {
                console.error('Error fetching user:', error);
                return error;
              }
            },
            register: async (userData) => {
              const options = {
                url:`${API_URL}/employee/registerdevice`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: userData.username,
                  model: userData.model
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            saveattlogs: async (userData) => {
              const options = {
                url:`${API_URL}/timekeeping/saveattlogs`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  trxdatedb : userData.trxdatedb,
                  username : userData.username,
                  trxdate : userData.trxdate ,
                  trxtime : userData.trxtime ,
                  trxmode : userData.trxmode , 
                  timestamp : userData.timestamp , 
                  longitude : userData.longitude , 
                  latitude : userData.latitude , 
                  platform : userData.platform , 
                  picture : userData.picture ,
                  fileName: userData.fileName ,
                  pathName: userData.pathName ,
                  remark : userData.remark , 
                  upload_status : userData.upload_status , 
                  uploaded_on : userData.uploaded_on , 
                  datetime : userData.datetime , 
                  FBTYPE : userData.FBTYPE , 
                  FPLCCD : userData.FPLCCD , 
                  PCCD : userData.PCCD , 
                  FPID : userData.FPID ,
                  isLive : userData.isLive , 
                  withApproval : userData.withApproval , 
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                if(response.status == 500){
                  let result = {
                    status: true,
                    data: userData,
                    message: 'duplicate'
                  }
                  return result
                }else{
                  return response.data;
                }
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            uploadLocation: async (userData) => {
              const options = {
                url:`${API_URL}/timekeeping/uploadlocation`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: userData.username,
                  longitude: userData.longitude,
                  latitude: userData.latitude
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Duplicate record:', error);
                return error;
              }
            },
            getattlogs: async (userData) => {
              const options = {
                url:`${API_URL}/timekeeping/getattlogs`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: userData.username,
                  dateFrom: '',
                  dateTo: '',
                  isLive: userData.isLive
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            getrptattlogs: async (userData) => {
              const options = {
                url:`${API_URL}/timekeeping/rptattlogs`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  dateFrom: userData.dateFrom,
                  dateTo: userData.dateTo,
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            getattlogrpt: async (userData) => {
              const options = {
                url:`${API_URL}/timekeeping/getdtrreport`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  dept: userData.dept,
                  comp: userData.comp,
                  dateFrom: userData.dateFrom,
                  dateTo: userData.dateTo,
                  isLive: userData.isLive
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            getpayperiod: async (userData) => {
              const options = {
                url:`${API_URL}/timekeeping/getpayperiod`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: userData.username
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            saveremark: async (userData) => {
              const options = {
                url:`${API_URL}/timekeeping/saveremarks`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: userData.username,
                  remark: userData.remark,
                  trxdate: userData.trxdate,
                  trxtime: userData.trxtime,
                  isLive: userData.isLive
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            changepass: async (userData) => {
              const options = {
                url:`${API_URL}/employee/changepass`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: userData.username,
                  newPassword: userData.newPassword
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            addressapi: async (userData) => {

               let url = `https://nominatim.openstreetmap.org/reverse?lat=${userData.latitude}&lon=${userData.longitude}&format=json`;
              const options = {
                url:`${url}`,
                
              }
              
              try {
                const response = await CapacitorHttp.request(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            checktrx: async (userData) => {
              const options = {
                url:`${API_URL}/timekeeping/checktrx`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: userData.username,
                  trxdate: userData.trxdate,
                  trxtime: userData.trxtime,
                  trxmode: userData.trxmode,
                  isLive: userData.isLive
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
                // console.log(response);
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            gettime: async (userData) => {
              let link = 'https://worldtimeapi.org/api/timezone/Asia/Manila';
              
              const options = {
                url:`${link}`,
              }
              
              try {
                const response = await CapacitorHttp.get(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            masterselect: async (userData) => {
              const options = {
                url:`${SWFS_URL}/masterdata/masterselect`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {
                  table_name: `${DB_NAME}.${userData.table_name}`,
                }
              }
              if(userData.having){
                options.data.having = JSON.stringify(userData.having)
              }
              if(userData.fields){
                options.data.fields = JSON.stringify(userData.fields)
              }
              options.data = new URLSearchParams(options.data).toString()
   
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            savedata: async (userData) => {
              const options = {
                url:`${API_URL}/masterdata/savedata`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  tableName: `${DB_NAME}.${userData.table_name}`,
                  fields: JSON.stringify(userData.fields),
                  key: JSON.stringify(userData.key)
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            deletedata: async (userData) => {
              const options = {
                url:`${API_URL}/masterdata/masterdelete`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  table_name: `${DB_NAME}.${userData.table_name}`,
                  filters: JSON.stringify(userData.filters),
                  key: JSON.stringify(userData.key)
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            deleteattlogs: async (userData) => {
              const options = {
                url:`${API_URL}/timekeeping/cleanAttlogs`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  data: ''
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            checklogin: async (userData) => {
              const options = {
                url:`${API_URL}/employee/checklogin`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: userData.username
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            getappconfig: async (userData) => {
              const options = {
                url:`${API_URL}/employee/getappconfig`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: ''
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            uploadlog: async (userData) => {
              const options = {
                url:`${API_URL}/timekeeping/uploadtimelog`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: userData.username,
                  trxdatedb: userData.trxdatedb,
                  trxtime: userData.trxtime,
                  longitude: userData.longitude,
                  latitude: userData.latitude
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            swfslogin: async (userData) => {
              const options = {
                url:`${SWFS_URL}/admin/login`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  username: '181-1',
                  password: '6c8d32823498c08cc27ab49875fbfa7b'
                }).toString()
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            },
            fileUpload: async (userData) => {
              const formData = new FormData();
              formData.append('TOKEN', userData.TOKEN);
              formData.append('path_folder', userData.path_folder);
              formData.append('max_size', userData.max_size);
              formData.append('docs', userData.docs, `photo_${Date.now()}.jpeg`);  // Provide a filename


              const options = {
                url:`http://localhost/swfs-api/employee/fileUpload`,
                headers: { },
                data: formData,
              
              }
              
              try {
                const response = await CapacitorHttp.post(options);
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
            }
      }
    }
};

export default MyApi;



