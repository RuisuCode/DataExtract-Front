import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Flex,
  Input,
  Progress,
  Row,
  Skeleton,
  Space,
  Statistic,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Copy,
  Check,
  Database,
  Download,
  Edit,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  FileText,
  Info,
  Layers,
  Layout as LayoutIcon,
  Maximize2,
  MoreHorizontal,
  Pencil,
  Play,
  RotateCcw,
  Search,
  Share2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import {
  extractFilter,
  type ExtractFilterRequestFilters,
  type ExtractFilterResponse,
} from "../shared/api/extract";
import { sileo } from "sileo";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const { Title, Text, Paragraph } = Typography;

type LocationState = {
  file?: File;
  mode?: "filter" | "search" | "ai";
  filters?: ExtractFilterRequestFilters;
  data?: ExtractFilterResponse;
};

// --- Subcomponent: JSON Syntax Highlighter ---
const JSONHighlighter = ({ data }: { data: any }) => {
  const codeRef = useRef<HTMLElement>(null);
  const jsonString = JSON.stringify(data, null, 2);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute("data-highlighted");
      hljs.highlightElement(codeRef.current);
    }
  }, [jsonString]);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    sileo.success({
      title: "Copiado",
      description: "JSON copiado al portapapeles correctamente.",
      position: "bottom-right",
    });
    // revert icon after a short delay
    setTimeout(() => setCopied(false), 800);
  };

  // motion-wrapped button component
  const MotionButton = motion(Button);

  return (
    <Card
      bordered={false}
      style={{
        background: "#0d0d1a",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(139, 140, 255, 0.1)",
      }}
      title={
        <Flex justify="space-between" align="center" style={{ width: "100%" }}>
          <Space>
            <Layers size={18} color="#8b8cff" />
            <Text style={{ color: "white", fontWeight: 600 }}>
              JSON Literal (Raw API Response)
            </Text>
          </Space>
          <MotionButton
            style={{
              backgroundColor: "rgba(139, 140, 255, 0.1)",
              borderColor: "rgba(255,255,255,0.1)",
              color: "#8b8cff",
            }}
            onClick={copyToClipboard}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key={"check"}
                  initial={{ opacity: 0, filter: "blur(5px)", scale: 0.8 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(5px)", scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <Check size={14} color="#8b8cff" />
                  <span className="font-medium">Copiado</span>
                </motion.div>
              ) : (
                <motion.div
                  key={"copy"}
                  initial={{ opacity: 0, filter: "blur(5px)", scale: 0.8 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(5px)", scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <Clipboard size={14} color="#8b8cff" />
                  <span className="font-medium">Copiar</span>
                </motion.div>
              )}
            </AnimatePresence>
          </MotionButton>


        </Flex>
      }
    >
      <pre style={{ margin: 0, maxHeight: "400px", overflow: "auto" }}>
        <code
          ref={codeRef}
          className="language-json"
          style={{ background: "transparent", fontSize: "13px" }}
        >
          {jsonString}
        </code>
      </pre>
    </Card>
  );
};

// --- Subcomponent: TanStack Data Table ---
const TanStackTable = ({
  data,
  columnsConfig,
}: {
  data: any[];
  columnsConfig: any[];
}) => {
  const [globalFilter, setGlobalFilter] = useState("");

  // Use backend columns if available, otherwise infer
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<any>();

    const baseColumns =
      columnsConfig.length > 0
        ? columnsConfig.map((col) =>
            columnHelper.accessor(col.key, {
              header: col.header || col.key,
              cell: (info) => {
                const val = info.getValue();
                if (val === null || val === undefined)
                  return <Text style={{ color: "#4b5563" }}>-</Text>;
                return <Text style={{ color: "white" }}>{String(val)}</Text>;
              },
            }),
          )
        : data.length > 0
          ? Object.keys(data[0]).map((key) =>
              columnHelper.accessor(key, {
                header: key,
                cell: (info) => {
                  const val = info.getValue();
                  if (val === null || val === undefined)
                    return <Text style={{ color: "#4b5563" }}>-</Text>;
                  return <Text style={{ color: "white" }}>{String(val)}</Text>;
                },
              }),
            )
          : [];

    return [
      ...baseColumns,
      // columnHelper.display({
      //   id: "actions",
      //   header: "ACCIONES",
      //   cell: () => (
      //     <Button
      //       type="text"
      //       size="small"
      //       icon={<Pencil size={14} color="#8b8cff" />}
      //     />
      //   ),
      // }),
    ];
  }, [data, columnsConfig]);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 12 } },
  });

  return (
    <Card
      bordered={false}
      style={{
        background: "#0d0d1a",
        borderRadius: "16px",
        border: "1px solid rgba(139, 140, 255, 0.1)",
      }}
      title={
        <Flex justify="space-between" align="center" wrap="wrap" gap="middle">
          <Text style={{ color: "white", fontWeight: 600 }}>
            Vista de Datos TanStack
          </Text>
          <Input
            placeholder="Filtrar filas..."
            prefix={<Search size={14} color="#4b5563" />}
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            style={{
              width: 220,
              background: "#16162a",
              border: "1px solid #2a2a4a",
              color: "white",
            }}
          />
        </Flex>
      }
    >
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 4px",
          }}
        >
          <thead style={{ background: "rgba(139, 140, 255, 0.05)" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#9ca3af",
                      fontSize: "12px",
                      fontWeight: 600,
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{ transition: "background 0.2s" }}
                className="results-table-row"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid rgba(255,255,255,0.02)",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <Flex justify="center" align="center" style={{ padding: "40px 0" }}>
          <Empty
            description={
              <Text style={{ color: "#4b5563" }}>Sin datos para mostrar</Text>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Flex>
      )}

      {data.length > 0 && (
        <Flex
          justify="space-between"
          align="center"
          style={{ marginTop: "20px" }}
        >
          <Text style={{ color: "#4b5563", fontSize: "12px" }}>
            Mostrando {table.getRowModel().rows.length} de {data.length}{" "}
            resultados
          </Text>
          <Space>
            <Button
              size="small"
              type="text"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              style={{
                color: table.getCanPreviousPage() ? "white" : "#374151",
              }}
            >
              <ChevronLeft size={16} />
            </Button>
            <Badge
              count={table.getState().pagination.pageIndex + 1}
              style={{ background: "#8b8cff", boxShadow: "none" }}
            />
            <Button
              size="small"
              type="text"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              style={{ color: table.getCanNextPage() ? "white" : "#374151" }}
            >
              <ChevronRight size={16} />
            </Button>
          </Space>
        </Flex>
      )}
    </Card>
  );
};

