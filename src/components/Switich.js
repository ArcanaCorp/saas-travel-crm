export default function Switich ({ active, onChange }) {
    return (
        <div className={`relative w h rounded-full pointer ${active ? 'bg-primary' : 'bg-neutral border'}`} style={{"--w": "40px", "--mnw": "40px", "--h": "20px"}} onClick={onChange}>
            <span className='absolute block w h rounded-full bg-surface' style={{"--w": "15px", "--mnw": "15px", "--h": "15px", "top": "2.5px", "left": `${active ? '20px':'2.5px'}`, "transition": ".5s all ease"}}></span>
        </div>
    )
}