import type { NextApiResponse } from 'next'
import { NextResponse } from "next/server";
import Trailer from '@dims/types/trailer';

type Flatbed48 = Trailer

const flatbed48: Flatbed48 = {
    length: 576,
    width: 102,
    area: 58752,
    height: 102,
    carryingCapacity: 48000,
}

interface NonFitPiece {
    item: {},
    reason: string
}

interface Flatbed48Response {
    loadInput: {

    },
    calculation: {

    }
    nonFitPieces: NonFitPiece[]
}
 
export async function POST(
  req: Request,
  res: NextResponse
) {
    const data = await req.json()

    const totals = {
        weight: 0,
        area: 0,
        maxHeight: 0,
    }

    const response: Flatbed48Response = {
        loadInput: {},
        calculation: {},
        nonFitPieces: []
    }

    for (const item of data) {
        if (item.height > flatbed48.height) {
            response.nonFitPieces.push({
                item,
                reason: 'Too Tall'
            })
            continue;
        }
        if (item.weight > flatbed48.carryingCapacity) {
            response.nonFitPieces.push({
                item,
                reason: 'Too Heavy'
            })
            continue;
        }
        if (item.length > flatbed48.length) {
            response.nonFitPieces.push({
                item,
                reason: 'Too Long'
            })
            continue;
        }
        if (item.width > flatbed48.width) {
            response.nonFitPieces.push({
                item,
                reason: 'Too Wide'
            })
            continue;
        }

        totals.weight += item.weight * item.quantity
        totals.area += item.quantity * (item.length * item.width)

        if (item.height > totals.maxHeight)
            totals.maxHeight = item.height
    }

    const requiredForWeight = Math.ceil(totals.weight / flatbed48.carryingCapacity)
    const requiredForVolume = Math.ceil(totals.area / flatbed48.area) 
    const number = requiredForWeight > requiredForVolume ? requiredForWeight : requiredForVolume

    let determingFactor = requiredForWeight > requiredForVolume ? 'weight' : 'total area'

    response.calculation = {
        number,
        determingFactor,
        height: totals.maxHeight
    }

    response.loadInput = totals

    console.log(response)

    return NextResponse.json( response, { status: 200 });
}
