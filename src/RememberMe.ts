import DomUtils from "@utils/DomUtils";
import MemoryUtils from "@utils/MemoryUtils";
import DiffUtils from "@utils/DiffUtils";

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

export default class RememberMe {
	private static readonly defaultRecallOptions: RecallOptions = {
		textTolerance: 0.1,
	};

	private static readonly defaultRememberOptions: RememberOptions = {
		recordAncestorText: false,
	};

	public static remember(element: HTMLElement, options: Partial<RememberOptions> = this.defaultRememberOptions): Memory {
		const memories: Memory[] = DomUtils.mapAncestors(element, (ancestor, ancestorIndex) => {
			const memory: Memory = {
				tagName: ancestor.tagName,
				siblingIndex: Array.from(ancestor.parentElement.children).indexOf(ancestor),
				selectorIndex: null,
			};

			if (ancestor.className) memory.classList = Array.from(ancestor.classList);
			if (ancestor.id) memory.id = ancestor.id;
			if (options.recordAncestorText || ancestorIndex === 0) memory.text = ancestor.textContent;

			const selector = MemoryUtils.createSelector(memory);
			const selectorIndex = Array.from(document.querySelectorAll(selector)).indexOf(ancestor);
			memory.selectorIndex = selectorIndex;

			return memory;
		});

		const baseMemory = memories[0];

		memories.forEach((memory, index) => {
			if (memories[index + 1]) memory.parent = memories[index + 1];
		});

		return baseMemory;
	}

	public static recall(memory: Memory, options: Partial<RecallOptions> = this.defaultRecallOptions): HTMLElement {
		const selector = MemoryUtils.createSelector(memory);
		const possibleMatches: HTMLElement[] = Array.from(document.querySelectorAll(selector));
		const possibleMatch = possibleMatches[memory.selectorIndex];
		const diffFrac = DiffUtils.diffFrac(memory.text, possibleMatch.textContent);

		if (diffFrac <= options.textTolerance) return possibleMatch;

		let smallestDiff = Infinity;
		let smallestDiffMatch: HTMLElement;

		possibleMatches.forEach(possibleMatch => {
			const diffFrac = DiffUtils.diffFrac(memory.text, possibleMatch.textContent);
			if (diffFrac < smallestDiff) {
				smallestDiff = diffFrac;
				smallestDiffMatch = possibleMatch;
			}
		});

		if (smallestDiff <= smallestDiff) return smallestDiffMatch;
		// TODO: if the selectorIndex test fails, and
		// possibleMatches has multiple diffs that are
		// better than options.textTolerance we should
		// use the ancestors chain to build a more
		// specific selector
		// TODO: if no matches are found with reasonably
		// close text, try matching the selector without
		// ID, tagname, or even class (may require using
		// ancestors)
		return null;
	}
}