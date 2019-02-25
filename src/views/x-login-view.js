import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components';
import { XAlert } from '../components/x-alert';

import './x-login-view.scss';

class XLoginView extends View {
  get template () {
    return require('./x-login-view.html');
  }

  async doLogin (evt) {
    evt.preventDefault();

    await XAlert.show({ message: 'Logging in...', kind: 'success' });
    this.__app.navigate('/');
  }
}

define('x-login-view', XLoginView);
