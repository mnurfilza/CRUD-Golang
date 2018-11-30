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


class MyMatkul extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .kartu{
          margin: 24px;
          padding: 16px;
          color: white;
          border-radius: 5px;
          background-color: grey;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        .kartu:hover{
          background:white;
          color:black;
          cursor: pointer;
        }
      </style>

      <div class="card">
        <div class="circle">Mtk</div>
        <h1>View One</h1>
        <paper-input id="kd_mk" on-change="_change" label="NPM" readonly></paper-input>
        <paper-input id="mataKuliah" on-change="_change" label="Nama" readonly></paper-input>
        <paper-input id="dosen" on-change="_change" label="Kelas" readonly></paper-input> 
        <paper-button raised noink>Proses</paper-button>

        
        <br>
        <iron-list items="[[mhs]]" as="item" on-selected-item-changed="_confirmClick" selection-enabled>
        <template>
        <div>
        <div class="kartu" npm$="[[item.kd_mk]]">
        <div>No : [[_index(index)]] </div>
        <div>kode-Matakuliah : [[item.kd_mk]] </div>
        <div>Matakuliah : [[item.mataKuliah]] </div>
        <div>Dosen : [[item.dosen]] </div>
        </div>
        </div>
        </template>
        </iron-list>
        <br>
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

        matkul:{
          type:Object,
          value:{
            kd_mk:"",
            mataKuliah:"",
            dosen:"",

          }
        },

        mhs:{
          type: Object,
          value:[
            {
            kd_mk:"pa213",
            mataKuliah:"Bahasa Indonesia",
            dosen :"ibu ibu"
          },{
            kd_mk:"1eq12",
            mataKuliah:"jarkom",
            dosen :"bapak bapak"
          },{
            kd_mk:"pe23",
            mataKuliah:"matlan",
            dosen :"ibu a"
          },{
            kd_mk:"17112",
            mataKuliah:"sbd2",
            dosen :"bu ibu"
          },{
            kd_mk:"1723",
            mataKuliah:"komputer sistem",
            dosen :"pakbapak"
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
      var matkul = a.detail.value;
      this.$.kd_mk.value = matkul.kd_mk;
      this.$.mataKuliah.value = matkul.mataKuliah;
      this.$.dosen.value = matkul.dosen; 
    }
  }
}

 

 window.customElements.define('my-matkul', MyMatkul);