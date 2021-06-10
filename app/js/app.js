var storage = window.localStorage;

$(document).ready(function () {
    if (storage.length > 0) {
        for (var i = 0; i < storage.length; i++) {
            var key = storage.key(i);
            var dom = $('#' + key);
            var value = storage.getItem(key);

            if (value == "hide" || value == "checked" || value == "collapsed") {
                dom.addClass(value);
            }
            else if (key.includes("input")) {
                dom[0].value = value;
            }
        }
    }
    else {
        $("#list_ressources_harvestable").addClass("collapsed");
        storage.setItem("list_ressources_harvestable", "collapsed");
        $("#btn_boss_domains").addClass("checked");
        storage.setItem("btn_boss_domains", "checked");
    }


    var date_ob = new Date();
    date_ob.setHours(date_ob.getHours() - 4);

    let splitted_date_ob = date_ob.toString().toLowerCase().split(" ");

    let day = splitted_date_ob[0];
    let hour = splitted_date_ob[4].split(":")[0];

    let domday_monday_thursday = $("#farm_ressources_days_monday_thursday");
    let domday_tuesday_friday = $("#farm_ressources_days_tuesday_friday");
    let domday_wednesday_saturday = $("#farm_ressources_days_wednesday_saturday");

    switch (day) {
        case 'mon':
        case 'thu':
            domday_monday_thursday.addClass("day_active");
            break;
        case 'tue':
        case 'fri':
            domday_tuesday_friday.addClass("day_active");
            break;
        case 'wed':
        case 'sat':
            domday_wednesday_saturday.addClass("day_active");
            break;
        case 'sun':
            domday_monday_thursday.addClass("day_active");
            domday_tuesday_friday.addClass("day_active");
            domday_wednesday_saturday.addClass("day_active");
            break;
        default:
            console.log("Default: => " + day);
    }
});

$(".content").click(function () {
    var panel = $(this).parent();
    var isHided = panel.hasClass("hide");

    if (isHided) {
        panel.removeClass("hide");
        storage.removeItem(panel[0].id);
    }
    else {
        panel.addClass("hide");
        storage.setItem(panel[0].id, "hide");
    }
});

var btnBossDomains = $("#btn_boss_domains");
var btnHarvestables = $("#btn_harvestables");
var listRessourcesBossDomains = $("#list_ressources_boss_domains");
var listRessourcesHarvestable = $("#list_ressources_harvestable");

btnBossDomains.click(function () {
    var isChecked = btnBossDomains.hasClass("checked");
    if (!isChecked) {
        btnBossDomains.addClass("checked");
        storage.setItem(btnBossDomains[0].id, "checked");

        btnHarvestables.removeClass("checked");
        storage.removeItem(btnHarvestables[0].id, "checked");

        listRessourcesBossDomains.removeClass("collapsed");
        storage.removeItem(listRessourcesBossDomains[0].id, "collapsed");

        listRessourcesHarvestable.addClass("collapsed");
        storage.setItem(listRessourcesHarvestable[0].id, "collapsed");
    }
});

btnHarvestables.click(function () {
    var isChecked = btnHarvestables.hasClass("checked");
    if (!isChecked) {
        btnHarvestables.addClass("checked");
        storage.setItem(btnHarvestables[0].id, "checked");

        btnBossDomains.removeClass("checked");
        storage.removeItem(btnBossDomains[0].id, "checked");

        listRessourcesBossDomains.addClass("collapsed");
        storage.setItem(listRessourcesBossDomains[0].id, "collapsed");

        listRessourcesHarvestable.removeClass("collapsed");
        storage.removeItem(listRessourcesHarvestable[0].id, "collapsed");
    }
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var inputs = $("input");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the input, open the modal
inputs.each(function () {
    var input = $(this);
    var inputid = input[0].id;

    input.click(function () {
        if (inputid.includes("rigth")) {
            input.blur();
            $("#myModal-text")[0].innerHTML = "Changer la valeur de " + inputid + " ?";
            $("#myModal-btn-yes").click(function () {
                modal.style.display = "none";
                input[0].focus();
            });
            modal.style.display = "block";
        }
    });

    input[0].addEventListener('input', function (e) {
        var value = e.target.value;
        if (value == "") {
            storage.removeItem(inputid);
        }
        else storage.setItem(inputid, e.target.value);

        if (e.target.id == "input_left-nb_book_vi" || "input_left-nb_book_b") {

            var inputBookVi = $("#input_left-nb_book_vi");
            var inputBookB = $("#input_left-nb_book_b");
            var inputBookTotal = $("#input_left-xp_total");

            var valueVi = inputBookVi[0].value;
            var valueB = inputBookB[0].value;

            if (isInteger(valueB) && isInteger(valueVi)) {
                inputBookTotal[0].value = parseInt(valueVi, 10) + Math.floor((parseInt(valueB, 10) / 4));
                storage.setItem(inputBookTotal[0].id, inputBookTotal[0].value);
            }
            else if (inputBookVi[0].value == "" && inputBookB[0].value == "") {
                inputBookTotal[0].value = "";
                storage.removeItem(inputBookTotal[0].id);
            }
            else {
                if (isInteger(valueB)) inputBookTotal[0].value = Math.floor((parseInt(valueB, 10) / 4));
                else if (isInteger(valueVi)) inputBookTotal[0].value = parseInt(valueVi, 10);
            }
        }
    });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

$("#myModal-btn-no").click(function () {
    modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function isInteger(valueToCheck) {
    return typeof valueToCheck !== 'undefined' && (valueToCheck == parseInt(valueToCheck, 10));
};