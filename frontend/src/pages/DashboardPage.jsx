import Layout from "../components/Layout/Layout";
import Dashboard from "../components/Dashboard/DashboardLayout";


const DashboardPage = () => {
    return (
        <Layout sideBar={true}>
            <Dashboard />
        </Layout>
    );
};

export default DashboardPage;