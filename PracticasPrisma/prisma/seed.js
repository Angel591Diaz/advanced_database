const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Helper functions para reemplazar a faker
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Datos inventados
  const facultyNames = ['Ingeniería y Ciencias', 'Economía y Negocios', 'Artes y Humanidades', 'Ciencias de la Salud', 'Ciencias Sociales', 'Derecho', 'Educación'];
  const subjectNames = ['Cálculo Diferencial', 'Programación Orientada a Objetos', 'Bases de Datos', 'Derecho Romano', 'Anatomía Humana', 'Macroeconomía', 'Historia del Arte', 'Sistemas Operativos', 'Redes de Computadoras', 'Inglés Técnico', 'Metodología de la Investigación', 'Contabilidad Financiera', 'Física Moderna', 'Química Orgánica', 'Algoritmos y Estructuras de Datos'];
  const issueTypes = [
    { name: 'Proyector', desc: 'El proyector no enciende o la imagen es de mala calidad.' },
    { name: 'Computadora', desc: 'El equipo de cómputo del aula no funciona o está obsoleto.' },
    { name: 'Mobiliario', desc: 'Sillas, mesas o pizarrón en mal estado.' },
    { name: 'Iluminación', desc: 'Lámparas fundidas o insuficientes en el aula.' },
    { name: 'Ventilación', desc: 'El aire acondicionado o los ventiladores no funcionan.' },
    { name: 'Conectividad', desc: 'Problemas con la red de WiFi o los puertos de red.' },
    { name: 'Software', desc: 'Falta software necesario o el existente no funciona.' },
    { name: 'Limpieza', desc: 'El aula se encuentra sucia o con basura.' },
    { name: 'Ruido', desc: 'Exceso de ruido proveniente del exterior o de otras aulas.' },
    { name: 'Seguridad', desc: 'Problemas con cerraduras, ventanas o equipo de seguridad.' },
    { name: 'Material Didáctico', desc: 'Falta de marcadores, borradores u otro material.' },
    { name: 'Accesibilidad', desc: 'Problemas de acceso para personas con discapacidad.' },
    { name: 'Energía Eléctrica', desc: 'Contactos insuficientes o sin funcionar.' },
    { name: 'Humedad', desc: 'Filtraciones de agua o problemas de humedad en paredes/techo.' },
    { name: 'Otro', desc: 'Cualquier otro tipo de problema no listado.' },
  ];
  const userNames = ['Carlos Sánchez', 'Ana López', 'Juan Martínez', 'María González', 'Luis Rodríguez', 'Laura Pérez', 'José Hernández', 'Sofía Gómez', 'Miguel Díaz', 'Elena Torres', 'David Ramírez', 'Isabel Flores', 'Javier Ortiz', 'Carmen Morales', 'Fernando Romero'];
  const careerNames = ['Ingeniería de Software', 'Licenciatura en Administración', 'Arquitectura', 'Medicina', 'Derecho', 'Psicología', 'Contaduría Pública', 'Diseño Gráfico', 'Gastronomía', 'Ingeniería Civil', 'Relaciones Internacionales', 'Marketing Digital', 'Pedagogía', 'Comunicación', 'Nutrición'];
  const issueDescriptions = [
    'La lámpara del proyector parpadea constantemente.',
    'El ordenador principal no pasa de la pantalla de arranque.',
    'Hay varias sillas rotas en la última fila.',
    'La conexión a internet es intermitente y muy lenta.',
    'El aire acondicionado gotea y no enfría lo suficiente.',
    'Faltan marcadores para el pizarrón blanco.',
    'Una de las ventanas no cierra correctamente.',
    'El enchufe cercano al escritorio del profesor no tiene corriente.',
    'Se requiere la instalación de la paquetería de Adobe.',
    'El mouse del equipo del profesor no funciona.',
  ];

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

  const faculties = [];
  for (let i = 0; i < 7; i++) {
    faculties.push(await prisma.faculty.create({ data: { s_Name_Faculty: facultyNames[i] } }));
  }

  const grades = [];
  for (let i = 0; i < 8; i++) {
    grades.push(await prisma.grades.create({ data: { s_Name_Grades: `${i + 1} Grade` } }));
  }

  const groups = [];
  for (let i = 0; i < 6; i++) {
    groups.push(await prisma.groups.create({ data: { s_Name_Groups: `Group ${String.fromCharCode(65 + i)}` } }));
  }

  const cycles = [];
  for (let i = 0; i < 15; i++) {
    cycles.push(await prisma.cycle.create({ data: { s_Name_Cycle: `Cycle ${2010 + i}` } }));
  }
  
  const severities = [];
  const severitiesTypes = ['Low', 'Medium', 'High', 'Critical'];
  for (const type of severitiesTypes) {
    severities.push(await prisma.severity.create({ data: { s_Name_Severity: type } }));
  }

  const subjects = [];
  for (let i = 0; i < 15; i++) {
    subjects.push(await prisma.subject.create({ data: { s_Name_Subject: subjectNames[i] } }));
  }

  const typeClassrooms = [];
  const clssroomsType = ['Lab', 'Auditorium', 'Standard'];
  for (const type of clssroomsType) {
    typeClassrooms.push(await prisma.type_classroom.create({ data: { s_Name_Type_Classroom: type } }));
  }
  
  const typeIssues = [];
  for (let i = 0; i < 15; i++) {
    typeIssues.push(await prisma.type_issues.create({ data: { s_Name_Type_Issue: issueTypes[i].name, s_Description_Type_Issue: issueTypes[i].desc } }));
  }


  // 2. Crear datos para tablas con dependencias
  console.log('Creating dependent data...');
  const users = [];
  for (let i = 0; i < 15; i++) {
    const nameParts = userNames[i].split(' ');
    const email = `${nameParts[0].toLowerCase()}.${nameParts[1].toLowerCase()}${i}@example.com`;
    users.push(await prisma.users.create({
      data: {
        s_Full_Name_User: userNames[i],
        i_Enrollment_Number: parseInt(`2024${String(i).padStart(4, '0')}`),
        s_Password: 'password123', // Usar una contraseña estática para pruebas
        s_Gender: i % 2 === 0 ? 'Masculino' : 'Femenino',
        i_Age: getRandomInt(18, 55),
        s_Institutional_Email: email,
        s_Phone_Number: `314-${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`,
        fkiCod_TypeUser: getRandomElement(typeUsers).iCod_Type_User,
      }
    }));
  }

  const careers = [];
  for (let i = 0; i < 15; i++) {
    careers.push(await prisma.career.create({
      data: {
        s_Name_Career: careerNames[i],
        fkiCod_Faculty: getRandomElement(faculties).iCod_Faculty,
        fkiCod_User: getRandomElement(users).iCod_User, // Asigna un coordinador de carrera
      }
    }));
  }

  const classrooms = [];
  for (let i = 0; i < 15; i++) {
    classrooms.push(await prisma.classroom.create({
      data: {
        s_Name_Classroom: `Room ${100 + i}`,
        fkiCod_Grades: getRandomElement(grades).iCod_Grades,
        fkiCod_Groups: getRandomElement(groups).iCod_Groups,
      }
    }));
  }

  const assignedSubjects = [];
  for (let i = 0; i < 15; i++) {
    assignedSubjects.push(await prisma.assigned_subject.create({
      data: {
        i_TotalHours: getRandomInt(30, 80),
        fkiCod_Subject: getRandomElement(subjects).iCod_Subject,
        fkiCod_User: getRandomElement(users).iCod_User, // Asigna un profesor
      }
    }));
  }

  const schedules = [];
  for (let i = 0; i < 15; i++) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + i);
    startDate.setHours(getRandomInt(7, 18), 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 2);

    schedules.push(await prisma.schedule.create({
      data: {
        i_Total_Hours: 2,
        t_Star_Hours: startDate,
        t_End_Hours: endDate,
        fkiCod_Cycle: getRandomElement(cycles).iCod_Cycle,
        fkiCod_Assigned_Subject: getRandomElement(assignedSubjects).iCod_Assigned_Subject,
      }
    }));
  }

  // 3. Crear datos para tablas complejas (issues y sus relaciones)
  console.log('Creating complex relational data...');
  const issues = [];
  for (let i = 0; i < 15; i++) {
    const userRegister = getRandomElement(users);
    let userReviewer = getRandomElement(users);
    while (userReviewer.iCod_User === userRegister.iCod_User) { // Asegurarnos que no sea el mismo usuario
      userReviewer = getRandomElement(users);
    }
    
    const creationDate = new Date();
    creationDate.setDate(creationDate.getDate() - getRandomInt(1, 30)); // Fechas en el pasado reciente

    issues.push(await prisma.issues.create({
      data: {
        s_Issue_Description: getRandomElement(issueDescriptions),
        dt_Date_Time: creationDate,
        e_State_Review: getRandomElement(['Open', 'InProgress', 'Complete']),
        fkiCod_Type_Issues: getRandomElement(typeIssues).iCod_Type_Issue,
        fkiCod_Classroom: getRandomElement(classrooms).iCod_Classroom,
        fkiCod_Severity: getRandomElement(severities).iCod_Severity,
        fkiCod_User_Register: userRegister.iCod_User,
        fkiCod_User_Reviewer: userReviewer.iCod_User,
      }
    }));
  }

  const uniqueCausingPairs = new Set();
  while(uniqueCausingPairs.size < 15) {
    const user = getRandomElement(users);
    const issue = getRandomElement(issues);
    const pair = `${user.iCod_User}-${issue.iCod_Issues}`;
    if (!uniqueCausingPairs.has(pair)) {
      await prisma.causing_users.create({ data: { fkiCod_Users: user.iCod_User, fkiCod_Issues: issue.iCod_Issues } });
      uniqueCausingPairs.add(pair);
    }
  }

  const uniqueAffectedPairs = new Set();
  while(uniqueAffectedPairs.size < 15) {
    const user = getRandomElement(users);
    const issue = getRandomElement(issues);
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