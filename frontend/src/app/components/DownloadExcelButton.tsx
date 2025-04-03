"use client";

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

type Props = {
    data: Record<string, any>[];
    filename?: string;
    sheetName?: string;
    iconOnly?: boolean;
    tooltip?: string;
    style?: React.CSSProperties; // optional custom styles
};

const DownloadExcelButton: React.FC<Props> = ({
    data,
    filename = "export.xlsx",
    sheetName = "Sheet1",
    iconOnly = true,
    tooltip = "Download Excel",
    style = {},
}) => {
    const handleDownload = () => {
        if (!data || data.length === 0) {
            console.warn("No data to export.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(file, filename);
    };

    const baseStyle: React.CSSProperties = {
        height: "50px",
        width: "50px",
        background: "var(--text-color)",
        padding: "8px",
        color: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 0,
        ...style, // allow override
    };

    const button = (
        <Button onClick={handleDownload} style={baseStyle}>
            <DownloadIcon />
        </Button>
    );

    return iconOnly ? (<span>{button}</span>) : button;
};

export default DownloadExcelButton;