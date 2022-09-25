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

const states = {
  Q0: {
    func: () =>
      tfSwitchLedsState(trafficLights.car, [
        tfLedTurnOff,
        tfLedTurnOff,
        tfLedTurnOff,
      ]) & tfSwitchLedsState(trafficLights.ped, [tfLedTurnOff, tfLedTurnOff]),
    next: "Q1",
    delay: 0,
  },
  Q1: {
    func: () =>
      tfSwitchLedsState(trafficLights.car, [
        tfLedTurnOn,
        tfLedTurnOff,
        tfLedTurnOff,
      ]) & tfSwitchLedsState(trafficLights.ped, [tfLedTurnOff, tfLedTurnOn]),
    next: "Q2",
    delay: 20,
  },
  Q2: {
    func: () =>
      tfSwitchLedsState(trafficLights.car, [
        tfLedTurnOn,
        tfLedTurnOn,
        tfLedTurnOff,
      ]) & tfSwitchLedsState(trafficLights.ped, [tfLedTurnOn, tfLedTurnOff]),
    next: "Q3",
    delay: 15,
  },
  Q3: {
    func: () =>
      tfSwitchLedsState(trafficLights.car, [
        tfLedTurnOff,
        tfLedTurnOff,
        tfLedTurnOn,
      ]) & tfSwitchLedsState(trafficLights.ped, [tfLedTurnOn, tfLedTurnOff]),
    next: "Q4",
    delay: 25,
  },
  Q4: {
    func: () =>
      tfSwitchLedsState(trafficLights.car, [
        tfLedTurnOff,
        tfLedTurnOn,
        tfLedTurnOff,
      ]) & tfSwitchLedsState(trafficLights.ped, [tfLedTurnOn, tfLedTurnOff]),
    next: "Q1",
    delay: 15,
  },
};

let timer = 0;
let state = "Q0";

const update = () => {
  document.querySelector("#state").innerHTML = state;

  states[state].func();

  setTimeout(update, states[state].delay * 100);
  state = states[state].next;
};

setInterval(() => {
  document.querySelector("#timer").innerHTML = "" + timer;
  timer++;
}, 100);

update();
