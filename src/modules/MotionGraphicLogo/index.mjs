class MotionLogo {

  constructor(elementId, conf) {
    this._canvas = document.getElementById(elementId);
    this._ctx = this._canvas.getContext('2d');
    //this.ratio = window.devicePixelRatio;  // レティナディスプレイ等対応 
    this.init(conf);
    this.initRequestAnimationFrame();
  }

  init(conf) {
    /*
    ** Window[load || resize] イベントで呼ばれることを期待する初期化メソッド
    **
    ** Configration Parameters 
    ** - canvasWidth
    ** - canvasHeight
    ** - ctxBgColor(Back Ground Color)
    ** - ctxBlColor(Back Line Color)
    **/

    const canvas = this._canvas;
    const ctx = this._ctx;

    //const viewBox = {}
    
    canvas.style.width = conf.canvasWidth || '100%';
    canvas.style.height = conf.canvasHeight || '100%';
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.fillStyle = conf.ctxBgColor || '#FFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  initRequestAnimationFrame() {
    window.reqAnimationFrame = (function() {
      return 
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(cb){
          window.setTimeout(cb, 1000 / 60);
        };
    })();
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
      },
      inclined(angle = 60) {
        /* プロトタイプ 
        ** tanθ にangle=60 固定で三平方の定理から√3 で三角比の計算を簡易化
        ** ToDo: angle 引数を取得し反映できるようにする。
        **/

        const tempVar = Math.sqrt(3);

        const inclinedY = () => {
            return Math.round((canvas.height / 2) * tempVar);
        }
        return inclinedY();

      }
    }; // End Return;
  }

  strokeGrid(strokeStyle, lineWidth) {
    const canvas = this._canvas;
    const ctx = this._ctx;
    const position = {
      cx: this.getPosition().center('x'), // xCenter
      cy: this.getPosition().center('y'), // yCenter
      offset: this.getPosition().verticalInterval(),
      offsetInclinedY: this.getPosition().inclined()

    }

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;


    //console.log(position);
    ctx.beginPath();
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
    ctx.moveTo(position.cx - position.offsetInclinedY, 0); 
    ctx.lineTo(position.cx + position.offsetInclinedY, canvas.height)
    //
    ctx.stroke();

  }

  drawCircle(ctx, x, y, r, c) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
    
  }

  motionLine(fillStyle, lineWidth) {
    const canvas = this._canvas, ctx = this._ctx;
    const self = this;
    const position = {
      cx: this.getPosition().center('x'),
      cy: this.getPosition().center('y'),
      offset: this.getPosition().verticalInterval(),
      offsetInclinedY: this.getPosition().inclined()
    }
    let x = (position.cx - position.offset), y = 0; 
    const radius = 4, speed = 8; 

    (function loop() {

      window.requestAnimationFrame(loop);
      //window.reqAnimationFrame(loop);
      
      ctx.globalAlpha = 0.1;
      //ctx.fillStyle = ctx.fillStyle;  
      ctx.fillStyle = 'white';  
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      self.drawCircle(ctx, x, y, radius, 'gold');
      y += speed;


    })();
    //loop();
    //console.log(y);
  }

  
}

export default MotionLogo;
