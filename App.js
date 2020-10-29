import React, {Component} from 'react';  
import {Platform, StyleSheet, Button, View} from 'react-native';    
import {NativeModules} from 'react-native';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk'
import axios from 'axios';
axios.defaults.timeout = 5000;

var testUrl = "https://test.cashfree.com/api/v2/cftoken/order";
var prodUrl = "https://api.cashfree.com/api/v2/cftoken/order";

export default class App extends Component {
   
  _showToast(mode) {
   console.log('RNPgReactNativeSDK',RNPgReactNativeSDK);
    axios.interceptors.request.use(config => {
  console.log('Request was sent');

  return config;
}, error => {
  // handle the error
  return Promise.reject(error);
});

  axios.interceptors.response.use((response) => {
  // do something with the response data
  console.log('Response was received');

  return response;
}, error => {
  // handle the response error
  return Promise.reject(error);
});


    console.log("CF::SDK::",testUrl);
    console.log("CF::SDK::",JSON.stringify(options));
    const options = {
        headers: {
                 Accept: 'application/json',
                  'Content-Type': 'application/json',
                 'x-client-id':'your client id',
                 'x-client-secret': 'your client secret'
                         }
   };
   var orderIdValue = "Order" + Math.floor(Math.random() * 100000) + 1;
   axios.post(testUrl, {orderId: orderIdValue,
                                     orderAmount : 1,
                                     orderCurrency :'INR' }, options)
   .then(response => {
         if (response.data.status) {
           console.log("CF::SDK::",response.data.cftoken);
    /*       var map ={"appId":"1831dac3fd47d13be98b7fd11381",
                                   "orderId":orderIdValue,
                                   "orderAmount":"1",
                                   "orderNote":"Cashfree Test",
                                   "customerName":"Cashfree",
                                   "customerPhone":"9481758674",
                                    "customerEmail":"arjun@cashfree.com",
                                     "notifyUrl":"https://www.yourendpoint.com/",
                                      "orderCurrency":"INR"
                               }*/
              if(mode=='UPI'){
              RNPgReactNativeSDK.startPaymentUPI(map,response.data.cftoken,'Test');
              console.log(response);
              } 
              else if (mode=='GPAY') {
                   RNPgReactNativeSDK.startPaymentGPAY(map,response.data.cftoken,'Test');
                   console.log(response);
              }
              else if (mode=='Phonepe') {
              RNPgReactNativeSDK.startPaymentPhonePe(map,response.data.cftoken,'Test');
              console.log(response);
              }
              else if (mode=='Amazon') {
              RNPgReactNativeSDK.startPaymentAmazon(map,response.data.cftoken,'Test');
              console.log(response);
              }
              else if(mode=='WEB') {
             var mapNew ={"appId":"1441962cac3b3f7f4ab018ba791441",
                                   "orderId":orderIdValue,
                                   "orderAmount":"1",
                                   "orderNote":"Cashfree Test",
                                   "customerName":"Cashfree",
                                   "customerPhone":"9094395340",
                                    "customerEmail":"arjun@cashfree.com",
                                     "notifyUrl":"https://www.yourendpoint.com/",
                                      "orderCurrency":"INR",
                              
                                      "tokenData":response.data.cftoken
                               }

             RNPgReactNativeSDK.startPaymentWEB(mapNew,'Test',(someData) => {
                                          console.log("FROM React_Native",someData);
                                        });
               console.log(response);
              }
       }}).catch(error => {console.log(error)});
      
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Button onPress={()=>this._showToast('WEB')} title="WEB" />
      </View>

    );
  }
}


