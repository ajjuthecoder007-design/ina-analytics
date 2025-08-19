// components/BranchBarChart.js
"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function BranchBarChart({ data }) {
    return (
        <motion.div
            className="bg-gray-800 p-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h2 className="text-xl font-bold mb-4">Branch-wise Candidate Status</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                        labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Legend wrapperStyle={{ color: '#F9FAFB' }} />
                    <Bar dataKey="male_fit" stackId="a" fill="#3B82F6" name="Male (Fit)" />
                    <Bar dataKey="female_fit" stackId="a" fill="#8B5CF6" name="Female (Fit)" />
                    <Bar dataKey="male_unfit" stackId="b" fill="#EF4444" name="Male (Unfit)" />
                    <Bar dataKey="female_unfit" stackId="b" fill="#F97316" name="Female (Unfit)" />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
}