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
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

class MyNilai extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .kartu{
          font-size: 20px;
          box-shadow: 0 2px 2px -2px gray;
          margin-top : 20px;
        }
        .kartu:hover{
          background:white;
          color:black;
          cursor: pointer;
        }

        .kartu-mobile{
          box-shadow: 0 2px 2px -2px gray;
          font-size: 20px;
          margin-top : 20px;
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
        paper-fab[label="B"]{
          --paper-fab-background: green;
        }
        paper-fab[label="C"]{
          --paper-fab-background: yellow;
        }
        paper-fab[label="D"]{
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
        .avatar {
          display: inline-block;
          box-sizing: border-box;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--paper-amber-500);
        }
  

      </style>

      <div class="card">
        <div class="circle">N</div>
        <h1>Nilai</h1>
        <paper-input id="npm" on-change="_change" label="NPM" readonly></paper-input>

        <iron-media-query query="(min-width:600px)" query-matches="{{dekstop}}"></iron-media-query>
        
        <br>
        <template is="dom-if" if="{{dekstop}}"> 
        <iron-list items="[[nilai]]" as="item" on-selected-item-changed="_confirmClick" selection-enabled class="vertical">
        <template>
        <div>
          <paper-item class="kartu horizontal" npm$="[[item.npm]]">
            <div style="width: 4%; margin-left: 5%;"> [[_index(index)]] </div>
            <div style="width: 10%; margin-left: 5%;"> [[item.npm]] </div>
            <div style="width: 10%; margin-left: 5%;"> [[item.kd_mk]] </div>
            <div style="width: 15%; padding:0 5px 0 5px;"> [[item.mataKuliah]] </div>
            <div style="width: 10%; margin-left: 5%;"> [[item.uts]] </div>
            <div style="width: 10%; margin-left: 5%;"> [[item.uas]] </div>
          </paper-item>
        </div>
        </template>
        </iron-list>
        </template>
        

        <template is="dom-if" if="{{!dekstop}}"> 
        <iron-list items="[[nilai]]" as="item" on-selected-item-changed="_confirmClick" selection-enabled>
        <template>
        <div>
          <div class="kartu-mobile" npm$="[[item.npm]]">
            <div> [[_index(index)]] </div>
            <div> [[item.npm]] </div>
            <div> [[item.kd_mk]] </div>
            <div> [[item.mataKuliah]] </div>
            <div> [[item.uts]] </div>
            <div> [[item.uas]] </div>
          </div>
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


        nilai:{
          type: Object,
          value:[
            {
            npm:"1711444",
            kd_mk:"pa24",
            mataKuliah:"Bahasa Inggris",
            uts:75,
            uas:80
          },{
            npm:"1711433",
            kd_mk:"Iia21",
            mataKuliah:"algoritma",
            uts:55,
            uas:60
          },{
            npm:"1711232",
            kd_mk:"si12",
            mataKuliah:"pkn",
            uts:75,
            uas:80
          },{
            npm:"17113334",
            kd_mk:"pa222",
            mataKuliah:"java",
            uts:85,
            uas:70
          },{
            npm:"1711444",
            kd_mk:"pa213",
            mataKuliah:"Bahasa Indonesia",
            uts:75,
            uas:80
          },{
            npm:"1711444",
            kd_mk:"pa213",
            mataKuliah:"Bahasa Indonesia",
            uts:85,
            uas:80
          }
        ]    
      }
    };
  }

 _change(e){
  let key = e.srcElement.id;
  this.mhs[key]= e.srcElement.value;
 }
 _index(index){
  var a = parseInt(index+1);
  return a
 }
  _confirmClick(a){
       // console.log(e.detail.value);
       if (a.detail.value) {
        var nilai = a.detail.value;
        let uts = nilai.uts;
        let uas = nilai.uas;
        
      
       let total = (nilai.uts + nilai.uas)/2;
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
      //  switch (total) {
      //   case total > 90:
      //      grade = "A";
      //     break;
      //    case total>80:
      //      grade = "B";
      //      break;
      //    case total>70:
      //      grade = "C";
      //      break;
      //    case total>60:
      //      grade = "D";
      //      break;
      //    case total>30:
      //      grade = "E";
      //      break;
      
      //   default:
      //   grade ="P";
      // //   break;
      // } 
       var nilai = a.detail.value;
       this.$.npm.value = nilai.npm;
       this.$.kd_mk.value = nilai.kd_mk;
       this.$.mataKuliah.value = nilai.mataKuliah;
       this.$.uts.value = nilai.uts;
       this.$.uas.value = nilai.uas; 
       this.$.total.value = total;
       this.$.grade.value = grade;
       }
      
  }
}

 

 window.customElements.define('my-nilai', MyNilai);