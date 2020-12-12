const getCurrency = require('./utils/getCurrency'); 
const formatValue = require('./utils/formatValue');

(async () => {
    const response = await getCurrency();
    console.log(formatValue(response.val));
})();