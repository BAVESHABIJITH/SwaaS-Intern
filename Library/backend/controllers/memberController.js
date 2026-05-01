const prisma = require("../config/prisma");
// To get details of all members
const getMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getMemberStats = async (req, res) => {
  const memberId = parseInt(req.params.id);
  try {
    const loans = await prisma.loan.findMany({
      where: { member_id: memberId },
      include: { book: true },
      orderBy: { loan_date: "desc" }
    });
    // Initialization for active loan, over dues. fine to be paid and toatal books that a user read (FOR MEMEBERS) 
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let activeCount = 0;
    let overdueCount = 0;
    let fineOwed = 0;
    let booksRead = 0;
    const history = loans.map(loan => {
      let status = "ACTIVE";
      let fine = 0;
      const dueDate = new Date(loan.due_date);
      dueDate.setHours(0, 0, 0, 0);
      if (loan.return_date) {
        status = "RETURNED";
        booksRead++;
        const returnDate = new Date(loan.return_date);
        returnDate.setHours(0, 0, 0, 0);
        if (returnDate > dueDate) {
          const diff = Math.ceil(Math.abs(returnDate - dueDate) / (1000 * 60 * 60 * 24));
          fine = diff * 10;
        }
      } else if (today > dueDate) {
        status = "OVERDUE";
        const diff = Math.ceil(Math.abs(today - dueDate) / (1000 * 60 * 60 * 24));
        fine = diff * 10;
        overdueCount++;
        if (!loan.fine_paid) {
          fineOwed += fine;
        }
      } else {
        activeCount++;
      }
      return {
        id: loan.id,
        title: loan.book.title,
        author: loan.book.author,
        loan_date: loan.loan_date,
        due_date: loan.due_date,
        return_date: loan.return_date,
        status,
        fine,
        fine_paid: loan.fine_paid
      };
    });
    res.status(200).json({
      stats: { activeCount, overdueCount, fineOwed, booksRead },
      history
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getMembers, getMemberStats };
