$(document).ready(function(){
    var date_ob = new Date();
    date_ob.setHours(date_ob.getHours() - 4);

    let splitted_date_ob = date_ob.toString().toLowerCase().split(" ");

    let day = splitted_date_ob[0];

    let domday_monday_thursday = $("#farm_ressources_days_monday_thursday");
    let domday_tuesday_friday = $("#farm_ressources_days_tuesday_friday");
    let domday_wednesday_saturday = $("#farm_ressources_days_wednesday_saturday");

    let frame_monday_thursday = $("#farm_ressources_monday_thursday_frame");
    let frame_tuesday_friday = $("#farm_ressources_tuesday_friday_frame");
    let frame_wednesday_saturday = $("#farm_ressources_wednesday_saturday_frame");

    switch (day) {
        case 'mon':
        case 'thu':
            domday_monday_thursday.addClass("day_active");
            frame_monday_thursday.addClass("frame_active");
            break;
        case 'tue':
        case 'fri':
            domday_tuesday_friday.addClass("day_active");
            frame_tuesday_friday.addClass("frame_active");
            break;
        case 'wed':
        case 'sat':
            domday_wednesday_saturday.addClass("day_active");
            frame_wednesday_saturday.addClass("frame_active");
            break;
        case 'sun':
            domday_monday_thursday.addClass("day_active");
            domday_tuesday_friday.addClass("day_active");
            domday_wednesday_saturday.addClass("day_active");

            frame_monday_thursday.addClass("frame_active");
            frame_tuesday_friday.addClass("frame_active");
            frame_wednesday_saturday.addClass("frame_active");
            break;
        default:
            console.log("Default: => " + day);
    }
})