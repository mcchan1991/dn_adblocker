console.log("background js...");
chrome.webRequest.onBeforeRequest.addListener(
function(details) {
	if(details.type == "xmlhttprequest") {
	 	var query_string = details.url.search;
		var search_params = new URLSearchParams(query_string);
		var id = search_params.get('id');
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(details.tabId, {xhr: "new"}, function(response) {
			});
		});
	}
},
{urls: ["<all_urls>"]},
["requestBody"]
);
