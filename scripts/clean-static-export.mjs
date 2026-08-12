import { rm } from "node:fs/promises";
import path from "node:path";

const exportRoot = path.resolve(process.cwd(), "out");
const placeholderRoute = path.resolve(exportRoot, "blog", "_prazno");

if (!placeholderRoute.startsWith(`${exportRoot}${path.sep}`)) {
  throw new Error("Odbijeno čišćenje izvan statičkog export direktorija.");
}

await rm(placeholderRoute, { recursive: true, force: true });
