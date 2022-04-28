export default class Utils {

    static convertTime(time: string) {
        let h;
        let m;
        let s;

        if (time.includes('PT')) {
            h = time.includes('H') ? (time.substring(time.indexOf('T') + 1, time.indexOf('H'))) : '';
            m = time.substring((!time.includes('H') ? time.indexOf('T') : time.indexOf('H')) + 1, time.indexOf('M'));
            s = time.substring(time.indexOf('M') + 1, time.indexOf('S'));

            return (h ? ((h?.toString().length == 1 ? '0' + h : h) + ' : ') : '') + (m.toString().length == 1 ? '0' + m : m) + ' : ' + s;
        }

        if (+time > 60) {
            if (+time >= 3600) {
                h = (+time / 3600).toFixed();
            }
            m = !h ? (+time / 60).toFixed() : ((+time - (+h * 3600)) - 60) > 0 ? ((+time - (+h * 3600)) - 60) : 0;
            s = !h ? +time - (+m * 60) : (+time - (+h * 3600)) > 60 ? ((+time - (+h * 3600)) - 60) : (+time - (+h * 3600));

            return (h ? ((h?.toString().length == 1 ? '0' + h : h) + ' : ') : '') + (m.toString().length == 1 ? '0' + m : m) + ' : ' + (s.toString().length == 1 ? '0' + s : s)
        }

        return '00 : ' + time;
    }
}