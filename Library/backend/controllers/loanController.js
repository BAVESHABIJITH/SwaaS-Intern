const prisma = require("../config/prisma");

// To create loan
const createLoan = async (req, res) => {
  const { book_id, member_id } = req.body;
  //Checking whether the user provided all req. fields (Book ID & Member ID)
  if (!book_id || !member_id) {
    return res.status(400).json({message:"Missing fields"});
  }
  try {
    // Starting of transaction for mantaining data integrity
    const result = await prisma.$transaction(async (tx) => {
      const book = await tx.book.findUnique({
        where: { id: parseInt(book_id) }
      });
      //checking whether the user searching for existing book
      if (!book) {
        return res.status(400).json({message:"Book not found"});
      }
      // checking if the searched book available
      if (book.copies_available <= 0) {
        return res.status(400).json({message:"No copies available"});
      }
      // Calculation for due date (loanDate + 14 = due date)
      const loanDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);
      const loan = await tx.loan.create({
        data: {
          book_id: parseInt(book_id),
          member_id: parseInt(member_id),
          loan_date: loanDate,
          due_date: dueDate
        }
      });
      // If the user select the valid book and that book is available, the available copies reduced by 1 (copies_available - 1) 
      await tx.book.update({
        where: { id: parseInt(book_id) },
        data: { copies_available: book.copies_available - 1 }
      });
      return loan;
    });
    res.status(201).json({message:"Loan created successfully",data: result});
  } catch (err) {
    res.status(500).json({message:"Server error",error: err});
  }
};
// Logic for returning Borrowed Books
const returnLoan = async (req, res) => {
  const loanId = parseInt(req.params.id); // Getting loan ID
  try {
    const result = await prisma.$transaction(async (tx) => {
      const loan = await tx.loan.findUnique({
        where: { id: loanId }
      });  
      // Checking if Loan exists or the book with the given Loan ID is returned
      if (!loan || loan.return_date) {
        return res.status(400).json({message:"Loan not found or already returned"});
      }
      //if not returned upadating return date in loan table
      const updatedLoan = await tx.loan.update({
        where: { id: loanId },
        data: { return_date: new Date() }
      });
      //Once returned the available copies increased by 1 copies_available + 1
      await tx.book.update({
        where: { id: loan.book_id },
        data: { copies_available: { increment: 1 } }
      });
      return updatedLoan;
    });
    res.status(200).json({message:"Loan returned successfully",data: result});
  } catch (err) {
    res.status(500).json({message:"Server error",error: err});
  }
}
// Logic for fine calculation
const payFine = async (req, res) => {
  const loanId = parseInt(req.params.id); // Getting loan ID
  try {
    const updatedLoan = await prisma.loan.update({
      where: { id: loanId },
      data: { fine_paid: true } // setting fine_paid true so we can calculate the fine
    });
    res.status(200).json({message:"Fine paid successfully",data: updatedLoan});
  } catch (err) {
    res.status(500).json({message:"Server error",error: err});
  }
};

const getLibrarianStats = async (req, res) => {
  try {
    const allLoans = await prisma.loan.findMany();
    // Initializing total active loans, over dues, total fines collected, total pending fines, to get loan with overdue for long days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let activeLoans = 0;
    let overdueLoans = 0;
    let totalFinesCollected = 0;
    let totalFinesPending = 0;
    let maxDaysOverdue = 0;
    allLoans.forEach(loan => {
      const dueDate = new Date(loan.due_date);
      dueDate.setHours(0, 0, 0, 0);
      let fine = 0;
      if (!loan.return_date) {
        activeLoans++;
        if (today > dueDate) {
          overdueLoans++;
          const diff = Math.ceil(Math.abs(today - dueDate) / (1000 * 60 * 60 * 24)); // calculation for difference in toaday and due date 
          maxDaysOverdue = Math.max(maxDaysOverdue, diff);
          fine = diff * 10; // fine calculation
        }
      } else {
        const returnDate = new Date(loan.return_date);
        returnDate.setHours(0, 0, 0, 0);
        if (returnDate > dueDate) {
          const diff = Math.ceil(Math.abs(returnDate - dueDate) / (1000 * 60 * 60 * 24));
          fine = diff * 10;
        }
      }
      if (fine > 0) {
        if (loan.fine_paid) {
          totalFinesCollected += fine;
        } else {
          totalFinesPending += fine;
        }
      }
    });

    res.json({
      activeLoans,
      overdueLoans,
      totalFinesCollected,
      totalFinesPending,
      totalFinesAccrued: totalFinesCollected + totalFinesPending,
      maxDaysOverdue
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getActiveLoans = async (req, res) => {
  try {
    const loans = await prisma.loan.findMany({
      where: { return_date: null },
      orderBy: { loan_date: "asc" },
      include: {
        book: {
          select: { title: true }
        },
        member: {
          select: { name: true }
        }
      }
    });
    const formatted = loans.map(loan => {
      const today = new Date();
      const dueDate = new Date(loan.due_date);
      let daysOverdue = 0;
      let fine = 0;
      today.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);
      if (today > dueDate) {
        const diffTime = Math.abs(today - dueDate);
        daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        fine = daysOverdue * 10;
      }
      return {
        id: loan.id,
        borrower_name: loan.member.name,
        title: loan.book.title,
        loan_date: loan.loan_date,
        due_date: loan.due_date,
        days_overdue: daysOverdue,
        fine: fine
      };
    });
    
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createLoan, returnLoan, payFine, getActiveLoans, getLibrarianStats };