// --- Subcomponent: PDF Preview (Simplified Placeholder) ---
const PDFPreview = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1/1.4",
        background: "#ffffff05",
        borderRadius: "12px",
        border: "1px dashed rgba(139, 140, 255, 0.2)",
        overflow: "hidden",
      }}
    >
      {/* Using a placeholder SVG or image that mimics a "template" */}
      <div
        style={{
          padding: "20px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div
          style={{
            height: "40px",
            width: "60%",
            background: "rgba(139, 140, 255, 0.1)",
            borderRadius: "4px",
          }}
        />
        <Flex justify="space-between">
          <div
            style={{
              height: "10px",
              width: "30%",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              height: "10px",
              width: "20%",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "2px",
            }}
          />
        </Flex>
        <div
          style={{
            flex: 1,
            border: "1px solid rgba(139, 140, 255, 0.05)",
            borderRadius: "4px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                height: "2px",
                width: "100%",
                background: "rgba(139, 140, 255, 0.05)",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-15deg)",
          padding: "8px 20px",
          border: "2px solid #8b8cff",
          color: "#8b8cff",
          fontWeight: "bold",
          fontSize: "18px",
          borderRadius: "4px",
          background: "rgba(13, 13, 26, 0.8)",
          backdropFilter: "blur(4px)",
          opacity: 0.8,
          pointerEvents: "none",
        }}
      >
        SYSTEM TEMPLATE
      </div>
    </div>
  );
};

