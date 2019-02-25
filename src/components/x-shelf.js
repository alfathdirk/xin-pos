import { define, Component } from '@xinix/xin';

import './x-shelf.scss';

const MIN_MOUNTED_WIDTH = 575;

class XShelf extends Component {
  get listeners () {
    return {
      'click .navbar-toggler': '_toggleDrawer(evt)',
      'click .x-shelf__backdrop': '_closeDrawer(evt)',
    };
  }

  ready () {
    super.ready();

    this._backdrop = document.createElement('div');
    this._backdrop.classList.add('x-shelf__backdrop');

    this.appendChild(this._backdrop);
  }

  dismount (child) {
    this._backdrop.classList.remove('x-shelf__backdrop--visible');
    this.classList.remove(`x-shelf--${child.position}-mount`);
  }

  mount (child) {
    if (window.innerWidth > MIN_MOUNTED_WIDTH) {
      this.classList.add(`x-shelf--${child.position}-mount`);
    } else {
      this._backdrop.classList.add('x-shelf__backdrop--visible');
      this.classList.remove(`x-shelf--${child.position}-mount`);
    }
  }

  _toggleDrawer (evt) {
    evt.stopPropagation();

    let toggler = evt.target;
    while (toggler.parentElement && !toggler.classList.contains('navbar-toggler')) {
      toggler = toggler.parentElement;
    }

    let target = toggler.getAttribute('target');
    let drawer = document.querySelector(target || 'x-drawer');

    if (drawer.opened) {
      drawer.close();
    } else {
      drawer.open();
    }
  }

  _closeDrawer (evt) {
    evt.stopPropagation();

    [...this.children].forEach(child => {
      if (child.tagName === 'X-DRAWER' && child.opened) {
        child.close();
      }
    });
  }
}

define('x-shelf', XShelf);

window.addEventListener('resize', evt => {
  document.querySelectorAll('x-shelf').forEach(shelf => {
    [...shelf.children].forEach(child => {
      if (child.tagName === 'X-DRAWER') {
        if (window.innerWidth > MIN_MOUNTED_WIDTH) {
          child.open();
        } else {
          child.close();
        }
      }
    });
  });
});

export { MIN_MOUNTED_WIDTH };
