/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
import React, { useState, useRef, useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button, Container, Card, CardBody, CardTitle, FormGroup, Input } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import InstanceABI from '../../interfaces/EncodeData.json';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components';

const Game11 = () => {
  const [encodedData, setencodedData] = useState('');
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [instanceContract, setInstanceContract] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const hintLink = 'https://web3js.readthedocs.io/en/v1.7.1/web3-eth-abi.html#encodeparameters';
  const [_encodeStringAndUint, setEncodeStringAndUint] = useState(null);

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
      const balance = await nftContract.methods.balanceOf(walletAddress, 11).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(11).send({
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

  const encode = async (encodedData) => {
    if (instanceContract) {
      try {
        await instanceContract.methods.encode(encodedData).send({
          from: walletAddress,
        }).then(async () => {
          console.log('The Mission Is Complete');
          toast('Well done! You have solved this level!', {
            autoClose: 5000,
          });
          if (TokenBalance < 1) {
            try {
              await nftContract.methods.mint(11, InstanceAddress).send({
                from: walletAddress,
              })
                .once('error', (err) => {
                  console.log(err);
                  toast.error('Minting failed.');
                })
                .once('receipt', async () => {
                  const balance = await nftContract.methods.balanceOf(walletAddress, 11).call();
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
    // eslint-disable-next-line no-underscore-dangle
    let _encode = await instanceContract.methods._encodeStringAndUint().call();
    if (_encode === null) {
      _encode = 'bytes: 0x';
    }
    console.log(_encode);
    setEncodeStringAndUint(_encode);
  };

  const code = `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.10;
  
  contract EncodeData {
      bytes public _encodeStringAndUint = hex"";
  
      function encode(bytes memory encodedData) external {
          require(
              keccak256(encodedData) == keccak256(abi.encode("WEB", 3)),
              "The Answer is incorrect"
          );
          _encodeStringAndUint = encodedData;
      }  
  }`;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />
        <h1 className="game-title title-color"><b>Encode Data</b></h1>
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
            <p><b>Master data encryption in Solidity. Use encoding tools and craft the perfect solution.</b>
              <br /><br />
              <b><strong> You need:</strong> To complete this mission, you need to be familiar with the abi.encode function for encoding data in Solidity, understand how the keccak256 hash function works, and use these tools to encrypt data. </b>
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

                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={encodeStringAndUint}>
                  _encodeStringAndUint
                </Button>
                {_encodeStringAndUint !== null && <p style={{ wordBreak: 'break-all' }}>{_encodeStringAndUint}</p>}
                <br /><br />
                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={toggleHint}>
                  {isHintVisible ? 'Hide Hint' : 'Show Hint'}
                </Button>
                {isHintVisible && (
                  <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>
                    <CardBody>
                      <CardTitle className="desc-title title-color"><b>Hint</b></CardTitle>
                      <p>
                        <strong>Use the encodeparameters function from the web3js library. You can read more </strong> <a style={{ textDecoration: 'underline' }} href={hintLink} target="_blank" rel="noopener noreferrer"><strong>Here</strong></a>.
                        <br />
                        <strong><strong>Or</strong></strong>
                        <br />
                        <strong>Write a function according to the following interface:<br /> <strong> function encode(string memory _str, uint256 _num) external pure returns (bytes memory);</strong></strong>
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
                    placeholder="encodedData"
                    type="text"
                    onChange={(e) => setencodedData(e.target.value)}
                  />
                </FormGroup>
                <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => encode(encodedData)}>
                  encode
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

export default Game11;
