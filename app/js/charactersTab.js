const requestURLCharacters = 'https://api.genshin.dev/characters/';
const charactersCardsContainer = document.getElementById('liste_personnages_personnages');
const assetsRessourcesCharactersURL = "assets/icons/characters/char_";
const assetsRessourcesElementURL = "assets/icons/filters/element_";

class WeaponCard extends React.Component {
    render() {
        return (
            React.createElement('div', { className: 'weapon_panel' },
                React.createElement('img', { className: 'weapon_panel_icon center', src: this.props.weaponIconSrc })
            )
        );
    }
}

class CharacterCard extends React.Component {
    render() {
        //#region Variables
        var isTraveler = this.props.name == "Traveler";

        var characterNameNoSpace = isTraveler ? "aether" : this.props.name.replace(' ', '_');

        const IDBase = "liste_personnages_personnage_";
        const IDMainContainer = IDBase + characterNameNoSpace;
        const IDPortraitContent = IDBase + characterNameNoSpace + "_portrait";
        const IDPortraitName = IDBase + characterNameNoSpace + "_name";

        var srcBackgroundCase = "assets/icons/characters/case" + this.props.rarity + "nat.png";
        if (this.props.collab) {
            srcBackgroundCase = "assets/icons/characters/case" + this.props.rarity + "natcollab.png";
        }
        const srcPortrait = assetsRessourcesCharactersURL + characterNameNoSpace + ".png";
        const srcVision = assetsRessourcesElementURL + this.props.vision + ".png";

        var cardVision;
        var displayCharacterName = displayCharacterName = this.props.name;
        //#endregion

        //#region Manage Display Traveler        
        if (!isTraveler || this.props.displayTravelerVision) {
            cardVision = React.createElement('img', { className: 'personnage_panel_element', src: srcVision });
        }
        //#endregion

        var card =
            React.createElement('div', { className: 'personnage_panel', id: IDMainContainer },
                React.createElement('div', { className: 'personnage_panel_portrait_content', id: IDPortraitContent },
                    React.createElement('img', { className: 'personnage_panel_background', src: srcBackgroundCase }),
                    React.createElement('img', { className: 'personnage_panel_portrait', src: srcPortrait }),
                    cardVision
                ),
                React.createElement('div', { className: 'personnage_panel_name', id: IDPortraitName }, displayCharacterName)
            )
        return (
            card
        );
    }
}

class CharactersList extends React.Component {
    render() {
        //#region Variables Elements
        const isElements = this.props.isElements;
        const isPyro = this.props.isPyro;
        const isCryo = this.props.isCryo;
        const isAnemo = this.props.isAnemo;
        const isGeo = this.props.isGeo;
        const isHydro = this.props.isHydro;
        const isElectro = this.props.isElectro;
        const isDendro = this.props.isDendro;
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
        //#region Sex
        const isSex = this.props.isSex;
        const isMale = this.props.isMale;
        const isFemale = this.props.isFemale;
        //#endregion

        var charactersCards = [];
        var isSortedByWeapons = (isEpee || isArc || isLance || isClaymore || isCatalyste || isArmes);
        var isSortedByElements = (isPyro || isCryo || isElectro || isHydro || isAnemo || isGeo || isDendro || isElements);
        var isSortedByRarity = (isRarity || isRarityCinq || isRarityQuatre);
        var isSortedBysex = (isMale || isFemale || isSex);
        var isFiltered = (isSortedByElements || isSortedByWeapons || isSortedByRarity || isSortedBysex);
        var displayTravelerVision = !(!isFiltered || !isSortedByElements || (isEpee || isArmes && ((isAnemo && isGeo && isDendro) || isElements)));

        console.log("display:", displayTravelerVision)
        console.log("isAnemo:", isAnemo)
        console.log("isGeo:", isGeo)
        console.log("isDendro:", isDendro)

        //#region FilterUnique
        if (!displayTravelerVision) {
            this.props.characters = this.props.characters.filter(onlyUnique);
            if (!isAnemo && isGeo && !isDendro) {
                this.props.characters.find(c => c.name == "Traveler").vision = "Geo";
                displayTravelerVision = true;
            }
            if (!isAnemo && !isGeo && isDendro) {
                this.props.characters.find(c => c.name == "Traveler").vision = "Dendro";
                displayTravelerVision = true;
            }
            else if (isAnemo && !isGeo && !isDendro) {
                this.props.characters.find(c => c.name == "Traveler").vision = "Anemo";
                displayTravelerVision = true;
            }
        }
        console.log("display:", displayTravelerVision)
        //#endregion

        //#region FilterByRarity       
        if (isRarityCinq || isRarity) {
            filterCharacterListByRarity(this.props.characters, 5).forEach((character) => {
                charactersSortedByRarity.push(character)
            })
        }
        if (isRarityQuatre || isRarity) {
            filterCharacterListByRarity(this.props.characters, 4).forEach((character) => {
                charactersSortedByRarity.push(character)
            })
        }
        if (isSortedByRarity) {
            this.props.characters = charactersSortedByRarity;
        }        
        //#endregion
               
        if(isSortedBysex && !isSortedByRarity && !isSortedByWeapons && !isSortedByElements){
            if(isFemale || isSex){
                var femaleCharactersList = []
                filterCharacterListBySex(this.props.characters, "F").forEach((character) => {
                    femaleCharactersList.push(
                        <CharacterCard
                            name={character.name}
                            rarity={character.rarity}
                            vision={character.vision}
                            collab={character.collab}
                            displayTravelerVision={displayTravelerVision}
                        />)
                })
                charactersCards.push(<div class='flex row limitCardsNumberByRow'>{femaleCharactersList}</div>)
            }
            if(isMale || isSex){
                var maleCharactersList = []
                filterCharacterListBySex(this.props.characters, "M").forEach((character) => {
                    maleCharactersList.push(
                        <CharacterCard
                            name={character.name}
                            rarity={character.rarity}
                            vision={character.vision}
                            collab={character.collab}
                            displayTravelerVision={displayTravelerVision}
                        />)
                })
                charactersCards.push(<div class='flex row limitCardsNumberByRow'>{maleCharactersList}</div>)
            }
            return (<div id='liste_personnages_personnages' class='flex row limitCardsNumberByRow'>{charactersCards}</div>)
        }
        
        if (isSortedByRarity && !isSortedByWeapons && !isSortedByElements) {
            console.log(charactersSortedByRarity)            
            if(!isSortedBysex){
                if (isRarityCinq || isRarity) {
                    var charactersRarityCinqRow = [];                
                    filterCharacterListByRarity(this.props.characters, 5).forEach((character) => {
                        charactersRarityCinqRow.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                collab={character.collab}
                                displayTravelerVision={displayTravelerVision}
                            />)
                    })
                    charactersCards.push(<div class='flex row limitCardsNumberByRow'>{charactersRarityCinqRow}</div>)
                }
                if (isRarityQuatre || isRarity) {
                    var charactersRarityQuatreRow = [];
                    filterCharacterListByRarity(this.props.characters, 4).forEach((character) => {
                        charactersRarityQuatreRow.push(
                            <CharacterCard
                                name={character.name}
                                rarity={character.rarity}
                                vision={character.vision}
                                collab={character.collab}
                                displayTravelerVision={displayTravelerVision}
                            />)
                    })
                    charactersCards.push(<div class='flex row limitCardsNumberByRow'>{charactersRarityQuatreRow}</div>)
                }                
            }
            else{
                if(isFemale || isSex){
                    var femaleCharactersList = filterCharacterListBySex(this.props.characters, "F")
                    if (isRarityCinq || isRarity) {
                        var charactersRarityCinqRow = [];
                        filterCharacterListByRarity(femaleCharactersList, 5).forEach((character) => {
                            charactersRarityCinqRow.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        })
                        charactersCards.push(<div class='flex row limitCardsNumberByRow'>{charactersRarityCinqRow}</div>)
                    }
                    if (isRarityQuatre || isRarity) {
                        var charactersRarityQuatreRow = [];
                        filterCharacterListByRarity(femaleCharactersList, 4).forEach((character) => {
                            charactersRarityQuatreRow.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        })
                        charactersCards.push(<div class='flex row limitCardsNumberByRow'>{charactersRarityQuatreRow}</div>)
                    } 
                }
                if(isMale || isSex){
                    var maleCharactersList = filterCharacterListBySex(this.props.characters, "M")
                    if (isRarityCinq || isRarity) {
                        var charactersRarityCinqRow = [];                
                        filterCharacterListByRarity(maleCharactersList, 5).forEach((character) => {
                            charactersRarityCinqRow.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        })
                        charactersCards.push(<div class='flex row limitCardsNumberByRow'>{charactersRarityCinqRow}</div>)
                    }
                    if (isRarityQuatre || isRarity) {
                        var charactersRarityQuatreRow = [];
                        filterCharacterListByRarity(maleCharactersList, 4).forEach((character) => {
                            charactersRarityQuatreRow.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        })
                        charactersCards.push(<div class='flex row limitCardsNumberByRow'>{charactersRarityQuatreRow}</div>)
                    } 
                }
            }
            return (<div id='liste_personnages_personnages' class='flex row limitCardsNumberByRow'>{charactersCards}</div>)
        }

