import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../components/AppContext/AppContext";

const Profile = () => {
  const { appUser } = useContext(AppContext);
  console.log(appUser);
  return (
    <>
      <Wrapper>
        <div>Hi {appUser.displayName}!</div>

        <div>Watchlist: {appUser.Watchlist}</div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 200px;
`;

export default Profile;
