import type { NextApiRequest, NextApiResponse } from 'next'
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
 
export async function POST(
//   req: NextRequest,
    req: any,
    res: NextApiResponse
) {
    const data = await req.json()
    console.log(data)

    const totals = {
        weight: 0,
        area: 0,
        maxHeight: 0,
    }

    for (const item of data) {
        totals.weight += item.weight * item.quantity
        totals.area += item.quantity * (item.length * item.width)

        if (item.height > totals.maxHeight)
            totals.maxHeight = item.height
    }

    const requiredForWeight = Math.ceil(totals.weight / flatbed48.carryingCapacity)
    const requiredForVolume = Math.ceil(totals.area / flatbed48.area) 
    const number = requiredForWeight > requiredForVolume ? requiredForWeight : requiredForVolume

    let determingFactor = requiredForWeight > requiredForVolume ? 'weight' : 'total area'

    const tooTall = totals.maxHeight > flatbed48.height
    
    if (tooTall)
        determingFactor = 'height'

    return NextResponse.json(
        {
            loadInput: totals,
            calculation: {
                number,
                determingFactor,
                tooTall,
                height: totals.maxHeight
            }
        },
        { status: 200 }
    );
}
