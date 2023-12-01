import type { AwsRegion } from "@remotion/lambda";
import { zColor } from "@remotion/zod-types";
import { z } from "zod";

export const REGION: AwsRegion = "us-east-1";

export const SITE_NAME = "unwrapped2023";
export const RAM = 2048;
export const DISK = 2048;
export const TIMEOUT = 240;

const availablePlanets = ["Ice", "Silver", "Gold"] as const;
export type Planet = (typeof availablePlanets)[number];

export const PlanetEnum = z.enum(availablePlanets);

export const LanguagesEnum = z.enum([
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "Rust1",
  "Rust2",
  "Rust3",
  "C++",
  "Ruby",
]);

export const cornerTypeValues = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

export const cornerType = z.enum(cornerTypeValues);
export type Corner = z.infer<typeof cornerType>;

export const languageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("other"),
    name: z.string(),
    color: zColor(),
  }),
  z.object({
    type: z.literal("designed"),
    name: LanguagesEnum,
  }),
]);

export const days = ["0", "1", "2", "3", "4", "5", "6"] as const;
export const topWeekdaySchema = z.enum(days);

export const hours = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
] as const;

export const topHourSchema = z.enum(hours);

export type Hour = (typeof hours)[number];

export type Weekday = (typeof days)[number];

export const compositionSchema = z.object({
  language1: languageSchema,
  language2: languageSchema.or(z.null()),
  language3: languageSchema.or(z.null()),
  corner: cornerType,
  showHelperLine: z.boolean(),
  login: z.string(),
  planet: PlanetEnum,
  starsGiven: z.number(),
  issuesOpened: z.number(),
  issuesClosed: z.number(),
  totalPullRequests: z.number(),
  topWeekday: topWeekdaySchema,
  topHour: topHourSchema,
});

export const RenderRequest = z.object({
  id: z.string(),
  inputProps: compositionSchema,
});
