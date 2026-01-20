import PDFDocument from "pdfkit";
import fs from "fs";
import * as path from "path";
import { QuequeConIngredientes } from "../interfaces/reporte.repository.js";

export class ReportePdfGenerator {
  private ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  private buildPdfContent(
    doc: PDFKit.PDFDocument,
    queque: QuequeConIngredientes,
  ): void {
    doc.fontSize(20).text("Reporte de Queque", { align: "center" }).moveDown(2);

    doc.fontSize(14).text(`Queque: ${queque.nombre}`).moveDown(1);

    doc.fontSize(12).text("Ingredientes:", { underline: true }).moveDown(0.5);

    queque.ingredientes.forEach((ing) => {
      doc.text(
        `${ing.id + 1}. ${ing.nombre} | Cantidad: ${ing.cantidad} | Costo: ₡${ing.costo.toString()}`,
      );
    });

    const total = queque.ingredientes.reduce(
      (acc: number, i) => acc + i.costo.toNumber() * i.cantidad,
      0,
    );

    doc
      .moveDown()
      .fontSize(13)
      .text(`Costo total estimado: ₡${total.toFixed(2)}`);
  }

  buildPdfToFile(
    queque: QuequeConIngredientes,
    outputDir: string,
    fileName: string,
  ): boolean {
    try {
      const absoluteDir = path.resolve(outputDir);
      this.ensureDirectoryExists(absoluteDir);

      const filePath = path.join(absoluteDir, fileName);

      const doc = new PDFDocument({ margin: 50 });
      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);

      this.buildPdfContent(doc, queque);

      doc.end();

      return true;
    } catch {
      return false;
    }
  }
}
