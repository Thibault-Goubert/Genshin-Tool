const requestURLCharacters = 'https://api.genshin.dev/characters/';
const charactersCardsContainer = document.getElementById('liste_personnages_personnages');
const assetsRessourcesCharactersURL = "assets/icons/characters/char_";
const assetsRessourcesElementURL = "assets/icons/filters/element_";

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
            )
        );
    }
}
class CharactersList extends React.Component{
    render(){
        const isPyro = this.props.isPyro;
        const isCryo = this.props.isCryo;
        const isAnemo = this.props.isAnemo;
        const isGeo = this.props.isGeo;
        const isHydro = this.props.isHydro;
        const isElectro = this.props.isElectro;

        const charactersCards = [];
        this.props.characters.forEach((character)=>{
            if(isPyro && character.vision == "Pyro" 
            || isCryo && character.vision == "Cryo"
            || isAnemo && character.vision == "Anemo"
            || isGeo && character.vision == "Geo"
            || isHydro && character.vision == "Hydro"
            || isElectro && character.vision == "Electro"
            || (!isPyro && !isCryo && !isAnemo && !isGeo && !isHydro && !isElectro)
            ){           
                charactersCards.push(
                <CharacterCard
                    name={character.name}
                    rarity={character.rarity}
                    vision={character.vision}
                />) 
            }
        })
        return(<div id='liste_personnages_personnages' class='flex row'>{charactersCards}</div>)
    };
}
class Filters extends React.Component{
    constructor(props) {
      super(props);
      this.handleIsPyroChange = this.handleIsPyroChange.bind(this);
      this.handleIsCryoChange = this.handleIsCryoChange.bind(this);
      this.handleIsAnemoChange = this.handleIsAnemoChange.bind(this);
      this.handleIsGeoChange = this.handleIsGeoChange.bind(this);
      this.handleIsElectroChange = this.handleIsElectroChange.bind(this);
      this.handleIsHydroChange = this.handleIsHydroChange.bind(this);
    }    
    handleIsPyroChange(e) {
        this.props.onIsPyroChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsCryoChange(e) {
        this.props.onIsCryoChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsAnemoChange(e) {
        this.props.onIsAnemoChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsGeoChange(e) {
        this.props.onIsGeoChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsElectroChange(e) {
        this.props.onIsElectroChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsHydroChange(e) {
        this.props.onIsHydroChange(e.currentTarget.classList.contains('checked'));
    }
    render(){
        return(
            <div id="liste_personnages_filtres" class="flex row">
                <div id="liste_personnages_filtres_etoile" class="btn btn_filtre">
                    <img class="btn_filtre_image center" src='assets/icons/filters/etoile_icon_27.png'/>
                </div>
                <div id="liste_personnages_filtres_element_arme">
                    <div id="liste_personnages_filtres_element" class="btn btn_filtre_flat">
                        Elements
                    </div>
                    <div id="liste_personnages_filtres_arme" class="btn btn_filtre_flat">
                        Armes
                    </div>
                </div>
                <div id="liste_personnages_filtres_etoiles">
                    <div id="liste_personnages_filtres_etoiles_cinq" class="btn btn_filtre_flat flex row no_justify_left_padding">
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                    </div>
                    <div id="liste_personnages_filtres_etoiles_quatre" class="btn btn_filtre_flat flex row no_justify_left_padding">
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>					
                    </div>
                </div>
                <div id="liste_personnages_filtres_elements" class="flex row">
                    <div id="liste_personnages_filtres_elements_feu" class="btn btn_filtre" onClick={this.handleIsPyroChange} >
                        <img class="btn_filtre_image center" src="assets/icons/filters/element_pyro.png"/>
                    </div>
                    <div id="liste_personnages_filtres_elements_glace" class="btn btn_filtre" onClick={this.handleIsCryoChange} >
                        <img class="btn_filtre_image center" src="assets/icons/filters/element_cryo.png"/>
                    </div>
                    <div id="liste_personnages_filtres_elements_electro" class="btn btn_filtre" onClick={this.handleIsElectroChange} >
                        <img class="btn_filtre_image center" src="assets/icons/filters/element_electro.png"/>
                    </div>
                    <div id="liste_personnages_filtres_elements_eau" class="btn btn_filtre" onClick={this.handleIsHydroChange} >
                        <img class="btn_filtre_image center" src="assets/icons/filters/element_hydro.png"/>
                    </div>
                    <div id="liste_personnages_filtres_elements_anemo" class="btn btn_filtre" onClick={this.handleIsAnemoChange} >
                        <img class="btn_filtre_image center" src="assets/icons/filters/element_anemo.png"/>
                    </div>
                    <div id="liste_personnages_filtres_elements_geo" class="btn btn_filtre" onClick={this.handleIsGeoChange} >
                        <img class="btn_filtre_image center" src="assets/icons/filters/element_geo.png"/>
                    </div>	
                </div>
                <div id="liste_personnages_filtres_armes" class="flex row">
                    <div id="liste_personnages_filtres_armes_epee" class="btn btn_filtre">
                        <img class="btn_filtre_image center" src="assets/icons/filters/sword27.png"/>
                    </div>
                    <div id="liste_personnages_filtres_armes_arc" class="btn btn_filtre">
                        <img class="btn_filtre_image center" src="assets/icons/filters/bow27.png"/>
                    </div>
                    <div id="liste_personnages_filtres_armes_lance" class="btn btn_filtre">
                        <img class="btn_filtre_image center" src="assets/icons/filters/polearm27.png"/>
                    </div>
                    <div id="liste_personnages_filtres_armes_claymore" class="btn btn_filtre">
                        <img class="btn_filtre_image center" src="assets/icons/filters/claymore27.png"/>
                    </div>
                    <div id="liste_personnages_filtres_armes_catalyste" class="btn btn_filtre">
                        <img class="btn_filtre_image center" src="assets/icons/filters/catalyst27.png"/>
                    </div>
                </div>
            </div>            
        )
    }
}
class FilterableCharactersList extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        isPyro: false,
        isCryo: false,
        isAnemo: false,
        isHydro: false,
        isGeo: false,
        isElectro: false
      }
      this.handleIsPyroChange = this.handleIsPyroChange.bind(this);
      this.handleIsCryoChange = this.handleIsCryoChange.bind(this);
      this.handleIsAnemoChange = this.handleIsAnemoChange.bind(this);
      this.handleIsHydroChange = this.handleIsHydroChange.bind(this);
      this.handleIsGeoChange = this.handleIsGeoChange.bind(this);
      this.handleIsElectroChange = this.handleIsElectroChange.bind(this);
    }
    handleIsPyroChange(isPyro){
        this.setState({
            isPyro: isPyro
        })
    }
    handleIsCryoChange(isCryo){
        this.setState({
            isCryo: isCryo
        })
    }
    handleIsAnemoChange(isAnemo){
        this.setState({
            isAnemo: isAnemo
        })
    }
    handleIsHydroChange(isHydro){
        this.setState({
            isHydro: isHydro
        })
    }
    handleIsGeoChange(isGeo){
        this.setState({
            isGeo: isGeo
        })
    }
    handleIsElectroChange(isElectro){
        this.setState({
            isElectro: isElectro
        })
    }
    render(){
        return(
            <div>
                <Filters
                    isPyro={this.state.isPyro}
                    isCryo={this.state.isCryo}
                    isAnemo={this.state.isAnemo}
                    isHydro={this.state.isHydro}
                    isGeo={this.state.isGeo}
                    isElectro={this.state.isElectro}

                    onIsPyroChange={this.handleIsPyroChange}
                    onIsCryoChange={this.handleIsCryoChange}
                    onIsAnemoChange={this.handleIsAnemoChange}
                    onIsHydroChange={this.handleIsHydroChange}
                    onIsGeoChange={this.handleIsGeoChange}
                    onIsElectroChange={this.handleIsElectroChange}
                />
                <CharactersList 
                    characters={this.props.characters}
                    isPyro={this.state.isPyro}
                    isCryo={this.state.isCryo}
                    isAnemo={this.state.isAnemo}
                    isHydro={this.state.isHydro}
                    isGeo={this.state.isGeo}
                    isElectro={this.state.isElectro}
                />
            </div>
        )
    }
}
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
ReactDOM.render(
    <FilterableCharactersList characters={characters.Characters}/>,  
    document.getElementById('liste_personnages')
);
//#region Filtre Elements
let btnElements = $('#liste_personnages_filtres_element')
let btnFiltrePyro = $('#liste_personnages_filtres_elements_feu');
let btnFiltreCryo = $('#liste_personnages_filtres_elements_glace');
let btnFiltreElectro = $('#liste_personnages_filtres_elements_electro');
let btnFiltreHydro = $('#liste_personnages_filtres_elements_eau');
let btnFiltreGeo = $('#liste_personnages_filtres_elements_geo');
let btnFiltreAnemo = $('#liste_personnages_filtres_elements_anemo');

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
btnFiltreCryo.click(function(){
    var isChecked = btnFiltreCryo.hasClass("checked");
    if (!isChecked) {
        btnFiltreCryo.addClass("checked")
        storage.setItem(btnFiltreCryo[0].id, "checked");
        btnElements.removeClass("checked");
        storage.removeItem(btnElements[0].id, "checked");
    }
    else{
        btnFiltreCryo.removeClass("checked");
        storage.removeItem(btnFiltreCryo[0].id, "checked");
    }
})
btnFiltreElectro.click(function(){
    var isChecked = btnFiltreElectro.hasClass("checked");
    if (!isChecked) {
        btnFiltreElectro.addClass("checked")
        storage.setItem(btnFiltreElectro[0].id, "checked");
        btnElements.removeClass("checked");
        storage.removeItem(btnElements[0].id, "checked");
    }
    else{
        btnFiltreElectro.removeClass("checked");
        storage.removeItem(btnFiltreElectro[0].id, "checked");
    }
})
btnFiltreHydro.click(function(){
    var isChecked = btnFiltreHydro.hasClass("checked");
    if (!isChecked) {
        btnFiltreHydro.addClass("checked")
        storage.setItem(btnFiltreHydro[0].id, "checked");
        btnElements.removeClass("checked");
        storage.removeItem(btnElements[0].id, "checked");
    }
    else{
        btnFiltreHydro.removeClass("checked");
        storage.removeItem(btnFiltreHydro[0].id, "checked");
    }
})
btnFiltreGeo.click(function(){
    var isChecked = btnFiltreGeo.hasClass("checked");
    if (!isChecked) {
        btnFiltreGeo.addClass("checked")
        storage.setItem(btnFiltreGeo[0].id, "checked");
        btnElements.removeClass("checked");
        storage.removeItem(btnElements[0].id, "checked");
    }
    else{
        btnFiltreGeo.removeClass("checked");
        storage.removeItem(btnFiltreGeo[0].id, "checked");
    }
})
btnFiltreAnemo.click(function(){
    var isChecked = btnFiltreAnemo.hasClass("checked");
    if (!isChecked) {
        btnFiltreAnemo.addClass("checked")
        storage.setItem(btnFiltreAnemo[0].id, "checked");
        btnElements.removeClass("checked");
        storage.removeItem(btnElements[0].id, "checked");
    }
    else{
        btnFiltreAnemo.removeClass("checked");
        storage.removeItem(btnFiltreAnemo[0].id, "checked");
    }
})
//#endregion
