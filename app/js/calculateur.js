var characters = loadCharactersJSON();

function loadCharactersJSON(){
    var datas;
    $.ajaxSetup({
    async: false
    });
    $.getJSON("ressources/characters.json", function(data){
        datas = data;
    }).fail(function(){
    console.log("An error has occurred.");
    })
    $.ajaxSetup({
    async: true
    });
    return datas;
}

//#region Gestion Personnage

//#region Gestion de la dropdown des personnages
$('.selectpicker').append( $('<option data-tokens="-1">Unknown</option>'));
let idChar = 0;
$.each(characters['Characters'], function (idx, char) {
    console.log(idx, char);
    $('.selectpicker').append( $('<option data-tokens="' + idChar + '" data-content="' + char.name + '">' + char.name + '</option>'));
    idChar = idChar+1;
});

var imgBackground = document.getElementById("calculateur_personnage_panel_background");
var imgPortrait = document.getElementById("calculateur_personnage_panel_portrait");
var imgElement = document.getElementById("calculateur_personnage_img_element_active");
$('#calculateur_personnage_names').change(function () {
    var optionSelected = $(this).find("option:selected");
    var idSelected     = optionSelected.attr('data-tokens');

    //console.log(idSelected + " " + valueSelected + " " + textSelected);
    if(idSelected == -1){				
        imgBackground.src = "assets/icons/characters/caseunknown.png";
        imgPortrait.src = "assets/icons/characters/char_unknown.png";
        imgElement.src = "assets/icons/filters/element_unknown.png";
    }
    else{
        var characterName = characters.Characters[idSelected].name;
        var characterRarity = characters.Characters[idSelected].rarity;
        var characterElement = characters.Characters[idSelected].vision;

        imgBackground.src = "assets/icons/characters/case"+characterRarity+"nat.png";
        imgPortrait.src = "assets/icons/characters/char_"+characterName+".png";
        imgElement.src = "assets/icons/filters/element_"+characterElement+".png";
    }
});
//#endregion

//#region Gestion selection element
var elementChoices = $(".calculateur_personnage_element_choices");
$("#calculateur_personnage_element_active").click(function(event){
    event.stopPropagation();
    console.log("click_display_choices");		
    elementChoices.each(function(){
        if($(this).hasClass("collapsed")){
            $(this).removeClass("collapsed");
        }
        else{
            $(this).addClass("collapsed");
        }
    });
})
$(".calculateur_personnage_element_choices").click(function(){
    event.stopPropagation();
    console.log("click_choices");			
    imgElement.src = $(this).children()[0].getAttribute("src");	
    elementChoices.each(function(){
        $(this).addClass("collapsed");
    });
})
//#endregion

//#region Gestion dropdown Ascension

//#region Gestion selection talent
$("#custom-select-ascension-talent").click(function(event){
    event.stopPropagation();
    closeAllAscensionsDropdown();
    var dropdown = $("#custom-select-ascension-talent-dropdown");
    dropdown.hasClass("collapsed") ? dropdown.removeClass("collapsed") : dropdown.addClass("collapsed");
})
$(".calculateur_ascension_select_talent").click(function(){
    event.stopPropagation();
    $("#custom_select_ascension_talent_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#custom-select-ascension-talent-dropdown").addClass("collapsed");
})
//#endregion			

//#region Gestion selection elem
$("#custom-select-ascension-elem").click(function(event){
    event.stopPropagation();
    closeAllAscensionsDropdown();
    var dropdown = $("#custom-select-ascension-elem-dropdown");
    dropdown.hasClass("collapsed") ? dropdown.removeClass("collapsed") : dropdown.addClass("collapsed");
})
$(".calculateur_ascension_select_elem").click(function(){
    event.stopPropagation();
    $("#custom_select_ascension_elem_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#custom-select-ascension-elem-dropdown").addClass("collapsed");
})
//#endregion

//#region Gestion selection gem 
$("#custom-select-ascension-gem").click(function(event){
    event.stopPropagation();
    closeAllAscensionsDropdown();
    var dropdown = $("#custom-select-ascension-gem-dropdown");
    dropdown.hasClass("collapsed") ? dropdown.removeClass("collapsed") : dropdown.addClass("collapsed");
})
$(".calculateur_ascension_select_gem").click(function(){
    event.stopPropagation();
    $("#custom_select_ascension_gem_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#custom-select-ascension-gem-dropdown").addClass("collapsed");
})
//#endregion

