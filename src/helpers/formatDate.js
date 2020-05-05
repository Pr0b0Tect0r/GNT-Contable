export default function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    var hours = d.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var minutes = d.getMinutes();
    var minutos = minutes <= 10 ? `0${minutes}` : minutes;
    var second = d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/') + ' ' + [hours, minutos, second].join(':') +ampm;
}