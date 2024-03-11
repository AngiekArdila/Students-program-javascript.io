function createCard(dataDic){//pass a dictionary to a card
    let cardHTMl = `
    <div class="col">
        <div class="card">
            <div class="card-body">
                
    `;

    for(let key in dataDic){
        if(key === "id"){
            cardHTMl += `<h5 class="card-title">ID: ${dataDic["id"]}</h5>
            <ul class="list-group">`;
        }
        else{
            cardHTMl += `<li class="list-group-item">${key.replaceAll("_"," ")}: ${dataDic[key]}</li>`;
        }
    }

    cardHTMl += `
                </ul>
            </div>
        </div>
    </div>
    `;
    return cardHTMl;
}