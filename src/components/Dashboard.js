// components/Dashboard.js
"use client";
import { sheetData, processData } from "../lib/data";
import AnalyticsCard from "./AnalyticsCard";
import BranchBarChart from "./BranchBarChart";

export default function Dashboard() {
    const processedData = processData();
    const totalCandidates = sheetData.length;
    const totalMale = sheetData.filter((d) => d.gender === "Male").length;
    const totalFemale = sheetData.filter((d) => d.gender === "Female").length;
    const fitCandidates = sheetData.filter((d) => d.status === "FIT").length;

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">
                INA NOC Jan 26 Batch Analytics
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <AnalyticsCard title="Total Candidates" value={totalCandidates} />
                <AnalyticsCard title="Male Candidates" value={totalMale} />
                <AnalyticsCard title="Female Candidates" value={totalFemale} />
                <AnalyticsCard title="Fit Candidates" value={fitCandidates} />
            </div>
            <BranchBarChart data={processedData} />
        </div>
    );
}
