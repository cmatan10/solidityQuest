/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
import React, { useState, useRef, useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button, Container, Card, CardBody, CardTitle } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components';

const Game4 = () => {
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [isHintVisible, setIsHintVisible] = useState(false);

  const hintLink = 'https://docs.soliditylang.org/en/v0.8.10/contracts.html?highlight=fallback#receive-ether-function';

  const toggleHint = () => {
    setIsHintVisible(!isHintVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!walletAddress || !nftContract) {
        return;
      }
      const balance = await nftContract.methods.balanceOf(walletAddress, 4).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(4).send({
        from: walletAddress,
      });

      const deployInstanceEvent = receipt.events.DeployInstance;
      if (deployInstanceEvent) {
        setInstanceAddress(deployInstanceEvent.returnValues.Instance);
        toast.success('Game created successfully!');
      } else {
        toast.error('Game creation failed.');
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error(`Game creation failed. 
      Please make sure That your Metamask wallet is properly connected.`);
    }
  };

  const checkPayableGame = async () => {
    const bal = await web3.eth.getBalance(InstanceAddress);
    if (bal === 1) {
      toast('Well done! You have solved this level!', {
        autoClose: 5000,
      });
    }
    if (TokenBalance < 1) {
      try {
        await nftContract.methods.mint(4, InstanceAddress).send({
          from: walletAddress,
        })
          .once('error', (err) => {
            console.log(err);
            toast.error('Minting failed.');
          })
          .once('receipt', async () => {
            const balance = await nftContract.methods.balanceOf(walletAddress, 4).call();
            setTokenBalance(balance);
            console.log(balance);
            toast.success('Minting completed successfully!');
          });
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const code = `// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.10;
    
    contract PayableContract {
    
        receive() external payable {
            require(msg.value == 1 wei, "Incorrect amount received");
        }
    }`;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />
        <h1 className="game-title title-color"><b>Payable Contract</b></h1>
        <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>

          <CardBody>
            <div style={{ position: 'relative' }}>
              <CopyToClipboard text={code}>
                <Button className="button-copy">
                  Copy code
                </Button>
              </CopyToClipboard>
              <SyntaxHighlighter language="javascript" style={a11yDark} ref={codeRef}>
                {code}
              </SyntaxHighlighter>
            </div>
          </CardBody>
        </Card>

        <Card className="game-card" style={{ backgroundColor: '#000000', color: 'white' }}>
          <CardBody>
            <CardTitle className="desc-title title-color"><b>Game Description</b></CardTitle>
            <p><b>Dive into the receive function in Solidity. Learn and ensure smooth interactions.</b>
              <br /><br />
              <b><strong> You need:</strong>  To accomplish this task, you need to understand the receive function in Solidity, its purpose, when it's triggered, and how to interact with it by sending Ether to the contract. </b>
            </p>
            <div>
              <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="button" onClick={createGame}>
                Create Instance
              </Button>
            </div>

          </CardBody>
        </Card>

        {!isLoading && InstanceAddress !== '' && (
          <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>
            <CardBody>
              <h3 className="desc-title title-color"><b>Your Test Address:</b></h3>
              <p style={{ wordBreak: 'break-all' }} className="Instance-color"> {InstanceAddress} </p>
              <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="button" onClick={toggleHint}>
                {isHintVisible ? 'Hide Hint' : 'Show Hint'}
              </Button>
              <br />
              <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="button" onClick={checkPayableGame}>
                Submit
              </Button>
            </CardBody>
          </Card>
        )}
        {isHintVisible && (
          <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>
            <CardBody>
              <CardTitle className="desc-title title-color"><b>Hint</b></CardTitle>
              <p>
                <strong>Interact with the contract using Remix, and remember that the receive function is executed by calling the contract with empty call data.
                  This is the function that is executed on plain Ether transfers.
                  You Can Read More
                </strong> <a style={{ textDecoration: 'underline' }} href={hintLink} target="_blank" rel="noopener noreferrer"><strong>Here</strong></a>.
              </p>
            </CardBody>
          </Card>
        )}
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {TokenBalance < 1 ? null : (
            <div>

              <strong>
                Congratulations! You Got A Badge{' '}
                <i className="fas fa-medal" style={{ color: 'gold', fontSize: '20px', position: 'relative', top: '3px' }} />
              </strong>
            </div>
          )}
        </p>
      </Container>

      <ToastContainer />

    </>
  );
};

export default Game4;
