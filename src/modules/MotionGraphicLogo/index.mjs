class MotionLogo {

  constructor(canvas, conf) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.init(conf);
  }

  init(conf) {
    const canvas = this.canvas;
    /* レティナ対応処理!?
    * const ratio = window.devicePixelRatio;  
    **/
    canvas.width = conf.canvasWidth || canvas.parentNode.clientWidth;
    canvas.height = conf.canvasHeight || canvas.parentNode.clientHeight;
    canvas.style.backgroundColor = conf.canvasBgColor || '#FFF';
  }

  strokeGrid() {
    const canvas = this.canvas;
    const ctx = this.ctx;
    //const el = document.getElementById(this.canvas.id);
    //const w = canvas.width;


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
