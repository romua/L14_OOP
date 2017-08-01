function Casino(numberOfMachines, initialMoney) {
    var self = this;
    this.machines = [];
    //get random number
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    if ((numberOfMachines > 0) && (initialMoney > 0) && (typeof numberOfMachines === 'number') && (typeof initialMoney === 'number')) {
        var _initialMoneyInMachines = Math.floor(initialMoney / numberOfMachines);
        var _moneyBonusForFirstMachine = (initialMoney / numberOfMachines) - _initialMoneyInMachines;
        var _indexOfLuckyMachine = getRandomInt(0, numberOfMachines);

        console.log("Lucky machine with index:" + _indexOfLuckyMachine);
    } else {
        console.log('Oh. I see you drunk. Lemme assign vars for you');
        numberOfMachines = 3;
        var _initialMoneyInMachines = Math.floor(initialMoney / numberOfMachines);
        var _moneyBonusForFirstMachine = (initialMoney / numberOfMachines) - _initialMoneyInMachines;
        var _indexOfLuckyMachine = getRandomInt(0, numberOfMachines);
    }

    self.machines[0] = new SlothMachine(_initialMoneyInMachines + _moneyBonusForFirstMachine);
    self.machines[0]._id = 0;

    for (var i = 1; i < numberOfMachines; i++) {
        self.machines[i] = new SlothMachine(_initialMoneyInMachines);
        self.machines[i]._id = i;

    }
    self.machines[_indexOfLuckyMachine]._isLucky = true;
    // console.log(self.machines[_indexOfLuckyMachine]);

    this._getTotalAmountOfMoney = function () {
        var totalAmountOfMoney = 0;
        for (var j = 0; j < self.machines.length; j++) {
            totalAmountOfMoney += self.machines[j]._initialMoney;
        }
        return Math.ceil(totalAmountOfMoney);
    }

    this._getTotalNumberOfMachines = function () {
        var totalNumberOfMachines = 0;
        for (var j = 0; j < self.machines.length; j++) {
            if (typeof self.machines[j]._initialMoney === 'number') {
                totalNumberOfMachines++;
            }
        }
        return totalNumberOfMachines;
    }

    this._getRichestMachine = function () {
        var richestMachine = -Infinity;
        var richestMachineIndex = 0;
        for (var i = 0; i < self.machines.length; i++) {
            if (self.machines[i]._initialMoney > richestMachine) {
                richestMachine = self.machines[i]._initialMoney;
                richestMachineIndex = i;
            }
        }
        return {richMachineMoney: richestMachine, richMachineIndex: richestMachineIndex};
    };

    this._getHighestId = function () {
        var highestId = -Infinity;
        for (var i = 0; i < self.machines.length; i++) {
            if (self.machines[i]._id > highestId) {
                highestId = self.machines[i]._id;
            }
        }
        console.log('highest id: ' + highestId)
        return highestId;
    };


    this.addNewSlotMachine = function () {
        var _initialAmountOfMoneyForNewSlotMachine = this._getRichestMachine().richMachineMoney / 2;
        var newSlotMachineId = 1 + this._getHighestId();
        var richestMachineIndex = this._getRichestMachine().richMachineIndex;
        var newSlotMachine = new SlothMachine(_initialAmountOfMoneyForNewSlotMachine);
        newSlotMachine._id = newSlotMachineId;
        console.log("richest machine index:" + richestMachineIndex);
        self.machines.push(newSlotMachine);
        self.machines[richestMachineIndex]._initialMoney = _initialAmountOfMoneyForNewSlotMachine;
    };

    this._spreadMoney = function (amount) {
        var amountForOneMachine = amount / this._getTotalNumberOfMachines();
        for (var i = 0; i < self.machines.length; i++) {
            self.machines[i]._initialMoney += amountForOneMachine;
        }
        console.log('$+for machines: ' + amountForOneMachine);
    };
    this._removeMachineById = function (id) {
        var moneyInDevaredMachine = 0;
        var isGoodId = false;
        for (var i = 0; i < self.machines.length; i++) {
            if (self.machines[i]._id === id) {
                moneyInDevaredMachine = self.machines[i]._initialMoney;
                self.machines.splice(i, 1);
                isGoodId = true;
            }
        }
        if (isGoodId) {
            this._spreadMoney(moneyInDevaredMachine);
            console.log('machine with id ' + id + ' has been deleted')
        } else {
            console.log('bad id');
        }
    }

    this._showAllMachines = function () {
        console.log('Machines in casino:\n');
        for (var i = 0; i < self.machines.length; i++) {
            console.log(self.machines[i]);
        }
    }

    this._takeMoneyFromCasino = function (amount) {
        var currentMoneyInCasino = this._getTotalAmountOfMoney();
        var takenAmount = 0;
        takenAmount = amount;
        var tempArr = [];
        tempArr = self.machines;
        if (currentMoneyInCasino < amount) {
            for (var i = 0; i < self.machines.length; i++) {
                self.machines[i]._initialMoney = 0;
            }
            takenAmount = currentMoneyInCasino;
        } else {
            tempArr.sort(function (a, b) {
                return b._initialMoney - a._initialMoney;
            });
            //console.log(tempArr);
            for (var i = 0; i < tempArr.length; i++) {
                if (takenAmount > tempArr[i]._initialMoney) {
                    takenAmount -= tempArr[i]._initialMoney;
                    tempArr[i]._initialMoney = 0;

                } else {
                    tempArr[i]._initialMoney -= takenAmount;
                    takenAmount = 0;
                    break;
                }
                if (takenAmount < 0)
                    break;
            }
        }
        //console.log(takenAmount);
        return amount;
    }
}

