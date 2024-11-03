/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
import React, { useState, useRef, useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button, Container, Card, CardBody, CardTitle, FormGroup, Input } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import InstanceABI from '../../interfaces/ChangePassword.json';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components';

const Game7 = () => {
  const [_password, setPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [instanceContract, setInstanceContract] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [PreviousPasswordState, setPreviousPasswordState] = useState(false);
  const [previousPasswordValue, setPreviousPasswordValue] = useState(null);
  const hintLink = 'https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html?highlight=getStorageAt#getstorageat';

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
      const balance = await nftContract.methods.balanceOf(walletAddress, 7).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(7).send({
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

  const changePassword = async (_password, newPassword) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(_password)) || isNaN(Number(newPassword))) {
      setTimeout(() => alert('Invalid password!'), 0);
      return;
    }

    if (instanceContract) {
      try {
        await instanceContract.methods.changePassword(_password, newPassword).send({
          from: walletAddress,
        }).then(async () => {
          console.log('The Mission Is Complete');
          toast('Well done! You have solved this level!', {
            autoClose: 5000,
          });
          if (TokenBalance < 1) {
            try {
              console.log(TokenBalance);

              await nftContract.methods.mint(7, InstanceAddress).send({
                from: walletAddress,
              })
                .once('error', (err) => {
                  console.log(err);
                  toast.error('Minting failed.');
                })
                .once('receipt', async () => {
                  const balance = await nftContract.methods.balanceOf(walletAddress, 7).call();
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
        toast.error('Password change failed.');
      }
    }
  };

  const PreviousPassword = async (num) => {
    try {
      const PreviousPass = await instanceContract.methods.PreviousPassword(num).call();
      setPreviousPasswordValue(PreviousPass);
    } catch (err) {
      console.error(err);
      toast.error('Failed to get previous password.');
    }
  };

  const code = `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.10;
  
  contract ChangePassword {
      uint256 private password;
      uint256[] public PreviousPassword;
  
      constructor(uint256 _password) {
          password = _password;
      }
      function changePassword(uint256 _password, uint256 newPassword) external {
          require(password == _password, "Password Cannot Be Changed!");
          require(
              password != newPassword,
              "The Password Must Be Different From The Previous Password!"
          );
          PreviousPassword.push(_password);
          password = newPassword;
      }
  }
  `;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />
        <h1 className="game-title title-color"><b>change Password</b></h1>
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
            <p><b>Dive into Solidity's 'private' state variables. Discover and master state variable intricacies.</b>
              <br /><br />
              <b><strong> You need:</strong>  To complete this mission, you need to understand Solidity's state variable visibility, especially private variables, and how to potentially expose or access these 'hidden' variables. </b>
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
              <Input
                style={{ color: 'black' }}
                className="form-control-alternative"
                id="input-city"
                placeholder="PreviousPassword Inedx"
                type="text"
                onChange={(e) => setPreviousPasswordState(e.target.value)}
              />
              <br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => PreviousPassword(PreviousPasswordState)}>
                  PreviousPassword
                </Button>
                {previousPasswordValue !== null
                    && (
                    <p style={{ marginLeft: '10px', marginTop: '12px', wordBreak: 'break-all' }}>
                      {previousPasswordValue.toString()}
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
                      <a style={{ textDecoration: 'underline' }} href={hintLink} target="_blank" rel="noopener noreferrer"> https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html?highlight=getStorageAt#getstorageat</a>
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
                  id="input-password"
                  placeholder="_password"
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <Input
                  style={{ color: 'black' }}
                  className="form-control-alternative"
                  id="input-newPassword"
                  placeholder="newPassword"
                  type="text"
                  onChange={(e) => setnewPassword(e.target.value)}
                />
              </FormGroup>
              <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => changePassword(_password, newPassword)}>
                changePassword
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

export default Game7;
