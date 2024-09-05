# zksync-privy-demo

This is a complete example of [the template](https://github.com/piatoss3612/zksync-privy-demo-template) for a simple Dapp that allows users to log in with their social media accounts and claim a NFT.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v20 or later)
- [Yarn](https://yarnpkg.com/getting-started/install) (v1.22 or later)
- [zksync-cli](https://docs.zksync.io/build/zksync-cli) (v1.9.0)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/piatoss3612/zksync-privy-demo.git
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env.local` file in the `frontend` directory and add the following environment variables:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=
```

### Running the Dapp

1. Start the frontend:

```bash
yarn workspace frontend dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
