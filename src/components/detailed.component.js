import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function DetailedComponent() {
  const value = { companyName: useSelector((state) => state.CompanyName) };

  const [detailsCompany, setDetails] = useState({
    name: null,
    price: null,
    PE: null,
    EPS: null,
  });

  useEffect(() => {
    axios
      .post("http://localhost:8080/companyDetails", value)
      .then(async (resp) => {
        try {
          console.log(resp.data.Name);
          setDetails((prevValue) => {
            return {
              name: resp.data.Name,
              price: resp.data.close,
              PE: resp.data.PERatio,
              EPS: resp.data.EPSEstimateCurrentYear,
            };
          });
        } catch {}
      });
  }, []);

  return (
    <div>
      <h1>Dashboard Stock</h1>

      <div>
        <h5>CORPORATE INFO</h5>
        <div>
          <p>CompanyName: {detailsCompany.name}</p>
        </div>
      </div>
      <div>
        <h5>MARKET VALUE</h5>
        <div>
          <p>Price: {detailsCompany.price}</p>
        </div>
      </div>
      <div>
        <h5>VALUATION</h5>
        <div>
          <p>P/E: {detailsCompany.PE}</p>
        </div>
      </div>
      <div>
        <h5>Growth</h5>
        <div>
          <p>EPS: {detailsCompany.EPS} </p>
        </div>
      </div>
      <div className="element">
        <h4>Candle Stick Graph</h4>
      </div>
    </div>
  );
}

export default DetailedComponent;
