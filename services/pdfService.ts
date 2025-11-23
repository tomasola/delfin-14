import { jsPDF } from "jspdf";
import { ScanRecord } from '../types';

export const generatePDF = (record: ScanRecord) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(20);
  doc.text("Reporte de Escaneo", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`ID: ${record.id}`, 105, 28, { align: "center" });
  doc.text(`Fecha: ${new Date(record.timestamp).toLocaleString()}`, 105, 33, { align: "center" });

  doc.setTextColor(0);
  
  // Data Table-like structure
  const startY = 50;
  const lineHeight = 15;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Referencia:", 20, startY);
  doc.setFont("helvetica", "normal");
  doc.text(record.reference, 70, startY);

  doc.setFont("helvetica", "bold");
  doc.text("Longitud:", 20, startY + lineHeight);
  doc.setFont("helvetica", "normal");
  doc.text(record.length, 70, startY + lineHeight);

  doc.setFont("helvetica", "bold");
  doc.text("Cantidad:", 20, startY + lineHeight * 2);
  doc.setFont("helvetica", "normal");
  doc.text(record.quantity, 70, startY + lineHeight * 2);

  // Images
  let currentY = startY + lineHeight * 4;

  if (record.croppedImage) {
    doc.setFont("helvetica", "bold");
    doc.text("Dibujo Técnico (Recorte):", 20, currentY);
    currentY += 5;
    // Add Cropped Image (Keep aspect ratio approx)
    doc.addImage(record.croppedImage, 'JPEG', 20, currentY, 80, 80, undefined, 'FAST');
  }

  // Optional: Add Original Image smaller
  if (record.originalImage) {
     doc.text("Imagen Original:", 110, currentY - 5);
     doc.addImage(record.originalImage, 'JPEG', 110, currentY, 80, 60, undefined, 'FAST');
  }

  doc.save(`Label_${record.reference}_${new Date().getTime()}.pdf`);
};