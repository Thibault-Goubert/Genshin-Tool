
CreateList() 

function CreateList(){
    console.log("creating");
    var charactersList = document.getElementById("myModal-gestion_personnages-content-all_list");
    
    var nav = document.getElementById("myModal-gestion_personnages-content-all_list-nav");
    var list = document.getElementById("myModal-gestion_personnages-content-all_list-ul");

    $.each(characters['Characters'], function (idx, char) {
        var li = document.createElement("li");
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(char.name));
        li.appendChild(div);
        list.appendChild(li);
    })

    nav.appendChild(list);
    charactersList.appendChild(nav);

    console.log("created");
}


