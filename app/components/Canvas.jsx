import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const gravity = 0.2;
    const bounce = 0.7;
    const buffer = 10;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let bagel = {
      selected: false,
      size: 250,
      radius: 125,
      x: (canvas.width / 2) - 125,
      y: (canvas.height / 2) - 125,
      dx: 2,
      dy: 1,
      offsetX: null,
      offsetY: null,
      draw: function () {
        let img = new Image();
        img.src = '/images/bagel.png'
        ctx.drawImage(img, this.x, this.y, this.size, this.size)
      }
    };
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      bagel.draw();
      if (!bagel.selected) {
        bagel.x += bagel.dx
        bagel.y += bagel.dy
        bagel.dy += gravity;
        if (bagel.y + bagel.size > canvas.height + buffer) {
          //if it hits the floor, bounce
          bagel.y = (canvas.height + buffer) - bagel.size;
          bagel.dy *= -bounce;
          if (Math.abs(bagel.dy) < .8) {
            //if it also has low velocity, slow to stop
            bagel.dx *= bounce;
            bagel.dy = 0;
          }
        }
        if (bagel.y + bagel.dy <= -buffer) {
          //if it hits the top, reverse
          bagel.dy = -bagel.dy;
        }
        if (bagel.x + bagel.dx <= -buffer || bagel.x + bagel.dx > canvas.width - bagel.size + buffer) {
          //if it hits either side, reverse
          bagel.dx = -bagel.dx;
        }
      }
    };
    //event listeners
    function handleTouchStart(e) {
      e.preventDefault();
      if (e.touches.length === 1) {
        let touchX = e.touches[0].pageX;
        let touchY = e.touches[0].pageY;
        let x1 = bagel.x + bagel.size;
        let y1 = bagel.y + bagel.size;
        bagel.offsetX = touchX - bagel.x;
        bagel.offsetY = touchY - bagel.y;
        if (touchX > bagel.x && touchX < x1 && touchY > bagel.y && touchY < y1) {
          //if bagel is touched, mark as selected
          bagel.selected = true;
        }
      }
    };
    function handleTouchEnd(e) {
      e.preventDefault();
      if (bagel.selected) {
          bagel.selected = false,
          bagel.offsetX = null,
          bagel.offsetY = null
      }
    };
    function handleTouchMove(e) {
      e.preventDefault();
      if (bagel.selected) {
        let touchX = e.touches[0].pageX;
        let touchY = e.touches[0].pageY;
        let moveX = touchX - bagel.offsetX;
        let moveY = touchY - bagel.offsetY;
        //below stops drag from moving outside the window
        if (moveX <= -buffer) {
          bagel.x = -buffer
        } else if (moveX > canvas.width - bagel.size + buffer) {
          bagel.x = canvas.width - bagel.size + buffer
        } else {
          bagel.x = moveX
        }
        if (moveY <= -buffer) {
          bagel.y = -buffer
        } else if (moveY + bagel.size > canvas.height + buffer) {
          bagel.y = canvas.height - bagel.size + buffer;
        } else {
          bagel.y = moveY;
        }
      }
    };
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchmove', handleTouchMove);

    //run update function continuously
    setInterval(update, 1000 / 60);
  }

  render() {
    return (
      <canvas id='canvas'></canvas>
    )
  }
}
