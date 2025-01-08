import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [arbitrageOpportunities, setArbitrageOpportunities] = useState([]);

  useEffect(() => {
    const fetchArbitrage = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/arbitrage");
        setArbitrageOpportunities(response.data);
      } catch (error) {
        console.error("Error fetching arbitrage data:", error);
      }
    };

    fetchArbitrage();
  }, []);

  return (
    <div>
      <h1>CEX/DEX Arbitrage Scanner</h1>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Opportunity</th>
          </tr>
        </thead>
        <tbody>
          {arbitrageOpportunities.map((opportunity, index) => (
            <tr key={index}>
              <td>{opportunity.token}</td>
              <td>{opportunity.opportunity.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
