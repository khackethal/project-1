//Getting my cinsts to build the grid
const grid = document.querySelector('.grid')

//Setting width to 18 cells for initial grid
const width = 18

//Create an array of all my cells
const cells = []
const walkway = []
const foodArr = []

let food = 0 // will be set to correct number when build function runs
let specialFood = 4 // hardcoded for now as there's always 4

let pacman = 0
let lives = 3
const liveDIV= document.querySelector('#lives')
liveDIV.innerHTML = `LIVES LEFT : ${lives}`

let ghost1 
let ghost2 
let ghost3 
let ghost4 

const scoreSpan = document.querySelector('#currentScore')
let points = 0

const highScoreDIVPM = document.querySelector('#highScore')
let highScorePM = localStorage.getItem('highScorePM') || 0
highScoreDIVPM.innerHTML = `Current high score is ${highScorePM}`


for (let index = 0; index < width ** 2; index++) {
  const div = document.createElement('div')
  grid.appendChild(div)

  //number cells
  div.innerHTML = index
  //correct size
  div.style.width = `${100 / width}%`
  div.style.height = `${100 / width}%`
  //cell array
  cells.push(div)
}


//Looping through the array to build the grid

function buildGridLevel1() {

  cells.forEach((cell, index) => {

    //Building the walls- not sure if there's a way around making the pattern with maths. Each row is a line
    //Function only works for a width of 18, so if we have a higher level function we would have to update the rebuikld the larger grid in the function before we build walls
    if ((index >= 0 && index < 18) ||
        (index === 18) || index === 26 || index === 27 || index === 35 ||
          index === 36  || (index >= 38 && index <= 42) || index === 44 || index === 45 || (index >= 47 && index <= 51) || index === 53 ||
          index === 54  || (index >= 56 && index <= 60) || index === 62 || index === 63 || (index >= 65 && index <= 69) || index === 71 || 
          index === 72  || index === 89 ||
          index === 90  || (index >= 92 && index <= 105) || index === 107 ||
          index === 108 || index === 114 || index === 119 || index === 125 ||
          (index >= 126 && index <= 130) || index === 132 || index === 134 || index === 135 || index === 137 || (index >= 139 && index <= 143) ||
          index === 152 || index === 153 ||
          (index >= 162 && index <= 166) || index === 168 || index === 173 || (index >= 175 && index <= 179) ||
          (index >= 180 && index <= 184) || (index >= 186 && index <= 191) || (index >= 193 && index <= 197) ||
          index === 198 || index === 206 || index === 207 || index === 215 ||
          index === 216 || (index >= 218 && index <= 220) || index === 222 || index === 224 || index === 225 || index === 227 || (index >= 229 && index <= 231) || index === 233 ||
          index === 234 || (index >= 236 && index <= 238) || index === 240 || index === 245 || (index >= 247 && index <= 249) || index === 251 ||
          index === 252 || (index >= 258 && index <= 263) || index === 269 ||
          index === 270 || (index >= 272 && index <= 285) || index === 287 ||
          index === 288 || index === 305 ||
          (index >= 306 && index <= 323)
    ){
      cells[index].classList.add('wall')
  

    //Might as well add the portal calls to the portals - adding colour for now to check it's working ok
    } else if (index === 144 || index === 161) {
      cells[index].classList.add('portal')
    }
    else if (index === 37 || index === 52 || index === 271 || index === 286) {
      cells[index].classList.add('specialfood')
    }
    // and have all other cells as walkway - making an array for the ghosts 
    else {
      cells[index].classList.add('walkway')
      walkway.push(cells[index])
    }
  }) 
  addFood()
  pacman = ((width * (width - 1) - 2))
  cells[pacman].classList.add('pacman')
  points = 0

  ghost1 = 115
  ghost2 = 169
  ghost3 = 118
  ghost4 = 172
  cells[ghost1].classList.add('ghost1')
  cells[ghost2].classList.add('ghost2')
  cells[ghost3].classList.add('ghost3')
  cells[ghost4].classList.add('ghost4')

}

buildGridLevel1()
// console.log(walkway)
//the ghosts will loop though walkway and check they're getting closer to PACMAN, whilst PACMAN runs on the cells array
//should probably count the food

function addFood() {

  walkway.forEach((cell, index) => {

    // walkway[index].innerHTML = index
    if (index < 38 || index > 77 ) {
      walkway[index].classList.add('food')
      foodArr.push(cells[index])
      food = foodArr.length 
    }

  })
}


//Moving PACMAN on the grid - moed the adding of him into the build function
// pacman = ((width * (width - 1) - 2))
// cells[pacman].classList.add('pacman')

