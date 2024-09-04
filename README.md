# zksync-privy-demo

## ZKsync Contracts

```bash
$ npx zksync-cli create --template hardhat_solidity zksync
Using Hardhat + Solidity template
? Private key of the wallet responsible for deploying contracts (optional)
****************************************************************
? Package manager yarn

Setting up template in zksync-privy-demo/zksync...
✔ Cloned template
✔ Environment variables set up
✔ Dependencies installed

🎉 All set up! 🎉

--------------------------

Navigate to your project: cd zksync

Directory Overview:
  - Contracts: /contracts
  - Deployment Scripts: /deploy

Commands:
  - Compile your contracts: yarn compile
  - Deploy your contract: yarn deploy
    - Tip: You can use the --network option to specify the network to deploy to.

Further Reading:
  - Check out the README file in the project location for more details: zksync/README.md

--------------------------
```

## Frontend

```bash
$ yarn create next-app frontend
yarn create v1.22.22
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Installed "create-next-app@14.2.7" with binaries:
      - create-next-app
✔ Would you like to use TypeScript? … No / (Yes)
✔ Would you like to use ESLint? … No / (Yes)
✔ Would you like to use Tailwind CSS? … (No) / Yes
✔ Would you like to use `src/` directory? … (No) / Yes
✔ Would you like to use App Router? (recommended) … No / (Yes)
✔ Would you like to customize the default import alias (@/*)? … (No) / Yes
Creating a new Next.js app in zksync-privy-demo/frontend.

Using yarn.

Initializing project with template: app


Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- eslint
- eslint-config-next

yarn install v1.22.22

...

Done in 47.28s.
Success! Created frontend at zksync-privy-demo/frontend

Done in 69.98s.
```

```bash
$ cd frontend
```

```bash
$ yarn add @privy-io/react-auth viem @tanstack/react-query
$ yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### Clean up the frontend

```bash
$ rm app/page.module.css app/globals.css
```

- remove the `app/page.module.css` and `app/globals.css` files
- remove the import of `app/globals.css` in `app/layout.tsx`
- clear the content of `app/page.tsx`

```tsx
// app/page.tsx
export default function Home() {
  return <div>Home</div>;
}
```

```bash
$ mkdir context && touch context/ZKsyncClient.tsx
```

```bash
$ mkdir hooks && touch hooks/useZKsync.ts
```

```bash
$ mkdir components && touch components/Main.tsx
```
