const express = require('express');
const bodyParser = require('body-parser');

const { getStoredItems, storeItems, getItems } = require('./data/items');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', async (req, res, next) => {
  try {
    const storedItems = await getItems();
    await new Promise(resolve => setTimeout(resolve, 4000));
    res.json({ items: storedItems });
  } catch (error) {
    next(error);
  }
});

app.get('/items', async (req, res, next) => {
  try {
    const storedItems = await getStoredItems();
    await new Promise(resolve => setTimeout(resolve, 4000));
    res.json({ items: storedItems });
  } catch (error) {
    next(error);
  }
});

app.get('/items/:id', async (req, res, next) => {
  try {
    const storedItems = await getStoredItems();
    const item = storedItems.find(item => item.id === req.params.id);
    if (item) {
      res.json({ item });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    next(error);
  }
});

app.post('/items', async (req, res, next) => {
  try {
    const existingItems = await getStoredItems();
    const itemData = req.body;
    // Validate itemData here if necessary
    const newItem = {
      ...itemData,
      id: Math.random().toString(),
    };
    const updatedItems = [newItem, ...existingItems];
    await storeItems(updatedItems);
    res.status(201).json({ message: 'Stored new item.', item: newItem });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'An error occurred.', error });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});