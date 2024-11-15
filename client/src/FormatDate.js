// function formatMeetingTime(meetingTime) {
//     const date = new Date(meetingTime);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     return `${day}-${month}-${year} ${hours}:${minutes}`;
// }
// export default formatMeetingTime;
function formatMeetingTime(meetingTime) {
    const date = new Date(meetingTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    // Convert hours to 12-hour format
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Adjust hours for 12-hour format, making 0 -> 12

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
}

export default formatMeetingTime;
