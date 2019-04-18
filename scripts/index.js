let star , specialStar
let randomX , randomY , randomSize
let starContainer = document.querySelector('#img__container')
  let stars = new Array()

function getRandomPosition(element) {
	var x = document.body.offsetHeight-element.clientHeight
	var y = document.body.offsetWidth-element.clientWidth
	var randomX = Math.floor(Math.random()*x)
	var randomY = Math.floor(Math.random()*y)
	return [randomX,randomY]
}
for (let i=0; i<200;i++){
window.onload=etoileBackground()
  function etoileBackground () {
    var randomSize = Math.floor(Math.random()*15)
    var star = document.createElement("IMG")
    star.classList.add("star")
    star.setAttribute("src", "images/etoile.png")
    star.style.filter = "blur(1px)"
    star.style.position = "absolute"
    star.style.transition ="all 1s"
    starContainer.appendChild(star)
    var xy = getRandomPosition(star)
	  star.style.top = xy[0] + 'px'
	  star.style.left = xy[1] + 'px'
    star.style.width = randomSize + 'px'
    star.style.height = randomSize + 'px'
  }
  stars.push(star)

}


setInterval(function(){
  console.log("coucouc")
  stars = document.querySelectorAll('.star')
  console.log(stars)
 for(let i=0; i<stars.length;i++){
  specialStar = stars[Math.floor(Math.random()*stars.length)]
  specialStar.classList.toggle("specialStar")
  }

}, 3000)
