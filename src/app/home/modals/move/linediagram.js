const LineDiagram = ({ type }) => {
    const sharedCSS = "flex flex-col w-7 h-full items-center justify-center";
    const circleCSS = "w-4 h-4 rounded-full border-[3px] border-gray-600";
    const lineCSS = "w-[3px] bg-gray-600";

    if (type === 'nodeStart') {
        return(
            <div className={`${sharedCSS}`}>
                <div className={`grow`}></div>
                <div className={`${circleCSS}`}></div>
                <div className={`grow ${lineCSS}`}></div>
            </div>
        )
    }
    else if (type === 'node') {
        return(
            <div className={`${sharedCSS}`}>
                <div className={`grow ${lineCSS}`}></div>
                <div className={`${circleCSS}`}></div>
                <div className={`grow ${lineCSS}`}></div>
            </div>
        )
    }
    else if (type === 'nodeEnd') {
        return(
            <div className={`${sharedCSS}`}>
                <div className={`grow ${lineCSS}`}></div>
                <div className={`${circleCSS}`}></div>
                <div className={`grow`}></div>
            </div>
        )
    }
    else if (type === 'line') {
        return(
            <div className={`${sharedCSS}`}>
                <div className={`grow ${lineCSS}`}></div>
            </div>
        )
    }
    return(null);
}

export default LineDiagram;