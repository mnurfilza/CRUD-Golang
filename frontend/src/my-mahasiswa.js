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


class MyMahasiswa extends PolymerElement {
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
          background:grey;
          color:white;
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
      

      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>View One</h1>
        <paper-item class="horizontal">
        <paper-input id="npm" on-change="_change" label="Search" read-only></paper-input>
        </paper-item>
     
        <iron-media-query query="(min-width:600px)" query-matches="{{dekstop}}"></iron-media-query>


        <template is="dom-if" if="{{dekstop}}">
        <iron-list items="[[mhs]]" as="item" on-selected-item-changed="_confirmClick" selection-enabled class="vertical">
        <template>
        <div>
          <paper-item class="kartu horizontal" npm$="[[item.npm]]">
          <div style="width: 4%;"> [[_index(index)]] </div>
          <div style="width: 20%;"> [[item.npm]] </div>
          <div style="width: 30%; padding:0 5px 0 5px"> [[item.nama]] </div>
          <div style="width: 4%;">K[[item.kelas]] </div>
          <paper-button  raised>Delete</paper-button>
        </paper-item>
        </div>
        </template>
        </iron-list>
        </template>

        <template is="dom-if" if="{{!dekstop}}">
        <iron-list items="[[mhs]]" as="item" on-selected-item-changed="_confirmClick" selection-enabled>
        <template>
        <div>
          <paper-item class="kartu-mobile horizontal" npm$="[[item.npm]]">
          <paper-icon-item >
            <div class="circle bg-icon" label$="[[_inisial(item.nama)]]"></div> 
          </paper-fab>
          <div class="vertical main-range">
          <div>[[item.npm]] </div>
          <div>[[item.nama]] </div>
          <div>[[item.kelas]] </div>
          </div>
        </paper-item>
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
            nama:"cahyo",
            kelas :"2ka35"
          },{
            npm :"171122",
            nama:"dwi",
            kelas :"2ka35"
          },{
            npm :"1711223",
            nama:"Airiola",
            kelas :"2ka35"
          },{
            npm :"1711223",
            nama:"bayu",
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
  _inisial(e){
    // var res = e.substr(0,1);
    // var upres = res.toUpperCase();
    console.log(e.charAt(0).toUpperCase())
    return e.substr(0,1).toUpperCase()  ;
  }
    _confirmClick(e){

      if (e.detail.value) {
        var mahasiswa = e.detail.value;
        this.$.npm.value = mahasiswa.npm;
        // this.$.nama.value = mahasiswa.nama;
        // this.$.kelas.value = mahasiswa.kelas; 
      }
    }
  }

 

 window.customElements.define('my-mahasiswa', MyMahasiswa);