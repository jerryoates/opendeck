export interface Trailer {
  name: string;
  length: number;
  width: number;
  height: number;
  area: number;
  carryingCapacity: number;
  cost: number;
}

export const flatbed48: Trailer = {
  name: 'Flatbed 48',
  length: 576, // 48 feet in inches
  width: 102,  // 8.5 feet in inches
  height: 102,
  area: 576 * 102,
  carryingCapacity: 48000, // 48,000 lbs
  cost: 100 // Example cost
};

export const flatbed53: Trailer = {
  name: 'Flatbed 53',
  length: 636, // 53 feet in inches
  width: 102,
  height: 102,
  area: 636 * 102,
  carryingCapacity: 53000, // 53,000 lbs
  cost: 120 // Example cost
};