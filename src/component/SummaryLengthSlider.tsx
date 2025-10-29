// src/component/SummaryLengthSlider.tsx

"use client";

import React from "react";
import { Slider } from "@mui/material";

interface SummaryLengthSliderProps {
    length: "short" | "medium" | "long";
    setLength: React.Dispatch<React.SetStateAction<"short" | "medium" | "long">>;
}

const SummaryLengthSlider: React.FC<SummaryLengthSliderProps> = ({ length, setLength }) => {
    const marks = [
        { value: 0, label: "Short" },
        { value: 50, label: "Medium" },
        { value: 100, label: "Long" },
    ];

    // 🛑 FIX: Renamed unused parameter 'event' to '_event'
    const handleChange = (_event: Event, value: number | number[]) => {
        if (typeof value === "number") {
            if (value < 25) setLength("short");
            else if (value < 75) setLength("medium");
            else setLength("long");
        }
    };

    const getValue = () => {
        switch (length) {
            case "short":
                return 0;
            case "medium":
                return 50;
            case "long":
                return 100;
        }
    };

    return (
        <div className="mb-6">
            <label className="block mb-3 text-gray-800 font-semibold text-lg">
                Summary Length
            </label>

            <div className="px-2">
                <Slider
                    value={getValue()}
                    onChange={handleChange}
                    marks={marks}
                    step={null}
                    valueLabelDisplay="off"
                    sx={{
                        color: "#3B82F6",
                        height: 8,
                        "& .MuiSlider-thumb": {
                            height: 22,
                            width: 22,
                            backgroundColor: "#fff",
                            border: "2px solid #3B82F6",
                            "&:hover": {
                                boxShadow: "0px 0px 0px 8px rgba(59, 130, 246, 0.16)",
                            },
                        },
                        "& .MuiSlider-rail": {
                            opacity: 0.4,
                            backgroundColor: "#d1d5db",
                        },
                    }}
                    aria-label="Summary length slider"
                />
            </div>

            <p className="text-sm text-gray-600 mt-1 text-center italic">
                Current: <span className="font-medium text-blue-600 capitalize">{length}</span>
            </p>
        </div>
    );
};

export default SummaryLengthSlider;