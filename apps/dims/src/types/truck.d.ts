import { Trailer, flatbed48 } from "./trailer"

export default class Truck {
    constructor() {
        this.trailer = flatbed48,
        this.currentCapacity = 0,
        this.areaUsed = 0
        this.items = []
    }

    trailerType: Trailer.name // default to smallest // upgrade lader
    items: any[]
    trailer: Trailer = flatbed48 // start with smallest
    currentCapacity: number
    areaUsed: number

    canFitItem(item) {
        if (item.weight + this.currentCapacity > this.trailer.carryingCapacity)
            return false
        else if (item.length > this.trailer.length && item.width > this.trailer.length) // too long or wide in one dimension
            return false
        else if (item.length > this.trailer.width && item.length > this.trailer.width) // too long or wide in one dimension
            return false
        else if ((item.length * item.width) > this.trailer - this.areaUsed)
            return false
        else
            return true
    }

    upgradeTrailerType() {
        // current capcity
    }

    checkTrailerTypes() {

    }

    addItem(item) {
        if (this.canFitItem(item)) {
            this.currentCapacity += item.weight
            this.areaUsed += item.length * item.width
            this.items.push(item)

        } else {
            throw new Error ('Item Does Not Fit', item) 
        }
    }
}