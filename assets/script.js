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
	localStorage.setItem(+new Date(), JSON.stringify(bookObject));
	bookKey = parseInt(bookKey);
	bookKey += 1;
	localStorage.setItem('book', bookKey);
};

let createList = (book) => {
	const htmlListWait = `<div id="item" class="flex p-3 mt-1 bg-oren rounded shadow-biru">
	<div id="book-${book.id}" class="block">
		<div>${book.title}</div>
		<div>${book.author}, ${book.year}</div>
	</div>
	<button id="${book.id}" class="check-button"></button>
</div>`;

	const htmlListComplete = `<div id="item" class="flex p-3 mt-1 bg-oren rounded shadow-biru">
	<div id="${book.id}" class="block">
		<div>${book.title}</div>
		<div>${book.author}, ${book.year}</div>
	</div>
	<button id="check-button" class=""></button>
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

let completeBook = (bookId) => {
	let item = JSON.parse(localStorage.getItem(bookId));
	item.isComplete = true;
	item = JSON.stringify(item);
	localStorage.setItem(bookId, item);
};

let addCheckButtonEvent = () => {
	const checkbuttons = document.querySelectorAll('.check-button');
	for (const checkbutton of checkbuttons) {
		checkbutton.addEventListener('click', (ev) => {
			completeBook(checkbutton.id);
		});
	}
};

form.addEventListener('submit', (ev) => {
	storeBook();
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

(window.onload = renderBook()), addCheckButtonEvent();
