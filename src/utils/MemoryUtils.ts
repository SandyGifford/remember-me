import { Memory } from "@src/RememberMe";

export default class MemoryUtils {
	public static createSelector(memory: Memory): string {
		let selector = memory.tagName;
		if (memory.id) selector += `#${memory.id}`;
		if (memory.classList) selector += `.${memory.classList.join(".")}`;

		return selector;
	}

	public static makeFlatMemory(element: HTMLElement, recordText: boolean): Memory {
		const memory: Memory = {
			tagName: element.tagName,
			siblingIndex: Array.from(element.parentElement.children).indexOf(element),
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