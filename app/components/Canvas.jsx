import React, { Component } from 'react';

export default class Canvas extends Component {

  componentDidMount() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const gravity = 0.2;
    const bounce = 0.7;
    const buffer = 10;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const img = new Image()
    img.src = '/images/bagel.png'
    let bagel = {
      selected: false,
      size: (canvas.width < 480) ? 125 : 215,
      x: (canvas.width / 2) - 75,
      y: (canvas.height / 2) - 75,
      dx: 2,
      dy: 1,
      offsetX: null,
      offsetY: null,
      draw: function () {
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
          if (Math.abs(bagel.dy) < 1.18) {
            //if it also has low velocity, slow to stop
            bagel.dx = 0;
            bagel.dy = 0;
            bagel.gravity = 0;
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
    function handleStart(e, type) {
      e.preventDefault();
      let touchX, touchY;
      let x1 = bagel.x + bagel.size;
      let y1 = bagel.y + bagel.size;
      if (e.touches && e.touches[0]) {
        //only respond to one finger
        touchX = e.touches[0].pageX;
        touchY = e.touches[0].pageY;
      } else if (type === 'mouse' && e.pageX && e.pageY) {
        touchX = e.pageX;
        touchY = e.pageY;
      }
      //offset = how far into the bagel object was touched
      bagel.offsetX = touchX - bagel.x;
      bagel.offsetY = touchY - bagel.y;
      if (touchX > bagel.x && touchX < x1 && touchY > bagel.y && touchY < y1) {
        //if bagel is touched, mark as selected
        bagel.selected = true;
      }
    };
    function handleEnd(e) {
      e.preventDefault();
      if (bagel.selected) {
        bagel.selected = false,
        bagel.offsetX = null,
        bagel.offsetY = null
      }
    };
    function handleMove(e, type) {
      e.preventDefault();
      if (bagel.selected) {
        let touchX, touchY;
        if (type === 'touch') {
          touchX = e.touches[0].pageX;
          touchY = e.touches[0].pageY;
        } else if (type === 'mouse') {
          touchX = e.pageX;
          touchY = e.pageY;
        }
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

    canvas.addEventListener('touchstart', (e) => { handleStart(e, 'touch') });
    canvas.addEventListener('mousedown', (e) => { handleStart(e, 'mouse') });
    canvas.addEventListener('touchmove', (e) => { handleMove(e, 'touch') });
    canvas.addEventListener('mousemove', (e) => { handleMove(e, 'mouse') });
    canvas.addEventListener('touchend', handleEnd);
    canvas.addEventListener('mouseup', handleEnd);

    //run update function continuously
    setInterval(update, 1000 / 60);
  }

  render() {
    return (
      <canvas id='canvas'></canvas>
    )
  }
}
