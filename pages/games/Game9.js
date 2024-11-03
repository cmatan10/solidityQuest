/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
import React, { useState, useRef, useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button, Container, Card, CardBody, CardTitle, FormGroup, Input } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import InstanceABI from '../../interfaces/BlockHash.json';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components';

const Game9 = () => {
  const [blockNumber, setblockNumber] = useState('');
  const [blockHash, setblockHash] = useState('');
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [instanceContract, setInstanceContract] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [correctBlockHashValue, setCorrectBlockHashValue] = useState(null);
  const [Hash, setHash] = useState('');

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
      const balance = await nftContract.methods.balanceOf(walletAddress, 9).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(9).send({
        from: walletAddress,
      });

      const deployInstanceEvent = receipt.events.DeployInstance;
      if (deployInstanceEvent) {
        setInstanceAddress(deployInstanceEvent.returnValues.Instance);
        toast.success('Game created successfully!');
      } else {
        toast.error('Game creation failed.');
      }
      const blockNumber = Number(await web3.eth.getBlockNumber());
      console.log('Block Number:', blockNumber);

      const events = await factoryContract.getPastEvents('DeployInstance', {
        fromBlock: blockNumber - 1000, // or another reasonable range
        toBlock: 'latest',
      });

      events.forEach((event) => {
        if (receipt.transactionHash === event.transactionHash) {
          setInstanceAddress(event.returnValues.Instance);
          setHash(receipt.transactionHash);
          console.log(receipt.transactionHash);
        }
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error(`Game creation failed. 
      Please make sure:
-That your Metamask wallet is properly connected.`);
    }
  };

  const blockHashCheck = async (blockNumber, blockHash) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(blockNumber)) || isNaN(Number(blockHash))) {
      setTimeout(() => alert('Invalid password!'), 0);
      return;
    }

    if (instanceContract) {
      try {
        await instanceContract.methods.blockHashCheck(blockNumber, blockHash).send({
          from: walletAddress,
        })
          .then(async () => {
            const correctBlock = await instanceContract.methods.correctBlockHash().call();
            console.log(correctBlock);
            if (correctBlock === true) {
              console.log('The Mission Is Complete');
              toast('Well done! You have solved this level!', {
                autoClose: 5000,
              });
              if (TokenBalance < 1) {
                try {
                  console.log(TokenBalance);

                  await nftContract.methods.mint(9, InstanceAddress).send({
                    from: walletAddress,
                  })
                    .once('error', (err) => {
                      console.log(err.message);
                      toast.error('Minting failed.');
                    })
                    .once('receipt', async () => {
                      const balance = await nftContract.methods.balanceOf(walletAddress, 9).call();
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
        toast.error('Block hash check failed.');
      }
    }
  };

  const correctBlockHash = async () => {
    const correctBlockHash = await instanceContract.methods.correctBlockHash().call();
    console.log(correctBlockHash);
    setCorrectBlockHashValue(correctBlockHash);
  };

  const code = `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.10;
  
  contract BlockHash {
      bool public correctBlockHash = false;
  
      function blockHashCheck(uint blockNumber, bytes32 blockHash) external {
          require(blockNumber < block.number, "Block number should be less than current block number");
          require(block.number - blockNumber <= 256, "Block number should be within the last 256 blocks");
          if(blockhash(blockNumber) == blockHash){
              correctBlockHash = true;
          }
      }
  }`;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />
        <h1 className="game-title title-color"><b>BlockHash</b></h1>
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
            <p><b>Embark on a journey with Solidity's block properties. Match hashes and validate findings.</b>
              <br /><br />
              <b><strong> You need:</strong>  To complete this puzzle, you need to understand Ethereum's block properties. </b>
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
                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => correctBlockHash()}>
                  correctBlockHash
                </Button>
                {correctBlockHashValue !== null
                    && (
                    <p style={{ marginLeft: '10px' }}>
                      {correctBlockHashValue.toString()}
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
                      <p style={{ wordBreak: 'break-all' }}> You will find the block number in the block explorer by this hash: "{Hash}".</p>
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
                  placeholder="blockNumber"
                  type="text"
                  onChange={(e) => setblockNumber(e.target.value)}
                />
                <br />
                <Input
                  style={{ color: 'black' }}
                  className="form-control-alternative"
                  id="input-city"
                  placeholder="blockHash"
                  type="text"
                  onChange={(e) => setblockHash(e.target.value)}
                />
              </FormGroup>
              <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => blockHashCheck(blockNumber, blockHash)}>
                blockHashCheck
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

export default Game9;
