import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
const DashboardPage = lazy(() => import("../pages/DashboardPage/DashboardPage"));
const AnalysisPage = lazy(() => import("../pages/AnalysisPage/AnalysisPage"));
const AccountPage = lazy(() => import("../pages/AccountPage/AccountPage"));
const CompassPage = lazy(() => import("../pages/CompassPage/CompassPage"));
const WordAnalysisPage = lazy(() => import("../pages/WordAnalysisPage/WordAnalysisPage"));
const AdministratorPage = lazy(() => import("../pages/Administrator/AdministratorPage"));

const routes = [
    { path: '/', element: <Navigate to="/login" /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <Navigate to="/signup/create" /> },
    { path: '/signup/:tabValue', element: <SignUpPage /> },
    {
        element: <Layout />,
        children: [
            { path: '/dashboard', element: <DashboardPage /> },
            { path: '/account', element: <AccountPage /> },
            { path: '/analysis', element: <AnalysisPage /> },
            { path: '/word-analysis', element: <WordAnalysisPage /> },
            { path: '/compass', element: <CompassPage /> },
            { path: '/administrator', element: <AdministratorPage /> },
        ],
    },
    { path: '*', element: <NotFoundPage /> },
];

export default routes;