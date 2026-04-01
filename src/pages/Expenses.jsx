import { useEffect } from "react"
import api from "../api/client"

function Expenses() {
  
  const fetchExpenses = async () => {
    try {
      const data = api.get("/expenses");
      console.log(data);
    } catch(err) {

    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [])

  return (
    <div>
      <h2>Expenses</h2>
    </div>
  )
}

export default Expenses
