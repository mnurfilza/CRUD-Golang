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
import '@polymer/iron-list/iron-list.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item//paper-item.js';

class MyView3 extends PolymerElement {
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
        .header{
          background-color:#34637B;
          color: #fff;
        }
        .subheader h1{
          font-size: 85px;
          color: #fff;
        }
        .subheader p{
         font-size: 30px;
         margin-top: -2%;
        }

      </style>

      <app-header-layout has-scrolling-region="" style="width:100%; height:100vh;">
      <app-header class="header" slot="header" fixed effects="waterfall">
          
      </app-header>
      </app-header-layout>


      <iron-list items="[[data]]" as="item" on-selected-item-changed="_confirmClick" selection-enabled>
        <template>
        
        </template>
        </iron-list>
      
      
        
      
    `;
  }

  static get prroperties(){
    return {
      data:{
        type:Object,
        observer:'_reload',
        value:[
          {
            tittle:'ini Judul 1',
            answer:'lorem ipsum bla bla bla bla bla'
          },
          {
            tittle:'ini Judul 2',
            answer:'lorem ipsum bla bla bla bla bla'
          },
          {
            tittle:'ini Judul 3',
            answer:'lorem ipsum bla bla bla bla bla'
          },
          {
            tittle:'ini Judul 4',
            answer:'lorem ipsum bla bla bla bla bla'
          },
          {
            tittle:'ini Judul 5',
            answer:'lorem ipsum bla bla bla bla bla'
          },
          {
            tittle:'ini Judul 6',
            answer:'lorem ipsum bla bla bla bla bla'
          },
          {
            tittle:'ini Judul 7',
            answer:'lorem ipsum bla bla bla bla bla'
          },
          {
            tittle:'ini Judul 8',
            answer:'lorem ipsum bla bla bla bla bla'
          },
          {
            tittle:'ini Judul 9',
            answer:'lorem ipsum bla bla bla bla bla'
          },
          {
            tittle:'ini Judul 10',
            answer:'lorem ipsum bla bla bla bla bla'
          },

        ]
      }

    };
  }


  _reload(e){
    console.log(e.path);

  }
}

window.customElements.define('my-view3', MyView3);
