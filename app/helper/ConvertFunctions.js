export function diff_minutes(dt2, dt1)
{
    var diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
    diff /= 60;
    return time_convert(Math.abs(Math.round(diff)));
};

export function time_convert(num)
{
    var m1 = num;
    if (isNaN(m1)) m1 = 0;
    var t3 = m1;
    var t4 = Math.floor(t3 / 1440);
    var t5 = t3 - (t4 * 1440);
    var t6 = Math.floor(t5 / 60);
    var t7 = t5 - (t6 * 60);
    if (t4 == 0) {
        if (t7 == 0) {
            return t6 + " Hours ";
        }
        else if (t6 == 0) {
            return t7 + "  Minutes";
        }
        else {
            return t6 + "  Hours  " + t7 + "  Minutes";
        }
    }
    else {
        return "  " + t4 + "  Days  " + t6 + "  Hours  " + t7 + "  Minutes";
    }
}

export function date_convert(date)
{
    return new Date(date).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' });
}

export function utc_convert(date)
{
    if (date.indexOf('+')>-1)
    {
    	date = date.split("+");
        date = date[0];
    }
    else
    {
    	date = date.split("-");
        let len = date.length;
        let x = '';
        date.map((d, index)=>{
        	if(len === 4)
            {
            	if(index !== len-1)
                {
                	x += d;
                }
                else
                {
            		x += d+'-';
                }
            }
            else
            {
            	if(index !== len-1)
                {
                	x += d+'-';
                }
                else
                {
            		x += d;
                }
            }
            return 0;
        });
        date = x;
    }
    const utc = new Date(date);
    var hours = utc.getHours();
    var minutes = utc.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export function TimeZone(time)
{
    let extractedZone = '';
    if (time.indexOf('+') > -1) {
        let zone = time.split('+');
        extractedZone = 'UTC +' + zone[1];
    }
    else {
        let zone = time.split('-');
        extractedZone = 'UTC -' + zone[zone.length - 1];
    }
    return extractedZone;
}