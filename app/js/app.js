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
        $("#list_ressources_harvestable").addClass(collapsed);
        storage.setItem("list_ressources_harvestable", "collapsed");
        storage.setItem("btn_boss_domains", "checked");
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