var curPlayer = 1;
var ticArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var won = false;
let i = 0;
var fields = $("td");
var possibleCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

// window.onerror = function (error) {
// 	alert(
// 		"There is some error when loading this game. Can you refresh the page again? Most possibily due to slow internet"
// 	);
// };

$(document).ready(function (e) {
  // CODE HERE
  $("input").click(function (e) {
    // CODE HERE
    // e.preventDefault();
    fields.empty();
    circles = [];
    crosses = [];
  });
});
$("button.modePVP").click(function (e) {
  fields.empty();
  var ticArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  clicks = 0;
  console.log(clicks);
  var crosses = [];
  var circles = [];
  var won = false;

  var possibleCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];
  fields.unbind("click");
  fields.on("click", function (e) {
    var field = $(e.target);
    console.log(field);

    if (ticArr[+field[0].id] != 0) {
      console.log("fuckoff");
      return;
    }
    if (clicks % 2 === 0) {
      field.append(`<i class="fas fa-times"></i>`);
      crosses.push(+field[0].id);
      ticArr[+field[0].id] = 1;
      console.log(crosses);

      checkWin(crosses, "player1");
    } else if (clicks % 2 !== 0) {
      field.append(`<i class="far fa-circle"></i>`);
      circles.push(+field[0].id);
      ticArr[+field[0].id] = 2;
      console.log(circles);
      checkWin(circles, "player2");
    } else {
      return;
    }
    console.log("Click number " + clicks);
    clicks++;
  });
  // function checkWin(arr, name) {
  // 	let reducer = (x, y) => x && y;
  // 	for (i = 0; i < possibleCombinations.length; i++) {
  // 		if (
  // 			possibleCombinations[i]
  // 				.map((x) => (arr.includes(x) ? true : false))
  // 				.reduce(reducer) == true
  // 		) {
  // 			fields.removeClass("circle");
  // 			fields.removeClass("cross");
  // 			circles = [];
  // 			crosses = [];
  // 			return alert(`${name}wins`);
  // 		}
  // 	}
  // }
});

$("button.modePVSAI").click(function () {
  // CODE HERE
  fields.empty();
  var ticArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var crosses = [];
  var circles = [];
  won = false;

  fields.unbind("click");
  fields.on("click", function (e) {
    var field = $(e.target);
    if (ticArr[+field[0].id] != 0) {
      console.log("fuckoff");
      return;
    }
    field.append(`<i class="fas fa-times"></i>`);
    ticArr[+field[0].id] = 1;
    crosses.push(+field[0].id);
    checkWin(crosses, "player1");
    console.log(won);
    if (won != true) {
      for (let g = 0; g < ticArr.length; g++) {
        if (ticArr[g] === 0) {
          $(`td[id=${g.toString()}]`).append(
            `<i class="far fa-circle"></i>`
          );
          ticArr[g] = 2;
          circles.push(g);
          checkWin(circles, "AI");
          return;
        }
      }
    }
  });
});

$("button.modePVMAI").click(function () {
  // CODE HERE
  fields.empty();
  var crosses = [];
  var circles = [];
  var ticArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  won = false;
  fields.unbind("click");
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var x = 9;

  //if my first clicked box is ID#0, i wont able to click the same box twice since ID#0's value changed to 1
  //if my first clicked box isnt ID#0, the "fuckoff" if statement will detecte the value of box ID#0, which allows me to appand X again
  //other than this, the numbers filter doesnt seems working

  fields.on("click", function (e) {
    var field = $(e.target);

    console.log("Field id", field[0].id);
    //should be the id of box i clicked

    console.log(
      "Hello,  element in ticarr's specific index",
      ticArr[+field[0].id]
    );
    //if target box is empty, should be 0, else should be 1
    if (ticArr[+field[0].id] != 0) {
      console.log("fuckoff");
      //if previous consolelog != 0, this should append
      return;
    }
    field.append(`<i class="fas fa-times"></i>`);

    console.log("whole arr", ticArr);
    ticArr[+field[0].id] = 1;
    //reassign element's value for Hello
    console.log("Hello's new value", ticArr[+field[0].id]);
    //expecting to see updated value for Hello
    console.log("updated whole arr", ticArr);
    //expecting to see updated value for whole arr
    crosses.push(+field[0].id);
    numbers.filter((x) => x != +field[0].id);
    //removing id number from numbers arr
    console.log("numbers arr", numbers);
    //expecting numbers arr without target id number
    //numbers arr is for the logic of random number below without repeating
    checkWin(crosses, "player1");

    let aiTurn = () => {
      let g = Math.floor(Math.random() * x);
      if (ticArr[numbers[g]] == 0) {
        $(`td[id=${g.toString()}]`).append(
          `<i class="far fa-circle"></i>`
        );
        ticArr[g] = 2;
        numbers.filter((x) => x != g);
        x--;
        circles.push(g);
        console.log(numbers);
        checkWin(circles, "AI");
      } else {
        aiTurn();
      }
    };

    if (won != true) {
      aiTurn();
    }
  });
  // fields.empty();
  // var ticArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  // var crosses = [];
  // var circles = [];
  // won = false;

  // fields.unbind("click");
  // fields.on("click", function (e) {
  // 	var field = $(e.target);
  // 	if (ticArr[+field[0].id] != 0) {
  // 		console.log("fuckoff");
  // 		return;
  // 	}
  // 	field.append(`<i class="fas fa-times"></i>`);
  // 	ticArr[+field[0].id] = 1;
  // 	crosses.push(+field[0].id);
  // 	checkWin(crosses, "player1");
  // 	console.log(won);
  // 	if (won != true) {
  // 		for (let g = 0; g < ticArr.length; g++) {
  // 			if (ticArr[g] === 0) {
  // 				$(`td[id=${g.toString()}]`).append(`<i class="far fa-circle"></i>`);
  // 				ticArr[g] = 2;
  // 				circles.push(g);
  // 				checkWin(circles, "AI");
  // 				return;
  // 			}
  // 		}
  // 	}
  // });
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
      alert(`${name} wins`);
      fields.unbind("click");
      won = true;
      console.log(won);
      return;
    }
  }
}

// 	$("button.modePVEAI").click(function () {
// 		// CODE HERE
// 	});

// 	function unbindButton(btn) {
// 		// CODE HERE
// 	}

// 	function checkFinalWin() {
// 		// CODE HERE
// 	}

// 	function checkWin(b1, b2, b3) {
// 		// CODE HERE
// 	}

// 	function checkFinalPossWin() {
// 		// CODE HERE
// 	}

// 	function checkPossWin(b1, b2, b3) {
// 		// CODE HERE
// 	}

// 	function checkPossLose(b1, b2, b3) {
// 		// CODE HERE
// 	}

// 	function checkDraw() {
// 		// CODE HERE
// 	}

// 	function GodAI() {
// 		// CODE HERE
// 	}

// 	function winBlockLose() {
// 		// CODE HERE
// 	}
// });
