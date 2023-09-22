async function fetchAndDisplayData() {
  try {
    const response = await fetch("http://localhost:2000/api/fetchDataDB");
    const data = await response.json();

    const tickerDataDiv = document.getElementById("tickerData");
    tickerDataDiv.innerHTML = ""; 

    data.forEach((ticker, index) => {
      const difference = ((parseFloat(ticker.sell) - parseFloat(ticker.last)) / parseFloat(ticker.last)) * 100;
      const savings = parseFloat(ticker.buy) - parseFloat(ticker.last);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${ticker.name}</td>
        <td>${ticker.last}</td>
        <td>${ticker.buy} / ${ticker.sell}</td>
        <td>${difference.toFixed(2)}%</td>
        <td>₹ -</td>
      `;
      tickerDataDiv.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching and displaying data:", error);
  }
}

fetchAndDisplayData();

setInterval(fetchAndDisplayData, 60000);
