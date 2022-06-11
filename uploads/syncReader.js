const fs = require('fs');

try {
    const jsonString = fs.readFileSync('./sample2.json', 'utf-8')
    const data = JSON.parse(jsonString);
    console.log(data);
} catch (error) {
    console.log('Error Parsing JSON', error)
}