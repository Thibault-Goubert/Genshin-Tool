let timeRemaining = 0;
let parametric_transformer_timer_day;
let parametric_transformer_timer_hour_min;

let domParametric = $('#panel_parametric_transformer_content');
let domParametricParent = domParametric.parent();

$(document).ready(function () {
    let key;
    if (storage.length > 0) {
        let value = storage.getItem(domParametricParent[0].id + "timer") 
        if(value){
            timeRemaining = Math.round((Date.parse(value)-new Date())/1000);
        }
    }
})

function parametric_transformer_timer_render(){
    convertSecondsToReadableString(timeRemaining);
    if(timeRemaining>0){
        timeRemaining -= 1 ;
    }
    else{
        var panel_parametric_transformer = $('#panel_parametric_transformer');
        panel_parametric_transformer.removeClass("hide");
        storage.removeItem(panel_parametric_transformer[0].id);
        storage.removeItem(panel_parametric_transformer[0].id + "timer");
    }

    const reactDays = React.createElement ('span', {}, parametric_transformer_timer_day)
    ReactDOM.render(reactDays, document.querySelector('#panel_parametric_transformer_days'));

    const reactHoursMins = React.createElement ('span', {}, parametric_transformer_timer_hour_min)
    ReactDOM.render(reactHoursMins, document.querySelector('#panel_parametric_transformer_hours_mins'));    
}

function convertSecondsToReadableString(seconds) {
    seconds = seconds || 0;
    seconds = Number(seconds);
    seconds = Math.abs(seconds);
  
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const parts = [];
  
    if (d >= 0) {
        parametric_transformer_timer_day = d + 'd';
    } 
    if (h >= 0) {
        parts.push(h + 'h');
    }  
    if (m >= 0) {
         parts.push(m + 'm');
    }  

    parametric_transformer_timer_hour_min = parts.join(' ');
}

domParametric.click(function () {
    var isHided = domParametricParent.hasClass("hide");

    if (!isHided) {
        domParametricParent.addClass("hide");
        storage.setItem(domParametricParent[0].id, "hide");

        timeRemaining = 3600*24*7;

        let datereset = new Date();
        datereset.setHours(datereset.getHours()+timeRemaining/3600);
        storage.setItem(domParametricParent[0].id + "timer", datereset);
    }
});

window.setInterval(()=>{
    parametric_transformer_timer_render();
}, 1000);