

const requestURLCharacters = 'https://api.genshin.dev/characters/';
const charactersCardsContainer = document.getElementById('liste_personnages_personnages');
const assetsRessourcesCharactersURL = "assets/icons/characters/char_";
const assetsRessourcesElementURL = "assets/icons/filters/element_";

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
class CharacterCard extends React.Component{
  render(){    
    var characterNameNoSpace = this.props.name.replace(' ', '_');
    characterNameNoSpace = characterNameNoSpace=="Traveler"? "aether" : characterNameNoSpace;
    var displayCharacterName = characterNameNoSpace=="aether"? this.props.name + " " + this.props.vision[0] : this.props.name;


    const IDBase = "liste_personnages_personnage_";
    const IDMainContainer = IDBase+characterNameNoSpace;
    const IDPortraitContent = IDBase+characterNameNoSpace+"_portrait";
    const IDPortraitName = IDBase+characterNameNoSpace+"_name";

    const srcBackgroundCase = "assets/icons/characters/case"+this.props.rarity+"nat.png";
    const srcPortrait = assetsRessourcesCharactersURL+characterNameNoSpace+".png";
    const srcVision = assetsRessourcesElementURL+this.props.vision+".png";
    
    return(
      React.createElement('div', {className:'personnage_panel', id:IDMainContainer},
        React.createElement('div', {className:'personnage_panel_portrait_content', id:IDPortraitContent},
          React.createElement('img', {className:'personnage_panel_background', src:srcBackgroundCase}),
          React.createElement('img', {className:'personnage_panel_portrait', src:srcPortrait}),
          React.createElement('img', {className:'personnage_panel_element', src:srcVision})        
        ),
        React.createElement('div', {className:'personnage_panel_name', id:IDPortraitName}, displayCharacterName)
    ));
  }
}
class CharactersList extends React.Component{
  render(){
    const charactersCards = [];
    this.props.characters.forEach((character)=>{
      charactersCards.push(
        <CharacterCard
          name={character.name}
          rarity={character.rarity}
          vision={character.vision}
        />
      );
    })
    return(
      charactersCards
    )
  };
}

class FilterableCharactersList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isPyro: false
    }
    this.handlePyroChange = this.handlePyroChange.bind(this);
  }
  handlePyroChange(isPyro){
    this.setState({
      isPyro: isPyro
    })
  }
  render(){
    return(
      <CharactersList 
        characters={this.props.characters}
        onPyroChange={this.state.isPyro}
      />
    )
  };
}

ReactDOM.render(
  <FilterableCharactersList 
    characters={characters.Characters}
  />,  
  charactersCardsContainer
);

$(document).ready(function () {
  //#region Filtre rariy
  let btnFiltreEtoile  = $('#liste_personnages_filtres_etoile');
  let btnFiltreEtoile5 = $('#liste_personnages_filtres_etoiles_cinq');
  let btnFiltreEtoile4 = $('#liste_personnages_filtres_etoiles_quatre');

  btnFiltreEtoile.click(function(){
    var isChecked = btnFiltreEtoile.hasClass("checked");
    if (!isChecked) {
      btnFiltreEtoile.addClass("checked");
      storage.setItem(btnFiltreEtoile[0].id, "checked");
      btnFiltreEtoile5.removeClass("checked");
      storage.removeItem(btnFiltreEtoile5[0].id, "checked");
      btnFiltreEtoile4.removeClass("checked");
      storage.removeItem(btnFiltreEtoile4[0].id, "checked");
    }
    else{
      btnFiltreEtoile.removeClass("checked");
      storage.removeItem(btnFiltreEtoile[0].id, "checked");
    }
  })
  btnFiltreEtoile5.click(function(){
    var isChecked = btnFiltreEtoile5.hasClass("checked");
    if (!isChecked) {
      btnFiltreEtoile5.addClass("checked");
      storage.setItem(btnFiltreEtoile5[0].id, "checked");
      btnFiltreEtoile.removeClass("checked");
      storage.removeItem(btnFiltreEtoile[0].id, "checked");
      btnFiltreEtoile4.removeClass("checked");
      storage.removeItem(btnFiltreEtoile4[0].id, "checked");
    }
    else{
      btnFiltreEtoile5.removeClass("checked");
      storage.removeItem(btnFiltreEtoile5[0].id, "checked");
    }
  })
  btnFiltreEtoile4.click(function(){
    var isChecked = btnFiltreEtoile4.hasClass("checked");
    if (!isChecked) {
      btnFiltreEtoile4.addClass("checked");
      storage.setItem(btnFiltreEtoile4[0].id, "checked");
      btnFiltreEtoile5.removeClass("checked");
      storage.removeItem(btnFiltreEtoile5[0].id, "checked");
      btnFiltreEtoile.removeClass("checked");
      storage.removeItem(btnFiltreEtoile[0].id, "checked");
    }
    else{
      btnFiltreEtoile4.removeClass("checked");
      storage.removeItem(btnFiltreEtoile4[0].id, "checked");
    }
  })
  //#endregion
  //#region Filtre Pyro
  let btnElements = $('#liste_personnages_filtres_element')
  let btnFiltrePyro = $('#liste_personnages_filtres_elements_feu');
  btnFiltrePyro.click(function(){
    var isChecked = btnFiltrePyro.hasClass("checked");
    if (!isChecked) {
      btnFiltrePyro.addClass("checked")
      storage.setItem(btnFiltrePyro[0].id, "checked");
      btnElements.removeClass("checked");
      storage.removeItem(btnElements[0].id, "checked");
    }
    else{
      btnFiltrePyro.removeClass("checked");
      storage.removeItem(btnFiltrePyro[0].id, "checked");
    }
  })
  //#endregion
});