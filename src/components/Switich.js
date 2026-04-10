export default function Switich ({ active }) {
    return (
        <div className={`relative w h rounded-full ${active ? 'bg-primary' : 'bg-neutral border'}`} style={{"--w": "40px", "--mnw": "40px", "--h": "20px", cursor: 'pointer'}}>
            <span className='absolute block w h rounded-full bg-surface' style={{"--w": "15px", "--mnw": "15px", "--h": "15px", "top": "2.5px", "left": `${active ? '20px':'2.5px'}`}}></span>
        </div>
    )
}