//#region Gestion selection harvestable
$("#custom-select-ascension-environment").click(function(event){
    event.stopPropagation();
    closeAllAscensionsDropdown();
    var dropdown = $("#custom-select-ascension-environment-dropdown");
    dropdown.hasClass("collapsed") ? dropdown.removeClass("collapsed") : dropdown.addClass("collapsed");
})
$(".calculateur_ascension_select_environment").click(function(){
    event.stopPropagation();
    $("#custom_select_ascension_environment_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#custom-select-ascension-environment-dropdown").addClass("collapsed");
})
//#endregion

//#region Gestion selection commons
$("#custom-select-ascension-common").click(function(event){
    event.stopPropagation();
    closeAllAscensionsDropdown();
    var dropdown = $("#custom-select-ascension-common-dropdown");
    dropdown.hasClass("collapsed") ? dropdown.removeClass("collapsed") : dropdown.addClass("collapsed");
})
$(".calculateur_ascension_select_common").click(function(){
    event.stopPropagation();
    $("#custom_select_ascension_common_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#custom-select-ascension-common-dropdown").addClass("collapsed");
})
//#endregion

//#region Gestion selection boss
$("#custom-select-ascension-boss").click(function(event){
    event.stopPropagation();
    closeAllAscensionsDropdown();
    var dropdown = $("#custom-select-ascension-boss-dropdown");
    dropdown.hasClass("collapsed") ? dropdown.removeClass("collapsed") : dropdown.addClass("collapsed");
})
$(".calculateur_ascension_select_boss").click(function(){
    event.stopPropagation();
    $("#custom_select_ascension_boss_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#custom-select-ascension-boss-dropdown").addClass("collapsed");
})
//#endregion


//#endregion

$(window).click(function() {
    console.log("click_window");	
    elementChoices.each(function(){
        $(this).addClass("collapsed");
    });
    closeAllAscensionsDropdown();
});
function closeAllAscensionsDropdown(){
    $("#custom-select-ascension-talent-dropdown").addClass("collapsed");
    $("#custom-select-ascension-elem-dropdown").addClass("collapsed");
    $("#custom-select-ascension-gem-dropdown").addClass("collapsed");
    $("#custom-select-ascension-environment-dropdown").addClass("collapsed");
    $("#custom-select-ascension-common-dropdown").addClass("collapsed");
    $("#custom-select-ascension-boss-dropdown").addClass("collapsed");

    $("#calculateur-arme-custom-select-ascension-domain-dropdown").addClass("collapsed");
    $("#calculateur-arme-custom-select-ascension-elite-dropdown").addClass("collapsed");
    $("#calculateur-arme-custom-select-ascension-common-dropdown").addClass("collapsed");
}

//#region Gestion calculer Personnage 