        if (isSortedByWeapons) {
            if (isEpee || isArmes) {
                console.log("Arme Epee")
                var charactersFilterByWeapon = filterCharacterListByWeapon(this.props.characters, "Sword");
                var rowCharacterWeapon = [];
                rowCharacterWeapon.push(
                    <WeaponCard
                        weaponType="sword"
                        weaponIconSrc="assets/icons/filters/sword50.png"
                    />
                )
                if(!isSortedBysex){                 
                    if (isPyro || isElements) {
                        console.log("weapon element Pyro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Pyro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isCryo || isElements) {
                        console.log("weapon element Cryo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Cryo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isElectro || isElements) {
                        console.log("weapon element Electro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Electro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isHydro || isElements) {
                        console.log("weapon element Hydro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Hydro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isAnemo || isElements) {
                        console.log("weapon element Anemo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Anemo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isGeo || isElements) {
                        console.log("weapon element Geo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Geo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isDendro || isElements) {
                        console.log("weapon element Dendro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Dendro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    else if (!isSortedByElements) {
                        charactersFilterByWeapon.forEach((character) => {
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        })
                    }   
                    charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
                }
                else{
                    if(isFemale || isSex){
                        var femaleCharactersList = filterCharacterListBySex(charactersFilterByWeapon, "F");
                        if (isPyro || isElements) {
                            console.log("weapon element Pyro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Pyro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isCryo || isElements) {
                            console.log("weapon element Cryo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Cryo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isElectro || isElements) {
                            console.log("weapon element Electro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Electro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isHydro || isElements) {
                            console.log("weapon element Hydro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Hydro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isAnemo || isElements) {
                            console.log("weapon element Anemo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Anemo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isGeo || isElements) {
                            console.log("weapon element Geo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Geo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isDendro || isElements) {
                            console.log("weapon element Dendro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Dendro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        else if (!isSortedByElements) {
                            femaleCharactersList.forEach((character) => {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            })
                        }
                    }
                    if(isMale || isSex){
                        var maleCharactersList = filterCharacterListBySex(charactersFilterByWeapon, "M");
                        if (isPyro || isElements) {
                            console.log("weapon element Pyro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Pyro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isCryo || isElements) {
                            console.log("weapon element Cryo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Cryo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isElectro || isElements) {
                            console.log("weapon element Electro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Electro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isHydro || isElements) {
                            console.log("weapon element Hydro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Hydro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isAnemo || isElements) {
                            console.log("weapon element Anemo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Anemo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isGeo || isElements) {
                            console.log("weapon element Geo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Geo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isDendro || isElements) {
                            console.log("weapon element Dendro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Dendro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        else if (!isSortedByElements) {
                            maleCharactersList.forEach((character) => {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            })
                        }
                    }
                    charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
                }
            }
            if (isArc || isArmes) {
                console.log("Arme Arc")
                var charactersFilterByWeapon = filterCharacterListByWeapon(this.props.characters, "Bow");
                var rowCharacterWeapon = [];
                rowCharacterWeapon.push(
                    <WeaponCard
                        weaponType="bow"
                        weaponIconSrc="assets/icons/filters/bow50.png"
                    />
                )
                if(!isSortedBysex){                 
                    if (isPyro || isElements) {
                        console.log("weapon element Pyro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Pyro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isCryo || isElements) {
                        console.log("weapon element Cryo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Cryo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isElectro || isElements) {
                        console.log("weapon element Electro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Electro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isHydro || isElements) {
                        console.log("weapon element Hydro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Hydro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isAnemo || isElements) {
                        console.log("weapon element Anemo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Anemo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isGeo || isElements) {
                        console.log("weapon element Geo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Geo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isDendro || isElements) {
                        console.log("weapon element Dendro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Dendro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    else if (!isSortedByElements) {
                        charactersFilterByWeapon.forEach((character) => {
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        })
                    }   
                    charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
                }
                else{
                    if(isFemale || isSex){
                        var femaleCharactersList = filterCharacterListBySex(charactersFilterByWeapon, "F");
                        if (isPyro || isElements) {
                            console.log("weapon element Pyro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Pyro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isCryo || isElements) {
                            console.log("weapon element Cryo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Cryo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isElectro || isElements) {
                            console.log("weapon element Electro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Electro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isHydro || isElements) {
                            console.log("weapon element Hydro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Hydro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isAnemo || isElements) {
                            console.log("weapon element Anemo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Anemo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isGeo || isElements) {
                            console.log("weapon element Geo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Geo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isDendro || isElements) {
                            console.log("weapon element Dendro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Dendro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        else if (!isSortedByElements) {
                            femaleCharactersList.forEach((character) => {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            })
                        }
                    }
                    if(isMale || isSex){
                        var maleCharactersList = filterCharacterListBySex(charactersFilterByWeapon, "M");
                        if (isPyro || isElements) {
                            console.log("weapon element Pyro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Pyro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isCryo || isElements) {
                            console.log("weapon element Cryo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Cryo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isElectro || isElements) {
                            console.log("weapon element Electro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Electro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isHydro || isElements) {
                            console.log("weapon element Hydro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Hydro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isAnemo || isElements) {
                            console.log("weapon element Anemo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Anemo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isGeo || isElements) {
                            console.log("weapon element Geo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Geo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isDendro || isElements) {
                            console.log("weapon element Dendro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Dendro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        else if (!isSortedByElements) {
                            maleCharactersList.forEach((character) => {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            })
                        }
                    }
                    charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
                }
            }
            if (isLance || isArmes) {
                console.log("Arme Lance")
                var charactersFilterByWeapon = filterCharacterListByWeapon(this.props.characters, "Polearm");
                var rowCharacterWeapon = [];
                rowCharacterWeapon.push(
                    <WeaponCard
                        weaponType="polearm"
                        weaponIconSrc="assets/icons/filters/polearm50.png"
                    />
                )
                if(!isSortedBysex){                 
                    if (isPyro || isElements) {
                        console.log("weapon element Pyro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Pyro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isCryo || isElements) {
                        console.log("weapon element Cryo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Cryo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isElectro || isElements) {
                        console.log("weapon element Electro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Electro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isHydro || isElements) {
                        console.log("weapon element Hydro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Hydro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isAnemo || isElements) {
                        console.log("weapon element Anemo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Anemo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isGeo || isElements) {
                        console.log("weapon element Geo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Geo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isDendro || isElements) {
                        console.log("weapon element Dendro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Dendro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    else if (!isSortedByElements) {
                        charactersFilterByWeapon.forEach((character) => {
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        })
                    }   
                    charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
                }
                else{
                    if(isFemale || isSex){
                        var femaleCharactersList = filterCharacterListBySex(charactersFilterByWeapon, "F");
                        if (isPyro || isElements) {
                            console.log("weapon element Pyro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Pyro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isCryo || isElements) {
                            console.log("weapon element Cryo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Cryo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isElectro || isElements) {
                            console.log("weapon element Electro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Electro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isHydro || isElements) {
                            console.log("weapon element Hydro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Hydro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isAnemo || isElements) {
                            console.log("weapon element Anemo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Anemo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isGeo || isElements) {
                            console.log("weapon element Geo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Geo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isDendro || isElements) {
                            console.log("weapon element Dendro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Dendro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        else if (!isSortedByElements) {
                            femaleCharactersList.forEach((character) => {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            })
                        }
                    }
                    if(isMale || isSex){
                        var maleCharactersList = filterCharacterListBySex(charactersFilterByWeapon, "M");
                        if (isPyro || isElements) {
                            console.log("weapon element Pyro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Pyro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isCryo || isElements) {
                            console.log("weapon element Cryo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Cryo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isElectro || isElements) {
                            console.log("weapon element Electro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Electro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isHydro || isElements) {
                            console.log("weapon element Hydro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Hydro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isAnemo || isElements) {
                            console.log("weapon element Anemo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Anemo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isGeo || isElements) {
                            console.log("weapon element Geo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Geo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isDendro || isElements) {
                            console.log("weapon element Dendro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Dendro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        else if (!isSortedByElements) {
                            maleCharactersList.forEach((character) => {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            })
                        }
                    }
                    charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
                }
            }
            if (isClaymore || isArmes) {
                console.log("Arme Claymore")
                var charactersFilterByWeapon = filterCharacterListByWeapon(this.props.characters, "Claymore");
                var rowCharacterWeapon = [];
                rowCharacterWeapon.push(
                    <WeaponCard
                        weaponType="claymore"
                        weaponIconSrc="assets/icons/filters/claymore50.png"
                    />
                )
                if(!isSortedBysex){                 
                    if (isPyro || isElements) {
                        console.log("weapon element Pyro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Pyro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isCryo || isElements) {
                        console.log("weapon element Cryo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Cryo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isElectro || isElements) {
                        console.log("weapon element Electro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Electro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isHydro || isElements) {
                        console.log("weapon element Hydro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Hydro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isAnemo || isElements) {
                        console.log("weapon element Anemo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Anemo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isGeo || isElements) {
                        console.log("weapon element Geo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Geo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isDendro || isElements) {
                        console.log("weapon element Dendro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Dendro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    else if (!isSortedByElements) {
                        charactersFilterByWeapon.forEach((character) => {
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        })
                    }   
                    charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
                }
                else{
                    if(isFemale || isSex){
                        var femaleCharactersList = filterCharacterListBySex(charactersFilterByWeapon, "F");
                        if (isPyro || isElements) {
                            console.log("weapon element Pyro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Pyro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isCryo || isElements) {
                            console.log("weapon element Cryo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Cryo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isElectro || isElements) {
                            console.log("weapon element Electro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Electro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isHydro || isElements) {
                            console.log("weapon element Hydro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Hydro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isAnemo || isElements) {
                            console.log("weapon element Anemo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Anemo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isGeo || isElements) {
                            console.log("weapon element Geo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Geo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isDendro || isElements) {
                            console.log("weapon element Dendro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Dendro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        else if (!isSortedByElements) {
                            femaleCharactersList.forEach((character) => {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            })
                        }
                    }
                    if(isMale || isSex){
                        var maleCharactersList = filterCharacterListBySex(charactersFilterByWeapon, "M");
                        if (isPyro || isElements) {
                            console.log("weapon element Pyro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Pyro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isCryo || isElements) {
                            console.log("weapon element Cryo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Cryo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isElectro || isElements) {
                            console.log("weapon element Electro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Electro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isHydro || isElements) {
                            console.log("weapon element Hydro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Hydro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isAnemo || isElements) {
                            console.log("weapon element Anemo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Anemo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isGeo || isElements) {
                            console.log("weapon element Geo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Geo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isDendro || isElements) {
                            console.log("weapon element Dendro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Dendro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        else if (!isSortedByElements) {
                            maleCharactersList.forEach((character) => {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            })
                        }
                    }
                    charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
                }
            }
            if (isCatalyste || isArmes) {
                console.log("Arme Catalyste")
                var charactersFilterByWeapon = filterCharacterListByWeapon(this.props.characters, "Catalyst");
                var rowCharacterWeapon = [];
                rowCharacterWeapon.push(
                    <WeaponCard
                        weaponType="catalyst"
                        weaponIconSrc="assets/icons/filters/catalyst50.png"
                    />
                )
                if(!isSortedBysex){                 
                    if (isPyro || isElements) {
                        console.log("weapon element Pyro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Pyro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isCryo || isElements) {
                        console.log("weapon element Cryo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Cryo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isElectro || isElements) {
                        console.log("weapon element Electro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Electro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isHydro || isElements) {
                        console.log("weapon element Hydro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Hydro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isAnemo || isElements) {
                        console.log("weapon element Anemo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Anemo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isGeo || isElements) {
                        console.log("weapon element Geo")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Geo') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    if (isDendro || isElements) {
                        console.log("weapon element Dendro")
                        charactersFilterByWeapon.forEach((character) => {
                            if (character.vision == 'Dendro') {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                    }
                    else if (!isSortedByElements) {
                        charactersFilterByWeapon.forEach((character) => {
                            rowCharacterWeapon.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        })
                    }   
                    charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
                }
                else{
                    if(isFemale || isSex){
                        var femaleCharactersList = filterCharacterListBySex(charactersFilterByWeapon, "F");
                        if (isPyro || isElements) {
                            console.log("weapon element Pyro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Pyro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isCryo || isElements) {
                            console.log("weapon element Cryo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Cryo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isElectro || isElements) {
                            console.log("weapon element Electro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Electro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isHydro || isElements) {
                            console.log("weapon element Hydro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Hydro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isAnemo || isElements) {
                            console.log("weapon element Anemo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Anemo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isGeo || isElements) {
                            console.log("weapon element Geo")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Geo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isDendro || isElements) {
                            console.log("weapon element Dendro")
                            femaleCharactersList.forEach((character) => {
                                if (character.vision == 'Dendro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        else if (!isSortedByElements) {
                            femaleCharactersList.forEach((character) => {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            })
                        }
                    }
                    if(isMale || isSex){
                        var maleCharactersList = filterCharacterListBySex(charactersFilterByWeapon, "M");
                        if (isPyro || isElements) {
                            console.log("weapon element Pyro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Pyro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isCryo || isElements) {
                            console.log("weapon element Cryo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Cryo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isElectro || isElements) {
                            console.log("weapon element Electro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Electro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isHydro || isElements) {
                            console.log("weapon element Hydro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Hydro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isAnemo || isElements) {
                            console.log("weapon element Anemo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Anemo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isGeo || isElements) {
                            console.log("weapon element Geo")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Geo') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        if (isDendro || isElements) {
                            console.log("weapon element Dendro")
                            maleCharactersList.forEach((character) => {
                                if (character.vision == 'Dendro') {
                                    rowCharacterWeapon.push(
                                        <CharacterCard
                                            name={character.name}
                                            rarity={character.rarity}
                                            vision={character.vision}
                                            collab={character.collab}
                                            displayTravelerVision={displayTravelerVision}
                                        />)
                                }
                            })
                        }
                        else if (!isSortedByElements) {
                            maleCharactersList.forEach((character) => {
                                rowCharacterWeapon.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            })
                        }
                    }
                    charactersCards.push(<div class='flex row'>{rowCharacterWeapon}</div>)
                }
            }
        }
        else if (isSortedByElements) {
            if(!isSortedBysex){
                if (isPyro || isElements) {
                    console.log("Element Pyro")
                    var pyroCharacter = []
                    this.props.characters.forEach((character) => {
                        if (character.vision == 'Pyro') {
                            pyroCharacter.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        }
                    })
                    charactersCards.push(<div class='flex row'>{pyroCharacter}</div>)
                }
                if (isCryo || isElements) {
                    console.log("Element Cryo")
                    var cryoCharacter = []
                    this.props.characters.forEach((character) => {
                        if (character.vision == 'Cryo') {
                            cryoCharacter.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        }
                    })
                    charactersCards.push(<div class='flex row'>{cryoCharacter}</div>)
                }
                if (isElectro || isElements) {
                    console.log("Element Electro")
                    var electroCharacter = []
                    this.props.characters.forEach((character) => {
                        if (character.vision == 'Electro') {
                            electroCharacter.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        }
                    })
                    charactersCards.push(<div class='flex row'>{electroCharacter}</div>)
                }
                if (isHydro || isElements) {
                    console.log("Element Hydro")
                    var hydroCharacter = []
                    this.props.characters.forEach((character) => {
                        if (character.vision == 'Hydro') {
                            hydroCharacter.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        }
                    })
                    charactersCards.push(<div class='flex row'>{hydroCharacter}</div>)
                }
                if (isAnemo || isElements) {
                    console.log("Element Anemo")
                    var anemoCharacter = []
                    this.props.characters.forEach((character) => {
                        if (character.vision == 'Anemo') {
                            anemoCharacter.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        }
                    })
                    charactersCards.push(<div class='flex row'>{anemoCharacter}</div>)
                }
                if (isGeo || isElements) {
                    console.log("Element Geo")
                    var geoCharacter = []
                    this.props.characters.forEach((character) => {
                        if (character.vision == 'Geo') {
                            geoCharacter.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        }
                    })
                    charactersCards.push(<div class='flex row'>{geoCharacter}</div>)
                }
                if (isDendro || isElements) {
                    console.log("Element Dendro")
                    var dendroCharacter = []
                    this.props.characters.forEach((character) => {
                        if (character.vision == 'Dendro') {
                            dendroCharacter.push(
                                <CharacterCard
                                    name={character.name}
                                    rarity={character.rarity}
                                    vision={character.vision}
                                    collab={character.collab}
                                    displayTravelerVision={displayTravelerVision}
                                />)
                        }
                    })
                    charactersCards.push(<div class='flex row'>{dendroCharacter}</div>)
                }
            }
            else{
                if(isFemale || isSex){
                    var charactersFilteredBySex = filterCharacterListBySex(this.props.characters, "F")
                    if (isPyro || isElements) {
                        console.log("Element Pyro")
                        var pyroCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Pyro') {
                                pyroCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{pyroCharacter}</div>)
                    }
                    if (isCryo || isElements) {
                        console.log("Element Cryo")
                        var cryoCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Cryo') {
                                cryoCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{cryoCharacter}</div>)
                    }
                    if (isElectro || isElements) {
                        console.log("Element Electro")
                        var electroCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Electro') {
                                electroCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{electroCharacter}</div>)
                    }
                    if (isHydro || isElements) {
                        console.log("Element Hydro")
                        var hydroCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Hydro') {
                                hydroCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{hydroCharacter}</div>)
                    }
                    if (isAnemo || isElements) {
                        console.log("Element Anemo")
                        var anemoCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Anemo') {
                                anemoCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{anemoCharacter}</div>)
                    }
                    if (isGeo || isElements) {
                        console.log("Element Geo")
                        var geoCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Geo') {
                                geoCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{geoCharacter}</div>)
                    }
                    if (isDendro || isElements) {
                        console.log("Element Dendro")
                        var dendroCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Dendro') {
                                dendroCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{dendroCharacter}</div>)
                    }
                }
                if(isMale || isSex){
                    var charactersFilteredBySex = filterCharacterListBySex(this.props.characters, "M")
                    if (isPyro || isElements) {
                        console.log("Element Pyro")
                        var pyroCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Pyro') {
                                pyroCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{pyroCharacter}</div>)
                    }
                    if (isCryo || isElements) {
                        console.log("Element Cryo")
                        var cryoCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Cryo') {
                                cryoCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{cryoCharacter}</div>)
                    }
                    if (isElectro || isElements) {
                        console.log("Element Electro")
                        var electroCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Electro') {
                                electroCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{electroCharacter}</div>)
                    }
                    if (isHydro || isElements) {
                        console.log("Element Hydro")
                        var hydroCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Hydro') {
                                hydroCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{hydroCharacter}</div>)
                    }
                    if (isAnemo || isElements) {
                        console.log("Element Anemo")
                        var anemoCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Anemo') {
                                anemoCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{anemoCharacter}</div>)
                    }
                    if (isGeo || isElements) {
                        console.log("Element Geo")
                        var geoCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Geo') {
                                geoCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{geoCharacter}</div>)
                    }
                    if (isDendro || isElements) {
                        console.log("Element Dendro")
                        var dendroCharacter = []
                        charactersFilteredBySex.forEach((character) => {
                            if (character.vision == 'Dendro') {
                                dendroCharacter.push(
                                    <CharacterCard
                                        name={character.name}
                                        rarity={character.rarity}
                                        vision={character.vision}
                                        collab={character.collab}
                                        displayTravelerVision={displayTravelerVision}
                                    />)
                            }
                        })
                        charactersCards.push(<div class='flex row'>{dendroCharacter}</div>)
                    }
                }
            }
        }
        else {
            if (!isFiltered) {
                console.log("Not filtered")
                this.props.characters.filter(onlyUnique).forEach((character) => {
                    charactersCards.push(
                        <CharacterCard
                            name={character.name}
                            rarity={character.rarity}
                            vision={character.vision}
                            collab={character.collab}
                            displayTravelerVision={displayTravelerVision}
                        />)
                })
                return (<div id='liste_personnages_personnages' class='flex row limitCardsNumberByRow'>{charactersCards}</div>)
            }
        }

        return (<div id='liste_personnages_personnages' class='flex row flexDirectionColumn'>{charactersCards}</div>)
    };
}

function filterCharacterListByVision(characterList, vision) {
    return characterList.filter(character => character.vision == vision)
}
function filterCharacterListByWeapon(characterList, weapon) {
    return characterList.filter(character => character.weapon == weapon)
}
function filterCharacterListByRarity(characterList, rarity) {
    return characterList.filter(character => character.rarity == rarity)
}
function filterCharacterListBySex(characterList, sex) {
    return characterList.filter(character => character.sex == sex)
}
function onlyUnique(value, index, self) {
    return self.map(function (o) { return o.name; }).indexOf(value.name) === index;
}

class Filters extends React.Component {
    constructor(props) {
        super(props);
        //#region Elements
        this.handleIsPyroChange = this.handleIsPyroChange.bind(this);
        this.handleIsCryoChange = this.handleIsCryoChange.bind(this);
        this.handleIsAnemoChange = this.handleIsAnemoChange.bind(this);
        this.handleIsGeoChange = this.handleIsGeoChange.bind(this);
        this.handleIsElectroChange = this.handleIsElectroChange.bind(this);
        this.handleIsHydroChange = this.handleIsHydroChange.bind(this);
        this.handleIsDendroChange = this.handleIsDendroChange.bind(this);
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
        //#region Sex
        this.handleIsSexChange = this.handleIsSexChange.bind(this);
        this.handleIsFemaleChange = this.handleIsFemaleChange.bind(this);
        this.handleIsMaleChange = this.handleIsMaleChange.bind(this);
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
    handleIsDendroChange(e) {
        this.props.onIsDendroChange(e.currentTarget.classList.contains('checked'));
    }
    handleIsElementsChange(e) {
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
    handleIsLanceChange(e) {
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
    handleIsRarityChange(e) {
        this.props.onIsRarity(e.currentTarget.classList.contains('checked'));
    }
    handleIsRarityCinqChange(e) {
        this.props.onIsRarityCinq(e.currentTarget.classList.contains('checked'));
    }
    handleIsRarityQuatreChange(e) {
        this.props.onIsRarityQuatre(e.currentTarget.classList.contains('checked'));
    }
    //#endregion
    //#region Handlers Sex
    handleIsSexChange(e) {
        this.props.onIsSex(e.currentTarget.classList.contains('checked'));
    }
    handleIsFemaleChange(e) {
        this.props.onIsFemale(e.currentTarget.classList.contains('checked'));
    }
    handleIsMaleChange(e) {
        this.props.onIsMale(e.currentTarget.classList.contains('checked'));
    }
    //#endregion
    render() {
        return (
            <div id="liste_personnages_filtres" class="flex row">
                <div id="liste_personnages_filtres_sex" class="btn btn_filtre" onClick={this.handleIsSexChange} >
                    <img class="btn_filtre_image" src='assets/icons/filters/etoile_icon_27.png'/>
                </div>

                <div id="liste_personnages_filtres_etoile" class="btn btn_filtre" onClick={this.handleIsRarityChange} >
                    <img class="btn_filtre_image" src='assets/icons/filters/etoile_icon_27.png' />
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
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png" />
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png" />
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png" />
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png" />
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png" />
                    </div>
                    <div id="liste_personnages_filtres_etoiles_quatre" class="btn btn_filtre_flat flex row no_justify_left_padding" onClick={this.handleIsRarityQuatreChange} >
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png" />
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png" />
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png" />
                        <img class="btn_filtre_image_small" src="assets/icons/filters/etoile_icon_12.png" />
                    </div>
                </div>

                <div id="liste_personnages_filtres_elements" class="flex row">
                    <div id="liste_personnages_filtres_elements_feu" class="btn btn_filtre" onClick={this.handleIsPyroChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/element_pyro.png" />
                    </div>
                    <div id="liste_personnages_filtres_elements_glace" class="btn btn_filtre" onClick={this.handleIsCryoChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/element_cryo.png" />
                    </div>
                    <div id="liste_personnages_filtres_elements_electro" class="btn btn_filtre" onClick={this.handleIsElectroChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/element_electro.png" />
                    </div>
                    <div id="liste_personnages_filtres_elements_eau" class="btn btn_filtre" onClick={this.handleIsHydroChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/element_hydro.png" />
                    </div>
                    <div id="liste_personnages_filtres_elements_anemo" class="btn btn_filtre" onClick={this.handleIsAnemoChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/element_anemo.png" />
                    </div>
                    <div id="liste_personnages_filtres_elements_geo" class="btn btn_filtre" onClick={this.handleIsGeoChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/element_geo.png" />
                    </div>
                    <div id="liste_personnages_filtres_elements_dendro" class="btn btn_filtre" onClick={this.handleIsDendroChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/element_dendro.png" />
                    </div>
                </div>

                <div id="liste_personnages_filtres_armes" class="flex row">
                    <div id="liste_personnages_filtres_armes_epee" class="btn btn_filtre" onClick={this.handleIsEpeeChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/sword27.png" />
                    </div>
                    <div id="liste_personnages_filtres_armes_arc" class="btn btn_filtre" onClick={this.handleIsArcChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/bow27.png" />
                    </div>
                    <div id="liste_personnages_filtres_armes_lance" class="btn btn_filtre" onClick={this.handleIsLanceChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/polearm27.png" />
                    </div>
                    <div id="liste_personnages_filtres_armes_claymore" class="btn btn_filtre" onClick={this.handleIsClaymoreChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/claymore27.png" />
                    </div>
                    <div id="liste_personnages_filtres_armes_catalyste" class="btn btn_filtre" onClick={this.handleIsCatalysteChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/catalyst27.png" />
                    </div>
                </div>

                <div id="liste_personnages_filtres_sex_both" class="flex row">
                    <div id="liste_personnages_filtres_sex_f" class="btn btn_filtre" onClick={this.handleIsFemaleChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/catalyst27.png" />
                    </div>
                    <div id="liste_personnages_filtres_sex_m" class="btn btn_filtre" onClick={this.handleIsMaleChange} >
                        <img class="btn_filtre_image" src="assets/icons/filters/catalyst27.png" />
                    </div>
                </div>
            </div>
        )
    }
}
class FilterableCharactersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //#region Elements
            isPyro: false,
            isCryo: false,
            isAnemo: false,
            isHydro: false,
            isGeo: false,
            isElectro: false,
            isDendro: false,
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
            isRarityQuatre: false,
            //#endregion
            //#region Sex
            isSex: false,
            isMale: false,
            isFemale: false,
            //#endregion
        }
        //#region Bind Elements
        this.handleIsPyroChange = this.handleIsPyroChange.bind(this);
        this.handleIsCryoChange = this.handleIsCryoChange.bind(this);
        this.handleIsAnemoChange = this.handleIsAnemoChange.bind(this);
        this.handleIsHydroChange = this.handleIsHydroChange.bind(this);
        this.handleIsGeoChange = this.handleIsGeoChange.bind(this);
        this.handleIsElectroChange = this.handleIsElectroChange.bind(this);
        this.handleIsDendroChange = this.handleIsDendroChange.bind(this);
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
        //#region Bind Sex
        this.handleIsSexChange = this.handleIsSexChange.bind(this);
        this.handleIsFemaleChange = this.handleIsFemaleChange.bind(this);
        this.handleIsMaleChange = this.handleIsMaleChange.bind(this);
        //#endregion
    }
    
    //#region Handlers Elements
    handleIsPyroChange(isPyro) {
        this.setState({
            isPyro: isPyro
        })
    }
    handleIsCryoChange(isCryo) {
        this.setState({
            isCryo: isCryo
        })
    }
    handleIsAnemoChange(isAnemo) {
        this.setState({
            isAnemo: isAnemo
        })
    }
    handleIsHydroChange(isHydro) {
        this.setState({
            isHydro: isHydro
        })
    }
    handleIsGeoChange(isGeo) {
        this.setState({
            isGeo: isGeo
        })
    }
    handleIsElectroChange(isElectro) {
        this.setState({
            isElectro: isElectro
        })
    }
    handleIsDendroChange(isDendro) {
        this.setState({
            isDendro: isDendro
        })
    }
    handleIsElementsChange(isElements) {
        this.setState({
            isElements: isElements
        })
    }
    //#endregion
    //#region Handlers Armes
    handleIsArmesChange(isArmes) {
        this.setState({
            isArmes: isArmes
        })
    }
    handleIsEpeeChange(isEpee) {
        this.setState({
            isEpee: isEpee
        })
    }
    handleIsArcChange(isArc) {
        this.setState({
            isArc: isArc
        })
    }
    handleIsLanceChange(isLance) {
        this.setState({
            isLance: isLance
        })
    }
    handleIsClaymoreChange(isClaymore) {
        this.setState({
            isClaymore: isClaymore
        })
    }
    handleIsCatalysteChange(isCatalyste) {
        this.setState({
            isCatalyste: isCatalyste
        })
    }
    //#endregion    
    //#region Handlers Rarity
    handleIsRarityChange(isRarity) {
        this.setState({
            isRarity: isRarity
        })
    }
    handleIsRarityCinqChange(isRarityCinq) {
        this.setState({
            isRarityCinq: isRarityCinq
        })
    }
    handleIsRarityQuatreChange(isRarityQuatre) {
        this.setState({
            isRarityQuatre: isRarityQuatre
        })
    }
    //#endregion
    //#region Handlers Sex
    handleIsSexChange(isSex) {
        this.setState({
            isSex: isSex
        })
    }
    handleIsFemaleChange(isFemale) {
        this.setState({
            isFemale: isFemale
        })
    }
    handleIsMaleChange(isMale) {
        this.setState({
            isMale: isMale
        })
    }
    //#endregion
    
    render() {
        return (
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
                    isDendro={this.state.isDendro}

                    onIsElementsChange={this.handleIsElementsChange}
                    onIsPyroChange={this.handleIsPyroChange}
                    onIsCryoChange={this.handleIsCryoChange}
                    onIsAnemoChange={this.handleIsAnemoChange}
                    onIsHydroChange={this.handleIsHydroChange}
                    onIsGeoChange={this.handleIsGeoChange}
                    onIsElectroChange={this.handleIsElectroChange}
                    onIsDendroChange={this.handleIsDendroChange}
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
                    //#region Sex
                    isSex={this.state.isSex}
                    isFemale={this.state.isFemale}
                    isMale={this.state.isMale}

                    onIsSex={this.handleIsSexChange}
                    onIsFemale={this.handleIsFemaleChange}
                    onIsMale={this.handleIsMaleChange}
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
                    isDendro={this.state.isDendro}
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
                    //#region Sex
                    isSex={this.state.isSex}
                    isMale={this.state.isMale}
                    isFemale={this.state.isFemale}
                    //#endregion
                />
            </div>
        )
    }
}
var characters = loadCharactersJSON();
function loadCharactersJSON() {
    var datas;
    $.ajaxSetup({
        async: false
    });
    $.getJSON("ressources/characters.json", function (data) {
        datas = data;
    }).fail(function () {
        console.log("An error has occurred.");
    })
    $.ajaxSetup({
        async: true
    });
    return datas;
}

ReactDOM.render(
    <FilterableCharactersList characters={characters.Characters} />,
    document.getElementById('liste_personnages')
);

//#region Variables 
//#region Elements
let btnElements = $('#liste_personnages_filtres_element')
let btnFiltrePyro = $('#liste_personnages_filtres_elements_feu');
let btnFiltreCryo = $('#liste_personnages_filtres_elements_glace');
let btnFiltreElectro = $('#liste_personnages_filtres_elements_electro');
let btnFiltreHydro = $('#liste_personnages_filtres_elements_eau');
let btnFiltreAnemo = $('#liste_personnages_filtres_elements_anemo');
let btnFiltreGeo = $('#liste_personnages_filtres_elements_geo');
let btnFiltreDendro = $('#liste_personnages_filtres_elements_dendro');
//#endregion
//#region Armes
let btnFiltreArmes = $('#liste_personnages_filtres_arme');
let btnFiltreEpee = $('#liste_personnages_filtres_armes_epee');
let btnFiltreArc = $('#liste_personnages_filtres_armes_arc');
let btnFiltreLance = $('#liste_personnages_filtres_armes_lance');
let btnFiltreClaymore = $('#liste_personnages_filtres_armes_claymore');
let btnFiltreCatalyste = $('#liste_personnages_filtres_armes_catalyste');
//#endregion
//#region Rarity
let btnFiltreEtoile = $('#liste_personnages_filtres_etoile');
let btnFiltreEtoilesCinq = $('#liste_personnages_filtres_etoiles_cinq');
let btnFiltreEtoilesQuatre = $('#liste_personnages_filtres_etoiles_quatre');
//#endregion
//#region Sex
let btnFiltreSex = $('#liste_personnages_filtres_sex');
let btnFiltreFemale = $('#liste_personnages_filtres_sex_f');
let btnFiltreMale = $('#liste_personnages_filtres_sex_m');
//#endregion
//#endregion

//#region Filtre Elements
btnElements.click(function () {
    var isChecked = btnElements.hasClass("checked");
    if (!isChecked) {
        var isPyroChecked = btnFiltrePyro.hasClass("checked");
        var isCryoChecked = btnFiltreCryo.hasClass("checked");
        var isElectroChecked = btnFiltreElectro.hasClass("checked");
        var isHydroChecked = btnFiltreHydro.hasClass("checked");
        var isAnemoChecked = btnFiltreAnemo.hasClass("checked");
        var isGeoChecked = btnFiltreGeo.hasClass("checked");
        var isDendroChecked = btnFiltreDendro.hasClass("checked");

        if (isPyroChecked) btnFiltrePyro.click();
        if (isCryoChecked) btnFiltreCryo.click();
        if (isElectroChecked) btnFiltreElectro.click();
        if (isHydroChecked) btnFiltreHydro.click();
        if (isAnemoChecked) btnFiltreAnemo.click();
        if (isGeoChecked) btnFiltreGeo.click();
        if (isDendroChecked) btnFiltreDendro.click();

        btnElements.addClass("checked")
        storage.setItem(btnElements[0].id, "checked");
    }
    else {
        btnElements.removeClass("checked")
        storage.removeItem(btnElements[0].id, "checked");
    }
})
btnFiltrePyro.click(function () {
    InverseSelection(btnFiltrePyro, btnElements, null)
    manageElementsFilters();
})
btnFiltreCryo.click(function () {
    InverseSelection(btnFiltreCryo, btnElements, null)
    manageElementsFilters();
})
btnFiltreElectro.click(function () {
    InverseSelection(btnFiltreElectro, btnElements, null)
    manageElementsFilters();
})
btnFiltreHydro.click(function () {
    InverseSelection(btnFiltreHydro, btnElements, null)
    manageElementsFilters();
})
btnFiltreGeo.click(function () {
    InverseSelection(btnFiltreGeo, btnElements, null)
    manageElementsFilters();
})
btnFiltreAnemo.click(function () {
    InverseSelection(btnFiltreAnemo, btnElements, null)
    manageElementsFilters();
})
btnFiltreDendro.click(function () {
    InverseSelection(btnFiltreDendro, btnElements, null)
    manageElementsFilters();
})
function manageElementsFilters() {
    var isPyroChecked = btnFiltrePyro.hasClass("checked");
    var isCryoChecked = btnFiltreCryo.hasClass("checked");
    var isElectroChecked = btnFiltreElectro.hasClass("checked");
    var isHydroChecked = btnFiltreHydro.hasClass("checked");
    var isAnemoChecked = btnFiltreAnemo.hasClass("checked");
    var isGeoChecked = btnFiltreGeo.hasClass("checked");
    var isDendroChecked = btnFiltreDendro.hasClass("checked");

    if (isPyroChecked && isCryoChecked && isElectroChecked && isHydroChecked 
        && isAnemoChecked && isGeoChecked && isDendroChecked) {
        btnFiltrePyro.click();
        btnFiltreCryo.click();
        btnFiltreElectro.click();
        btnFiltreHydro.click();
        btnFiltreAnemo.click();
        btnFiltreGeo.click();
        btnFiltreDendro.click();
        btnElements.click();
    }
}
//#endregion
//#region Filtre Armes
btnFiltreArmes.click(function () {
    var isChecked = btnFiltreArmes.hasClass("checked");
    if (!isChecked) {
        var isEpeeChecked = btnFiltreEpee.hasClass("checked");
        var isArcChecked = btnFiltreArc.hasClass("checked");
        var isLanceChecked = btnFiltreLance.hasClass("checked");
        var isClaymoreChecked = btnFiltreClaymore.hasClass("checked");
        var isCatalysteChecked = btnFiltreCatalyste.hasClass("checked");

        if (isEpeeChecked) btnFiltreEpee.click();
        if (isArcChecked) btnFiltreArc.click();
        if (isLanceChecked) btnFiltreLance.click();
        if (isClaymoreChecked) btnFiltreClaymore.click();
        if (isCatalysteChecked) btnFiltreCatalyste.click();

        btnFiltreArmes.addClass("checked")
        storage.setItem(btnFiltreArmes[0].id, "checked");
    }
    else {
        btnFiltreArmes.removeClass("checked")
        storage.removeItem(btnFiltreArmes[0].id, "checked");
    }
})
btnFiltreEpee.click(function () {
    InverseSelection(btnFiltreEpee, btnFiltreArmes, null)
    manageArmesFilters();
})
btnFiltreArc.click(function () {
    InverseSelection(btnFiltreArc, btnFiltreArmes, null)
    manageArmesFilters();
})
btnFiltreLance.click(function () {
    InverseSelection(btnFiltreLance, btnFiltreArmes, null)
    manageArmesFilters();
})
btnFiltreClaymore.click(function () {
    InverseSelection(btnFiltreClaymore, btnFiltreArmes, null)
    manageArmesFilters();
})
btnFiltreCatalyste.click(function () {
    InverseSelection(btnFiltreCatalyste, btnFiltreArmes, null)
    manageArmesFilters();
})
function manageArmesFilters() {
    var isEpeeChecked = btnFiltreEpee.hasClass("checked");
    var isArcChecked = btnFiltreArc.hasClass("checked");
    var isLanceChecked = btnFiltreLance.hasClass("checked");
    var isClaymoreChecked = btnFiltreClaymore.hasClass("checked");
    var isCatalysteChecked = btnFiltreCatalyste.hasClass("checked");

    if (isEpeeChecked && isArcChecked && isLanceChecked && isClaymoreChecked && isCatalysteChecked) {
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
btnFiltreEtoile.click(function () {
    InverseSelection(btnFiltreEtoile, btnFiltreEtoilesCinq, btnFiltreEtoilesQuatre)
})
btnFiltreEtoilesCinq.click(function () {
    InverseSelection(btnFiltreEtoilesCinq, btnFiltreEtoile, btnFiltreEtoilesQuatre)
})
btnFiltreEtoilesQuatre.click(function () {
    InverseSelection(btnFiltreEtoilesQuatre, btnFiltreEtoile, btnFiltreEtoilesCinq)
})
//#endregion
//#region Filtre Sex
btnFiltreSex.click(function (){
    InverseSelection(btnFiltreSex, btnFiltreFemale, btnFiltreMale)
})
btnFiltreFemale.click(function () {
    InverseSelection(btnFiltreFemale, btnFiltreSex, btnFiltreMale)
})
btnFiltreMale.click(function () {
    InverseSelection(btnFiltreMale, btnFiltreSex, btnFiltreFemale)
})
//#endregion
function InverseSelection(self, mainFiltre, otherFiltre) {
    var isChecked = self.hasClass("checked");
    if (!isChecked) {
        self.addClass("checked")
        storage.setItem(self[0].id, "checked");

        if (mainFiltre.hasClass("checked")) mainFiltre.click();
        if (otherFiltre != null && otherFiltre.hasClass("checked")) otherFiltre.click();
    }
    else {
        self.removeClass("checked")
        storage.removeItem(self[0].id, "checked");
    }
}