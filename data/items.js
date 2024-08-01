const fs = require('node:fs/promises');

async function getStoredItems() {
  try {
    const rawFileContent = await fs.readFile('items.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const storedItems = data.items ?? [];
    return storedItems;
  } catch (error) {
    console.error('Error reading items.json:', error);
    return [];
  }
}

async function getItems() {
  try {
    const rawFileContent = await fs.readFile('itemsData.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const items = data ?? [];
    return items;
  } catch (error) {
    console.error('Error reading itemsData.json:', error);
    return [];
  }
}

function storeItems(items) {
  return fs.writeFile('items.json', JSON.stringify({ items: items || [] }))
    .catch(error => {
      console.error('Error writing to items.json:', error);
    });
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;
exports.getItems = getItems;
