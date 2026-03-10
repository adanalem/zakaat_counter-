function calculatezakat() {
    const goldPrice = parseFloat(document.getElementById('gold_price').value) || 0;
    const silverPrice = parseFloat(document.getElementById('silver_price').value) || 0;
    const goldWeight = parseFloat(document.getElementById('gold_weight').value) || 0;
    const silverWeight = parseFloat(document.getElementById('silver_weight').value) || 0;
    const cash = parseFloat(document.getElementById('cash_assets').value) || 0;
    const receivables = parseFloat(document.getElementById('receivables').value) || 0;
    const debts = parseFloat(document.getElementById('debts').value) || 0;

    const resultDiv = document.getElementById('zakaat_amount');
    
    // Total Value Calculation
    let netWealth = (goldWeight * goldPrice) + (silverWeight * silverPrice) + cash + receivables - debts;
    
    // Nisab Thresholds
    let goldNisab = 7.5; // Tola
    let silverNisabValue = 52.5 * silverPrice; // Silver Nisab in PKR

    let isEligible = false;

    // --- NEW LOGIC START ---
    // Agar sirf sona hai (no cash, no silver)
    if (silverWeight === 0 && cash === 0 && receivables === 0) {
        if (goldWeight >= goldNisab) {
            isEligible = true;
        }
    } 
    // Agar assets mix hain (sona + cash/chandi)
    else {
        if (netWealth >= silverNisabValue) {
            isEligible = true;
        }
    }
    // --- NEW LOGIC END ---

    resultDiv.style.display = "block";
    resultDiv.className = "mt-8 p-6 rounded-[1.5rem] text-center border-2 border-dashed"; // Reset classes

    if (isEligible && netWealth > 0) {
        let zakatAmount = netWealth * 0.025;
        resultDiv.classList.add('bg-emerald-100', 'text-emerald-900', 'border-emerald-300');
        resultDiv.innerHTML = `
            <p class="text-xs uppercase font-bold text-emerald-600">Net Zakatable Wealth: Rs. ${Math.round(netWealth).toLocaleString()}</p>
            <p class="text-3xl mt-1">Rs. ${Math.round(zakatAmount).toLocaleString()}</p>
            <p class="text-[10px] font-normal mt-2 italic">Zakaat is 2.5% of your total net assets.</p>
        `;
    } else {
        resultDiv.classList.add('bg-red-100', 'text-red-900', 'border-red-300');
        resultDiv.innerHTML = `
            <p class="font-bold">Not Applicable</p>
            <p class="text-xs font-normal">Aapka maal Nisab se kam hai.</p>
        `;
    }
}