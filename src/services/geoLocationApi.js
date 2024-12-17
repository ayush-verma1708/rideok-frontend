export const getLocationData = async (query, retries = 3) => {
  try {
    if (query.length >= 2) {
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append(
        'x-apihub-key',
        'LJ6uia2Hrfhxs-vuKjkpNibD4qRfaucds-nEO8NFdDHOpFZoO8'
      );
      myHeaders.append('x-apihub-host', 'TrueWay-Places-API.allthingsdev.co');
      myHeaders.append(
        'x-apihub-endpoint',
        'ecb01dec-9d2a-4419-9261-be978e24e507'
      );

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      // const response = await fetch(
      //   `https://TrueWay-Places-API.proxy-production.allthingsdev.co/PlacesService/FindPlaceByText?text=${query}&language=en&bounds=`,
      //   requestOptions
      // );
      const response = await fetch(
        `https://TrueWay-Places-API.proxy-production.allthingsdev.co/PlacesService/FindPlaceByText?text=${query}&language=en`, // Remove bounds or provide valid bounds
        requestOptions
      );

      const data = await response.json();
      console.log(data);
      return data.results || [];
    }
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      // Retry after 1 second if rate limited
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return getLocationData(query, retries - 1);
    } else {
      console.error('Error fetching location data:', error);
      throw new Error('Error fetching location data. Please try again later.');
    }
  }
};
