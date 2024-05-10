import { Trailer, flatbed48 } from '@dims/types/trailer'

export default class Truck {
    constructor() {
        this.trailer = flatbed48,
        this.currentCapacity = 0,
        this.areaUsed = 0
        this.lengthUsed = 0
        this.widthUsed = 0
        this.items = []
    }

    items: any[]
    trailer: Trailer = flatbed48 // start with smallest
    currentCapacity: number
    areaUsed: number
    lengthUsed: number
    widthUsed: number

    canFitItem(item: any) {
        if (item.weight + this.currentCapacity > this.trailer.carryingCapacity)
            return false
        else if (item.length > this.trailer.length && item.width > this.trailer.length) {
            return false
        }
        else if (item.length > this.trailer.width && item.width > this.trailer.width) {
            return false
        }
        else if ((item.length * item.width) > this.trailer.area - this.areaUsed)
            return false
        else if (item.height > this.trailer.height)
            return false
        // check current dimentions
       
        // too long and cant be rotated
        else if (item.length > (this.trailer.length - this.lengthUsed) && item.length > (this.trailer.width - this.widthUsed)) {
            console.log('in first NEW one: ', item.name)
            return false
        }
        // too wide and cant be rotated
        else if (item.width > (this.trailer.width - this.widthUsed) && item.width > (this.trailer.length - this.lengthUsed)) {
            console.log('in second one: ', item.name)
            return false
        }
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
        this.currentCapacity += item.weight
        this.areaUsed += item.length * item.width
        this.lengthUsed += item.length
        this.widthUsed += item.width
        this.items.push(item)
    }
}