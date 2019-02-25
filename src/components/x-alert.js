import { define, Component } from '@xinix/xin';

import './x-alert.scss';

export class XAlert extends Component {
  get template () {
    return `
      <div id="message">[[message]]</div>
      <button type="button" class="close" data-dismiss="alert">
        <span aria-hidden="true">&times;</span>
      </button>
    `;
  }
  get props () {
    return Object.assign({}, super.props, {
      message: {
        type: String,
        value: '',
      },

      kind: {
        type: String,
        value: 'danger',
      },

      timeout: {
        type: Number,
        value: 5000,
      },
    });
  }

  created () {
    super.created();

    this.classList.add('alert');
  }

  attached () {
    super.attached();

    this.classList.add(`alert-${this.kind}`);
    container.classList.add('x-alert--visible');

    let timeout = Number(this.timeout || 0);
    if (timeout) {
      this.async(() => {
        container.removeChild(this);
      }, timeout);
    }
  }

  detached () {
    super.detached();

    if (container.children.length === 0) {
      container.classList.remove('x-alert--visible');
    }
  }

  static show ({ message = '', timeout = 5000, kind = 'danger' }) {
    let d = document.createElement('div');
    d.innerHTML = `<x-alert message="${message}" timeout="${timeout}" kind="${kind}"></x-alert>`;
    let alert = d.querySelector('x-alert');
    container.appendChild(alert);
    return alert;
  }
}

define('x-alert', XAlert);

let container = document.querySelector('.x-alert__container');
if (!container) {
  container = document.createElement('div');
  container.classList.add('x-alert__container');
  document.body.appendChild(container);
}
