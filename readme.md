# DropTable

A small library for creating a loot table that can be use for receiving random loot in games.

It is simple to use, just create a new instance of `DropTable`.

```js
let table = new DropTable();
```

And start adding items.

```js
table.addItem({
    'name':'elixir',
    'data': {},
    'weight': 50
});
```

All weights are normalized so they don't need to be a percentage.

It also possible to initialize the `DropTable` with a list of items.

```js
let table = new DropTable(items);
```

Remove items by name:

```js
table.removeItem('elixir');
```

And of course get a random result
```js
let result = table.drop();
```