export default class Resource
{
	static #resourceMap = new Map();

	static _set(map)
	{
		this.#resourceMap = new Map(Object.entries(map));
	}

	static get(id)
	{
		return this.#resourceMap.get(id);
	}
}