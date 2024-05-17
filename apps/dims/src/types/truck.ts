import { Trailer, flatbed48 } from '@dims/types/trailer';
import { Item } from "./item"; // Assuming Item is defined in a separate module

type PositionedItem = {
    item: Item;
    position: Position;
    // rotated: boolean
};

type Position = {
    x: number;
    y: number;
};

export default class Truck {
    items: PositionedItem[];
    trailer: Trailer;
    currentCapacity: number;
    grid: boolean[][]; // 2D array representing the trailer's available space
    areaUsed: number;  // Track the area used on the truck

    constructor() {
        this.trailer = flatbed48;
        this.currentCapacity = 0;
        this.areaUsed = 0;
        this.grid = Array.from({ length: this.trailer.length }, () => Array(this.trailer.width).fill(false));
        this.items = [];
    }

    canFitItem(item: Item): boolean {
        const itemArea = item.length * item.width;
        if (this.currentCapacity + item.weight > this.trailer.carryingCapacity) {
            return false;
        }
        if (this.areaUsed + itemArea > this.trailer.area) {
            return false;
        }
        return this.findPositionForItem(item) !== null;
    }

    findPositionForItem(item: Item): Position | null {
        const orientations = [
            { length: item.length, width: item.width },
            { length: item.width, width: item.length }
        ];

        // item.rotated = false
        for (const [index, { length, width }] of orientations.entries()) {
            for (let x = 0; x <= this.trailer.length - length; x++) {
                for (let y = 0; y <= this.trailer.width - width; y++) {
                    if (this.canPlaceItemAtPosition(x, y, length, width)) {
                        if (index === 1)
                            console.log('rotating item: ', item.name)
                        return { x, y };
                    }
                }
            }
        }

        return null;
    }

    canPlaceItemAtPosition(x: number, y: number, length: number, width: number): boolean {
        for (let i = x; i < x + length; i++) {
            for (let j = y; j < y + width; j++) {
                if (i >= this.trailer.length || j >= this.trailer.width || this.grid[i][j]) {
                    return false;
                }
            }
        }

        return true;
    }

    addItem(item: Item): void {
        const position = this.findPositionForItem(item);
        if (position) {
            this.placeItem(item, position.x, position.y);
        } else {
            throw new Error('Item does not fit in any orientation');
        }
    }

    placeItem(item: Item, x: number, y: number): void {
        this.currentCapacity += item.weight;
        this.areaUsed += item.length * item.width;

        for (let i = x; i < x + item.length; i++) {
            for (let j = y; j < y + item.width; j++) {
                if (i >= this.trailer.length || j >= this.trailer.width) {
                    throw new Error('Attempting to place item out of bounds');
                }
                this.grid[i][j] = true;
            }
        }

        this.items.push({ item, position: { x, y } });
    }

    remainingSpaceAfterAdding(item: Item): number {
        const position = this.findPositionForItem(item);
        if (!position) return Infinity;

        const usedArea = this.items.reduce((acc, curr) => acc + curr.item.length * curr.item.width, 0);
        const remainingArea = this.trailer.area - (usedArea + item.length * item.width);

        return remainingArea;
    }

    getItems(): PositionedItem[] {
        return this.items;
    }

    getTrailer(): Trailer {
        return this.trailer;
    }

    getCurrentCapacity(): number {
        return this.currentCapacity;
    }

    getAreaUsed(): number {
        return this.areaUsed;
    }
}
