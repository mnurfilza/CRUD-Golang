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
import '@polymer/paper-card/paper-card.js'


class MyView1 extends PolymerElement {
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
        .kartu-mobile{
          margin: 24px;
          padding: 16px;
          color: black;
          border-radius: 5px;
          background-color: white;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        .kartu-mobile:hover{
          background:black;
          color:white;
          cursor: pointer;
        }
      </style>

        <iron-media-query 
        query="(min-width:600px)" 
        query-matches="{}">
        </iron-media-query>
        
      <div class="card">
        <div class="circle">1</div>
        <h1>View One</h1>
        <paper-input id="npm" on-change="_change" label="NPM" readonly></paper-input>
        <paper-input id="nama" on-change="_change" label="Nama" readonly></paper-input>
        <paper-input id="kelas" on-change="_change" label="Kelas" readonly></paper-input> 

        <template is="dom-if" if="{{dekstop}}">
        <iron-list items="[[mhs]]" as="item" on-selected-item-changed="_confirmClick" selection-enabled>
        <template>
        <div>
          <div class="kartu" npm$="[[item.npm]]">
          <div>No : [[_index(index)]] </div>
          <div>NPM : [[item.npm]] </div>
          <div>Nama : [[item.nama]] </div>
          <div>Kelas : [[item.kelas]] </div>
        </div>
        </div>
        </template>
        </iron-list>
        </template>

        <template is="dom-if" if="{{!dekstop}}">
        <iron-list items="[[mhs]]" as="item" on-selected-item-changed="_confirmClick" selection-enabled>
        <template>
        <div>
          <div class="kartu" npm$="[[item.npm]]">
          <div>No : [[_index(index)]] </div>
          <div>NPM : [[item.npm]] </div>
          <div>Nama : [[item.nama]] </div>
          <div>Kelas : [[item.kelas]] </div>
        </div>
        </div>
        </template>
        </iron-list>
        </template>

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

        mhs:{
          type: Object,
          value:[
            {
            npm :"1711444",
            nama:"Filza",
            kelas :"2ka35"
          },{
            npm :"17114545",
            nama:"andoyo",
            kelas :"2ka35"
          },{
            npm :"1711333",
            nama:"airlo",
            kelas :"2ka35"
          },{
            npm :"171122",
            nama:"airio",
            kelas :"2ka35"
          },{
            npm :"1711223",
            nama:"airiola",
            kelas :"2ka35"
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
  _confirmClick(e){

    if (e.detail.value) {
      var mahasiswa = e.detail.value;
      this.$.npm.value = mahasiswa.npm;
      this.$.nama.value = mahasiswa.nama;
      this.$.kelas.value = mahasiswa.kelas; 
    }
  }
}

 

 window.customElements.define('my-view1', MyView1);