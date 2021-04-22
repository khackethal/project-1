//Getting my consts to build the grid
const grid = document.querySelector('.grid')
const audioPlayer = document.querySelector('audio')

// //Little start sequence with music
// const startButton = document.querySelector('#startbutton')
// const intro = document.querySelector('.intro')

// const overlay = document.querySelector('.overlay')

// const yesButton = document.querySelector('#confirm')

// yesButton.addEventListener('click', () => {

//   // audioPlayer.src = './Audio/PACMAN_INTRO.mp3'
//   // audioPlayer.play()

//   overlay.classList.add('hidden')
//   buildGridLevel1()
//   showGrid()

// })

// //INtro and build grid at the start
// startButton.addEventListener('click', () => {

//   audioPlayer.src = './Audio/PACMAN_INTRO.mp3'
//   audioPlayer.play()

//   startButton.classList.add('hidden')
//   intro.classList.remove('hidden')
//   buildGridLevel1()
//   showGrid()

// })

// //Function to show grid
// function showGrid() {
//   setTimeout(() => {
//     grid.classList.remove('hidden')
//     intro.classList.add('hidden')
//   }, 4000)
// }

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
  // div.innerHTML = index
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
    //Function only works for a width of 18, so if we have a higher level function we would have to update the rebuild the larger grid in the function before we build walls
    if ((index >= 0 && index < 18) ||
        (index === 18) || index === 26 || index === 27 || index === 35 ||
          index === 36  || (index >= 38 && index <= 42) || index === 44 || index === 45 || (index >= 47 && index <= 51) || index === 53 ||
          index === 54  || (index >= 56 && index <= 60) || index === 62 || index === 63 || (index >= 65 && index <= 69) || index === 71 || 
          index === 72  || index === 89 ||
          index === 90  || (index >= 92 && index <= 105) || index === 107 ||
          index === 108 || index === 114 || index === 119 || index === 125 ||
          // (index >= 126 && index <= 130) || index === 132 || index === 134 || index === 135 || index === 137 || (index >= 139 && index <= 143) || took some walls out as ghosts are too stupid
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
  
    //Might as well add the portal calls to the portals
    } else if (index === 144 || index === 161) {
      cells[index].classList.add('portal')
    } else if (index === 109 || index === 52 || index === 271 || index === 244) {
      cells[index].classList.add('specialfood')
    } else { //WALWAY CELLS
      cells[index].classList.add('walkway')
      walkway.push(cells[index])
      // walkway.innerHTML = index
    }
  }) 

  pacman = ((width * (width - 1) - 2))
  cells[pacman].classList.add('pacman_left')

  points = 0
  lives = 3
  liveDIV.innerHTML = `LIVES LEFT : ${lives}`
  ghost1 = 115
  ghost2 = 169
  ghost3 = 118
  ghost4 = 172
  cells[ghost1].classList.add('ghost1')
  cells[ghost2].classList.add('ghost2')
  cells[ghost3].classList.add('ghost3')
  cells[ghost4].classList.add('ghost4')

  addFood()

}
buildGridLevel1()

//the ghosts will loop though walkway and check they're getting closer to PACMAN, whilst PACMAN runs on the cells array
function addFood() {
  walkway.forEach((cell, index) => {
    // walkway[index].innerHTML = index
    if (index < 38 || index > 77 || (index >= 38 && index <= 42) || (index >= 47 && index <= 51) ) {
      walkway[index].classList.add('food')

      foodArr.push(cells[index])
      food = foodArr.length 
    }
  })
}

let isPlayingAudio = 0
let chompInterval

function chompsound() {
  chompInterval = setInterval(() => {
    audioPlayer.src = './Audio/Chomp.mp3'
    audioPlayer.play()
  } , 700)

}

