import { z } from 'zod'

export const employeeSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Invalid email address'),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, 'Phone must be 10-11 digits'),
  department: z
    .string()
    .min(1, 'Please select a department'),
  position: z
    .string()
    .min(2, 'Position must be at least 2 characters'),
  salary: z
    .number({ invalid_type_error: 'Salary must be a number' })
    .min(1000000, 'Salary must be at least 1,000,000')
    .max(1000000000, 'Salary must be less than 1,000,000,000'),
  status: z
    .enum(['active', 'inactive'], { required_error: 'Please select a status' }),
  joinDate: z
    .string()
    .min(1, 'Please select a join date'),
})

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
})
