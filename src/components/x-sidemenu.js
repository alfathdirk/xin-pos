import { define, Component } from '@xinix/xin';
import $ from 'jquery';

import './x-sidemenu.scss';

class XSideMenu extends Component {
  get template () {
    return require('./x-sidemenu.html');
  }

  attached () {
    super.attached();

    this.__app.use(async (ctx, next) => {
      this.querySelectorAll('a.list-group-item').forEach(el => {
        if (el.href.split('#!').pop() === ctx.uri) {
          el.classList.add('active');
          let collapseEl = el.closest('.collapse');
          if (collapseEl) {
            $(collapseEl).collapse('show');
          }
        } else {
          el.classList.remove('active');
        }
      });

      await next();
    });
  }
}

define('x-sidemenu', XSideMenu);
