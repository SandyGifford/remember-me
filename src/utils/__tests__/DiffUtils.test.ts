import "jest";
import DiffUtils from "@utils/DiffUtils";

describe("DiffUtils", () => {
	describe("diffFrac", () => {
		// TODO: this func needs many more test to help define its expected behavior
		test("0%", () => {
			expect(DiffUtils.diffFrac("hello", "hello")).toBe(0);
			expect(DiffUtils.diffFrac("", "")).toBe(0);
			expect(DiffUtils.diffFrac(" ", " ")).toBe(0);
		});

		test("Totally different", () => {
			expect(DiffUtils.diffFrac("hello", "world")).toBe(2);
			// TODO: I'm not exactly sure what percent different this should be
			expect(DiffUtils.diffFrac("fool", "foo")).toBe(1.75);
		});

		test("Errors", () => {
			expect(() => DiffUtils.diffFrac(undefined, undefined)).toThrow();
			expect(() => DiffUtils.diffFrac("hello", undefined)).toThrow();
			expect(() => DiffUtils.diffFrac(undefined, "hello")).toThrow();

			expect(() => DiffUtils.diffFrac(null, null)).toThrow();
			expect(() => DiffUtils.diffFrac("hello", null)).toThrow();
			expect(() => DiffUtils.diffFrac(null, "hello")).toThrow();
		});
	});
});
