import React, { useState } from 'react'
import 'antd/dist/antd.css';
//import { gql } from "apollo-boost";
import { ethers } from "ethers";
//import { useQuery } from "@apollo/react-hooks";
import "./App.css";
import { Row, Col } from 'antd';
import { useExchangePrice, useGasPrice, useContractLoader } from "./hooks"
import { Header, Account, Provider, Faucet, Ramp, Contract, TokenBalance } from "./components"
import  DEX from "./DEX.js"

const mainnetProvider = new ethers.providers.InfuraProvider("mainnet","2717afb6bf164045b5d5468031b93f87")
const localProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER?process.env.REACT_APP_PROVIDER:"http://localhost:8545")
const teamsProvider = new ethers.providers.JsonRpcProvider("https://sandbox.truffleteams.com/9c737c5a-60e2-4d1a-bf1c-a3466a631ebf")
const harmonyProvider = new ethers.providers.JsonRpcProvider("https://api.s0.p.hmny.io/")

function App() {

  const [address, setAddress] = useState();
  const [injectedProvider, setInjectedProvider] = useState();
  const price = useExchangePrice(mainnetProvider)
  const gasPrice = useGasPrice("fast")
  // const readContracts = useContractLoader(localProvider);
  // const readContracts = useContractLoader(teamsProvider);
  const readContracts = useContractLoader(harmonyProvider);

  return (
    <div className="App">
      <Header />
      <div style={{position:'fixed',textAlign:'right',right:0,top:0,padding:10}}>
        <Account
          address={address}
          setAddress={setAddress}
          localProvider={harmonyProvider}
          injectedProvider={injectedProvider}
          setInjectedProvider={setInjectedProvider}
          mainnetProvider={mainnetProvider}
          price={price}
        />
        <TokenBalance name={"Balloons"} img={"🎈"} address={address} contracts={readContracts} />
      </div>

      {/* <Contract
        name={"DEX"}
        provider={injectedProvider}
        address={address}
      /> */}

      <DEX
        address={address}
        injectedProvider={injectedProvider}
        localProvider={harmonyProvider}
        mainnetProvider={mainnetProvider}
        readContracts={readContracts}
        price={price}
      />

      <Contract
        name={"Balloons"}
        provider={injectedProvider}
        address={address}
      />


      <div style={{position:'fixed',textAlign:'right',right:0,bottom:20,padding:10}}>
        <Row align="middle" gutter={4}>
          <Col span={10}>
            <Provider name={"mainnet"} provider={mainnetProvider} />
          </Col>
          <Col span={6}>
            <Provider name={"local"} provider={localProvider} />
          </Col>
          <Col span={8}>
            <Provider name={"injected"} provider={injectedProvider} />
          </Col>
        </Row>
      </div>
      <div style={{position:'fixed',textAlign:'left',left:0,bottom:20,padding:10}}>
        <Row align="middle" gutter={4}>
          <Col span={9}>
            <Ramp
              price={price}
              address={address}
            />
          </Col>
          <Col span={15}>
            <Faucet
              localProvider={harmonyProvider}
              dollarMultiplier={price}
            />
          </Col>
        </Row>


      </div>

    </div>
  );
}

export default App;
