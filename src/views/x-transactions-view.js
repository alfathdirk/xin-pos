import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components';
import { XAlert } from '../components/x-alert';

import './x-transactions-view.scss';

class XTransactions extends View {
  get template () {
    return require('./x-transactions-view.html');
  }

  get props () {
    return Object.assign({}, super.props, {
      listMenu: {
        type: Array,
        value: () => ([]),
      },
      currentCarts: {
        type: Array,
        value: () => ([]),
      },
      selectedModal: {
        type: Object,
        value: () => ([]),
      },
      totalItem: {
        type: String,
        value: '',
      },
      discount: {
        type: String,
        value: 0,
      },
      totalAmount: {
        type: String,
        value: 0,
      },
    });
  }

  doSelectedMenu (menu) {
    let idx = this.currentCarts.findIndex((v) => v === menu);
    if (idx === -1) {
      this.push('currentCarts', menu);
      this.set('totalItem', this.currentCarts.length);
      this.getTotalAmount();
    }
  }

  doMinus (cart) {
    let idx = this.currentCarts.findIndex((v) => v === cart);
    this.currentCarts[idx].stock -= 1;
    this.currentCarts[idx].totalPrice = this.currentCarts[idx].price * this.currentCarts[idx].stock;
    this.destroyCart();
  }

  destroyCart () {
    this.getTotalAmount();
    let cartz = this.currentCarts;
    this.set({ 'currentCarts': [] });
    this.set({ 'currentCarts': cartz });
  }

  doPlus (cart) {
    let idx = this.currentCarts.findIndex((v) => v === cart);
    this.currentCarts[idx].stock += 1;
    this.currentCarts[idx].totalPrice = this.currentCarts[idx].price * this.currentCarts[idx].stock;
    this.destroyCart();
  }

  onModalShow (cart) {
    this.set('selectedModal', cart);
  }

  editCart () {
    let idx = this.currentCarts.findIndex((v) => v.id === this.selectedModal.id);
    this.currentCarts[idx].totalPrice = this.currentCarts[idx].price * this.currentCarts[idx].stock;
    this.destroyCart();
  }

  getTotalAmount () {
    let totalAmount = 0;
    this.currentCarts.map((v) => {
      totalAmount += parseInt(v.totalPrice);
    });
    this.set('totalAmount', totalAmount);
  }

  focused () {
    super.focused();

    this.set({
      listMenu: [{
        id: 1,
        name: 'Ayam Bakar',
        img: 'http://localhost/restaurant/img/d2.jpg',
        price: '10000',
        stock: 1,
        totalPrice: '10000',
      },{
        id: 2,
        name: 'Ayam Goreng',
        img: 'http://localhost/restaurant/img/d2.jpg',
        price: '12000',
        stock: 1,
        totalPrice: '12000',
      }],
    });
  }
}

define('x-transactions-view', XTransactions);
