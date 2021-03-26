// import * as THREE from './three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import * as dat from 'dat.gui'





//Stats like FPS..
let stats = new Stats()
document.body.appendChild( stats.dom );


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('.webgl')



// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('grey');


//Loaders
const texture = new THREE.TextureLoader().load('static/pic/btc.jpg');
const texture2 = new THREE.TextureLoader().load( 'static/pic/2.jpg' );
const texture3 = new THREE.TextureLoader().load( 'static/pic/33.jpg' );
const texture4 = new THREE.TextureLoader().load( 'static/pic/44.jpg' );
const texture5 = new THREE.TextureLoader().load( 'static/pic/5.jpg' );






/**
 * Object
 */
const geometry = new THREE.PlaneGeometry(1.5, 1, 20, 20)
const material = new THREE.MeshBasicMaterial()
material.map = texture


//<---------------------------------------------------------------------------->
// This solution about bending inner and giving depth
    // let axis = new THREE.Vector3(0, 1, 0);
    // let axisPosition = new THREE.Vector3(-2, 0, 2); // orginal was new THREE.Vector3(-2, 0, 2)

    // let apositions = geometry.attributes.position;
    // let vertex = new THREE.Vector3();
    
    // for (let i = 0; i < apositions.count; i++) {




    //   vertex.fromBufferAttribute(apositions, i);
        
    //   let length = vertex.x - axisPosition.x;
    //   let angle = length / axisPosition.z;

    //   vertex.setX(0).setZ(-axisPosition.z).applyAxisAngle(axis, -angle).add(axisPosition);

    //   apositions.setXYZ(i, vertex.x, vertex.y, vertex.z);
      
    // }



//<---------------------------------------------------------------------------->

//Solution to bend the planes written by me 

const positionAttribute = geometry.getAttribute( 'position' );

const vertex = new THREE.Vector3();

for ( let i = 0; i < positionAttribute.count; i ++ ) {

	vertex.fromBufferAttribute( positionAttribute, i ); // read vertex
	
	


    //console.log(vertex.y)
    //vertex.z -= Math.cos(vertex.x*2)*0.12 makesa inner bending
    vertex.z += Math.cos(vertex.x*1.2)*0.12



	positionAttribute.setXYZ( i, vertex.x, vertex.y, vertex.z ); // write coordinates back


}

//<---------------------------------------------------------------------------->


const plane = new THREE.Mesh(geometry, material)
//plane.geometry.colorsNeedUpdate = true

const material2 = new THREE.MeshBasicMaterial({})
material2.map = texture2
const plane2 = new THREE.Mesh(geometry, material2)
plane2.position.y = plane.position.y + 1.2 ;


const material3 = new THREE.MeshBasicMaterial({})
material3.map = texture3
const plane3 = new THREE.Mesh(geometry, material3)
plane3.position.y = plane2.position.y + 1.2 ;


const material4 = new THREE.MeshBasicMaterial({})
material4.map = texture4
const plane4 = new THREE.Mesh(geometry, material4)
plane4.position.y = plane3.position.y + 1.2 ;


const material5 = new THREE.MeshBasicMaterial({})
material5.map = texture5
const plane5 = new THREE.Mesh(geometry, material5)
plane5.position.y = plane4.position.y + 1.2 ;


const group = new THREE.Group();
group.add(plane,plane2,plane3,plane4,plane5)
//group.rotateY(12.2*Math.PI) // for inner bending solution
group.rotateY(12.2) // for my bending solution
group.rotateX(-0.1) 
group.rotateZ(-0.1) 
group.translateX(0.6)


let planeAr = [plane,plane2,plane3,plane4,plane5]



scene.add(group)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height =window.innerHeight
    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    //Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 2   //1.6
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false
controls.enableRotate = false


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




//Dom Events

let domEvents = new THREEx.DomEvents(camera, renderer.domElement);

domEvents.addEventListener(plane, 'click', function(e){
	plane.position.set(0,0,0)
}, false)


/**
 * Animate
 */
const clock = new THREE.Clock()


let elapsedTime

 const tick = () =>
{
    elapsedTime = clock.getElapsedTime()

    group.position.y = Math.sin(elapsedTime*0.97)*0.02;

    texture.offset.y = Math.sin(elapsedTime*0.99)*0.02;
    texture2.offset.y = Math.sin(elapsedTime*0.99)*0.02;
    texture3.offset.y = Math.sin(elapsedTime*0.99)*0.02;
    texture4.offset.y = Math.sin(elapsedTime*0.99)*0.02;
    texture5.offset.y = Math.sin(elapsedTime*0.99)*0.02;



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    //Stats
    stats.update();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
























let speed = 0;
let position = 0;
let box = document.getElementById('box');
let wrap = document.getElementById('wrap');
let elems = [...document.querySelectorAll('.n')];



window.addEventListener('wheel', (e) => {speed += e.deltaY * 0.0002})


let objs = Array(5).fill({dist:0})





function run()
 {
     
    position += speed;
    speed*=0.94;
     


    objs.forEach((at,i) => 
{
        at.dist = Math.min(Math.abs(position - i ),1);
        
        at.dist = 1 - at.dist**2;
        
        //elems[i].style.transform = `scale(${1 + at.dist})`

        elems[i].style.transform = `scale(${1 + 0.4* at.dist})`



        //console.log(i,at.dist)

         
    plane.position.y = 0 + -position*1.2
    plane2.position.y = 1*1.2  + -position*1.2
    plane3.position.y = 2*1.2  + -position*1.2
    plane4.position.y = 3*1.3  + -position*1.3
    plane5.position.y = 4*1.2 + -position*1.2
  

   let scaleP = 1 + 0.5* at.dist

 //console.log(scaleP)
   planeAr[i].scale.set(scaleP,scaleP,scaleP)
   
  
    //Scroll fading color animation
    let R = Math.floor(at.dist*10.1)

    
    //let aColor = new THREE.Color(`#98819${R}`)
    
    //planeAr[i].material.color= aColor



Math.floor(scaleP)

    let rounded = Math.round(position);
    //console.log()


    //let z =0.99+ -Math.tan(elapsedTime*1)*0.01 *0.3
    // let z = 0.99-0.1*at.dist* (2-at.dist)

    // switch(rounded)
    // {
    //     case 0 && -0:
            
    //         texture.repeat.set(0.97*z,0.97*z);
    //         break;
    //     case 1:
            
    //         texture2.repeat.set(0.98*z,0.98*z);
    //         break;



    //     default:
    //         texture.repeat.set(1,1);
    //         texture2.repeat.set(1,1)

    // }

    //texture2.repeat.set(Math.floor(scaleP)*0.20,Math.floor(scaleP)*0.20 );
   







    
    
})


    let rounded = Math.round(position);


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



    wrap.style.transform = `translate(0,${-position *100}px)`

 
    window.requestAnimationFrame(run)
    //console.log(position,speed,rounded,diff)
    
 }


 run()

 