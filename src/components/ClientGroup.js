export default function ClientGroup ({ picture=true, name='Alejando Mendoza', subtext='Lima, Perú' }) {

    return (
        <div className="w-full flex gap-sm items-center justify-center">
            {picture && (
                <div className="w h rounded-sm overflow-hidden bg-neutral" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>
                    <img src={`https://ui-avatars.com/api/?name=${name}`} width={40} height={40} />
                </div>
            )}
            <div>
                <h5 className="text-sm" aria-label={name}>{name}</h5>
                <p className="text-xs text-muted">{subtext}</p>
            </div>
        </div>
    )

}