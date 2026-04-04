import { motion } from 'framer-motion';
import SummaryCards from '../components/Dashboard/SummaryCards';
import BalanceTrendChart from '../components/Dashboard/BalanceTrendChart';
import SpendingBreakdownChart from '../components/Dashboard/SpendingBreakdownChart';
import RecentTransactions from '../components/Dashboard/RecentTransactions';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <SummaryCards />
      </motion.div>
      <div className="grid-charts">
        <motion.div variants={item} style={{ height: '100%' }}>
          <BalanceTrendChart />
        </motion.div>
        <motion.div variants={item} style={{ height: '100%' }}>
          <SpendingBreakdownChart />
        </motion.div>
      </div>
      <motion.div 
        variants={item} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-50px" }}
        style={{ marginTop: 28 }}
      >
        <RecentTransactions />
      </motion.div>
    </motion.div>
  );
}
