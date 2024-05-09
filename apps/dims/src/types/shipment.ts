import Truck from "./truck"

export default class Shipment {
    constructor() {
        this.createdAt = new Date()
        this.trucks = []
        this.nonFitPieces = []
    }

    createdAt: Date
    trucks: Truck[]
    nonFitPieces: any[]

    addTruck(truck: Truck) {
        this.trucks.push(truck)

        // maybe sort them here
    }

    checkTrucks(item: any) {
        // might need to sort trucks by area first

        for (const truck of this.trucks) { // check every truck for fit before creating one
            if (truck.canFitItem(item)) {
                truck.addItem(item)
                return
            }
        }

        let possibleNewTruck = new Truck()
        if (possibleNewTruck.canFitItem(item)) {
            possibleNewTruck.addItem(item)
            this.addTruck(possibleNewTruck)
        } else {
            this.nonFitPieces.push(item)
        }
    }

    checkEmptyTrucks() {
        this.trucks.filter(truck => truck.items.length > 0)
    }
}