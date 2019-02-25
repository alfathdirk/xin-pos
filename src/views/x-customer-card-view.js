import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components';
import { XAlert } from '../components/x-alert';
import $ from 'jquery';

import '../components/x-grid';

class XCustomerCardView extends View {
  get template () {
    return require('./x-customer-card-view.html');
  }

  get props () {
    return Object.assign({}, super.props, {
      form: {
        type: Object,
        value: () => ({}),
      },

      mode: {
        type: String,
        value: 'search',
      },

      foundRows: {
        type: Array,
      },
    });
  }

  async focusing (parameters) {
    super.focusing(parameters);

    try {
      if (parameters.id) {
        // FIXME: mocked
        let entry = { id: 'baz', firstname: 'Baz', lastname: 'Kings' };

        this.set('form', entry);
      } else {
        this.set('form', {});
      }
    } catch (err) {
      await XAlert.show(err);
      this.__app.navigate('/customer/search');
    }
  }

  async doSubmit (evt) {
    evt.preventDefault();

    try {
      if (this.mode === 'search') {
        await this._doSearch();
      } else if (this.mode === 'update') {
        await this._doUpdate();
      } else if (this.mode === 'create') {
        await this._doCreate();
      }
    } catch (err) {
      await XAlert.show(err);
    }
  }

  _doSearch () {
    let form = this._filterCriteria(this.form);
    if (!form) {
      return;
    }

    // FIXME: mocked

    let entries = [
      { id: 'foo', firstname: 'Foo', lastname: 'Kings' },
      { id: 'bar', firstname: 'Bar', lastname: 'Kings' },
      { id: 'baz', firstname: 'Baz', lastname: 'Kings' },
    ];
    this.set('foundRows', entries);

    $(this.$.modal).modal();
  }

  async _doCreate () {
    // FIXME: mocked

    await XAlert.show({ message: 'New customer added', kind: 'success' });
    this.__app.navigate('/customer/search');
  }

  async _doUpdate () {
    // FIXME: mocked

    await XAlert.show({ message: 'Customer updated', kind: 'success' });
    this.__app.navigate('/customer/search');
  }

  async doDelete (evt) {
    evt.preventDefault();

    // FIXME: mocked

    await XAlert.show({ message: 'Customer deleted', kind: 'success' });
    this.__app.navigate('/customer/search');
  }

  _isHiddenButton (button, mode) {
    if (button === 'search') {
      return mode === 'search';
    }

    return mode !== 'search';
  }

  _computeSubmitButtonLabel (mode) {
    if (mode === 'search') {
      return 'Search';
    }

    return 'Save';
  }

  _filterCriteria (form) {
    let keys = Object.keys(form);
    if (keys.length === 0) {
      return;
    }

    let result = {};
    for (let i in form) {
      if (form[i]) {
        result[i] = form[i];
      }
    }

    return result;
  }

  async _selectChecked (evt, row) {
    evt.preventDefault();

    await new Promise(resolve => {
      $(this.$.modal).one('hidden.bs.modal', resolve);
      $(this.$.modal).modal('hide');
    });

    this.__app.navigate(`/customer/edit/${row.id}`);
  }
}

define('x-customer-card-view', XCustomerCardView);
