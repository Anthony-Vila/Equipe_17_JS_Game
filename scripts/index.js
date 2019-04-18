let star , specialStar
let randomX , randomY , randomSize
let starContainer = document.querySelector('#img__container')
let stars = new Array()

//create the functions to place the stars at random locations in the window
function getRandomPosition(element) {
	var x = document.body.offsetHeight-element.clientHeight
	var y = document.body.offsetWidth-element.clientWidth
	var randomX = Math.floor(Math.random()*x)
	var randomY = Math.floor(Math.random()*y)
	return [randomX,randomY]
}

//creates 300 images of stars
for (let i=0; i<200;i++){
window.onload=etoileBackground()
  function etoileBackground () {
    var randomSize = Math.floor(Math.random()*22)  //gives a random size to the star
    var star = document.createElement("IMG")
    star.classList.add("star")
    star.setAttribute("src", "images/etoile.png")
    star.style.filter = "blur(2px)"				//adds blur on all the stars
    star.classList.add("rotating")      //adds the class rotation to make the stars rotate
    star.style.position = "absolute"
    star.style.transition ="all 1s"
    starContainer.appendChild(star)		//adds them in a container
    var xy = getRandomPosition(star)
	  star.style.top = xy[0] + 'px'      //places them randomly
	  star.style.left = xy[1] + 'px'
    star.style.width = randomSize + 'px'    //gives them a random size
    star.style.height = randomSize + 'px'
  }
}
setInterval(function(){
  stars = document.querySelectorAll('.star')
   for(let i=0; i<stars.length;i++){
    specialStar = stars[Math.floor(Math.random()*stars.length)]   //selects a random star
    specialStar.classList.toggle("specialStar")   //toggle between blur and not blur
   }
}, 3000)
