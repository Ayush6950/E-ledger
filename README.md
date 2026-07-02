# 🏡 EstateLedger
 
A blockchain-powered property registry platform built for transparency, security, and trust.
 
EstateLedger combats land fraud and opaque record-keeping by anchoring property ownership data on-chain — while delivering a modern, user-friendly interface backed by Supabase and an Ethereum smart contract.
 
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-5-3178C6?logo=typescript&logoColor=white)
![Solidity](https://img.shields.io/badge/solidity-%5E0.8.20-363636?logo=solidity&logoColor=white)
![Supabase](https://img.shields.io/badge/supabase-backend-3ECF8E?logo=supabase&logoColor=white)
 
---
 
## 📸 Overview
 
| Feature | Description |
|---|---|
| 🔗 On-chain Registry | Properties registered immutably on Ethereum via Solidity smart contract |
| 🔄 Secure Transfers | Ownership transfer enforced by contract — only the verified owner can initiate |
| 📄 Document Hashing | Property documents stored as hashes on-chain for tamper-proof verification |
| 🗄️ Supabase Backend | Structured metadata, user auth, and query layer via Supabase PostgreSQL |
| ⚡ React + Vite Frontend | Fast, type-safe UI built with React 18, TypeScript, and Tailwind CSS |
| 🧾 PDF Receipts | Downloadable transaction receipts generated client-side with jsPDF |
 
---
 
## 🛠️ Tech Stack
 
### Frontend
- **React 18** + **TypeScript** — component-driven UI
- **Vite** — lightning-fast dev server & bundler
- **Tailwind CSS** + **shadcn/ui** (Radix UI) — accessible, styled components
- **ethers.js v6** — Ethereum wallet & contract interaction
- **TanStack Query** — server state management
- **React Hook Form** + **Zod** — form handling & validation
- **jsPDF** + **html2canvas** — receipt generation
- **React Router v6** — client-side routing
### Backend
- **Supabase** — PostgreSQL database, authentication, and real-time APIs
- **Supabase Migrations** — version-controlled schema management
### Smart Contract
- **Solidity ^0.8.20** — `EstateLedger.sol` on Ethereum
- **Hardhat** — compile, test, and deploy toolchain
---
 
## 📁 Project Structure
 
```
estate-ledger/
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── pages/      # Landing, Dashboard, PropertyRegistry, TransferProperty, Receipt
│   │   ├── components/ # Shared UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── context/    # React context providers
│   │   ├── integrations/ # Supabase & contract clients
│   │   ├── types/      # TypeScript type definitions
│   │   └── lib/        # Utility functions
│   └── ...
│
├── backend/            # Supabase configuration & migrations
│   └── supabase/
│       ├── config.toml
│       └── migrations/
│
├── contract/           # Hardhat smart contract project
│   ├── contracts/
│   │   └── EstateLedger.sol
│   ├── scripts/
│   │   └── deploy.cjs
│   └── test/
│
└── .env                # Root environment variables
```
 
---
 
## ⚙️ Getting Started
 
### Prerequisites
 
- **Node.js** ≥ 18
- **npm** ≥ 9
- **MetaMask** (or any EIP-1193 wallet browser extension)
- **Supabase CLI** — [install guide](https://supabase.com/docs/guides/cli)
### 1. Clone the Repository
 
```bash
git clone https://github.com/your-username/estate-ledger.git
cd estate-ledger
```
 
### 2. Environment Variables
 
Create a `.env` file at the project root (copy from `.env.example` if available):
 
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
```
 
---
 
## 🚀 Running Locally
 
### Frontend
 
```bash
cd frontend
npm install
npm run dev
```
 
App will be available at `http://localhost:5173`
 
### Backend (Supabase)
 
```bash
# Link to your Supabase project
supabase link --project-ref <your-project-ref>
 
# Push migrations
supabase db push
```
 
### Smart Contract
 
```bash
cd contract
npm install
 
# Compile contracts
npm run compile
 
# Run tests
npm run test
 
# Deploy (configure hardhat.config.cjs with your network/private key first)
npm run deploy
```
 
---
 
## 📜 Smart Contract
 
**`EstateLedger.sol`** — deployed on Ethereum (Hardhat-compatible)
 
### Data Structure
 
```solidity
struct Property {
    uint256 id;
    string  location;
    uint256 area;
    address owner;
    string  documentHash;
    bool    exists;
}
```
 
### Key Functions
 
| Function | Access | Description |
|---|---|---|
| `registerProperty(location, area, documentHash)` | Public | Register a new property on-chain |
| `transferProperty(id, newOwner)` | Owner only | Transfer ownership to a new address |
| `getProperty(id)` | Public view | Retrieve property details by ID |
 
### Events
 
- `PropertyRegistered(id, owner, location)` — emitted on registration
- `PropertyTransferred(id, from, to)` — emitted on transfer
---
 
## 🖥️ Application Pages
 
| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero, features, and CTA |
| `/dashboard` | Dashboard | Overview of registered properties |
| `/registry` | Property Registry | Register a new property |
| `/transfer` | Transfer Property | Initiate ownership transfer |
| `/receipt` | Receipt | Downloadable PDF transaction receipt |
 
---
 
## 🔐 Security Considerations
 
- **Owner-only transfers** — enforced at the smart contract level; no admin override
- **Document hashes** — files are hashed client-side; only the hash is stored on-chain, keeping documents private
- **Supabase RLS** — Row-Level Security policies protect user data at the database layer
- **Env secrets** — never commit `.env`; all credentials are injected at build/runtime
---
 
## 🤝 Contributing
 
1. Fork the repository
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request
Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
 
---
 
## 📄 License
 
This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
 
---