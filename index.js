    var options = { videoId: '9qpZ2sqCRyg', start: 3 };
    $('.wrapper').tubular(options);
    
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

// a variant using fixed canvas size but strecthes the result.
// emulates interference/bad reception
// using a different "noise" algo
canvas.width = canvas.height = 256;

function resize() {
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
}
resize();
window.onresize = resize;

function noise(ctx) {
    
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        idata = ctx.getImageData(0, 0, w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        len = buffer32.length,
        i = 0,
        pr = 456 * Math.random(),
        prs = 716 * Math.random();;

    for(; i < len;) {
        buffer32[i++] = ((pr % 255)|0) << 24;
        pr += prs * 1.2;
    }
    
    ctx.putImageData(idata, 0, 0);
}

var toggle = true;

// added toggle to get 30 FPS instead of 60 FPS
(function loop() {
    toggle = !toggle;
    if (toggle) {
        requestAnimationFrame(loop);
        return;
    }
    noise(ctx);
    requestAnimationFrame(loop);
})();

var eyeSvg = new Vivus('eye-svg', { type: 'delayed', duration: 200, start: 'autostart', mute: false, repeat: true, increaseVolumeBy: 40 }, function(){});
