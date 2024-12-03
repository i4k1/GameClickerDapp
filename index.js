const ethers = require(`ethers`)
const { Contract } = require("ethers")
const config = require(`./config.json`)
const gameClickerABI = require(`./gameclicker_abi.json`)
const tokenABI = require(`./token_abi.json`)

const provider = new ethers.JsonRpcProvider(config.rpc) // blockchain RPC node link
const walletMnemonic = ethers.Wallet.fromPhrase(config.mnemonic, provider) // wallet mnemonic phrase
const wallet = new ethers.Wallet(walletMnemonic.privateKey, provider) // wallet private key

// get wallet balance in ether
async function getBalanceEther(walletaddress) {
    const balance = await provider.getBalance(walletaddress)
    const balanceInEth = ethers.formatEther(balance) // wei to ether
    return balanceInEth
}

// detect network name
async function getNetworkName() {
    const network = await provider.getNetwork()
    return network.name
}

const contract = new Contract(config.token_address, tokenABI, provider); // ERC20 token contract address

// balance of token
async function getBalanceERC20(walletaddress) {
    const balance = await contract.balanceOf(walletaddress)
    const balanceInEth = ethers.formatEther(balance) // wei to ether
    return balanceInEth
}

async function getERC20Name() {
    const erc20_name = await contract.name()
    return erc20_name
}

async function getERC20Symbol() {
    const erc20_symbol = await contract.symbol()
    return erc20_symbol
}

async function handleContract() {
    const ethersProvider = new ethers.BrowserProvider(provider)
    const signer = await ethersProvider.getSigner()
    const contract_gameclicker = new ethers.Contract(config.gameclick_address, gameClickerABI, signer)
    const contract_token = new ethers.Contract(config.token_address, tokenABI, signer)

    const Register = await contract_gameclicker.Register("govnomessi")
    console.log(Register)
}

// output private key and wallet address
console.log(`wallet address: ${wallet.address}\nmnemonic: ${config.mnemonic}\nprivate key: ${walletMnemonic.privateKey}\n`)

getBalanceEther(wallet.address).then((balance) => {console.log(`Balance: ${balance}`)})