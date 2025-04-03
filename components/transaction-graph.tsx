import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, RotateCcw, Info } from "lucide-react";

interface TransactionResult {
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  input: string;
  type: string;
}

interface Transaction {
  txHash: string;
  result: TransactionResult;
}

interface ProcessedTransaction {
  txHash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  input: string;
  type: string;
}

interface TransactionFlowDiagramProps {
  transactionData: Transaction[];
}

export const TransactionFlowDiagram: React.FC<TransactionFlowDiagramProps> = ({
  transactionData,
}) => {
  const transactions = React.useMemo(() => {
    if (!transactionData || transactionData.length === 0) return [];

    return transactionData.map((tx) => ({
      txHash: tx.txHash,
      from: tx.result.from,
      to: tx.result.to,
      value: tx.result.value,
      gasUsed: tx.result.gasUsed,
      input: tx.result.input,
      type: tx.result.type,
    }));
  }, [transactionData]);

  const [selectedTx, setSelectedTx] = useState<ProcessedTransaction | null>(
    null,
  );
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan((prev) => ({
        x: prev.x + (e.clientX - dragStart.x) / zoom,
        y: prev.y + (e.clientY - dragStart.y) / zoom,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const formatEthValue = (hexValue: string) => {
    if (!hexValue || hexValue === "0x0") return "0 ETH";
    const wei = parseInt(hexValue, 16);
    const eth = wei / 1e18;
    return `${eth.toFixed(4)} ETH`;
  };

  // Format gas for display
  const formatGas = (hexValue: string) => {
    if (!hexValue) return "0";
    return parseInt(hexValue, 16).toString();
  };

  const shortenAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.slice(-4)}`;
  };

  const formatInput = (input: string) => {
    if (!input || input === "0x") return "No input data";
    if (input.length > 66) {
      return `${input.substring(0, 66)}...`;
    }
    return input;
  };

  const handleSelectTx = (tx: ProcessedTransaction) => {
    setSelectedTx(selectedTx?.txHash === tx.txHash ? null : tx);
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center p-4">No transaction trace data available</div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Transaction Flow Diagram</CardTitle>
            <CardDescription>
              Visual representation of {transactions.length} transactions in
              block
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleZoomIn}
              className="p-1 rounded hover:bg-gray-100"
              aria-label="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1 rounded hover:bg-gray-100"
              aria-label="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={handleReset}
              className="p-1 rounded hover:bg-gray-100"
              aria-label="Reset view"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="relative w-full h-96 overflow-hidden border rounded-md bg-gray-50"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 300"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: "center",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {transactions.map((tx, index) => {
              const yPosition = 100 + index * 150;
              const isSelected = selectedTx?.txHash === tx.txHash;

              return (
                <g
                  key={tx.txHash}
                  onClick={() => handleSelectTx(tx)}
                  style={{ cursor: "pointer" }}
                  className={
                    isSelected ? "opacity-100" : "opacity-80 hover:opacity-100"
                  }
                >
                  <rect
                    x={100}
                    y={yPosition - 25}
                    width={120}
                    height={50}
                    rx={6}
                    fill="#22c55e"
                    fillOpacity={0.2}
                    stroke="#22c55e"
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  <text
                    x={160}
                    y={yPosition + 5}
                    textAnchor="middle"
                    fill="#334155"
                    fontSize={12}
                  >
                    {shortenAddress(tx.from)}
                  </text>

                  <line
                    x1={220}
                    y1={yPosition}
                    x2={530}
                    y2={yPosition}
                    stroke="#94a3b8"
                    strokeWidth={isSelected ? 3 : 2}
                    strokeDasharray={tx.type !== "CALL" ? "5,5" : ""}
                  />
                  <polygon
                    points={`530,${yPosition} 520,${yPosition - 5} 520,${yPosition + 5}`}
                    fill="#94a3b8"
                  />

                  <g>
                    <rect
                      x={300}
                      y={yPosition - 30}
                      width={150}
                      height={60}
                      rx={6}
                      fill="#f8fafc"
                      stroke="#cbd5e1"
                      strokeWidth={1}
                      strokeDasharray="3,3"
                    />
                    <text
                      x={375}
                      y={yPosition - 12}
                      textAnchor="middle"
                      fill="#334155"
                      fontSize={11}
                      fontWeight="bold"
                    >
                      {formatEthValue(tx.value)}
                    </text>
                    <text
                      x={375}
                      y={yPosition + 5}
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize={10}
                    >
                      Gas: {formatGas(tx.gasUsed)}
                    </text>
                    <text
                      x={375}
                      y={yPosition + 20}
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize={9}
                    >
                      {tx.txHash.substring(0, 10)}...
                    </text>
                  </g>

                  <rect
                    x={580}
                    y={yPosition - 25}
                    width={120}
                    height={50}
                    rx={6}
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    stroke="#3b82f6"
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  <text
                    x={640}
                    y={yPosition + 5}
                    textAnchor="middle"
                    fill="#334155"
                    fontSize={12}
                  >
                    {shortenAddress(tx.to)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {selectedTx && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Info size={16} className="text-blue-500" />
              <h3 className="font-medium">Transaction Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Hash: </span>
                <span className="font-mono">{selectedTx.txHash}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Type: </span>
                <span>{selectedTx.type}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">From: </span>
                <span className="font-mono">{selectedTx.from}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">To: </span>
                <span className="font-mono">{selectedTx.to}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Value: </span>
                <span>{formatEthValue(selectedTx.value)}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Gas Used: </span>
                <span>{formatGas(selectedTx.gasUsed)}</span>
              </div>
              <div className="col-span-1 md:col-span-2">
                <span className="font-semibold text-gray-700">Input: </span>
                <span className="font-mono text-xs break-all">
                  {formatInput(selectedTx.input)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-green-100">
              From Address
            </Badge>
            <Badge variant="outline" className="bg-blue-100">
              To Address
            </Badge>
          </div>
          <div className="text-xs text-gray-500">
            Tip: Click on a transaction to view details. Use mouse to drag and
            navigate, or buttons to zoom in/out.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
