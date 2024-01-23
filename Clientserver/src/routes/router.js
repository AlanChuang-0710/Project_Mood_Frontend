import { lazy, Suspense } from 'react';
import { Navigate, createHashRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '@/layout/Layout';
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
const DashboardPage = lazy(() => import("@/pages/DashboardPage/DashboardPage"));
const AnalysisPage = lazy(() => import("@/pages/AnalysisPage/AnalysisPage"));
const AccountPage = lazy(() => import("@/pages/AccountPage/AccountPage"));
const CompassPage = lazy(() => import("@/pages/CompassPage/CompassPage"));
const WordAnalysisPage = lazy(() => import("@/pages/WordAnalysisPage/WordAnalysisPage"));
const AdministratorPage = lazy(() => import("@/pages/Administrator/AdministratorPage"));

const router = [
    { path: '/', element: <Navigate to="/login" /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <Navigate to="/signup/create" /> },
    { path: '/signup/:tabValue', element: <SignUpPage /> },
    {
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
            { path: '/dashboard', element: <DashboardPage />, handle: { permission: ["users"] } },
            { path: '/account', element: <AccountPage />, handle: { permission: ["users"] } },
            { path: '/analysis', element: <AnalysisPage />, handle: { permission: ["users"] } },
            { path: '/word-analysis', element: <WordAnalysisPage />, handle: { permission: ["users"] } },
            { path: '/compass', element: <CompassPage />, handle: { permission: ["users"] } },
            { path: '/administrator', element: <AdministratorPage />, handle: { permission: ["admin"] } },
        ],
    },
    { path: '*', element: <NotFoundPage /> },
];

export default createHashRouter(router);