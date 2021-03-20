

let speed = 0;
let position = 0;
let box = document.getElementById('box')

window.addEventListener('wheel', (e) => {
    speed += e.deltaY * 0.0002
})



function run()
 {
     
    position += speed;
    speed*=0.94;
     

    rounded = Math.round(position);


    let diff = (rounded - position);




    //position += diff*0.015

    //Makes coming back transition is quicker but with unnessesary vibration
    position += Math.sign(diff)*0.015;


    box.style.transform = `translate(0,${position *100}px)`

    
    window.requestAnimationFrame(run)
    console.log(position,speed,rounded)
 }


 run()