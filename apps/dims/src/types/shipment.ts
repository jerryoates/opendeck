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
    }
}