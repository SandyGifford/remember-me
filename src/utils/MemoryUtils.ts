export interface Memory {
	parent?: Memory;
	tagName: string;
	siblingIndex: number;
	selectorIndex: number;
	classList?: string[];
	id?: string;
	text?: string;
}

export interface RecallOptions {
	textTolerance: number;
}

export interface RememberOptions {
	recordAncestorText: boolean;
}

export default class MemoryUtils {
	/**
	 * Creates a selector from a given Memory
	 * @param memory A Memory
	 * @returns a selector
	 */
	public static createSelector(memory: Memory): string {
		let selector = memory.tagName;
		if (memory.id) selector += `#${memory.id}`;
		if (memory.classList) selector += `.${memory.classList.join(".")}`;

		return selector;
	}

	public static makeMemory(element: HTMLElement, options: Partial<RememberOptions>, level = 0): Memory {
		const memory = this.makeFlatMemory(element, options.recordAncestorText || level === 0);
		if (element.parentElement) memory.parent = this.makeMemory(element.parentElement, options, level + 1);
		return memory;
	}

	/**
	 * Creates a Memory without ancestors from an element
	 * @param element An element
	 * @param recordText If false, no text content will be recorded for the element
	 * @returns A new Memory object without ancestors
	 */
	public static makeFlatMemory(element: HTMLElement, recordText: boolean): Memory {
		const parent = element.parentElement;
		
		const memory: Memory = {
			tagName: element.tagName,
			siblingIndex: parent ? Array.from(parent.children).indexOf(element) : 0,
			selectorIndex: null,
		};

		if (element.className) memory.classList = Array.from(element.classList);
		if (element.id) memory.id = element.id;
		if (recordText) memory.text = element.textContent;

		const selector = MemoryUtils.createSelector(memory);
		const selectorIndex = Array.from(document.querySelectorAll(selector)).indexOf(element);
		memory.selectorIndex = selectorIndex;

		return memory;
	}
}