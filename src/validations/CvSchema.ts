import {z} from 'zod';

export const cvSchema = z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    title: z.string().min(1, "Title is required"),
    summary: z.string().min(1, "Summary is required"),
    email: z.email("Invalid email"),
    phoneNumber: z.object({
        prefix: z.string().min(1, "Prefix length should be more than 1"),
        number: z.string().min(4, "Number length should be more than 1"),
    }),
    location: z.object({
        country: z.string().min(1),
        city: z.string().min(1),
    }),
    skills: z.array(z.string().min(1)),
    experiences: z.array(
        z.object({
            company: z.string().min(1),
            position: z.string().min(1),
            description: z.string().min(1),
            startDate: z.string(), // or z.date() depending on input handling
            endDate: z.string().optional(),
            stillWorking: z.boolean(),
        })
    ),
});

export type CVFormData = z.infer<typeof cvSchema>;
