function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      // Do something for the currently logged-in user here:
      console.log(user.uid); //print the uid in the browser console
      console.log(user.displayName); //print the user name in the browser console
      user_Name = user.displayName;
      $("#name-goes-here").text(user_Name); //using jquery
    } else {
      // No user is signed in.
    }
  });
}
insertName();

// Function to read the quote of the day from Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name
function readQuote(day) {
  db.collection("quotes")
    .doc(day)
    .onSnapshot((mondayDoc) => {
      console.log("current document data: " + mondayDoc.data());
      document.getElementById("quote-goes-here").innerHTML =
        mondayDoc.data().quote;
    });
}
readQuote("monday");

function readPoints() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot((doc) => {
          console.log(doc.data());
          const userPoints = doc.data().points;
          document.getElementById("points-goes-here").innerHTML = userPoints;
        });
    } else {
    }
  });
}
readPoints();

const ecoActions = [
  {
    action: "Using a clothesline to dry clothes instead of a dryer",
    score: 20
  },
  {
    action: "Repairing or repurposing items instead of throwing them away",
    score: 30
  },
  {
    action: "Using a programmable thermostat to conserve energy",
    score: 20
  },
  {
    action: "Avoiding single-use plastics",
    score: 10
  },
  {
    action: "Supporting sustainable farming and fishing practices",
    score: 20
  },
  {
    action: "Using non-toxic cleaning products",
    score: 10
  },
  {
    action: "Supporting politicians and policies that prioritize environmental protection",
    score: 40
  },
  {
    action: "Participating in community clean-up events",
    score: 30
  },
  {
    action: "Using a bidet or reusable cloth wipes instead of disposable toilet paper",
    score: 20
  },
  {
    action: "Reducing meat consumption and adopting a plant-based diet",
    score: 30
  },
  {
    action: "Using a reusable water bottle instead of disposable plastic bottles",
    score: 10
  },
  {
    action: "Taking public transportation, biking or walking instead of driving a car",
    score: 20
  },
  {
    action: "Planting a tree or starting a garden",
    score: 30
  },
  {
    action: "Using energy-efficient appliances and light bulbs",
    score: 10
  },
  {
    action: "Buying organic and locally-sourced foods",
    score: 20
  },
  {
    action: "Composting food waste instead of throwing it away",
    score: 30
  },
  {
    action: "Installing solar panels or using other renewable energy sources",
    score: 40
  },
  {
    action: "Using cloth bags instead of plastic bags",
    score: 10
  },
  {
    action: "Turning off lights and electronics when not in use",
    score: 10
  },
  {
    action: "Supporting companies with eco-friendly practices and policies",
    score: 20
  }
];

function writeEcoActions() {
  var ecoActionsRef = db.collection("ecoActions");

  ecoActions.forEach(action => {
    ecoActionsRef.add({
      action: action.action,
      score: action.score,
    });
  });
}

writeEcoActions();

