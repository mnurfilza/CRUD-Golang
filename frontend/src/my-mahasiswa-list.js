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
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
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
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import {IronA11yKeysBehavior} from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';




class MyMahasiswaList extends  mixinBehaviors([IronA11yKeysBehavior], PolymerElement) {
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
        
        .menu{
          background-color: #34637B;
          margin: 2%;
        }
        
        paper-dropdown-menu {
          color: white;
        }
        paper-input{
          width: 20%;
        }
        paper-input{
          --paper-input-container-color:white;
          --paper-input-container-focus-color: white;
          --paper-input-container-input-color: white;
        }
        iron-dropdown {
          border: 1px solid gray;
          background: white;
          font-size: 2em;
          color: black;
          font-size: 15px;
          margin: 15px 20px;
        }
        iron-dropdown ul li{
          list-style-type:none;
          margin-right
        }

        .containerfilter{
          margin-left: 50px;
        }
        .containerfilter paper-input{
          width: 20%;
          padding-left: 20%;
        }

      
        
      </style>

      <iron-ajax
      id="ajax"
      url="/api/ss/mahasiswa"
      method="GET"
      handle-as="json"
      on-response="handleResponse"
      on-error="errorResponses">
      </iron-ajax>
      
     
        <pre>[[pressed]]</pre>
        

        <iron-media-query query="(min-width:600px)" query-matches="{{dekstop}}"></iron-media-query>

        <template is="dom-if" if="{{dekstop}}">
        <app-header-layout has-scrolling-region="" style="width:100%; height:100vh;">
        <app-header class="header" slot="header" fixed effects="waterfall">
            <app-toolbar> 
              <div main-title="">My Nilai</div>
              <paper-input id="[[items]]" on-change="_searchNPM" label="Search" style="width:20vh;" ></paper-input>
              <paper-icon-button on-tap="_openDropdown" icon="icons:search"></paper-icon-button>
              <iron-dropdown id="dropdown" horizontal-align="right" on-focused-changed="_items" focused={{items}}vertical-align="top">
                <paper-item on-tap="_npm" slot="dropdown-content"  >NPM</paper-item>
                <paper-item on-tap="_nama" slot="dropdown-content" >Nama</paper-item>
              </iron-dropdown>
              <paper-icon-button  id="add" on-tap="add" icon="icons:add-circle" disabled drawer-toggle=""></paper-icon-button>
              <paper-icon-button  id="del" on-tap="_delete" icon="icons:delete" style="display:none; " drawer-toggle=""></paper-icon-button>
            </app-toolbar>
            
            <app-toolbar>
            <paper-dropdown-menu label="Edit" noink no-animations>
            <paper-listbox slot="dropdown-content" class="dropdown-content" selected="1" >
              <paper-item on-tap="_On">Turn On Editing</paper-item>
              <paper-item on-tap="_close" >Turn Off editing</paper-item>
            </paper-listbox>
            </paper-dropdown-menu>
            </app-toolbar>


        
            <app-toolbar style="margin-top:35px; margin-left: 5%;">
            <paper-checkbox  id="[[index]]" on-checked-changed="_checkedAll"></paper-checkbox>
            <div class="horizontal" style="width:100%;">
            <div style="width:4%;">No</div>
            <div style="width: 20%; margin-left: 6%;">NPM</div>
            <div style="width: 30%;  ">Nama</div>
            <div style="width: 5%; margin-left:1%; ">Kelas</div>
            </div>
            </app-toolbar>

           
          </app-header>
        <iron-icons icon="icons:add-box"></iron-icons>
        <iron-list items="[[data]]" as="item" id="list"  multi-selection on-selected-items-changed="_selected" selected-items="{{selected}}" class="vertical">
        <template>
        <div>
        <div>
          <paper-item class="horizontal" >
          <paper-checkbox  id="[[index]]" class="checked" name="checkboxList"  on-checked-changed="_checked"></paper-checkbox>
          <a class="anchor" href ="#/mahasiswa-card/[[item. npm]]" style ="width: 150vh;"tabindex="-1">
          <paper-item class="kartu horizontal" npm$="[[item.npm]]" id='items' style="margin-left:2%">
          <div style="width: 4%;"> [[_index(index)]] </div>
          <div style="width: 20%; margin-left: 5%;"> [[item.npm]] </div>
          <div style="width: 30%; margin-left: 2%;"> [[item.nama]] </div>
          <div style="width: 10%; margin-left: 1%;">K[[item.kelas]] </div>
         </paper-item>
        </a>
        </paper-item>
        </div>
        </div>
        </template>
        </iron-list>
        </app-header-layout>
        </template>

