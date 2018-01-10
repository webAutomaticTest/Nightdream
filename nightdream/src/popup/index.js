
import js from 'highlight-javascript'
import Highlight from 'syntax-highlighter'
import './index.css'
import axios from 'axios';

chrome.storage.sync.get('nightmare', function (res) {
	const el = document.querySelector('pre')
	const highlight = Highlight().use(js)
	el.innerText = JSON.stringify(JSON.parse(res.nightmare), null, 2)
	highlight.element(el)
})

const restart = document.getElementById('restart')
restart.addEventListener('click', function (event) {
	chrome.browserAction.setBadgeText({text: ''})
	chrome.runtime.reload()
	window.close()
})

const save = document.getElementById('save')
save.addEventListener('click', function (event) {
	const scenario = document.querySelector('pre').innerText
	var obj = JSON.parse(scenario)
	postScenario(obj)
	window.close()
})

function postScenario(scenario) {
	return new Promise((resolve, reject) => {
		const url = `http://localhost:8086/base/`;
		axios.post(url, scenario)
		.then( response => {
			resolve(response.data);
		})
		.catch(err => {
			reject(err);
		});
	});
}
