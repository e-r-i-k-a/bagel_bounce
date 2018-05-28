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
    let selected = this.state.selected
    return (
      <main>
        <div id='menu-closed-logo'
          style={{ display: selected ? 'none' : 'flex' }}
          onClick={e => this.handleExpand(e)}>
          <img id='menu-closed-logo-icon' src='/images/menu.png'></img>
        </div>
        <div id='menu-open'
          style={{ display: selected ? 'flex' : 'none' }}>
          <div id='menu-open-logo'
            onClick={e => this.handleCollapse(e)}>
            <img id='menu-open-logo-icon' src='/images/close.png'></img>
          </div>
          <div id='info'>
            <h1>&#161;BAGEL BOUNCE!</h1>
            <div id='info-detail'>
              <p> Use your </p>
              <img id='info-detail-img' src='/images/finger.gif'></img>
              <p> to drag and bounce the bagel!</p>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
