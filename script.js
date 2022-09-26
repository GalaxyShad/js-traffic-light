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
} 

let timer = 0;
let state = "Q0";

const states = {
  Q0: {
    func: () => tfSwitchLedsStateCarPed(
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
    delay: 20,
  },
  Q2: {
    func: () => tfSwitchLedsStateCarPed(
      [tfLedTurnOn, tfLedTurnOn, tfLedTurnOff], 
      [tfLedTurnOn, tfLedTurnOff]
    ),
    next: "Q3",
    delay: 15,
  },
  Q3: {
    func: () => tfSwitchLedsStateCarPed(
      [tfLedTurnOff, tfLedTurnOff, tfLedTurnOn], 
      [tfLedTurnOn, tfLedTurnOff]
    ),
    next: "Q3_Blink_Off",
    delay: 25,
  },
  Q3_Blink_Off: {
    func: (me) => {
      tfSwitchLedsStateCarPed(
        [tfLedTurnOff, tfLedTurnOff, tfLedTurnOff], 
        [tfLedTurnOn, tfLedTurnOff]
      );

      me.next = (me.blinkTimes > 3) ? "Q4" : "Q3_Blink_On";
      me.blinkTimes = me.next == "Q4" ? 0 : me.blinkTimes + 1;  
    },
    next: "Q3_Blink_On",
    delay: 2,
    blinkTimes: 0
  },
  Q3_Blink_On: {
    func: () => tfSwitchLedsStateCarPed(
      [tfLedTurnOff, tfLedTurnOff, tfLedTurnOn], 
      [tfLedTurnOn, tfLedTurnOff]
    ),
    next: "Q3_Blink_Off",
    delay: 2,
  },
  Q4: {
    func: () => tfSwitchLedsStateCarPed(
      [tfLedTurnOff, tfLedTurnOn, tfLedTurnOff], 
      [tfLedTurnOn, tfLedTurnOff]
    ),
    next: "Q1",
    delay: 15,
  },
};

const update = () => {
  document.querySelector("#state").innerHTML = state;

  states[state].func(states[state]);

  setTimeout(update, states[state].delay * 100);
  state = states[state].next;
};

setInterval(() => {
  document.querySelector("#timer").innerHTML = "" + timer;
  timer++;
}, 100);

update();
