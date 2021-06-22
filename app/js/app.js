const storage = window.localStorage;

//#region Variables
//Get all inputs
let inputs = $("input");

// #region Tabs 
//Get tabs
let btnRessources = $("#btn_ressources");
let btnPersonnages = $("#btn_personnages");
//Get tabs display
let listeRessources = $("#liste_ressources");
let listePersonnages = $("#liste_personnages");

//Get tabs
let btnBossDomains = $("#btn_boss_domains");
let btnHarvestables = $("#btn_harvestables");
//Get tabs display
let listRessourcesBossDomains = $("#list_ressources_boss_domains");
let listRessourcesHarvestable = $("#list_ressources_harvestable");
//#endregion

// #region Modal Variables
// Get the modal
let modal = $("#myModal");
// Get modal buttons
let modalBtnYes = $("#myModal-btn-yes");
let modalBtnNo = $("#myModal-btn-no");
// Get the <span> element that closes the modal
let modalSpan = document.getElementsByClassName("close")[0];
// #endregion
//#endregion

//#region window actions
window.addEventListener("keyup", function(event) {
    if (event.code == "Enter") {
        modalBtnYes.click();
    }
    if (event.code == "Escape") {
        modalBtnNo.click();
    }
});
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal[0].style.display = "none";
    }
};
//#endregion

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
});

inputs.each(function () {
    var input = $(this);
    var inputid = input[0].id;
    
    if (inputid.includes("right")) {
        input.click(function () {        
            input.blur();
            $("#myModal-text")[0].innerHTML = "Changer la valeur de " + inputid + " ?";
            modalBtnYes.click(function () {
                modal[0].style.display = "none";
                input[0].focus();
            });
            modal[0].style.display = "block";
        });
        $(this).attr('tabindex', '-1');
    };

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

//#region clicks
$(".hideable").click(function () {
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

btnRessources.click(function () {
    var isChecked = btnRessources.hasClass("checked");
    if (!isChecked) {
        btnRessources.addClass("checked");
        storage.setItem(btnRessources[0].id, "checked");

        btnPersonnages.removeClass("checked");
        storage.removeItem(btnPersonnages[0].id, "checked");

        listePersonnages.addClass("collapsed");
        storage.setItem(listePersonnages[0].id, "collapsed");

        listeRessources.removeClass("collapsed");
        storage.removeItem(listeRessources[0].id, "collapsed");
    }
});
btnPersonnages.click(function () {
    var isChecked = btnPersonnages.hasClass("checked");
    if (!isChecked) {
        btnPersonnages.addClass("checked");
        storage.setItem(btnPersonnages[0].id, "checked");

        btnRessources.removeClass("checked");
        storage.removeItem(btnRessources[0].id, "checked");

        listeRessources.addClass("collapsed");
        storage.setItem(listeRessources[0].id, "collapsed");

        listePersonnages.removeClass("collapsed");
        storage.removeItem(listePersonnages[0].id, "collapsed");
    }
});
// When the user clicks on <span> (x), close the modal
modalSpan.onclick = function () {
    modal[0].style.display = "none";
};
modalBtnNo.click(function () {
    modal[0].style.display = "none";
});
//#endregion


//#region misc functions
function isInteger(valueToCheck) {
    return typeof valueToCheck !== 'undefined' && (valueToCheck == parseInt(valueToCheck, 10));
};
//#endregion