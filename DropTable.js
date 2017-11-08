export class DropTable {
    constructor(items) {
        this._items = [];
        this.weightedItems = {};
        this.weightCached = false;
        if(items) this.initializeWithItems(items);
    }

    initializeWithItems(items) {
        this.items = items;
    }

    calculateWeightedItems() {
        let weightedItems = [],
        weighting = this.getTotalWeight(),
        weightOffset = 0;

        this._eachItem((item) => {
            let itemWeight = (item.weight / weighting);
            weightedItems.push({
                weighting: itemWeight + weightOffset,
                name: item.name,
                data: item.data,
                weightingOffset: weightOffset
            });
            weightOffset += itemWeight;
        });

        return weightedItems;
    }
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = items;
        this.weightCached = false;
        this.weightedItems = this.calculateWeightedItems();
    }

    addItem(item) {
        this.removeItem(item.name);
        this.weightCached = false;
        this.items.push(item);
        this.weightedItems = this.calculateWeightedItems();
    }

    removeItem(itemName) {
        let index = this.items.findIndex((item) => item.name == itemName);
        if(index > -1) {
            this.items.splice(index, 1);
            this.weightCached = false;
            this.weightedItems = this.calculateWeightedItems();
        }
    }

    _eachItem(callbackFn) {
        this.items.forEach(callbackFn);
    }
    
    getTotalWeight() {
        if(this.weightCached) {
            return this.totalWeight;
        }
        let totalWeight = 0;
        this._eachItem((item) => {
            totalWeight += item.weight;
        });
        
        this.totalWeight = totalWeight;
        this.weightCached = true;
        return this.totalWeight;
    }

    drop() {
        let rand = Math.random();
        return this.weightedItems.find((item) => {
            return item.weighting > rand && item.weightingOffset < rand 
        });
    }
}