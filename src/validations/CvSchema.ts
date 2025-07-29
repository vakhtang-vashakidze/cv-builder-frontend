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
        country: z.string().min(1, "Country is required"),
        city: z.string().min(1, "City is required"),
    }),
    skills: z.array(z.string().min(1, "Skill cannot be empty")),
    experiences: z.array(
        z.object({
                company: z.string().min(1, "Company is required"),
                position: z.string().min(1, "Position is required"),
                description: z.string().min(1, "Description is required"),
                startDate: z.string().min(1, "Start date is required"),
                endDate: z.string().optional(),
                stillWorking: z.boolean(),
            })
            .superRefine((exp, ctx) => {
                if (!exp.stillWorking && !exp.endDate) {
                    ctx.addIssue({
                        path: ['endDate'],
                        code: z.ZodIssueCode.custom,
                        message: 'End date is required if not still working',
                    });
                }
            })
    ),
});

export type CVFormData = z.infer<typeof cvSchema>;
