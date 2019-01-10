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
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-fab/paper-fab.js';
import  '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';




class MyFaq extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;


        }
        .item{
          margin-left: 45px;
          margin-right: 35px;
          margin-top: 2px;
          color: #757575;
          border-radius: 5px;
          background-color: #fff;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
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
        .header{
          background-color:#34637B;
          color: #fff;
        }
        .subheader h1{
          font-size: 65px;
          color: #fff;
        }
        .subheader p{
          font-size: 25px;
           margin-top: -2%;
        }
        .collapse-content{
          margin-left: 45px;
          margin-right: 35px;
          margin-top:20px;
          padding-bottom: 3vh;

        }
        .paperItem{
          font-size: 16px;
          font-weight: 500;
        }


        paper-item:hover{
          cursor: pointer;
        }

        .answer{
          height: auto;
        }
        .container{
          margin: 70px;
        }

        iron-icon{

        }

     /* this Style for mobile site */

    .paperItemMobile{
      padding: 15px;
      font-size: 16px;
      font-weight: 700;
     }

      .answer-mobile{
        height: calc(45vh- 20px);
        }

      .collapse-content-mobile{
        margin: 3%;
        padding: 3%;
      }
      .menu{
        background-color: #34637B;
        margin: 5%;
      }
      .header-mobile{
        background-color:#34637B;
        color: #fff;
      }
      .subheader-mobile h1{
        font-size: 55px;
        color: #fff;
      }
      .subheader-mobile p{
        font-size: 20px;
         margin-top: -2%;
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

        <iron-media-query query="(min-width:600px)" query-matches="{{dekstop}}"></iron-media-query>

    

        <template is="dom-if" if="{{dekstop}}">
        <app-header-layout has-scrolling-region="" style="width:100%; height:100vh;">
        <app-header class="header" slot="header" fixed effects="waterfall">
          <div class='vertical subheader'>
          <center>
            <h1>FAQ</h1>
            <p>FREQUENTLY ASKED QUESTIONS</p>
          </center>
          </div>
        </app-header>



        <div class="container">
        <dom-repeat items="[[data]]" as="item" id="list"  on-selected-item-changed="" class="vertical">
        <template>
        <div class="item">
        <paper-item  class="paperItem" id="a[[index]]" on-tap="_collapse">
       <iron-icon icon="expand-more" id="icon[[index]]"></iron-icon>
        [[item.tittle]]
        </paper-item>

        <iron-collapse id="b[[index]]" class="vertical answer" on-opened-changed="_transition">
        <div class="collapse-content" >
          <div><p>[[item.answer]]</p></div>
        </div>
       </iron-collapse>
       </div>


        </template>
        </dom-repeat>
        </div>
        </app-header-layout>
        </template>

       <template is="dom-if" if="{{!dekstop}}">
       <app-header-layout has-scrolling-region="" style="width:100%; height:100vh;">
       <app-header class="header" slot="header" fixed effects="waterfall">
       <paper-fab mini noink icon="icons:menu" class="menu" on-tap="_menu"></paper-fab>
         <div class='vertical subheader-mobile'>
         <center>
           <h1>FAQ</h1>
           <p>FREQUENTLY ASKED QUESTIONS</p>
         </center>
         </div>
       </app-header>

       <div class="container-mobile">
       <dom-repeat items="[[data]]" as="item" id="list"  on-selected-item-changed="" class="vertical">
       <template>
       <div class="card">
        <paper-item  class ="paperItemMobile" id="a[[index]]" on-tap="_collapse">
            <iron-icon icon="expand-more" id="icon[[index]]"></iron-icon>
            [[item.tittle]]

        </paper-item>

          <iron-collapse id="b[[index]]" class="vertical answer-mobile" on-opened-changed="_transition">
          <div class="collapse-content-mobile" >
            <div>[[item.answer]]</div>

          </div>
          </iron-collapse>
          </div>

       </template>
       </dom-repeat>
       </div>
        </app-header-layout>
        </template>


    `;
  }


  static get properties() {
    return {
        selected:String,
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
              tittle:'ilorem ipsum bla bla bla bla bla bla bla? ',
              answer:'lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu lorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsulorem ipsum bla bla bla bla bla 1 bla bla bla bla lorem ipsu'
            },
            {
              tittle:'ini Judul 2',
              answer:'lorem ipsum bla bla bla bla bla 2'
            },
            {
              tittle:'ini Judul 3',
              answer:'lorem ipsum bla bla bla bla bla 3'
            },
            {
              tittle:'ini Judul 4',
              answer:'lorem ipsum bla bla bla bla bla 4'
            },
            {
              tittle:'ini Judul 5',
              answer:'lorem ipsum bla bla bla bla bla 5'
            },
            {
              tittle:'ini Judul 6',
              answer:'lorem ipsum bla bla bla bla bla 6'
            },
            {
              tittle:'ini Judul 7',
              answer:'lorem ipsum bla bla bla bla bla 7'
            },
            {
              tittle:'ini Judul 8',
              answer:'lorem ipsum bla bla bla bla bla 8'
            },
            {
              tittle:'ini Judul 9',
              answer:'lorem ipsum bla bla bla bla bla 9'
            },
            {
              tittle:'ini Judul 10',
              answer:'lorem ipsum bla bla bla bla bla 10'
            }
        ]
      }
    };
  }

  _index(index){
    var a = parseInt(index+1);
    return a
  }
 _collapse(e){
  let data = e.srcElement.id;
  let split = data.split('a');
  let result = "#b"+ split[1];
  let collapse = this.shadowRoot.querySelector(result);
  if (collapse) {
    if (data) {
      collapse.toggle();
    }


  }

  }
  _transition(e){
      let data = e.srcElement.id;
      let split = data.split('b');
      let result = '#icon'+ split[1];
      if (this.shadowRoot.querySelector(result)) {

        let icon= this.shadowRoot.querySelector(result);
        if (e.detail.value) {
          icon.setAttribute('icon','expand-less');
        } else {
          icon.setAttribute('icon','expand-more');

          }
          

      }
    }

    _menu(){
      let myMenu = document.querySelector('my-app');
      let menu = myMenu.shadowRoot.querySelector('#drawer');
      menu.open();
    }

    _
  }







 window.customElements.define('my-faq', MyFaq);
