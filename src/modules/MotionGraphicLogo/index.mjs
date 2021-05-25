class MotionLogo {

  constructor(canvas, conf) {
    this._canvas = document.getElementById(canvas);
    this._ctx = this._canvas.getContext('2d');
    this.init(conf);
  }

  init(conf) {
    /*
    ** conf 
    ** - canvasWidth
    ** - canvasHeight
    ** - canvasBgColor(Back Ground Color)
    ** - canvasBlColor(Back Line Color)
    **/
    const ratio = window.devicePixelRatio;  // レティナディスプレイ等対応 
    const canvas = this._canvas;
    const ctx = this._ctx;
    //const viewBox = {}
    
    canvas.style.width = conf.canvasWidth || '100%';
    canvas.style.height = conf.canvasHeight || '100%';
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.fillStyle = conf.canvasBgColor || '#FFF';
    //ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    window.requestAnimFrame = (function(){
      return (
        window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
          window.setTimeout(callback, 1000 / 60);
        }
      );
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
      cx: this.getPosition().center('x'),
      cy: this.getPosition().center('y'),
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

  motionLine(fillStyle, lineWidth) {
    const canvas = this._canvas;
    const ctx = this._ctx;
    const position = {
      cx: this.getPosition().center('x'),
      cy: this.getPosition().center('y'),
      offset: this.getPosition().verticalInterval(),
      offsetInclinedY: this.getPosition().inclined()

    }
    const r = 8;
    const speed = 2;
    let x = position.cx - position.offset;
    let y = 0;

    //ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;

    (function loop() {
      window.requestAnimFrame(loop);

      ctx.globalAlpha = 0.1;
      ctx.fill(); 
      ctx.globalAlpha = 1;

      y += speed;

      if(y > canvas.height) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      ctx.beginPath(); // パスの初期化
      ctx.arc(x, y, r, 0, Math.PI * 2, true); // (100, 50)の位置に半径30pxの円
      ctx.closePath(); // パスを閉じる
      ctx.fill(); // 軌跡の範囲を塗りつぶす


    })();
  }

  
}

export default MotionLogo;
