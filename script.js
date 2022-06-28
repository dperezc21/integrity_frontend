

async function getStocks() {
    try {
        const response = await fetch('http://localhost:3000/getStocks');
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}
async function updateStock(symbol) {
    try {
        const response = await fetch('http://localhost:3000/updateStockPrice?symbol=' + symbol);
        const data = await response.json();
        if (data) {
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}
async function deleteStock(symbol) {
    try {
        const response = await fetch('http://localhost:3000/deleteStock?symbol=' + symbol);
        const data = await response.json();
        if (data) {
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}
async function addStock() {
    const inputSymbol = document.getElementById('inputSymbol').value
    console.log(inputSymbol)
    try {
        const response = await fetch('http://localhost:3000/addStock?symbol=' + inputSymbol);
        const data = await response.json();
        if (data) {
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}



async function addStocksView() {
    const divStocks = document.querySelector('#stocks');
    const getStock = await getStocks();
    for (const iterator of getStock) {
        if(iterator == null) continue;
        const div = document.createElement("div");
        div.className = "stock";

        const logo = document.createElement("IMG");
        const nameCompany = document.createElement('LABEL')
        const price = document.createElement('LABEL')
        const buttonDeleteStock = document.createElement('button');
        const buttonUpdateStock = document.createElement('button');

        logo.id = "logo"
        price.className = "label"
        nameCompany.className="label"

        buttonUpdateStock.addEventListener('click', async () => {
            updateStock(iterator.symbol);
        })
        buttonDeleteStock.addEventListener('click', async () => {
            deleteStock(iterator.symbol);
        })
        logo.setAttribute('src', iterator.url);
        nameCompany.innerHTML = iterator.companyName
        price.innerHTML = iterator.latestPrice
        let arrow = document.createElement("IMG")
        if (iterator.statePrice == "-") {
            price.style.color = "red"
            arrow.setAttribute("src", './img/chevron.png')
        } else if (iterator.statePrice == "+") {
            price.style.color = rgb(5, 139, 5);
            arrow.setAttribute("src", './img/up-arrow.png')
        }

        logo.setAttribute('width', '65')
        logo.setAttribute('height', '65')

        const d = document.createElement("IMG");
        const u = document.createElement("IMG");
        d.setAttribute('src', "./img/delete.png");
        u.setAttribute('src', "./img/reload.png");

        buttonDeleteStock.appendChild(d)
        buttonUpdateStock.appendChild(u)

        const divImage = document.createElement("div");
        const divNameCompany = document.createElement("div");
        const divPrice = document.createElement("div");
        const divButton = document.createElement("div");

        divImage.appendChild(logo)
        div.appendChild(divImage)

        divNameCompany.appendChild(nameCompany)
        div.appendChild(divNameCompany)

        divPrice.appendChild(price)
        divPrice.appendChild(arrow);
        div.appendChild(divPrice)

        divButton.appendChild(buttonDeleteStock)
        div.appendChild(divButton)

        divButton.appendChild(buttonUpdateStock)
        div.appendChild(divButton)

        divStocks.appendChild(div)
    }
    

}

window.onload = addStocksView()

