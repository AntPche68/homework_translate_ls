const cardElem = document.forms[0];
const searchElem = document.forms[1];
const resultElem = document.querySelector('#result');

const get_result = () => JSON.parse(localStorage.getItem('resultLst')) || [];
const add_card = deal => localStorage.setItem('resultLst', JSON.stringify([...get_result(), deal]));
const remove_card = deal =>{
	const new_lst = get_result().filter(elem => elem.word !== deal.word);
	localStorage.setItem('resultLst', JSON.stringify(new_lst));
};



function render(list) {
	resultElem.innerText = '';
	for(let elem of list){
		const card = document.createElement('div')
		const closeElem = document.createElement('div')
		const word = document.createElement('div');

		closeElem.addEventListener('click', event =>{
			remove_card(elem);
			render(get_result());
		});

		card.classList.add('card')
		word.classList.add('word')
		closeElem.classList.add('close')

		card.append(word, closeElem);
		resultElem.appendChild(card);
	
		closeElem.innerText = '❌'
		word.innerText = elem.word;
		card.style.background = elem.color;

		card.addEventListener('dblclick', event => {
			if(word.innerText == elem.word){
				word.innerText = elem.translate;
			}else{
				word.innerText = elem.word
			}
		});
	}

};

cardElem.addEventListener('submit', (event) => {
	event.preventDefault();
	const {word, translate, color} = event.target;
	if(word.value !== '' && translate.value !== '' && color.value !== ''){
		add_card({
			word: word.value,
			translate: translate.value,
			color: color.value
		});
	}else{
		alert('Значение одного из полей пустое!');
	}
	word.value = '';
	translate.value = '';
	color.value = '';
	render(get_result());
});

searchElem.addEventListener('input', event => {
	event.preventDefault();
	const findElem = event.target.value;
	const lst = get_result().filter((elem) => elem.word.startsWith(findElem));
	render(lst);
})

render(get_result());











