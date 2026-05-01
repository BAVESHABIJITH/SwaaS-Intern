import { useState, useEffect } from "react"
import axios from "axios"
import { Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, Box, Card, CardContent, Chip, Grid, FormControl, InputLabel, Select, MenuItem, CardActions } from "@mui/material"

export default function MemberView() {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("ALL")
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [memberStats, setMemberStats] = useState({ activeCount: 0, overdueCount: 0, fineOwed: 0, booksRead: 0 })
  const [memberHistory, setMemberHistory] = useState([])
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("success")
  useEffect(() => {
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const fetchBooks = (term = "") => {
    axios.get(`http://localhost:3000/books?search=${term}`)
      .then(res => setBooks(res.data.data || []))
      .catch(err => console.error(err))
  }

  const fetchMemberStats = (id) => {
    if (!id) return;
    axios.get(`http://localhost:3000/members/${id}/stats`)
      .then(res => {
        setMemberStats(res.data.stats)
        setMemberHistory(res.data.history)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    if (user && user.id) {
      fetchMemberStats(user.id)
    }
  }, [user])

  const handleSearch = () => {
    fetchBooks(searchTerm)
  }

  const handleBorrow = (bookId) => {
    if (!user || user.role !== "member") {
      setMessage("Please log in as a member to borrow books")
      setSeverity("error")
      setTimeout(() => setMessage(""), 3000)
      return
    }
    axios.post("http://localhost:3000/loans", {
      book_id: bookId,
      member_id: user.id
    })
    .then(res => {
      setMessage(res.data.message || "Successfully borrowed book!")
      setSeverity("success")
      fetchBooks(searchTerm)
      fetchMemberStats(user.id)
      setTimeout(() => setMessage(""), 3000)
    })
    .catch(err => {
      setMessage(err.response?.data?.message || err.response?.data?.error || "Error borrowing book")
      setSeverity("error")
      setTimeout(() => setMessage(""), 3000)
    })
  }

  const handlePay = (loanId) => {
    axios.patch(`http://localhost:3000/loans/${loanId}/pay`)
      .then(res => {
        if (user) fetchMemberStats(user.id)
        setMessage(res.data.message || "Fine paid successfully!")
        setSeverity("success")
        setTimeout(() => setMessage(""), 3000)
      })
      .catch(err => console.error(err))
  }

  const filteredBooks = books.filter(book => {
    if (genreFilter === "ALL") return true;
    return book.genre && book.genre.toUpperCase() === genreFilter;
  });

  if (!user || user.role !== "member") {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Please login as a member to view your dashboard.</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.href='/login'}>Go to Login</Button>
      </Box>
    )
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 min(200px, 100%)' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>ACTIVE LOANS</Typography>
              <Typography variant="h4">{memberStats.activeCount}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 min(200px, 100%)' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>OVERDUE LOANS</Typography>
              <Typography variant="h4" color="error">{memberStats.overdueCount}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 min(200px, 100%)' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>FINE OWED</Typography>
              <Typography variant="h4">Rs. {memberStats.fineOwed}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 min(200px, 100%)' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>BOOKS READ</Typography>
              <Typography variant="h4">{memberStats.booksRead}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Typography variant="overline" color="textSecondary">Browse Collection</Typography>
      <Typography variant="h4" gutterBottom>Find your next read</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField 
          label="Search by title or author" 
          variant="outlined" 
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="genre-select-label">Genre</InputLabel>
          <Select
            labelId="genre-select-label"
            value={genreFilter}
            label="Genre"
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <MenuItem value="ALL">All Genres</MenuItem>
            <MenuItem value="FICTION">Fiction</MenuItem>
            <MenuItem value="NON-FICTION">Non-Fiction</MenuItem>
            <MenuItem value="SCI-FI">Sci-Fi</MenuItem>
            <MenuItem value="FANTASY">Fantasy</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ height: 56 }}>
          Search
        </Button>
      </Box>

      {message && (
        <Alert severity={severity} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {filteredBooks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', mb: 6 }} id="results-grid">
          <Typography variant="body1" color="textSecondary">
            No books found.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
          gap: 3, 
          mb: 6 
        }} id="results-grid">
          {filteredBooks.map((book) => (
            <Card key={book.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="div" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {book.author}
                </Typography>
                <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip label={book.genre} size="small" variant="outlined" color="primary" />
                  <Typography variant="body2" color={book.copies_available > 0 ? "success.main" : "error.main"} fontWeight="bold">
                    {book.copies_available} Available
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  fullWidth
                  variant="contained" 
                  color="primary"
                  onClick={() => handleBorrow(book.id)}
                  disabled={book.copies_available <= 0}
                >
                  Borrow
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      <Typography variant="h5" gutterBottom>My Loans</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Book</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Fine</strong></TableCell>
              <TableCell align="right"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memberHistory.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">{loan.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{loan.author}</Typography>
                </TableCell>
                <TableCell>
                  {new Date(loan.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={loan.status} 
                    color={loan.status === 'OVERDUE' ? 'error' : loan.status === 'ACTIVE' ? 'success' : 'default'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  {loan.fine > 0 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography color={loan.fine_paid ? "success.main" : "error"}>
                        Rs. {loan.fine}
                      </Typography>
                      {loan.fine_paid && <Chip label="PAID" size="small" color="success" variant="outlined" />}
                    </Box>
                  ) : "-"}
                </TableCell>
                <TableCell align="right">
                  {loan.fine > 0 && !loan.fine_paid && (
                    <Button 
                      variant="contained" 
                      color="success" 
                      size="small"
                      onClick={() => handlePay(loan.id)}
                    >
                      Pay
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {memberHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">No borrowing history found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
