import * as Diff from "diff";

export default class DiffUtils {
	public static diffFrac(str1: string, str2: string): number {
		const diff = Diff.diffWords(str1, str2);

		return diff.reduce((frac, diffItem) => {
			if (diffItem.added) frac += diffItem.value.length / str1.length;
			if (diffItem.removed) frac += diffItem.value.length / str1.length;
			return frac;
		}, 0);
	}
}