        <template is="dom-if" if="{{!dekstop}}">
        <app-header-layout has-scrolling-region="" style="width:100%; height:100vh;">
        <app-header class="header" slot="header" fixed effects="waterfall">
            <app-toolbar> 
            <paper-fab mini noink icon="icons:menu" class="menu" on-tap="_menu"></paper-fab>
              <div main-title="">Mahasiswa</div>
            </app-toolbar>
        <iron-list items="[[data]]" as="item" on-selected-item-changed="" selection-enabled>
        <template>
        <div>
          <a href ="#/mahasiswa-card/[[item.npm]]" tabindex="-1">
          <paper-item class="kartu-mobile horizontal" npm$="[[item.npm]]">
          <paper-icon-item >
            <div class="circle" label$="[[_inisial(item.nama)]]">[[_inisial(item.nama)]]</div> 
          </paper-icon-item>
          <div class="vertical main-range">
          <div>[[item.npm]] </div>
          <div>[[item.nama]] </div>
          <div>[[item.kelas]] </div>
          </div>
        </paper-item>
        </a>
        </div>
        </template>
        </iron-list>
        </app-header-layout>
        </template>
        
     
    `;
  }


  static get properties() {
    return {
      pressed:{type:String, readOnly:true, value:''},
      keyBindings:{
        'space': '_onKeydown', // same as 'space:keydown'
        'shift+alt+p:keypress': '_onKeypress',
        'enter:keypress': '_onKeypress',
        'esc:keyup': '_onKeyup'
      },

      items:String,
      selected:Object,
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
        // },
        

        data:{
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
          }
        ]    
      }
    };
  }
  add(){
    window.history.pushState({}, null, '#/mahasiswa-card/0');
    window.dispatchEvent(new CustomEvent('location-changed'));  
  }

  _reload(e){
    console.log(e);
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
      
    }

    _menu(){
      let myMenu = document.querySelector('my-app');
      let menu = myMenu.shadowRoot.querySelector('#drawer');
      menu.open();
    }

    _On(){
     let b = this.shadowRoot.querySelector('#add');
     let d = this.shadowRoot.querySelector('#del');
    //  let data = this.data;
    //  for (let i = 0; i < data.length; i++) {
    //    let id = 'checked' + this.data[i].npm;
    //    let check = this.shadowRoot.querySelector('#'+ id );
    //    check.style.display = 'block'; 
    //  }
     d.style.display = 'block';
     b.removeAttribute('disabled');
    }

    _close(){
      let b = this.shadowRoot.querySelector('#add');
      let d = this.shadowRoot.querySelector('#del');
      // let c = this.shadowRoot.querySelector('#checked')
      d.style.display = 'none';
      // c.style.display = 'none';
    //   let data = this.data;
    //   for (let i = 0; i < data.length; i++) {
    //    let id = 'checked' + this.data[i].npm;
    //    let check = this.shadowRoot.querySelector('#'+ id );
    //    check.style.display = 'none'; 
    //  }
      b.setAttribute('disabled', true);
     }

     _delete(){
      if (this.selected) {
        let data = this.selected;
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].npm);
            this.$.ajax.url = '/api/ss/mahasiswa' + data[i].npm;
            this.$.ajax.method = 'DELETE';
            this.$.ajax.generateRequest()
         
        }
        // window.history.pushState({}, null, '#/mahasiswa-list');
        // location.reload();
        // window.dispatchEvent(new CustomEvent('location-changed'));
      }
  } 
        
        _checked(e){
        let check  = e.detail.value;
        let index = e.srcElement.id;
        console.log(e.srcElement.id);
        let list = this.shadowRoot.querySelector('#list');
        if (check) {
        list.selectIndex(index);
      }else{
        list.deselectIndex(index);
      }
    }
    _selected(e){
     console.log(this.selected);
      
     console.log(e);
      if (this.selected) {
        for (let i = 0; i < this.selected.length; i++) {
          
        }
      }
    }
    _checkedAll(e){
      console.log(e.detail.value);
      console.log(this.shadowRoot.querySelectorAll('paper-checkbox'));
      let check = this.shadowRoot.querySelectorAll('.checked');
      console.log(check);
      for (let i = 0; i < check.length; i++) {
        if (e.detail.value) {
          check[i].setAttribute('checked','true');
        }else{
          check[i].removeAttribute('checked');
        }
        
      }
    }
    _searchNPM(e){
      let key = e.srcElement.value;
      console.log(key);
      let temp ="npm,=," + key;
      let params = encodeURI(temp);
      if (key) {
            this.$.ajax.url = '/api/ss/mahasiswa?params=' + params;
            this.$.ajax.method = 'GET';
            this.$.ajax.generateRequest()  
      }else{
        this.$.ajax.url = '/api/ss/mahasiswa';
            this.$.ajax.method = 'GET';
            this.$.ajax.generateRequest()  
      }
            
      // if(){

      // }
  
    }

    _items(e){
      console.log(this.shadowRoot.querySelector('paper-input'))
    }
    _openDropdown() {
      let drop = this.shadowRoot.querySelector("#dropdown");
      drop.toggle();
    }

    _onKeydown(e){
      console.log(e.detail.combo); // KEY+MODIFIER, e.g. "shift+tab"
      console.log(e.detail.key); // KEY only, e.g. "tab"
      console.log(e.detail.event); // EVENT, e.g. "keydown"
      console.log(e.detail.keyboardEvent); // the original KeyboardEvent
    }
    _onKeyprint(e){
      console.log(e.detail.e);
    }
        
    }

   

 

 window.customElements.define('my-mahasiswa-list', MyMahasiswaList);