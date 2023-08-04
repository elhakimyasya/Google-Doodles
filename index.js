const axios = require('axios');
const fs = require('fs');
const path = require('path');

const fetchData = async () => {
    try {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        const url = `https://www.google.com/doodles/json/${currentYear}/${currentMonth}`;
        const response = await axios.get(url);
        const data = response.data;

        const distFolder = path.join(__dirname, 'dist');

        // Check if the 'dist' folder exists, if not, create it
        if (!fs.existsSync(distFolder)) {
            fs.mkdirSync(distFolder, { recursive: true });
        }

        const fileName = `doodles_${currentYear}_${currentMonth}.json`;
        const filePath = path.join(distFolder, fileName);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Data fetched and saved to ${filePath}`);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

fetchData();
