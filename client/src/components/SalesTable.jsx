import { formatDate, formatCurrency, formatText } from "../utils/formatters";
import "../styles/table.css";

function SalesTable({ data }) {
  if (!data || data.length === 0) {
    return <p className="no-data">No transactions found</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Region</th>
            <th>Product</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Discount %</th>
            <th>Total</th>
            <th>Final</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Delivery</th>
            <th>Store ID</th>
            <th>Location</th>
            <th>Salesperson</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{formatText(row["Customer Name"])}</td>
              <td>{formatText(row["Phone Number"])}</td>
              <td>{formatText(row["Gender"])}</td>
              <td>{formatText(row["Age"])}</td>
              <td>{formatText(row["Customer Region"])}</td>
              <td>{formatText(row["Product Name"])}</td>
              <td>{formatText(row["Brand"])}</td>
              <td>{formatText(row["Product Category"])}</td>
              <td>{formatText(row["Tags"])}</td>
              <td>{formatText(row["Quantity"])}</td>
              <td>{formatCurrency(row["Price per Unit"])}</td>
              <td>{formatText(row["Discount Percentage"])}</td>
              <td>{formatCurrency(row["Total Amount"])}</td>
              <td className="final">{formatCurrency(row["Final Amount"])}</td>
              <td>{formatDate(row["Date"])}</td>
              <td>{formatText(row["Payment Method"])}</td>
              <td>{formatText(row["Order Status"])}</td>
              <td>{formatText(row["Delivery Type"])}</td>
              <td>{formatText(row["Store ID"])}</td>
              <td>{formatText(row["Store Location"])}</td>
              <td>{formatText(row["Employee Name"])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
