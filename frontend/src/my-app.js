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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronA11yKeysBehavior} from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-toast/paper-toast.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends mixinBehaviors([IronA11yKeysBehavior], PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }
        /*app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }*/

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>

      <app-location
      route="{{route}}"
      url-space-regex="^[[rootPath]]"
      use-hash-as-path>
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}" >
        <!-- Drawer content -->
        <app-drawer id="drawer"  slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list " role="navigation">
            <a name="mahasiswa-list" href="[[roothPath]]#/mahasiswa-list">Mahasiswa-list</a>
            <a name="matkul-list" href="[[roothPath]]#/matkul-list">Matakuliah list</a>
            <a name="nilai-list" href="[[roothPath]]#/nilai-list">Nilai-list</a>
            <a name="view1" href="[[rootPath]]#/view1">View One</a>
            <a name="view2" href="[[rootPath]]#/view2">View Two</a>
            <a name="view3" href="[[rootPath]]#/view3">View Three</a>
            <a name="view4" href="[[rootPath]]#/view4">View Four</a>
            <a name="faq" href="[[rootPath]]#/faq">FAQ</a>
            <a name="mahasiswa" href="[[rootPath]]#/mahasiswa">Mahasiswa</a>
            <a name="matkul" href="[[rootPath]]#/matkul">Mata Kuliah</a>
            <a name="nilai" href="[[rootPath]]#/nilai">Nilai</a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <!-- <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">My App</div>
            </app-toolbar>
          </app-header> -->

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">

            <my-nilai-list name="nilai-list" route="[[route]]"></my-nilai-list>
            <my-matkul-list name="matkul-list" page="[[page]]"></my-matkul-list>
            <my-mahasiswa-list name="mahasiswa-list" route="[[route]]"></my-mahasiswa-list>
            <my-view1 name="view1"mahasiswa="{{mahasiswa}}"></my-view1>
            <my-view2 name="view2"mahasiswa="[[mahasiswa]]"></my-view2>
            <my-view3 name="view3"></my-view3>
            <my-view4 name="view4"></my-view4>
            <my-faq name="faq"></my-faq>
            <my-mahasiswa name="mahasiswa"></my-mahasiswa>
            <my-matkul name="matkul"></my-matkul>
            <my-nilai name="nilai"></my-nilai>
            <my-nilai-card name="nilai-card" route="[[route]]"></my-nilai-card>
            <my-mahasiswa-card name="mahasiswa-card" route="[[route]]"></my-mahasiswa-card>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
      <paper-toast id="toast"></paper-toast>
      <pre>[[pressed]]</pre>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      pressed:{type:String, readOnly:true, value:''},
      keyBindings:{
        'space': '_onKeydown', // same as 'space:keydown'
        'shift+alt+p:keypress': '_onKeyprint',
        'enter:keypress': '_onKeypress',
        'esc:keyup': '_onKeyup'
      },
        mahasiswa:{
          type: Object,
          notify: true,
          value:{
            npm:"",
            nama:"",
            kelas:"",
          }

        },

      routeData: Object,
      subroute: Object
    };
  }
  _onKeydown(e){
    console.log(e.detail.combo); // KEY+MODIFIER, e.g. "shift+tab"
    console.log(e.detail.key); // KEY only, e.g. "tab"
    console.log(e.detail.event); // EVENT, e.g. "keydown"
    console.log(e.detail.keyboardEvent); // the original KeyboardEvent
  }
  _onKeyprint(e){
    console.log(e.key);
  }

  ready(){
    super.ready();
    console.log('a')
    let a = this.shadowRoot.querySelector('#drawer');
    console.log(a.getAttribute('force-narrow'));
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
      // '_mahasiswaChanged(mahasiswa)'
    ];
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'mahasiswa-list';
    } else if (['mahasiswa-list','matkul-list','nilai-list','view1','view2','view3','view4','mahasiswa','matkul','nilai','nilai-card','mahasiswa-card','faq'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'nilai-list':
        import('./my-nilai-list.js');
        break;
      case 'mahasiswa-list':
        import('./my-mahasiswa-list.js');
        break;
      case 'matkul-list':
        import('./my-matkul-list.js');
        break;
      case 'view1':
        import('./my-view1.js');
        break;
      case 'view2':
        import('./my-view2.js');
        break;
      case 'view3':
        import('./my-view3.js');
        break;
     case 'view4':
        import('./my-view4.js');
        break;
     case 'mahasiswa':
        import('./my-mahasiswa.js');
        break;
      case 'matkul':
        import('./my-matkul.js');
        break;
      case 'nilai':
        import('./my-nilai.js');
        break;
      case 'nilai-card':
        import('./my-nilai-card.js');
        break;
      case 'mahasiswa-card':
        import('./my-mahasiswa-card.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
      case 'faq':
        import('./my-faq.js');
        break;
    }
  }

}

window.customElements.define('my-app', MyApp);
