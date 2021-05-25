import mgLogo from './modules/MotionGraphicLogo/index.mjs'; 


const logo = new mgLogo('js__motiongraphic-logo',
  {
    canvasWidth: '100%',
    canvasHeight: '90vh',
    canvasBgColor: '#696969'  
  }
);

logo.strokeGrid('gold', 2);


//////////////

console.log(logo.motionLine('red', 2));

