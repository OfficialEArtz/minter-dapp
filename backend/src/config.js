require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "SUPREMECULT";
const description = "A certain High Cult";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

const layerConfigurations = [
  {
    growEditionSizeTo: 5000,
    layersOrder: [
      { name: "Background" },
      { name: "Member" },
      { name: "Addon" },
      { name: "Gear" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 3000,
  height: 3000,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://supremecult.eartz.co", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'polygon'; // only goerli, polygon, or ethereum

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'SUPREMECULT';
const CONTRACT_SYMBOL = 'SC';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0xad868DeA7e8bD1D97C1b3A8d4CCA2E361049D3CA';
const TREASURY_ADDRESS = '0xad868DeA7e8bD1D97C1b3A8d4CCA2E361049D3CA';
const MAX_SUPPLY = 5000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 2; // Minting price per NFT. Goerli = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2023-05-20T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2023-04-30T11:30:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0xad868DeA7e8bD1D97C1b3A8d4CCA2E361049D3CA"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ["0xad868DeA7e8bD1D97C1b3A8d4CCA2E361049D3CA","0x57B1a8745EA841852Fe082Cc731c80E9fDCfFf5a","0xCF3Fe713d8e872df4dEFe049297f539763a66C04","0xbd844d301F7f3E870f40316417C62092B60807fC","0x1D956A36Be735998d74a118de1ddF1eE2D10eEFC","0xfcbdaE299B7A0C4bC16120bf752510202015210C","0x6cA94cDB9cB41Ebf5272EF314252B67F471D5CE1","0x0e6a47cd9DcFb2fCf4B2B63b0ea973905D53c494","0xAe0E108A3008c881Ebe0C2528Fc8477829a966f3","0xeE61Af55D4FA4d66A78938611C35F9e49f2227cf","0x5014B0d4c6c61D18f835772F0CB87c11fDCBDE38","0xCD021809aAC083f628adA63CEEC920Ea86280DB4","0x9678d4a36C878987AbE9B3CF98145734Cb515602","0x5340C00623b6b682C3f79E257256B7aee8d2f106","0x01cC12BCDCED183A896e8242e4D288DB073205aD","0xd56822ecaaA0f92ed8D3B83863B49244CA3EA337","0x489396d49E60856eD2663B78e31264d02e368C94","0xb960238d6Db73e131037B0F539914fB5df935573","0xa27A4FF75725e22Ba9D14C177279Fe4E48d45acB","0x77BC817040A2168DEBb66e14f00833ae61EA3798","0xB946b49396781E471BCC35e415eD3CF1F56fee1C","0xD459F394E18DFec784796b5Bd7866f521E416978","0x7f5365bD146e1d30532f4DaC0C0094ec9dd6dFE4","0xb356b9997F0937494984dF6220289CA9B56849f9","0x2e53575A4E8E6f04860148a27f9c768CFe87527a","0x0B4D8ddD200802C7F9Bec2D127603d194F1C42f4","0x0a96431aCb7F9e2c8C76C0Dd43D967a77d9dB0d2","0xC50CEebc0Cf0db1A02ae46117C4cDde2D3fC4cB1","0x3d7dc4d4F38A0D251Da1e58950922c9d5b175457","0x9d636dA874BF913e5B4A064a8bFC2828995E96B5","0x10E1e4dccBe012913f92d06e09EF3442e7ebD31f","0xac327F843E4c7BD62984a191Fdb7dfe8d7876ffF","0x6b380062985b1B5283Ef2Ed8d7b061D89fDE64FF","0x5F5cc1C0F5dDB5f0F9dC669379c98D15BAd2A3bf","0x37051e29aD017dC06ca2ADCFc97FaDA76A024349","0xAa623Ff2BDA46BC373Ce61E1B0B2265ee3eF9D5C","0x489396d49E60856eD2663B78e31264d02e368C94","0xD459F394E18DFec784796b5Bd7866f521E416978","0x489396d49E60856eD2663B78e31264d02e368C94","0xD459F394E18DFec784796b5Bd7866f521E416978"]; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR_CONTRACT_HERE"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = false; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "REPLACE THIS"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/QmUf9tDbkqnfHkQaMdFWSGAeXwVXWA61pFED7ypx4hcsfh"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK") {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "SC",
  seller_fee_basis_points: 750, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://supremecult.eartz.co",
  creators: [
    {
      address: "6uyNymGPPsJTHgGeiNzhkNQDUAZJLgtz88mJ7PSaVNCy",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
