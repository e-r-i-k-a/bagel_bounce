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
      drag: false,
      size: 250,
      radius: 125,
      x: (canvas.width / 2) - 125,
      y: (canvas.height / 2) - 125,
      dx: 2,
      dy: -2,
      vy: 1,
      draw: function () {
        let img = new Image();
        img.src = '/images/bagel.png'
        ctx.drawImage(img, this.x, this.y, this.size, this.size)
      }
    };
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      bagel.draw();
      if (!bagel.selected){
        bagel.x += bagel.dx
        bagel.y += bagel.vy;
        bagel.vy += gravity;
        if (bagel.y + bagel.size > canvas.height + buffer) {
          //if it hits the floor, bounce
          bagel.y = (canvas.height + buffer) - bagel.size;
          bagel.vy *= -bounce;
          if (Math.abs(bagel.vy) < .8) {
            //if it also has low velocity, slow to stop
            bagel.dx *= bounce;
            bagel.dy *= bounce;
            bagel.vy = 0;
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
      if (e && e.touches.length === 1) {
        let touchX = e.touches[0].pageX;
        let touchY = e.touches[0].pageY;
        let x1 = bagel.x + bagel.size;
        let y1 = bagel.y + bagel.size;
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
          bagel.drag = false
      }
    };
    function handleTouchMove(e) {
      e.preventDefault();
      if (bagel.selected) {
        bagel.drag = true;
        let touchX = e.touches[0].pageX;
        let touchY = e.touches[0].pageY;
        bagel.x = touchX - bagel.radius;
        bagel.y = touchY - bagel.radius;
      }
    };
    canvas.addEventListener('touchstart', (e) => {
      handleTouchStart(e, bagel.x, bagel.y, bagel.size)
    });
    canvas.addEventListener('touchmove', (e) => {
      handleTouchMove(e)
    });
    canvas.addEventListener('touchend', handleTouchEnd);

    //run update function continuously
    setInterval(update, 1000 / 60);
  }

  render() {
    return (
      <canvas id='canvas'></canvas>
    )
  }
}
