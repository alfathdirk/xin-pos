import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components';

class XHomeView extends View {
  get template () {
    return require('./x-home-view.html');
  }
}

define('x-home-view', XHomeView);
