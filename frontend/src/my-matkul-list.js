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
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icons/iron-icons.js';


class MyMatkulList extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

        }
    
        .vertical{
          @apply --layout-vertical;
        }
        .horizontal{
          @apply --layout-horizontal;
        }
        .flexchild{
          @apply --layout-flex;
        }
        .main-range{
          margin-left: 10px;
        }
        paper-fab[label="A"]{
          --paper-fab-background: blue;
        }
        paper-icon-item[label="B"]{
          --paper-fab-background: green;
        }
        paper-icon-item[label="C"]{
          --paper-fab-background: yellow;
        }
        paper-icon-item[label="D"]{
          --paper-fab-background: yellow;
        }
        paper-button{
          margin-left: 10%; 
          background-color: red; 
          color: white; 
          box-shadow: 0 2px 2px -2px gray;
        }
        paper-button:hover{
          size: 15%;
          transform: 0.3s;
        }
        .bg-icon{
          background-color: blue;
        }
        .circle[label='A']{
          background-color: red;
        }
        
      

      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>View One</h1>


        <iron-ajax
        id="ajax"
        url="/api/ss/matakuliah"
        metod="GET"
        handle-as="json"
        on-response="handleResponse"
        on-error="errorResponses">
        </iron-ajax>


        <iron-media-query query="(min-width:600px)" query-matches="{{dekstop}}"></iron-media-query>


        <template is="dom-if" if="{{dekstop}}">

        <app-header-layout has-scrolling-region="" style="width:100%; height:100vh;">
        <app-header class="header" slot="header" fixed effects="waterfall">
            <app-toolbar> 
              <div main-title="">My Nilai</div>
              <paper-icon-button  id="add" on-tap="add" icon="icons:add-circle" disabled drawer-toggle=""></paper-icon-button>
              <paper-icon-button  id="del" on-tap="_delete" icon="icons:delete" style="display:none;" drawer-toggle=""></paper-icon-button>
              
            </app-toolbar>
            <app-toolbar style="margin-top:35px">
            <div class="horizontal" style="width:100%;">
            <div style="width:4%;">No</div>
            <div style="width: 10%; margin-left: 5%">NPM</div>
            <div style="width: 10%; margin-left: 5%">Nama</div>
            <div style="width: 10%; margin-left: 5%">Kelas</div>
            </div>
            </app-toolbar>
            </app-header>
        <iron-list items="[[data]]" as="item" on-selected-item-changed="" selection-enabled class="vertical">
        <template>
        <div>
        <paper-item class="horizontal">
          <a class="anchor" href ="#/matkul-card/[[item.kd_mk]]" tabindex="-1">
          <paper-item class="kartu horizontal" kd_mk$="[[item.kd_mk]]">
          <div "style="width: 4%;"> [[_index(index)]] </div>
          <div style="width: 20%;"> [[item.kd_mk]] </div>
          <div style="width: 30%; padding:0 5px 0 5px"> [[item.mata_kuliah]] </div>
          <paper-button  raised>Delete</paper-button>
        </paper-item>
        </a>
        <paper-checkbox  id="checked[[item.npm]]" style = "display:none;"></paper-checkbox>
        </paper-item>
        </div>
        </template>
        </iron-list>
        </app-header-layout>
        </template>

        <template is="dom-if" if="{{!dekstop}}">
        <iron-list items="[[data]]" as="item" on-selected-item-changed="" selection-enabled>
        <template>
        <div>
        <a href ="#/matkul-card/[[item.kd_mk]]" tabindex="-1">
          <paper-item class="kartu-mobile horizontal" kd_mk$="[[item.kd_mk]]">
          <div class="vertical main-range">
          <div>No : [[_index(index)]] </div>
          <div>kode-Matakuliah : [[item.kd_mk]] </div>
          <div>Matakuliah : [[item.mata_kuliah]] </div>
          </div>
        </paper-item>
        </a>
        </div>
        </template>
        </iron-list>
        </template>

      </div>
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
        page:{
          type:String,
          observer:'_reload'
        }

      //   data:{
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
      //       nama:"cahyo",
      //       kelas :"2ka35"
      //     },{
      //       npm :"171122",
      //       nama:"dwi",
      //       kelas :"2ka35"
      //     },{
      //       npm :"1711223",
      //       nama:"Airiola",
      //       kelas :"2ka35"
      //     },{
      //       npm :"1711223",
      //       nama:"bayu",
      //       kelas :"2ka35"
      //     }
      //   ]    
      // }
    };
  }

  _reload0(e){
    if (e !== "matkul-list") {
      return
    }
    this.$.ajax.generateRequest();
  }
 
  _change(e){
    let key = e.srcElement.id;
    this.mhs[key]= e.srcElement.value;
  }
  _index(index){
    var a = parseInt(index+1);
    return a
  }
  _inisial(e){
    // var res = e.substr(0,1);
    // var upres = res.toUpperCase();
    console.log(e.charAt(0).toUpperCase())
    return e.substr(0,1).toUpperCase()  ;
  }
   
    handleResponse(e){
      console.log(e.detail.response);
      this.data = e.detail.response;
    }

    errorResponses(e){
      console.log(e);
    }

    
  }

 

 window.customElements.define('my-matkul-list', MyMatkulList);