/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
import React, { useState, useRef, useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button, Container, Card, CardBody, CardTitle, FormGroup, Input } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import InstanceABI from '../../interfaces/HashCollision.json';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components';

const Game12 = () => {
  const [guess, setguess] = useState('');
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [instanceContract, setInstanceContract] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [secretHashState, setSecretHashState] = useState('');
  const [collisionFoundState, setCollisionFoundState] = useState(null);

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
      const balance = await nftContract.methods.balanceOf(walletAddress, 12).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(12).send({
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

  const findCollision = async (guess) => {
    if (instanceContract) {
      if (isNaN(Number(guess))) {
        alert('Invalid input! Please enter a hexadecimal.');
        return;
      }
      try {
        await instanceContract.methods.findCollision(guess).send({
          from: walletAddress,
        }).then(async () => {
          console.log('The Mission Is Complete');
          toast('Well done! You have solved this level!', {
            autoClose: 5000,
          });
          if (TokenBalance < 1) {
            try {
              await nftContract.methods.mint(12, InstanceAddress).send({
                from: walletAddress,
              })
                .once('error', (err) => {
                  console.log(err);
                  toast.error('Minting failed.');
                })
                .once('receipt', async () => {
                  const balance = await nftContract.methods.balanceOf(walletAddress, 12).call();
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
        console.error(err.message);
        toast.error('Find collision operation failed.');
      }
    }
  };

  const secretHash = async () => {
    const secret = await instanceContract.methods.secretHash().call();
    console.log(secret);
    setSecretHashState(secret);
  };

  const collisionFound = async () => {
    const collision = await instanceContract.methods.collisionFound().call();
    console.log(collision);
    setCollisionFoundState(collision);
  };

  const code = `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.10;
  
  contract HashCollision {
      bytes32 public secretHash = keccak256(abi.encodePacked(sha256("secret")));
  
      bool public collisionFound = false;
  
      function findCollision(bytes memory guess) public {
          require(keccak256(abi.encodePacked(guess)) == secretHash, "Not a collision!");
          collisionFound = true;
      }
  }`;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />        <h1 className="game-title title-color"><b>Hash Collision</b></h1>
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
            <p><b>Challenge Solidity's hash functions. Find collisions and match outputs.</b>
              <br /><br />
              <b><strong> You need:</strong> To solve this puzzle, you need to understand hash functions in Solidity, specifically keccak256 and sha256, as well as how to use the abi.encodePacked function. You'll also need to understand the concept of hash collisions, where different inputs produce the same hashed output. </b>
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
          <Card className="game-card" style={{ backgroundColor: '#000000', color: 'white' }}>
            <CardBody>
              <CardTitle className="desc-title title-color"><b>State Variables</b></CardTitle>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={secretHash}>
                  secretHash
                </Button>
                {secretHashState !== '' && <p style={{ marginLeft: '10px', wordBreak: 'break-all' }}> {secretHashState}</p>}
              </div>
              <br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={collisionFound}>
                  collisionFound
                </Button>
                {collisionFoundState !== null
                    && (
                    <p style={{ marginLeft: '10px' }}>
                      {collisionFoundState ? 'True' : 'False'}
                    </p>
                    )}
              </div>
              <br />
              <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="button" onClick={toggleHint}>
                {isHintVisible ? 'Hide Hint' : 'Show Hint'}
              </Button>
              {isHintVisible && (
              <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>
                <CardBody>
                  <CardTitle className="desc-title title-color"><b>Hint</b></CardTitle>
                  <p>
                    <strong>Write a function according to the following interface:<strong> function guess() external pure returns (bytes memory secret);</strong></strong>
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
                  placeholder="guess"
                  type="text"
                  onChange={(e) => setguess(e.target.value)}
                />
              </FormGroup>
              <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => findCollision(guess)}>
                findCollision
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

export default Game12;
