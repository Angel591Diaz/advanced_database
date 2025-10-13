const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Funciones auxiliares
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

async function main() {
  console.log('🧹 Cleaning up the database... (This might take a moment)');
  
  // El orden de eliminación es crucial para evitar errores de restricción de clave foránea.
  await prisma.rolePermissions.deleteMany();
  await prisma.userRoles.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.userAddresses.deleteMany();
  await prisma.addresses.deleteMany();
  await prisma.fines.deleteMany();
  await prisma.logs.deleteMany();
  await prisma.loans.deleteMany();
  await prisma.reservations.deleteMany();
  await prisma.bookCopies.deleteMany();
  await prisma.bookAuthors.deleteMany();
  await prisma.bookCategories.deleteMany();
  await prisma.bookFormats.deleteMany();
  await prisma.books.deleteMany();
  await prisma.authors.deleteMany();
  await prisma.publishers.deleteMany();
  await prisma.categories.deleteMany();
  await prisma.languages.deleteMany();
  await prisma.formats.deleteMany();
  await prisma.copyStatuses.deleteMany();
  await prisma.loanStatuses.deleteMany();
  await prisma.permissions.deleteMany();
  await prisma.roles.deleteMany();
  await prisma.userDetails.deleteMany();
  await prisma.users.deleteMany();
  await prisma.userStatuses.deleteMany();
  await prisma.logTypes.deleteMany();

  console.log('🌱 Starting the seeding process...');

  // --- 1. Creación de Catálogos y Datos Base ---
  console.log('Creating catalogs and base data...');
  
  await prisma.userStatuses.createMany({ data: [{ statusName: 'Active' }, { statusName: 'Suspended' }, { statusName: 'Inactive' }] });
  const userStatuses = await prisma.userStatuses.findMany();

  await prisma.roles.createMany({ data: [{ roleName: 'Student' }, { roleName: 'Librarian' }, { roleName: 'Admin' }] });
  const roles = await prisma.roles.findMany();

  await prisma.permissions.createMany({
    data: [
      { permissionName: 'manage_books' }, { permissionName: 'manage_users' },
      { permissionName: 'create_loan' }, { permissionName: 'view_reports' },
    ],
  });
  const permissions = await prisma.permissions.findMany();

  await prisma.copyStatuses.createMany({ data: [{ statusName: 'Available' }, { statusName: 'On Loan' }, { statusName: 'In Maintenance' }] });
  const copyStatuses = await prisma.copyStatuses.findMany();

  await prisma.loanStatuses.createMany({ data: [{ statusName: 'Active' }, { statusName: 'Returned' }, { statusName: 'Overdue' }] });
  const loanStatuses = await prisma.loanStatuses.findMany();

  await prisma.languages.createMany({ data: [{ languageName: 'Spanish' }, { languageName: 'English' }] });
  const languages = await prisma.languages.findMany();

  await prisma.formats.createMany({ data: [{ formatName: 'Hardcover' }, { formatName: 'Paperback' }, { formatName: 'eBook' }] });
  const formats = await prisma.formats.findMany();

  await prisma.categories.createMany({ data: [{ categoryName: 'Science Fiction' }, { categoryName: 'Fantasy' }, { categoryName: 'History' }, { categoryName: 'Programming' }, { categoryName: 'Classic Literature' }] });
  const categories = await prisma.categories.findMany();

  await prisma.logTypes.createMany({ data: [{ typeName: 'CRUD_Loan' }, { typeName: 'User_Login' }, { typeName: 'System_Error' }] });
  const logTypes = await prisma.logTypes.findMany();

  // --- 2. Asignación de Permisos a Roles ---
  console.log('Assigning permissions to roles...');
  const adminRole = roles.find(r => r.roleName === 'Admin');
  for (const permission of permissions) {
      await prisma.rolePermissions.create({ data: { roleID: adminRole.roleID, permissionID: permission.permissionID } });
  }
  const librarianRole = roles.find(r => r.roleName === 'Librarian');
  await prisma.rolePermissions.create({ data: { roleID: librarianRole.roleID, permissionID: permissions.find(p => p.permissionName === 'manage_books').permissionID } });
  await prisma.rolePermissions.create({ data: { roleID: librarianRole.roleID, permissionID: permissions.find(p => p.permissionName === 'create_loan').permissionID } });


  // --- 3. Creación de Entidades Principales (Autores, Editoriales, Libros) ---
  console.log('Creating main entities (Authors, Publishers, Books)...');
  
  await prisma.authors.createMany({ data: [{ firstName: 'George', lastName: 'Orwell' }, { firstName: 'J.R.R.', lastName: 'Tolkien' }, { firstName: 'Isaac', lastName: 'Asimov' }, { firstName: 'Jane', lastName: 'Austen' }] });
  const authors = await prisma.authors.findMany();

  await prisma.publishers.createMany({ data: [{ publisherName: 'Penguin Books', country: 'UK' }, { publisherName: 'Planeta', country: 'Spain' }, { publisherName: 'Doubleday', country: 'USA' }] });
  const publishers = await prisma.publishers.findMany();

  const booksData = [
      { title: '1984', isbn: '978-0451524935', publicationYear: 1949, publisherId: publishers[0].publisherID, languageId: languages[1].languageID, authorIds: [authors[0].authorID], categoryIds: [categories[0].categoryID, categories[4].categoryID] },
      { title: 'The Hobbit', isbn: '978-0345339683', publicationYear: 1937, publisherId: publishers[1].publisherID, languageId: languages[1].languageID, authorIds: [authors[1].authorID], categoryIds: [categories[1].categoryID] },
      { title: 'Foundation', isbn: '978-0553803719', publicationYear: 1951, publisherId: publishers[2].publisherID, languageId: languages[1].languageID, authorIds: [authors[2].authorID], categoryIds: [categories[0].categoryID] }
  ];

  const books = [];
  for (const book of booksData) {
      const newBook = await prisma.books.create({ data: { title: book.title, isbn: book.isbn, publicationYear: book.publicationYear, publisherID: book.publisherId, languageID: book.languageId } });
      for (const authorId of book.authorIds) {
          await prisma.bookAuthors.create({ data: { bookID: newBook.bookID, authorID: authorId } });
      }
      for (const categoryId of book.categoryIds) {
          await prisma.bookCategories.create({ data: { bookID: newBook.bookID, categoryID: categoryId } });
      }
      for (let i = 0; i < getRandomInt(2, 5); i++) {
        await prisma.bookCopies.create({ data: { bookID: newBook.bookID, copyStatusID: copyStatuses.find(s => s.statusName === 'Available').copyStatusID } });
      }
      books.push(newBook);
  }

  // --- 4. Creación de Usuarios con todos sus detalles ---
  console.log('Creating users with full details...');
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.users.create({
      data: {
        username: `user${i}`,
        passwordHash: 'hashed_password_placeholder',
        userStatusID: userStatuses.find(s => s.statusName === 'Active').userStatusID,
        details: { create: { firstName: `Name${i}`, lastName: `Lastname${i}`, dateOfBirth: new Date(1990 + i, i, i) } },
        contactInfos: { create: [{ contactType: 'Email', contactValue: `user${i}@university.edu` }, { contactType: 'Phone', contactValue: `555-010${i}` }] }
      },
    });
    await prisma.userRoles.create({ data: { userID: user.userID, roleID: roles.find(r => r.roleName === 'Student').roleID } });
    
    // Crear y asignar una dirección
    const address = await prisma.addresses.create({ data: { street: `${i} Main St`, city: 'University City', state: 'State', zipCode: `${10000 + i}` } });
    await prisma.userAddresses.create({ data: { userID: user.userID, addressID: address.addressID, addressType: 'Home' } });

    users.push(user);
  }

  // --- 5. Creación de Transacciones: Préstamos, Reservas y Multas ---
  console.log('Creating transactions (Loans, Reservations, Fines)...');
  
  // Préstamos activos
  const availableCopies = await prisma.bookCopies.findMany({ where: { copyStatus: { statusName: 'Available' } } });
  for (let i = 0; i < Math.min(3, availableCopies.length); i++) {
    const copyToLoan = availableCopies[i];
    const user = getRandomElement(users);
    const loan = await prisma.loans.create({ data: { copyID: copyToLoan.copyID, userID: user.userID, dueDate: addDays(new Date(), 14), loanStatusID: loanStatuses.find(s => s.statusName === 'Active').loanStatusID } });
    await prisma.bookCopies.update({ where: { copyID: copyToLoan.copyID }, data: { copyStatusID: copyStatuses.find(s => s.statusName === 'On Loan').copyStatusID } });
    
    // Log de la creación del préstamo
    await prisma.logs.create({ data: { tableName: 'Loans', recordID: loan.loanID, action: 'INSERT', details: `User ${user.userID} borrowed copy ${copyToLoan.copyID}`, logTypeID: logTypes.find(lt => lt.typeName === 'CRUD_Loan').logTypeID, userID: user.userID } });
  }

  // Préstamo vencido para generar una multa
  const anotherCopy = availableCopies[4];
  if (anotherCopy) {
      const userWithFine = getRandomElement(users);
      const overdueLoan = await prisma.loans.create({ data: { copyID: anotherCopy.copyID, userID: userWithFine.userID, loanDate: addDays(new Date(), -20), dueDate: addDays(new Date(), -6), loanStatusID: loanStatuses.find(s => s.statusName === 'Overdue').loanStatusID } });
      await prisma.bookCopies.update({ where: { copyID: anotherCopy.copyID }, data: { copyStatusID: copyStatuses.find(s => s.statusName === 'On Loan').copyStatusID } });
      
      // Crear la multa asociada
      await prisma.fines.create({ data: { loanID: overdueLoan.loanID, fineAmount: 7.50, paymentStatus: 'Pending' } });
  }

  // Crear una reserva
  const bookToReserve = getRandomElement(books);
  const userReserving = getRandomElement(users);
  await prisma.reservations.create({ data: { bookID: bookToReserve.bookID, userID: userReserving.userID, status: 'Active' } });


  console.log('✅ Seeding finished successfully! All 27 tables now have data.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });