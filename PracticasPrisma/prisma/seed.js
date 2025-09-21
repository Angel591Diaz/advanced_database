const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Limpiamos la base de datos en un orden específico para evitar errores de llaves foráneas
  console.log('Cleaning existing data...');
  await prisma.users_affecters.deleteMany();
  await prisma.causing_users.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.issues.deleteMany();
  await prisma.assigned_subject.deleteMany();
  await prisma.career.deleteMany();
  await prisma.classroom.deleteMany();
  await prisma.users.deleteMany();
  await prisma.type_users.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.grades.deleteMany();
  await prisma.groups.deleteMany();
  await prisma.cycle.deleteMany();
  await prisma.severity.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.type_classroom.deleteMany();
  await prisma.type_issues.deleteMany();


  // 1. Crear datos para tablas sin dependencias
  console.log('Creating independent data...');
  const typeUsers = [];
  const userTypes = ['Student', 'Teacher', 'Admin', 'Coordinator'];
  for (const type of userTypes) {
    typeUsers.push(await prisma.type_users.create({ data: { s_Name_Type_User: type } }));
  }
  for (let i = 0; i < 11; i++) { // 15 total
    typeUsers.push(await prisma.type_users.create({ data: { s_Name_Type_User: faker.person.jobType() + `_${i}` } }));
  }

  const faculties = [];
  for (let i = 0; i < 15; i++) {
    faculties.push(await prisma.faculty.create({ data: { s_Name_Faculty: faker.company.name() + ' Faculty' } }));
  }

  const grades = [];
  for (let i = 0; i < 15; i++) {
    grades.push(await prisma.grades.create({ data: { s_Name_Grades: `${i + 1} Grade` } }));
  }

  const groups = [];
  for (let i = 0; i < 15; i++) {
    groups.push(await prisma.groups.create({ data: { s_Name_Groups: `Group ${String.fromCharCode(65 + i)}` } }));
  }

  const cycles = [];
  for (let i = 0; i < 15; i++) {
    cycles.push(await prisma.cycle.create({ data: { s_Name_Cycle: `Cycle ${2025 + i}` } }));
  }
  
  const severities = [];
  for (let i = 0; i < 15; i++) {
    severities.push(await prisma.severity.create({ data: { s_Name_Severity: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Critical']) } }));
  }

  const subjects = [];
  for (let i = 0; i < 15; i++) {
    subjects.push(await prisma.subject.create({ data: { s_Name_Subject: faker.hacker.phrase() } }));
  }

  const typeClassrooms = [];
  for (let i = 0; i < 15; i++) {
    typeClassrooms.push(await prisma.type_classroom.create({ data: { s_Name_Type_Classroom: faker.helpers.arrayElement(['Lab', 'Auditorium', 'Standard']) } }));
  }
  
  const typeIssues = [];
  for (let i = 0; i < 15; i++) {
    typeIssues.push(await prisma.type_issues.create({ data: { s_Name_Type_Issue: faker.lorem.word(), s_Description_Type_Issue: faker.lorem.sentence() } }));
  }


  // 2. Crear datos para tablas con dependencias
  console.log('Creating dependent data...');
  const users = [];
  for (let i = 0; i < 15; i++) {
    users.push(await prisma.users.create({
      data: {
        s_Full_Name_User: faker.person.fullName(),
        i_Enrollment_Number: parseInt(faker.string.numeric(8)),
        s_Password: faker.internet.password(),
        s_Gender: faker.person.gender(),
        i_Age: faker.number.int({ min: 18, max: 60 }),
        s_Institutional_Email: faker.internet.email({firstName: `user${i}`}),
        s_Phone_Number: faker.phone.number(),
        fkiCod_TypeUser: faker.helpers.arrayElement(typeUsers).iCod_Type_User,
      }
    }));
  }

  const careers = [];
  for (let i = 0; i < 15; i++) {
    careers.push(await prisma.career.create({
      data: {
        s_Name_Career: faker.person.jobTitle(),
        fkiCod_Faculty: faker.helpers.arrayElement(faculties).iCod_Faculty,
        fkiCod_User: faker.helpers.arrayElement(users).iCod_User,
      }
    }));
  }

  const classrooms = [];
  for (let i = 0; i < 15; i++) {
    classrooms.push(await prisma.classroom.create({
      data: {
        s_Name_Classroom: `Room ${100 + i}`,
        fkiCod_Grades: faker.helpers.arrayElement(grades).iCod_Grades,
        fkiCod_Groups: faker.helpers.arrayElement(groups).iCod_Groups,
      }
    }));
  }

  const assignedSubjects = [];
  for (let i = 0; i < 15; i++) {
    assignedSubjects.push(await prisma.assigned_subject.create({
      data: {
        i_TotalHours: faker.number.int({ min: 20, max: 60 }),
        fkiCod_Subject: faker.helpers.arrayElement(subjects).iCod_Subject,
        fkiCod_User: faker.helpers.arrayElement(users).iCod_User, // A teacher user
      }
    }));
  }

  const schedules = [];
  for (let i = 0; i < 15; i++) {
    schedules.push(await prisma.schedule.create({
      data: {
        i_Total_Hours: 2,
        t_Star_Hours: faker.date.future(),
        t_End_Hours: faker.date.future(),
        fkiCod_Cycle: faker.helpers.arrayElement(cycles).iCod_Cycle,
        fkiCod_Assigned_Subject: faker.helpers.arrayElement(assignedSubjects).iCod_Assigned_Subject,
      }
    }));
  }

  // 3. Crear datos para tablas complejas (issues y sus relaciones)
  console.log('Creating complex relational data...');
  const issues = [];
  for (let i = 0; i < 15; i++) {
    const userRegister = faker.helpers.arrayElement(users);
    let userReviewer = faker.helpers.arrayElement(users);
    while (userReviewer.iCod_User === userRegister.iCod_User) { // Asegurarnos que no sea el mismo usuario
      userReviewer = faker.helpers.arrayElement(users);
    }
    
    issues.push(await prisma.issues.create({
      data: {
        s_Issue_Description: faker.lorem.sentence(),
        dt_Date_Time: faker.date.recent(),
        e_State_Review: faker.helpers.arrayElement(['Open', 'InProgress', 'Complete']),
        fkiCod_Type_Issues: faker.helpers.arrayElement(typeIssues).iCod_Type_Issue,
        fkiCod_Classroom: faker.helpers.arrayElement(classrooms).iCod_Classroom,
        fkiCod_Severity: faker.helpers.arrayElement(severities).iCod_Severity,
        fkiCod_User_Register: userRegister.iCod_User,
        fkiCod_User_Reviewer: userReviewer.iCod_User,
      }
    }));
  }

  const uniqueCausingPairs = new Set();
  while(uniqueCausingPairs.size < 15) {
    const user = faker.helpers.arrayElement(users);
    const issue = faker.helpers.arrayElement(issues);
    const pair = `${user.iCod_User}-${issue.iCod_Issues}`;
    if (!uniqueCausingPairs.has(pair)) {
      await prisma.causing_users.create({ data: { fkiCod_Users: user.iCod_User, fkiCod_Issues: issue.iCod_Issues } });
      uniqueCausingPairs.add(pair);
    }
  }

  const uniqueAffectedPairs = new Set();
  while(uniqueAffectedPairs.size < 15) {
    const user = faker.helpers.arrayElement(users);
    const issue = faker.helpers.arrayElement(issues);
    const pair = `${user.iCod_User}-${issue.iCod_Issues}`;
    if (!uniqueAffectedPairs.has(pair)) {
      await prisma.users_affecters.create({ data: { fkiCod_Users: user.iCod_User, fkiCod_Issues: issue.iCod_Issues } });
      uniqueAffectedPairs.add(pair);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });