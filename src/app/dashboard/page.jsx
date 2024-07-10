"use client"
import DashboardComponent from '@/components/DashboardComponent/DashboardComponent';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const Dashboard = () => {
  return (
    <div>
      <div className="container-flex grid grid-cols-10">
        <div className="md:col-span-1 lg:col-span-2 bg-blue-200"></div>
        <div className="col-span-10 md:col-span-8 lg:col-span-6 bg-blue-200 px-2">
          <Header />
          <DashboardComponent />
          <Footer />
        </div>
        <div className="md:col-span-1 lg:col-span-2 bg-blue-200"></div>
      </div>
    </div>
  );
};

export default Dashboard;