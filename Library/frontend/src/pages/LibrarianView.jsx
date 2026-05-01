import { useState, useEffect } from "react"
import axios from "axios"
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Button, Box, Chip } from "@mui/material"

export default function LibrarianView() {
  const [activeLoans, setActiveLoans] = useState([])
  const [stats, setStats] = useState({ activeLoans: 0, overdueLoans: 0, totalFinesAccrued: 0, maxDaysOverdue: 0 })
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const fetchActiveLoans = () => {
    axios.get("http://localhost:3000/borrowedBooks/active")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setActiveLoans(data);
      })
      .catch(err => console.error(err))
  }

  const fetchStats = () => {
    axios.get("http://localhost:3000/loans/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    if (user && user.role === "librarian") {
      fetchActiveLoans()
      fetchStats()
    }
  }, [user])

  const handleReturn = (loanId) => {
    axios.patch(`http://localhost:3000/loans/${loanId}/return`)
      .then(() => {
        fetchActiveLoans()
        fetchStats()
      })
      .catch(() => alert("Error marking as returned"))
  }

  if (!user || user.role !== "librarian") {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Access Denied. Please login as Librarian.</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.href='/login'}>Go to Login</Button>
      </Box>
    )
  }

  const overdueLoansList = activeLoans.filter(loan => loan.days_overdue > 0);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 min(200px, 100%)' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>ACTIVE LOANS</Typography>
              <Typography variant="h4">{stats.activeLoans}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 min(200px, 100%)' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>OVERDUE LOANS</Typography>
              <Typography variant="h4" color="error">{stats.overdueLoans}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 min(200px, 100%)' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>FINES COLLECTED</Typography>
              <Typography variant="h4" color="success.main">Rs. {stats.totalFinesCollected || 0}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 min(200px, 100%)' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>FINES PENDING</Typography>
              <Typography variant="h4" color="warning.main">Rs. {stats.totalFinesPending || 0}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Typography variant="overline" color="textSecondary">Librarian Dashboard</Typography>
      
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>Overdue Loans</Typography>
      <Typography variant="body1" color="error" sx={{ mb: 3 }}>Loans past their due date</Typography>

      <TableContainer component={Paper} id="overdue-loans" sx={{ mb: 6 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Book</strong></TableCell>
              <TableCell><strong>Member</strong></TableCell>
              <TableCell><strong>Loan Date</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Days Overdue</strong></TableCell>
              <TableCell><strong>Fine</strong></TableCell>
              <TableCell align="right"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overdueLoansList.map((loan, index) => (
              <TableRow key={`overdue-${index}`}>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">{loan.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{loan.borrower_name}</Typography>
                  <Typography variant="body2" color="textSecondary">{loan.borrower_name.toLowerCase().replace(' ', '')}@gmail.com</Typography>
                </TableCell>
                <TableCell>
                  {new Date(loan.loan_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </TableCell>
                <TableCell>
                  {new Date(loan.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </TableCell>
                <TableCell>
                  <Chip label={`${loan.days_overdue}d`} color="error" size="small" />
                </TableCell>
                <TableCell>
                  {loan.fine > 0 ? (
                    <Typography color="error">Rs. {loan.fine}</Typography>
                  ) : "-"}
                </TableCell>
                <TableCell align="right">
                  <Button 
                    variant="outlined" 
                    color="success" 
                    size="small"
                    onClick={() => handleReturn(loan.id)}
                  >
                    Mark Returned
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {overdueLoansList.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">No overdue loans.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom>Active Loans</Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>All unreturned loans</Typography>

      <TableContainer component={Paper} id="active-loans" sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Book</strong></TableCell>
              <TableCell><strong>Member</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Days Overdue</strong></TableCell>
              <TableCell><strong>Fine</strong></TableCell>
              <TableCell align="right"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeLoans.map((loan, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">{loan.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{loan.borrower_name}</Typography>
                  <Typography variant="body2" color="textSecondary">{loan.borrower_name.toLowerCase().replace(' ', '')}@gmail.com</Typography>
                </TableCell>
                <TableCell>
                  {new Date(loan.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </TableCell>
                <TableCell>
                  {loan.days_overdue > 0 ? (
                    <Chip label={`${loan.days_overdue}d`} color="error" size="small" />
                  ) : "-"}
                </TableCell>
                <TableCell>
                  {loan.fine > 0 ? (
                    <Typography color="error">Rs. {loan.fine}</Typography>
                  ) : "-"}
                </TableCell>
                <TableCell align="right">
                  <Button 
                    variant="outlined" 
                    color="success" 
                    size="small"
                    onClick={() => handleReturn(loan.id)}
                  >
                    Mark Returned
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {activeLoans.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">No active loans.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
