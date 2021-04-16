//Getting my cinsts to build the grid
const grid = document.querySelector('.grid')

//Setting width to 18 cells for initial grid
const width = 18

//Create an array of all my cells
const cells = []
const walkway = []
let points = 0
let lives = 3

let pacman = 0

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


//Looping through the array to build the grid- I will bash this into a function later

function buildGridLevel1 () {

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

}

buildGridLevel1()
// console.log(walkway)
//the ghosts will loop though walkway and check they're getting closer to PACMAN, whilst PACMAN runs on the cells array

function addFood() {

  walkway.forEach((cell, index) => {

    walkway[index].innerHTML = index

    if (index < 38 || index > 77 ) {
      walkway[index].classList.add('food')
    }

  })
}


//Moving PACMAN on the grid
pacman = ((width * (width - 1) - 2))
cells[pacman].classList.add('pacman')

// pacman = walkway.length - 1
// walkway[pacman].classList.add('pacman')

// ? Moving harry based on the keystrokes
document.addEventListener('keydown', (event) => {
  // ? Get the keyboard character typed from event.key
  const key = event.key

  //FIRST STEP MOVING ON FULL GRID AAAND solved wall problem boom

  //MOVING DOWN

  if (key === 'ArrowDown' && !(pacman > (width ** 2) - width - 2)) {
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
    else {
      cells[pacman].classList.add('pacman')
    }
    checkCells()


  // RIGHT
  } else if (key === 'ArrowRight' && !(pacman % width === width - 2)) {
    cells[pacman].classList.remove('pacman')
    pacman += 1
    if (cells[pacman].classList.contains('wall')) {
      pacman -= 1
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
  if ((cells[pacman].classList.contains('food'))) {
    points += 10
    cells[pacman].classList.remove('food')
  }
  else if ((cells[pacman].classList.contains('specialfood'))) {
    points += 50
    cells[pacman].classList.remove('specialfood')
  }
  console.log(points)
}


