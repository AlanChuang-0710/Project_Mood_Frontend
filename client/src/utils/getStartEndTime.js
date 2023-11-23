export function getStartEndTime(value) {
    let endTime = new Date();
    endTime.setHours(0, 0, 0, 0);
    endTime = endTime.getTime();
    let startTime = new Date();
    if (value === "month") {
        // 往回推1個月
        startTime.setMonth(new Date().getMonth() - 1);
    } else {
        // 往回推1年
        startTime.setFullYear(new Date().getFullYear() - 1);
    }
    startTime.setHours(0, 0, 0, 0);
    startTime = startTime.getTime();
    return {startTime, endTime}
}