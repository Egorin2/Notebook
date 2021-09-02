function Note (string){
	this.text = string,
	this.url = window.location.href,
this.time = new Date};

function Note (string, url){
	this.id;
	this.title;
	this.text = string,
	this.url = url,
	this.time = new Date;
}

function download(data) { // Функция загрузки в файл
	let type = 'text/plain';
	let filename = 'myfilename.txt';
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}


function createNote (word) {
	let note = new Note (word.selectionText, word.pageUrl);
	getItem(note);}


chrome.contextMenus.create({
title: "Типа кнопка",
 contexts:["selection"],  // ContextType
 onclick: createNote,
})
chrome.contextMenus.create({
	title: "Посмотреть хранилище",
	contexts: ["selection"],
	onclick: checkLocalStorage,
})
chrome.contextMenus.create({
	title: "Удалить всё",
	contexts: ["selection"],
	onclick: deleteLocalStorage,
})

function checkLocalStorage (){
	alert(localStorage.length);
	for(let i=0; i<localStorage.length; i++) {
		  let key = localStorage.key(i);
			alert(`${key}: ${localStorage.getItem(key)}`);};
}
