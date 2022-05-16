# Investigate

Create and share notes on Ethereum mainnet blocks and transactions.

Visit the app here: https://eth-investigate.herokuapp.com/

## How to use Investigate

1. Create a new narrative, and add notes to specific transactions in the block.

![Create Block Narrative](https://www.dropbox.com/s/bvb958v0ccra0lk/Screen%20Shot%202022-05-16%20at%202.58.14%20PM.png?raw=1)

2. Save and publish your notes. All narratives are public, so go to the explore tab to see your narrative and discover other's as well.

![Explore Narratives](https://www.dropbox.com/s/y8yvhpt2wva172c/Screen%20Shot%202022-05-16%20at%203.12.16%20PM.png?raw=1)

3. Create transactions narratives too! Contract code and logs are parsed (if verified on Etherscan).

![Create Transaction Narrative](https://www.dropbox.com/s/gczwkho4z75tfde/Screen%20Shot%202022-05-16%20at%203.14.02%20PM.png?raw=1)

Note: You must have Metamask installed to create block and transaction narratives. You will be prompted to install it if it is not already on your system.

![Explore Narratives](https://www.dropbox.com/s/d30hkaaici9dxho/Screen%20Shot%202022-05-16%20at%203.02.37%20PM.png?raw=1)

## Development

Requirements:

- Node ^16.13.2
- Ruby ^2.7.4
- Bundle ^2.2.24

### Install Packages

`bundle install`

`npm i --prefix client`

### Install Additional Packages

macOSS:

`brew install automake openssl libtool pkg-config gmp libffi`

Linux / WSL:

`sudo apt-get install build-essential automake pkg-config libtool libffi-dev libssl-dev libgmp-dev python-dev`

### Start Postgres database

Start postgres server on local machine. ([macOS](https://chartio.com/resources/tutorials/how-to-start-postgresql-server-on-mac-os-x/), [WSL](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql))

Then run:

`rails db:create db:migrate`

### Add .env to /client

Add an `.env` file in the `client` directory with API keys for Alchemy and Etherscan.

```env
REACT_APP_ALCHEMY_API={APIKEY}
REACT_APP_ETHERSCAN_API={APIKEY}
```

### Run developement server

`rails s`

`npm run start --prefix client`
