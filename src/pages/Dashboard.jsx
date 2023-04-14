import DashboardHeader from '../components/DashboardComponents/DashboardHeader';
import DashboardContent from '../components/DashboardComponents/DashboardContent';

function Dashboard() {
  return (
    <div className="min-h-full flex items-center justify-center bg-slate-500">
      <div className="overflow-hidden rounded-lg bg-white shadow-2xl">
        <DashboardHeader />
        <DashboardContent />
      </div>
    </div>
  )
}

export default Dashboard