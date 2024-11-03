/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
import React, { useState, useRef, useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button, Container, Card, CardBody, CardTitle, FormGroup, Input } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import InstanceABI from '../../interfaces/InterfaceId.json';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components';

const Game10 = () => {
  const [id, setid] = useState('');
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [instanceContract, setInstanceContract] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const hintLink = 'https://emn178.github.io/online-tools/keccak_256.html';
  const [_answer, setAnswer] = useState(null);

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
      const balance = await nftContract.methods.balanceOf(walletAddress, 10).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(10).send({
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

  const CalcMe = async (id) => {
    const inputid = id.startsWith('0x') ? id.slice(2) : id;

    // eslint-disable-next-line no-mixed-operators
    if (!web3.utils.isHex(id) && isNaN(id) || !/^([0-9A-Fa-f]{8})$/.test(inputid)) {
      alert('Invalid input! Please provide a valid integer or hexadecimal');
      return;
    }

    const inputId = isNaN(id) ? id : web3.utils.toHex(id);

    if (instanceContract) {
      try {
        await instanceContract.methods.CalcMe(inputId).send({
          from: walletAddress,
        }).then(async () => {
          const ans = await instanceContract.methods.answer().call();

          if (ans === true) {
            console.log('The Mission Is Complete');
            toast('Well done! You have solved this level!', {
              autoClose: 5000,
            });
            if (TokenBalance < 1) {
              try {
                await nftContract.methods.mint(10, InstanceAddress).send({
                  from: walletAddress,
                })
                  .once('error', (err) => {
                    console.log(err);
                    toast.error('Minting failed.');
                  })
                  .once('receipt', async () => {
                    const balance = await nftContract.methods.balanceOf(walletAddress, 10).call();
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
        console.error(err.message);
        toast.error('CalcMe operation failed.');
      }
    }
  };

  const answer = async () => {
    const ans = await instanceContract.methods.answer().call();
    console.log(ans);
    setAnswer(ans);
  };

  const code = `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.10;
  
  contract InterfaceId {
      bool public answer;
  
      function CalcMe(bytes4 id) external {
          require(id == bytes4(keccak256("CalcMe(bytes4)")), "Calc Me Again!");
          answer = true;
      }
  }
  `;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />
        <h1 className="game-title title-color"><b>Interface Id</b></h1>
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
            <p><b>Decipher function signatures in Solidity. Compute and match using cryptographic functions.</b>
              <br /><br />
              <b><strong> You need:</strong> To solve this puzzle, you need to understand function signatures in Solidity, how to compute them using the keccak256 hash function, and how to convert them into the bytes4 type. </b>
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
                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => answer()}>
                  answer
                </Button>
                {_answer !== null
                    && (
                    <p style={{ marginLeft: '10px' }}>
                      {_answer.toString()}
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
                    <strong>Calculate the function signature </strong> <a style={{ textDecoration: 'underline' }} href={hintLink} target="_blank" rel="noopener noreferrer"><strong>Here</strong></a>.
                    <br />
                    <strong><strong>Or</strong></strong>
                    <br />
                    <strong>Write a function according to the following interface:<strong> function Calc() external pure returns (bytes4);</strong></strong>
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
                  placeholder="ID"
                  type="text"
                  onChange={(e) => setid(e.target.value)}
                />
              </FormGroup>
              <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => CalcMe(id)}>
                CalcMe
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

export default Game10;
