"use strict";var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Navigation=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.menuId,a=void 0===n?"am-main-menu":n,r=t.click,u=void 0!==r&&r;_classCallCheck(this,e),this.hasNestedSubmenu=!1,this.menu=null,this.menuId=a,this.click=u,this.currentItem=null}return _createClass(e,[{key:"hoverHandler",value:function(e){var t=e.type,n=e.target,a=this.createCustomEvt();"mouseout"===t&&"true"===n.getAttribute("aria-haspopup")?n.setAttribute("aria-expanded","false"):"mouseover"===t&&"false"===n.getAttribute("aria-haspopup")&&n.setAttribute("aria-expanded","true"),n.dispatchEvent(a)}},{key:"clickHandler",value:function(e){var t=this,n=e.target,a=null;if(this.menu.contains(n)||"mousedown"!==e.type&&"keydown"!==e.type?this.menu.contains(n)&&"keydown"!==e.type&&e.preventDefault():this.clearAll(),"span"===n.localName&&(n=n.parentElement),document.querySelectorAll(".am-submenu-list-open").length>0&&!document.querySelectorAll(".am-submenu-list-open")[0].contains(n)){var r=Array.from(document.querySelectorAll(".am-submenu-list-open"));if(n.nextSibling&&"ul"===n.nextSibling.localName)n.nextSibling.classList.add("am-submenu-list-open");r.forEach(function(e){t.toggleSubmenuMenuClass(e)}),this.toggleButtonAria(n)}else{var u=n.nextElementSibling;null!==u&&"ul"===u.localName&&((a=u).getElementsByTagName("ul").length?this.hasNestedSubmenu=!0:this.hasNestedSubmenu=!1,this.toggleSubmenuMenuClass(a),this.toggleButtonAria(n))}var i=this.createCustomEvt();n.dispatchEvent(i)}},{key:"focusInHandler",value:function(e){var t=this,n=e.target,a=e.target.offsetParent.parentNode,r=Array.from(this.menu.querySelectorAll('[aria-expanded="true"]')),u=Array.from(this.menu.querySelectorAll(".am-submenu-list-open"));!this.menu.contains(n)&&r.length?this.clearAll():this.menu.contains(n)&&u.length>1?u.forEach(function(e){e.contains(n)||(t.toggleSubmenuMenuClass(e),t.toggleButtonAria(e.previousElementSibling))}):(r=Array.from(a.querySelectorAll('[aria-expanded="true"]')),u=Array.from(a.querySelectorAll(".am-submenu-list-open")),a.id===this.menuId&&(this.toggleButtonAria(r[0]),this.toggleSubmenuMenuClass(u[0])))}},{key:"toggleSubmenuMenuClass",value:function(e){null!=e?e.classList.toggle("am-submenu-list-open"):this.clearMenus()}},{key:"toggleButtonAria",value:function(e){Array.from(document.querySelectorAll(".am-submenu-toggle")).forEach(function(t){var n=t.parentElement.parentElement.previousElementSibling;t.isSameNode(e)&&"false"===t.getAttribute("aria-expanded")&&n?(n.setAttribute("aria-expanded","true"),t.setAttribute("aria-expanded","true")):t.isSameNode(e)&&"true"===t.getAttribute("aria-expanded")&&n?(n.setAttribute("aria-expanded","true"),t.setAttribute("aria-expanded","false")):t.isSameNode(e)&&"false"===t.getAttribute("aria-expanded")?t.setAttribute("aria-expanded","true"):t.setAttribute("aria-expanded","false")})}},{key:"clearMenus",value:function(){Array.from(this.menu.querySelectorAll(".am-submenu-list-open")).forEach(function(e){e.classList.toggle("am-submenu-list-open")})}},{key:"clearButtons",value:function(){Array.from(this.menu.querySelectorAll(".am-submenu-toggle")).forEach(function(e){e.setAttribute("aria-expanded","false")})}},{key:"clearAll",value:function(){this.clearMenus(),this.clearButtons()}},{key:"getCurrentItem",value:function(){var e=this.menu.querySelector('[aria-expanded="true"]');if(e)return e.parentElement}},{key:"setCurrentItem",value:function(e){Array.from(this.menu.querySelectorAll("li")).forEach(function(e){e.classList.remove("am-current-item")}),e.detail.parent&&(this.currentItem=e.detail.parent,this.currentItem.classList.add("am-current-item"))}},{key:"createCustomEvt",value:function(){return new CustomEvent("am-set-current-item",{bubbles:!0,detail:{parent:this.getCurrentItem()}})}},{key:"eventDispatcher",value:function(e){switch(e.type){case"focusin":this.focusInHandler(e);break;case"keydown":if(13===e.keyCode)this.clickHandler(e);else{if(27!==e.keyCode)return;this.clearAll()}break;case"mousedown":this.clickHandler(e);break;default:return}}},{key:"setEventListeners",value:function(){var e=this;Array.from(this.menu.querySelectorAll(".no-js")).forEach(function(e){e.classList.remove("no-js")});var t=["focusin","keydown","mouseover"];this.click?(t.push("mousedown"),Array.from(this.menu.querySelectorAll(".am-submenu-list")).forEach(function(e){return e.classList.add("am-click-menu")})):t.push("mouseout");for(var n=0;n<t.length;n++)document.addEventListener(t[n],function(t){e.eventDispatcher(t)});this.menu.addEventListener("am-set-current-item",function(t){e.setCurrentItem(t)})}},{key:"init",value:function(){this.menu=document.getElementById(this.menuId),this.setEventListeners()}}]),e}();
//# sourceMappingURL=Navigation.js.map
