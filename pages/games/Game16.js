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
import InstanceABI from '../../interfaces/LimitedTickets.json';
import InstanceABI2 from '../../interfaces/LimitedTicketsHack.json';
import { Web3Context } from '../../web3/Web3provider';
import 'react-toastify/dist/ReactToastify.css';

const Game16 = () => {
  const [Receiver, setReceiver] = useState('');
  const [TicketAmount, setTicketAmount] = useState('');
  const [InstanceAddress, setInstanceAddress] = useState('');
  const [InstanceAddress2, setInstanceAddress2] = useState('');
  const [TokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef(null);
  const { walletAddress, factoryContract, nftContract, web3 } = useContext(Web3Context);
  const [instanceContract, setInstanceContract] = useState(null);
  const [instanceContract2, setInstanceContract2] = useState(null);
  const [MaxTicketsPerAddress, setMaxTicketsPerAddress] = useState('');
  const [UserTicketsCount, setUserTicketsCount] = useState(0);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [Counter, setCounter] = useState('');
  const [inputCounter, setInputCounter] = useState('');
  const [Target, setTarget] = useState('');
  const [Attacker, setAttcker] = useState('');
  const [TicketsAmount, setTicketsAmount] = useState('');

  const toggleHint = () => {
    setIsHintVisible(!isHintVisible);
  };
  useEffect(() => {
    if (web3 && web3.utils.isAddress(InstanceAddress) && web3.utils.isAddress(InstanceAddress2)) {
      setInstanceContract(new web3.eth.Contract(InstanceABI, InstanceAddress));
      setInstanceContract2(new web3.eth.Contract(InstanceABI2, InstanceAddress2));
    }
  }, [InstanceAddress, InstanceAddress2]);

  useEffect(() => {
    const fetchData = async () => {
      if (!walletAddress || !nftContract) {
        return;
      }
      const balance = await nftContract.methods.balanceOf(walletAddress, 16).call();
      setTokenBalance(balance);
      console.log(TokenBalance);
    };
    fetchData();
  }, [walletAddress, nftContract, TokenBalance]);

  const createGame = async () => {
    try {
      setIsLoading(true);
      const receipt = await factoryContract.methods.deploy(16).send({
        from: walletAddress,
      });

      const deployInstanceEvent = receipt.events.DeployInstance;
      if (deployInstanceEvent) {
        console.log(receipt);
        console.log(web3.utils.toChecksumAddress(`0x${receipt.logs[0].topics[1].slice(-40)}`));
        console.log(web3.utils.toChecksumAddress(`0x${receipt.logs[1].topics[1].slice(-40)}`));

        setInstanceAddress(web3.utils.toChecksumAddress(`0x${receipt.logs[0].topics[1].slice(-40)}`));
        setInstanceAddress2(web3.utils.toChecksumAddress(`0x${receipt.logs[1].topics[1].slice(-40)}`));
        toast.success('Game created successfully!'); // Success toast
      } else {
        toast.error('Game creation failed.'); // Error toast
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error('Game creation failed. Please make sure your Metamask wallet is properly connected.'); // Error toast
    }
  };

  const claimTickets = async (receiver, ticketAmount) => {
    if (instanceContract) {
      try {
        await instanceContract.methods.claimTickets(receiver, ticketAmount).send({
          from: walletAddress,
        }).then(async () => {
          toast.success('Claiming was completed successfully!'); // Success toast
        });
      } catch (err) {
        console.error(err.message);
        toast.error('Transaction failed.'); // Error toast
      }
    }
  };

  const Count = async () => {
    try {
      const Count = Number(await instanceContract.methods.Count(inputCounter).call());
      setCounter(Count);
      console.log(Count);
    } catch (err) {
      console.error(err);
      toast.error('Failed to get Count.'); // Error toast
    }
  };

  const maxTicketsPerAddress = async () => {
    const num = Number(await instanceContract.methods.maxTicketsPerAddress().call());
    setMaxTicketsPerAddress(num);
    console.log(num);
  };

  const attack = async (_target, attacker, ticketAmount) => {
    if (instanceContract) {
      try {
        await instanceContract2.methods.attack(_target, attacker, ticketAmount).send({
          from: walletAddress,
        }).then(async () => {
          const count = await instanceContract.methods.Count(walletAddress).call();
          setUserTicketsCount(count);
          toast.success(`Claiming was completed successfully! You have ${Number(UserTicketsCount) + Number(ticketAmount)} tickets.`); // Success toast
        });
      } catch (err) {
        console.error(err.message);
        toast.error('Transaction failed.'); // Error toast
      }
    }
  };
  const checkLimitedTickets = async () => {
    const count = await instanceContract.methods.Count(walletAddress).call();
    console.log(count);
    setUserTicketsCount(count);
    if (UserTicketsCount > 3) {
      console.log('The Mission Is Complete');
      toast('Well done! You have solved this level!', {
        autoClose: 5000,
      });
      if (TokenBalance < 1) {
        try {
          await nftContract.methods.mint(16, InstanceAddress).send({
            from: walletAddress,
          })
            .once('error', (err) => {
              console.log(err);
              toast.error('Minting failed.'); // Error toast
            })
            .once('receipt', async () => {
              const balance = await nftContract.methods.balanceOf(walletAddress, 16).call();
              setTokenBalance(balance);
              console.log(balance);
              toast.success('Minting completed successfully!'); // Success toast
            });
        } catch (err) {
          console.error(err.message);
          toast.error('Minting failed.'); // Error toast
        }
      }
    } else {
      toast.error("You don't have enough tickets."); // Error toast
    }
  };

  const code = `
  // SPDX-License-Identifier: MIT

  pragma solidity ^0.8.10;
  
  contract LimitedTickets {
  
      mapping(address => uint256) public Count;
      uint8 public maxTicketsPerAddress = 3;
  
      function claimTickets(address receiver, uint256 ticketAmount) public {
          require(
              Count[msg.sender] + ticketAmount <= maxTicketsPerAddress,
              "max tickets per address exceeded"
          );
          for (uint256 i = 0; i < ticketAmount; i++) {
              Count[receiver]++;
          }
      }
  }
  
  contract HacklimitedTickets {
      LimitedTickets target;
  
      function attack(address _target ,address attacker, uint256 ticketAmount) public {
          target = LimitedTickets(_target);
          target.claimTickets(attacker,ticketAmount);
      }
  }
  `;

  return (
    <>
      <Container className="bg-primary-black overflow-hidden">
        <Navbar />
        <h1 className="game-title title-color"><b>Limited Tickets</b></h1>
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

        <Card className="game-card card-color" style={{ backgroundColor: '#000000', color: 'white' }}>
          <CardBody>
            <CardTitle className="desc-title title-color"><b>Game Description</b></CardTitle>
            <p><b>Strategize and bypass ticket limitations in Solidity. Challenge the system and claim rewards. </b>
              <br /><br />
              <b><strong> You need:</strong> To play this game, you must creatively explore communication with the ticketing contract, understanding how to potentially bypass a limitation that restricts users to three tickets. Familiarity with intermediate contracts could prove valuable.</b>
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
                <h3 className="mt-1 title-color">LimitedTickets Address: <p className="Instance-color"> {InstanceAddress} </p></h3>
                <h3 className="mt-1 title-color">HacklimitedTickets Address: <p className="Instance-color"> {InstanceAddress2} </p></h3>
              </CardBody>
            </Card>
            <Card className="game-card" style={{ backgroundColor: '#000000', color: 'white' }}>
              <CardBody>
                <CardTitle className="desc-title title-color"><b>Limited Tickets</b></CardTitle>

                <Input
                  style={{ color: 'black' }}
                  className="form-control-alternative"
                  id="input-city"
                  placeholder="address"
                  type="text"
                  onChange={(e) => setInputCounter(e.target.value)}
                />
                <br /><br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={() => Count(Counter)}>
                    Count
                  </Button>
                  {Counter
                    && (
                    <p style={{ marginLeft: '10px', wordBreak: 'break-all' }}>
                      {Counter}
                    </p>
                    )}

                </div>
                <br /><br />

                <div style={{ display: 'flex', alignItems: 'flex-start', minHeight: '50px' }}>
                  <Button className="mt-1" onClick={() => maxTicketsPerAddress()} style={{ backgroundColor: '#355f7d', color: 'white' }}>
                    maxTicketsPerAddress
                  </Button>
                  {MaxTicketsPerAddress !== '' && <p style={{ marginLeft: '10px' }}>{MaxTicketsPerAddress}</p>}
                </div>
                <br />
                <FormGroup>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="Receiver"
                    type="text"
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                  <br /><br />
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="TicketAmount"
                    type="text"
                    onChange={(e) => setTicketAmount(e.target.value)}
                  />
                </FormGroup>
                <br />
                <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => claimTickets(Receiver, TicketAmount)}>
                  claimTickets
                </Button>
              </CardBody>
            </Card>
            <Card className="game-card" style={{ backgroundColor: '#000000', color: 'white' }}>
              <CardBody>
                <CardTitle className="card-title desc-title title-color" style={{ color: 'red' }}><b>Hack limitedTickets</b></CardTitle>
                <FormGroup>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="_target"
                    type="text"
                    onChange={(e) => setTarget(e.target.value)}
                  />
                  <br /><br />
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="attacker"
                    type="text"
                    onChange={(e) => setAttcker(e.target.value)}
                  />
                  <br /><br />
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-city"
                    placeholder="ticketAmount"
                    type="text"
                    onChange={(e) => setTicketsAmount(e.target.value)}
                  />
                </FormGroup>
                <br />
                <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="mt-1" onClick={() => attack(Target, Attacker, TicketsAmount)}>
                  attack
                </Button>
                <br /> <br />
                <Button style={{ backgroundColor: '#355f7d', color: 'white' }} className="mt-1" onClick={toggleHint}>
                  {isHintVisible ? 'Hide Hint' : 'Show Hint'}
                </Button>
                {isHintVisible && (
                  <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>
                    <CardBody>
                      <CardTitle className="desc-title title-color"><b>Hint</b></CardTitle>
                      <p>
                        Consider how the 'claimTickets' function tracks ticket count. When the attacker contract calls this function, it's defined as the msg.sender. Even though the tickets are transferred to your address through the attacker contract, the balance of the attacker contract will always remain at zero tickets.
                      </p>
                    </CardBody>
                  </Card>
                )}
              </CardBody>
            </Card>

            <Card className="card" style={{ backgroundColor: '#000000', color: 'white' }}>
              <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button style={{ backgroundColor: '#c97539', color: 'white' }} className="button" onClick={checkLimitedTickets}>
                  Submit
                </Button>
              </CardBody>
            </Card>
          </>
        )}

        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {TokenBalance < 1 ? null : (
            <div>

              <br /><br />
              <strong>
                Congratulations! You Got A Badge{' '}
                <i className="fas fa-medal" style={{ color: 'gold', fontSize: '20px', position: 'relative', top: '3px' }} />
              </strong>
              <br /><br /><br />
            </div>
          )}
        </p>
      </Container>
      <ToastContainer />

    </>
  );
};

export default Game16;
