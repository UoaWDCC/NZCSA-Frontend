import solarLunar from 'solarlunar';

export function DayOrToday(date) {
    if (!date) {
        var today = new Date()
        return [today.getFullYear(), today.getMonth() + 1, today.getDate()]
    } else {
        return date
    }
}
export function NumberTC(i) {
    const cnn = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    return cnn[parseInt(i)]
}
export function getLunar(date) {
    var day = DayOrToday(date)
    var dt = solarLunar.solar2lunar(...day)
    var obj =  {
        yy: day[0].toString().split('').map(e=>NumberTC(e)).join(""),
        y: dt.gzYear,
        m: dt.monthCn,
        d: dt.dayCn,
        a: dt.animal
    }
    console.log(obj)
    return obj
}