/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
import React, { useState, useRef, useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button, Container, Card, CardBody, CardTitle, FormGroup, Input } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import InstanceABI from '../../interfaces/Overflow.json';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components';

const Game8 = () => {
  const [value, setvalue] = useState('');
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [instanceContract, setInstanceContract] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [counterValue, setCounterValue] = useState(null);
  const [overflowOccurredValue, setOverflowOccurredValue] = useState(null);
  const hintLink = 'https://docs.soliditylang.org/en/latest/080-breaking-changes.html#silent-changes-of-the-semantics';

  const toggleHint = () => {
    setIsHintVisible(!isHintVisible);
  };
  useEffect(() => {
    if (web3 && web3.utils.isAddress(InstanceAddress)) {
      setInstanceContract(new web3.eth.Contract(InstanceABI, InstanceAddress));
    }
  }, [InstanceAddress, web3]);

  useEffect(() => {
    const fetchData = async () => {
      if (!walletAddress || !nftContract) {
        return;
      }
      const balance = await nftContract.methods.balanceOf(walletAddress, 8).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(8).send({
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
      Please make sure:
-That your Metamask wallet is properly connected.`);
    }
  };

  const add = async (value) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(value))) {
      alert('Invalid input! Please enter a number.');
      return;
    }
    if (instanceContract) {
      try {
        await instanceContract.methods.add(Number(value)).send({
          from: walletAddress,
        }).then(async () => {
          const count = Number(await instanceContract.methods.counter().call());
          console.log(count);
          if (count === 3) {
            console.log('The Mission Is Complete');
            toast('Well done! You have solved this level!', {
              autoClose: 5000,
            });
            console.log(TokenBalance);
            if (TokenBalance < 1) {
              try {
                await nftContract.methods.mint(8, InstanceAddress).send({
                  from: walletAddress,
                })
                  .once('error', (err) => {
                    console.log(err);
                    toast.error('Minting failed.');
                  })
                  .once('receipt', async () => {
                    const balance = await nftContract.methods.balanceOf(walletAddress, 8).call();
                    setTokenBalance(balance);
                    console.log(balance);
                    toast.success('Minting completed successfully!');
                  });
              } catch (err) {
                console.error(err.message);
                toast.error('Minting failed.');
              }
            }
          }
        });
      } catch (err) {
        console.error(err);
        toast.error('Add operation failed.');
      }
    }
  };
  const counter = async () => {
    if (instanceContract) {
      const counter = await instanceContract.methods.counter().call();
      setCounterValue(counter.toString());
      console.log(counter.toString());
    }
  };

  const overflowOccurred = async () => {
    if (instanceContract) {
      const overflowOccurred = await instanceContract.methods.overflowOccurred().call();
      setOverflowOccurredValue(overflowOccurred);
      console.log(overflowOccurred);
    }
  };
  const code = `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.10;
  
  contract Overflow {
      uint256 public counter = type(uint256).max - 3;
      bool public overflowOccurred = false;
  
      function add(uint256 value) external {
          unchecked {
              counter += value;
              if (counter == 3) {
                  overflowOccurred = true;
              }
          }
      }
  }`;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />
        <h1 className="game-title title-color"><b>Overflow</b></h1>
        <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>

          <CardBody>
            <div className="code-section">
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
            <p><b>Take on the overflow challenge in Solidity. Navigate and master numeric manipulations.</b>
              <br /><br />
              <b><strong> You need:</strong> To solve this puzzle, you need to understand the concept of integer overflow and underflow, how the 'unchecked' keyword works in Solidity ^0.8.0, and how to induce an overflow situation. </b>
            </p>
            <div>
              <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="button-margin" onClick={createGame}>
                Create Instance
              </Button>
            </div>
          </CardBody>
        </Card>

        {!isLoading && InstanceAddress !== '' && (
          <>
            <Card className="game-card" style={{ backgroundColor: '#000000', color: 'white', minHeight: '150px' }}>
              <CardBody>
                <CardTitle className="desc-title title-color"><b>State Variables</b></CardTitle>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => counter()}>
                    counter
                  </Button>
                  {counterValue !== null && <p style={{ wordBreak: 'break-all' }}>{counterValue}</p>}
                </div>
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => overflowOccurred()}>
                    overflowOccurred
                  </Button>
                  {overflowOccurredValue !== null
                    && (
                    <p style={{ marginLeft: '10px' }}>
                      {overflowOccurredValue ? 'True' : 'False'}
                    </p>
                    )}

                </div>
                <br />
                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={toggleHint}>
                  {isHintVisible ? 'Hide Hint' : 'Show Hint'}
                </Button>
                {isHintVisible && (
                  <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>
                    <CardBody>
                      <CardTitle className="desc-title title-color"><b>Hint</b></CardTitle>
                      <p>
                        <strong>
                          <a style={{ textDecoration: 'underline' }} href={hintLink} target="_blank" rel="noopener noreferrer"> https://docs.soliditylang.org/en/latest/080-breaking-changes.html#silent-changes-of-the-semantics</a>
                        </strong>
                      </p>
                    </CardBody>
                  </Card>
                )}
              </CardBody>
            </Card>

            <Card className="game-card" style={{ backgroundColor: '#000000', color: 'white' }}>
              <CardBody>
                <h3 className="desc-title title-color"><b>Your Test Address:</b></h3>
                <p style={{ wordBreak: 'break-all' }} className="Instance-color"> {InstanceAddress} </p>
                <FormGroup>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="value"
                    type="text"
                    onChange={(e) => setvalue(e.target.value)}
                  />
                </FormGroup>
                <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => add(value)}>
                  add
                </Button>
              </CardBody>
            </Card>
          </>
        )}

        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {TokenBalance < 1 ? null : (
            <div>

              <strong>
                Congratulations! You Got A Badge{' '}
                <i className="fas fa-medal" style={{ color: 'gold', fontSize: '20px', position: 'relative', top: '3px' }} />
              </strong>
              <br /><br />
            </div>
          )}
        </p>
      </Container>

      <ToastContainer />

    </>
  );
};

export default Game8;
