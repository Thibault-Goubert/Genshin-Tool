const requestURLCharacters = 'https://api.genshin.dev/characters/';
const charactersCardsContainer = document.getElementById('reactContainer_liste_personnages_personnages');
const assetsRessourcesCharactersURL = "assets/icons/characters/char_";
const assetsRessourcesElementURL = "assets/icons/filters/element_";

const findCharacters = false;
var characters = {characters: []};
if(findCharacters){
  var charactersNames = (function () {
      var json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': requestURLCharacters,
        'dataType': "json",
        'success': function (data) {
          json = data;
        }
      });
      return json;
  })();
  $.each(charactersNames, function (idx, name) {
      console.log(name, idx);
      var character = (function () {
          var json = null;
          $.ajax({
            'async': false,
            'global': false,
            'url': requestURLCharacters+name,
            'dataType': "json",
            'success': function (data) {
              json = data;
            }
          });
          return json;
      })();
      characters['characters'].push(character);
  });
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
      <div id='liste_personnages_personnages' class='flex row'>{charactersCards}</div>
    )
  };
}

class FilterableCharactersList extends React.Component{
  render(){
    return(
      <CharactersList characters={this.props.characters}/>
    )
  };
}

ReactDOM.render(
  <FilterableCharactersList characters={characters.characters}/>,  
  charactersCardsContainer
);