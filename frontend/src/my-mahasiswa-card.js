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


class MyMahasiswaCard extends PolymerElement {
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
        <paper-input id="npm" on-change="_change" label="NPM" ></paper-input>
        <paper-input id="nama" on-change="_change" label="Nama" ></paper-input>
        <paper-input id="kelas" on-change="_change" label="Kelas" ></paper-input>
        <paper-button raised  on-tap="_submit" class="submit"><iron-icon icon="send"></iron-icon>Submit</paper-button>
      </div>
        </app-header-layout>
        <template is="dom-if" if="{{dekstop}}">

        <iron-list items="[[data]]" as="item" on-selected-item-changed="" selection-enabled class="vertical">
        <template>
        <div>
        <paper-item class="horizontal">
          <a class="anchor" href ="#/nilai-card/[[item.idnilai]]" style="width: 150vh" tabindex="-1">
          <paper-item class="kartu horizontal" npm$="[[item.idnilai]]">
          <div style="width: 4%; margin-left: 5%;"> [[_index(index)]] </div>
          <div style="width: 10%; margin-left: 5%;"> [[item.npm]] </div>
          <div style="width: 10%; margin-left: 5%;"> [[item.kd_mk]] </div>
          <div style="width: 10%; margin-left: 5%;"> [[item.uts]] </div>
          <div style="width: 10%; margin-left: 5%;"> [[item.uas]] </div>
          <div style="width: 10%; margin-left: 5%;" label$="[[_total(item.uas, item.uts)]]"> [[_total(item.uas, item.uts)]] </div>
          <div style="width: 10%; padding-left: 5%;" label$="[[_inisial(item.uas, item.uts)]]"> [[_inisial(item.uas, item.uts)]] </div>
        </paper-item>
        </a>
        <paper-checkbox  id="checked[[item.idNilai]]" style = "display:none;"></paper-checkbox>
        </paper-item>
        </div>
        </template>
        </iron-list>
        </app-header-layout>
        </template>


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
        url: String,
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
    let data = path.split('/');
    console.log(data);
    if (data[1] !== 'mahasiswa-card') {
      return;
    }
    if (data[2]) {
      this.headerID=data[2];
      if (data[2] === '0' ) {
       this.$.npm.setAttribute('readonly',true);
       this.$.npm.removeAttribute('readonly');
       this.$.npm.value ='';
       this.$.nama.value ='';
       this.$.kelas.value ='';
       return;
      }

      let urlMahasiswa = '/api/ss/mahasiswa/' + data[2];
      this.$.ajax.url = urlMahasiswa;
      this.$.ajax.method = 'GET';
      this.$.ajax.generateRequest();
    }
  }

  add(){
    window.history.pushState({}, null, '#/mahasiswa-card/0');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  delete(){
    this.$.ajax.url = '/api/ss/mahasiswa/' + this.headerID;
    this.$.ajax.method = 'Delete';
    this.$.ajax.generateRequest()
    window.history.pushState({}, null, '#/mahasiswa-card/0');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  close(){
    console.log("close")
    window.history.pushState({}, null, '#/mahasiswa-list');
    window.dispatchEvent(new CustomEvent('location-changed'));

  }

  _submit(){
   let npm = this.$.npm.value;
   let nama = this.$.nama.value;
   let kelas = this.$.kelas.value;

   let url = '/api/ss/mahasiswa';
   let data = this.data;
   console.log(data);
   if (this.headerID === '0'|| typeof this.headerID === 'undefined'){
     data = {
       npm:npm,
       nama:nama,
       kelas:kelas,
     }
     this.$.ajax.method ='POST';
     this.$.npm.value ='';
     this.$.nama.value ='';
     this.$.kelas.value ='';
   }else{
     data = {
       npm: npm,
       nama: nama,
       kelas: kelas,
     }
     this.$.ajax.method = 'PUT';
     url += '/' + npm;
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
   let data = e.detail.response;
   console.log(data);
   if (!data) {
     return;
   }
   this.$.npm.setAttribute('readonly',true);
   this.$.npm.value = data.npm;
   this.$.nama.value = data.nama;
   this.$.kelas.value = data.kelas;
  }

  errorResponses(e){
  let myApp = document.querySelector('my-app');
  let toast = myApp.shadowRoot.querySelector('#toast');
  let message = e.detail.error
  toast.setAttribute('text',message);
  toast.open();
  }

}



 window.customElements.define('my-mahasiswa-card', MyMahasiswaCard);
