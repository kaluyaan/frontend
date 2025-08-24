"use client";
import React from "react";
import Link from "next/link";
import { toolsList } from "@/config/constants/homeConstants";
import styles from "../Home/home.module.css";
import { useSearchParams } from "next/navigation";

function ToolsList() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category")?.toLocaleLowerCase();

  return (
    <section className={styles.toolsGrid}>
      {toolsList
        .filter((tool) => {
          if (category) {
            return tool.category === category;
          } else {
            return true;
          }
        })
        .map((tool) => (
          <Link
            href={tool.key}
            key={tool.key}
            className={`${styles.glassmorphism} ${styles.toolCard}`}
            // onClick={() => selectTool(tool.key)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div className={styles.toolIcon}>{tool.icon}</div>
            <h3 className={styles.toolTitle}>{tool.title}</h3>
            <p className={styles.toolDesc}>{tool.desc}</p>
          </Link>
        ))}
    </section>
  );
}

export default ToolsList;
