export default class DomUtils {
	/**
     * Performs the specified action for each ancestor of a given element (inclusive)
	 * @param element An element
	 * @param func A callback that's called once for each ancestor (as well as the original element)
	 */
	public static forEachAncestor(element: HTMLElement, func: (ancestor: HTMLElement, index: number) => void): void {
		for (let i = 0; element.parentElement; element = element.parentElement, i++) {
			func(element, i);
		}
	}

	/**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
	 * @param element An element
	 * @param mapper A callback that's called once for each ancestor (as well as the original element)
	 * @returns An array of items
	 */
	public static mapAncestors<T>(element: HTMLElement, mapper: (ancestor: HTMLElement, index: number) => T): T[] {
		const result: T[] = [];
		this.forEachAncestor(element, (ancestor, i) => result.push(mapper(ancestor, i)));
		return result;
	}
}