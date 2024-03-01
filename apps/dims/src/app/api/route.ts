import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";
 
export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body

  console.log('DATA: ', data)

//   console.log("data: ", JSON.parse(data))
//   const id = await createItem(data)
  return NextResponse.json({ message: data }, { status: 200 });
}
