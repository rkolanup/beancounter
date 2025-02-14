import OverViewCard from './components/OverViewCard';
import './dashboard.css'

export default function Home() {
  return (
    <div className="dashboard-wrapper">
      <div className="summary-cards">
        <OverViewCard type="Balance" amount="10,000" />
        <OverViewCard type="Income" amount="10,000" />
        <OverViewCard type="Expense" amount="10,000" />
      </div>
    </div>
  );
}
