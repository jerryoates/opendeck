interface Trailer {
    name: string
    length: number,
    width: number,
    height: number,
    area: number
    carryingCapacity: number,
}

type Flatbed48 = Trailer

const flatbed48: Flatbed48 = {
    name: 'Flatbed 48',
    length: 576,
    width: 102,
    area: 58752,
    height: 102,
    carryingCapacity: 48000,
}

export { type Trailer, flatbed48 }