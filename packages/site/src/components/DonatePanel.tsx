import { ComponentProps, MouseEventHandler, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { MetamaskState } from '../hooks';
import { shouldDisplayReconnectButton } from '../utils';

import { ethers } from 'ethers';




// @media only screen and (max-width: 768px) {
//   #logo-container svg {
//     width: 150px;
//     height: auto;
//   }  
// }

// input[type=number]::-webkit-inner-spin-button, 
// input[type=number]::-webkit-outer-spin-button { 
//   -webkit-appearance: none; 
//   margin: 0; 
// }

const Svg = styled.svg`
  width: 250px;
  height: auto;
`

const Main = styled.div`
  width: 100%;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;

  &:focus{
    outline: 0;
  }
`
const Form = styled.form `
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Link = styled.a`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  border-radius: ${(props) => props.theme.radii.button};
  border: 1px solid ${(props) => props.theme.colors.background.inverse};
  background-color: ${(props) => props.theme.colors.background.inverse};
  color: ${(props) => props.theme.colors.text.inverse};
  text-decoration: none;
  font-weight: bold;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.background.inverse};
    color: ${(props) => props.theme.colors.text.default};
  }

  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
font-size: 12px;
  line-height: 46px;
  font-weight: 600;
  padding: 0 34px;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  min-width: 160px;
  max-width: 100%;
  border: none;
  box-sizing: border-box;
  transition: all .5s;
  position: relative;
  z-index: 2;
  background-image: linear-gradient(to right,#a722f4 0%,#7a5cff 100%);
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px; 

  &hover {
    background-image: linear-gradient(to right,#7a5cff 0%,#a722f4 100%);
  }
`;

const ButtonText = styled.span`
  margin-left: 1rem;
`;

const ConnectedContainer = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  border-radius: ${(props) => props.theme.radii.button};
  border: 1px solid ${(props) => props.theme.colors.background.inverse};
  background-color: ${(props) => props.theme.colors.background.inverse};
  color: ${(props) => props.theme.colors.text.inverse};
  font-weight: bold;
  padding: 1.2rem;
`;

const ConnectedIndicator = styled.div`
  content: ' ';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
`;

const Container = styled.div`
  width: 500px;
  display: flex;
  border: 1px solid lightgray;
  padding: 20px;
box-shadow: 0 15px 50px 0 rgba(126, 150, 173, 0.2), 0 5px 20px 0 rgba(126, 150, 173, 0.3);
  margin: 40px;
`

type DonatePanelProp = {
  handleDonateClick: MouseEventHandler<HTMLButtonElement>
};
const abi_code = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "contractBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "_toOng", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "sendToOng", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "sendViaTransfer", "outputs": [], "stateMutability": "payable", "type": "function" } ]

export const DonatePanel = ({handleDonateClick}: DonatePanelProp) => {
  const [provider, setProvider] = useState()
  const [contract, setContract] = useState()
  const [signer, setSigner] = useState()
  const [address, setAddress] = useState("0x4c55528e23E21dc99c79Ee6b4A9b1286a569E8E1")
  const [amount, setAmount] = useState()
  
  useEffect(() => {
    fetchData().catch(console.error)
  }, [])

  const fetchData = async () => {
    //Fetch
    let provider_temp = new ethers.BrowserProvider(window.ethereum, "goerli")
    let signer_temp = await provider_temp.getSigner()
    console.log(address)
    console.log(abi_code)
    console.log(signer_temp)
    let contract_temp = new ethers.Contract(address, abi_code, signer_temp)
    //format

    //Set
    setContract(contract_temp)
    setProvider(provider_temp)
    setSigner(signer_temp)

  }

  const sendTransaction = async () => {
    console.log(contract)
    let coisa = ethers.parseEther(amount)
    contract.sendViaTransfer({ value: coisa})
  } 

  
  return (
    <div>
        <title>Metamask Donation Smart</title>
        <Main>
          <Container>
            <Input type="number" onChange={(e) => {setAmount(e.target.value)}}  id="eth-value"/>
            <Button onClick={sendTransaction}>Donation</Button>
          </Container>
        </Main>
    </div>
  )
}

export const InstallFlaskButton = () => (
  <Link href="https://metamask.io/flask/" target="_blank">    
    <ButtonText>Install MetaMask Flask</ButtonText>
  </Link>
);

export const ConnectButton = (props: ComponentProps<typeof Button>) => {
  const theme = useTheme();
  return (
    <Button {...props}>
      <MetaMaskFox />
      <ButtonText>Connect</ButtonText>
    </Button>
  );
};

export const ReconnectButton = (props: ComponentProps<typeof Button>) => {
  const theme = useTheme();
  return (
    <Button {...props}>
      <MetaMaskFox />
      <ButtonText>Reconnect</ButtonText>
    </Button>
  );
};

export const SendHelloButton = (props: ComponentProps<typeof Button>) => {
  return <Button {...props}>Send message</Button>;
};

export const HeaderButtons = ({
  state,
  onConnectClick,
}: {
  state: MetamaskState;
  onConnectClick(): unknown;
}) => {
  if (!state.isFlask && !state.installedSnap) {
    return <InstallFlaskButton />;
  }

  if (!state.installedSnap) {
    return <ConnectButton onClick={onConnectClick} />;
  }

  if (shouldDisplayReconnectButton(state.installedSnap)) {
    return <ReconnectButton onClick={onConnectClick} />;
  }

  return (
    <ConnectedContainer>
      <ConnectedIndicator />
      <ButtonText>Connected</ButtonText>
    </ConnectedContainer>
  );
};
