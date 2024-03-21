import { Trailer, flatbed48 } from '@dims/types/trailer'

export default class Truck {
    constructor() {
        this.trailer = flatbed48,
        this.currentCapacity = 0,
        this.areaUsed = 0
        this.items = []
    }

    items: any[]
    trailer: Trailer = flatbed48 // start with smallest
    currentCapacity: number
    areaUsed: number

    canFitItem(item: any) {
        if (item.weight + this.currentCapacity > this.trailer.carryingCapacity)
            return false
        else if (item.length > this.trailer.length && item.width > this.trailer.length) // too long or wide in one dimension
            return false
        else if (item.length > this.trailer.width && item.length > this.trailer.width) // too long or wide in one dimension
            return false
        else if ((item.length * item.width) > this.trailer.area - this.areaUsed)
            return false
        else
            return true
    }

    upgradeTrailerType() {
        // call check trailer types
        // current capcity
    }

    checkTrailerTypes(trailerTypes: any[]) {
        // check current values against trailer types
        // 
    }

    addItem(item: any) {
        if (this.canFitItem(item)) {
            this.currentCapacity += item.weight
            this.areaUsed += item.length * item.width
            this.items.push(item)

        } else {
            throw new Error ('Item Does Not Fit', item) 
        }
    }
}