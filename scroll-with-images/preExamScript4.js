

let speed = 0;
let position = 0;
let box = document.getElementById('box');
let elems = [...document.querySelectorAll('.n')];



window.addEventListener('wheel', (e) => {speed += e.deltaY * 0.0002})


let objs = Array(5).fill({dist:0})





function run()
 {
     
    position += speed;
    speed*=0.94;
     

    //Disappering bars after scroll
    objs.forEach((at,i) => 
    {
        at.dist = Math.min(Math.abs(position - i ),1);
        
        at.dist = 1 - at.dist**2;
        
        elems[i].style.transform = `scale(${at.dist})`


        //console.log(i,at.dist)
    })







    rounded = Math.round(position);


    let diff = (rounded - position);




    //position += diff*0.015

    
    //Trying some stuff
    //position += Math.abs(diff)*0.015;


    //Makes coming back effect is quicker but with unnessesary vibration
    //position += Math.sign(diff)*0.015;


    

    
    //coming back effect works only for scroll up
    //scroll down has no coming back effect
    //scroll down slowly slides down without stopping which is really good for some projects
    //position += Math.pow(Math.abs(diff),0.7)*0.015;



    position += Math.sign(diff)*Math.pow(Math.abs(diff),0.7)*0.015;




    box.style.transform = `translate(0,${position *100}px)`

    
    window.requestAnimationFrame(run)
    //console.log(position,speed,rounded,diff)
 }


 run()