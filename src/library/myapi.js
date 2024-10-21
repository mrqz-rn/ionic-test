import axios from 'axios';
import { CapacitorHttp } from '@capacitor/core';

// // TEST
// const API_URL = 'http://209.2.5.40/api/spott'; // localhost
// const API_URL = 'http://192.168.86.1/api/spott'; // localhost
// const DB_NAME = 'spottdb';
// const SWFS_URL = 'http://209.2.5.40/swfs-api';

// // LIVE OUTSIDE
const API_URL = 'http://112.199.74.59:286/api/spott';
const DB_NAME = 'spottdb';
const SWFS_URL = 'http://112.199.74.59:286/swfs-api/';

// // LIVE LOCAL
// const API_URL = 'http://202.2.2.89/api/spott';
// const DB_NAME = 'spottdb';
// const SWFS_URL = 'http://202.2.2.89/swfs-api/';

// // TEST LOCAL
// const API_URL = 'http://202.2.2.89/testapi/spott';
// const DB_NAME = 'spottdb';
// const SWFS_URL = 'http://202.2.2.89/swfs-api/';



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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return error
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
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
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(7500)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(5000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
              }
            },
            addressapi: async (userData) => {

               let url = `https://nominatim.openstreetmap.org/reverse?lat=${userData.latitude}&lon=${userData.longitude}&format=json`;
              const options = {
                url:`${url}`,
                
              }
              
              try {
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.get(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(5000)
                ])
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.get(options),
                  timeout(4000)
                ])
                return response.data;
              } catch (error) {
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
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
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(10000)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
              }
            },
            fileUpload: async (userData) => {
              const options = {
                url:`${SWFS_URL}/employee/base64Upload`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                  TOKEN: userData.TOKEN,
                  path_folder: userData.path_folder,
                  max_size: userData.max_size,
                  base64data: userData.base64data,
                  type: 'base64'
                }).toString()
              }
              
              try {
                const timeout = (ms) => new Promise((_, reject) =>
                  setTimeout(() => reject(new Error('Request timed out')), ms)
                );
                const response = await Promise.race([
                  CapacitorHttp.post(options),
                  timeout(7500)
                ])
                return response.data;
              } catch (error) {
                return JSON.stringify(error);
              }
            }
      }
    }
};

export default MyApi;



