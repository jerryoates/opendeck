import { NextResponse } from "next/server";
import Shipment from '@dims/types/shipment';
import { Item } from '@dims/types/item';

export async function POST(
  req: Request,
  res: NextResponse
) {
    const data = await req.json()
    const shipment = new Shipment()

    const enumerated: Item[] = []
    data.forEach((item: any)  => { // TODO: remove this
        for (let i = 0; i < item.quantity; i++) {
            enumerated.push(item)
        }
    })

    shipment.packItems(enumerated)
    shipment.checkEmptyTrucks()

    return NextResponse.json( shipment, { status: 200 });
}