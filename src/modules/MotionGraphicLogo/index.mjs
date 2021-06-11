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

  //getPosition() {
  //  const canvas = this._canvas;
  //  return {
  //    center(axis) {
  //      let result;
  //      switch(axis) {
  //        case 'x':
  //          result = Math.round(canvas.width / 2);
  //          break;
  //        case 'y': 
  //          result = Math.round(canvas.height / 2);
  //          break;
  //      }
  //      return result;
  //    },
  //    verticalInterval(rate = 0.25) {
  //      if(canvas.width / canvas.height >= 1) {
  //        return canvas.height * rate;
  //      } else {
  //        return canvas.width * rate; 
  //      }
  //    },
  //    inclined(angle = 60) {
  //      /* プロトタイプ 
  //      ** tanθ にangle=60 固定で三平方の定理から√3 で三角比の計算を簡易化
  //      ** ToDo: angle 引数を取得し反映できるようにする。
  //      **/
  //      return Math.round((canvas.height / 2) * Math.sqrt(3));
  //    }
  //  }; // End Return;
  //}



  //strokeGrid(strokeStyle, lineWidth) {
  //  const canvas = this._canvas, ctx = this._ctx;
  //  const position = {
  //    cx: this.getPosition().center('x'), // xCenter
  //    cy: this.getPosition().center('y'), // yCenter
  //    offset: this.getPosition().verticalInterval(),
  //    offsetInclinedY: this.getPosition().inclined()
  //  }

  //  ctx.strokeStyle = strokeStyle;
  //  ctx.lineWidth = lineWidth;

  //  const drawStroke = (() => {
  //    ctx.beginPath();
  //    // Vertical(L) Line
  //    ctx.moveTo(position.cx - position.offset, canvas.height);  
  //    ctx.lineTo(position.cx - position.offset, 0);
  //    // Vertical(R) Line
  //    ctx.moveTo(position.cx + position.offset, canvas.height);  
  //    ctx.lineTo(position.cx + position.offset, 0);
  //    // horizon Line
  //    ctx.moveTo(0, position.cy);  
  //    ctx.lineTo(canvas.width, position.cy);
  //    // Inclined Line 
  //    ctx.moveTo(position.cx - position.offsetInclinedY, 0); 
  //    ctx.lineTo(position.cx + position.offsetInclinedY, canvas.height)
  //    ctx.stroke();
  //  })();
  //}

  //getStrokePosition() {
  //  const canvas = this._canvas, ctx = this._ctx;
  //  const position = {
  //    cx: this.getPosition().center('x'), // Center X
  //    cy: this.getPosition().center('y'), // Center Y
  //    offset: this.getPosition().verticalInterval(),
  //    offsetInclinedY: this.getPosition().inclined()
  //  }
  //  const line = position => {
  //    return {
  //      verticalLineL: { // Vertical Line Left
  //        from: [position.cx - position.offset, 0],
  //        to  : [position.cx - position.offset, canvas.height]
  //      },
  //      verticalLineR: { // Vertical Line Right 
  //        from: [position.cx + position.offset, 0],
  //        to  : [position.cx + position.offset, canvas.height]
  //      },
  //      horizonLine: { // Horizon Linne
  //        from: [0, position.cy ],
  //        to  : [canvas.width, position.cy]
  //      },
  //      InclinedLine: { // Inclined Line 
  //        from: [position.cx - position.offsetInclinedY, 0], 
  //        to  : [position.cx + position.offsetInclinedY, canvas.height]
  //      }
  //    }
  //  }
  //  return line(position);
  //}

  getPositions() {
    const canvas = this._canvas, ctx = this._ctx,
          centerX = Math.round(canvas.width / 2),
          centerY = Math.round(canvas.height / 2),
          diagonalX = Math.round((canvas.height / 2) * Math.sqrt(3)), //angle of 60
          offsetX = () => {
            const rate = 0.25;
            if(canvas.width / canvas.height >= 1) {
              return canvas.height * rate;
            } else {
              return canvas.width * rate; 
            }
          };

    return {
      verticalL: {
        from: [centerX - offsetX, 0],
        to  : [centerX - offsetX, canvas.height]
      },
      verticalR: {
        from: [centerX + offsetX, 0],
        to  : [centerX + offsetX, canvas.height]
      },
      horizon: {
        from: [0, centerY ],
        to  : [canvas.width, centerY]
      },
      diagonal: {
        from: [centerX - diagonalX, 0], 
        to  : [centerX + diagonalX, canvas.height]
      }
    }
  }

  drawCircle(ctx, positionX, positionY, radius, color) {
    ctx.beginPath();
    ctx.arc(positionX, positionY, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  /*
  ** startX, startY, 
  **/
  motionLine() {
    const self = this, canvas = this._canvas, ctx = this._ctx;
    const position = this.getPositions();
    const circle = this.drawCircle;
    let x = 0, y = 0, radius = 4, speed = 4, alpha = [0.1, 1]; 

    function loop(timestamp, px, py) {
      if(x > canvas.width || y > canvas.height) return;
      x = px;
      y += py;

      window.requestAnimationFrame(loop.bind(null, 0, x, speed));

      ctx.globalAlpha = alpha[0]; 
      ctx.fillStyle = 'white';  
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = alpha[1];
      circle(ctx, x, y, radius, 'blue');
      y += speed;
      console.log('Y is ', y);
    } //END - function loop
    window.requestAnimationFrame(loop.bind(null, 0, position.verticalLineL.from[0], position.verticalLineL.from[1]));
  } // END - motionLine

  /*
  *
  */
  animateMark(point) {
    const self = this, canvas = this._canvas, ctx = this._ctx,
          position = this.getPositions(),
          mark = this.drawCircle;
    let x = 0, y = 0, radius = 4, speed = 4, alpha = [0.1, 1]; 

    function loop(timestamp, px, py) {
      if(x > canvas.width || y > canvas.height) return;
      x = px;
      y += py;

      window.requestAnimationFrame(loop.bind(null, 0, x, speed));

      ctx.globalAlpha = alpha[0]; 
      ctx.fillStyle = 'white';  
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = alpha[1];
      mark(ctx, x, y, radius, 'gold');
      console.log(mark);
      y += speed;
      console.log('Y is ', y);
    } //END - function loop
    window.requestAnimationFrame(loop.bind(null, 0, position.verticalL.from[0], position.verticalL.from[1]));
  } // END - motionLineTest


} //END - Module

export default MotionLogo;
