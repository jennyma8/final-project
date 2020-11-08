import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext/AppContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Spinner from "../assets/CircularSpinner";

require("dotenv").config();
const apiKeyAlpha = process.env.REACT_APP_ALPHA_API;

const Company = () => {
  const { ticker } = useContext(AppContext);

  const [companyData, setCompanyData] = React.useState();
  const [quoteData, setQuoteData] = React.useState();

  const { t } = useTranslation();

  React.useEffect(() => {
    if (ticker !== "") {
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=${apiKeyAlpha}`
      )
        .then(function (response) {
          // console.log(response);
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          // Examine the text in the response
          response.json().then(function (data) {
            console.log(data); //there's a bug here that keeps changing
            // console.log(Object.keys(data));

            setQuoteData(data);
            fetch(
              `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKeyAlpha}`
            )
              .then(function (response) {
                if (response.status !== 200) {
                  console.log(
                    "Looks like there was a problem. Status Code: " +
                      response.status
                  );
                  return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                  console.log(data);
                  setCompanyData(data);
                });
              })
              .catch(function (err) {
                console.log("Fetch Error :-S", err);
              });
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    }
  }, [ticker]);

  if (!companyData || !quoteData) {
    if (ticker === "") {
      return <></>;
    } else {
      return <Spinner />;
    }
  }

  // if (data == "") {
  //   return <></>;
  // }
  //format: object of object

  if (
    Object.keys(quoteData) == "Error Message" ||
    Object.keys(quoteData) == "Note"
  ) {
    return <h1>{t("Sorry.1")}</h1>;
  }

  return (
    <>
      <WrapperQuote>
        <div>
          {t("Symbol.1")}: {quoteData["Meta Data"]["2. Symbol"]}
        </div>
        <div>
          {t("LastPrice.1")}:{" "}
          {Object.entries(quoteData["Time Series (1min)"])[0][1]["4. close"]}
        </div>
        <div>
          {t("LastUpdate.1")}:{" "}
          {Object.entries(quoteData["Time Series (1min)"])[0][0]}
        </div>
      </WrapperQuote>
      <WrapperCompany>
        <div>
          {t("CompanyName.1")}: {companyData.Name}
        </div>
        <Desc>
          <strong>{t("Description.1")}:</strong> {companyData.Description}
        </Desc>
        <div>
          {t("ExchangePlatform.1")}: {companyData.Exchange}
        </div>
        <div>
          {t("Country.1")}: {companyData.Country}
        </div>
        <div>
          {t("Sector.1")}: {companyData.Sector}
        </div>
        <div>
          {t("Industry.1")}: {companyData.Industry}
        </div>
        <div>
          {t("Address.1")}: {companyData.Address}
        </div>
      </WrapperCompany>
    </>
  );
};

/* <div>
{Object.values(data["Time Series (5min)"]).map(([date, stockPrice]) => {
  return <div>{date}<div>Last price: {stockPrice["4. close"]}</div>;
})}
</div> */
const WrapperQuote = styled.div`
  background-color: white;
  font-size: 30px;
`;

const WrapperCompany = styled.div`
  margin-top: 20px;
  background-color: lightgrey;
`;

const Desc = styled.div`
  padding: 30px;
`;
export default Company;
