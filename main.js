function Note (string){
	this.text = string,
	this.url = window.location.href,
this.time = new Date};

function Note (string, url){
	this.text = string,
	this.url = url,
	this.time = new Date;
}

function download(data) { // Функция загрузки в файл
	let type = 'text/plain';
	let filename = 'myfilename.txt';
    let file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        let a = document.createElement("a"),
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
	takeNote(note);}


chrome.contextMenus.create({
title: "Типа кнопка",
 contexts:["selection"],  // ContextType
 onclick: createNote,
})
chrome.contextMenus.create({
	title: "Посмотреть LS",
	contexts: ["selection"],
	onclick: checkLocalStorage,
})
chrome.contextMenus.create({
	title: "Посмотреть хранилище",
	contexts: ["selection"],
	onclick: checkList,
})
chrome.contextMenus.create({
	title: "Удалить всё",
	contexts: ["selection"],
	onclick: deleteLocalStorage,
})
function checkList(){
	alert(testPubNote())
}
function checkLocalStorage (){
	alert(localStorage.length);
	for(let i=0; i<localStorage.length; i++) {
		  let key = localStorage.key(i);
			alert(`${key}: ${localStorage.getItem(key)}`);};
}