$("#calculateur-personnage-btn-calculer").click(function(event){
    event.stopPropagation();

    let element = $("#calculateur_personnage_img_element_active").attr("src");
    let background = $("#calculateur_personnage_panel_background").attr("src");
    let personnagePortrait = $("#calculateur_personnage_panel_portrait").attr("src");
    let personnageName = $("#calculateur_personnage_names").val();

    let lvl = parseInt($("#calculateur_personnage_infos_lvl_input").val());

    let talentStart = $("#calculateur_personnage_infos_talent_current_input").val();
    let talentEnd = $("#calculateur_personnage_infos_talent_final_input").val();

    let plant = $("#custom_select_ascension_environment_selected_icon").attr("src");
    let week = $("#custom_select_ascension_boss_selected_icon").attr("src");
    let elem = $("#custom_select_ascension_elem_selected_icon").attr("src");

    let talent = $("#custom_select_ascension_talent_selected_icon").attr("src");
    let mob = $("#custom_select_ascension_common_selected_icon").attr("src");
    let gem = $("#custom_select_ascension_gem_selected_icon").attr("src");

    let talent1Start = (talentStart.substring(0,1) == "x" || talentStart.substring(0,1) == "X") ? 10 : parseInt(talentStart.substring(0,1));
    let talent2Start = (talentStart.substring(1,2) == "x" || talentStart.substring(1,2) == "X") ? 10 : parseInt(talentStart.substring(1,2));
    let talent3Start = (talentStart.substring(2,3) == "x" || talentStart.substring(2,3) == "X") ? 10 : parseInt(talentStart.substring(2,3));

    let talent1End = (talentEnd.substring(0,1) == "x" || talentEnd.substring(0,1) == "X") ? 10 : parseInt(talentEnd.substring(0,1));
    let talent2End = (talentEnd.substring(1,2) == "x" || talentEnd.substring(1,2) == "X") ? 10 : parseInt(talentEnd.substring(1,2));
    let talent3End = (talentEnd.substring(2,3) == "x" || talentEnd.substring(2,3) == "X") ? 10 : parseInt(talentEnd.substring(2,3));

    let talentVe = talent.substr(0, talent.length - 6) + "ve.png";
    let talentB  = talent.substr(0, talent.length - 6) + "b.png";
    let talentVi = talent.substr(0, talent.length - 6) + "vi.png";

    let mobGr = mob.substr(0, mob.length - 5) + "gr.png";
    let mobVe  = mob.substr(0, mob.length - 5) + "ve.png";
    let mobB = mob.substr(0, mob.length - 5) + "b.png";

    let gemVe = gem.substr(0, gem.length - 5) + "ve.png";
    let gemB  = gem.substr(0, gem.length - 5) + "b.png";
    let gemVi = gem.substr(0, gem.length - 5) + "vi.png";
    let gemG  = gem.substr(0, gem.length - 5) + "g.png";

    //#region Display ressources
    $("#calculateur-personnage-resultat_img_element_active").attr("src",element);
    $("#calculateur-personnage-resultat_panel_background").attr("src",background);
    $("#calculateur-personnage-resultat_panel_portrait").attr("src",personnagePortrait);
    $("#calculateur-personnage-resultat_name").text(personnageName);

    $("#calculateur-personnage-resultat-gem-ve-icon").attr("src",gemVe);
    $("#calculateur-personnage-resultat-gem-b-icon").attr("src",gemB);
    $("#calculateur-personnage-resultat-gem-vi-icon").attr("src",gemVi);
    $("#calculateur-personnage-resultat-gem-g-icon").attr("src",gemG);

    $("#calculateur-personnage-resultat-elem-icon").attr("src",elem);
    $("#calculateur-personnage-resultat-plant-icon").attr("src",plant);
    $("#calculateur-personnage-resultat-week-icon").attr("src",week);

    $("#calculateur-personnage-resultat-mob-gr-icon").attr("src",mobGr);
    $("#calculateur-personnage-resultat-mob-ve-icon").attr("src",mobVe);
    $("#calculateur-personnage-resultat-mob-b-icon").attr("src",mobB);

    $("#calculateur-personnage-resultat-talent-ve-icon").attr("src",talentVe);
    $("#calculateur-personnage-resultat-talent-b-icon").attr("src",talentB);
    $("#calculateur-personnage-resultat-talent-vi-icon").attr("src",talentVi);
    //#endregion

    //#region Compute values
    $("#calculateur-personnage-resultat-bouquin-amount").text(computeXP(lvl));

    let computedMoras = computeMorasLvl(lvl)+computeMorasTalent(talent1Start, talent1End)+computeMorasTalent(talent2Start, talent2End)+computeMorasTalent(talent3Start, talent3End);
    $("#calculateur-personnage-resultat-moras-amount").text(new Intl.NumberFormat('en-US', {style: 'decimal'}).format(computedMoras));

    $("#calculateur-personnage-resultat-gem-ve-amount").text(computeGemVe(lvl));
    $("#calculateur-personnage-resultat-gem-b-amount").text(computeGemB(lvl));
    $("#calculateur-personnage-resultat-gem-vi-amount").text(computeGemVi(lvl));
    $("#calculateur-personnage-resultat-gem-g-amount").text(computeGemG(lvl));
    
    $("#calculateur-personnage-resultat-elem-amount").text(computeElem(lvl));
    $("#calculateur-personnage-resultat-plant-amount").text(computePlants(lvl));
    $("#calculateur-personnage-resultat-week-amount").text(computeBoss(talent1Start, talent1End) + computeBoss(talent2Start, talent2End) + computeBoss(talent3Start, talent3End));
    $("#calculateur-personnage-resultat-crown-amount").text(computeCrown(talent1Start, talent1End) + computeCrown(talent2Start, talent2End) + computeCrown(talent3Start, talent3End));

    let mobTalentGr = computeMobGr(talent1Start, talent1End)+computeMobGr(talent2Start, talent2End)+computeMobGr(talent3Start, talent3End)+computeMobGrLvl(lvl);
    let mobTalentVe = computeMobVe(talent1Start, talent1End)+computeMobVe(talent2Start, talent2End)+computeMobVe(talent3Start, talent3End)+computeMobVeLvl(lvl);
    let mobTalentB  = computeMobB(talent1Start, talent1End)+computeMobB(talent2Start, talent2End)+computeMobB(talent3Start, talent3End)+computeMobBLvl(lvl);

    $("#calculateur-personnage-resultat-mob-gr-amount").text(mobTalentGr);
    $("#calculateur-personnage-resultat-mob-ve-amount").text(mobTalentVe);
    $("#calculateur-personnage-resultat-mob-b-amount").text(mobTalentB);

    $("#calculateur-personnage-resultat-talent-ve-amount").text(computeTalentVe(talent1Start, talent1End)+computeTalentVe(talent2Start, talent2End)+computeTalentVe(talent3Start, talent3End));
    $("#calculateur-personnage-resultat-talent-b-amount").text(computeTalentB(talent1Start, talent1End)+computeTalentB(talent2Start, talent2End)+computeTalentB(talent3Start, talent3End));
    $("#calculateur-personnage-resultat-talent-vi-amount").text(computeTalentVi(talent1Start, talent1End)+computeTalentVi(talent2Start, talent2End)+computeTalentVi(talent3Start, talent3End));
    //#endregion

    $("#calculateur-personnage-resultat").removeClass("collapsed");
});

