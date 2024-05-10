import {z} from "zod";

const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(3, 'Nome muito curto'),
  password: z.string().min(8, 'Senha muito curta'),
  confirmPassword: z.string().min(8, 'Senha muito curta'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword']
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export default createUserSchema;