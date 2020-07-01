import { Rhum } from "https://deno.land/x/rhum@v1.0.0/mod.ts";
import { expect } from "https://deno.land/x/expect/mod.ts";

export const describe = Rhum.testSuite;
export const it = Rhum.testCase;
export const beforeEach = Rhum.beforeEach;
export const beforeAll = Rhum.beforeAll;

export const run = Rhum.run;

export { expect, Rhum };