//Moving PACMAN on the grid - moved the adding of him into the build function as he reloads in same place
document.addEventListener('keydown', (event) => {
  // Start GHOSTS
  moveGhosts()
  moveGhosts2()
  moveGhosts3() 
  moveGhosts4() 
  isPlayingAudio += 1

  if (isPlayingAudio === 1) {
    chompsound()
  }
  
  
  // Get the keyboard character typed from event.key
  const key = event.key

  //MOVING DOWN
  if (key === 'ArrowDown' && !(pacman > (width ** 2) - width - 1)) {
    cells[pacman].classList.remove('pacman_left')
    cells[pacman].classList.remove('pacman_right')
    cells[pacman].classList.remove('pacman_up')
    cells[pacman].classList.remove('pacman_down')
    pacman += width 
    if (cells[pacman].classList.contains('wall')) {
      pacman -= width
      cells[pacman].classList.add('pacman_down')
    } else {
      cells[pacman].classList.add('pacman_down')
    }
    checkCells()

  //LEFT
  } else if (key === 'ArrowLeft' && (!(pacman % width === 0) || cells[pacman].classList.contains('portal')) ){
    cells[pacman].classList.remove('pacman_left')
    cells[pacman].classList.remove('pacman_right')
    cells[pacman].classList.remove('pacman_up')
    cells[pacman].classList.remove('pacman_down')
    pacman -= 1
    if (cells[pacman].classList.contains('wall')) {
      pacman += 1
      cells[pacman].classList.add('pacman_left')
    } else if (cells[pacman].classList.contains('portal')) {
      cells[pacman].classList.remove('pacman_left')
      pacman += 17
      cells[pacman].classList.add('pacman_left')
    } else {
      cells[pacman].classList.add('pacman_left')
    }
    checkCells()


  // RIGHT
  } else if (key === 'ArrowRight' && !(pacman % width === width - 1)) {
    cells[pacman].classList.remove('pacman_left')
    cells[pacman].classList.remove('pacman_right')
    cells[pacman].classList.remove('pacman_up')
    cells[pacman].classList.remove('pacman_down')
    pacman += 1
    if (cells[pacman].classList.contains('wall')) {
      pacman -= 1
      cells[pacman].classList.add('pacman_right')
    } else if (cells[pacman].classList.contains('portal')) {
      cells[pacman].classList.remove('pacman_right')
      pacman -= 17
      cells[pacman].classList.add('pacman_right')
    } else {
      cells[pacman].classList.add('pacman_right')
    }
    checkCells()

  // UP
  } else if (key === 'ArrowUp' && !(pacman < width)) {
    cells[pacman].classList.remove('pacman_left')
    cells[pacman].classList.remove('pacman_right')
    cells[pacman].classList.remove('pacman_up')
    cells[pacman].classList.remove('pacman_down')
    pacman -= width
    if (cells[pacman].classList.contains('wall')) {
      pacman += width
      cells[pacman].classList.add('pacman_up')
    } else {
      cells[pacman].classList.add('pacman_up')
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
  } else if (cells[pacman].classList.contains('specialfood')) {
    points += 50
    cells[pacman].classList.remove('specialfood')
    edibleGHOSTS()
    specialFood -= 1
    points += 50
  } else if (cells[pacman].classList.contains('edibleGHOST1')){
    points += 200
    clearInterval(intervalIDEdible)
    clearInterval(chompInterval)
    isPlayingAudio = 0
    audioPlayer.src = './Audio/Ghost.mp3'
    audioPlayer.play()
    cells[ghost1].classList.remove('edibleGHOST1')
    ghost1 = 115
    cells[ghost1].classList.add('ghost1')
  } else if (cells[pacman].classList.contains('edibleGHOST1B'))  {
    points += 200
    clearInterval(intervalIDEdible)
    clearInterval(chompInterval)
    isPlayingAudio = 0
    audioPlayer.src = './Audio/Ghost.mp3'
    audioPlayer.play()
    cells[ghost1].classList.remove('edibleGHOST1B')
    ghost1 = 115
    cells[ghost1].classList.add('ghost1')
    
  } else if (cells[pacman].classList.contains('edibleGHOST2')) {
    clearInterval(intervalIDEdible2)
    cells[ghost2].classList.remove('edibleGHOST2')
    clearInterval(chompInterval)
    isPlayingAudio = 0
    audioPlayer.src = './Audio/Ghost.mp3'
    audioPlayer.play()
    ghost2 = 169
    cells[ghost2].classList.add('ghost2')
  } else if (cells[pacman].classList.contains('edibleGHOST2B'))  {
    points += 200
    clearInterval(intervalIDEdible2)
    clearInterval(chompInterval)
    isPlayingAudio = 0
    audioPlayer.src = './Audio/Ghost.mp3'
    audioPlayer.play()
    cells[ghost2].classList.remove('edibleGHOST2B')
    ghost2 = 169
    cells[ghost2].classList.add('ghost2')
  } else if (cells[pacman].classList.contains('edibleGHOST3') ){
    points += 200
    clearInterval(intervalIDEdible3)
    clearInterval(chompInterval)
    isPlayingAudio = 0
    audioPlayer.src = './Audio/Ghost.mp3'
    audioPlayer.play()
    cells[ghost3].classList.remove('edibleGHOST3')
    ghost3 = 118
    cells[ghost3].classList.add('ghost3')
  } else if (cells[pacman].classList.contains('edibleGHOST3B'))  {
    points += 200
    cells[ghost3].classList.remove('edibleGHOST3B')
    clearInterval(intervalIDEdible3)
    clearInterval(chompInterval)
    isPlayingAudio = 0
    audioPlayer.src = './Audio/Ghost.mp3'
    audioPlayer.play()
    ghost3 = 118
    cells[ghost3].classList.add('ghost3')
  } else if (cells[pacman].classList.contains('edibleGHOST4') ){
    points += 200
    clearInterval(intervalIDEdible4)
    clearInterval(chompInterval)
    isPlayingAudio = 0
    audioPlayer.src = './Audio/Ghost.mp3'
    audioPlayer.play()
    cells[ghost4].classList.remove('edibleGHOST4')
    ghost4 = 172
    cells[ghost4].classList.add('ghost4')
  } else if (cells[pacman].classList.contains('edibleGHOST4B'))  {
    points += 200
    cells[ghost4].classList.remove('edibleGHOST4B')
    clearInterval(intervalIDEdible4)
    clearInterval(chompInterval)
    isPlayingAudio = 0
    audioPlayer.src = './Audio/Ghost.mp3'
    audioPlayer.play()
    ghost4 = 172
    cells[ghost4].classList.add('ghost4')
  } else if (cells[pacman].classList.contains('ghost1') ||
          cells[pacman].classList.contains('ghost2') ||
          cells[pacman].classList.contains('ghost3') ||
          cells[pacman].classList.contains('ghost4') ) {
    audioPlayer.src = './Audio/You_died.mp3'
    audioPlayer.play()

    clearInterval(chompInterval)
    isPlayingAudio = 0
    lives -= 1 
    if (lives === 0) {
      alert('GAME OVER')
      clearInterval(chompInterval)
      isPlayingAudio = 0
      audioPlayer.src = './Audio/You_died.mp3'
      audioPlayer.play()
      location.reload()
    } else if (lives > 0 ) {
      alert(`Whoops. You died. You have ${lives} lives left.`)
      liveDIV.innerHTML = `LIVES LEFT : ${lives}`
      cells[pacman].classList.remove('pacman_left')
      cells[pacman].classList.remove('pacman_right')
      cells[pacman].classList.remove('pacman_up')
      cells[pacman].classList.remove('pacman_down')
      clearInterval(intervalIDEdible)
      clearInterval(intervalIDEdible2)
      clearInterval(intervalIDEdible3)
      clearInterval(intervalIDEdible4)
      cells[ghost1].classList.remove('edibleGHOST1')
      cells[ghost2].classList.remove('edibleGHOST2')
      cells[ghost3].classList.remove('edibleGHOST3')
      cells[ghost4].classList.remove('edibleGHOST4')
      cells[ghost1].classList.remove('edibleGHOST1B')
      cells[ghost2].classList.remove('edibleGHOST2B')
      cells[ghost3].classList.remove('edibleGHOST3B')
      cells[ghost4].classList.remove('edibleGHOST4B')
  
      clearInterval(intervalID)
      clearInterval(intervalID2)
      clearInterval(intervalID3)
      clearInterval(intervalID4)
      cells[ghost1].classList.remove('ghost1')
      cells[ghost2].classList.remove('ghost2')
      cells[ghost3].classList.remove('ghost3')
      cells[ghost4].classList.remove('ghost4')    
  
      pacman = ((width * (width - 1) - 2))
      cells[pacman].classList.add('pacman_left')
    
      ghost1 = 115
      ghost2 = 169
      ghost3 = 118
      ghost4 = 172
      cells[ghost1].classList.add('ghost1')
      cells[ghost2].classList.add('ghost2')
      cells[ghost3].classList.add('ghost3')
      cells[ghost4].classList.add('ghost4')
      isPlaying = false
      isPlaying2 = false
      isPlaying3 = false
      isPlaying4 = false
    } 
  } else if (food === 0 && specialFood === 0) {
    const compare = points
    if (compare > highScorePM) {
      localStorage.setItem('highScorePM', `${compare}`)
      highScoreDIVPM.innerHTML = `Current High Score: ${compare}`
    }
    alert(`🎉 You've eaten all the food - GAME WON! 🎉 `)
    location.reload()
  }
  scoreSpan.innerHTML = points
}


//FUNCTION FOR GHOSTS TO CHECK IF THEY ENCOUNTER PACKMAN
function checkCellsGhosts() {
  if (cells[ghost1].classList.contains('pacman_left') || cells[ghost1].classList.contains('pacman_right') ||
      cells[ghost1].classList.contains('pacman_up') || cells[ghost1].classList.contains('pacman_down') ||
    cells[ghost2].classList.contains('pacman_left') || cells[ghost2].classList.contains('pacman_right') ||
    cells[ghost2].classList.contains('pacman_up') || cells[ghost2].classList.contains('pacman_down') ||
    cells[ghost3].classList.contains('pacman_left') || cells[ghost3].classList.contains('pacman_right') ||
    cells[ghost3].classList.contains('pacman_up') ||  cells[ghost3].classList.contains('pacman_down') ||
    cells[ghost4].classList.contains('pacman_left') || cells[ghost4].classList.contains('pacman_right') ||
    cells[ghost4].classList.contains('pacman_up') || cells[ghost4].classList.contains('pacman_down')) {
    audioPlayer.src = './Audio/You_died.mp3'
    audioPlayer.play()
    clearInterval(chompInterval)                                                                     
    isPlayingAudio = 0
    lives -= 1 
    if (lives === 0) {
      alert(`GAME OVER`)
      audioPlayer.src = './Audio/You_died.mp3'
      audioPlayer.play()
      location.reload()
    } else if (lives > 0 ){
      alert(`Whoops. You died. You have ${lives} lives left.`)
      liveDIV.innerHTML = `LIVES LEFT : ${lives}`
      cells[pacman].classList.remove('pacman_left')
      cells[pacman].classList.remove('pacman_right')
      cells[pacman].classList.remove('pacman_up')
      cells[pacman].classList.remove('pacman_down')
      clearInterval(intervalID)
      clearInterval(intervalID2)
      clearInterval(intervalID3)
      clearInterval(intervalID4)
      cells[ghost1].classList.remove('ghost1')
      cells[ghost2].classList.remove('ghost2')
      cells[ghost3].classList.remove('ghost3')
      cells[ghost4].classList.remove('ghost4')
      cells[ghost1].classList.remove('edibleGHOST1')
      cells[ghost2].classList.remove('edibleGHOST2')
      cells[ghost3].classList.remove('edibleGHOST3')
      cells[ghost4].classList.remove('edibleGHOST4')
      cells[ghost1].classList.remove('edibleGHOST1B')
      cells[ghost2].classList.remove('edibleGHOST2B')
      cells[ghost3].classList.remove('edibleGHOST3B')
      cells[ghost4].classList.remove('edibleGHOST4B')
  
      pacman = ((width * (width - 1) - 2))
      cells[pacman].classList.add('pacman_left')
      ghost1 = 115
      ghost2 = 169
      ghost3 = 118
      ghost4 = 172
      cells[ghost1].classList.add('ghost1')
      cells[ghost2].classList.add('ghost2')
      cells[ghost3].classList.add('ghost3')
      cells[ghost4].classList.add('ghost4')
      isEdible = false
      isPlaying = false
      isPlaying2 = false
      isPlaying3 = false
      isPlaying4 = false
    }    
  }
}

//EDIBLE GHOSTS && TIMEOUT TO SET THEM BACK TO NORMAL
let isEdible = false

function edibleGHOSTS() {

  if (isEdible){
    return
  }
  isEdible = true 

  clearInterval(intervalID)
  clearInterval(intervalID2)
  clearInterval(intervalID3)
  clearInterval(intervalID4)

  cells[ghost1].classList.remove('ghost1')
  cells[ghost1].classList.add('edibleGHOST1')

  cells[ghost2].classList.remove('ghost2')
  cells[ghost2].classList.add('edibleGHOST2')

  cells[ghost3].classList.remove('ghost3')
  cells[ghost3].classList.add('edibleGHOST3')

  cells[ghost4].classList.remove('ghost4')
  cells[ghost4].classList.add('edibleGHOST4')

  isPlayingEdible = false
  isPlayingEdible = false
  isPlayingEdible3 = false
  isPlayingEdible3 = false

  moveGhostsE1()
  moveGhostsE2()
  moveGhostsE3()
  moveGhostsE4()

  backToNormal()

}

//FIRST step start them blinking IF they're still edible, second step back to normal classes
function backToNormal() {

  setTimeout(() => {
    clearInterval(intervalIDEdible)
    clearInterval(intervalIDEdible2)
    clearInterval(intervalIDEdible3)
    clearInterval(intervalIDEdible4)

    checkGhost1()
    checkGhost2()
    checkGhost3()
    checkGhost4()

    backToNormalFinal()

  }, 7000)
}

// CHECKING IF GHOSTS ARE STILL EDIBLE AND IF YES ADD THE BLINKING CLASS
function checkGhost1() {
  if (cells[ghost1].classList.contains('edibleGHOST1')) {
    cells[ghost1].classList.remove('edibleGHOST1')
    cells[ghost1].classList.add('edibleGHOST1B')
  }
}

function checkGhost2() {
  if (cells[ghost2].classList.contains('edibleGHOST2')) {
    cells[ghost2].classList.remove('edibleGHOST2')
    cells[ghost2].classList.add('edibleGHOST2B')
  }
}

function checkGhost3() {
  if (cells[ghost3].classList.contains('edibleGHOST3')) {
    cells[ghost3].classList.remove('edibleGHOST3')
    cells[ghost3].classList.add('edibleGHOST3B')
  }
}

function checkGhost4() {
  if (cells[ghost4].classList.contains('edibleGHOST4')) {
    cells[ghost4].classList.remove('edibleGHOST4')
    cells[ghost4].classList.add('edibleGHOST4B')
  }
}

// BACK TO THEIR NORMAL STATE
function backToNormalFinal() {

  setTimeout(() => {

    cells[ghost1].classList.remove('edibleGHOST1')
    cells[ghost1].classList.remove('edibleGHOST1B')
    cells[ghost1].classList.add('ghost1')

    cells[ghost2].classList.remove('edibleGHOST2')
    cells[ghost2].classList.remove('edibleGHOST2B')
    cells[ghost2].classList.add('ghost2')

    cells[ghost3].classList.remove('edibleGHOST3')
    cells[ghost3].classList.remove('edibleGHOST3B')
    cells[ghost3].classList.add('ghost3')

    cells[ghost4].classList.remove('edibleGHOST4')
    cells[ghost4].classList.remove('edibleGHOST4B')
    cells[ghost4].classList.add('ghost4')
    
    isEdible = false

    isPlaying = false
    isPlaying2 = false
    isPlaying3 = false
    isPlaying4 = false
    moveGhosts()
    moveGhosts2()
    moveGhosts3() 
    moveGhosts4() 

  }, 3000)
}


//FUNCTION TO CHECK WHAT DIRECTIRONS A GHOST CAN MOVE IN 
let moveRight
let moveLeft
let moveUp
let moveDown

//RIGHT - CAN YOU GO?
function checkRight(ghostIndex) {
  if (cells[ghostIndex + 1].classList.contains('walkway') || cells[ghostIndex + 1].classList.contains('portal')) {
    moveRight = true
  } else {
    moveRight = false 
  }
  return moveRight
}

//LEFT
function checkLeft(ghostIndex) {
  if (cells[ghostIndex - 1].classList.contains('walkway') || cells[ghostIndex - 1].classList.contains('portal')) {
    moveLeft = true
  } else {
    moveLeft = false 
  }
  return moveLeft
}

//UP 
function checkUp(ghostIndex) {
  if (cells[ghostIndex - width].classList.contains('walkway')) {
    moveUp = true
  } else {
    moveUp = false 
  }
  return moveUp
}

//DOWN 
function checkDown(ghostIndex) {
  if (cells[ghostIndex + width].classList.contains('walkway')) {
    moveDown = true
  } else {
    moveDown = false 
  }
  return moveDown
}



// MOVING GHOST 1 = RED ====================================================================================

let isPlaying 
let intervalID

function moveGhosts() {

  if (isPlaying){
    return
  }

  isPlaying = true
  
  intervalID = setInterval(() => {

    checkRight(ghost1)
    checkLeft(ghost1)
    checkUp(ghost1)
    checkDown(ghost1)

    //these will be assigend a value and pushed into the choices array
    let right
    let left
    let up
    let down

    //choices array
    const choices = []

    //function to return index of the smallest array item 
    function indexOfSmallest(a) {
      return a.indexOf(Math.min.apply(Math, a))
    }

    function getRight() {
      if (moveRight) {
        right = Math.abs(pacman - (ghost1 + 1)) 
      } else {
        right = 1000
      }
      return right
    }

    function getLeft() {
      if (moveLeft) {
        left =  Math.abs(pacman - (ghost1 - 1))
      } else {
        left = 1000
      }
      return left
    }

    function getDown() {
      if (moveDown) {
        down = Math.abs(pacman - (ghost1 + width))
      } else {
        down = 1000
      }
      return down
    }

    function getUp() {
      if (moveUp) {
        up = Math.abs(pacman - (ghost1 - width))
      } else {
        up = 1000
      }
      return up 
    }

    getRight()
    getLeft()
    getUp()
    getDown()

    choices.push(right) // 0
    choices.push(down) //1
    choices.push(left) // 2
    choices.push(up) //3

    const move = indexOfSmallest(choices)

    //stuck on same row obstacle - packman to right - ghost needs to go down
    if ((pacman - ghost1) < 18 && pacman > ghost1 && cells[ghost1 + 1].classList.contains('wall')) {
      if (moveDown && cells[ghost1 + 1 + width].classList.contains('walkway')) {
        cells[ghost1].classList.remove('ghost1')
        ghost1 += width 
        ghost1 += 1
        cells[ghost1].classList.add('ghost1')
      }
    } else if (pacman > ghost1 && moveUp && cells[ghost1 + 1].classList.contains('wall') && cells[ghost1 + 2].classList.contains('walkway')){
      cells[ghost1].classList.remove('ghost1')
      ghost1 -= width
      cells[ghost1].classList.add('ghost1')
      cells[ghost1].classList.remove('ghost1')
      ghost1 -= width
      cells[ghost1].classList.add('ghost1')
      cells[ghost1].classList.remove('ghost1')
      ghost1 += 1
      cells[ghost1].classList.add('ghost1')
    } else if (pacman < ghost1 && cells[ghost1 + 1].classList.contains('wall') && cells[ghost1 - 2].classList.contains('walkway')){
      cells[ghost1].classList.remove('ghost1')
      ghost1 -= width
      cells[ghost1].classList.add('ghost1')
      cells[ghost1].classList.remove('ghost1')
      ghost1 -= width
      cells[ghost1].classList.add('ghost1')
      cells[ghost1].classList.remove('ghost1')
      ghost1 += 1
      cells[ghost1].classList.add('ghost1')
    } else if (pacman < ghost1 && moveLeft && !moveUp) {
      cells[ghost1].classList.remove('ghost1')
      ghost1 -= 1
      cells[ghost1].classList.add('ghost1')
    }

    // } //RIGHT 
    else if (move === 0 && pacman > ghost1 && !cells[ghost1 + 1].classList.contains('wall') ) {
      cells[ghost1].classList.remove('ghost1')
      ghost1 += 1
      cells[ghost1].classList.add('ghost1')
      if (cells[ghost1].classList.contains('portal')) {
        cells[ghost1].classList.remove('ghost1')
        ghost1 += 17
        cells[ghost1].classList.add('ghost1')
      }
      // direction = 'right'
    } 
    //DOWN
    else if (move === 1 ) {
      cells[ghost1].classList.remove('ghost1')
      ghost1 += width
      cells[ghost1].classList.add('ghost1')
      // direction = 'down'
    } 
    //LEFT
    else if (move === 2 && !cells[ghost1 - 1].classList.contains('wall')) {
      cells[ghost1].classList.remove('ghost1')
      ghost1 -= 1
      cells[ghost1].classList.add('ghost1')
      // direction = 'left'
    } 
    //UP
    else if (move === 3) {
      cells[ghost1].classList.remove('ghost1')
      ghost1 -= width
      cells[ghost1].classList.add('ghost1')

    }
  }, 300)
}





// MOVING GHOST 2 = BLUE ====================================================================================

let isPlaying2 
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
    if ((move === 0 || move === 1 || move === 6) && direction !== 'up' && !(ghost2 > (width ** 2) - width - 1)) {
      cells[ghost2].classList.remove('ghost2')

      ghost2 += width 
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 -= width
        cells[ghost2].classList.add('ghost2')
      } else {
        cells[ghost2].classList.add('ghost2')
      }
      direction = 'down'
      checkCellsGhosts()

    //LEFT FOR 1 & 2 & 3
    } else if ((move === 1 || move === 2 ) && direction !== 'right' && (!(ghost2 % width === 0) || cells[ghost2].classList.contains('portal')) ){
      cells[ghost2].classList.remove('ghost2')
      ghost2 -= 1
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 += 1
        cells[ghost2].classList.add('ghost2')
      } else if (cells[ghost2].classList.contains('portal')) {
        cells[ghost2].classList.remove('ghost2')
        ghost2 += 17
        cells[ghost2].classList.add('ghost2')
      } else {
        cells[ghost2].classList.add('ghost2')
      }
      direction = 'left'
      checkCellsGhosts()


    // RIGHT FOR 4 
    } else if (move === 4  && direction !== 'left' && !(ghost2 % width === width - 1)) {
      cells[ghost2].classList.remove('ghost2')
      ghost2 += 1
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 -= 1
        cells[ghost2].classList.add('ghost2')
      } else if (cells[ghost2].classList.contains('portal')) {
        cells[ghost2].classList.remove('ghost2')
        ghost2 -= 17
        cells[ghost2].classList.add('ghost2')
      } else {
        cells[ghost2].classList.add('ghost2')
      }
      direction = 'right'
      checkCellsGhosts()

    // UP FOR 5 & 3
    } else if ((move === 5 || move === 3) && direction !== 'down' && !(ghost2 < width)) {
      cells[ghost2].classList.remove('ghost2')
      ghost2 -= width
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 += width
        cells[ghost2].classList.add('ghost2')
      } else {
        cells[ghost2].classList.add('ghots2')
      }
      direction = 'up'
      checkCellsGhosts()
    }
  }, 500)
}


