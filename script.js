const trafficLights = {
  car: [
    document.querySelector("#tf_car_red"),
    document.querySelector("#tf_car_yellow"),
    document.querySelector("#tf_car_green"),
  ],
  ped: [
    document.querySelector("#tf_ped_red"),
    document.querySelector("#tf_ped_green"),
  ],
};

const tfLedTurnOn = (viewNode) => viewNode.classList.add("active");
const tfLedTurnOff = (viewNode) => viewNode.classList.remove("active");
const tfSwitchLedsState = (trafficLight, statesAction) =>
  trafficLight.map((led, index) => statesAction[index](led));

const tfSwitchLedsStateCarPed = (car, ped) => {
  tfSwitchLedsState(trafficLights.car, car);
  tfSwitchLedsState(trafficLights.ped, ped);
};

let timer = 0;
let state = "Q0";

const states = {
  Q0: {
    func: () =>
      tfSwitchLedsStateCarPed(
        [tfLedTurnOff, tfLedTurnOff, tfLedTurnOff],
        [tfLedTurnOff, tfLedTurnOff]
      ),
    next: "Q1",
    delay: 0,
  },
  Q1: {
    func: () =>
      tfSwitchLedsStateCarPed(
        [tfLedTurnOn, tfLedTurnOff, tfLedTurnOff],
        [tfLedTurnOff, tfLedTurnOn]
      ),
    next: "Q2",
    delay: 10,
  },
  Q2: {
    func: () =>
      tfSwitchLedsStateCarPed(
        [tfLedTurnOn, tfLedTurnOn, tfLedTurnOff],
        [tfLedTurnOn, tfLedTurnOff]
      ),
    next: "Q3",
    delay: 12,
  },
  Q3: {
    func: () =>
      tfSwitchLedsStateCarPed(
        [tfLedTurnOff, tfLedTurnOff, tfLedTurnOn],
        [tfLedTurnOn, tfLedTurnOff]
      ),
    next: "Q4",
    delay: 22,
  },
  Q4: {
    func: () =>
      tfSwitchLedsStateCarPed(
        [tfLedTurnOff, tfLedTurnOn, tfLedTurnOff],
        [tfLedTurnOn, tfLedTurnOff]
      ),
    next: "Q1",
    delay: 24,
  },
};

document.querySelector("#state").innerHTML = state;
document.querySelector("#timer").innerHTML = "" + timer;
setInterval(() => {
  if (timer == states[state].delay) state = states[state].next;

  states[state].func(states[state]);

  timer++;
  timer %= 25;

  document.querySelector("#state").innerHTML = state;
  document.querySelector("#timer").innerHTML = "" + timer;
}, 1000);
