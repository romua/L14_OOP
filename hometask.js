function Casino(numberOfMachines,initialMoney) {
    var self = this;
    if(numberOfMachines > 0 && initialMoney > 0) {
        var _initialMoneyInMachines = Math.floor(initialMoney / numberOfMachines);
        var _moneyBonusForFirstMachine = (initialMoney / numberOfMachines) - _initialMoneyInMachines;
        var _indexOfLuckyMachine = Math.floor((Math.random() * numberOfMachines) + 1);
        console.log(_indexOfLuckyMachine);
    } else {
        _initialMoneyInMachines = 10;
        _moneyBonusForFirstMachine = (initialMoney / numberOfMachines) - _initialMoneyInMachines;
        _indexOfLuckyMachine = Math.floor((Math.random() * numberOfMachines) + 1);
    }

    for (var i = 0; i <= numberOfMachines; i++) {

        if(i===0) {
            self[0] = new SlothMachine(_initialMoneyInMachines+_moneyBonusForFirstMachine);
        }
        self[i]= new SlothMachine(_initialMoneyInMachines);

    }
    self[_indexOfLuckyMachine]._isLucky=true;
    console.log(self[_indexOfLuckyMachine]);

}

function SlothMachine(initialMoney) {
    this._initialMoney = initialMoney;
    this._isLucky = false;
    console.log(this);
}

var casino = new Casino(3, 2345);