/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
import React, { useState, useRef, useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Button, Container, Card, CardBody, CardTitle, FormGroup, Input } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar } from '../../components';
import InstanceABI from '../../interfaces/LevelFactory.json';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';

const Game14 = () => {
  const [Add, setAdd] = useState('');
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [instanceContract, setInstanceContract] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [CorrectPrediction, setCorrectPrediction] = useState(null);
  const [Salt, setSalt] = useState(null);
  const [Bytecode, setBytecode] = useState(null);
  const [_addr, setAddr] = useState('');
  const [_sal, setSal] = useState('');
  const [_bytecode, setBytecodes] = useState('');
  const [_Address, setAddress] = useState('');

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
      const balance = await nftContract.methods.balanceOf(walletAddress, 14).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(14).send({
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

  const Deploy = async (Add) => {
    if (instanceContract) {
      try {
        await instanceContract.methods.deploy(Add).send({
          from: walletAddress,
        }).then(async () => {
          console.log('The Mission Is Complete');
          toast('Well done! You have solved this level!', {
            autoClose: 5000,
          });
          if (TokenBalance < 1) {
            try {
              await nftContract.methods.mint(14, InstanceAddress).send({
                from: walletAddress,
              })
                .once('error', (err) => {
                  console.log(err);
                  toast.error('Minting failed.'); // Error toast
                })
                .once('receipt', async () => {
                  const balance = await nftContract.methods.balanceOf(walletAddress, 14).call();
                  setTokenBalance(balance);
                  console.log(balance);
                  toast.success('Minting completed successfully!'); // Success toast
                });
            } catch (err) {
              console.error(err.message);
              toast.error('Minting failed.'); // Error toast
            }
          }
        });
      } catch (err) {
        console.error(err.message);
        toast.error('Transaction failed.'); // Error toast
      }
    }
  };

  const correctPrediction = async () => {
    const correctPrediction = await instanceContract.methods.correctPrediction().call();
    setCorrectPrediction(correctPrediction);
    console.log(correctPrediction);
  };

  const Saltt = async () => {
    const _Salt = Number(await instanceContract.methods._salt().call());
    setSalt(_Salt);
    console.log(_Salt);
  };

  const bytecode = async () => {
    const bytecode = await instanceContract.methods.bytecode().call();
    setBytecode(bytecode);
    console.log(bytecode);
  };

  const checkAddress = async (_addr, _sal, _bytecode) => {
    if (instanceContract) {
      try {
        const _address = await instanceContract.methods.checkAddress(_addr, Number(_sal), _bytecode).call();
        console.log(_address);
        setAddress(_address);
      } catch (err) {
        console.error(err.message);
      }
    }
  };
  const code = `

  // SPDX-License-Identifier: MIT

  pragma solidity ^0.8.10;
  
  contract SomeContract {
    /*
          ~~~~                                       ~~~~
      ~~                                           ~~
        ~~                                           ~~
      ~~                                            ~~
        ~~                                           ~~
      ________                                     _______
     /  |   | \\                                  / |   | \\
    / __|___|__\\                                /__|___|__\\
   / ||_|___|_||\\                              /||_|___|_||\\
  /              \\                            /             \\
 /                \\                          /               \\
/__________________\\ ______________________ /_________________\\
|   ____________    ||   ____    ____     ||   ____________    |
|  |            |   ||  |    |  |    |    ||  |            |   |
|  |____________|   ||  |____|  |____|    ||  |____________|   |
|                   ||                    ||                   |
|   _____________   ||   _____________    ||   _____________   |
|  |             |  ||  |             |   ||  |             |  |
|  |   _     _   |  ||  |   _     _   |   ||  |   _     _   |  |
|  |  | |   | |  |  ||  |  | |   | |  |   ||  |  | |   | |  |  |
|__|__| |___| |__|__||__|__| |___| |__|___||__|__| |___| |__|__|

*/
  }`;

  const code1 = `

  // SPDX-License-Identifier: MIT

  pragma solidity ^0.8.10;
  
  contract Factory {
      SomeContract[] public SomeContracts;
  
      bool public correctPrediction;
  
      uint256 public _salt = 1;
  
      bytes public byte1 = type(SomeContract).creationCode;
  
      function checkAddress(address _addr, uint256 _sal, bytes memory _bytecode)
          external
          pure
          returns (address)
      {
          bytes32 result = keccak256(
              abi.encodePacked(
                  bytes1(0xff),
                  address(_addr),
                  _sal,
                  keccak256(_bytecode)
              )
          );
          return address(uint160(uint256(result)));
      }
  
      function deploy(address _add) external{
            require(_add != address(0), "Address must not be null");
            bytes32 salt = bytes32(_salt);
            SomeContract someContract = (new SomeContract){salt: salt}();
            SomeContracts.push(someContract);
            if (address(SomeContracts[0]) == _add){
            correctPrediction = true;
            }
            require(correctPrediction,"not correct");
        }
  }
  `;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />
        <h1 className="game-title title-color"><b>Contract Factory</b></h1>
        <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>
          <CardBody>
            <div className="code-section">
              <SyntaxHighlighter language="" style={a11yDark} ref={codeRef}>
                {code}
              </SyntaxHighlighter>
              <CopyToClipboard text={code1}>
                <Button className="button-copy">
                  Copy code
                </Button>
              </CopyToClipboard>
              <SyntaxHighlighter language="javascript" style={a11yDark} ref={codeRef}>
                {code1}
              </SyntaxHighlighter>
            </div>
          </CardBody>
        </Card>

        <Card className="game-card card-color" style={{ backgroundColor: '#000000', color: 'white' }}>
          <CardBody>
            <CardTitle className="desc-title title-color"><b>Game Description</b></CardTitle>
            <p><b>Anticipate contract deployments in Solidity. Calculate and predict with accuracy. </b>
              <br /><br />
              <b><strong> You need:</strong>understand how a smart contract address is calculated and calculate the address where the SomeContract contract will be deployed.</b>
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
                <CardTitle className="desc-title title-color"><b>State Variables & Call Functions</b></CardTitle>

                <div style={{ display: 'flex', alignItems: 'flex-start', minHeight: '50px' }}>
                  <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => correctPrediction()}>
                    CorrectPrediction
                  </Button>
                  {CorrectPrediction !== null
                    && (
                      <p style={{ marginLeft: '10px' }}>
                        {CorrectPrediction ? 'True' : 'False'}
                      </p>
                    )}
                </div>
                <br />
                <div style={{ display: 'flex', alignItems: 'flex-start', minHeight: '50px' }}>
                  <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => Saltt()}>
                    Salt
                  </Button>
                  {Salt !== '' && <p style={{ marginLeft: '10px' }}>{Salt}</p>}
                </div>
                <br />
                <div style={{ display: 'flex', alignItems: 'flex-start', minHeight: '50px' }}>
                  <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => bytecode()}>
                    bytecode
                  </Button>
                  {Bytecode !== null
                    && <p style={{ wordBreak: 'break-all' }}> {JSON.stringify(Bytecode)}</p>}
                </div>
                <br />
                <FormGroup>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="_addr"
                    type="text"
                    onChange={(e) => setAddr(e.target.value)}
                  />
                  <br /><br />
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="_sal"
                    type="text"
                    onChange={(e) => setSal(e.target.value)}
                  />
                  <br /><br />
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="_bytecode"
                    type="text"
                    onChange={(e) => setBytecodes(e.target.value)}
                  />
                  <br /><br />
                </FormGroup>
                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => checkAddress(_addr, _sal, _bytecode)}>
                  checkAddress
                </Button>
                {_Address !== '' && <p style={{ marginLeft: '10px', marginTop: '12px' }}>{_Address}</p>}
                <br />
                <br />

                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={toggleHint}>
                  {isHintVisible ? 'Hide Hint' : 'Show Hint'}
                </Button>
                {isHintVisible && (
                  <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>
                    <CardBody>
                      <CardTitle className="desc-title title-color"><b>Hint</b></CardTitle>
                      <p>
                        calc the deployed address: keccak256(abi.encodePacked(bytes1(0xff), address(this), salt, keccak256(bytecode)))
                        .
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
                <br /><br />
                <FormGroup>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="_add"
                    type="text"
                    onChange={(e) => setAdd(e.target.value)}
                  />
                </FormGroup>
                <br /><br />
                <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => Deploy(Add)}>
                  deploy
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

export default Game14;
