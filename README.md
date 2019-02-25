# xin-bootstrap-example

An example to create frontend application using xin and bootstrap.

## How to develop

```sh
npm i
npm run dev
```

## How to implement new view

- Create new view with name `x-{some-new-view}-view.js` inside `/views`
- Dont forget to create template file if necessary, example `x-{some-new-view}-view.html`
- Register route inside x-app.html under `xin-pager` scope elements
