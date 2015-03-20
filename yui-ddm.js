(function (window, document) {
    'use strict';

    function PureDropdown(dropdownParent) {

        var PREFIX = 'pure-',
            ACTIVE_CLASS_NAME = PREFIX + 'menu-active',
            ARIA_ROLE = 'role',
            ARIA_HIDDEN = 'aria-hidden',
            MENU_OPEN = 0,
            MENU_CLOSED = 1,
            MENU_PARENT_CLASS_NAME = 'pure-menu-has-children',
            MENU_ACTIVE_SELECTOR = '.pure-menu-active',
            MENU_LINK_SELECTOR = '.pure-menu-link',
            MENU_SELECTOR = '.pure-menu-children',
            DISMISS_EVENT = (window.hasOwnProperty &&
                window.hasOwnProperty('ontouchstart')) ?
                    'touchstart' : 'mousedown',

            ddm = this; // drop down menu

            this._state = MENU_CLOSED;

            this.show = function () {
                if (this._state !== MENU_OPEN) {
                    this._dropdownParent.classList.add(ACTIVE_CLASS_NAME);
                    this._menu.setAttribute(ARIA_HIDDEN, false);
                    this._state = MENU_OPEN;
                }
            };

            this.hide = function () {
                if (this._state !== MENU_CLOSED) {
                    this._dropdownParent.classList.remove(ACTIVE_CLASS_NAME);
                    this._menu.setAttribute(ARIA_HIDDEN, true);
                    this._link.focus();
                    this._state = MENU_CLOSED;
                }
            };

            this.toggle = function () {
                this[this._state === MENU_CLOSED ? 'show' : 'hide']();
            };

            this.halt = function (e) {
                e.stopPropagation();
                e.preventDefault();
            };

            this._dropdownParent = dropdownParent;
            this._link = this._dropdownParent.querySelector(MENU_LINK_SELECTOR);
            this._menu = this._dropdownParent.querySelector(MENU_SELECTOR);
            this._firstMenuLink = this._menu.querySelector(MENU_LINK_SELECTOR);

            // Set ARIA attributes
            this._link.setAttribute('aria-haspopup', 'true');
            this._menu.setAttribute(ARIA_ROLE, 'menu');
            this._menu.setAttribute('aria-labelledby', this._link.getAttribute('id'));
            this._menu.setAttribute('aria-hidden', 'true');
            [].forEach.call(
                this._menu.querySelectorAll('li'),
                function(el){
                    el.setAttribute(ARIA_ROLE, 'presentation');
                }
            );
            [].forEach.call(
                this._menu.querySelectorAll('a'),
                function(el){
                    el.setAttribute(ARIA_ROLE, 'menuitem');
                }
            );

            // Toggle on click
            this._link.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                ddm.toggle();
            });

            // Dismiss an open menu on outside event
            document.addEventListener(DISMISS_EVENT, function (e) {
                var target = e.target;
                if (target !== ddm._link && !ddm._menu.contains(target)) {
                    ddm.hide();
                    ddm._link.blur();
                }
            });

    }

    function initDropdowns() {
        var dropdownParents = document.querySelectorAll('.pure-menu-has-children');
        for (var i = 0; i < dropdownParents.length; i++) {
            var ddm = new PureDropdown(dropdownParents[i]);
        }
    }

    initDropdowns();

}(this, this.document));
