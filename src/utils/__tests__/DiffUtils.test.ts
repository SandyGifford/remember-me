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
			expect(DiffUtils.diffFrac("abc", "def")).toBe(1);
			expect(DiffUtils.diffFrac("foo", "")).toBe(1);
			expect(DiffUtils.diffFrac("", "bar")).toBe(1);
			expect(DiffUtils.diffFrac("what's", "up")).toBe(1);
		});

		test("In between", () => {
			expect(DiffUtils.diffFrac("hello", "world")).toBe(0.8);
			expect(DiffUtils.diffFrac("fool", "foo")).toBe(0.25);
			expect(DiffUtils.diffFrac("foo", "fool")).toBe(0.25);
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
