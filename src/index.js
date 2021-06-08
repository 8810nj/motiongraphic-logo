import mgLogo from './modules/MotionGraphicLogo/index.mjs'; 


const logo = new mgLogo('js__motiongraphic-logo',
  {
    canvasWidth: '100%',
    canvasHeight: '90vh',
    //ctxBgColor: '#696969'  
  }
);

//logo.strokeGrid('#CCC', 2);


//////////////

logo.motionLine();
logo.touchLoopStop();


