import React from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext/AppContext";

require("dotenv").config();
const apiKey = process.env.REACT_APP_NEWS_API;

const Homepage = () => {
  const [data, setdata] = React.useState();

  React.useEffect(() => {
    //global news

    fetch(
      `https://stocknewsapi.com/api/v1/category?section=general&items=50&token=${apiKey}`
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
          console.log(data);
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
        <h1>Global News</h1>
        {Object.values(data["data"]).map((news) => {
          return (
            <NewsContainer>
              <Title>{news.title}</Title>
              <div>{news.date}</div>
              <img src={news.image_url} alt="news"></img>

              <div>Source: {news.source_name}</div>

              <div>Summary: {news.text}</div>
              <a href={news.news_url}>Read more...</a>
            </NewsContainer>
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NewsContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: 100%;
  margin-bottom: 15px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;
export default Homepage;
