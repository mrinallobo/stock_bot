const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const stockData = document.getElementById('stock-data');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        const results = await fetch(`/search?q=${query}`).then(res => res.json());
        displaySearchResults(results);
    }
});

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'search-result';
        div.textContent = `${result['1. symbol']} - ${result['2. name']}`;
        div.addEventListener('click', async () => {
            const stockSymbol = result['1. symbol'];
            const stockInfo = await fetch(`/stock/${stockSymbol}`).then(res => res.json());
            displayStockData(stockSymbol, stockInfo);
        });
        searchResults.appendChild(div);
    });
}

function displayStockData(symbol, stockInfo) {
    stockData.innerHTML = `<h2>${symbol}</h2>`;
    const ul = document.createElement('ul');
    Object.entries(stockInfo).forEach(([date, data]) => {
        const li = document.createElement('li');
        li.textContent = `${date}: Open - ${data['1. open']}, High - ${data['2. high']}, Low - ${data['3. low']}, Close - ${data['4. close']}, Volume - ${data['5. volume']}`;
        ul.appendChild(li);
    });
    stockData.appendChild(ul);
}
