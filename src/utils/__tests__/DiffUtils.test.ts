import "jest";
import DiffUtils from "@utils/DiffUtils";

describe("DiffUtils", () => {
	describe("diffFrac", () => {
		test("0%", () => {
			expect(DiffUtils.diffFrac("hello", "hello")).toBe(0);
		});
	});
});
