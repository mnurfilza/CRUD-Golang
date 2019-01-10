/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-ajax/iron-ajax.js';   
import'@polymer/paper-button/paper-button.js';


class MyNilaiCard extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background:#fff;
        }
      
        .header{
          background-color:#34637B;
          color: #fff;
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .content{
          padding:3%;
        }
       .submit:hover{
         background-color:#049a3c;
         color: white;
       }
       .submit{
         margin-top: 1%;
         background-color:#34637B;
         color: white;
       }
      </style>

      <iron-ajax
        id="ajax"
        handle-as="json"
        on-response="handleResponse"
        on-error="errorResponses">
      </iron-ajax>

        <iron-media-query 
        query="(min-width:600px)" 
        query-matches="{}">
        </iron-media-query>

        <app-header-layout has-scrolling-region="" style="width:100%; height:100vh;">
        <app-header class="header" slot="header" fixed effects="waterfall">
            <app-toolbar>
              <paper-icon-button  on-tap="close" icon="icons:close" style="right:3px;"drawer-toggle=""></paper-icon-button>
              <div main-title="">My Nilai</div>
              <div>
              <paper-icon-button on-tap="delete" icon="icons:delete" style="right:3px; drawer-toggle=""></paper-icon-button>
              <paper-icon-button on-tap="add" icon="icons:add-circle" drawer-toggle=""></paper-icon-button>
              </div>
            </app-toolbar>
          </app-header>
        <div class="content">
        <paper-input id="idNilai" on-change="_change" label="IdNilai" readonly></paper-input>
        <paper-input id="kd_mk" on-change="_change" label="KodeMatakuliah" ></paper-input>
        <paper-input id="npm" on-change="_change" label="NPM" ></paper-input> 
        <paper-input id="uts" on-change="_change" label="UTS" ></paper-input> 
        <paper-input id="uas" on-change="_change" label="UAS" ></paper-input>  

        <paper-button raised  on-tap="_submit" class="submit"><iron-icon icon="send"></iron-icon>Submit</paper-button>
      </div> 
        </app-header-layout>

    
    `;
  }

  static get properties() {
    return {
        mahasiswa:{
          type: Object,
          // notify: true,
          value:{
            npm:"",
            nama:"",
            kelas:"",
          }

        },
        data:Object,
        url:String,
        headerID:String,
        route:{
          type:Object,
          observer:'_reload'
        },
      //   mhs:{
      //     type: Object,
      //     value:[
      //       {
      //       npm :"1711444",
      //       nama:"Filza",
      //       kelas :"2ka35"
      //     },{
      //       npm :"17114545",
      //       nama:"andoyo",
      //       kelas :"2ka35"
      //     },{
      //       npm :"1711333",
      //       nama:"airlo",
      //       kelas :"2ka35"
      //     },{
      //       npm :"171122",
      //       nama:"airio",
      //       kelas :"2ka35"
      //     },{
      //       npm :"1711223",
      //       nama:"airiola",
      //       kelas :"2ka35"
      //     }
      //   ]    
      // }
    };
  }
  _reload(e){
    this.url = e.path;
    console.log(e.path);
    let path = e.path;
    let data = path.split('/')
    console.log(data);
    if (data[1] !== 'nilai-card') {
      return;
    }
    if (data[2]) {
     this.headerID=data[2];
     if (data[2] === '0') {
      this.$.npm.setAttribute('readonly',true);
      this.$.npm.removeAttribute('readonly');
       this.$.idNilai.value ='';
       this.$.kd_mk.value ='';
       this.$.npm.value ='';
       this.$.uts.value ='';
       this.$.uas.value ='';
       return;
     } 
     let urlNilai = '/api/ss/nilai/' + data[2];
     console.log(urlNilai);
     this.$.ajax.url=urlNilai;
     this.$.ajax.method = 'GET';
     this.$.ajax.generateRequest();
    }
    // this.$.ajax.generateRequest();
  }

  add(){
    window.history.pushState({}, null, '#/nilai-card/0');
    window.dispatchEvent(new CustomEvent('location-changed'));  
    
  }

  delete(){
    this.$.ajax.url = '/api/ss/nilai/' + this.headerID;
    this.$.ajax.method = 'Delete';
    this.$.ajax.generateRequest()
    window.history.pushState({}, null, '#/nilai-card/0');
    window.dispatchEvent(new CustomEvent('location-changed'));  
  }

  close(){
    console.log("close")
    window.history.pushState({}, null, '#/nilai-list');
    window.dispatchEvent(new CustomEvent('location-changed'));  
    
  }

  _submit(){
    let iDNilai = this.$.idNilai.value;
    let kd_mk = this.$.kd_mk.value;
    let npm = this.$.npm.value;
    let uts = this.$.uts.value;
    let uas = this.$.uas.value;

    let url = '/api/ss/nilai';
    let data = this.data
    if (this.headerID === '0' || typeof this.headerID === 'undefined') {
      data = {
        kd_mk : kd_mk,
        npm: npm,
        uts: parseFloat(uts),
        uas: parseFloat(uas),
     }
     this.$.ajax.method = 'POST';
     this.$.kd_mk.value = '';
     this.$.npm.value ='';
     this.$.uts.value ='';
     this.$.uas.value ='';
    }else{
      data ={
        kd_mk : kd_mk,
        npm: npm,
        uts: parseFloat(uts),
        uas: parseFloat(uas),
      }
      this.$.ajax.method = 'PUT';
      url += '/' + iDNilai;
    }
    this.$.ajax.url = url;
    let json = JSON.stringify(data);
    this.$.ajax.body = json;
    this.$.ajax.generateRequest();
   
  }

//  _change(e){
//   let key = e.srcElement.id;
//   this.mhs[key]= e.srcElement.value;
//  }
//  _index(index){
//   var a = parseInt(index+1);
//   return a
//  }
//   _confirmClick(e){

//     if (e.detail.value) {
//       var mahasiswa = e.detail.value;
//       this.$.npm.value = mahasiswa.npm;
//       this.$.nama.value = mahasiswa.nama;
//       this.$.kelas.value = mahasiswa.kelas; 
//     }
//   }

    handleResponse(e){
    console.log(e.detail.response);
    let data = e.detail.response;
    if (!data) {
      return;
    }
    this.$.npm.setAttribute('readonly',true);
    this.$.idNilai.value = data.idnilai;
    this.$.kd_mk.value = data.kd_mk;
    this.$.npm.value = data.npm;
    this.$.uts.value = data.uts;
    this.$.uas.value = data.uas;
    }

  errorResponses(e){
  let myApp = document.querySelector('my-app');
  let toast = myApp.shadowRoot.querySelector('#toast');
  let message = e.detail.error;
  toast.setAttribute('text',message);
  toast.open();
  console.log(e)
  }
}

 

 window.customElements.define('my-nilai-card', MyNilaiCard);