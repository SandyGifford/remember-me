import { Memory } from "@src/RememberMe";

export default class MemoryUtils {
	public static createSelector(memory: Memory): string {
		let selector = memory.tagName;
		if (memory.id) selector += `#${memory.id}`;
		if (memory.classList) selector += `.${memory.classList.join(".")}`;

		return selector;
	}
}