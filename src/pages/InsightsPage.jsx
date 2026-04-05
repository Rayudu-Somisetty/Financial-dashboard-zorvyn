import { motion } from 'framer-motion';
import InsightCards from '../components/Insights/InsightCards';
import MonthlyComparisonChart from '../components/Insights/MonthlyComparisonChart';
import SpendingInsightDonut from '../components/Insights/SpendingInsightDonut';

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function InsightsPage() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.2 }}>
      <motion.div variants={item}>
        <InsightCards />
      </motion.div>
      <motion.div 
        variants={item} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-50px" }}
        style={{ marginTop: 28 }}
      >
        <MonthlyComparisonChart />
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <SpendingInsightDonut />
      </motion.div>
    </motion.div>
  );
}
