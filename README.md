# PayHub

A decentralized payment processing platform that enables secure, transparent, and efficient transactions between merchants and customers using blockchain technology.

## Introduction

PayHub is a modern payment processing solution that leverages blockchain technology to provide a secure, transparent, and efficient payment system. Built using Google's blockchain RPC on the Sepolia testnet, it uses PYUSD (a stablecoin) for transactions, ensuring price stability and reducing volatility risks.

### Key Features

- **Secure Payments**: Smart contract based transactions with builtin verification
- **Merchant Dashboard**: Comprehensive tools for managing inventory, sales, and disputes
- **Customer Store**: User-friendly interface for browsing products and making purchases
- **Dispute Resolution**: Built-in system for handling transaction disputes
- **Transaction Tracking**: Real-time monitoring of payment status and history
- **Receipt Generation**: Receipt creation for all transactions

## Features in Detail

### 1. Merchant Dashboard

#### Inventory Management

- **Product Management**

  - Add, edit, and delete products
  - Set product prices
  - Manage product stock levels
  - Categorize products for better organization

#### Sales Analytics

- **Transaction Overview**

  - Daily sales reports
  - Revenue tracking in PYUSD
  - Transaction volume analysis
  - Customer purchase patterns

- **Performance Metrics**
  - Sales trends visualization
  - Popular product analysis
  - Customer retention rates
  - Revenue growth tracking

#### Dispute Management

- **Dispute Resolution System**

  - View and respond to customer disputes
  - Upload evidence and documentation
  - Track dispute status and history

- **Transaction Verification**
  - Real-time transaction monitoring
  - Transaction status tracking
  - Payment confirmation system
  - Receipt generation

### 2. Customer Store

#### Shopping Experience

- **Product Discovery**

  - Advanced search functionality
  - Category-based browsing
  - Product filtering and sorting
  - Detailed product information

#### Payment Processing

- **Wallet Integration**

  - MetaMask Wallet support
  - PYUSD balance checking
  - Gas fee estimation
  - Transaction confirmation

- **Transaction Security**

  - Smart contract verification
  - Transaction status tracking
  - Receipt generation
  - Transaction history

- **QR Code Payment System**
  - Dynamic QR code generation for each transaction
  - Real-time payment status updates
  - Mobile wallet compatibility
  - Secure payment verification
  - Transaction amount validation
  - Automatic status updates

### 3. Technical Implementation

#### Blockchain Integration

1. **Google Blockchain RPC Integration**

   - Leveraging Google Cloud's enterprise-grade blockchain infrastructure
   - Benefits include:
     - Enterprise-grade reliability through Google Cloud infrastructure
     - Cost-effective with generous free tier (up to 100 requests/second)
     - Seamless scalability for growing request volumes
     - Full compatibility with existing RPC providers
   - Using managed Ethereum nodes for secure blockchain access
   - Leveraging Google's peer-to-peer network for real-time blockchain data synchronization

2. **Wallet Connection**

   - We use wagmi's `useConnect` hook for wallet integration
   - Currently supporting MetaMask Wallet through wagmi connectors
   - Wallet state is managed through wagmi's built-in hooks
   - We store wallet addresses in our database for user identification

3. **PYUSD Integration**

   - We interact with the PYUSD token contract on Sepolia testnet
   - Using wagmi's hooks for contract interactions
   - Contract address: `0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9` [Test-Net]
   - We check balances and estimate gas fees before transactions

4. **QR Code Payment System**

   - We generate dynamic QR codes with payment data
   - Using `useWatchPyUsdTransferEvent` to monitor payment events in real-time which internally uses `eth_getLogs` to monitor transaction Logs
   - We verify transactions using `useWaitForTransactionReceipt`
   - The system includes a print functionality for QR codes
   - We track payment status and update the UI accordingly

5. **Dispute Resolution System**

   - We use `useDebugTraceBlockByNumber` to verify transaction details and also becaue block number is better than using transaction hash
     because of the length of the transaction hash.
   - The system allows merchants to:
     - Enter transaction block numbers
     - View transaction details (amount, sender, receiver)
     - See transaction success/failure status
     - Add resolution details
   - Disputes are stored in our SQLite database with:
     - Transaction hash
     - Customer and merchant addresses
     - Issue description
     - Resolution details
     - Timestamps

6. **Database Structure**

   - Using Turso (SQLite) with Drizzle ORM
   - Main tables include:
     - Users (wallet addresses, roles)
     - Products (inventory management)
     - Transactions (payment records)
     - Disputes (resolution tracking)

7. **Security Features**
   - All transactions are verified through the blockchain
   - Wallet connections are handled securely through wagmi
   - Transaction verification is done on-chain

## Problem Statement

Traditional payment systems often face challenges with:

- High transaction fees
- Limited transparency
- Complex dispute resolution processes
- Slow settlement times
- Geographic restrictions

PayHub addresses these issues by:

- Using blockchain technology for transparent, immutable transaction records
- Implementing smart contracts for automated, secure payments
- Providing a streamlined dispute resolution system
- Offering real-time transaction tracking
- Supporting global transactions through cryptocurrency

## Technical Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Blockchain**:
  - Sepolia testnet with Google's Blockchain RPC
    - Enterprise-grade managed nodes
    - High-performance infrastructure
    - Scalable request handling
    - Secure blockchain access
  - wagmi/viem for blockchain interactions
  - PYUSD token integration
- **State Management**: Zustand
- **Database**: Turso (SQLite) with Drizzle ORM
- **Authentication**: Web3 wallet integration (MetaMask, Coinbase Wallet)
- **API Layer**: Hono
- **Data Validation**: Zod
- **Table Management**: TanStack Table
- **Query Management**: TanStack Query
- **Form Handling**: React Hook Form

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask or another Web3 wallet
- Access to Sepolia testnet
- Some testnet ETH and PYUSD tokens

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/payhub.git
   cd payhub
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

   ```
   DATABASE_URL=your_turso_database_url
   TURSO_TOKEN=your_turso_auth_token
   NEXT_PUBLIC_MAIN_RPC=your_mainnet_rpc_url
   NEXT_PUBLIC_SEPOLIA_RPC=your_sepolia_rpc_url
   NEXT_PUBLIC_HOLESKY_RPC=your_holesky_rpc_url
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Merchants

1. **Connect Wallet**:

   - Click "Connect Wallet" in the merchant dashboard
   - Approve the connection in your Web3 wallet

2. **Add Products**:

   - Navigate to the inventory section
   - Click "Add Product"
   - Fill in product details and price
   - Save the product

3. **Manage Sales**:

   - View real-time sales data
   - Track transaction history
   - Generate reports

4. **Handle Disputes**:
   - Review dispute claims
   - Provide evidence
   - Resolve disputes through the platform

### For Customers

1. **Browse Products**:

   - Visit the store
   - Search for products
   - View product details

2. **Make a Purchase**:

   - Add items to cart
   - Connect wallet
   - Confirm transaction
   - View receipt

3. **Track Transactions**:
   - View purchase history
   - Check transaction status
   - Download receipts

## Smart Contract Integration

PayHub uses the PYUSD token contract for:

- Payment processing
- Transaction verification
- Balance management

The contract is deployed on:

- Ethereum Mainnet: `0x6c3ea9036406852006290770BEdFcAbA0e23A0e8`
- Sepolia testnet: `0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9`

## Security Considerations

- All transactions are verified through the PYUSD token contract
- Private keys are never stored on the platform
- Dispute resolution system with evidence submission
- Transaction immutability through blockchain
- Regular security audits

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
