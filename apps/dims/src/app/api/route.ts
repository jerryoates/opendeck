import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";
 
export async function POST(
//   req: NextRequest,
    req: any,
  res: NextApiResponse
) {
    const data = await req.json()
    console.log(data)
//   const data = await req.body.json()

//   console.log('DATA: ', JSON.parse(data))

//   console.log("data: ", JSON.parse(data))
//   const id = await createItem(data)
  return NextResponse.json({ message: data }, { status: 200 });
}
