// import Image from "next/image"
import './component.css'
export default function OverViewCard({ type, amount }: { type: string; amount: string; }) {
    return (
        <div className="card-wrapper">
            <div className="card-title">
                <h2>{type}</h2>
                {/* <Image src="" alt="" width={20} height={20} /> */}
            </div>
            <span className="tag">
                2024/25
            </span>
            <h1 className="card-heading">{amount}</h1>
        </div>
    );
}