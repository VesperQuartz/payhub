# PayHub

A decentralized payment processing platform that enables secure, transparent, and efficient transactions between merchants and customers using blockchain technology.

## Introduction

PayHub is a modern payment processing solution that leverages blockchain technology to provide a secure, transparent, and efficient payment system. Built on the Sepolia testnet, it uses PYUSD (a stablecoin) for transactions, ensuring price stability and reducing volatility risks.

### Key Features

- **Secure Payments**: Smart contract-based transactions with built-in verification
- **Merchant Dashboard**: Comprehensive tools for managing inventory, sales, and disputes
- **Customer Store**: User-friendly interface for browsing products and making purchases
- **Dispute Resolution**: Built-in system for handling transaction disputes
- **Transaction Tracking**: Real-time monitoring of payment status and history
- **Receipt Generation**: Automated receipt creation for all transactions

## Features in Detail

### 1. Merchant Dashboard

#### Inventory Management

- **Product Management**

  - Add, edit, and delete products
  - Set product prices in PYUSD
  - Manage product stock levels
  - Categorize products for better organization
  - Upload product images and descriptions

- **Stock Control**
  - Real-time stock level monitoring
  - Low stock alerts
  - Stock history tracking
  - Bulk stock updates

#### Sales Analytics

- **Transaction Overview**

  - Daily, weekly, and monthly sales reports
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
  - Automated dispute notifications

- **Transaction Verification**
  - Real-time transaction monitoring
  - Transaction status tracking
  - Payment confirmation system
  - Automated receipt generation

### 2. Customer Store

#### Shopping Experience

- **Product Discovery**

  - Advanced search functionality
  - Category-based browsing
  - Product filtering and sorting
  - Detailed product information

- **Shopping Cart**
  - Real-time price calculation
  - Stock availability checking
  - Cart persistence
  - Quantity adjustment

#### Payment Processing

- **Wallet Integration**

  - MetaMask and Coinbase Wallet support
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
  - Expiration time management
  - Automatic status updates

### 3. Dispute Resolution System

#### Customer Dispute Process

- **Dispute Filing**

  - Transaction selection
  - Issue categorization
  - Evidence upload capability
  - Detailed description submission
  - Supporting documentation attachment

- **Dispute Tracking**
  - Real-time status updates
  - Communication history
  - Evidence review status
  - Resolution timeline
  - Automated notifications

#### Merchant Response System

- **Dispute Management**

  - Dispute queue management
  - Priority-based handling
  - Response time tracking
  - Evidence submission
  - Resolution options

- **Resolution Process**
  - Multiple resolution paths
  - Partial refund options
  - Full refund capability
  - Dispute rejection with evidence
  - Automated status updates

#### Dispute Resolution Features

- **Evidence Management**

  - Secure file upload
  - Multiple file type support
  - Evidence categorization
  - Timestamp verification
  - Chain of custody tracking

- **Communication System**

  - In-platform messaging
  - Automated notifications
  - Status update alerts
  - Resolution confirmation
  - Feedback collection

- **Resolution Tracking**
  - Dispute lifecycle monitoring
  - Resolution time tracking
  - Success rate analytics
  - Pattern identification
  - Performance metrics

### 4. Technical Implementation

#### Blockchain Integration

1. **Wallet Connection**

   - We use wagmi's `useConnect` hook for wallet integration
   - Currently supporting MetaMask and Coinbase Wallet through wagmi connectors
   - Wallet state is managed through wagmi's built-in hooks
   - We store wallet addresses in our database for user identification

2. **PYUSD Integration**

   - We interact with the PYUSD token contract on Sepolia testnet
   - Using wagmi's hooks for contract interactions
   - Contract address: `0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9`
   - We check balances and estimate gas fees before transactions

3. **QR Code Payment System**

   - We generate QR codes with payment data in the format: `ethereum:${contractAddress}@11155111/transfer?address=${address}&uint256=${amount}`
   - Using `useWatchPyUsdTransferEvent` to monitor payment events in real-time
   - We verify transactions using `useWaitForTransactionReceipt`
   - The system includes a print functionality for QR codes
   - We track payment status and update the UI accordingly

4. **Dispute Resolution System**

   - We use `useDebugTraceBlockByNumber` to verify transaction details
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

5. **Database Structure**

   - Using Turso (SQLite) with Drizzle ORM
   - Main tables include:
     - Users (wallet addresses, roles)
     - Products (inventory management)
     - Transactions (payment records)
     - Disputes (resolution tracking)

6. **Security Features**
   - All transactions are verified through the blockchain
   - We never store private keys
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
  - Sepolia testnet
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
