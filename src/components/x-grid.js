import { define, Component } from '@xinix/xin';

import './x-grid.scss';

class XGrid extends Component {
  ready () {
    super.ready();

    let thead = document.importNode(this.$.header.querySelector('thead'), true);
    this.$.body.querySelector('table').insertBefore(thead, this.$.body.querySelector('table').children[0]);
  }
}

define('x-grid', XGrid);