// --- Main Results Page Component ---
export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    file,
    mode,
    filters,
    data: initialData,
  } = (location.state as LocationState) || {};

  const [data, setData] = useState<ExtractFilterResponse | null>(
    initialData || null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file || data) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await extractFilter({ uploadedFile: file, filters });
        if (res.success) {
          setData(res);
        } else {
          const msg = "Error al procesar el archivo en el servidor.";
          setError(msg);
          sileo.error({ title: "Error", description: msg });
          navigate("/");
        }
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Error al conectar con el servidor.";
        setError(msg);
        sileo.error({ title: "Error de conexión", description: msg });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [file, filters, data, navigate]);

  const rows = useMemo(() => {
    if (!data) return [];
    const inner = (data.data as any) || {};
    return inner.data || [];
  }, [data]);

  const columnsConfig = useMemo(() => {
    if (!data) return [];
    const inner = (data.data as any) || {};
    return inner.columns || [];
  }, [data]);

  const stats = useMemo(() => {
    if (!data) return { records: 0, columns: 0, id: "-", plan: "Pro" };
    const inner = (data.data as any) || {};
    const meta = (data as any).meta || inner.meta || {};
    const statsData = inner.stats || {};

    return {
      records: meta.recordsCount || statsData.totalRows || rows.length,
      columns:
        statsData.totalColumns ||
        (columnsConfig.length > 0
          ? columnsConfig.length
          : rows.length > 0
            ? Object.keys(rows[0]).length
            : 0),
      id: meta.extractionId?.substring(0, 7) || "---",
      fullId: meta.extractionId || "-",
      plan: meta.plan
        ? meta.plan.charAt(0).toUpperCase() + meta.plan.slice(1)
        : "Pro",
    };
  }, [data, rows, columnsConfig]);

  if (!file && !initialData) {
    return (
      <Flex
        style={{ width: "100%", height: "100vh", background: "#02020a" }}
        align="center"
        justify="center"
      >
        <Empty
          description={
            <Text style={{ color: "#9ca3af" }}>
              No se encontró un archivo cargado.
            </Text>
          }
        />
      </Flex>
    );
  }

  return (
    <div
      style={{
        background: "#02020a",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}
    >
      <style>{`
        .results-table-row:hover {
          background: rgba(255, 255, 255, 0.03) !important;
        }
        pre::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        pre::-webkit-scrollbar-thumb {
          background: rgba(139, 140, 255, 0.2);
          borderRadius: 4px;
        }
        pre::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
      {/* Top Navbar Simulation */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          padding: "12px 24px",
          background: "rgba(0, 0, 0, 0.3)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(139,140,255,0.1)",
          backdropFilter: "blur(12px)",
          top: 0,
          zIndex: 100,
        }}
      >
        <Space size="large">
          <Flex
            align="center"
            gap="small"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Avatar
            size={40}
              src={
                <img
                  src="/logo_data_extract_transparent.png"
                  alt="Data Extract Logo"
                  style={{ height: 62, width: 62 }}
                />
              }
            />

            <Text style={{ color: "white", fontSize: "18px", fontWeight: 700 }}>
                 Data Extractor
            </Text>
          </Flex>
        </Space>
      
      </Flex>

      <div
        style={{ maxWidth: "1350px", margin: "0 auto", padding: "40px 24px" }}
      >
        {/* Header Section */}
        <Flex
          justify="space-between"
          align="flex-end"
          style={{ marginBottom: "32px" }}
        >
          <div>
            <Space style={{ marginBottom: "8px" }}>
              <FileSpreadsheet size={16} color="#8b8cff" />
              <Text
                style={{
                  color: "#8b8cff",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Excel Extraído
              </Text>
            </Space>
            <Title
              level={1}
              style={{ color: "white", margin: 0, fontSize: "36px" }}
            >
              {(data as any)?.meta?.uploadedFile?.originalName ||
                file?.name ||
                "archivo_sin_nombre.xlsx"}
            </Title>
            <Text style={{ color: "#4b5563" }}>
              Resultados de extracción mediante motor de IA v4.2
            </Text>
            
          </div>
            <Space>
          <Button
          size="large"
            icon={<Share2 size={16} />}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            Compartir
          </Button>
          <Space.Compact block>
            <Button
            size="large"
              icon={<FileText size={16} />}
              style={{ background: "#8b8cff", border: "none", color: "white" }}
            >
              Convertir Archivo
            </Button>
            <Button
            size="large"
              icon={<Download size={16} />}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
              }}
            >
              Exportar
            </Button>
          </Space.Compact>
          {/* <Badge dot status="processing">
            <Avatar size="small" style={{ background: "#16162a", border: "1px solid #2a2a4a" }}>LC</Avatar>
          </Badge> */}
          <Button
            icon={<RotateCcw size={16} />}
            onClick={() => navigate("/")}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              height: "40px",
              paddingInline: "20px",
            }}
          >
            Re-procesar
          </Button>
        </Space>
        </Flex>

        {/* Stats Grid */}
        <Row gutter={[20, 20]} style={{ marginBottom: "32px" }}>
          {[
            {
              label: "TOTAL RECORDS",
              value: stats.records,
              icon: (
                <Database size={18} color="#8b8cff" style={{ opacity: 0.6 }} />
              ),
            },
            {
              label: "COLUMNS EXTRACTED",
              value: stats.columns,
              icon: (
                <LayoutIcon
                  size={18}
                  color="#8b8cff"
                  style={{ opacity: 0.6 }}
                />
              ),
            },
            {
              label: "EXTRACTION ID",
              value: stats.id + "...vb",
              icon: (
                <TrendingUp
                  size={18}
                  color="#8b8cff"
                  style={{ opacity: 0.6 }}
                />
              ),
            },
            {
              label: "PLAN TYPE",
              value: stats.plan,
              icon: (
                <ShieldCheck
                  size={18}
                  color="#8b8cff"
                  style={{ opacity: 0.6 }}
                />
              ),
            },
          ].map((s, idx) => (
            <Col key={idx} xs={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  background: "#0d0d1a",
                  border: "1px solid rgba(139, 140, 255, 0.1)",
                  borderRadius: "16px",
                }}
              >
                <Flex justify="space-between" align="center">
                  <div>
                    <Text
                      style={{
                        fontSize: "11px",
                        color: "#4b5563",
                        fontWeight: 700,
                      }}
                    >
                      {s.label}
                    </Text>
                    <div
                      style={{
                        fontSize: "24px",
                        color: "white",
                        fontWeight: 700,
                        marginTop: "4px",
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                  {s.icon}
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 24]}>
          {/* Left Column: Data and JSON */}
          <Col xs={24} lg={16}>
            <Flex vertical gap="large">
              <TanStackTable data={rows} columnsConfig={columnsConfig} />
              <JSONHighlighter data={data} />
            </Flex>
          </Col>

          {/* Right Column: Template and Info */}
          <Col xs={24} lg={8}>
            <Flex vertical gap="large">
              <Card
                bordered={false}
                style={{
                  background: "#0d0d1a",
                  border: "1px solid rgba(139, 140, 255, 0.1)",
                  borderRadius: "16px",
                }}
                title={
                  <Space>
                    <Eye size={18} color="#8b8cff" />
                    <Text style={{ color: "white", fontWeight: 600 }}>
                      Previsualización de Plantilla
                    </Text>
                  </Space>
                }
              >
                <PDFPreview />
                <Button
                  block
                  icon={<Edit size={16} />}
                  style={{
                    marginTop: "20px",
                    background: "rgba(139, 140, 255, 0.1)",
                    border: "1px solid rgba(139, 140, 255, 0.2)",
                    color: "#8b8cff",
                    height: "45px",
                    fontWeight: 600,
                  }}
                >
                  Editar Plantilla
                </Button>
              </Card>

              <Card
                bordered={false}
                style={{
                  background: "#0d0d1a",
                  border: "1px solid rgba(139, 140, 255, 0.1)",
                  borderRadius: "16px",
                }}
                title={
                  <Text style={{ color: "white", fontWeight: 600 }}>
                    Confianza de Extracción
                  </Text>
                }
              >
                <Flex vertical gap="middle">
                  <div>
                    <Flex
                      justify="space-between"
                      style={{ marginBottom: "8px" }}
                    >
                      <Text style={{ color: "#9ca3af", fontSize: "13px" }}>
                        Precisión General
                      </Text>
                      <Text style={{ color: "#22c55e", fontWeight: 700 }}>
                        98.2%
                      </Text>
                    </Flex>
                    <Progress
                      percent={98.2}
                      showInfo={false}
                      strokeColor="#22c55e"
                      trailColor="rgba(255,255,255,0.05)"
                    />
                  </div>
                  <div>
                    <Flex
                      justify="space-between"
                      style={{ marginBottom: "8px" }}
                    >
                      <Text style={{ color: "#9ca3af", fontSize: "13px" }}>
                        Detección de Columnas
                      </Text>
                      <Text style={{ color: "#8b8cff", fontWeight: 700 }}>
                        100%
                      </Text>
                    </Flex>
                    <Progress
                      percent={100}
                      showInfo={false}
                      strokeColor="#8b8cff"
                      trailColor="rgba(255,255,255,0.05)"
                    />
                  </div>

                  <div
                    style={{
                      marginTop: "10px",
                      padding: "16px",
                      background: "#f59e0b10",
                      border: "1px solid #f59e0b20",
                      borderRadius: "12px",
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <Info
                      size={18}
                      color="#f59e0b"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    />
                    <Text
                      style={{
                        color: "#9ca3af",
                        fontSize: "12px",
                        lineHeight: "1.5",
                      }}
                    >
                      La IA ha detectado automáticamente el esquema basado en la
                      estructura del Excel proporcionado.
                    </Text>
                  </div>
                </Flex>
              </Card>
            </Flex>
          </Col>
        </Row>
      </div>

      <Divider
        style={{ borderColor: "rgba(255,255,255,0.05)", margin: "40px 0" }}
      />
      <footer style={{ textAlign: "center", paddingBottom: "40px" }}>
        <Text style={{ color: "#4b5563", fontSize: "13px" }}>
          © 2025 Sistema de Extracción de Datos Inteligente • Powered by AI v4.2
        </Text>
      </footer>
    </div>
  );
}
