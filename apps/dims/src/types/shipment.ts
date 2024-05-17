import Truck from "./truck"
import { Item } from "./item"

export default class Shipment {
    createdAt: Date
    trucks: Truck[]
    nonFitPieces: Item[]

    constructor() {
        this.createdAt = new Date()
        this.trucks = []
        this.nonFitPieces = []
    }

    addTruck(truck: Truck) {
        this.trucks.push(truck)
    }

    packItems(items: Item[]) {
        // Sort items in decreasing order by area
        items.sort((a, b) => (b.length * b.width) - (a.length * a.width))

        for (const item of items) {
            let placed = false

            for (const truck of this.trucks) {
                if (truck.canFitItem(item)) {
                    try {
                        truck.addItem(item)
                        placed = true
                        break
                    } catch {
                        console.warn('Error placing item: ', item)
                    }
                }
            }

            if (!placed) {
                const newTruck = new Truck()
                if (newTruck.canFitItem(item)) {
                    newTruck.addItem(item)
                    this.addTruck(newTruck)
                } else {
                    this.nonFitPieces.push(item)
                }
            }
        }
    }

    checkEmptyTrucks(): Truck[] {
        return this.trucks.filter(truck => truck.getItems().length > 0)
    }
}