function computeXP(lvl){
    if(lvl<20){
        return 421;
    }
    if(lvl<40){
        return 414;
    }
    if(lvl<50){
        return 385;
    }
    if(lvl<60){
        return 356;
    }
    if(lvl<70){
        return 313;
    }
    if(lvl<80){
        return 253;
    }
    if(lvl<90){
        return 172;
    }
}

function computeMorasLvl(lvl){
    if(lvl<20){
        return 2092530;
    }
    if(lvl<40){
        return 2068495;
    }
    if(lvl<50){
        return 1932830;
    }
    if(lvl<60){
        return 1777010;
    }
    if(lvl<70){
        return 1546185;
    }
    if(lvl<80){
        return 1227000;
    }
    if(lvl<90){
        return 804625;
    }
}

function computeMorasTalent(talentStart, talentEnd){
    let res = 0;
    if(talentStart<2 && talentEnd>1){
        res += 12500;
    }
    if(talentStart<3 && talentEnd>2){
        res += 17500;
    }
    if(talentStart<4 && talentEnd>3){
        res += 25000;
    }
    if(talentStart<5 && talentEnd>4){
        res += 30000;
    }
    if(talentStart<6 && talentEnd>5){
        res += 37500;
    }
    if(talentStart<7 && talentEnd>6){
        res += 120000;
    }
    if(talentStart<8 && talentEnd>7){
        res += 260000;
    }
    if(talentStart<9 && talentEnd>8){
        res += 450000;
    }
    if(talentStart<10 && talentEnd>9){
        res += 700000;
    }
    return res;
}

//#region Compute Gems
function computeGemVe(lvl){
    if(lvl<40){
        return 1;
    }
}
function computeGemB(lvl){
    if(lvl<50){
        return 9;
    }
    if(lvl<60){
        return 6
    }
}
function computeGemVi(lvl){
    if(lvl<60){
        return 9;
    }
    if(lvl<70){
        return 6
    }
}
function computeGemG(lvl){
    if(lvl<90){
        return 6;
    }
}
//#endregion

function computeElem(lvl){
    if(lvl<50){
        return 46;
    }
    if(lvl<60){
        return 44;
    }
    if(lvl<70){
        return 40;
    }
    if(lvl<80){
        return 32;
    }
    if(lvl<90){
        return 20;
    }
}

function computePlants(lvl){
    if(lvl<40){
        return 168;
    }
    if(lvl<50){
        return 165;
    }
    if(lvl<60){
        return 155;
    }
    if(lvl<70){
        return 135;
    }
    if(lvl<80){
        return 105;
    }
    if(lvl<90){
        return 60;
    }
}

function computeBoss(talentStart, talentEnd){
    console.log(talentStart + " " + talentEnd);
    let res = 0;
    if(talentStart < 7 && talentEnd >= 7){
        res += 1;
    }
    if(talentStart < 8 && talentEnd >= 8){
        res += 1;
    }
    if(talentStart < 9 && talentEnd >= 9){
        res += 2;
    }
    if(talentStart < 10 && talentEnd >= 10){
        res += 2;
    }
    return res;
}

function computeCrown(talentStart, talentEnd){
    if(talentStart < 10 && talentEnd == 10){
        return 1;
    }
    return 0;
}

