import mgLogo from './modules/MotionGraphicLogo/index.mjs'; 

const logo = new mgLogo('js__motiongraphic-logo',
  {
    canvasWidth: 1424,
    canvasHeight: 700,
    canvasBgColor: '#696969'  
  }
);

logo.grid();

//console.log(window.devicePixelRatio);
