import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string()
    .nonempty("Email Tidak Boleh Kosong")
    .email("Email tidak valid"),
  password: z.string().nonempty("Password Tidak Boleh Kosong"),
});
