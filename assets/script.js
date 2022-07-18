const form = document.getElementById('bookForm');
let books = [{}];

let createBookObject = () => {
	return {
		id: +new Date(),
		title: document.getElementById('title').value,
		author: document.getElementById('auth').value,
		year: document.getElementById('year').value,
		isComplete: false,
	};
};

let storeBook = () => {
	let bookObject = createBookObject();
	localStorage.setItem(bookObject.id, JSON.stringify(bookObject));
};

let createList = (book) => {
	const htmlListWait = `<div id="item" class="flex p-3 mt-1 bg-oren rounded shadow-biru">
	<div id="book-${book.id}" class="block">
		<div>${book.title}</div>
		<div>${book.author}, ${book.year}</div>
	</div>
	<button id="${book.id}" class="check-button"></button>
	<button id="${book.id}" class="trash-button"></button>
</div>`;

	const htmlListComplete = `<div id="item" class="flex p-3 mt-1 bg-oren rounded shadow-biru">
	<div id="${book.id}" class="block">
		<div>${book.title}</div>
		<div>${book.author}, ${book.year}</div>
	</div>
	<button id="${book.id}" class="undo-button"></button>
	<button id="${book.id}" class="trash-button"></button>
	</div>`;
	if (book.isComplete === false) {
		document.getElementById('list-wait').innerHTML += htmlListWait;
	} else {
		document.getElementById('list-completed').innerHTML += htmlListComplete;
	}
};

let renderBook = () => {
	getBook();
	for (const book of books) {
		createList(book);
	}
	addCheckButtonEvent();
	addTrashButtonEvent();
	addUndoButtonEvent();
};

let getBook = () => {
	let values = [],
		keys = Object.keys(localStorage),
		i = keys.length;

	while (i--) {
		let item = localStorage.getItem(keys[i]);
		values.push(JSON.parse(item));
	}
	books = values;
};

let moveBook = (bookId) => {
	let item = JSON.parse(localStorage.getItem(bookId));
	if (item.isComplete == false) {
		item.isComplete = true;
	} else {
		item.isComplete = false;
	}
	item = JSON.stringify(item);
	localStorage.setItem(bookId, item);
	location.reload();
};

let trashBook = (bookId) => {
	localStorage.removeItem(bookId);
	location.reload();
};

let addTrashButtonEvent = () => {
	const trashbuttons = document.querySelectorAll('.trash-button');
	for (const trashbutton of trashbuttons) {
		trashbutton.addEventListener('click', (ev) => {
			alert('buku terhapus');
			trashBook(trashbutton.id);
		});
	}
};
let addUndoButtonEvent = () => {
	const undobuttons = document.querySelectorAll('.undo-button');
	for (const undobutton of undobuttons) {
		undobutton.addEventListener('click', (ev) => {
			moveBook(undobutton.id);
		});
	}
};
let addCheckButtonEvent = () => {
	const checkbuttons = document.querySelectorAll('.check-button');
	for (const checkbutton of checkbuttons) {
		checkbutton.addEventListener('click', (ev) => {
			moveBook(checkbutton.id);
		});
	}
};

form.addEventListener('submit', (ev) => {
	storeBook();
	location.reload();
	ev.preventDefault();
});

let openForm = () => {
	document.getElementById('open-form').classList.add('hidden');
	document.getElementById('myForm').classList.remove('hidden');
};
let closeForm = () => {
	document.getElementById('myForm').classList.add('hidden');
	document.getElementById('open-form').classList.remove('hidden');
};

window.onload = renderBook();
