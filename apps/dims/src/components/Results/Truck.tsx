import { numberWithCommas } from "@dims/utils/numbers"

export default function Truck({ truck, index }: any) {
    return (
        <div key={index} className="my-3">
            <div className="font-bold">
                {`${index + 1}. ${truck.trailer.name} - ${truck.items.length} items -`}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`${numberWithCommas(truck.currentCapacity)}lbs / ${numberWithCommas(truck.trailer.carryingCapacity)}lbs`}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`${truck.areaUsed}(sq. in) / ${truck.trailer.area}`}
            </div>
            {
                truck.items.map((item: any, index: number) =>
                    <div key={index}>{`${item.name} - ${item.length}in/${item.width}in/${numberWithCommas(item.weight)}lbs`}</div>
                )
            }
        </div>
    )
}