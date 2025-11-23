import React, { useEffect, useState } from 'react';
import { getRecords } from '../../services/storageService';
import { BarChart2, Calendar, Database } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ count: 0, lastDate: 'N/A' });

  useEffect(() => {
    getRecords().then(records => {
      setStats({
        count: records.length,
        lastDate: records.length > 0
          ? new Date(records[0].timestamp).toLocaleDateString()
          : 'N/A'
      });
    });
  }, []);

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto bg-slate-900 pb-24">
      <h2 className="text-2xl font-bold text-white mb-6">Resumen</h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Count Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Database size={100} className="text-amber-500" />
          </div>
          <p className="text-slate-400 text-sm font-medium mb-2">Total Registros</p>
          <div className="text-5xl font-bold text-white">{stats.count}</div>
          <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 w-2/3"></div>
          </div>
        </div>

        {/* Last Scan Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-slate-700 rounded-lg text-amber-500">
              <Calendar size={24} />
            </div>
            <p className="text-slate-400 text-sm font-medium">Última Actividad</p>
          </div>
          <div className="text-2xl font-bold text-white pl-1">{stats.lastDate}</div>
        </div>
      </div>

      <div className="mt-8 p-4 border border-slate-800 rounded-xl bg-slate-900/50">
        <h3 className="text-slate-300 font-bold flex items-center mb-2">
          <BarChart2 className="mr-2" size={20} /> Eficiencia
        </h3>
        <p className="text-sm text-slate-500">
          Usa la pestaña de escaneo para digitalizar nuevas etiquetas. Recuerda exportar tus datos semanalmente desde la pestaña Admin.
        </p>
      </div>
    </div>
  );
};