//#region Compute Mobs
function computeMobGr(talentStart, talentEnd){
    if(talentStart<2 && talentEnd>1){
        return 6;
    }
}
function computeMobVe(talentStart, talentEnd){
    let res = 0;
    if(talentStart<3 && talentEnd>2){
        res += 3;
    }
    if(talentStart<4 && talentEnd>3){
        res += 4;
    }
    if(talentStart<5 && talentEnd>4){
        res += 6;
    }
    if(talentStart<6 && talentEnd>5){
        res += 9;
    }
    return res;
}
function computeMobB(talentStart, talentEnd){
    let res = 0;
    if(talentStart<7 && talentEnd>6){
        res += 4;
    }
    if(talentStart<8 && talentEnd>7){
        res += 6;
    }
    if(talentStart<9 && talentEnd>8){
        res += 9;
    }
    if(talentStart<10 && talentEnd>9){
        res += 12;
    }
    return res;
}

function computeMobGrLvl(lvl){
    let res = 0;
    if(lvl < 40) res += 3;
    if(lvl < 50) res += 15;
    return res;
}
function computeMobVeLvl(lvl){
    let res = 0;
    if(lvl < 60) res += 12;
    if(lvl < 70) res += 18;
    return res;
}
function computeMobBLvl(lvl){
    let res = 0;
    if(lvl < 80) res += 12;
    if(lvl < 90) res += 24;
    return res;
}
//#endregion

//#region Compute Talent
function computeTalentVe(talentStart, talentEnd){
    if(talentStart<2 && talentEnd>1){
        return 3;
    }
}
function computeTalentB(talentStart, talentEnd){
    let res = 0;
    if(talentStart<3 && talentEnd>2){
        res += 2;
    }
    if(talentStart<4 && talentEnd>3){
        res += 4;
    }
    if(talentStart<5 && talentEnd>4){
        res += 6;
    }
    if(talentStart<6 && talentEnd>5){
        res += 9;
    }
    return res;
}
function computeTalentVi(talentStart, talentEnd){
    let res = 0;
    if(talentStart<7 && talentEnd>6){
        res += 4;
    }
    if(talentStart<8 && talentEnd>7){
        res += 6;
    }
    if(talentStart<9 && talentEnd>8){
        res += 12;
    }
    if(talentStart<10 && talentEnd>9){
        res += 16;
    }
    return res;
}
//#endregion

//#endregion

//#endregion

//#region Gestion Arme

//#region Rareté
let weaponRarityChoice = $("#calculateur-arme-rarity-choices");
let weaponRarityChoiceImg = $("#calculateur-arme-rarity-selected-img");
$("#calculateur-arme-rarity").click(function(event){
    event.stopPropagation();

    if(weaponRarityChoice.hasClass("collapsed")){
        weaponRarityChoice.removeClass("collapsed");
        console.log("test1");
    } else { 
        weaponRarityChoice.addClass("collapsed"); 
        console.log("test2");
    }

    console.log("coucou");
});
$("#calculateur-arme-rarity3-choice").click(function(event){
    event.stopPropagation();
    weaponRarityChoiceImg.attr("src",$("#calculateur-arme-rarity3-choice-img").attr("src"));
    weaponRarityChoice.addClass("collapsed"); 
})
$("#calculateur-arme-rarity4-choice").click(function(event){
    event.stopPropagation();
    weaponRarityChoiceImg.attr("src",$("#calculateur-arme-rarity4-choice-img").attr("src"));
    weaponRarityChoice.addClass("collapsed"); 
    
})
$("#calculateur-arme-rarity5-choice").click(function(event){
    event.stopPropagation();
    weaponRarityChoiceImg.attr("src",$("#calculateur-arme-rarity5-choice-img").attr("src"));
    weaponRarityChoice.addClass("collapsed"); 
})
//#endregion

