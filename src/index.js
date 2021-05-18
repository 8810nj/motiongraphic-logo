import mgLogo from './modules/MotionGraphicLogo/index.mjs'; 

const viewBox = initViewBox('js__motiongraphic-logo', '100%', '90vh');
  console.log('containerWidth: ', viewBox.width);
  console.log('containerHeight: ', viewBox.height);

const logo = new mgLogo('js__motiongraphic-logo',
  {
    canvasWidth: viewBox.width,
    canvasHeight: viewBox.height,
    canvasBgColor: '#696969'  
  }
);

logo.strokeGrid();

// initialize viewbox 
function initViewBox(id, width, height) {
  const el = document.getElementById(id);
  const elWidth = width || '100%';
  const elHeight = height || '100%';
  
    el.style.width = elWidth;
    el.style.height = elHeight;


    return {
        width: (el.clientWidth < el.clientHeight)? el.clientWidth: el.clientHeight,
        height: el.clientHeight 
    }
}

//console.log(window.devicePixelRatio);