// MOVING GHOST 3 = PINK ====================================================================================

let isPlaying3 
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
    if ((move === 0 || move === 1 || move === 6) && direction !== 'up' && !(ghost3 > (width ** 2) - width - 1)) {
      cells[ghost3].classList.remove('ghost3')

      ghost3 += width 
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 -= width
        cells[ghost3].classList.add('ghost3')
      } else {
        cells[ghost3].classList.add('ghost3')
      }
      direction = 'down'
      checkCellsGhosts()

    //LEFT FOR 1 & 2 & 3
    } else if ((move === 1 || move === 2 || move === 3) && direction !== 'right' && (!(ghost3 % width === 0) || cells[ghost3].classList.contains('portal')) ){
      cells[ghost3].classList.remove('ghost3')
      ghost3 -= 1
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 += 1
        cells[ghost3].classList.add('ghost3')
      } else if (cells[ghost3].classList.contains('portal')) {
        cells[ghost3].classList.remove('ghost3')
        ghost3 += 17
        cells[ghost3].classList.add('ghost3')
      } else {
        cells[ghost3].classList.add('ghost3')
      }
      direction = 'left'
      checkCellsGhosts()


    // RIGHT FOR 4 
    } else if (move === 4  && direction !== 'left' && !(ghost3 % width === width - 1)) {
      cells[ghost3].classList.remove('ghost3')
      ghost3 += 1
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 -= 1
        cells[ghost3].classList.add('ghost3')
      } else if (cells[ghost3].classList.contains('portal')) {
        cells[ghost3].classList.remove('ghost3')
        ghost3 -= 17
        cells[ghost3].classList.add('ghost3')
      } else {
        cells[ghost3].classList.add('ghost3')
      }
      direction = 'right'
      checkCellsGhosts()

    // UP FOR 5
    } else if (move === 5  && direction !== 'down' && !(ghost3 < width)) {
      cells[ghost3].classList.remove('ghost3')
      ghost3 -= width
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 += width
        cells[ghost3].classList.add('ghost3')
      } else {
        cells[ghost3].classList.add('ghots3')
      }
      direction = 'up'
      checkCellsGhosts()
    }
  }, 300)
}

