
let speed = 0;
let position = 0;
let box = document.getElementById('box')

window.addEventListener('wheel', (e) => {
    speed += e.deltaY * 0.2
})



function run()
 {
     //console.log(speed)
     
    box.style.transform = `translate(0,${speed}px)`
    window.requestAnimationFrame(run)
 }


 run()