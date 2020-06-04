function populateUFs () {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufselect.innerHTML += ` <option value="${state.id}">${state.nome}</option>`   
        }    
    } )
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        

        for( const city of cities ) {
            citySelect.innerHTML += ` <option value="${city.nome}">${city.nome}</option>`   
        }    

        citySelect.disabled = false

    } ) 
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta
// Pega todos os Li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)

}

const collectedItems = document.querySelector("input[name=items]")


let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // Class List = Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    

    // Verificar se existem itens seleciontados, se sim
    // Pegar os itens selectionados

    const alreadySeletec = selectedItems.findIndex( item => {
        const itemFound = item == itemId // Isso será true ou false
        return itemFound
    })

    // Se já estiver selecionado, tirar da seleção

    if ( alreadySeletec >= 0 ) {
        // Tirar da selecão

        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else {
        
    // Se não estiver selecionado
    // Adicionar à seleção
    selectedItems.push(itemId)

    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}
