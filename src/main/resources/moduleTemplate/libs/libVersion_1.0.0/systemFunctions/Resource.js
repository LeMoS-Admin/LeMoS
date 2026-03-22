export default class Resource
{
	static #resourceMap = new Map();

	static _set(map)
	{
		for (let [key, value] of Object.entries(map))
		{
			this.#resourceMap.set(key, value);
		}
	}

	static get(id)
	{
		return this.#resourceMap.get(id);
	}
}