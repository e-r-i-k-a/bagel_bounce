import React, { Component } from 'react';

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
    this.handleExpand = this.handleExpand.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleExpand(e) {
    e.preventDefault();
    this.setState({ selected: true })
  }

  handleCollapse(e) {
    e.preventDefault();
    this.setState({ selected: false })
  }

  render() {
    if (!this.state.selected) {
      return (
        <div id='menu-closed-logo'
          onClick={e => this.handleExpand(e)}>
          <img id='menu-closed-img-logo' src='/images/menu.png'></img>
        </div>
      )
    } else {
      return (
        <div id='menu-open'>
          <div id='menu-open-logo'
            onClick={e => this.handleCollapse(e)}>
            <img id='menu-open-img-logo' src='/images/close.png'></img>
          </div>
          <div id='info'>
            <h1>BAGEL BOUNCE!</h1>
            <div id='info-detail'>
              <p> Use your </p>
              <img id='info-detail-img' src='/images/finger.gif'></img>
              <p> to drag and bounce the</p>
            </div>
          </div>
        </div>
      )
    }
  }
}