// MOVING GHOST 4 = YELLOW ====================================================================================

let isPlaying4 
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
    if ((move === 0 || move === 1 || move === 6) && direction !== 'up' && !(ghost4 > (width ** 2) - width - 1)) {
      cells[ghost4].classList.remove('ghost4')
      ghost4 += width 
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 -= width
        cells[ghost4].classList.add('ghost4')
      } else {
        cells[ghost4].classList.add('ghost4')
      }
      direction = 'down'
      checkCellsGhosts()

    //LEFT FOR 1 & 2 & 3
    } else if ((move === 1 || move === 2 || move === 3) && direction !== 'right' && (!(ghost4 % width === 0) || cells[ghost4].classList.contains('portal')) ){
      cells[ghost4].classList.remove('ghost4')
      ghost4 -= 1
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 += 1
        cells[ghost4].classList.add('ghost4')
      } else if (cells[ghost4].classList.contains('portal')) {
        cells[ghost4].classList.remove('ghost4')
        ghost4 += 17
        cells[ghost4].classList.add('ghost4')
      } else {
        cells[ghost4].classList.add('ghost4')
      }
      direction = 'left'
      checkCellsGhosts()


    // RIGHT FOR 4 
    } else if (move === 4  && direction !== 'left' && !(ghost4 % width === width - 1)) {
      cells[ghost4].classList.remove('ghost4')
      ghost4 += 1
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 -= 1
        cells[ghost4].classList.add('ghost4')
      } else if (cells[ghost4].classList.contains('portal')) {
        cells[ghost4].classList.remove('ghost4')
        ghost4 -= 17
        cells[ghost4].classList.add('ghost4')
      } else {
        cells[ghost4].classList.add('ghost4')
      }
      direction = 'right'
      checkCellsGhosts()

    // UP FOR 5
    } else if (move === 5  && direction !== 'down' && !(ghost4 < width)) {
      cells[ghost4].classList.remove('ghost4')
      ghost4 -= width
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 += width
        cells[ghost4].classList.add('ghost4')
      } else {
        cells[ghost4].classList.add('ghots4')
      }
      direction = 'up'
      checkCellsGhosts()
    }
  }, 400)
}

