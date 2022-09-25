

const viewNodes = {
    car: {
        red: document.querySelector("#tf_car_red"),
        yellow: document.querySelector("#tf_car_yellow"),
        green: document.querySelector("#tf_car_green"),
    },
    ped: {
        red: document.querySelector("#tf_ped_red"),
        green: document.querySelector("#tf_ped_green"),
    },
}

const viewTurnLed = (tl, led, state) => {
    Object.keys(viewNodes[tl]).forEach(key => {
        if (led === key) {
            if (state) viewNodes[tl][key].classList.add("active");
            else viewNodes[tl][key].classList.remove("active");
        }
    });
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const procBlinkingGreen = () => {
    let times = 0;
    isOn = false;

    const interval = setTimeout(() => {
        viewTurnLed("green", isOn);
        isOn = !isOn;
        times++;
    }, 50);

    if (times > 20)
    clearInterval(interval);
}

const states = {
    Q0: {
        func: () => null,
        next: "Q1",
        delay: 0,
    },
    Q1: {
        func: () => viewTurnLed('car', "yellow", false) & 
                    viewTurnLed('car', "red", true) &
                    viewTurnLed('ped', "green", true) &
                    viewTurnLed('ped', "red", false),
        next: "Q2",
        delay: 20,
    },
    Q2: {
        func: () => viewTurnLed('car', "yellow", true) &
                    viewTurnLed('ped', "green", false) &
                    viewTurnLed('ped', "red", true),
        next: "Q3",
        delay: 15,
    },
    Q3: {
        func: () =>
        viewTurnLed('car', "red", false) &
        viewTurnLed('car', "yellow", false) &
        viewTurnLed('car', "green", true),
        next: "Q4",
        delay: 25,
    },
    Q4: {
        func: () => viewTurnLed('car', "green", false) & viewTurnLed('car', "yellow", true),
        next: "Q1",
        delay: 15,
    },
};

let timer = 0;
let state = "Q0"
const update = () => {
    document.querySelector("#state").innerHTML = state;

    states[state].func();

    setTimeout(update, states[state].delay * 100);
    state = states[state].next;
}

setInterval(() => {
    document.querySelector("#timer").innerHTML = ''+timer;
    timer++; 
}, 100)

update();

