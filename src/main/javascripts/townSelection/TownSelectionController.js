var TownSelectionController = function(){
    var _this = this;

    this.townsSelected = [];

    this.isMoreThanTwoSelected = function(index){
        var numberOfTownsSelected = 0;
            _.each(_this.townsSelected, function(town){
            if(town){
                numberOfTownsSelected++;
            }
        });

        return numberOfTownsSelected >= 2 && !_this.townsSelected[index]
    }
};
railroadRoute.controller('townSelectionController', TownSelectionController);