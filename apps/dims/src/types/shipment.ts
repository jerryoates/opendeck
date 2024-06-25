import Truck from "./truck";
import { Item } from "./item";
import { Trailer, flatbed48, flatbed53 } from '@dims/types/trailer';

export default class Shipment {
  createdAt: Date;
  trucks: Truck[];
  nonFitPieces: Item[];

  constructor() {
    this.createdAt = new Date();
    this.trucks = [];
    this.nonFitPieces = [];
  }

  addTruck(truck: Truck) {
    this.trucks.push(truck);
  }

  packItems(items: Item[]) {
    // Sort items in decreasing order by area
    items.sort((a, b) => (b.length * b.width) - (a.length * a.width));

    // Define available trailers
    const trailers: Trailer[] = [flatbed48, flatbed53];
    // Sort trailers by cost (ascending)
    trailers.sort((a, b) => a.cost - b.cost);

    let bestCost = Infinity;
    let bestLoadout: { trucks: Truck[], nonFitPieces: Item[] } = { trucks: [], nonFitPieces: [] };

    // Try each combination of trailer types to find the best loadout
    for (let i = 0; i < trailers.length; i++) {
      const loadout = this.tryTrailerCombination(items, trailers.slice(i));
      const loadoutCost = this.calculateLoadoutCost(loadout.trucks);

      if (loadoutCost < bestCost) {
        bestCost = loadoutCost;
        bestLoadout = loadout;
      }
    }

    this.trucks = bestLoadout.trucks;
    this.nonFitPieces = bestLoadout.nonFitPieces;
  }

  tryTrailerCombination(items: Item[], trailers: Trailer[]): { trucks: Truck[], nonFitPieces: Item[] } {
    const trucks: Truck[] = [];
    const nonFitPieces: Item[] = [];

    for (const item of items) {
      let placed = false;

      for (const truck of trucks) {
        if (truck.canFitItem(item)) {
          try {
            truck.addItem(item);
            placed = true;
            break;
          } catch {
            console.warn('Error placing item: ', item);
          }
        }
      }

      if (!placed) {
        for (const trailer of trailers) {
          const newTruck = new Truck(trailer);
          if (newTruck.canFitItem(item)) {
            newTruck.addItem(item);
            trucks.push(newTruck);
            placed = true;
            break;
          }
        }
        if (!placed) {
          nonFitPieces.push(item);
        }
      }
    }

    return { trucks, nonFitPieces };
  }

  calculateLoadoutCost(trucks: Truck[]): number {
    return trucks.reduce((totalCost, truck) => totalCost + truck.getTrailer().cost, 0);
  }

  checkEmptyTrucks(): Truck[] {
    return this.trucks.filter(truck => truck.getItems().length > 0);
  }
}
