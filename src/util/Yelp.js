const apiKey = "5lp4gs6bYKv-_cdsKRDyCUILGnB2yBVwjXbqj7ocAvJP9_mNQX2dtwfn6kkAQ1_8uTp_OLEKvwZDBYH6WjWB87Xxyt3yQyljtFz2YAlZO61wr-0glHGmmqh_Y0TzXnYx";
const Yelp = {
	searchYelp(term, location, sortBy){
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {'headers': {'Authorization': `Bearer ${apiKey}`}}).then((response)=>{
			return response.json();
		}).then((jsonResponse) =>{
			if(jsonResponse.businesses){
				console.log(jsonResponse);
				return jsonResponse.businesses.map((business)=>{
					return {
						id: business.id,
						imageSrc: business.image_url,
						name: business.name,
						address: business.location.address1,
						city: business.location.city,
						state: business.location.state,
						zipCode: business.location.zip_code,
						category: business.categories[0].title,
						rating: business.rating,
						reviewCount: business.review_count
					};
				});
			}
		});
	}
};

export default Yelp;