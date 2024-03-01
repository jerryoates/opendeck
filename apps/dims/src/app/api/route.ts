import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";
import Trailer from '@dims/types/trailer';

type Flatbed48 = Trailer

const flatbed48: Flatbed48 = {
    length: 576,
    width: 102,
    height: 102,
    volume: 5992704,
    carryingCapacity: 48000,
}
 
export async function POST(
//   req: NextRequest,
    req: any,
    res: NextApiResponse
) {
    const data = await req.json()
    console.log(data)

    const totals = {
        weight: 0,
        volume: 0,
        maxHeight: 0,
        maxLength: 0,
        maxWidth: 0
    }

    for (const item of data) {
        totals.weight += item.weight * item.quantity
        totals.volume += item.quantity * (item.length * item.height * item.width)

        if (item.height > totals.maxHeight)
            totals.maxHeight = item.height

        if (item.width > totals.maxWidth)
            totals.maxWidth = item.width

        if (item.length > totals.maxLength)
            totals.maxLength = item.length
    }

    const requiredForWeight = Math.ceil(totals.weight / flatbed48.carryingCapacity)
    const requiredForVolume = Math.ceil(totals.volume / flatbed48.volume) 

    const determingFactor = requiredForWeight > requiredForVolume ? 'weight' : 'volume'

    return NextResponse.json(
        {
            loadInput: totals,
            calculation: {
                requiredForWeight,
                requiredForVolume,
                determingFactor
            }
        },
        { status: 200 }
    );
}
