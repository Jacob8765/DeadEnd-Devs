import { z } from "zod";

export const timelineFilters = z.object({
    filters: z.object({
        authorID: z.string().optional(),
        //add programming languages, etc
    }).optional(),
    sort: z.enum(["asc", "desc"]).default("desc"),
    limit: z.number().min(5).max(50).default(5),
    cursor: z.string(),
});

export type TimelineFilters = z.infer<typeof timelineFilters>;