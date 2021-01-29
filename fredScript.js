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
  var possibleCombinations = [
    // CODE HERE
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
  ];

  // If any of the fields have a click
  fields.on("click", function (e) {
    // CODE HERE
    // $(this).addClass("cross");
    // console.log($(this));
    var field = $(e.target);
    console.log(field);

    // Get the id of that field

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
      crosses.push(+field[0].id);
      // Check if the user has won yet
      checkWin(crosses, "player1");
    } else if (clicks % 2 !== 0) {
      // Player two's turn
      field.addClass("circle");
      // Get the id of that field
      circles.push(+field[0].id);
      // Check if the user has won yet
      checkWin(circles, "player2");
    } else {
      return;
    }
    console.log("Click number " + clicks);
    clicks++;
    // Keep track of all the clicks
  });
  function checkWin(arr, name) {
    // CODE HERE
    let reducer = (x, y) => x && y;
    for (i = 0; i < possibleCombinations.length; i++) {
      if (
        possibleCombinations[i]
          .map((x) => (arr.includes(x) ? true : false))
          .reduce(reducer) == true
      ) {
        alert(`${name}wins`);
      }
    }
  }

  // Reload the entire game
  $("#reload-btn").click(function () {
    // CODE HERE
    fields.removeClass("circle");
    fields.removeClass("cross");
    circles = [];
    crosses = [];
  });
});
