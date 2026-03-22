export default class Scroller // Zuständig für das automatische Scrollen
{
	static #currentScrollPosition;
	static #currentScrollSelector;
	
	static #getCurrentPosition()
	{
		return document.querySelector(Scroller.#currentScrollSelector).getBoundingClientRect().y;
	}

	static saveCurrentScrollPosition(selector)
	{
		Scroller.#currentScrollSelector = selector;
		Scroller.#currentScrollPosition = Scroller.#getCurrentPosition();
	}

	static scrollToSavedPosition()
	{
		Scroller.#scrollToSavedPositionInternal();
		// 100ms später nochmal ausführen, da Webseite zum Ausführungszeitpunkt dieser Funktion teilweise noch nicht stabil
		setTimeout(() => Scroller.#scrollToSavedPositionInternal(), 100);
	}

	static #scrollToSavedPositionInternal()
	{
		let curPosition = Scroller.#getCurrentPosition();
		let difference = curPosition - Scroller.#currentScrollPosition;
		window.scrollBy(0, difference);
	}
}