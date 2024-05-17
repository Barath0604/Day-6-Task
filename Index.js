fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        // Call functions to perform the required operations
        getCountriesFromAsia(data);
        getCountriesWithPopulationLessThan200K(data);
        printCountryDetails(data);
        printTotalPopulation(data);
        printCountriesUsingUSD(data);
    })
    .catch(error => console.error('Error fetching data:', error));

function getCountriesFromAsia(data) {
    const asianCountries = data.filter(country => country.region === 'Asia');
    console.log('Asian Countries:', asianCountries);
}

function getCountriesWithPopulationLessThan200K(data) {
    const smallPopulationCountries = data.filter(country => country.population < 200000);
    console.log('Countries with population less than 200,000:', smallPopulationCountries);
}

function printCountryDetails(data) {
    data.forEach(country => {
        console.log(`Name: ${country.name.common}, Capital: ${country.capital ? country.capital[0] : 'N/A'}, Flag: ${country.flags.svg}`);
    });
}

function printTotalPopulation(data) {
    const totalPopulation = data.reduce((acc, country) => acc + country.population, 0);
    console.log('Total Population:', totalPopulation);
}

function printCountriesUsingUSD(data) {
    const usdCountries = data.filter(country => {
        if (country.currencies) {
            return Object.values(country.currencies).some(currency => currency.name === 'United States dollar');
        }
        return false;
    });
    console.log('Countries using USD as currency:', usdCountries);
}
