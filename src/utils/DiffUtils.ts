import * as Diff from "diff";

export default class DiffUtils {
	/**
	 * Determines what fraction different 2 strings are
	 * @param str1 A string
	 * @param str2 Another string
	 * @returns A number between 0 and 1 describing how different the strings are
	 */
	public static diffFrac(str1: string, str2: string): number {
		const diff = Diff.diffChars(str1, str2);
		const longerLength = Math.max(str1.length, str2.length);

		if (!longerLength) return str2 === str1 ? 0 : 1;

		return diff.reduce((frac, diffItem) => {
			if (!diffItem.added && !diffItem.removed) frac -= diffItem.value.length / longerLength;
			return frac;
		}, 1);
	}
}