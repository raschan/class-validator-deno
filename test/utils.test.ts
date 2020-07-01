import { Rhum, expect } from "./dep.ts";

import { convertToArray } from "../src/utils.ts";

// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Specifications: utils unit tests
// -------------------------------------------------------------------------

Rhum.testPlan("utils", () => {
    Rhum.testSuite("convertToArray", () => {
        Rhum.testCase("convert Set into array", () => {
            const setExample = new Set<string>();
            setExample.add("hello");
            setExample.add("world");

            const newArr = convertToArray(setExample);
            expect(newArr).toBeInstanceOf(Array);
            expect(newArr.length).toEqual(2);
            expect(newArr).toContain("hello");
            expect(newArr).toContain("world");
        });

        Rhum.testCase("convert Map into array of values", function () {
            const map = new Map<string, string>();
            map.set("key1", "hello");
            map.set("key2", "world");

            const newArr = convertToArray(map);
            expect(newArr).toBeInstanceOf(Array);
            expect(newArr.length).toEqual(2);
            expect(newArr).toContain("hello");
            expect(newArr).toContain("world");
        });

        Rhum.testCase("should return array untouched", function () {
            const arr = ["hello", "world"];

            const newArr = convertToArray(arr);
            expect(newArr).toBeInstanceOf(Array);
            expect(newArr.length).toEqual(2);
            expect(newArr).toContain("hello");
            expect(newArr).toContain("world");
        });
    });
});

Rhum.run();