// Moving harry based on the  arrows
document.addEventListener('keydown', (event) => {
  // Start GHOSTS
  moveGhosts()
  
  // Get the keyboard character typed from event.key
  const key = event.key

  //MOVING DOWN
  if (key === 'ArrowDown' && !(pacman > (width ** 2) - width - 1)) {
    cells[pacman].classList.remove('pacman')
    pacman += width 
    if (cells[pacman].classList.contains('wall')) {
      pacman -= width
      cells[pacman].classList.add('pacman')
    }
    else {
      cells[pacman].classList.add('pacman')
    }
    checkCells()

  //LEFT
  } else if (key === 'ArrowLeft' && (!(pacman % width === 0) || cells[pacman].classList.contains('portal')) ){
    cells[pacman].classList.remove('pacman')
    pacman -= 1
    if (cells[pacman].classList.contains('wall')) {
      pacman += 1
      cells[pacman].classList.add('pacman')
    }
    else if (cells[pacman].classList.contains('portal')) {
      cells[pacman].classList.remove('pacman')
      pacman += 17
      cells[pacman].classList.add('pacman')
    }
    else {
      cells[pacman].classList.add('pacman')
    }
    checkCells()


  // RIGHT
  } else if (key === 'ArrowRight' && !(pacman % width === width - 1)) {
    cells[pacman].classList.remove('pacman')
    pacman += 1
    if (cells[pacman].classList.contains('wall')) {
      pacman -= 1
      cells[pacman].classList.add('pacman')
    }
    else if (cells[pacman].classList.contains('portal')) {
      cells[pacman].classList.remove('pacman')
      pacman -= 17
      cells[pacman].classList.add('pacman')
    }
    else {
      cells[pacman].classList.add('pacman')
    }
    checkCells()

  // UP
  } else if (key === 'ArrowUp' && !(pacman < width)) {
    cells[pacman].classList.remove('pacman')
    pacman -= width
    if (cells[pacman].classList.contains('wall')) {
      pacman += width
      cells[pacman].classList.add('pacman')
    }
    else {
      cells[pacman].classList.add('pacman')
    }
    checkCells()
  }
})


// FUNCTION TO CHECK CELL CONTENT EVERY TIME PACMAN MOVES AND AMEND POINTS/ TRIGGER OTHER FUNCTIONS 
function checkCells() {
  if (cells[pacman].classList.contains('food')) {
    points += 10
    cells[pacman].classList.remove('food')
    food -= 1
    points += 10
  }
  else if (cells[pacman].classList.contains('specialfood')) {
    points += 50
    cells[pacman].classList.remove('specialfood')
    // TRIGGER GHOST HUNT
    specialFood -= 1
    points += 50
  }
  else if (cells[pacman].classList.contains('ghost1') ||
          cells[pacman].classList.contains('ghost2') ||
          cells[pacman].classList.contains('ghost3') ||
          cells[pacman].classList.contains('ghost4') ) {
    lives -= 1 
    alert(`Whoops. You died`)
    cells[pacman].classList.remove('pacman')
    clearInterval(intervalID)
    cells[ghost1].classList.remove('ghost1')
    cells[ghost2].classList.remove('ghost2')
    cells[ghost3].classList.remove('ghost3')
    cells[ghost4].classList.remove('ghost4')
    buildGridLevel1()
    
  }
  else if (food === 0 && specialFood === 0) {
    const compare = points
    if (compare > highScorePM) {
      localStorage.setItem('highScorePM', `${compare}`)
      highScoreDIVPM.innerHTML = `Current High Score: ${compare}`
    }
    alert(`🎉 You've eaten all the food ! 🎉 `)
    cells[pacman].classList.remove('pacman')
    clearInterval(intervalID)
    cells[ghost1].classList.remove('ghost1')
    cells[ghost2].classList.remove('ghost2')
    cells[ghost3].classList.remove('ghost3')
    cells[ghost4].classList.remove('ghost4')
    buildGridLevel1()
  }
  scoreSpan.innerHTML = points
}



let isPlaying = false
let intervalID

function moveGhosts() {

  if (isPlaying){
    return
  }

  isPlaying = true
  
  intervalID = setInterval(() => {
    


    //GHOST 1 TRIES TO MOVE RIGHT AND ONLY MOVES IF CLASS IS NOT WALL
    cells[ghost1].classList.remove('ghost1')    
    ghost1 += 1
    if (cells[ghost1].classList.contains('walkway')) {
      cells[ghost1].classList.add('ghost1')
    } else { ghost1 -= 1 //back to start
            ghost1 -= width //DOWMN
          if (cells[ghost1].classList.contains('walkway')) {
              cells[ghost1].classList.add('ghost1')
              ghost1 -= width //FURTHER DOWN IF IT WORKED
            } 
                else {
                  ghost1 += width //back to start
                  ghost1 += width // DOWN
                  if (cells[ghost1].classList.contains('walkway')) {
                    cells[ghost1].classList.add('ghost1')
                  } 
                    else { ghost1 -= width // back to start
                          ghost1 -= width // left
                          cells[ghost1].classList.add('ghost1')
                    }
                }
              }
    
    console.log(ghost1)


    }, 1000)
 
}

