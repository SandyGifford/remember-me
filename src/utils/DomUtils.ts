export default class DomUtils {
	public static forEachAncestor(element: HTMLElement, func: (ancestor: HTMLElement, index: number) => void): void {
		for (let i = 0; element.parentElement; element = element.parentElement, i++) {
			func(element, i);
		}
	}

	public static mapAncestors<T>(element: HTMLElement, mapper: (ancestor: HTMLElement, index: number) => T): T[] {
		const result: T[] = [];
		this.forEachAncestor(element, (ancestor, i) => result.push(mapper(ancestor, i)));
		return result;
	}
}