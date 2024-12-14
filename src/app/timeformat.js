const formatTimeDigit = (time) => {
    let msg = time.toString();
    if (time.toString().length < 2) 
        msg = '0' + msg;
    return msg;
}

const formatTime = (date) => {
    let hours = formatTimeDigit(date.getHours() % 12 == 0 ? 12 : date.getHours() % 12);
    let minutes = formatTimeDigit(date.getMinutes());
    let apm = date.getHours() >= 12 ? 'pm' : 'am';
    return `${hours}:${minutes} ${apm}`
}

const formatDate = (date) => {
    let hours = formatTimeDigit(date.getHours() % 12 == 0 ? 12 : date.getHours() % 12);
    let minutes = formatTimeDigit(date.getMinutes());
    let apm = date.getHours() >= 12 ? 'pm' : 'am';
    let msg = `${hours}:${minutes} ${apm} (${date.toDateString()})`
    return msg;
}

export { formatTimeDigit, formatTime, formatDate };