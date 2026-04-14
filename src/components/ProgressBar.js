export default function ProgressBar ({ percentage=0 }) {

    const getStatusClass = (value) => {
        if (value < 30) return 'error';      // bajo
        if (value < 70) return 'warning';    // medio
        return 'success';                    // alto
    };

    return (
        <div className="progress-bar h" style={{"--h": "15px"}}>
            <div className={`progress-status w progress-status-${getStatusClass(percentage)}`} style={{"--w": `${percentage}%`}}></div>
        </div>
    )
}