import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../dashboard.css";
import CandleStick from "./subcomponent/CandleStick";
import Cards from "./subcomponent/CardBox.js";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function DetailedComponent() {
  const history = useHistory();
  const value = { companyName: useSelector((state) => state.link.CompanyName) };

  const [detailsCompany, setDetails] = useState({
    name: null,
    price: null,
    PE: null,
    EPS: null,
  });

  const [titleType, setTitle] = useState([
    "Corporate Info",
    "Company Profile",
    "Profitablity",
    "Growth",
  ]);

  const [activeCard, setActiveCard] = useState("Corporate Info");

  const [clickedState, setClickedState] = useState({
    firstInfo: "",
    secondInfo: "",
    thirdInfo: "",
    fourthInfo: "",
  });

  console.log(clickedState);

  const [fullData, setAllData] = useState({
    values: [{ Name: "Ticker" }],
  });

  function Corporate() {
    return (
      <div>
        <h6>Corporate Info: {clickedState.firstInfo}</h6>
        <h6>Corporate Executive: {clickedState.secondInfo}</h6>
        <h6>Market Cap: ${clickedState.thirdInfo}</h6>
      </div>
    );
  }

  function CompanyProfile() {
    return (
      <div>
        <h6>Price: ${clickedState.firstInfo}</h6>
        <h6>P/E: {clickedState.secondInfo}</h6>
        <h6>P/B: {clickedState.thirdInfo}</h6>
        <h6>P/S: {clickedState.fourthInfo}</h6>
      </div>
    );
  }

  function Profitablity() {
    return (
      <div>
        <h6>EBITDA: ${clickedState.firstInfo}</h6>
        <h6>Profit Margin: {clickedState.secondInfo}</h6>
        <h6>ROE : {clickedState.thirdInfo}</h6>
        <h6>ROA : {clickedState.fourthInfo}</h6>
      </div>
    );
  }

  function Growth() {
    return (
      <div>
        <h6>EPS Growth: {clickedState.firstInfo}</h6>

        <h6>Revenue Growth: {clickedState.secondInfo}</h6>
        <h6>Div Yield Growth: {clickedState.thirdInfo}</h6>
      </div>
    );
  }

  useEffect(() => {
    axios
      .post("https://stockmarketbackend.uc.r.appspot.com/companyDetails", value)
      .then(async (resp) => {
        try {
          console.log(resp.data.Name);
          setDetails((prevValue) => {
            return {
              name: resp.data.CompanyName,
              price: resp.data.close,
              EBITDA: resp.data.EBITDA,
              EPS: resp.data.EPSEstimateCurrentYear,
            };
          });
          setClickedState((prevValue) => {
            return {
              firstInfo: resp.data.Description,

              secondInfo: resp.data.CorporateExecutive,
              thirdInfo: resp.data.MarketCapitalizationMln,
            };
          });

          setAllData({ values: await resp.data });
        } catch {}
      });

    const getData = async () => {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://eodhistoricaldata.com/api/intraday/MCD.US?api_token=5f05dbbf1f59a5.46485507&interval=5m&fmt=json&from=1564752900"
      );
      const data = await response.json();
    };
    getData();
  }, []);

  useEffect(() => {
    setClickedState((preValue) => {
      return {
        firstInfo:
          activeCard === "Corporate Info"
            ? fullData.values.Description
            : activeCard === "Company Profile"
            ? fullData.values.close
            : activeCard === "Profitablity"
            ? fullData.values.EBITDA
            : fullData.values.EPSEstimateCurrentYear,
        secondInfo:
          activeCard === "Corporate Info"
            ? fullData.values.CorporateExecutive
            : activeCard === "Company Profile"
            ? fullData.values.PERatio
            : activeCard === "Profitablity"
            ? fullData.values.ProfitMargin
            : fullData.values.RevenueTTM,

        thirdInfo:
          activeCard === "Corporate Info"
            ? fullData.values.MarketCapitalizationMln
            : activeCard === "Company Profile"
            ? fullData.values.PriceBookMRQ
            : activeCard === "Profitablity"
            ? fullData.values.ReturnOnEquityTTM
            : fullData.values.DividendYield,

        fourthInfo:
          activeCard === "Corporate Info"
            ? fullData.values.MarketCapitalizationMln
            : activeCard === "Company Profile"
            ? fullData.values.PriceSalesTTM
            : activeCard === "Profitablity"
            ? fullData.values.ReturnOnAssetsTTM
            : fullData.values.DividendYield,
      };
    });
  }, [activeCard]);

  const backButton = (e) => {
    history.push("/returnedCompanies");
  };

  return (
    <div className="Screener_Dashboard">
      <h1 class="Dashboard-Stock">Dashboard Stock</h1>
      <button type="button" className="btn btn-info" onClick={backButton}>
        Back
      </button>
      <div className="dashBoard">
        <div className="dashboard_left">
          <div className="app_stats">
            {titleType.map((value, index) => (
              <Cards
                title={value}
                desc={
                  index === 0
                    ? "Name: " + detailsCompany.name
                    : index === 1
                    ? "Price: " + detailsCompany.price
                    : index === 2
                    ? "EBITDA: " + detailsCompany.EBITDA
                    : "EPS: " + detailsCompany.EPS
                }
                onClick={(e) => {
                  setActiveCard(value);
                }}
                active={activeCard}
              />
            ))}
          </div>
          <div className="description">
            <Card>
              <CardContent>
                <Typography variant="h6">More info</Typography>
                {activeCard === "Corporate Info" ? (
                  <Corporate value={clickedState} />
                ) : activeCard === "Company Profile" ? (
                  <CompanyProfile value={clickedState} />
                ) : activeCard === "Profitablity" ? (
                  <Profitablity value={clickedState} />
                ) : (
                  <Growth value={clickedState} />
                )}
              </CardContent>
            </Card>
          </div>
          <div className="dashboard_right">
            <h2>Price History</h2>
          </div>
        </div>
      </div>
      <div className="dashboard_bottom">
        <div className="dashboard_bottom_left">
          <h2> Ticker: {fullData.values.Name}</h2>
        </div>
        <div className="dashboard_bottom_right">
          <CandleStick ticker={value} />
        </div>
      </div>
    </div>
  );
}

export default DetailedComponent;
