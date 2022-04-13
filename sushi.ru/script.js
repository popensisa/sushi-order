

const productsBtn = document.querySelectorAll('.btn-order');
const cartProductList = document.querySelector('.cart-content__list');
const carts = document.querySelector('.carts');
const cartQuantity = document.querySelector('.cart_quantity');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};

const printQuantity = () => {
	let productsListLength = cartProductList.querySelector('.simplebar-content').children.length;
	cartQuantity.textContent = productsListLength;
};

const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} ₽`;
};

const generateCartProduct = (img, title, price, id) =>{
    return `
    <li class="cart-content__item">
    <article class="cart-content__product cart-product" data-id="${id}">
        <img src="${img}" alt="" class="cart-product__img">
        <div class="cart-product__text">
            <h3 class="cart-product__title">${title}</h3>
            <span class="cart-product__price">${price}</span>
        </div>
        <button class="cart-product__delete">Удалить</button>
    </article>
    </li>
    `
}

const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.cart-product').dataset.id;
	document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
	
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
	minusFullPrice(currentPrice);
	printFullPrice();
	productParent.remove();

	printQuantity();
};

productsBtn.forEach(el => {
	el.closest('.product').setAttribute('data-id', randomId());

	el.addEventListener('click', (e) => {
        let self = e.currentTarget;
		let parent = self.closest('.product');
		let id = parent.dataset.id;
		let img = parent.querySelector('.images__order img').getAttribute('src');
		let title = parent.querySelector('.product__title').textContent;
		let priceString = priceWithoutSpaces(parent.querySelector('.product-price__current').textContent);
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').textContent));

		plusFullPrice(priceNumber);
        console.log(price);
		printFullPrice();

		cartProductList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
		printQuantity();

		
		self.disabled = true;
	});
});


cartProductList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product__delete')) {
		deleteProducts(e.target.closest('.cart-content__item'));
	}
});


let d = new Date();
let data = d.setDate(d.getDate() + 1);
console.log(d.toISOString().substr(0,10));

let t = new Date();
let dat = t.setDate(t.getDate() + 2);
console.log(t.toISOString().substr(0,10));

let b = new Date();
let da = b.setDate(b.getDate() + 3);
console.log(b.toISOString().substr(0,10));




const orderDATA = (d,t,b) =>{
    return `
    <option>
	${d.toISOString().substr(0,10)}
	</option>
	<option>
	${t.toISOString().substr(0,10)}
	</option>
	<option>
	${b.toISOString().substr(0,10)}
	</option>
    `
}

const datainsert = document.querySelector('.datainsert');

datainsert.insertAdjacentHTML('afterbegin', orderDATA(d,t,b));



