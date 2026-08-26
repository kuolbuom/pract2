import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  //Notice that some objects have: "latin": "..." and some do not. That is exactly why we use: latin?: string;
  latin?: string;
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

//Then create the Gender type:
export type Gender = (typeof Gender)[keyof typeof Gender];

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().optional(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
}

// export interface Patient {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   gender: string;
//   occupation: string;
// }

export type NonSensitivePatient = Omit<Patient, "ssn">;

//Your existing Patient requires an id: But when the frontend sends a new patient, it should not need to provide the ID:
// export type NewPatient = Omit<Patient, "id">;
