const getFreeHoursOfTable = (tableOrders, hours) => {
    for(let i = 0; i < tableOrders.length; i++) {
        for(let j = 1; j <= hours.length; j++) {
            if(tableOrders[i]) {
                const from = +tableOrders[i].from;
                const to = +tableOrders[i].to;
                
                if(from === to) {
                    hours[from - 1] = '-'
                    break;
                }
                if(hours[j] >= from && hours[j] < to) {
                    hours[j] = '-'
                }
            }
        }
    }
    // console.log(hours)
}

const setHours = (hours) => {
    for (let i = 1; i < 25; i++) {
        hours[i - 1] = i;
    }
    // console.log(hours)
} 

const setTime = (hours) => {
    const bookings = {}
    for(let i = 0; i < hours.length; i++) {
        if(hours[i] !== '-') {
            bookings[i + 1] = "Available"
        } else {
            bookings[i + 1] = "Booked"
        }
    }
    return bookings;
}

module.exports = {getFreeHoursOfTable, setHours, setTime}