# Amplify Gen 2 + RDS Postgres

## Data

To start the sandbox for local development run the following command:

```sh
npx ampx sandbox
```

In another terminal, set your Postgres database's connection string as a secret for the current sandbox in Parameter Store by running the following command:

```sh
npx ampx sandbox secret set SQL_CONNECTION_STRING
```

```sh
npx ampx generate schema-from-database --connection-uri-secret SQL_CONNECTION_STRING --out amplify/data/schema.sql.ts
```

The data schema assumes your database has a table with the following schema:

```sql
create table notifications
(
    user_id varchar(40)  not null,
    id      varchar(40)  not null
        constraint notifications_pk
            primary key,
    message varchar(255) not null
);
```

## Auth

1. Replace the metadata url in the `amplify/auth` folder with your SAML provider's when using the `URL` metadata type. Or, you can provide the contents of the metadata file and use the `FILE` metadata type instead.
2. Configure your SAML Provider's `Entity ID` in the following format `urn:amazon:cognito:sp:<user_pool_id>`
3. Add the cognito domain as a Callback URL in the format `https://<your_user_pool_domain>.auth.<region>.amazoncognito.com/saml2/idpresponse`. 

This page is helpful for troubleshooting invalid SAML responses:
https://repost.aws/knowledge-center/cognito-invalid-saml-response-errors

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
