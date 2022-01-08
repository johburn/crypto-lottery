import {useEffect, useState} from 'react'
import {BigNumber, utils} from 'ethers'
import {AiOutlineClose, HiMenuAlt4} from 'react-icons/all'
import logo from '../../images/logo.png'
import AccountIcon from '../accountIcon/AccountIcon'

const NavbarItem = ({title, classProps}) => {
  return (
    <li className={`mx-4 cursos-pointer ${classProps}`}>{title}</li>
  )
}

const Navbar = ({account,setCurrentAccount,balance,setCurrentBalance}) => {
  
  const [toggleMenu, setToogleMenu] = useState(false)
  
  const connectWallet = async() => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const ethBalanceHex = await ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })

      let ethBalance = utils.formatEther(BigNumber.from(ethBalanceHex));
      ethBalance = (+ethBalance).toFixed(4);
      console.log('Connected', accounts[0]);
      console.log('Balance', ethBalance);
      setCurrentAccount(accounts[0]);
      setCurrentBalance(ethBalance);

      ethereum.on('accountsChanged', async(event_accounts) => {
        setCurrentAccount(event_accounts[0]);

        const newBalance = await ethereum.request({
          method: 'eth_getBalance',
          params: [event_accounts[0], 'latest'],
        });
        ethBalance = utils.formatEther(BigNumber.from(newBalance));
        ethBalance = (+ethBalance).toFixed(4);
        setCurrentBalance(ethBalance);
      });

    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const { ethereum } = window;
    console.log("Change in account",account);
    ethereum.on('chainChanged', async(chainId) => {
      if(account!==null) {
      const newBalance = await ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });
      let ethBalance = utils.formatEther(BigNumber.from(newBalance));
      ethBalance = (+ethBalance).toFixed(4);
      setCurrentBalance(ethBalance);
      } else {
        console.log("No account");
      }
    });
  }, [account]);

  return(
        <div className="w-full flex md:justify-center justify-between items-center p-4">
          <div className="md:flex-[0.5] flex-initial justify-center items-center">
            <img src={logo} className="w-32 cursor-pointer"/>
          </div>
          <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
            {["Wallets","Cards","About Us"].map((item,index) =>(
              <NavbarItem key={index} title={item}/>
            ))}
            {!account ? (
            <button className="bg-[#AE016B] py-2 px-5 mx-4 rounded-full cursor-pointer hover:bg-[#580438]"
              onClick={connectWallet}
            >Connect your wallet</button>)
            : (<div className="flex items-center rounded-lg pl-2 bg-[#680140]">
                <AccountIcon account={account}/>
                <div className="align-middle">{account.slice(0, 6)}...{account.slice(account.length - 4,account.length)}</div>
                <div className="rounded-r-lg ml-2 px-2 py-1 bg-[#3f0127]">{balance} ETH</div>
              </div>)
            }
          </ul>
          <div className="flex relative">
              {
                toggleMenu
                ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=> setToogleMenu(false)}/>
                : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=> setToogleMenu(true)}/>
                }
              {
                toggleMenu && (
                  <ul
                    className="z-10 fixed top-0 -right-2 p-3 
                    w-[70vw] h-screen shadow-2xl md:hidden
                    list-none flex flex-col justify-start
                    items-end rounded-md blue-glass text-white animate-slide-in"
                  >
                    <li className="text-xl w-full my-2">
                      <AiOutlineClose onClick={()=>{setToogleMenu(false)}}/>
                    </li>
                    {["Wallets","Cards","About Us"].map((item,index) =>(
                      <NavbarItem key={index} title={item} classProps="my-2 text-lg"/>
                    ))}
                  </ul>
                )
              }
          </div>
        </div>
    )
}

export default Navbar;