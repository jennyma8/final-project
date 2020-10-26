import React from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext/AppContext";

require("dotenv").config();
const apiKey = process.env.REACT_APP_NEWS_API;

const FX = () => {
  const [data, setdata] = React.useState();

  React.useEffect(() => {
    //FX

    fetch(
      `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=USD&to_symbol=CAD&interval=1min&apikey=${apiKey}`
    )
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          //   console.log(data);
          setdata(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }, []);

  if (!data) {
    return <h1>loading</h1>;
  }

  //format: array of object
  return (
    <>
      <Wrapper>
        <h1>Exchange Rate</h1>
        <div>From:{data["Meta Data"]["2. From Symbol"]}</div>
        <div>To:{data["Meta Data"]["3. To Symbol"]}</div>
        <div>
          Conversion:
          <strong>
            {Object.entries(data["Time Series FX (1min)"])[0][1]["4. close"]}
          </strong>
        </div>
      </Wrapper>
      <div>Please note regarding limited access. {data.Note}</div>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 100px;
  border-right: 1px solid lightgrey;
`;
export default FX;