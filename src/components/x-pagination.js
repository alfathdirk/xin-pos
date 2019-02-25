import { define, Component } from '@xinix/xin';

import './x-pagination.scss';

class XPagination extends Component {
  get template () {
    return require('./x-pagination.html');
  }

  get props () {
    return Object.assign({}, super.props, {
      baseUri: {
        type: String,
        required: true,
      },

      skip: {
        type: Number,
        value: 0,
        observer: '_observeSkipLimitCount(skip, limit, count)',
      },

      limit: {
        type: Number,
        value: 10,
        observer: '_observeSkipLimitCount(skip, limit, count)',
      },

      count: {
        type: Number,
        value: 0,
        observer: '_observeSkipLimitCount(skip, limit, count)',
      },
    });
  }

  computeFirst (skip, count) {
    if (!count) {
      return 0;
    }

    return skip + 1;
  }

  computeLast (skip, limit, count) {
    if (!count) {
      return 0;
    }

    let last = skip + limit;
    if (last > count) {
      return count;
    }

    return last;
  }

  gotoPrev (evt) {
    evt.preventDefault();

    let skip = this.skip - this.limit;
    if (skip < 0) {
      skip = 0;
    }

    this.__app.navigate(`${this.baseUri}/skip/${skip}/limit/${this.limit}`);
  }

  gotoNext (evt) {
    evt.preventDefault();

    let skip = this.skip + this.limit;
    if (skip >= this.count) {
      return;
    }

    this.__app.navigate(`${this.baseUri}/skip/${this.skip + this.limit}/limit/${this.limit}`);
  }

  _observeSkipLimitCount (skip, limit, count) {
    this.debounce('_observeSkipLimitCount', () => {
      this.$.prevLink.classList.remove('disabled');
      this.$.nextLink.classList.remove('disabled');

      if (skip <= 0) {
        this.$.prevLink.classList.add('disabled');
      }

      if (skip + limit > count - 1) {
        this.$.nextLink.classList.add('disabled');
      }
    });
  }
}

define('x-pagination', XPagination);
