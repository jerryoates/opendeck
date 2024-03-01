import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";
import Trailer from '@dims/types/trailer';

type Flatbed48 = Trailer

const flatbed48 = {
    length: 576,
    width: 102,
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

    // loop through freight... calculate volume and weight separately

  return NextResponse.json({ message: data }, { status: 200 });
}