// MOVING EDIBLE GHOST 1 ====================================================================================

let isPlayingEdible 
let intervalIDEdible

function moveGhostsE1() {

  if (isPlayingEdible){
    return
  }

  isPlayingEdible = true
  
  intervalIDEdible = setInterval(() => {


    const move = (Math.floor(Math.random() * 4))
    let direction

    //MOVING DOWN FOR 0 
    if ((move === 0 ) && direction !== 'up' && !(ghost1 > (width ** 2) - width - 1) && cells[ghost1 + width].classList.contains('walkway')) {
      cells[ghost1].classList.remove('edibleGHOST1')
      ghost1 += width 
      cells[ghost1].classList.add('edibleGHOST1')

      direction = 'down'


    //LEFT FOR 1 
    } else if ((move === 1) && direction !== 'right' && (!(ghost1 % width === 0) || cells[ghost1].classList.contains('portal') ) ){
      cells[ghost1].classList.remove('edibleGHOST1')
      ghost1 -= 1
      if (cells[ghost1].classList.contains('wall')) {
        ghost1 += 1
        cells[ghost1].classList.add('edibleGHOST1')
      } else if (cells[ghost1].classList.contains('portal')) {
        cells[ghost1].classList.remove('edibleGHOST1')
        ghost1 += 17
        cells[ghost1].classList.add('edibleGHOST1')
      } else {
        cells[ghost1].classList.add('edibleGHOST1')
      }
      direction = 'left'

    // RIGHT FOR 2 
    } else if (move === 2  && direction !== 'left' && !(ghost1 % width === width - 1)) {
      cells[ghost1].classList.remove('edibleGHOST1')
      ghost1 += 1
      if (cells[ghost1].classList.contains('wall')) {
        ghost1 -= 1
        cells[ghost1].classList.add('edibleGHOST1')
      } else if (cells[ghost1].classList.contains('portal')) {
        cells[ghost1].classList.remove('edibleGHOST1')
        ghost1 -= 17
        cells[ghost1].classList.add('edibleGHOST1')
      } else {
        cells[ghost1].classList.add('edibleGHOST1')
      }
      direction = 'right'

    // UP FOR 3
    } else if (move === 3  && direction !== 'down' && !(ghost1 < width)) {
      cells[ghost1].classList.remove('edibleGHOST1')
      ghost1 -= width
      if (cells[ghost1].classList.contains('wall')) {
        ghost1 += width
        cells[ghost1].classList.add('edibleGHOST1')
      } else {
        cells[ghost1].classList.add('edibleGHOST1')
      }
      direction = 'up'

    }
  }, 600)
}


