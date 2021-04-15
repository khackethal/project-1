//Getting my cinsts to build the grid
const grid = document.querySelector('.grid')

//Setting width to 18 cells for initial grid
const width = 18

//Create an array of all my cells
const cells = []

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

console.log(cells)

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
      // and have all other cells as walkway - adding color for now to check it's working ok 
    } else {
      cells[index].classList.add('walkway')
    }

  }) 
  addFood()

}

buildGridLevel1()

function addFood() {

  cells.forEach((cell, index) => {

    if (index === 37 || index === 52 || index === 271 || index === 286) {
      cells[index].classList.add('specialfood')
    }

  })

}