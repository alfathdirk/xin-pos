import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components';
import { XAlert } from '../components/x-alert';

import '../components/x-grid';
import '../components/x-pagination';

class XUserListView extends View {
  get template () {
    return require('./x-user-list-view.html');
  }

  get props () {
    return Object.assign({}, super.props, {
      rows: {
        type: Array,
        value: () => ([]),
      },

      skip: {
        type: Number,
      },

      limit: {
        type: Number,
        value: 10,
      },

      count: {
        type: Number,
      },
    });
  }

  async focused () {
    super.focused();

    let skip = this.parameters.skip ? Number(this.parameters.skip) : 0;
    let limit = this.parameters.limit ? Number(this.parameters.limit) : this.limit;
    let rows = [];
    let rowCount = 0;
    try {
      // FIXME: mocked
      rowCount = 15;
      rows = [
        {
          id: 'foo',
          firstname: 'Foo',
          username: 'foo',
        },
        {
          id: 'bar',
          firstname: 'Bar',
          username: 'bar',
        },
        {
          id: 'baz',
          firstname: 'Baz',
          username: 'baz',
        },
      ];
    } catch (err) {
      await XAlert.show(err);
    } finally {
      this.set('rows', rows);
      this.set('count', rowCount);
      this.set('skip', skip);
      this.set('limit', limit);
    }
  }
}

define('x-user-list-view', XUserListView);
