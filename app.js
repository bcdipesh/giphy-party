'use strict';

// DOM elements
const searchGifForm = document.querySelector('.search-gif-form');
const removeGifBtn = document.querySelector('.remove-gif-btn');
const gifs = document.querySelector('.gifs');

const API_KEY = '7c27E1ivgpVeKpt0oBw1oTnHIHbyi6zk';
const previousGifs = [];

/**
 * Searches for a GIF and returns the first GIF that matches the searchTerm
 *
 * @param {string} searchTerm   The search term used to search gif
 * @returns {Object}            A GIF object
 */
const searchGif = async (searchTerm) => {
	try {
		const response = await axios.get(
			'https://api.giphy.com/v1/gifs/search',
			{
				params: {
					api_key: API_KEY,
					q: searchTerm,
				},
			}
		);

		// get a random unique gif index from the list of gifs that are matched
		let gif;

		while (true) {
			gif = Math.floor(Math.random() * response.data.data.length) + 1;
			if (previousGifs.indexOf(gif) < 0) {
				previousGifs.push(gif);
				break;
			}
		}

		return response.data.data[gif];
	} catch (error) {
		console.log(error.message);
	}
};

/**
 * Appends a GIF image to the DOM
 *
 * @param {Object} gif  The Object that has details about the gif
 */
const appendGifToDOM = (gif) => {
	const img = document.createElement('img');
	img.width = 360;
	img.height = 360;
	img.src = gif.images.original.url;
	img.alt = gif.title;

	img.classList.add('gif');

	gifs.append(img);
};

searchGifForm.addEventListener('submit', async (e) => {
	// stop form submission
	e.preventDefault();

	// get user input
	const searchTerm = document.querySelector('#search-term').value;

	const gif = (await searchGif(searchTerm)) ?? (await searchGif('not found'));
	appendGifToDOM(gif);
});

removeGifBtn.addEventListener('click', (e) => {
	gifs.innerHTML = '';
});
