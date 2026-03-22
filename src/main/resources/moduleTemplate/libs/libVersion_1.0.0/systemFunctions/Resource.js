export default class Resource
{
	static #resourceMap = new Map();

	static _set(map)
	{
		Resource.#resourceMap = new Map(Object.entries(map));

		// Angelegte Ressourcen im Hintergrund schonmal vorladen
		// Hinweis: in der Ressourcen-Map sind nur Ressourcen hinterlegt, die über general.resources konfiguriert wurden,
		// 			direkt eingesetzte Ressourcen wie in Importen werden somit nicht doppelt angefragt
		for (let resource of Resource.#resourceMap.values())
		{
			let request = new XMLHttpRequest();
			request.open("GET", resource, true);
			request.send();
		}
	}

	static get(id)
	{
		return Resource.#resourceMap.get(id);
	}
}