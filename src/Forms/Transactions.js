import React, { useEffect, useState } from "react";

const Transactions = ({ customer }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!customer) {
      setError("No customer logged in");
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/transactions/${customer.username}/${customer.accountnumber}`
        );
        const data = await res.json();

        if (res.ok) {
          setTransactions(data.transactions);
        } else {
          setError(data.message || "Failed to fetch transactions");
        }
      } catch (err) {
        setError("Error fetching transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [customer]);

  if (loading) return <p className="text-gray-600">Loading transactions...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  // ✅ This will open the default browser print dialog (same as Ctrl+P)
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4">
      

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div id="transaction-table">
          <p><strong>Customer:</strong> {customer?.username || "N/A"}</p>
          <p><strong>Account No:</strong> {customer?.accountnumber || "N/A"}</p>

          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Transaction Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index} className="text-center hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {new Date(tx.postedAt || tx.date).toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-2 border font-semibold ${
                      tx.type === "deposit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type}
                  </td>
                  <td className="px-4 py-2 border">₹{tx.amount}</td>
                  <td className="px-4 py-2 border">{tx.transactionType}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center align-middle gap-9 mt-10">
            <h2 className="text-xl font-bold mb-4">Transaction Statement</h2>

      {/* ✅ Download/Print button */}
      <button
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Download / Print Statement
      </button>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default Transactions;
