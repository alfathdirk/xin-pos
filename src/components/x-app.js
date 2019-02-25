import { define } from '@xinix/xin';
import { App } from '@xinix/xin/components';

import '@xinix/xin/middlewares';

import './x-shelf';
import './x-drawer';
import './x-sidemenu';

class XApp extends App {
  get template () {
    return require('./x-app.html');
  }

  ready () {
    super.ready();

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        console.info('Registering service worker ...');
        let reg = await navigator.serviceWorker.register('./service-worker.js');
        await reg.ready;
        await reg.update();
      });
    }

    this.use(async (ctx, next) => {
      document.body.setAttribute('view', ctx.uri.substr(1));

      await next();
    });
  }

  async updateCache (timeout = 1000) {
    let reg = await navigator.serviceWorker.getRegistration();
    await reg.update();

    this.async(() => {
      window.location.reload();
    }, timeout);
  }
}

define('x-app', XApp);
