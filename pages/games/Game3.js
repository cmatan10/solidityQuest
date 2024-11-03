/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
import React, { useState, useRef, useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button, Container, Card, CardBody, CardTitle, FormGroup, Input } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import InstanceABI from '../../interfaces/BalanceChecker.json';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components';

const Game3 = () => {
  const [_account, setAccount] = useState('');
  const [_amount, setAmount] = useState('');
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [instanceContract, setInstanceContract] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const hintLink = 'https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html?highlight=balance#getbalance';
  const [correctBalanceChecked1, setCorrectBalanceChecked] = useState(null);

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
      const balance = await nftContract.methods.balanceOf(walletAddress, 3).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(3).send({
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

  const checkBalance = async (_account, _amount) => {
    if (!web3.utils.isAddress(_account)) {
      alert('Invalid Ethereum address!');
      return;
    }

    if (instanceContract) {
      try {
        await instanceContract.methods.checkBalance(_account, _amount).send({
          from: walletAddress,
        }).then(async () => {
          console.log('The Mission Is Complete');
          toast('Well done! You have solved this level!', {
            autoClose: 5000,
          });
          if (TokenBalance < 1) {
            console.log(TokenBalance);
            try {
              await nftContract.methods.mint(3, InstanceAddress).send({
                from: walletAddress,
              })
                .once('error', (err) => {
                  console.log(err);
                  toast.error('Minting failed.');
                })
                .once('receipt', async () => {
                  const balance = await nftContract.methods.balanceOf(walletAddress, 3).call();
                  setTokenBalance(balance);
                  console.log(balance);
                  toast.success('Minting completed successfully!');
                });
            } catch (err) {
              console.error(err.message);
              toast.error('Minting failed.');
            }
          }
        });
      } catch (err) {
        console.log(err);
        toast.error('Checking balance failed.');
      }
    }
  };

  const correctBalanceChecked = async () => {
    const balanceChecked = await instanceContract.methods.correctBalanceChecked().call();
    console.log(balanceChecked);
    setCorrectBalanceChecked(balanceChecked);
  };

  const code = `// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.10;
    
    contract BalanceChecker {
        bool public correctBalanceChecked = false;
    
        function checkBalance(address _account, uint256 _amount) public {
            require(_account.balance == _amount, "Incorrect balance");
            correctBalanceChecked = true;
        }
    }`;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />
        <h1 className="game-title title-color"><b>Balance Checker</b></h1>
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
            <p><b>Perfect the art of balance verification in Solidity. Convert and ensure digital wallet balances align.</b>
              <br /><br />
              <b><strong> You need:</strong> To solve this puzzle, you need to know how to check Ethereum account balances in Solidity and how to convert balances between Ether and Wei. </b>
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
                  <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => correctBalanceChecked()}>
                    correctBalanceChecked
                  </Button>
                  {correctBalanceChecked1 !== null
                    && (
                    <p style={{ marginLeft: '10px' }}>
                      {correctBalanceChecked1.toString()}
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
                        <strong>Check how to Get the balance of an address at a given block. </strong>
                        <a style={{ textDecoration: 'underline' }} href={hintLink} target="_blank" rel="noopener noreferrer"><strong>Here</strong></a>.
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
                    placeholder="_account"
                    type="text"
                    onChange={(e) => setAccount(e.target.value)}
                  />
                  <br />
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="_amount"
                    type="text"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </FormGroup>
                <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => checkBalance(_account, _amount)}>
                  checkBalance
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

export default Game3;
