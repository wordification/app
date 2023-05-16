import { Role } from '@prisma/client'

import { upsertUser } from './upsertUser'

const seedTeacher = async () => {
  return upsertUser({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    password: 'secret2',
    roles: Role.TEACHER,
  })
}

const seedStudent = (teacherId: number) => {
  return upsertUser({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    password: 'secret1',
    roles: Role.STUDENT,
    teacherId,
  })
}

const generateTestUsers = async () => {
  try {
    const teacher = await seedTeacher()
    console.info(`Seeded: 1 teacher`)
    await seedStudent(teacher.id)
    console.info(`Seeded: 1 student`)
  } catch (error) {
    console.warn('Please define seed data.')
    console.error(error)
  }
}

export default generateTestUsers
