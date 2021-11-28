import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MyWalletLogo } from '../assets/images/logo.svg';

const Logo = () => <LogoIcon />;

const LogoIcon = styled(MyWalletLogo)`
  height: 100px;
  width: 300px;
  fill: #fff;
`;

export default Logo;
