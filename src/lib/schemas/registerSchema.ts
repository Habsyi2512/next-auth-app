import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .nonempty("Nama Tidak Boleh Kosong")
      .min(3, "Nama harus Berisi minimal 3 Karakter")
      .max(55),
    email: z.string().nonempty("Email tidak boleh kosong").email(),
    password: z
      .string()
      .min(8, { message: "Password minimal memiliki 8 karakter" })
      .max(255)
      .regex(/[A-Z]/, "Password harus memiliki minimal 1 huruf kapital") // Huruf kapital
      .regex(/[0-9]/, "Password harus memiliki minimal 1 angka") // Angka
      .regex(/[\W_]/, "Password harus memiliki minimal 1 simbol unik"), // Simbol unik
    confirm: z
      .string()
      .min(8, { message: "Konfirmasi Password minimal memiliki 8 karakter" })
      .max(255)
      .regex(/[A-Z]/, "Password harus memiliki minimal 1 huruf kapital") // Huruf kapital
      .regex(/[0-9]/, "Password harus memiliki minimal 1 angka") // Angka
      .regex(/[\W_]/, "Password harus memiliki minimal 1 simbol unik"), // Simbol unik
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password dan Konfirmasi Password harus sama",
    path: ["confirm"],
  });
