const CONFIG = "Note.config";




function getListNote(key){
	let json = localStorage.getItem(key);
	let list = JSON.parse(json);
	return list;
}
function saveListPubNote(name, list){
	localStorage.setItem(name, JSON.stringify(list, function replacer(key, value){
		return (key == 'list'|| key == 'parent') ? undefined : value;
	}));
}

function getListName(){
	return localStorage[CONFIG];
}
function createCONFIG(value){
	localStorage.setItem(CONFIG, value);
}

function checkCONF (){
	if (localStorage[CONFIG] != undefined){
		return true;
	} else {
		return false;
	}
}

function deleteLocalStorage (){
	localStorage.clear();
}


function pizdec (){
  return 'РАБОТАЕТ НАХУЙ!'
}
