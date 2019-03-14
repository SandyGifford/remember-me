import MemoryUtils, { RecallOptions, RememberOptions, Memory } from "@utils/MemoryUtils";
import DiffUtils from "@utils/DiffUtils";

export default class RememberMe {
	private static readonly defaultRecallOptions: RecallOptions = {
		textTolerance: 0.1,
	};

	private static readonly defaultRememberOptions: RememberOptions = {
		recordAncestorText: false,
	};

	public static remember(element: HTMLElement, options: Partial<RememberOptions> = this.defaultRememberOptions): Memory {
		return MemoryUtils.makeMemory(element, options);
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