//#region Dropdowns
$("#calculateur-arme-custom-select-ascension-domain").click(function(event){
    event.stopPropagation();
    closeAllAscensionsDropdown();

    let dropdownArmeAscensionDomain = $("#calculateur-arme-custom-select-ascension-domain-dropdown");
    if(dropdownArmeAscensionDomain.hasClass("collapsed")){
        dropdownArmeAscensionDomain.removeClass("collapsed");
    }else{
        dropdownArmeAscensionDomain.addClass("collapsed");
    }
})
$("#calculateur-arme-custom-select-ascension-elite").click(function(event){
    event.stopPropagation();
    closeAllAscensionsDropdown();

    let dropdownArmeAscensionElite = $("#calculateur-arme-custom-select-ascension-elite-dropdown");
    if(dropdownArmeAscensionElite.hasClass("collapsed")){
        dropdownArmeAscensionElite.removeClass("collapsed");
    }else{
        dropdownArmeAscensionElite.addClass("collapsed");
    }
})
$("#calculateur-arme-custom-select-ascension-common").click(function(event){
    event.stopPropagation();
    closeAllAscensionsDropdown();

    let dropdownArmeAscensionCommon = $("#calculateur-arme-custom-select-ascension-common-dropdown");
    if(dropdownArmeAscensionCommon.hasClass("collapsed")){
        dropdownArmeAscensionCommon.removeClass("collapsed");
    }else{
        dropdownArmeAscensionCommon.addClass("collapsed");
    }
})

$(".calculateur-arme-custom-select-ascension-domain-dropdown-option").click(function(event){
    event.stopPropagation();

    $("#calculateur-arme-ascension-ressources-domain_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#calculateur-arme-custom-select-ascension-domain-dropdown").addClass("collapsed");
})
$(".calculateur-arme-custom-select-ascension-elite-dropdown-option").click(function(event){
    event.stopPropagation();

    $("#calculateur-arme-ascension-ressources-elite_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#calculateur-arme-custom-select-ascension-elite-dropdown").addClass("collapsed");
})
$(".calculateur-arme-custom-select-ascension-common-dropdown-option").click(function(event){
    event.stopPropagation();

    $("#calculateur-arme-ascension-ressources-common_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#calculateur-arme-custom-select-ascension-common-dropdown").addClass("collapsed");
})

$(".calculateur-arme-custom-select-ascension-domain-dropdown-option").click(function(event){
    event.stopPropagation();

    $("#calculateur-arme-ascension-ressources-domain_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#calculateur-arme-custom-select-ascension-domain-dropdown").addClass("collapsed");
})
$(".calculateur-arme-custom-select-ascension-elite-dropdown-option").click(function(event){
    event.stopPropagation();

    $("#calculateur-arme-ascension-ressources-elite_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#calculateur-arme-custom-select-ascension-elite-dropdown").addClass("collapsed");
})
$(".calculateur-arme-custom-select-ascension-common-dropdown-option").click(function(event){
    event.stopPropagation();

    $("#calculateur-arme-ascension-ressources-common_selected_icon").attr("src",$(this).children()[0].getAttribute("src"));
    $("#calculateur-arme-custom-select-ascension-common-dropdown").addClass("collapsed");
})
//#endregion

