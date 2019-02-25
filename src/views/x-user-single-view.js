import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components';
import { XAlert } from '../components/x-alert';

class XUserSingleView extends View {
  get template () {
    return require('./x-user-single-view.html');
  }

  get props () {
    return Object.assign({}, super.props, {
      form: {
        type: Object,
        value: () => ({}),
      },
    });
  }

  async focused () {
    super.focused();

    try {
      if (this.parameters.id) {
        // FIXME: mock only
        this.set('form', {
          firstname: 'Foo',
          lastname: 'Bar',
          username: 'foo',
          password: 'baz',
        });
      } else {
        this.set('form', {});
      }
    } catch (err) {
      await XAlert.show(err);
      this.__app.navigate('/user/list');
    }
  }

  async doSubmit (evt) {
    evt.preventDefault();

    // FIXME: mocked

    await XAlert.show({ message: 'User created', kind: 'success' });
    this.__app.navigate('/user/list');
  }

  async doDelete (evt) {
    evt.preventDefault();

    // FIXME: mocked

    await XAlert.show({ message: 'User deleted', kind: 'success' });
    this.__app.navigate('/user/list');
  }
}

define('x-user-single-view', XUserSingleView);
