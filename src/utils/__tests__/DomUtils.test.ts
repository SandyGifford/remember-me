import "jest";
import DomUtils from "../DomUtils";

// FIXME: this is too much complexity for a test.  Use pre-made HTML files for testing.
function resetDomWithDepth(depth: number): HTMLElement {
	let el = document.body;
	el.innerHTML = "";

	for (let i = 0; i < depth; i++) {
		const newEl = document.createElement("div");
		el.appendChild(newEl);
		el = newEl;
	}

	return el;
}

describe("DomUtils", () => {
	describe("forEachAncestor", () => {
		describe("times called", () => {
			test("100 depth", () => {
				const el = resetDomWithDepth(100);
				const fn = jest.fn();
				DomUtils.forEachAncestor(el, fn);
				expect(fn).toBeCalledTimes(101);
			});

			test("1 depth", () => {
				const el = resetDomWithDepth(1);
				const fn = jest.fn();
				DomUtils.forEachAncestor(el, fn);
				expect(fn).toBeCalledTimes(2);
			});

			test("0 depth (element is body)", () => {
				const el = document.body;
				const fn = jest.fn();
				DomUtils.forEachAncestor(el, fn);
				expect(fn).toBeCalledTimes(1);
			});
		});
	});

	describe("mapAncestors", () => {
		describe("times called", () => {
			test("100 depth", () => {
				const el = resetDomWithDepth(100);
				const fn = jest.fn();
				DomUtils.mapAncestors(el, fn);
				expect(fn).toBeCalledTimes(101);
			});

			test("1 depth", () => {
				const el = resetDomWithDepth(1);
				const fn = jest.fn();
				DomUtils.mapAncestors(el, fn);
				expect(fn).toBeCalledTimes(2);
			});

			test("0 depth (element is body)", () => {
				const el = document.body;
				const fn = jest.fn();
				DomUtils.mapAncestors(el, fn);
				expect(fn).toBeCalledTimes(1);
			});
		});

		describe("returns array of length", () => {
			test("100 depth", () => {
				const el = resetDomWithDepth(100);
				expect(DomUtils.mapAncestors(el, () => "hello").length).toBe(101);
			});

			test("1 depth", () => {
				const el = resetDomWithDepth(1);
				expect(DomUtils.mapAncestors(el, () => "hello").length).toBe(2);
			});

			test("0 depth (element is body)", () => {
				const el = document.body;
				expect(DomUtils.mapAncestors(el, () => "hello").length).toBe(1);
			});
		});

		describe("return content", () => {
			test("100 depth", () => {
				const el = resetDomWithDepth(100);
				const ret = DomUtils.mapAncestors(el, (ancestor, i) => ({ el: ancestor, index: i }))
				ret.forEach((item, i) => {
					expect(item.el instanceof Element).toBe(true);
					expect(item.index).toBe(i);
				});
			});

			test("1 depth", () => {
				const el = resetDomWithDepth(1);
				const ret = DomUtils.mapAncestors(el, (ancestor, i) => ({ el: ancestor, index: i }))
				ret.forEach((item, i) => {
					expect(item.el instanceof Element).toBe(true);
					expect(item.index).toBe(i);
				});
			});

			test("0 depth (element is body)", () => {
				const el = document.body;
				const ret = DomUtils.mapAncestors(el, (ancestor, i) => ({ el: ancestor, index: i }))
				ret.forEach((item, i) => {
					expect(item.el instanceof Element).toBe(true);
					expect(item.index).toBe(i);
				});
			});
		});
	});
});