//#region Calculer Arme
$("#calculateur-arme-btn-calculer").click(function(event){
    event.stopPropagation();

    $("#calculateur-arme-resultat").removeClass("collapsed");

    let weaponRarityImg = $("#calculateur-arme-rarity-selected-img").attr("src");
    let weaponRarity = parseInt(weaponRarityImg.charAt(weaponRarityImg.length-11));
    let weaponLvl = parseInt($("#calculateur-arme-lvl-input").val());
    console.log("weaponRarity: " + weaponRarity + " weaponLvl: " + weaponLvl)

    //#region Ressources img
    $("#calculateur-arme-resultat-rarity-img").attr("src",weaponRarityImg);
    $("#calculateur-arme-resultat-nom").val($("#calculateur-arme-nom").val());

    let ressourceDomain = $("#calculateur-arme-ascension-ressources-domain_selected_icon").attr("src").slice(0,-5);
    let ressourceElite  = $("#calculateur-arme-ascension-ressources-elite_selected_icon").attr("src").slice(0,-6);
    let ressourceCommon = $("#calculateur-arme-ascension-ressources-common_selected_icon").attr("src").slice(0,-5);

    let ressourceDomainVe = ressourceDomain + "ve.png";
    let ressourceDomainB  = ressourceDomain + "b.png";
    let ressourceDomainVi = ressourceDomain + "vi.png";
    let ressourceDomainG  = ressourceDomain + "g.png";

    let ressourceEliteVe = ressourceElite + "ve.png";
    let ressourceEliteB  = ressourceElite + "b.png";
    let ressourceEliteVi = ressourceElite + "vi.png";

    let ressourceCommonGr = ressourceCommon + "gr.png";
    let ressourceCommonVe = ressourceCommon + "ve.png";
    let ressourceCommonB  = ressourceCommon + "b.png";

    $("#calculateur-arme-resultat-domain-icon-ve").attr("src",ressourceDomainVe);
    $("#calculateur-arme-resultat-domain-icon-b") .attr("src",ressourceDomainB );
    $("#calculateur-arme-resultat-domain-icon-vi").attr("src",ressourceDomainVi);
    $("#calculateur-arme-resultat-domain-icon-g") .attr("src",ressourceDomainG );

    $("#calculateur-arme-resultat-elite-icon-ve").attr("src",ressourceEliteVe);
    $("#calculateur-arme-resultat-elite-icon-b") .attr("src",ressourceEliteB );
    $("#calculateur-arme-resultat-elite-icon-vi").attr("src",ressourceEliteVi);

    $("#calculateur-arme-resultat-common-icon-gr").attr("src",ressourceCommonGr);
    $("#calculateur-arme-resultat-common-icon-ve").attr("src",ressourceCommonVe);
    $("#calculateur-arme-resultat-common-icon-b") .attr("src",ressourceCommonB );
    //#endregion

    //#region Compute 
    $("#calculateur-arme-result-minerais-amount").text(computeMineraisArme(weaponRarity, weaponLvl));
    $("#calculateur-arme-result-moras-amount").text(new Intl.NumberFormat('en-US', {style: 'decimal'}).format(computeMorasArme(weaponRarity, weaponLvl)));
    
    //#region Compute Domain
    $("#calculateur-arme-result-domain-ve-amount").text(function(){
        let res = 0;
        if(weaponRarity==5){
            if(weaponLvl<40) res += 5;
        }
        else if(weaponRarity==4){
            if(weaponLvl<40) res += 3;
        }
        else{
            if(weaponLvl<40) res += 2;
        }
        return res;
    });
    $("#calculateur-arme-result-domain-b-amount") .text(function(){
        let res = 0;
        if(weaponRarity==5){
            if(weaponLvl<50) res += 14;
            else if(weaponLvl<60) res += 9;
        }
        else if(weaponRarity==4){
            if(weaponLvl<50) res += 9;
            else if(weaponLvl<60) res += 6;
        }
        else{
            if(weaponLvl<50) res += 6;
            else if(weaponLvl<60) res += 4;
        }
        return res;
    });
    $("#calculateur-arme-result-domain-vi-amount").text(function(){
        let res = 0;
        if(weaponRarity==5){
            if(weaponLvl<70) res += 14;
            else if(weaponLvl<80) res += 9;
        }
        else if(weaponRarity==4){
            if(weaponLvl<70) res += 9;
            else if(weaponLvl<80) res += 6;
        }
        else{
            if(weaponLvl<70) res += 6;
            else if(weaponLvl<80) res += 4;
        }
        return res;
    });
    $("#calculateur-arme-result-domain-g-amount") .text(function(){
        let res = 0;
        if(weaponRarity==5){
            if(weaponLvl<90) res += 6;
        }
        else if(weaponRarity==4){
            if(weaponLvl<90) res += 4;
        }
        else{
            if(weaponLvl<90) res += 3;
        }
        return res;
    });
    //#endregion

    //#region Compute Elite
    $("#calculateur-arme-result-elite-ve-amount").text(function(){
        let res = 0;
        if(weaponRarity==5){
            if(weaponLvl<40) res += 23;
            else if(weaponLvl<50) res += 18;
        }
        else if(weaponRarity==4){
            if(weaponLvl<40) res += 15;
            else if(weaponLvl<50) res += 12;
        }
        else{
            if(weaponLvl<40) res += 10;
            else if(weaponLvl<50) res += 8;
        }
        return res;
    });
    $("#calculateur-arme-result-elite-b-amount") .text(function(){
        let res = 0;
        if(weaponRarity==5){
            if(weaponLvl<60) res += 27;
            else if(weaponLvl<70) res += 18;
        }
        else if(weaponRarity==4){
            if(weaponLvl<60) res += 18;
            else if(weaponLvl<70) res += 12;
        }
        else{
            if(weaponLvl<60) res += 12;
            else if(weaponLvl<70) res += 8;
        }
        return res;
    });
    $("#calculateur-arme-result-elite-vi-amount").text(function(){
        let res = 0;
        if(weaponRarity==5){
            if(weaponLvl<80) res += 41;
            else if(weaponLvl<90) res += 27;
        }
        else if(weaponRarity==4){
            if(weaponLvl<80) res += 27;
            else if(weaponLvl<90) res += 18;
        }
        else{
            if(weaponLvl<80) res += 18;
            else if(weaponLvl<90) res += 12;
        }
        return res;
    });
    //#endregion

    //#region Compute Common
    $("#calculateur-arme-result-common-gr-amount").text(function(){
        let res = 0;
        if(weaponRarity==5){
            if(weaponLvl<40) res += 15;
            else if(weaponLvl<50) res += 12;
        }
        else if(weaponRarity==4){
            if(weaponLvl<40) res += 10;
            else if(weaponLvl<50) res += 8;
        }
        else{
            if(weaponLvl<40) res += 6;
            else if(weaponLvl<50) res += 5;
        }
        return res;
    });
    $("#calculateur-arme-result-common-ve-amount") .text(function(){
        let res = 0;
        if(weaponRarity==5){
            if(weaponLvl<60) res += 23;
            else if(weaponLvl<70) res += 14;
        }
        else if(weaponRarity==4){
            if(weaponLvl<60) res += 15;
            else if(weaponLvl<70) res += 9;
        }
        else{
            if(weaponLvl<60) res += 10;
            else if(weaponLvl<70) res += 6;
        }
        return res;
    });
    $("#calculateur-arme-result-common-b-amount").text(function(){
        let res = 0;
        if(weaponRarity==5){
            if(weaponLvl<80) res += 27;
            else if(weaponLvl<90) res += 18;
        }
        else if(weaponRarity==4){
            if(weaponLvl<80) res += 18;
            else if(weaponLvl<90) res += 12;
        }
        else{
            if(weaponLvl<80) res += 12;
            else if(weaponLvl<90) res += 8;
        }
        return res;
    });
    //#endregion

    //#region Compute Functions
    function computeMineraisArme(rarity, lvl){
        console.log(rarity + " " + lvl)
        if(rarity==5){
            if(weaponLvl<20){
                return 910;
            }
            if(weaponLvl<40){
                return 897;
            }
            if(weaponLvl<50){
                return 834;
            }
            if(weaponLvl<60){
                return 771;
            }
            if(weaponLvl<70){
                return 678;
            }
            if(weaponLvl<80){
                return 548;
            }
            if(weaponLvl<90){
                return 372;
            }
        }
        else if(rarity==4){
            if(weaponLvl<20){
                return 607;
            }
            if(weaponLvl<40){
                return 598;
            }
            if(weaponLvl<50){
                return 556;
            }
            if(weaponLvl<60){
                return 514;
            }
            if(weaponLvl<70){
                return 452;
            }
            if(weaponLvl<80){
                return 365;
            }
            if(weaponLvl<90){
                return 248;
            }
        }    
        else{
            if(weaponLvl<20){
                return 403;
            }
            if(weaponLvl<40){
                return 397;
            }
            if(weaponLvl<50){
                return 369;
            }
            if(weaponLvl<60){
                return 341;
            }
            if(weaponLvl<70){
                return 300;
            }
            if(weaponLvl<80){
                return 242;
            }
            if(weaponLvl<90){
                return 164;
            }
        }    
    }
    function computeMorasArme(rarity, lvl){
        console.log(rarity + " " + lvl)
        if(rarity==5){
            if(weaponLvl<20){
                return 1131447;
            }
            if(weaponLvl<40){
                return 1119292;
            }
            if(weaponLvl<50){
                return 1047012;
            }
            if(weaponLvl<60){
                return 964197;
            }
            if(weaponLvl<70){
                return 841429;
            }
            if(weaponLvl<80){
                return 666516;
            }
            if(weaponLvl<90){
                return 436478;
            }
        }
        else if(rarity==4){
            if(weaponLvl<20){
                return 754267;
            }
            if(weaponLvl<40){
                return 746167;
            }
            if(weaponLvl<50){
                return 699654;
            }
            if(weaponLvl<60){
                return 642781;
            }
            if(weaponLvl<70){
                return 560941;
            }
            if(weaponLvl<80){
                return 444336;
            }
            if(weaponLvl<90){
                return 292648;
            }
        }
        else{
            if(weaponLvl<20){
                return 504160;
            }
            if(weaponLvl<40){
                return 498760;
            }
            if(weaponLvl<50){
                return 466320;
            }
            if(weaponLvl<60){
                return 428640;
            }
            if(weaponLvl<70){
                return 372960;
            }
            if(weaponLvl<80){
                return 295740;
            }
            if(weaponLvl<90){
                return 193500;
            }
        }
    }
    //#endregion

    //#endregion

})
//#endregion

//#endregion