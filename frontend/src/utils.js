export function getDayFromDate(day_row){
    let day_value = day_row;

    if (day_row[0] === '0'){
        day_value = day_row[1];
    }
    return day_value;
}

export function getMonthFromDate(month_row){
    let month_value = '';
    switch (month_row){
        case '01':
            month_value = 'января';
            break;
        case '02':
            month_value = 'февраля';
            break;
        case '03':
            month_value = 'марта';
            break;
        case '04':
            month_value = 'апреля';
            break;
        case '05':
            month_value = 'мая';
            break;
        case '06':
            month_value = 'июня';
            break;
        case '07':
            month_value = 'июля';
            break;
        case '08':
            month_value = 'августа';
            break;
        case '09':
            month_value = 'сентября';
            break;
        case '10':
            month_value = 'октября';
            break;
        case '11':
            month_value = 'ноября';
            break;
        case '12':
            month_value = 'декабря';
            break;
        default:
            month_value = 'июня';
            break;
    }
    return month_value;
}

export function getDate(date_row) {
    const month = getMonthFromDate(date_row.substr(5, 2));
    const day = getDayFromDate(date_row.substr(8, 2));
    const hour = date_row.substr(11, 2);
    const minutes = date_row.substr(14, 2);
    return `${day} ${month} ${hour}:${minutes}`
}