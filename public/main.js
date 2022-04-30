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
