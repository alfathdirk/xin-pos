import { define, Component } from '@xinix/xin';
import { MIN_MOUNTED_WIDTH } from './x-shelf';

import './x-drawer.scss';

class XDrawer extends Component {
  get props () {
    return Object.assign({}, super.props, {
      position: {
        type: String,
        value: 'right',
      },
    });
  }

  get listeners () {
    return {
      'click a[href]': '_linkClicked(evt)',
    };
  }

  ready () {
    super.ready();

    this.setAttribute('position', this.position);
  }

  attached () {
    super.attached();

    if (this.parentElement.tagName !== 'X-SHELF') {
      throw new Error('X-DRAWER must be child of X-SHELF');
    }

    if (window.innerWidth > MIN_MOUNTED_WIDTH) {
      this.open();
    } else {
      this.close();
    }
  }

  close () {
    this.classList.add('x-drawer--hidden');
    this.parentElement.dismount(this);
  }

  open () {
    this.parentElement.mount(this);
    this.classList.remove('x-drawer--hidden');
  }

  get opened () {
    return !this.classList.contains('x-drawer--hidden');
  }

  _linkClicked (evt) {
    if (window.innerWidth <= MIN_MOUNTED_WIDTH) {
      this.close();
    }
  }
}

define('x-drawer', XDrawer);
