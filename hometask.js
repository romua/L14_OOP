function Casino(numberOfMachines,initialMoney) {
    var self = this;
    this.machines = [];
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    if((numberOfMachines > 0) && (initialMoney > 0)) {
        var _initialMoneyInMachines = Math.floor(initialMoney / numberOfMachines);
        var _moneyBonusForFirstMachine = (initialMoney / numberOfMachines) - _initialMoneyInMachines;
        var _indexOfLuckyMachine = getRandomInt(0,numberOfMachines);

        console.log("Lucky machine with index:"+_indexOfLuckyMachine);
    } else {
        _initialMoneyInMachines = 10;
        _moneyBonusForFirstMachine = (initialMoney / numberOfMachines) - _initialMoneyInMachines;
        _indexOfLuckyMachine = Math.floor((Math.random() * numberOfMachines) + 1);
    }
    self.machines[0] = new SlothMachine(_initialMoneyInMachines+_moneyBonusForFirstMachine);
    for (var i = 1; i < numberOfMachines; i++) {
        self.machines[i] = new SlothMachine(_initialMoneyInMachines);
    }
    self.machines[_indexOfLuckyMachine]._isLucky=true;
    console.log(self.machines[_indexOfLuckyMachine]);

    this._getTotalAmountOfMoney = function () {
        var totalAmountOfMoney=0;
        for (var j = 0; j < self.machines.length; j++) {
           totalAmountOfMoney+=self.machines[j]._initialMoney;
        }
        return totalAmountOfMoney;
    }

    this._getTotalNumberOfMachines = function () {
        var totalNumberOfMachines = 0;
        for (var j = 0; j < self.machines.length; j++) {
            if(typeof self.machines[j]._initialMoney === 'number'){
                totalNumberOfMachines++;
            }
        }
        return totalNumberOfMachines;
    }

    this._getRichestMachine = function () {
        var richestMachine = -Infinity;
        var richestMachineIndex = 0;
        for (var i = 0; i < self.machines.length; i++) {
            if(self.machines[i]._initialMoney > richestMachine){
                richestMachine = self.machines[i]._initialMoney;
                richestMachineIndex = i;
            }
        }
        return {a: richestMachine, b: richestMachineIndex};
    }

    this.addNewSlotMachine = function () {
        var _initialAmountOfMoneyForNewSlotMachine = this._getRichestMachine().a / 2;
        var newSlotMachine = new SlothMachine(_initialAmountOfMoneyForNewSlotMachine);
        self.machines.push(newSlotMachine);
        self.machines[this._getRichestMachine().b]._initialMoney = _initialAmountOfMoneyForNewSlotMachine;
    }

    this._showAllMachines = function () {
        console.log('Machines in casino:\n');
        for (var i = 0; i < self.machines.length; i++) {
            console.log(self.machines[i]);
        }
    }
}

function SlothMachine(initialMoney) {
    this._initialMoney = initialMoney;
    this._isLucky = false;
    console.log(this);
}

var casino = new Casino(5, 22231);
console.log(casino._getTotalAmountOfMoney());
console.log(casino._getTotalNumberOfMachines());
console.log(casino._getRichestMachine());
console.log(casino.addNewSlotMachine());
casino._showAllMachines();
