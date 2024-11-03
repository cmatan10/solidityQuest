/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
import React, { useState, useRef, useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button, Container, Card, CardBody, CardTitle, FormGroup, Input } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import InstanceABI from '../../interfaces/DecodeData.json';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components';

const Game13 = () => {
  const [_str, setStr] = useState('');
  const [_num, setNum] = useState('');
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [instanceContract, setInstanceContract] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const hintLink = 'https://web3js.readthedocs.io/en/v1.7.1/web3-eth-abi.html#decodeparameters';
  const [_encodeStringAndUint, setEncodeStringAndUint] = useState(null);
  const [playerState, setPlayerState] = useState(null);

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
      const balance = await nftContract.methods.balanceOf(walletAddress, 13).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(13).send({
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

  const decode = async (_str, _num) => {
    if (instanceContract) {
      if (isNaN(Number(_num))) {
        alert('Invalid input! Please enter a number.');
        return;
      }
      try {
        await instanceContract.methods.decode(_str, _num).send({
          from: walletAddress,
        }).then(async () => {
          console.log('The Mission Is Complete');
          toast('Well done! You have solved this level!', {
            autoClose: 5000,
          });
          if (TokenBalance < 1) {
            try {
              console.log(TokenBalance);

              await nftContract.methods.mint(13, InstanceAddress).send({
                from: walletAddress,
              })
                .once('error', (err) => {
                  console.log(err);
                  toast.error('Minting failed.');
                })
                .once('receipt', async () => {
                  const balance = await nftContract.methods.balanceOf(walletAddress, 13).call();
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
        toast.error('Encoding failed.');
      }
    }
  };

  const encodeStringAndUint = async () => {
    const encode = await instanceContract.methods.encodeStringAndUint().call();
    console.log(encode);
    setEncodeStringAndUint(encode);
  };

  const player = async () => {
    const play = await instanceContract.methods.player().call();
    console.log(play);
    setPlayerState(play);
  };
  const code = `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.10;
  
  contract DecodeData{
      bytes public encodeStringAndUint =hex"00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000b4920416d204e756d626572000000000000000000000000000000000000000000";
       
      struct Player{
         string _string;
         uint256 _number;
      }
      Player public player;
  
      function decode(string memory _str, uint256 _num) external {
          bytes memory encodedData = abi.encode(_str, _num);
          require(keccak256(encodedData) == keccak256(encodeStringAndUint), "The Answer is incorrect");
          player = Player(_str, _num);
      }
  }
  `;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />
        <h1 className="game-title title-color"><b>Decode Data</b></h1>
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
            <p><b>Master data decryption in Solidity. Decode and pass data with precision.</b>
              <br /><br />
              <b><strong> You need:</strong> To complete this mission, you need to be familiar with the abi.encode function for encoding data in Solidity, understand how the keccak256 hash function works, and use these tools to decode data. </b>
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

                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={encodeStringAndUint}>
                  encodeStringAndUint
                </Button>
                {_encodeStringAndUint !== null
                  && <p style={{ wordBreak: 'break-all' }}> {JSON.stringify(_encodeStringAndUint)}</p>}
                <br />
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>

                  <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={player}>
                    player
                  </Button>
                  {playerState !== null
                    && (
                    <p style={{ marginLeft: '10px', wordBreak: 'break-all' }}>{JSON.stringify(playerState, (key, value) => (typeof value === 'bigint' ? value.toString() : value))}
                    </p>
                    )}
                </div>
                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="button" onClick={toggleHint}>
                  {isHintVisible ? 'Hide Hint' : 'Show Hint'}
                </Button>
                {isHintVisible && (
                  <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>
                    <CardBody>
                      <CardTitle className="desc-title title-color"><b>Hint</b></CardTitle>
                      <p>
                        <strong>Use the decodeparameters function from the web3js library. You can read more </strong> <a style={{ textDecoration: 'underline' }} href={hintLink} target="_blank" rel="noopener noreferrer"><strong>Here</strong></a>.
                        <br />
                        <strong><strong>Or</strong></strong>
                        <br />
                        <strong>Write a function according to the following interface:<br /> <strong> function decode(bytes memory encodedData) external pure returns (string memory, uint256);</strong></strong>
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
                    placeholder="_str"
                    type="text"
                    onChange={(e) => setStr(e.target.value)}
                  />
                  <br />
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="_num"
                    type="text"
                    onChange={(e) => setNum(e.target.value)}
                  />
                </FormGroup>
                <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => decode(_str, _num)}>
                  decode
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

export default Game13;
