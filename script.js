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
const liveDIV = document.querySelector('#lives')
liveDIV.innerHTML = `LIVES LEFT : ${lives}`

let ghost1 
let ghost2 
let ghost3 
let ghost4 

const scoreSpan = document.querySelector('#currentScore')
let points = 0

const highScoreDIVPM = document.querySelector('#highScore')
const highScorePM = localStorage.getItem('highScorePM') || 0
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
          // (index >= 126 && index <= 130) || index === 132 || index === 134 || index === 135 || index === 137 || (index >= 139 && index <= 143) ||
          (index >= 126 && index <= 130) || index === 134 || index === 135 || (index >= 139 && index <= 143) ||
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
    } else if (index === 37 || index === 52 || index === 271 || index === 286) {
      cells[index].classList.add('specialfood')
    } else { //WALWAY CELLS
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

    if (index < 38 || index > 77 ) {
      walkway[index].classList.add('food')
      foodArr.push(cells[index])
      food = foodArr.length 
    }

  })
}


//Moving PACMAN on the grid - moved the adding of him into the build function as he reloads in same place
// pacman = ((width * (width - 1) - 2))
// cells[pacman].classList.add('pacman')


document.addEventListener('keydown', (event) => {
  // Start GHOSTS
  moveGhosts()
  moveGhosts2()
  moveGhosts3() 
  moveGhosts4() 
  
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
    // edibleGHOSTS()
    specialFood -= 1
    points += 50
  }
  else if (cells[pacman].classList.contains('ghost1') ||
          cells[pacman].classList.contains('ghost2') ||
          cells[pacman].classList.contains('ghost3') ||
          cells[pacman].classList.contains('ghost4') ) {
    lives -= 1 
    alert('Whoops. You died')
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

function edibleGHOSTS() {
  cells[ghost1].classList.remove('ghost1')
  cells[ghost1].classList.add('edibleGHOST')

  cells[ghost2].classList.remove('ghost2')
  cells[ghost2].classList.add('edibleGHOST')

  cells[ghost3].classList.remove('ghost3')
  cells[ghost3].classList.add('edibleGHOST')

  cells[ghost4].classList.remove('ghost4')
  cells[ghost4].classList.add('edibleGHOST')

  backToNormal()

}

function backToNormal() {

  setTimeout(() => {
    cells[ghost1].classList.remove('edibleGHOTS')
    cells[ghost1].classList.add('ghost1')

    cells[ghost2].classList.remove('edibleGHOST')
    cells[ghost2].classList.add('ghost1')

    cells[ghost3].classList.remove('edibleGHOST')
    cells[ghost3].classList.add('ghost3')

    cells[ghost4].classList.remove('edibleGHOST')
    cells[ghost4].classList.add('ghost4')


  }, 5000)

}


// MOVING GHOST 1 = RED ====================================================================================

let isPlaying = false
let intervalID

function moveGhosts() {

  if (isPlaying){
    return
  }

  isPlaying = true
  
  intervalID = setInterval(() => {


    const move = (Math.floor(Math.random() * 7 ))
    let direction

    //MOVING DOWN FOR 0 & 1 & 6
    if ((move === 0 || move === 1 || move === 6) && direction !== 'down' && !(ghost1 > (width ** 2) - width - 1)) {
      cells[ghost1].classList.remove('ghost1')

      ghost1 += width 
      if (cells[ghost1].classList.contains('wall')) {
        ghost1 -= width
        cells[ghost1].classList.add('ghost1')
      } 
      else {
        cells[ghost1].classList.add('ghost1')
      }
      direction = 'down'
     // checkCells() ADD FUNCTION TO CHECK IF YOU RAN INTO PACMAN

  //LEFT FOR 1 & 2 & 3
    } else if ((move === 1 || move === 2 || move === 3) && direction !== 'left' && (!(ghost1 % width === 0) || cells[ghost1].classList.contains('portal')) ){
      cells[ghost1].classList.remove('ghost1')
      ghost1 -= 1
      if (cells[ghost1].classList.contains('wall')) {
        ghost1 += 1
        cells[ghost1].classList.add('ghost1')
      }
      else if (cells[ghost1].classList.contains('portal')) {
        cells[ghost1].classList.remove('ghost1')
        ghost1 += 17
        cells[ghost1].classList.add('ghost1')
      }
      else {
        cells[ghost1].classList.add('ghost1')
      }
      direction = 'left'
    // checkCells()


  // RIGHT FOR 4 
    } else if (move === 4  && direction !== 'right' && !(ghost1 % width === width - 1)) {
      cells[ghost1].classList.remove('ghost1')
      ghost1 += 1
      if (cells[ghost1].classList.contains('wall')) {
        ghost1 -= 1
        cells[ghost1].classList.add('ghost1')
      }
      else if (cells[ghost1].classList.contains('portal')) {
        cells[ghost1].classList.remove('ghost1')
        ghost1 -= 17
        cells[ghost1].classList.add('ghost1')
      }
      else {
        cells[ghost1].classList.add('ghost1')
      }
      direction = 'right'
    // checkCells()

  // UP FOR 5
  } else if (move === 5  && direction !== 'up' && !(ghost1 < width)) {
      cells[ghost1].classList.remove('ghost1')
      ghost1 -= width
      if (cells[ghost1].classList.contains('wall')) {
        ghost1 += width
        cells[ghost1].classList.add('ghost1')
      }
      else {
        cells[ghost1].classList.add('ghots1')
      }
      direction = 'up'
    // checkCells()
  }
  // console.log(move, ghost1)

  }, 500)
}

// MOVING GHOST 2 = BLUE ====================================================================================

let isPlaying2 = false
let intervalID2

function moveGhosts2() {

  if (isPlaying2){
    return
  }

  isPlaying2 = true
  
  intervalID2 = setInterval(() => {


    const move = (Math.floor(Math.random() * 7 ))
    let direction

    //MOVING DOWN FOR 0 & 1 & 6
    if ((move === 0 || move === 1 || move === 6) && direction !== 'down' && !(ghost2 > (width ** 2) - width - 1)) {
      cells[ghost2].classList.remove('ghost2')

      ghost2 += width 
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 -= width
        cells[ghost2].classList.add('ghost2')
      } 
      else {
        cells[ghost2].classList.add('ghost2')
      }
      direction = 'down'
     // checkCells() ADD FUNCTION TO CHECK IF YOU RAN INTO PACMAN

  //LEFT FOR 1 & 2 & 3
    } else if ((move === 1 || move === 2 || move === 3) && direction !== 'left' && (!(ghost2 % width === 0) || cells[ghost2].classList.contains('portal')) ){
      cells[ghost2].classList.remove('ghost2')
      ghost2 -= 1
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 += 1
        cells[ghost2].classList.add('ghost2')
      }
      else if (cells[ghost2].classList.contains('portal')) {
        cells[ghost2].classList.remove('ghost2')
        ghost2 += 17
        cells[ghost2].classList.add('ghost2')
      }
      else {
        cells[ghost2].classList.add('ghost2')
      }
      direction = 'left'
    // checkCells()


  // RIGHT FOR 4 
    } else if (move === 4  && direction !== 'right' && !(ghost2 % width === width - 1)) {
      cells[ghost2].classList.remove('ghost2')
      ghost2 += 1
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 -= 1
        cells[ghost2].classList.add('ghost2')
      }
      else if (cells[ghost2].classList.contains('portal')) {
        cells[ghost2].classList.remove('ghost2')
        ghost2 -= 17
        cells[ghost2].classList.add('ghost2')
      }
      else {
        cells[ghost2].classList.add('ghost2')
      }
      direction = 'right'
    // checkCells()

  // UP FOR 5
  } else if (move === 5  && direction !== 'up' && !(ghost2 < width)) {
      cells[ghost2].classList.remove('ghost2')
      ghost2 -= width
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 += width
        cells[ghost2].classList.add('ghost2')
      }
      else {
        cells[ghost2].classList.add('ghots2')
      }
      direction = 'up'
    // checkCells()
  }
  console.log(move, ghost2)

  }, 500)
}


