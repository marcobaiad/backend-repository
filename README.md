## Steps

1) Run npm install to install all dependencies. Then you can continue read the other available commands.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the production mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\

### `Routes`

GET /cuenta/:id? -> you can obtain an specific account by id in url params.
POST /cuenta -> userId is required in request body to crate a new account.
GET /cuentas -> userId required in the url query. You can obtain accounts from a specific user limited by 5.

GET /cliente/:id? -> you can obtain an specific account by id in url params.
POST /cliente -> Send userName in request body for create a new customer.
GET /clientes -> You can obtain clients limited by 5.

GET /transferencias -> fromAccountId required in url query. You can obtain all transferences from an specific account.
POST /transferencias -> fromAccountId, amoun, toAccountId are required in request body. You can obtain all transferences from an specific account.

