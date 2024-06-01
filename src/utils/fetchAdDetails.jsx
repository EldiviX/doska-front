const fetchAdDetails = async (adId) => {
    try {
        const response = await fetch(`http://localhost:4444/ads/${adId}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Failed to fetch ad details:', error);
        return null;
    }
};

export default fetchAdDetails;