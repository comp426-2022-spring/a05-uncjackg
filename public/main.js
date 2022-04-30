// oneFlip button
const oneFlip = document.getElementById("oneFlip");
oneFlip.addEventListener("click", flipOneCoin);

async function flipOneCoin() {
  console.log("flipping one coin")
  const url = document.baseURI + "app/flip/";
  await fetch(url).then(function(res) {
    return res.json();
  }).then(function(result) {
    // display result on the flip page
    document.getElementById("flipResult").innerHTML = result.flip;
    document.getElementById("quarter").setAttribute("src", "assets/img/" + result.flip+".png");
  });
}

// manyFlips button
const numCoins = document.getElementById("numcoins");
const manyFlips = document.getElementById("manyFlips");
manyFlips.addEventListener("click", flipManyCoins);

async function flipManyCoins() {
  const num = numCoins.value || 1;
  const url = document.baseURI + "app/flips/" + num + "/";
  await fetch(url).then(function(res) {
    return res.json();
  }).then(function(result) {
    // display results on the flip page
    document.getElementById("flipResults").innerHTML = result.raw;
    document.getElementById("headsCount").innerHTML = result.summary.heads;
    document.getElementById("tailsCount").innerHTML = result.summary.tails;
  });
}

// guessFlip button
const guess = document.getElementById("myGuess");
const guessFlip = document.getElementById("guessFlip");
guessFlip.addEventListener("click", flipWithGuess);

async function flipWithGuess() {
  const guess = guess.value;
  if (guess != "heads" && guess != "tails") {
    document.getElementById("finalGuess").innerHTML = "please enter heads or tails as your guess";
  } else {
    const url = document.baseURI + "app/flip/call/" + guess; + "/";
    await fetch(url).then(function(res) {
      return res.json();
    }).then(function(result) {
      document.getElementById("flipResults").innerHTML = result;
      document.getElementById("finalGuess").innerHTML = result.call;
      document.getElementById("win").innerHTML = result.result;
    });
  }
}

// Navigation click functions
function homeNavClick() {
  document.getElementById("homenav").className = "active";
  document.getElementById("home").className = "active";
  document.getElementById("singlenav").className = "";
  document.getElementById("single").className = "inactive";
  document.getElementById("multinav").className = "";
  document.getElementById("multi").className = "inactive";
  document.getElementById("guessnav").className = "";
  document.getElementById("guess").className = "inactive";
}

function singleNavClick() {
  document.getElementById("homenav").className = "";
  document.getElementById("home").className = "inactive";
  document.getElementById("singlenav").className = "active";
  document.getElementById("single").className = "active";
  document.getElementById("multinav").className = "";
  document.getElementById("multi").className = "inactive";
  document.getElementById("guessnav").className = "";
  document.getElementById("guess").className = "inactive";
}

function multiNavClick() {
  document.getElementById("homenav").className = "";
  document.getElementById("home").className = "inactive";
  document.getElementById("singlenav").className = "";
  document.getElementById("single").className = "inactive";
  document.getElementById("multinav").className = "active";
  document.getElementById("multi").className = "active";
  document.getElementById("guessnav").className = "";
  document.getElementById("guess").className = "inactive";
}

function guessNavClick() {
  document.getElementById("homenav").className = "";
  document.getElementById("home").className = "inactive";
  document.getElementById("singlenav").className = "";
  document.getElementById("single").className = "inactive";
  document.getElementById("multinav").className = "";
  document.getElementById("multi").className = "inactive";
  document.getElementById("guessnav").className = "active";
  document.getElementById("guess").className = "active";
}