// MOVING EDIBLE GHOST 2  ====================================================================================

let isPlayingEdible2 
let intervalIDEdible2

function moveGhostsE2() {

  if (isPlaying2){
    return
  }

  isPlaying2 = true
  
  intervalIDEdible2 = setInterval(() => {


    const move = (Math.floor(Math.random() * 7 ))
    let direction

    //MOVING DOWN FOR 0 & 1 & 6
    if ((move === 0 || move === 1 || move === 6) && direction !== 'up' && !(ghost2 > (width ** 2) - width - 1)) {
      cells[ghost2].classList.remove('edibleGHOST2')

      ghost2 += width 
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 -= width
        cells[ghost2].classList.add('edibleGHOST2')
      } else {
        cells[ghost2].classList.add('edibleGHOST2 ')
      }
      direction = 'down'

    //LEFT FOR 1 & 2 & 3
    } else if ((move === 1 || move === 2 || move === 3) && direction !== 'right' && (!(ghost2 % width === 0) || cells[ghost2].classList.contains('portal')) ){
      cells[ghost2].classList.remove('edibleGHOST2')
      ghost2 -= 1
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 += 1
        cells[ghost2].classList.add('gedibleGHOST2')
      } else if (cells[ghost2].classList.contains('portal')) {
        cells[ghost2].classList.remove('edibleGHOST2')
        ghost2 += 17
        cells[ghost2].classList.add('edibleGHOST2')
      } else {
        cells[ghost2].classList.add('edibleGHOST2')
      }
      direction = 'left'

    // RIGHT FOR 4 
    } else if (move === 4  && direction !== 'left' && !(ghost2 % width === width - 1)) {
      cells[ghost2].classList.remove('edibleGHOST2')
      ghost2 += 1
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 -= 1
        cells[ghost2].classList.add('edibleGHOST2')
      } else if (cells[ghost2].classList.contains('portal')) {
        cells[ghost2].classList.remove('edibleGHOST2')
        ghost2 -= 17
        cells[ghost2].classList.add('edibleGHOST2')
      } else {
        cells[ghost2].classList.add('edibleGHOST2')
      }
      direction = 'right'

    // UP FOR 5
    } else if (move === 5  && direction !== 'down' && !(ghost2 < width)) {
      cells[ghost2].classList.remove('ghost2')
      ghost2 -= width
      if (cells[ghost2].classList.contains('wall')) {
        ghost2 += width
        cells[ghost2].classList.add('edibleGHOST2')
      } else {
        cells[ghost2].classList.add('edibleGHOST2')
      }
      direction = 'up'
    }
    // console.log(move, ghost2)

  }, 700)
}


