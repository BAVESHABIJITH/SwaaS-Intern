const prisma = require("../config/prisma");

const getBooks = async (req, res) => {
  const search = req.query.search;
  
  try {
    if (!search) {
      const books = await prisma.book.findMany();
      return res.status(200).json({message:"Books fetched successfully",data: books});
    }
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive"} },
          { author: { contains: search, mode: "insensitive"} }
        ]
      }
    });
    res.status(200).json({message:"Books fetched successfully",data: books});
  } catch (err) {
    res.status(500).json({message:"Server error",error: err});
  }
};

module.exports = { getBooks };
