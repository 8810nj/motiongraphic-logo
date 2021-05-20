class MotionLogo { constructor(canvas, conf) { this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.init(conf);
  }

  init(conf) {
    /* レティナ対応処理!?
    * const ratio = window.devicePixelRatio;  
    **/
    const canvas = this.canvas;
    const viewBox = () => {
      this.width = conf.canvasWidth || '100%';
      this.height = conf.canvasHeight || '100%';

      canvas.style.width = this.width;
      canvas.style.height = this.height;
      
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      //console.log('viewBox Width', this.width);
      //console.log('viewBox Height', this.height);
    }

    viewBox();
    canvas.style.backgroundColor = conf.canvasBgColor || '#FFF';
  }

  strokeGrid() {
    const canvas = this.canvas;
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.strokeStyle = 'gold';
    ctx.moveTo((canvas.width * 0.25), canvas.height);  
    ctx.lineTo((canvas.width * 0.25), 0);
    ctx.moveTo((canvas.width * 0.75), canvas.height);  
    ctx.lineTo((canvas.width * 0.75), 0);
    ctx.moveTo(0, (canvas.height * 0.5));  
    ctx.lineTo(canvas.width, (canvas.height * 0.5));
    ctx.stroke();

    //console.log(canvas.width * 0.75);
  }

  
}

export default MotionLogo;