// MOVING EDIBLE GHOST 3 = PINK ====================================================================================

let isPlayingEdible3 
let intervalIDEdible3

function moveGhostsE3() {

  if (isPlayingEdible3){
    return
  }

  isPlayingEdible3 = true
  
  intervalIDEdible3 = setInterval(() => {


    const move = (Math.floor(Math.random() * 7 ))
    let direction

    //MOVING DOWN FOR 0 & 1 & 6
    if ((move === 0 || move === 1 || move === 6) && direction !== 'up' && !(ghost3 > (width ** 2) - width - 1)) {
      cells[ghost3].classList.remove('edibleGHOST3')

      ghost3 += width 
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 -= width
        cells[ghost3].classList.add('edibleGHOST3')
      } 
      else {
        cells[ghost3].classList.add('edibleGHOST3')
      }
      direction = 'down'

    //LEFT FOR 1 & 2 & 3
    } else if ((move === 1 || move === 2 || move === 3) && direction !== 'right' && (!(ghost3 % width === 0) || cells[ghost3].classList.contains('portal')) ){
      cells[ghost3].classList.remove('edibleGHOST3')
      ghost3 -= 1
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 += 1
        cells[ghost3].classList.add('edibleGHOST3')
      } else if (cells[ghost3].classList.contains('portal')) {
        cells[ghost3].classList.remove('edibleGHOST3')
        ghost3 += 17
        cells[ghost3].classList.add('edibleGHOST3')
      } else {
        cells[ghost3].classList.add('edibleGHOST3')
      }
      direction = 'left'

    // RIGHT FOR 4 
    } else if (move === 4  && direction !== 'left' && !(ghost3 % width === width - 1)) {
      cells[ghost3].classList.remove('edibleGHOST3')
      ghost3 += 1
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 -= 1
        cells[ghost3].classList.add('edibleGHOST3')
      } else if (cells[ghost3].classList.contains('portal')) {
        cells[ghost3].classList.remove('edibleGHOST3')
        ghost3 -= 17
        cells[ghost3].classList.add('edibleGHOST3')
      } else {
        cells[ghost3].classList.add('edibleGHOST3')
      }
      direction = 'right'

    // UP FOR 5
    } else if (move === 5  && direction !== 'down' && !(ghost3 < width)) {
      cells[ghost3].classList.remove('edibleGHOST3')
      ghost3 -= width
      if (cells[ghost3].classList.contains('wall')) {
        ghost3 += width
        cells[ghost3].classList.add('edibleGHOST3')
      } else {
        cells[ghost3].classList.add('edibleGHOST3')
      }
      direction = 'up'
    }
  }, 800)
}

