import Home from "@/components/Home";
import Head from "next/head";

const tools = [
  {
    title: "Merge PDF",
    icon: "/file.svg",
    desc: "Combine multiple PDFs into one.",
  },
  {
    title: "Split PDF",
    icon: "/file.svg",
    desc: "Split a PDF into separate files.",
  },
  { title: "Compress PDF", icon: "/file.svg", desc: "Reduce PDF file size." },
  {
    title: "PDF to Word",
    icon: "/file.svg",
    desc: "Convert PDF to Word document.",
  },
  {
    title: "PDF to PowerPoint",
    icon: "/file.svg",
    desc: "Convert PDF to PowerPoint.",
  },
  {
    title: "PDF to Excel",
    icon: "/file.svg",
    desc: "Convert PDF to Excel spreadsheet.",
  },
];

const extensions = ["ILovePDF Desktop", "ILovePDF Mobile", "ILovePDF API"];

export default function Page() {
  return (
    <>
      <Head>
        <title>PDF Tools - Merge, Split, Compress, Convert PDF Online</title>
        <meta
          name="description"
          content="ILovePDF is a customer-focused platform offering a suite of PDF tools for merging, splitting, compressing, and converting PDFs. Extensions are available for desktop, mobile, and API integration."
        />
        {tools.map((tool) => (
          <meta
            key={tool.title}
            name="keywords"
            content={`${tool.title}, ${tool.desc}`}
          />
        ))}
      </Head>
      <Home />
    </>
  );
}
