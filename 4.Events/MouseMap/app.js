document.addEventListener('mousemove', function(e){
    // console.log(e.pageX, e.pageY);
    const r = Math.round(e.pageX * 255  / window.innerWidth);
    const b = Math.round(e.pageY * 255  / window.innerHeight);
    // console.log(r,0,  b);
    const color = `rgb(${r}, 0, ${b})`;
    document.body.style.backgroundColor = color
})