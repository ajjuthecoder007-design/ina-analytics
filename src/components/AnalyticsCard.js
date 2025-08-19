// components/AnalyticsCard.js
"use client";
import { motion } from 'framer-motion';

export default function AnalyticsCard({ title, value }) {
    return (
        <motion.div
            className="bg-gray-800 p-4 rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
            <p className="text-3xl font-bold text-white">{value}</p>
        </motion.div>
    );
}