function SlothMachine(initialMoney) {
    var self = this;
    this._id = null;
    if((typeof initialMoney === 'number') && (initialMoney => 0)) {
        this._initialMoney = initialMoney;
    } else {
        console.log('Oh. I see you drunk. Lemme assign vars for you');
        this._initialMoney = 2000;

    }
    this._isLucky = false;
    this.NNN = null; //if you want to test assign this number, if you want random number set it to null;
    this._getOutMoney = function (amount) {
        if((typeof amount === 'number') && (amount =>0)) {
            this._initialMoney -= amount;
        }
    }
    this._putInMoney = function (amount) {
        if((typeof amount === 'number') && (amount =>0)) {
            this._initialMoney += amount;
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    this._getRandomNNN = function () {
        var number1 = getRandomInt(0, 10);
        var number2 = getRandomInt(0, 10);
        var number3 = getRandomInt(0, 10);
        var gameNumber = [];
        gameNumber = [number1, number2, number3];
        return gameNumber;
    };
    this._playGame = function (inputMoney) {
        if(inputMoney >=0 && typeof inputMoney === 'number'){
            var prizeMoney = 0;
            var moneyToTakeFromCasino =0;
            self._putInMoney(inputMoney);
            var newGameNumber = this.NNN || self._getRandomNNN();
            if(self._isLucky){
                newGameNumber = self._getRandomNNN();
            }
            console.log(newGameNumber);
            if (newGameNumber[0] === 7 && newGameNumber[1] === 7 && newGameNumber[2] === 7 && !self._isLucky) {//3 digits similar equal 7
                console.log('JACK POT!!!!! YOU WIN FUCKING JACKPOT!!!!');
                prizeMoney = self._initialMoney;
                self._getOutMoney(prizeMoney)
            } else {
                if (newGameNumber[0] === newGameNumber[1] && newGameNumber[0] === newGameNumber[2]) {//3 digits similar but not equal 7
                    console.log('Wow! 3 digits similar');
                    prizeMoney = inputMoney * 5;
                    if(prizeMoney>self._initialMoney){
                        moneyToTakeFromCasino = prizeMoney-self._initialMoney;
                        self._initialMoney=0;
                        console.log('Your win is '+prizeMoney+' it`s bigger than money in this SlothMachine. Pls take rest money=' + moneyToTakeFromCasino+
                            ' from Casino(._takeMoneyFromCasino('+moneyToTakeFromCasino+'))');
                    } else {self._getOutMoney(prizeMoney);}

                } else {//any two digits similar
                    if (newGameNumber[0] === newGameNumber[1] || newGameNumber[0] === newGameNumber[2] || newGameNumber[1] === newGameNumber[2]) {
                        console.log('Grats! two similar numbers!');
                        prizeMoney = inputMoney * 2;
                        if(prizeMoney>self._initialMoney){
                            moneyToTakeFromCasino = prizeMoney-self._initialMoney;
                            self._initialMoney=0;
                            console.log('Your win is '+prizeMoney+' it`s bigger than money in this SlothMachine. Pls take rest money=' + moneyToTakeFromCasino+
                                ' from Casino(._takeMoneyFromCasino('+moneyToTakeFromCasino+'))');
                        } else {self._getOutMoney(prizeMoney);}
                    }
                }
            }
            console.log('prize money ' + (prizeMoney));
        } else {
            console.log('Haha! Funny, your bet is < 0 or it`s not a number');
        }
    }
    // console.log(this);
}

//var casino = new Casino(4, 20000);
//var casino1 = new Casino(3, 213);
//console.log(casino._getTotalAmountOfMoney());
//console.log(casino._getTotalNumberOfMachines());
//console.log(casino._getRichestMachine());
// casino.addNewSlotMachine();
// casino._showAllMachines();
// casino._removeMachineById(4);
// casino._showAllMachines();
//console.log(casino._takeMoneyFromCasino(12000));
// //casino._showAllMachines();
// casino.machines[1]._playGame(300);
// casino._showAllMachines();

function test() {
    var testCasino = new Casino(2, 20000);
    var testCasino1 = new Casino(1, 1000);
    var testCasino2 = new Casino(1, 1000);
    testCasino._showAllMachines();
    console.log(testCasino._getTotalAmountOfMoney());
    console.log(testCasino._getTotalNumberOfMachines());
    console.log('**********************************************************************************');
    testCasino.addNewSlotMachine();
    testCasino._showAllMachines();
    console.log('**********************************************************************************');
    testCasino._removeMachineById(234); // id out of range
    console.log('**********************************************************************************');
    testCasino._removeMachineById(1);
    testCasino._showAllMachines();
    console.log('**********************************************************************************');
    testCasino.addNewSlotMachine();
    testCasino._showAllMachines();
    console.log('**********************************************************************************');
    testCasino._takeMoneyFromCasino(10000);
    testCasino._showAllMachines();
    console.log('**********************************************************************************');
    console.log(testCasino.machines[2]);//we will use this SlothMachine
    //set number to 777 and test
    testCasino.machines[2].NNN = [7,7,7];
    testCasino.machines[2]._playGame(300);//you put 300(now in slothMachine2644.5)
    console.log(testCasino.machines[2]);
    console.log('**********************************************************************************');
    //set number to 777 but machine is lucky and test
    testCasino.machines[2].NNN = [7,7,7];
    testCasino.machines[2]._isLucky = true;
    testCasino.machines[2]._playGame(300);//you put 300(now in slothMachine2644.5)
    console.log(testCasino.machines[2]); // expect jackpot but machine is lucky
    console.log('**********************************************************************************');
    //set number to AAA and test
    testCasino1.machines[0]._isLucky = false;
    testCasino1.machines[0].NNN = [2,2,2];
    testCasino1.machines[0]._playGame(2000);
    console.log(testCasino1.machines[0]);
    console.log('**********************************************************************************');
    //set number to AAC and test
    testCasino2.machines[0]._isLucky = false;
    testCasino2.machines[0].NNN = [2,2,1];
    testCasino2.machines[0]._playGame(200);
    console.log(testCasino2.machines[0]);
    console.log('**********************************************************************************');
}

test();

module.exports = Casino;
module.exports = SlothMachine;