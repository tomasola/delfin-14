import React, { useState, useRef } from 'react';
import { clearAllData, getRecords, importData } from '../../services/storageService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Download, Upload, Trash2, Lock, Unlock, Smartphone } from 'lucide-react';
import { Modal } from '../ui/Modal';

export const Admin: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    if (pin === '1234') {
      setIsUnlocked(true);
      setPin('');
    } else {
      alert("PIN Incorrecto");
    }
  };

  const handleExport = async () => {
    const records = await getRecords();
    const dataStr = JSON.stringify(records, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_industrial_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const success = await importData(ev.target?.result as string);
      if (success) alert("Datos restaurados correctamente.");
      else alert("Error: Formato de archivo inválido.");
    };
    reader.readAsText(file);
  };

  const handleReset = async () => {
    await clearAllData();
    setShowResetModal(false);
    alert("Base de datos vaciada.");
  };

  if (!isUnlocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 gap-6 bg-slate-900">
        <div className="bg-slate-800 p-6 rounded-full">
          <Lock size={48} className="text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Acceso Restringido</h2>
        <div className="w-full max-w-xs">
          <Input
            type="password"
            placeholder="PIN (1234)"
            value={pin}
            onChange={e => setPin(e.target.value)}
            className="text-center tracking-widest text-xl"
          />
          <Button fullWidth onClick={handleLogin} className="mt-4">Desbloquear</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto bg-slate-900 pb-24 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Administración</h2>
        <Button variant="ghost" onClick={() => setIsUnlocked(false)}><Unlock size={20} /></Button>
      </div>

      {/* Data Management */}
      <section className="space-y-4">
        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider border-b border-slate-800 pb-2">Base de Datos</h3>

        <Button fullWidth variant="secondary" onClick={handleExport} className="justify-start">
          <Download className="mr-3 text-amber-500" /> Exportar Backup (JSON)
        </Button>

        <Button fullWidth variant="secondary" onClick={() => fileInputRef.current?.click()} className="justify-start">
          <Upload className="mr-3 text-blue-400" /> Importar Backup
        </Button>
        <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleImport} />
      </section>

      {/* Danger Zone */}
      <section className="space-y-4">
        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider border-b border-slate-800 pb-2">Zona de Peligro</h3>

        <Button fullWidth variant="danger" onClick={() => setShowResetModal(true)} className="justify-start bg-red-900/50 hover:bg-red-900 text-red-200 border border-red-800">
          <Trash2 className="mr-3" /> Borrar Todo
        </Button>
      </section>

      {/* Installation info (Mockup) */}
      <section className="p-4 bg-slate-800 rounded-xl flex items-center gap-4 opacity-70">
        <Smartphone className="text-slate-400" size={24} />
        <div className="text-xs text-slate-400">
          Para instalar, usa "Agregar a Inicio" en el menú de tu navegador.
        </div>
      </section>

      <Modal isOpen={showResetModal} onClose={() => setShowResetModal(false)} title="¿Borrar Base de Datos?">
        <div className="space-y-4">
          <p className="text-red-300">Esta acción es irreversible. Se eliminarán todos los historiales y fotos guardadas.</p>
          <div className="flex gap-3 mt-4">
            <Button variant="secondary" fullWidth onClick={() => setShowResetModal(false)}>Cancelar</Button>
            <Button variant="danger" fullWidth onClick={handleReset}>Sí, Borrar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};