// MOVING GHOST 3 = PINK ====================================================================================

let isPlaying3 = false
let intervalID3

function moveGhosts3() {

  if (isPlaying3){
    return
  }

  isPlaying3 = true
  
  intervalID3 = setInterval(() => {


    const move = (Math.floor(Math.random() * 7 ))
    let direction

    //MOVING DOWN FOR 0 & 1 & 6
    if ((move === 0 || move === 1 || move === 6) && direction !== 'down' && !(ghost3 > (width ** 2) - width - 1)) {
      cells[ghost3].classList.remove('ghost3')

      ghost3 += width 
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 -= width
        cells[ghost3].classList.add('ghost3')
      } 
      else {
        cells[ghost3].classList.add('ghost3')
      }
      direction = 'down'
     // checkCells() ADD FUNCTION TO CHECK IF YOU RAN INTO PACMAN

  //LEFT FOR 1 & 2 & 3
    } else if ((move === 1 || move === 2 || move === 3) && direction !== 'left' && (!(ghost3 % width === 0) || cells[ghost3].classList.contains('portal')) ){
      cells[ghost3].classList.remove('ghost3')
      ghost3 -= 1
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 += 1
        cells[ghost3].classList.add('ghost3')
      }
      else if (cells[ghost3].classList.contains('portal')) {
        cells[ghost3].classList.remove('ghost3')
        ghost3 += 17
        cells[ghost3].classList.add('ghost3')
      }
      else {
        cells[ghost3].classList.add('ghost3')
      }
      direction = 'left'
    // checkCells()


  // RIGHT FOR 4 
    } else if (move === 4  && direction !== 'right' && !(ghost3 % width === width - 1)) {
      cells[ghost3].classList.remove('ghost3')
      ghost3 += 1
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 -= 1
        cells[ghost3].classList.add('ghost3')
      }
      else if (cells[ghost3].classList.contains('portal')) {
        cells[ghost3].classList.remove('ghost3')
        ghost3 -= 17
        cells[ghost3].classList.add('ghost3')
      }
      else {
        cells[ghost3].classList.add('ghost3')
      }
      direction = 'right'
    // checkCells()

  // UP FOR 5
  } else if (move === 5  && direction !== 'up' && !(ghost3 < width)) {
      cells[ghost3].classList.remove('ghost3')
      ghost3 -= width
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 += width
        cells[ghost3].classList.add('ghost3')
      }
      else {
        cells[ghost3].classList.add('ghots3')
      }
      direction = 'up'
    // checkCells()
  }
  // console.log(move, ghost2)

  }, 500)
}

