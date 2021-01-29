/**********************************************
 * Tic Tac Toe
 * ==================================
 ***********************************************/
/** # Create a two-player Tic Tac Toe Game with slide animation 
 * for each placement (Either O or X). Your game should be able to 
 * identify which side is winning the game and end the game correspondingly.

Make the board using HTML and CSS, use CSS class to assign O or X to 
the board on user input.  #
/*  ====================== */
/**  */

$(function () {
  // Selecting all field classes
  var fields = $(".field");
  // Tracking the number of clicks
  let clicks = 0;
  // Tracking player one's crosses
  var crosses = [];
  // Tracking player two's circles
  var circles = [];
  // Tracking who won
  var won = false;

  // All the possible combinations of winning tic tac toe
  var possibleCombinations = {
    // Row
    1: [1, 2, 3],
    //Row
    2: [4, 5, 6],
    //Row
    3: [7, 8, 9],
    // Diagonal
    4: [1, 4, 7],
    // Diagonal
    5: [2, 5, 8],
    // Column
    6: [3, 6, 9],
    // Column
    7: [1, 5, 9],
    // Column
    8: [3, 5, 7],
  };

  // If any of the fields have a click
  fields.on("click", function (e) {
    console.log("clicked!");
    if (won) {
      return;
    }
    // Get the id of that field
    var id = e.target.id;
    var field = $(`#${id}`);

    if (
      field.hasClass("cross") ||
      field.hasClass("circle")
    ) {
      return;
    }
    // Player one's turn
    if (clicks % 2 === 0) {
      // Add cross class to that field (so that the user can no longer click on it)
      field.addClass("cross");
      // Get the id of that field
      crosses.push(parseInt(id));
      // Check if the user has won yet
      checkWin(crosses, "cross");
    } else if (clicks % 2 !== 0) {
      // Player two's turn
      field.addClass("circle");
      // Get the id of that field
      circles.push(parseInt(id));
      // Check if the user has won yet
      checkWin(circles, "circle");
    } else {
      return;
    }
    console.log("Click number " + clicks);
    clicks++;
    // Keep track of all the clicks
  });
  function checkWin(arr, name) {
    if (arr.length < 3) return;

    for (var p in possibleCombinations) {
      if (
        possibleCombinations[p].every(
          (elem) => arr.indexOf(elem) > -1
        )
      ) {
        won = true;
        setTimeout(function () {
          return alert(`player ${name} won`);
        }, 500);
      }
    }
  }
  // Reload the entire game
  $("#reload-btn").click(function () {
    fields.removeClass("cross circle");
    cross = [];
    circle = [];
    clicks = 0;
    won = false;
  });
});
