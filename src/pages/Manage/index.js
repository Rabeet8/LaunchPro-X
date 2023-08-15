import React from 'react';
import * as s from "../../styles/global";
import { useApplicationContext } from '../../context/applicationContext';
import Greetings from './Greetings';
import { Web3Status } from '../../components/Web3Status';
import Settings from './Settings';

export default function Manage() {
  const {
    isAdmin,
    // isAppConfigured,
    domainSettings,
  } = useApplicationContext();

  return (
    <s.Wrapper>
      <s.BodyWrapper>
        <s.ContentWrapper>
          
            <Settings />
          
          </s.ContentWrapper>
        </s.BodyWrapper>
    </s.Wrapper>
  );
}
