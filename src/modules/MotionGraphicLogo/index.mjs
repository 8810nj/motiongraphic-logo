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


  getPositions() {
    const canvas = this._canvas, ctx = this._ctx,
          centerX = Math.round(canvas.width / 2),
          centerY = Math.round(canvas.height / 2),
          diagonalX = Math.round((canvas.height / 2) * Math.sqrt(3)), //angle of 60
          offsetX = (() => {
            const rate = 0.25;
            if(canvas.width / canvas.height >= 1) {
              return canvas.height * rate;
            } else {
              return canvas.width * rate; 
            }
          })();

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

  animateMark() {
    const self = this, canvas = this._canvas, ctx = this._ctx,
          position = this.getPositions(), mark = this.drawCircle,
          fps = 30.0, frameLength = 1.0, radius = 4, alpha = 0.4;
    let reqAnimationId, startTime, x = 0, y = 0; 

    function loop(timestamp) {
      if(x > canvas.width || y > canvas.height) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(reqAnimationId);
        return;
      }

      ctx.globalAlpha = alpha; 
      ctx.fillStyle = 'white';  
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      reqAnimationId = window.requestAnimationFrame(loop);

      //let frame = Math.floor((timestamp - startTime) / (1000.0 / fps) % frameLength);
      let frame = Math.floor((timestamp - startTime) / (1000.0 / fps));

      ctx.globalAlpha = 1;
      mark(ctx, x, y, radius, 'gold');

      //y += (frameLength + frame);
      y += (frameLength * frame);

    } //END - function loop

    window.requestAnimationFrame(function(timestamp) {
      x = position.verticalL.from[0];
      y = position.verticalL.from[1];
      startTime = performance.now();
      new loop(timestamp);
    });
  } // END - motionLineTest


} //END - Module

export default MotionLogo;
