const requestURLCharacters = 'https://api.genshin.dev/characters/';
const charactersCardsContainer = document.getElementById('liste_personnages_personnages');
const assetsRessourcesCharactersURL = "assets/icons/characters/char_";
const assetsRessourcesElementURL = "assets/icons/filters/element_";

class WeaponCard extends React.Component{
    render(){
        return(
            React.createElement('div', {className:'weapon_panel'},
                React.createElement('img', {className:'weapon_panel_icon center', src:this.props.weaponIconSrc})
            )
        );
    }
}

class CharacterCard extends React.Component{
    render(){
        //#region Variables
        var isTraveler = this.props.name=="Traveler";

        var characterNameNoSpace = isTraveler ? "aether" : this.props.name.replace(' ', '_');
            
        const IDBase = "liste_personnages_personnage_";
        const IDMainContainer = IDBase+characterNameNoSpace;
        const IDPortraitContent = IDBase+characterNameNoSpace+"_portrait";
        const IDPortraitName = IDBase+characterNameNoSpace+"_name";
    
        const srcBackgroundCase = "assets/icons/characters/case"+this.props.rarity+"nat.png";
        const srcPortrait = assetsRessourcesCharactersURL+characterNameNoSpace+".png";
        const srcVision = assetsRessourcesElementURL+this.props.vision+".png";

        var cardVision;
        var displayCharacterName = displayCharacterName = this.props.name;
        //#endregion

        //#region Manage Display Traveler        
        if(!isTraveler || this.props.displayTravelerVision) {
            cardVision = React.createElement('img', {className:'personnage_panel_element', src:srcVision});
        }
        //#endregion

        var card = 
        React.createElement('div', {className:'personnage_panel', id:IDMainContainer},
            React.createElement('div', {className:'personnage_panel_portrait_content', id:IDPortraitContent},
                React.createElement('img', {className:'personnage_panel_background', src:srcBackgroundCase}),
                React.createElement('img', {className:'personnage_panel_portrait', src:srcPortrait}),
                cardVision        
            ),
            React.createElement('div', {className:'personnage_panel_name', id:IDPortraitName}, displayCharacterName)
        )
        return(
            card
        );
    }
}
class CharactersList extends React.Component{
    render(){
        //#region Variables Elements
        const isElements = this.props.isElements;
        const isPyro = this.props.isPyro;
        const isCryo = this.props.isCryo;
        const isAnemo = this.props.isAnemo;
        const isGeo = this.props.isGeo;
        const isHydro = this.props.isHydro;
        const isElectro = this.props.isElectro;
        //#endregion
        //#region Variables Armes
        const isArmes = this.props.isArmes;
        const isEpee = this.props.isEpee;
        const isArc = this.props.isArc;
        const isLance = this.props.isLance;
        const isClaymore = this.props.isClaymore;
        const isCatalyste = this.props.isCatalyste;
        //#endregion
        //#region Rarity
        var charactersSortedByRarity = []
        const isRarity = this.props.isRarity;
        const isRarityCinq = this.props.isRarityCinq;
        const isRarityQuatre = this.props.isRarityQuatre;
        //#endregion
        
        var charactersCards = [];
        var isSortedByWeapons = (isEpee || isArc || isLance || isClaymore || isCatalyste || isArmes);
        var isSortedByElements = (isPyro || isCryo || isElectro || isHydro || isAnemo || isGeo || isElements);
        var isSortedByRarity = (isRarity || isRarityCinq || isRarityQuatre);
        var isFiltered = (isSortedByElements || isSortedByWeapons || isSortedByRarity);
        var displayTravelerVision = !(!isFiltered || !isSortedByElements || (isEpee || isArmes && ((isAnemo && isGeo) || isElements)))
               
        console.log("display:",displayTravelerVision)
        console.log("isAnemo:",isAnemo)
        console.log("isGeo:",isGeo)

        //#region FilterUnique
        if(!displayTravelerVision){
            this.props.characters = this.props.characters.filter(onlyUnique);
        }
        if(!displayTravelerVision && !isAnemo && isGeo){
            this.props.characters.find(c => c.name == "Traveler").vision = "Geo";
            displayTravelerVision = true;
        }
        //#endregion

        if(isSortedByRarity && !isSortedByWeapons && !isSortedByElements){
            console.log(charactersSortedByRarity)
            if(isRarityCinq || isRarity){
                var charactersRarityCinqRow = [];
                filterCharacterListByRarity(this.props.characters, 5).forEach((character) => {
                    charactersRarityCinqRow.push(
                        <CharacterCard
                            name={character.name}
                            rarity={character.rarity}
                            vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                            displayTravelerVision={displayTravelerVision}
                        />) 
                })
                charactersCards.push(<div class='flex row limitCardsNumberByRow'>{charactersRarityCinqRow}</div>)   
            }
            if(isRarityQuatre || isRarity){
                var charactersRarityQuatreRow = [];
                filterCharacterListByRarity(this.props.characters, 4).forEach((character) => {
                    charactersRarityQuatreRow.push(
                        <CharacterCard
                            name={character.name}
                            rarity={character.rarity}
                            vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                            displayTravelerVision={displayTravelerVision}
                        />) 
                })    
                charactersCards.push(<div class='flex row limitCardsNumberByRow'>{charactersRarityQuatreRow}</div>)        
            }
            return(<div id='liste_personnages_personnages' class='flex row limitCardsNumberByRow'>{charactersCards}</div>)
        }
        
        //#region FilterByRarity
        if(isRarityCinq || isRarity){
            filterCharacterListByRarity(this.props.characters, 5).forEach((character) => {
                charactersSortedByRarity.push(character)
            })
        }
        if(isRarityQuatre || isRarity){
            filterCharacterListByRarity(this.props.characters, 4).forEach((character) => {
                charactersSortedByRarity.push(character)
            })           
        }
        if(isSortedByRarity){
            this.props.characters = charactersSortedByRarity;
        }
        //#endregion
        
        if(isSortedByWeapons){
            console.log(this.props.characters)
            if(isEpee || isArmes){
                console.log("Arme Epee")  
                var charactersFilterByWeapon = filterCharacterListByWeapon(this.props.characters, "Sword");
                var rowCharacterWeapon = [];
                rowCharacterWeapon.push(
                    <WeaponCard
                        weaponType = "sword"
                        weaponIconSrc = "assets/icons/filters/sword50.png"
                    />
                )
                if(isPyro || isElements){
                    console.log("weapon element Pyro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Pyro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isCryo || isElements){
                    console.log("weapon element Cryo")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Cryo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isElectro || isElements){
                    console.log("weapon element Electro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Electro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isHydro || isElements){
                    console.log("weapon element Hydro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Hydro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isAnemo || isElements){
                    console.log("weapon element Anemo")
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Anemo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isGeo || isElements){
                    console.log("weapon element Geo")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Geo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                else if(!isSortedByElements){
                    charactersFilterByWeapon.forEach((character)=>{
                        rowCharacterWeapon.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                            />) 
                }) 
                }
                charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
            }
            if(isArc || isArmes){
                console.log("Arme Arc")  
                var charactersFilterByWeapon = filterCharacterListByWeapon(this.props.characters, "Bow");
                var rowCharacterWeapon = [];
                rowCharacterWeapon.push(
                    <WeaponCard
                        weaponType = "bow"
                        weaponIconSrc = "assets/icons/filters/bow50.png"
                    />
                )
                if(isPyro || isElements){
                    console.log("weapon element Pyro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Pyro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isCryo || isElements){
                    console.log("weapon element Cryo")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Cryo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isElectro || isElements){
                    console.log("weapon element Electro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Electro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isHydro || isElements){
                    console.log("weapon element Hydro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Hydro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isAnemo || isElements){
                    console.log("weapon element Anemo")
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Anemo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isGeo || isElements){
                    console.log("weapon element Geo")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Geo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                else if(!isSortedByElements){
                    charactersFilterByWeapon.forEach((character)=>{
                        rowCharacterWeapon.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                displayTravelerVision={displayTravelerVision}
                            />) 
                }) 
                }
                charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
            }
            if(isLance || isArmes){
                console.log("Arme Lance")
                var charactersFilterByWeapon = filterCharacterListByWeapon(this.props.characters, "Polearm");
                var rowCharacterWeapon = [];
                rowCharacterWeapon.push(
                    <WeaponCard
                        weaponType = "polearm"
                        weaponIconSrc = "assets/icons/filters/polearm50.png"
                    />
                )
                if(isPyro || isElements){
                    console.log("weapon element Pyro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Pyro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isCryo || isElements){
                    console.log("weapon element Cryo")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Cryo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isElectro || isElements){
                    console.log("weapon element Electro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Electro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isHydro || isElements){
                    console.log("weapon element Hydro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Hydro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isAnemo || isElements){
                    console.log("weapon element Anemo")
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Anemo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isGeo || isElements){
                    console.log("weapon element Geo")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Geo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                else if(!isSortedByElements){
                    charactersFilterByWeapon.forEach((character)=>{
                        rowCharacterWeapon.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                displayTravelerVision={displayTravelerVision}
                            />) 
                }) 
                }
                charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
            }
            if(isClaymore || isArmes){
                console.log("Arme Claymore") 
                var charactersFilterByWeapon = filterCharacterListByWeapon(this.props.characters, "Claymore");
                var rowCharacterWeapon = [];
                rowCharacterWeapon.push(
                    <WeaponCard
                        weaponType = "claymore"
                        weaponIconSrc = "assets/icons/filters/claymore50.png"
                    />
                )
                if(isPyro || isElements){
                    console.log("weapon element Pyro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Pyro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isCryo || isElements){
                    console.log("weapon element Cryo")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Cryo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isElectro || isElements){
                    console.log("weapon element Electro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Electro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isHydro || isElements){
                    console.log("weapon element Hydro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Hydro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isAnemo || isElements){
                    console.log("weapon element Anemo")
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Anemo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isGeo || isElements){
                    console.log("weapon element Geo")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Geo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                else if(!isSortedByElements){
                    charactersFilterByWeapon.forEach((character)=>{
                        rowCharacterWeapon.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                displayTravelerVision={displayTravelerVision}
                            />) 
                }) 
                }
                charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
            }
            if(isCatalyste || isArmes){
                console.log("Arme Catalyste") 
                var charactersFilterByWeapon = filterCharacterListByWeapon(this.props.characters, "Catalyst");
                var rowCharacterWeapon = [];
                rowCharacterWeapon.push(
                    <WeaponCard
                        weaponType = "catalyst"
                        weaponIconSrc = "assets/icons/filters/catalyst50.png"
                    />
                )
                if(isPyro || isElements){
                    console.log("weapon element Pyro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Pyro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isCryo || isElements){
                    console.log("weapon element Cryo")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Cryo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isElectro || isElements){
                    console.log("weapon element Electro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Electro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isHydro || isElements){
                    console.log("weapon element Hydro")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Hydro'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isAnemo || isElements){
                    console.log("weapon element Anemo")
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Anemo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                if(isGeo || isElements){
                    console.log("weapon element Geo")  
                    charactersFilterByWeapon.forEach((character)=>{
                        if(character.vision == 'Geo'){
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                />) 
                        }
                    }) 
                }
                else if(!isSortedByElements){
                    charactersFilterByWeapon.forEach((character)=>{
                        rowCharacterWeapon.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                displayTravelerVision={displayTravelerVision}
                            />) 
                }) 
                }
                charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
            }
        }
        else if(!isSortedByWeapons && isSortedByElements){
            if(isPyro || isElements){
                console.log("Element Pyro")  
                var pyroCharacter = []
                this.props.characters.forEach((character)=>{
                    if(character.vision == 'Pyro'){
                        pyroCharacter.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                displayTravelerVision={displayTravelerVision}
                            />) 
                    }
                }) 
                charactersCards.push(<div class='flex row'>{pyroCharacter}</div>)
            }
            if(isCryo || isElements){
                console.log("Element Cryo")
                var cryoCharacter = []          
                this.props.characters.forEach((character)=>{
                    if(character.vision == 'Cryo'){
                        cryoCharacter.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                displayTravelerVision={displayTravelerVision}
                            />) 
                    }
                }) 
                charactersCards.push(<div class='flex row'>{cryoCharacter}</div>) 
            }
            if(isElectro || isElements){
                console.log("Element Electro")
                var electroCharacter = []          
                this.props.characters.forEach((character)=>{
                    if(character.vision == 'Electro'){
                        electroCharacter.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                displayTravelerVision={displayTravelerVision}
                            />) 
                    }
                }) 
                charactersCards.push(<div class='flex row'>{electroCharacter}</div>)
            }
            if(isHydro || isElements){
                console.log("Element Hydro") 
                var hydroCharacter = []          
                this.props.characters.forEach((character)=>{
                    if(character.vision == 'Hydro'){
                        hydroCharacter.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                displayTravelerVision={displayTravelerVision}
                            />) 
                    }
                }) 
                charactersCards.push(<div class='flex row'>{hydroCharacter}</div>) 
            }
            if(isAnemo || isElements){
                console.log("Element Anemo")
                var anemoCharacter = []          
                this.props.characters.forEach((character)=>{
                    if(character.vision == 'Anemo'){
                        anemoCharacter.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                displayTravelerVision={displayTravelerVision}
                            />) 
                    }
                }) 
                charactersCards.push(<div class='flex row'>{anemoCharacter}</div>) 
            }
            if(isGeo || isElements){
                console.log("Element Geo")
                var geoCharacter = []          
                this.props.characters.forEach((character)=>{
                    if(character.vision == 'Geo'){
                        geoCharacter.push(
                            <CharacterCard
                                name={character.name  }
                                rarity={character.rarity}
                                vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                                displayTravelerVision={displayTravelerVision}
                            />) 
                    }
                }) 
                charactersCards.push(<div class='flex row'>{geoCharacter}</div>)
            }
        }
        else{
            if(!isFiltered){
                console.log("Not filtered") 
                this.props.characters.filter(onlyUnique).forEach((character)=>{
                    charactersCards.push(
                    <CharacterCard
                        name={character.name}
                        rarity={character.rarity}
                        vision={character.vision}
                                    displayTravelerVision={displayTravelerVision}
                        displayTravelerVision={displayTravelerVision}
                    />) 
                })
                return(<div id='liste_personnages_personnages' class='flex row limitCardsNumberByRow'>{charactersCards}</div>)    
            }
        }
        
        return(<div id='liste_personnages_personnages' class='flex row flexDirectionColumn'>{charactersCards}</div>)
    };
}
function filterCharacterListByVision(characterList, vision){
    return characterList.filter(character => character.vision == vision)
}
function filterCharacterListByWeapon(characterList, weapon){
    return characterList.filter(character => character.weapon == weapon)
}
function filterCharacterListByRarity(characterList, rarity){
    return characterList.filter(character => character.rarity == rarity)
} 
function onlyUnique(value, index, self) {
    return self.map(function(o) { return o.name; }).indexOf(value.name) === index;
}
  
class Filters extends React.Component{
    constructor(props) {
      super(props);
      //#region Elements
      this.handleIsPyroChange = this.handleIsPyroChange.bind(this);
      this.handleIsCryoChange = this.handleIsCryoChange.bind(this);
      this.handleIsAnemoChange = this.handleIsAnemoChange.bind(this);
      this.handleIsGeoChange = this.handleIsGeoChange.bind(this);
      this.handleIsElectroChange = this.handleIsElectroChange.bind(this);
      this.handleIsHydroChange = this.handleIsHydroChange.bind(this);
      this.handleIsElementsChange = this.handleIsElementsChange.bind(this);
      //#endregion
      //#region Armes
      this.handleIsArmesChange = this.handleIsArmesChange.bind(this);
      this.handleIsEpeeChange = this.handleIsEpeeChange.bind(this);
      this.handleIsArcChange = this.handleIsArcChange.bind(this);
      this.handleIsLanceChange = this.handleIsLanceChange.bind(this);
      this.handleIsClaymoreChange = this.handleIsClaymoreChange.bind(this);
      this.handleIsCatalysteChange = this.handleIsCatalysteChange.bind(this);
      //#endregion
      //#region Rarity
      this.handleIsRarityChange = this.handleIsRarityChange.bind(this);
      this.handleIsRarityCinqChange = this.handleIsRarityCinqChange.bind(this);
      this.handleIsRarityQuatreChange = this.handleIsRarityQuatreChange.bind(this);
      //#endregion
    }
    //#region Handlers Elements 
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
    handleIsElementsChange(e){
        this.props.onIsElementsChange(e.currentTarget.classList.contains('checked'));
    }
    //#endregion
    //#region Handlers Armes
    handleIsArmesChange(e) {
        this.props.onIsArmesChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsEpeeChange(e) {
        this.props.onIsEpeeChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsArcChange(e) {
        this.props.onIsArcChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsLanceChange(e){
        this.props.onIsLanceChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsClaymoreChange(e) {
        this.props.onIsClaymoreChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsCatalysteChange(e) {
        this.props.onIsCatalysteChange(e.currentTarget.classList.contains('checked'));
    }
    //#endregion
    //#region Handlers Rarity
    handleIsRarityChange(e){
        this.props.onIsRarity(e.currentTarget.classList.contains('checked'));
    }
    handleIsRarityCinqChange(e) {
        this.props.onIsRarityCinq(e.currentTarget.classList.contains('checked'));
    }
    handleIsRarityQuatreChange(e) {
        this.props.onIsRarityQuatre(e.currentTarget.classList.contains('checked'));
    }
    //#endregion
    render(){
        return(
            <div id="liste_personnages_filtres" class="flex row">
                <div id="liste_personnages_filtres_etoile" class="btn btn_filtre" onClick={this.handleIsRarityChange} >
                    <img class="btn_filtre_image center" src='assets/icons/filters/etoile_icon_27.png'/>
                </div>
                <div id="liste_personnages_filtres_element_arme">
                    <div id="liste_personnages_filtres_element" class="btn btn_filtre_flat" onClick={this.handleIsElementsChange} >
                        Elements
                    </div>
                    <div id="liste_personnages_filtres_arme" class="btn btn_filtre_flat" onClick={this.handleIsArmesChange} >
                        Armes
                    </div>
                </div>
                
                <div id="liste_personnages_filtres_etoiles">
                    <div id="liste_personnages_filtres_etoiles_cinq" class="btn btn_filtre_flat flex row no_justify_left_padding" onClick={this.handleIsRarityCinqChange} >
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png"/>
                    </div>
                    <div id="liste_personnages_filtres_etoiles_quatre" class="btn btn_filtre_flat flex row no_justify_left_padding" onClick={this.handleIsRarityQuatreChange} >
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
                    <div id="liste_personnages_filtres_armes_epee" class="btn btn_filtre" onClick={this.handleIsEpeeChange} >
                        <img class="btn_filtre_image center" src="assets/icons/filters/sword27.png"/>
                    </div>
                    <div id="liste_personnages_filtres_armes_arc" class="btn btn_filtre" onClick={this.handleIsArcChange} >
                        <img class="btn_filtre_image center" src="assets/icons/filters/bow27.png"/>
                    </div>
                    <div id="liste_personnages_filtres_armes_lance" class="btn btn_filtre" onClick={this.handleIsLanceChange} >
                        <img class="btn_filtre_image center" src="assets/icons/filters/polearm27.png"/>
                    </div>
                    <div id="liste_personnages_filtres_armes_claymore" class="btn btn_filtre" onClick={this.handleIsClaymoreChange} >
                        <img class="btn_filtre_image center" src="assets/icons/filters/claymore27.png"/>
                    </div>
                    <div id="liste_personnages_filtres_armes_catalyste" class="btn btn_filtre" onClick={this.handleIsCatalysteChange} >
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
        //#region Elements
        isPyro: false,
        isCryo: false,
        isAnemo: false,
        isHydro: false,
        isGeo: false,
        isElectro: false,
        isElements: false,
        //#endregion
        //#region Armes
        isEpee: false,
        isArc: false,
        isLance: false,
        isClaymore: false,
        isCatalyste: false,
        isArmes: false,
        //#endregion
        //#region Rarity
        isRarity: false,
        isRarityCinq: false,
        isRarityQuatre: false
        //#endregion
      }
      //#region Bind Elements
      this.handleIsPyroChange = this.handleIsPyroChange.bind(this);
      this.handleIsCryoChange = this.handleIsCryoChange.bind(this);
      this.handleIsAnemoChange = this.handleIsAnemoChange.bind(this);
      this.handleIsHydroChange = this.handleIsHydroChange.bind(this);
      this.handleIsGeoChange = this.handleIsGeoChange.bind(this);
      this.handleIsElectroChange = this.handleIsElectroChange.bind(this);
      this.handleIsElementsChange = this.handleIsElementsChange.bind(this);
      //#endregion
      //#region Bind Armes
      this.handleIsArmesChange = this.handleIsArmesChange.bind(this);
      this.handleIsEpeeChange = this.handleIsEpeeChange.bind(this);
      this.handleIsArcChange = this.handleIsArcChange.bind(this);
      this.handleIsLanceChange = this.handleIsLanceChange.bind(this);
      this.handleIsClaymoreChange = this.handleIsClaymoreChange.bind(this);
      this.handleIsCatalysteChange = this.handleIsCatalysteChange.bind(this);
      //#endregion
      //#region Bind Rarity
      this.handleIsRarityChange = this.handleIsRarityChange.bind(this);
      this.handleIsRarityCinqChange = this.handleIsRarityCinqChange.bind(this);
      this.handleIsRarityQuatreChange = this.handleIsRarityQuatreChange.bind(this);
      //#endregion
    }
    //#region Handlers Elements
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
    handleIsElementsChange(isElements){
        this.setState({
            isElements: isElements
        })
    }
    //#endregion
    //#region Handlers Armes
    handleIsArmesChange(isArmes){
        this.setState({
            isArmes: isArmes
        })
    }
    handleIsEpeeChange(isEpee){
        this.setState({
            isEpee: isEpee
        })
    }
    handleIsArcChange(isArc){
        this.setState({
            isArc: isArc
        })
    }
    handleIsLanceChange(isLance){
        this.setState({
            isLance: isLance
        })
    }
    handleIsClaymoreChange(isClaymore){
        this.setState({
            isClaymore: isClaymore
        })
    }
    handleIsCatalysteChange(isCatalyste){
        this.setState({
            isCatalyste: isCatalyste
        })
    }
    //#endregion    
    //#region Handlers Rarity
    handleIsRarityChange(isRarity){
        this.setState({
            isRarity: isRarity
        })
    }
    handleIsRarityCinqChange(isRarityCinq){
        this.setState({
            isRarityCinq: isRarityCinq
        })
    }
    handleIsRarityQuatreChange(isRarityQuatre){
        this.setState({
            isRarityQuatre: isRarityQuatre
        })
    }
    //#endregion
    render(){
        return(
            <div>
                <Filters
                    //#region Elements
                    isElements={this.state.isElements}
                    isPyro={this.state.isPyro}
                    isCryo={this.state.isCryo}
                    isAnemo={this.state.isAnemo}
                    isHydro={this.state.isHydro}
                    isGeo={this.state.isGeo}
                    isElectro={this.state.isElectro}

                    onIsElementsChange={this.handleIsElementsChange}
                    onIsPyroChange={this.handleIsPyroChange}
                    onIsCryoChange={this.handleIsCryoChange}
                    onIsAnemoChange={this.handleIsAnemoChange}
                    onIsHydroChange={this.handleIsHydroChange}
                    onIsGeoChange={this.handleIsGeoChange}
                    onIsElectroChange={this.handleIsElectroChange}
                    //#endregion
                    //#region Armes
                    isEpee={this.state.isEpee}
                    isArc={this.state.isArc}
                    isLance={this.state.isLance}
                    isClaymore={this.state.isClaymore}
                    isCatalyste={this.state.isCatalyste}
                    isArmes={this.state.isArmes}

                    onIsArmesChange={this.handleIsArmesChange}
                    onIsEpeeChange={this.handleIsEpeeChange}
                    onIsArcChange={this.handleIsArcChange}
                    onIsLanceChange={this.handleIsLanceChange}
                    onIsClaymoreChange={this.handleIsClaymoreChange}
                    onIsCatalysteChange={this.handleIsCatalysteChange}
                    //#endregion
                    //#region Rarity
                    isRarity={this.state.isRarity}
                    isRarityCinq={this.state.isRarityCinq}
                    isRarityQuatre={this.state.isRarityQuatre}

                    onIsRarity={this.handleIsRarityChange}
                    onIsRarityCinq={this.handleIsRarityCinqChange}
                    onIsRarityQuatre={this.handleIsRarityQuatreChange}
                    //#endregion
                />
                <CharactersList 
                    characters={this.props.characters}
                    //#region Elements
                    isElements={this.state.isElements}
                    isPyro={this.state.isPyro}
                    isCryo={this.state.isCryo}
                    isAnemo={this.state.isAnemo}
                    isHydro={this.state.isHydro}
                    isGeo={this.state.isGeo}
                    isElectro={this.state.isElectro}
                    //#endregion
                    //#region Armes
                    isEpee={this.state.isEpee}
                    isArc={this.state.isArc}
                    isLance={this.state.isLance}
                    isClaymore={this.state.isClaymore}
                    isCatalyste={this.state.isCatalyste}
                    isArmes={this.state.isArmes}
                    //#endregion
                    //#region Rarity
                    isRarity={this.state.isRarity}
                    isRarityCinq={this.state.isRarityCinq}
                    isRarityQuatre={this.state.isRarityQuatre}
                    //#endregion
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

//#region Variables 
//#region Elements
let btnElements         = $('#liste_personnages_filtres_element')
let btnFiltrePyro       = $('#liste_personnages_filtres_elements_feu');
let btnFiltreCryo       = $('#liste_personnages_filtres_elements_glace');
let btnFiltreElectro    = $('#liste_personnages_filtres_elements_electro');
let btnFiltreHydro      = $('#liste_personnages_filtres_elements_eau');
let btnFiltreAnemo      = $('#liste_personnages_filtres_elements_anemo');
let btnFiltreGeo        = $('#liste_personnages_filtres_elements_geo');
//#endregion
//#region Armes
let btnFiltreArmes      = $('#liste_personnages_filtres_arme');
let btnFiltreEpee       = $('#liste_personnages_filtres_armes_epee');
let btnFiltreArc        = $('#liste_personnages_filtres_armes_arc');
let btnFiltreLance      = $('#liste_personnages_filtres_armes_lance');
let btnFiltreClaymore   = $('#liste_personnages_filtres_armes_claymore');
let btnFiltreCatalyste  = $('#liste_personnages_filtres_armes_catalyste');
//#endregion
//#region Rarity
let btnFiltreEtoile         = $('#liste_personnages_filtres_etoile');
let btnFiltreEtoilesCinq    = $('#liste_personnages_filtres_etoiles_cinq');
let btnFiltreEtoilesQuatre  = $('#liste_personnages_filtres_etoiles_quatre');
//#endregion
//#endregion

//#region Filtre Elements
btnElements.click(function(){      
    var isChecked = btnElements.hasClass("checked");    
    if(!isChecked){
        var isPyroChecked = btnFiltrePyro.hasClass("checked");
        var isCryoChecked = btnFiltreCryo.hasClass("checked");
        var isElectroChecked = btnFiltreElectro.hasClass("checked");
        var isHydroChecked = btnFiltreHydro.hasClass("checked");
        var isAnemoChecked = btnFiltreAnemo.hasClass("checked");
        var isGeoChecked = btnFiltreGeo.hasClass("checked");
    
        if(isPyroChecked)btnFiltrePyro.click();
        if(isCryoChecked)btnFiltreCryo.click();
        if(isElectroChecked)btnFiltreElectro.click();
        if(isHydroChecked)btnFiltreHydro.click();
        if(isAnemoChecked)btnFiltreAnemo.click();
        if(isGeoChecked)btnFiltreGeo.click();
        
        btnElements.addClass("checked")
        storage.setItem(btnElements[0].id, "checked");
    }
    else{
        btnElements.removeClass("checked")
        storage.removeItem(btnElements[0].id, "checked");
    }
})
btnFiltrePyro.click(function(){
    var isChecked = btnFiltrePyro.hasClass("checked");
    if (!isChecked) {
        btnFiltrePyro.addClass("checked")
        storage.setItem(btnFiltrePyro[0].id, "checked");
        if(btnElements.hasClass("checked")) btnElements.click();
    }
    else{
        btnFiltrePyro.removeClass("checked");
        storage.removeItem(btnFiltrePyro[0].id, "checked");
    }
    manageElementsFilters();
})
btnFiltreCryo.click(function(){
    var isChecked = btnFiltreCryo.hasClass("checked");
    if (!isChecked) {
        btnFiltreCryo.addClass("checked")
        storage.setItem(btnFiltreCryo[0].id, "checked");
        if(btnElements.hasClass("checked")) btnElements.click();
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
        if(btnElements.hasClass("checked")) btnElements.click();
    }
    else{
        btnFiltreElectro.removeClass("checked");
        storage.removeItem(btnFiltreElectro[0].id, "checked");
    }
    manageElementsFilters();
})
btnFiltreHydro.click(function(){
    var isChecked = btnFiltreHydro.hasClass("checked");
    if (!isChecked) {
        btnFiltreHydro.addClass("checked")
        storage.setItem(btnFiltreHydro[0].id, "checked");
        if(btnElements.hasClass("checked")) btnElements.click();
    }
    else{
        btnFiltreHydro.removeClass("checked");
        storage.removeItem(btnFiltreHydro[0].id, "checked");
    }
    manageElementsFilters();
})
btnFiltreGeo.click(function(){
    var isChecked = btnFiltreGeo.hasClass("checked");
    if (!isChecked) {
        btnFiltreGeo.addClass("checked")
        storage.setItem(btnFiltreGeo[0].id, "checked");
        if(btnElements.hasClass("checked")) btnElements.click();
    }
    else{
        btnFiltreGeo.removeClass("checked");
        storage.removeItem(btnFiltreGeo[0].id, "checked");
    }
    manageElementsFilters();
})
btnFiltreAnemo.click(function(){
    var isChecked = btnFiltreAnemo.hasClass("checked");
    if (!isChecked) {
        btnFiltreAnemo.addClass("checked")
        storage.setItem(btnFiltreAnemo[0].id, "checked");
        if(btnElements.hasClass("checked")) btnElements.click();
    }
    else{
        btnFiltreAnemo.removeClass("checked");
        storage.removeItem(btnFiltreAnemo[0].id, "checked");
    }
    manageElementsFilters();
})
function manageElementsFilters(){
    var isPyroChecked = btnFiltrePyro.hasClass("checked");
    var isCryoChecked = btnFiltreCryo.hasClass("checked");
    var isElectroChecked = btnFiltreElectro.hasClass("checked");
    var isHydroChecked = btnFiltreHydro.hasClass("checked");
    var isAnemoChecked = btnFiltreAnemo.hasClass("checked");
    var isGeoChecked = btnFiltreGeo.hasClass("checked");

    if( isPyroChecked && isCryoChecked && isElectroChecked && 
        isHydroChecked && isAnemoChecked && isGeoChecked )
        {
            btnFiltrePyro.click();
            btnFiltreCryo.click();
            btnFiltreElectro.click();
            btnFiltreHydro.click();
            btnFiltreAnemo.click();
            btnFiltreGeo.click();
            btnElements.click();
        }        
    
}
//#endregion
//#region Filtre Armes
btnFiltreArmes.click(function(){     
    var isChecked = btnFiltreArmes.hasClass("checked");    
    if(!isChecked){
        var isEpeeChecked = btnFiltreEpee.hasClass("checked");
        var isArcChecked = btnFiltreArc.hasClass("checked");
        var isLanceChecked = btnFiltreLance.hasClass("checked");
        var isClaymoreChecked = btnFiltreClaymore.hasClass("checked");
        var isCatalysteChecked = btnFiltreCatalyste.hasClass("checked");
    
        if(isEpeeChecked) btnFiltreEpee.click();
        if(isArcChecked) btnFiltreArc.click();
        if(isLanceChecked) btnFiltreLance.click();
        if(isClaymoreChecked) btnFiltreClaymore.click();
        if(isCatalysteChecked) btnFiltreCatalyste.click();
        
        btnFiltreArmes.addClass("checked")
        storage.setItem(btnFiltreArmes[0].id, "checked");
    }
    else{
        btnFiltreArmes.removeClass("checked")
        storage.removeItem(btnFiltreArmes[0].id, "checked");
    }
})
btnFiltreEpee.click(function(){
    var isChecked = btnFiltreEpee.hasClass("checked");
    if (!isChecked) {
        btnFiltreEpee.addClass("checked")
        storage.setItem(btnFiltreEpee[0].id, "checked");
        if(btnFiltreArmes.hasClass("checked")) btnFiltreArmes.click();
    }
    else{
        btnFiltreEpee.removeClass("checked");
        storage.removeItem(btnFiltreEpee[0].id, "checked");
    }
    manageArmesFilters();
})
btnFiltreArc.click(function(){
    var isChecked = btnFiltreArc.hasClass("checked");
    if (!isChecked) {
        btnFiltreArc.addClass("checked")
        storage.setItem(btnFiltreArc[0].id, "checked");
        if(btnFiltreArmes.hasClass("checked")) btnFiltreArmes.click();
    }
    else{
        btnFiltreArc.removeClass("checked");
        storage.removeItem(btnFiltreArc[0].id, "checked");
    }
    manageArmesFilters();
})
btnFiltreLance.click(function(){
    var isChecked = btnFiltreLance.hasClass("checked");
    if (!isChecked) {
        btnFiltreLance.addClass("checked")
        storage.setItem(btnFiltreLance[0].id, "checked");
        if(btnFiltreArmes.hasClass("checked")) btnFiltreArmes.click();
    }
    else{
        btnFiltreLance.removeClass("checked");
        storage.removeItem(btnFiltreLance[0].id, "checked");
    }
    manageArmesFilters();
}) 
btnFiltreClaymore.click(function(){
    var isChecked = btnFiltreClaymore.hasClass("checked");
    if (!isChecked) {
        btnFiltreClaymore.addClass("checked")
        storage.setItem(btnFiltreClaymore[0].id, "checked");
        if(btnFiltreArmes.hasClass("checked")) btnFiltreArmes.click();
    }
    else{
        btnFiltreClaymore.removeClass("checked");
        storage.removeItem(btnFiltreClaymore[0].id, "checked");
    }
    manageArmesFilters();
}) 
btnFiltreCatalyste.click(function(){
    var isChecked = btnFiltreCatalyste.hasClass("checked");
    if (!isChecked) {
        btnFiltreCatalyste.addClass("checked")
        storage.setItem(btnFiltreCatalyste[0].id, "checked");
        if(btnFiltreArmes.hasClass("checked")) btnFiltreArmes.click();
    }
    else{
        btnFiltreCatalyste.removeClass("checked");
        storage.removeItem(btnFiltreCatalyste[0].id, "checked");
    }
    manageArmesFilters();
})
function manageArmesFilters(){
    var isEpeeChecked = btnFiltreEpee.hasClass("checked");
    var isArcChecked = btnFiltreArc.hasClass("checked");
    var isLanceChecked = btnFiltreLance.hasClass("checked");
    var isClaymoreChecked = btnFiltreClaymore.hasClass("checked");
    var isCatalysteChecked = btnFiltreCatalyste.hasClass("checked");

    if( isEpeeChecked && isArcChecked && isLanceChecked && 
        isClaymoreChecked && isCatalysteChecked
        ){
            btnFiltreEpee.click();
            btnFiltreArc.click();
            btnFiltreLance.click();
            btnFiltreClaymore.click();
            btnFiltreCatalyste.click();

            btnFiltreArmes.click();
        }
        
}
//#endregion
//#region Filtre Rarity
btnFiltreEtoile.click(function(){
    console.log("btnFiltreEtoiles")
    var isChecked = btnFiltreEtoile.hasClass("checked"); 
    if(!isChecked){
        btnFiltreEtoile.addClass("checked")
        storage.setItem(btnFiltreEtoile[0].id, "checked");

        if(btnFiltreEtoilesCinq.hasClass("checked")) btnFiltreEtoilesCinq.click();
        if(btnFiltreEtoilesQuatre.hasClass("checked")) btnFiltreEtoilesQuatre.click();
    }
    else{
        btnFiltreEtoile.removeClass("checked")
        storage.removeItem(btnFiltreEtoile[0].id, "checked");
    }
    
})
btnFiltreEtoilesCinq.click(function(){
    console.log("btnFiltreEtoilesCinq")
    var isChecked = btnFiltreEtoilesCinq.hasClass("checked"); 
    if(!isChecked){
        btnFiltreEtoilesCinq.addClass("checked")
        storage.setItem(btnFiltreEtoilesCinq[0].id, "checked");

        if(btnFiltreEtoile.hasClass("checked")) btnFiltreEtoile.click();
        if(btnFiltreEtoilesQuatre.hasClass("checked")) btnFiltreEtoilesQuatre.click();
    }
    else{
        btnFiltreEtoilesCinq.removeClass("checked")
        storage.removeItem(btnFiltreEtoilesCinq[0].id, "checked");
    }
    
})
btnFiltreEtoilesQuatre.click(function(){
    console.log("btnFiltreEtoilesQuatre")
    var isChecked = btnFiltreEtoilesQuatre.hasClass("checked"); 
    if(!isChecked){
        btnFiltreEtoilesQuatre.addClass("checked")
        storage.setItem(btnFiltreEtoilesQuatre[0].id, "checked");

        if(btnFiltreEtoile.hasClass("checked")) btnFiltreEtoile.click();
        if(btnFiltreEtoilesCinq.hasClass("checked")) btnFiltreEtoilesCinq.click();
    }
    else{
        btnFiltreEtoilesQuatre.removeClass("checked")
        storage.removeItem(btnFiltreEtoilesQuatre[0].id, "checked");
    }
    
})
//#endregion