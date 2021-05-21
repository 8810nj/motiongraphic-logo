class MotionLogo {

  constructor(canvas, conf) {
    this._canvas = document.getElementById(canvas);
    this._ctx = this._canvas.getContext('2d');
    this.init(conf);
  }

  init(conf) {
    const ratio = window.devicePixelRatio;  // レティナディスプレイ等対応 
    const canvas = this._canvas;
    //const viewBox = {}
    
    canvas.style.width = conf.canvasWidth || '100%';
    canvas.style.height = conf.canvasHeight || '100%';
    canvas.style.backgroundColor = conf.canvasBgColor || '#FFF';
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  getPosition() {
    // Consider Method Chain !!?
    const canvas = this._canvas;
    return {
      center(axis) {
        let result;
        switch(axis) {
          case 'x':
            result = Math.round(canvas.width / 2);
            break;
          case 'y': 
            result = Math.round(canvas.height / 2);
            break;
        }
        return result;
      },
      verticalInterval(rate = 0.25) {
        if(canvas.width / canvas.height >= 1) {
          return canvas.height * rate;
        } else {
          return canvas.width * rate; 
        }
      }
    }
  }

  strokeGrid(color) {
    const canvas = this._canvas;
    const ctx = this._ctx;
    const position = {
      cx: this.getPosition().center('x'),
      cy: this.getPosition().center('y'),
      //offset: this.getPosition().center('x') - this.getPosition().verticalInterval()
      offset: this.getPosition().verticalInterval()
    }

    console.log(position);
    ctx.beginPath();
    ctx.strokeStyle = color;
    // Vertical(L) Line
    ctx.moveTo(position.cx - position.offset, canvas.height);  
    ctx.lineTo(position.cx - position.offset, 0);
    // Vertical(R) Line
    ctx.moveTo(position.cx + position.offset, canvas.height);  
    ctx.lineTo(position.cx + position.offset, 0);
    // horizon Line
    ctx.moveTo(0, position.cy);  
    ctx.lineTo(canvas.width, position.cy);
    // Inclined Line 
    //
    //
    ctx.stroke();

  }

  
}

export default MotionLogo;
