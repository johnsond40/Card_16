/*array containing the image slice */
var images = ['1_1', '1_2', '1_3', '1_4', '2_1', '2_2', '2_3', '2_4', '3_1', '3_2', '3_3', '3_4', '4_1', '4_2', '4_3', '4_4'];
/*divs that contain the image*/
var isStarted = false;
var shuffledImages = [];
console.log('shuffledImages');


var container = document.getElementById('pieces-container');
/*Create the image and put them in divs*/
drawPuzzle(images);

var startGameButton = document.getElementById('btn-start');
startGameButton.addEventListener('click', function(event) {
    console.log('start game');
    shuffledImages = [];
    for (i = 0; i < images.length; i++) shuffledImages[i] = images[i];
    shuffledImages = shuffle(shuffledImages);
    console.log('images');
    shuffledImages[0] = 'blank';
    shuffle(shuffledImages);
    drawPuzzle(shuffledImages);
    isStarted = true;
});

function drawPuzzle(imageSet) {
    container.innerHTML = '';
    /*Create the image and put them in divs*/
    var row = 1;
    var column = 0;
    for (i = 0; i < imageSet.length; i++) {
        column++;
        if (column == 5) {
            row++;
            column = 1;
        }
        container.innerHTML += '<div class="col-3" style="max-width:187px;"><img id="' + row + '_' + column + '" data-row="' + row + '" data-column="' + column + '" class="" src="set1/' + imageSet[i] + '.png" /></div>';
    }
}

document.getElementById('pieces-container').addEventListener('click', function(event) {
    if (isStarted == false || event.target.getAttribute('data-row') == null)
        return;
    row = parseInt(event.target.getAttribute('data-row'));
    column = parseInt(event.target.getAttribute('data-column'));
    checkAbove(row - 1, column);
    checkBelow(row + 1, column);
    checkLeft(row, column - 1);
    checkRight(row, column + 1);
    if (checkVictory()) {
        alert('You won the game!');
        isStarted = false;
    }
});

function checkAbove(row, column) {
    if (row == 0 || isNaN(row)) return;
    console.log(document.getElementById(row + '_' + column).src);
    if (document.getElementById(row + '_' + column).src.includes('blank.png')) {
        var temp = document.getElementById((row + 1) + '_' + column).src;
        document.getElementById((row + 1) + '_' + column).src = document.getElementById(row + '_' + column).src;
        document.getElementById(row + '_' + column).src = temp;
    }
}

function checkBelow(row, column) {
    if (row == 5 || isNaN(column)) return;
    console.log(document.getElementById(row + '_' + column).src);
    if (document.getElementById(row + '_' + column).src.includes('blank.png')) {
        var temp = document.getElementById((row - 1) + '_' + column).src;
        document.getElementById((row - 1) + '_' + column).src = document.getElementById(row + '_' + column).src;
        document.getElementById(row + '_' + column).src = temp;
    }
}

function checkLeft(row, column) {
    if (column == 0 || isNaN(row)) return;
    console.log(document.getElementById(row + '_' + column).src);
    if (document.getElementById(row + '_' + column).src.includes('blank.png')) {
        var temp = document.getElementById(row + '_' + (column + 1)).src;
        document.getElementById(row + '_' + (column + 1)).src = document.getElementById(row + '_' + column).src;
        document.getElementById(row + '_' + column).src = temp;
    }
}

function checkRight(row, column) {
    if (column == 5 || isNaN(column)) return;
    console.log(document.getElementById(row + '_' + column).src);
    if (document.getElementById(row + '_' + column).src.includes('blank.png')) {
        var temp = document.getElementById(row + '_' + (column - 1)).src;
        document.getElementById(row + '_' + (column - 1)).src = document.getElementById(row + '_' + column).src;
        document.getElementById(row + '_' + column).src = temp;
    }
}

function checkVictory() {
    var row = 1;
    var column = 0;
    for (i = 0; i < images.length; i++) {
        column++;
        if (column == 5) {
            row++;
            column = 1;
        }
        if (!document.getElementById(row + '_' + column).src.includes(images[i]) && !document.getElementById(row + '_' + column).src.includes('blank.png')) return false;
    }
    return true;
}