// MOVING GHOST 4 = YELLOW ====================================================================================

let isPlaying4 = false
let intervalID4

function moveGhosts4() {

  if (isPlaying4){
    return
  }

  isPlaying4 = true
  
  intervalID4 = setInterval(() => {


    const move = (Math.floor(Math.random() * 7 ))
    let direction

    //MOVING DOWN FOR 0 & 1 & 6
    if ((move === 0 || move === 1 || move === 6) && direction !== 'down' && !(ghost4 > (width ** 2) - width - 1)) {
      cells[ghost4].classList.remove('ghost4')
      ghost4 += width 
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 -= width
        cells[ghost4].classList.add('ghost4')
      } 
      else {
        cells[ghost4].classList.add('ghost4')
      }
      direction = 'down'
     // checkCells() ADD FUNCTION TO CHECK IF YOU RAN INTO PACMAN

  //LEFT FOR 1 & 2 & 3
    } else if ((move === 1 || move === 2 || move === 3) && direction !== 'left' && (!(ghost4 % width === 0) || cells[ghost4].classList.contains('portal')) ){
      cells[ghost4].classList.remove('ghost4')
      ghost4 -= 1
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 += 1
        cells[ghost4].classList.add('ghost4')
      }
      else if (cells[ghost4].classList.contains('portal')) {
        cells[ghost4].classList.remove('ghost4')
        ghost4 += 17
        cells[ghost4].classList.add('ghost4')
      }
      else {
        cells[ghost4].classList.add('ghost4')
      }
      direction = 'left'
    // checkCells()


  // RIGHT FOR 4 
    } else if (move === 4  && direction !== 'right' && !(ghost4 % width === width - 1)) {
      cells[ghost4].classList.remove('ghost4')
      ghost4 += 1
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 -= 1
        cells[ghost4].classList.add('ghost4')
      }
      else if (cells[ghost4].classList.contains('portal')) {
        cells[ghost4].classList.remove('ghost4')
        ghost4 -= 17
        cells[ghost4].classList.add('ghost4')
      }
      else {
        cells[ghost4].classList.add('ghost4')
      }
      direction = 'right'
    // checkCells()

  // UP FOR 5
  } else if (move === 5  && direction !== 'up' && !(ghost4 < width)) {
      cells[ghost4].classList.remove('ghost4')
      ghost4 -= width
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 += width
        cells[ghost4].classList.add('ghost4')
      }
      else {
        cells[ghost4].classList.add('ghots4')
      }
      direction = 'up'
    // checkCells()
  }
  console.log(ghost4)

  }, 500)
}