// MOVING EDIBLE GHOST 4 = YELLOW ====================================================================================

let isPlayingEdible4 
let intervalIDEdible4

function  moveGhostsE4() {

  if (isPlayingEdible4){
    return
  }

  isPlayingEdible4 = true
  
  intervalIDEdible4 = setInterval(() => {


    const move = (Math.floor(Math.random() * 7 ))
    let direction

    //MOVING DOWN FOR 0 & 1 & 6
    if ((move === 0 || move === 1 || move === 6) && direction !== 'up' && !(ghost4 > (width ** 2) - width - 1)) {
      cells[ghost4].classList.remove('edibleGHOST4')
      ghost4 += width 
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 -= width
        cells[ghost4].classList.add('edibleGHOST4')
      } else {
        cells[ghost4].classList.add('edibleGHOST4')
      }
      direction = 'down'

    //LEFT FOR 1 & 2 & 3
    } else if ((move === 1 || move === 2 || move === 3) && direction !== 'right' && (!(ghost4 % width === 0) || cells[ghost4].classList.contains('portal')) ){
      cells[ghost4].classList.remove('edibleGHOST4')
      ghost4 -= 1
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 += 1
        cells[ghost4].classList.add('edibleGHOST4')
      } else if (cells[ghost4].classList.contains('portal')) {
        cells[ghost4].classList.remove('edibleGHOST4')
        ghost4 += 17
        cells[ghost4].classList.add('edibleGHOST4')
      } else {
        cells[ghost4].classList.add('edibleGHOST4')
      }
      direction = 'left'

    // RIGHT FOR 4 
    } else if (move === 4  && direction !== 'left' && !(ghost4 % width === width - 1)) {
      cells[ghost4].classList.remove('edibleGHOST4')
      ghost4 += 1
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 -= 1
        cells[ghost4].classList.add('edibleGHOST4')
      } else if (cells[ghost4].classList.contains('portal')) {
        cells[ghost4].classList.remove('edibleGHOST4')
        ghost4 -= 17
        cells[ghost4].classList.add('edibleGHOST4')
      } else {
        cells[ghost4].classList.add('edibleGHOST4')
      }
      direction = 'right'

    // UP FOR 5
    } else if (move === 5  && direction !== 'down' && !(ghost4 < width)) {
      cells[ghost4].classList.remove('edibleGHOST4')
      ghost4 -= width
      if (cells[ghost4].classList.contains('wall')) {
        ghost4 += width
        cells[ghost4].classList.add('edibleGHOST4')
      } else {
        cells[ghost4].classList.add('edibleGHOST4')
      }
      direction = 'up'
    }
  }, 800)
}