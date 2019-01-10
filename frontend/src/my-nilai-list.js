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
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js'; 
import '@polymer/paper-checkbox/paper-checkbox.js';


class MyNilaiList extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        .kartu{
          font-size: 20px;
          box-shadow: 0 2px 2px -2px gray;
          margin-top : 20px;
        }
        .kartu:hover{
          background:grey;
          color:white;
          cursor: pointer;
        }

        .kartu-mobile{
          box-shadow: 0 2px 2px -2px gray;
          font-size: 20px;
          margin-top : 20px;
          margin-left: -15%;
        }
        .kartu-mobile:hover{
          background:black;
          color:white;
          cursor: pointer;
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
        .header{
          background-color:#34637B;
          color: #fff;
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .content{
          
        } 

        a.anchor{
          text-decoration: none;
          color: #757575;
        }
        
        

      </style>
      <iron-ajax
        id="ajax"
        url="/api/ss/nilai"
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
              <paper-icon-button  id="search" on-tap="_search" icon="icons:search"  drawer-toggle=""></paper-icon-button>
              <paper-icon-button  id="add" on-tap="add" icon="icons:add-circle" disabled drawer-toggle=""></paper-icon-button>
              <paper-icon-button  id="del" on-tap="_delete" icon="icons:delete" style="display:none;" drawer-toggle=""></paper-icon-button>
              
            </app-toolbar>



            <app-toolbar>
            <paper-dropdown-menu label="Edit" noink no-animations>
            <paper-listbox slot="dropdown-content" class="dropdown-content" selected="1" >
              <paper-item on-tap="_On">Turn On Editing</paper-item>
              <paper-item on-tap="_close" >Turn Off editing</paper-item>
            </paper-listbox>
           </paper-dropdown-menu>
            </app-toolbar>
            
            <app-toolbar style="margin-top:35px">
            <div class="horizontal" style="width:100%;">
            <div style="width:4%; margin-left: 5%">No</div>
            <div style="width: 10%; margin-left: 5%">NPM</div>
            <div style="width: 10%; margin-left: 5%">Kd_mk</div>
            <div style="width: 15%; padding-left: 3%">UTS</div>
            <div style="width: 15%;">UAS</div>
            <div style="width: 10%;">Total</div>
            <div style="width: 10%; ">Grade</div>
            </div>
            </app-toolbar>

          </app-header>
          
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

        <template is="dom-if" if="{{!dekstop}}">
        <iron-list items="[[data]]" as="item" on-selected-item-changed="" selection-enabled>
        <template>
        <div>
        <a href ="#/nilai-card/[[item.idnilai]]" tabindex="-1">
        <paper-item class="kartu-mobile horizontal margin-range" npm$="[[item.idnilai]]">
        <paper-icon-item >
          <div class="circle" id="grade" label$="[[_inisial(item.uts, item.uas)]]">[[_inisial(item.uts, item.uas)]]</div> 
        </paper-icon-item>
        <div class="vertical ">
          <div> [[item.npm]] </div>
          <div> [[item.kd_mk]] </div>
          <div> [[item.uts]] </div>
          <div> [[item.uas]] </div>
        </paper-item>
        </a>
        </div>
        </template>
        </iron-list>
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

        // data:Object,
        // route:{
        //   type:Object,
        //   observer:'_reload'
        // }

        data:{
          type: Object,
          value:[
            {
            npm :"1711444",
            kd_mk: "PA12",
            kelas :"2ka35",
            uts : 85,
            uas : 75 
          },{
            npm :"17114545",
            kd_mk: "KA12",
            kelas :"2ka35",
            uts : 65,
            uas : 75 
          },{
            npm :"1711333",
            kd_mk: "SA12",
            kelas :"2ka35",
            uts : 55,
            uas : 95 
          },{
            npm :"171122",
            kd_mk: "YA12",
            kelas :"2ka35",
            uts : 75,
            uas : 75 
          },{
            npm :"1711223",
            kd_mk: "EA12",
            kelas :"2ka35",
            uts : 85,
            uas : 75 
          },{
            npm :"1711223",
            kd_mk: "BI12",
            kelas :"2ka35",
            uts : 65,
            uas : 75 
          }
        ]    
      }
    };
  }
  _inisial(uts, uas){
   
    let total = (uts + uas)/2;
    let grade = "";
   
    if (total > 80) {
      grade = "A";
    } else if (total > 70) {
      grade = "B";
    }else if (total > 60) {
      grade ="C";
    }else if (total > 50) {
      grade ="D"
    }else if (total> 40) {
      grade = "E";
    }else{
      grade ="P";
    }
   //  console.log(grade)
    return grade
   }
   _total(uts, uas){
    return (uts + uas)/2;
   }

  _reload(e){
    console.log(e.path);
    // if (e !== "nilai-list") {
    //   return;
    // }
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
  // _inisial(e){
  //   // var res = e.substr(0,1);
  //   // var upres = res.toUpperCase();
  //   console.log(e.charAt(0).toUpperCase())
  //   return e.substr(0,1).toUpperCase()  ;
  // }
   
    handleResponse(e){
      console.log(e.detail.response);
      this.data = e.detail.response;
    }

    errorResponses(e){
      console.log(e);
    }

    add(){
    window.history.pushState({}, null, '#/nilai-card/0');
    window.dispatchEvent(new CustomEvent('location-changed'));
    }


    _On(){
      let b = this.shadowRoot.querySelector('#add');
      let d = this.shadowRoot.querySelector('#del');
      let data = this.data;
      for (let i = 0; i < data.length; i++) {
        let id = 'checked' + this.data[i].npm;
        let check = this.shadowRoot.querySelector('#'+ id );
        check.style.display = 'block'; 
      }
      d.style.display = 'block';
      b.removeAttribute('disabled');
     }
 
     _close(){
       let b = this.shadowRoot.querySelector('#add');
       let d = this.shadowRoot.querySelector('#del');
       // let c = this.shadowRoot.querySelector('#checked')
       d.style.display = 'none';
       // c.style.display = 'none';
       let data = this.data;
       for (let i = 0; i < data.length; i++) {
        let id = 'checked' + this.data[i].npm;
        let check = this.shadowRoot.querySelector('#'+ id );
        check.style.display = 'none'; 
      }
       b.setAttribute('disabled', true);
      }
 
      _delete(){
        let data = this.data;
        for (let i = 0; i < data.length; i++) {
         let id = 'checked' + this.data[i].npm;
         let check = this.shadowRoot.querySelector('#'+ id );
         if (check.checked) {
           this.$.ajax.url = '/api/ss/mahasiswa/' + this.data[i].npm;
           this.$.ajax.method = 'Delete';
           this.$.ajax.generateRequest()
           
         }
         
        }
        window.history.pushState({}, null, '#/mahasiswa-list');
        location.reload();
        window.dispatchEvent(new CustomEvent('location-changed'));
         }       
  }

 

 window.customElements.define('my-nilai-list', MyNilaiList);